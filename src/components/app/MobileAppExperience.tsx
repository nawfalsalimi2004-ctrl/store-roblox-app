import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Sparkles,
  ShoppingBag,
  BookOpen,
  Users,
  User,
  ShieldCheck,
  Code2,
  ArrowRight,
  Sun,
  Moon,
  LogIn,
  CheckCircle,
  Flame,
  Download,
  X,
  ExternalLink,
  ChevronLeft,
  Gift,
  Zap,
  Bell,
  Award,
  Copy,
  Check,
  Smartphone,
  Wifi,
  Gauge
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types';

interface MobileAppExperienceProps {
  onClose?: () => void;
  isStandalone?: boolean;
}

export const MobileAppExperience: React.FC<MobileAppExperienceProps> = ({ onClose, isStandalone = false }) => {
  const { currentUser, login, registerUser, friends } = useAuth();
  const { products, articles } = useStore();
  const { theme, toggleTheme } = useTheme();

  // App flow stages:
  // 1: 'splash' (شاشة البداية)
  // 2: 'auth' (تسجيل الدخول / إنشاء الحساب)
  // 3: 'welcome' (صفحة الترحيب)
  // 4: 'main' (الصفحة الرئيسية للتطبيق)
  const [appStage, setAppStage] = useState<'splash' | 'auth' | 'welcome' | 'main'>(() => {
    return currentUser ? 'main' : 'splash';
  });

  const [splashProgress, setSplashProgress] = useState(0);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<'home' | 'vip' | 'roblox' | 'store' | 'articles' | 'friends' | 'profile'>('home');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');

  // Exclusive App States (ميزات التطبيق الحصرية غير المتوفرة بالموقع)
  const [dailyClaimed, setDailyClaimed] = useState<boolean>(() => {
    return localStorage.getItem('app_daily_claimed_date') === new Date().toISOString().split('T')[0];
  });
  const [appRobuxBalance, setAppRobuxBalance] = useState<number>(() => {
    return Number(localStorage.getItem('app_robux_balance') || '150');
  });
  const [gameBoosterActive, setGameBoosterActive] = useState<boolean>(() => {
    return localStorage.getItem('app_game_booster') === 'true';
  });
  const [pushNotificationsActive, setPushNotificationsActive] = useState<boolean>(() => {
    return localStorage.getItem('app_push_notifications') !== 'false';
  });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [claimSuccessMessage, setClaimSuccessMessage] = useState<string>('');

  const handleClaimDailyReward = () => {
    if (dailyClaimed) return;
    const reward = 50;
    const newBal = appRobuxBalance + reward;
    setAppRobuxBalance(newBal);
    setDailyClaimed(true);
    localStorage.setItem('app_robux_balance', newBal.toString());
    localStorage.setItem('app_daily_claimed_date', new Date().toISOString().split('T')[0]);
    setClaimSuccessMessage(`🎉 تهانينا! استلمت ${reward} Robux افتراضي وكود VIP حصري للتطبيق!`);
    setTimeout(() => setClaimSuccessMessage(''), 5000);
  };

  const handleToggleBooster = () => {
    const nextState = !gameBoosterActive;
    setGameBoosterActive(nextState);
    localStorage.setItem('app_game_booster', nextState.toString());
  };

  const handleToggleNotifications = () => {
    const nextState = !pushNotificationsActive;
    setPushNotificationsActive(nextState);
    localStorage.setItem('app_push_notifications', nextState.toString());
  };

  const handleCopyCode = (code: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Splash Screen progress timer
  useEffect(() => {
    if (appStage === 'splash') {
      const interval = setInterval(() => {
        setSplashProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              if (currentUser) {
                setAppStage('welcome');
              } else {
                setAppStage('auth');
              }
            }, 400);
            return 100;
          }
          return prev + 15;
        });
      }, 180);
      return () => clearInterval(interval);
    }
  }, [appStage, currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = login(email, password);
    if (res.success) {
      setAppStage('welcome');
    } else {
      setAuthError(res.message);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!name || !email || !password) {
      setAuthError('يرجى ملء جميع الحقول.');
      return;
    }
    const res = registerUser({ name, email, password });
    if (res.success) {
      setAppStage('welcome');
    } else {
      setAuthError(res.message);
    }
  };

  const robloxGames = products.filter(p => p.type === 'roblox_game');

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-900 text-white font-sans overflow-hidden select-none">
      {/* 1. STAGE: SPLASH SCREEN (شاشة بداية التطبيق) */}
      {appStage === 'splash' && (
        <div className="flex-1 flex flex-col items-center justify-between p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-rose-950/60 animate-fadeIn text-center">
          <div className="w-full flex justify-end">
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-6 flex flex-col items-center">
            {/* Animated Glowing Logo */}
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center shadow-2xl shadow-rose-600/50 animate-bounce">
                <Gamepad2 className="w-12 h-12 text-white stroke-[2.2]" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-slate-950 animate-ping"></span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-black text-white tracking-tight">
                منصة المطورين
              </h1>
              <p className="text-xs text-rose-400 font-mono tracking-widest font-bold">
                ROBLOX & DEV STORE APP
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed pt-2">
                عالم ألعاب روبلوكس العربية، التحديثات الحية، وشبكة المطورين المعتمدين
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs space-y-2">
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-rose-600 to-red-500 transition-all duration-200"
                style={{ width: `${splashProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>جارٍ تحميل واجهة التطبيق...</span>
              <span>{splashProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. STAGE: AUTH SCREEN (صفحة تسجيل الدخول وإنشاء الحساب داخل التطبيق) */}
      {appStage === 'auth' && (
        <div className="flex-1 flex flex-col justify-between p-6 bg-slate-950 text-right animate-fadeIn overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-600 flex items-center justify-center text-white">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-white">تطبيق المطورين</span>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Auth Card */}
          <div className="my-auto space-y-6 py-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-white">
                {authMode === 'login' ? 'تسجيل الدخول للتطبيق' : 'إنشاء حساب مستخدم جديد'}
              </h2>
              <p className="text-xs text-slate-400">
                {authMode === 'login'
                  ? 'أدخل بياناتك للمتابعة واستكشاف الألعاب'
                  : 'انضم لمجتمع اللاعبين والمطورين'}
              </p>
            </div>

            {/* Toggle Mode */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  authMode === 'login' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400'
                }`}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  authMode === 'register' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400'
                }`}
              >
                إنشاء حساب
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-3">
              {authMode === 'register' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">الاسم</label>
                  <input
                    type="text"
                    required
                    placeholder="اسمك أو لقبك..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-rose-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">كلمة المرور</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all pt-3"
              >
                {authMode === 'login' ? 'دخول التطبيق' : 'إنشاء الحساب ومتابعة'}
              </button>
            </form>
          </div>

          <div className="text-center pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
            نسخة تطبيق الهاتف الذكي v1.0 • حماية وتشفير متكامل
          </div>
        </div>
      )}

      {/* 3. STAGE: WELCOME / ONBOARDING SCREEN (صفحة ترحيب بعد الدخول) */}
      {appStage === 'welcome' && (
        <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-rose-950/60 text-right animate-fadeIn">
          <div className="text-left">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 inline-flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> تم تسجيل الدخول بنجاح
            </span>
          </div>

          <div className="my-auto space-y-6 text-center">
            {/* User Avatar with Developer Verified Badge */}
            <div className="relative inline-block mx-auto">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt="Avatar"
                className="w-20 h-20 rounded-3xl object-cover border-4 border-rose-500 shadow-xl mx-auto"
              />
              {/* Verified Developer Badge */}
              {currentUser?.role === 'developer' && (
                <div
                  className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-md border-2 border-slate-950 animate-pulse"
                  title="مطور معتمد موثق"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>موثق</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                أهلاً بك يا {currentUser?.name || 'صديقنا'}! 🎉
              </h2>

              {/* Developer badge indicator if developer */}
              {currentUser?.role === 'developer' ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>حساب مطور روبلوكس معتمد بشارة التوثيق</span>
                </div>
              ) : (
                <p className="text-xs text-slate-300">
                  حسابك نشط الآن في مجتمع لاعبي ومطوري روبلوكس
                </p>
              )}
            </div>

            {/* Feature Cards inside welcome */}
            <div className="grid grid-cols-1 gap-2.5 text-right text-xs">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">ألعاب روبلوكس وتحديثاتها الحية</h4>
                  <p className="text-[10px] text-slate-400">تابع أحدث الإصدارات وشغّل الألعاب مباشرة</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">شبكة الأصدقاء والدردشة</h4>
                  <p className="text-[10px] text-slate-400">تعرف على ما يلعبه أصدقاؤك وانضم إليهم</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setAppStage('main')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/40 transition-all flex items-center justify-center gap-2"
          >
            <span>دخول المنصة والبدء الآن</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>
      )}

      {/* 4. STAGE: MAIN APP VIEW (الصفحة الرئيسية كما في الموقع - بدون أدمن + مع شارة المطور الموثق) */}
      {appStage === 'main' && (
        <div className="flex-1 flex flex-col justify-between bg-slate-950 text-right overflow-hidden">
          {/* Top Mobile Bar */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-md">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-white block">منصة المطورين</span>
                <span className="text-[9px] text-rose-400 font-mono">ROBLOX APP</span>
              </div>
            </div>

            {/* User status & Developer Verified Badge */}
            <div className="flex items-center gap-2">
              {currentUser?.role === 'developer' && (
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold"
                  title="مطور معتمد وموثق"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>موثق</span>
                </div>
              )}

              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt="User"
                onClick={() => setActiveTab('profile')}
                className="w-7 h-7 rounded-lg object-cover border border-slate-700 cursor-pointer"
              />

              {onClose && (
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
                  title="إغلاق معاينة التطبيق"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Main App Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB: Home */}
            {activeTab === 'home' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Exclusive App VIP Feature Pill */}
                <button
                  onClick={() => setActiveTab('vip')}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-500/40 flex items-center justify-between text-right shadow-lg active:scale-98 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/30">
                      <Gift className="w-5 h-5 text-white animate-bounce" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-white">ميزات التطبيق الحصرية (VIP)</h4>
                        <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black text-[9px]">
                          حصرية بالتطبيق
                        </span>
                      </div>
                      <p className="text-[10px] text-amber-200/90 mt-0.5">
                        هدايا يومية مجانية، مسرّع ألعاب روبلوكس، وأكواد سرية لا توجد بالموقع!
                      </p>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-amber-400 shrink-0" />
                </button>

                {/* Hero Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-900/60 to-slate-900 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                      تطبيق روبلوكس الرسمي
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      متصل بالتطبيق
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white">استكشف ألعاب المطورين وتحديثاتها الحية</h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    شارك مع المطورين المعتمدين وجرّب أقوى الألعاب والسكربتات واستفد من ميزات التطبيق.
                  </p>
                </div>

                {/* Developer Verification Badge Highlight */}
                {currentUser?.role === 'developer' && (
                  <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">شارة المطور المعتمد مفعلة ⚡</h4>
                        <p className="text-[10px] text-emerald-300 font-mono">@{currentUser.robloxUsername || 'Developer'}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
                      VERIFIED
                    </span>
                  </div>
                )}

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveTab('roblox')}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right space-y-1 hover:border-slate-700"
                  >
                    <Gamepad2 className="w-4 h-4 text-rose-500" />
                    <h5 className="font-bold text-xs text-white">ألعاب روبلوكس</h5>
                    <p className="text-[10px] text-slate-400">{robloxGames.length} ألعاب متاحة</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('friends')}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right space-y-1 hover:border-slate-700"
                  >
                    <Users className="w-4 h-4 text-indigo-400" />
                    <h5 className="font-bold text-xs text-white">الأصدقاء</h5>
                    <p className="text-[10px] text-slate-400">{friends.length} أصدقاء متصلين</p>
                  </button>
                </div>

                {/* Live Games feed */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-500" />
                      أحدث ألعاب روبلوكس
                    </span>
                    <button onClick={() => setActiveTab('roblox')} className="text-[10px] text-rose-400">
                      عرض الكل
                    </button>
                  </div>

                  {robloxGames.length === 0 ? (
                    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                      لا توجد ألعاب حالياً. المتجر جاهز لإضافة الألعاب!
                    </div>
                  ) : (
                    robloxGames.map(game => (
                      <div key={game.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                        <img src={game.image} alt={game.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h6 className="font-bold text-xs text-white truncate">{game.title}</h6>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="text-rose-400 font-mono">{game.version}</span>
                            <span>•</span>
                            <span>{game.developerName}</span>
                          </div>
                        </div>
                        {game.robloxGameUrl && (
                          <a
                            href={game.robloxGameUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-bold shrink-0 flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            العب
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB: VIP Perks (ميزات التطبيق الحصرية غير المتوفرة في الموقع) */}
            {activeTab === 'vip' && (
              <div className="space-y-4 animate-fadeIn">
                {/* VIP Header Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 text-white shadow-xl shadow-amber-600/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-[10px] font-bold text-amber-300">
                      ⭐ ميزات حصرية لمستخدمي التطبيق فقط
                    </span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-lg font-bold">
                      VIP Pass
                    </span>
                  </div>
                  <h3 className="text-base font-black">مزايا حصرية لا تظهر في موقع الويب</h3>
                  <p className="text-[11px] text-white/90 leading-relaxed">
                    استمتع بمكافآت روبلوكس اليومية، تفعيل وضع تسريع الألعاب، وتنبيهات الأكواد الفورية.
                  </p>
                </div>

                {claimSuccessMessage && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-fadeIn">
                    {claimSuccessMessage}
                  </div>
                )}

                {/* 1. Daily Robux Drop & Rewards Card */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Gift className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">صندوق الهدايا اليومي (Daily Drop)</h4>
                        <p className="text-[10px] text-slate-400">خاص بمستخدمي التطبيق كل 24 ساعة</p>
                      </div>
                    </div>
                    <div className="text-left font-mono">
                      <span className="text-xs font-black text-amber-400">{appRobuxBalance} R$</span>
                      <span className="block text-[9px] text-slate-400">رصيدك الافتراضي</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">+50 Robux افتراضي</span>
                      <span className="text-[10px] text-slate-400">مع كود خصم 30% للألعاب</span>
                    </div>

                    <button
                      onClick={handleClaimDailyReward}
                      disabled={dailyClaimed}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                        dailyClaimed
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black shadow-amber-500/25 active:scale-95'
                      }`}
                    >
                      {dailyClaimed ? 'تم الاستلام اليوم ✓' : 'مطالبة بالمكافأة 🎁'}
                    </button>
                  </div>
                </div>

                {/* 2. Roblox Game Booster & Ping Saver */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        gameBoosterActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">مسرّع ألعاب روبلوكس (Game Booster)</h4>
                        <p className="text-[10px] text-slate-400">تقليل البينغ وتوفير 65% من استهلاك البيانات</p>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      onClick={handleToggleBooster}
                      className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                        gameBoosterActive ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                    </button>
                  </div>

                  {gameBoosterActive && (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center animate-fadeIn font-mono">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="block text-xs font-bold text-emerald-400">14 ms</span>
                        <span className="text-[9px] text-slate-400">Server Ping</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="block text-xs font-bold text-rose-400">60 FPS</span>
                        <span className="text-[9px] text-slate-400">Frame Lock</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="block text-xs font-bold text-indigo-400">-65%</span>
                        <span className="text-[9px] text-slate-400">Data Saved</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Exclusive App Promo Codes Vault */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">خزينة الأكواد الحصرية (App Vault)</h4>
                      <p className="text-[10px] text-slate-400">أكواد سرية لألعاب روبلوكس مخصصة للتطبيق</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { code: 'ROBLOX-APP-VIP26', desc: 'شارة VIP مجانية + سلاح حصري في الألعاب' },
                      { code: 'BOOSTER-SPEED-99', desc: 'مضاعفة سرعة الترقية وXP بنسبة 200%' },
                      { code: 'DEV-OFFER-50X', desc: 'خصم 50% على جميع أدوات المتجر' }
                    ].map((item) => (
                      <div key={item.code} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-xs font-bold text-rose-400">{item.code}</span>
                          <p className="text-[10px] text-slate-400">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => handleCopyCode(item.code)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                        >
                          {copiedCode === item.code ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Push Notifications Toggle */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">إشعارات الأكواد الفورية</h4>
                      <p className="text-[10px] text-slate-400">تنبيه فوري عند نزول كود جديد لروبلوكس</p>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleNotifications}
                    className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                      pushNotificationsActive ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Roblox */}
            {activeTab === 'roblox' && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4 text-rose-500" />
                  <span>ألعاب روبلوكس وسجلات التحديثات</span>
                </h4>
                {robloxGames.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                    <Gamepad2 className="w-10 h-10 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">لا توجد ألعاب بعد. يمكنك نشر أول لعبة من حساب المطور.</p>
                  </div>
                ) : (
                  robloxGames.map(game => (
                    <div key={game.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={game.image} alt={game.title} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <h5 className="font-bold text-xs text-white">{game.title}</h5>
                          <span className="text-[10px] text-rose-400 font-mono">{game.version}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">{game.downloads} لاعب</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: Store */}
            {activeTab === 'store' && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-rose-500" />
                  <span>متجر التطبيقات والسكربتات</span>
                </h4>
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                  <ShoppingBag className="w-10 h-10 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400">المتجر فارغ وجاهز لنشر أول منتج!</p>
                </div>
              </div>
            )}

            {/* TAB: Articles */}
            {activeTab === 'articles' && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>المقالات والشروحات البرمجية</span>
                </h4>
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                  <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400">لا توجد مقالات منشورة بعد.</p>
                </div>
              </div>
            )}

            {/* TAB: Friends */}
            {activeTab === 'friends' && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>أصدقائي ({friends.length})</span>
                </h4>
                {friends.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                    <Users className="w-10 h-10 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">لا يوجد أصدقاء بعد. أضف أصدقاءك بحساب روبلوكس!</p>
                  </div>
                ) : (
                  friends.map(f => (
                    <div key={f.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <h6 className="font-bold text-xs text-white">{f.name}</h6>
                          <span className="text-[10px] text-rose-400 font-mono">@{f.robloxUsername}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {f.status === 'online' ? 'متصل' : 'غير متصل'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: Profile (WITH VERIFIED DEVELOPER BADGE) */}
            {activeTab === 'profile' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                  <div className="relative inline-block mx-auto">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt="Avatar"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 mx-auto"
                    />
                    {currentUser?.role === 'developer' && (
                      <span className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] border-2 border-slate-900">
                        <ShieldCheck className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h5 className="font-bold text-sm text-white">{currentUser?.name}</h5>
                    <p className="text-[11px] font-mono text-rose-400">@{currentUser?.robloxUsername || 'RobloxUser'}</p>

                    {/* Prominent Developer Badge */}
                    {currentUser?.role === 'developer' ? (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold mt-2">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>مطور روبلوكس وتطبيقات معتمد (Verified)</span>
                      </div>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] mt-2">
                        مستخدم عادي
                      </span>
                    )}

                    {/* App VIP Badge for All App Users */}
                    <div className="block mt-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                        <Gift className="w-3.5 h-3.5 text-amber-400" />
                        <span>عضوية VIP حصرية بالتطبيق • رصيد: {appRobuxBalance} R$</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                    {currentUser?.bio || 'عضو في منصة ألعاب روبلوكس وتطبيقات المطورين.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Mobile Navigation Bar (NO ADMIN IN APP) */}
          <div className="bg-slate-900 border-t border-slate-800 px-2 py-2 flex items-center justify-around text-[10px] font-bold text-slate-400">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'home' ? 'text-rose-500 font-bold' : 'hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>الرئيسية</span>
            </button>

            {/* Exclusive VIP App Perks Tab */}
            <button
              onClick={() => setActiveTab('vip')}
              className={`flex flex-col items-center gap-1 transition-colors relative ${
                activeTab === 'vip' ? 'text-amber-400 font-bold' : 'hover:text-white'
              }`}
            >
              <div className="relative">
                <Gift className="w-4 h-4 text-amber-400" />
                {!dailyClaimed && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                )}
              </div>
              <span className="text-amber-400">VIP حصرية</span>
            </button>

            <button
              onClick={() => setActiveTab('roblox')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'roblox' ? 'text-rose-500 font-bold' : 'hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>روبلوكس</span>
            </button>

            <button
              onClick={() => setActiveTab('store')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'store' ? 'text-rose-500 font-bold' : 'hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>المتجر</span>
            </button>

            <button
              onClick={() => setActiveTab('friends')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'friends' ? 'text-rose-500 font-bold' : 'hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>الأصدقاء</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'profile' ? 'text-rose-500 font-bold' : 'hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>بروفايلي</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
