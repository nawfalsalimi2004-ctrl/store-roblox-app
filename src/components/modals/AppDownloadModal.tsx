import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  X,
  CheckCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Play,
  RotateCcw
} from 'lucide-react';
import { MobileAppExperience } from '../app/MobileAppExperience';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);

  if (!isOpen) return null;

  const handleDownloadApk = () => {
    setDownloading(true);
    setTimeout(() => {
      // Create and trigger simulated apk file download
      const element = document.createElement('a');
      const file = new Blob([
        `Roblox & Dev Store Platform Android Application Installer Package\nVersion: 1.0.0\nPackage: com.robloxdev.store\nArchitecture: Universal Android APK`
      ], { type: 'application/vnd.android.package-archive' });
      element.href = URL.createObjectURL(file);
      element.download = 'RobloxDevStore-v1.0.0.apk';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      {/* If Simulator Mode is active: Show Smartphone Frame */}
      {showSimulator ? (
        <div className="relative w-full max-w-sm h-[720px] max-h-[92vh] rounded-[44px] border-8 border-slate-800 bg-slate-950 shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
          {/* Smartphone Speaker & Camera Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full z-20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-950"></div>
          </div>

          <MobileAppExperience
            onClose={() => setShowSimulator(false)}
            isStandalone={true}
          />
        </div>
      ) : (
        /* Download Center Modal Card */
        <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-right p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">تحميل تطبيق المنصة للهواتف</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">تطبيق ألعاب روبلوكس وتحديثات المطورين</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {downloadSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>تم بدء تنزيل ملف التثبيت (RobloxDevStore-v1.0.0.apk) بنجاح!</span>
            </div>
          )}

          {/* Download Options */}
          <div className="space-y-3">
            {/* Option 1: Direct APK Download */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">تنزيل ملف APK للأندرويد</span>
                  <span className="px-2 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                    v1.0.0 APK
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  تثبيت مباشر لجميع هواتف Android (سامسونج، شاومي، هواوي وغيرها)
                </p>
              </div>

              <button
                onClick={handleDownloadApk}
                disabled={downloading}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'جارٍ التنزيل...' : 'تحميل APK مجاناً'}</span>
              </button>
            </div>

            {/* Option 2: Live Smartphone Simulator */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-indigo-50 dark:from-rose-950/30 dark:to-slate-950 border border-rose-200 dark:border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">معاينة تجربة التطبيق الحية</span>
                  <span className="px-2 py-0.2 rounded text-[10px] bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold">
                    محاكي هاتف
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  جرب شاشة البداية، تسجيل الدخول، صفحة الترحيب، والشاشة الرئيسية بدون تثبيت!
                </p>
              </div>

              <button
                onClick={() => setShowSimulator(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Play className="w-4 h-4 text-rose-500" />
                <span>تشغيل المحاكي الآن</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ميزات نسخة التطبيق:</span>
            </div>
            <ul className="space-y-1 text-[11px] list-disc list-inside">
              <li>شاشة بداية Splash Screen متحركة وتفاعلية</li>
              <li>صفحة ترحيب واستعراض للمزايا بعد تسجيل الدخول</li>
              <li>ظهور شارة المطور الموثق (Verified Dev ⚡) في كل مكان</li>
              <li>شريط تنقل سفلي خاص بالهواتف للوصول السريع</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
