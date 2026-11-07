import React, { useState } from 'react';
import { Mail, Check, Copy, X, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmailInboxModal: React.FC = () => {
  const { verificationEmail, clearVerificationEmailModal } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!verificationEmail) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(verificationEmail.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-right">
        {/* Email Header simulation */}
        <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">صندوق البريد الإلكتروني (محاكاة حية)</h3>
              <p className="text-xs text-rose-100 opacity-90">وصلت رسالة جديدة للتحقق من حسابك</p>
            </div>
          </div>
          <button
            onClick={clearVerificationEmailModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Email Content Body */}
        <div className="p-6 space-y-5">
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2 text-sm">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                الآن (منذ بضع ثوانٍ)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">تم الإرسال بنجاح</span>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-400 font-medium ml-1">من:</span>
              <span className="text-slate-200">no-reply@robloxdev-platform.com (نظام التحقق الرسمي)</span>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-400 font-medium ml-1">إلى:</span>
              <span className="text-amber-300 font-mono font-medium">{verificationEmail.email}</span>
            </div>
            <div className="text-slate-300 border-t border-slate-700/60 pt-2 font-semibold">
              الموضوع: رمز تأكيد هوية المطور لمنصة تطبيقات وألعاب روبلوكس
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-200 text-sm leading-relaxed">
              مرحباً <span className="font-bold text-white">{verificationEmail.fullName}</span> (مطور روبلوكس: <span className="text-rose-400 font-mono">@{verificationEmail.robloxUsername}</span>)،
            </p>
            <p className="text-slate-300 text-sm">
              لقد تلقينا طلباً لإنشاء حساب مطور معتمد. يرجى استخدام رمز التحقق لمرة واحدة (OTP) أدناه لإتمام تسجيلك:
            </p>

            {/* Verification Code Box */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-dashed border-rose-500/50 rounded-2xl p-6 text-center shadow-inner space-y-3">
              <div className="text-xs uppercase tracking-wider text-rose-400 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> رمز التحقق الخاص بك (OTP)
              </div>
              <div className="font-mono text-4xl font-extrabold tracking-widest text-white drop-shadow-md bg-slate-900/90 py-3 px-6 rounded-xl border border-slate-700 inline-block">
                {verificationEmail.code}
              </div>
              <p className="text-xs text-slate-400">ينتهي هذا الرمز خلال 10 دقائق. لا تشاركه مع أي شخص.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-lg shadow-rose-600/30"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    تم نسخ الرمز بنجاح!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-white" />
                    نسخ رمز التحقق ({verificationEmail.code})
                  </>
                )}
              </button>
              <button
                onClick={clearVerificationEmailModal}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>نظام حماية وتوثيق المطورين</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            جاهز للاستخدام
          </span>
        </div>
      </div>
    </div>
  );
};
