import React, { useState, useEffect } from 'react';
import {
  Code2,
  Mail,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Gamepad2,
  Lock,
  Clock,
  RefreshCw,
  ExternalLink,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DeveloperRegisterPageProps {
  onNavigate: (page: string) => void;
}

export const DeveloperRegisterPage: React.FC<DeveloperRegisterPageProps> = ({ onNavigate }) => {
  const { requestDeveloperVerification, verifyDeveloperCode, resendVerificationCode, verificationEmail } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    robloxUsername: '',
    robloxProfileUrl: '',
    specialty: 'مطور ألعاب روبلوكس و Luau',
    experienceYears: 3,
    portfolio: '',
    bio: ''
  });

  // OTP Verification state
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (!formData.fullName || !formData.email || !formData.robloxUsername || !formData.password) {
      setErrorMsg('يرجى ملء جميع الحقول الإلزامية (الاسم، البريد، كلمة المرور، واسم حساب روبلوكس).');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = requestDeveloperVerification(formData);
      setIsLoading(false);
      if (res.success) {
        setStep(2);
        setTimer(60);
        setCanResend(false);
        setInfoMsg(res.message);
      } else {
        setErrorMsg(res.message);
      }
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value.slice(-1);
    setOtpCode(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const fullCode = otpCode.join('');
    if (fullCode.length !== 6) {
      setErrorMsg('يرجى إدخال رمز التحقق المكون من 6 أرقام بالكامل.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = verifyDeveloperCode(fullCode);
      setIsLoading(false);
      if (res.success) {
        setStep(3);
      } else {
        setErrorMsg(res.message);
      }
    }, 600);
  };

  const handleResend = () => {
    if (!canResend) return;
    setErrorMsg('');
    const res = resendVerificationCode();
    if (res.success) {
      setTimer(60);
      setCanResend(false);
      setInfoMsg(res.message);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handlePasteCode = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      e.preventDefault();
      setOtpCode(pasted.split(''));
      const lastInput = document.getElementById('otp-5');
      lastInput?.focus();
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-right">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>بروتوكول التحقق الأمني لمطوري روبلوكس والتطبيقات</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          إنشاء حساب مطور معتمد <span className="text-rose-600 dark:text-rose-500">(Verified Developer)</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          يتطلب الانضمام التحقق الصارم من ملكية البريد الإلكتروني عبر رمز (OTP) لضمان حماية المتجر والتحديثات وموثوقية الألعاب.
        </p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between mb-10 max-w-md mx-auto relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 -z-0"></div>

        <div className="flex flex-col items-center gap-1.5 relative z-10">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
              step >= 1 ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}
          >
            1
          </div>
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">بيانات المطور</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 relative z-10">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
              step >= 2 ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}
          >
            2
          </div>
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">رمز التحقق (OTP)</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 relative z-10">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
              step === 3 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}
          >
            3
          </div>
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">التفعيل والنجاح</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {infoMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
          <Info className="w-5 h-5 shrink-0" />
          <span>{infoMsg}</span>
        </div>
      )}

      {/* STEP 1: Developer Form */}
      {step === 1 && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl transition-colors">
          <form onSubmit={handleSubmitInfo} className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">الخطوة 1: المعلومات المهنية وحساب روبلوكس</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">أدخل معلوماتك والبريد الذي تريد استقبال رمز التوثيق عليه</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  الاسم الكامل أو اسم الاستوديو <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: سعد الشمري"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-rose-500 text-sm text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  البريد الإلكتروني للتحقق (سيتلقى رمز OTP) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="dev@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-rose-500 text-sm text-slate-900 dark:text-white outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  كلمة المرور للحساب <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-rose-500 text-sm text-slate-900 dark:text-white outline-none transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  اسم المستخدم في روبلوكس (Roblox Username) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute right-3.5 top-3.5 text-slate-400 text-sm font-mono">@</span>
                  <input
                    type="text"
                    required
                    placeholder="SaadDev_Official"
                    value={formData.robloxUsername}
                    onChange={(e) => setFormData({ ...formData, robloxUsername: e.target.value })}
                    className="w-full pr-8 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-rose-500 text-sm text-slate-900 dark:text-white outline-none transition-all font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">التخصص البرمجي</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-rose-500 text-sm text-slate-900 dark:text-white outline-none"
                >
                  <option value="مطور ألعاب روبلوكس و Luau">مطور ألعاب روبلوكس و Luau</option>
                  <option value="مبرمج سكربتات وأنظمة Luau متقدمة">مبرمج سكربتات وأنظمة Luau متقدمة</option>
                  <option value="مطور برامج وتطبيقات سطح المكتب (Windows / Mac)">مطور برامج وتطبيقات سطح المكتب</option>
                  <option value="مصمم نماذج ثلاثية الأبعاد PBR وخرائط Blender">مصمم نماذج ثلاثية الأبعاد PBR</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">رابط ملف روبلوكس</label>
                <input
                  type="url"
                  placeholder="https://www.roblox.com/users/..."
                  value={formData.robloxProfileUrl}
                  onChange={(e) => setFormData({ ...formData, robloxProfileUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none font-mono text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>جارٍ إرسال رمز التحقق...</span>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  <span>إرسال رمز التحقق (OTP) إلى البريد الإلكتروني</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: Email OTP Verification Screen */}
      {step === 2 && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-600 dark:text-rose-500 mx-auto flex items-center justify-center shadow-inner">
            <Mail className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">التحقق من البريد الإلكتروني</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              أرسلنا رمز تحقق أمني مكون من 6 أرقام إلى بريدك:
            </p>
            <p className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 bg-slate-100 dark:bg-slate-950 py-1.5 px-4 rounded-xl inline-block border border-slate-200 dark:border-slate-800">
              {formData.email}
            </p>
          </div>

          {/* 6 Digit Input Boxes */}
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div
              className="flex items-center justify-center gap-2 sm:gap-3 dir-ltr"
              onPaste={handlePasteCode}
            >
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-black font-mono rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 focus:border-rose-500 text-slate-900 dark:text-white outline-none transition-all shadow-inner"
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-rose-600 dark:text-rose-400 hover:underline font-bold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  إعادة إرسال رمز جديد الآن
                </button>
              ) : (
                <span>يمكنك طلب رمز جديد بعد <strong className="text-slate-900 dark:text-white font-mono">{timer}</strong> ثانية</span>
              )}
            </div>

            <div className="flex items-center gap-3 max-w-md mx-auto">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all"
              >
                {isLoading ? 'جارٍ التحقق...' : 'تأكيد الرمز وتفعيل الحساب'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-4 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                تعديل البيانات
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: Success Screen */}
      {step === 3 && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              تهانينا! تم توثيق حسابك كمطور معتمد بنجاح 🎮
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              تم التحقق من بريدك الإلكتروني بنجاح، وترقية حسابك إلى رتبة <span className="font-bold text-rose-600 dark:text-rose-400">مطور روبلوكس وتطبيقات معتمد</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('developer-dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              <span>الدخول إلى لوحة تحكم المطورين</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all"
            >
              الذهاب إلى الرئيسية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
