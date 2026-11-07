import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem('app_articles_v3');
    localStorage.removeItem('app_products_v3');
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-right font-sans" dir="rtl">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">حدث خطأ غير متوقع في العرض</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                تم التقاط الخطأ بنجاح لحماية التطبيق من الانهيار. يمكنك إعادة تحميل الصفحة للعودة فوراً.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-rose-400 text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/30"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة تحميل المنصة</span>
              </button>
              <button
                onClick={() => { window.location.href = '/'; }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>الرئيسية</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
