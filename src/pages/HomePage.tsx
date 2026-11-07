import React from 'react';
import {
  Gamepad2,
  Sparkles,
  ShoppingBag,
  BookOpen,
  Code2,
  ShieldCheck,
  Flame,
  ArrowLeft,
  Download,
  ExternalLink,
  Star,
  Users,
  Layers,
  CheckCircle,
  Radio,
  Smartphone,
  Play
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenProduct: (product: Product) => void;
  onOpenAppDownload: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenProduct, onOpenAppDownload }) => {
  const { products, articles, addToCart } = useStore();
  const { currentUser, friends } = useAuth();

  const featuredGames = (products || []).filter(p => p && p.type === 'roblox_game');
  const featuredApps = (products || []).filter(p => p && p.type !== 'roblox_game');
  const featuredArticles = (articles || []).slice(0, 3);
  const allRecentUpdates = (products || [])
    .flatMap(p => p.updates || [])
    .filter(u => u && u.id && u.title)
    .slice(0, 3);

  return (
    <div className="space-y-16 py-6 text-right">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-red-100/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/40 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 lg:p-16 shadow-xl transition-colors">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/10 dark:bg-rose-600/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-bold shadow-sm">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>المنصة الأولى المخصصة لمطوري ألعاب روبلوكس ومجتمع البرمجة العربي</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            استكشف أضخم ألعاب <span className="bg-gradient-to-r from-rose-600 to-red-500 bg-clip-text text-transparent">روبلوكس</span> وتطبيقات المطورين مع تحديثات مستمرة
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            منصة تجمع المقالات والشروحات المتقدمة في لغة Luau، متجر التطبيقات والبرامج، مجتمع الأصدقاء، وتطبيق موبايل متكامل للهواتف الذكية.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('roblox')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>ألعاب روبلوكس وتحديثاتها الحية</span>
            </button>

            {/* Direct Download App CTA */}
            <a
              href="/RobloxDevStore-v1.0.0.apk"
              download="RobloxDevStore-v1.0.0.apk"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-5 h-5 animate-bounce" />
              <span>تحميل تطبيق الأندرويد مباشرة (APK)</span>
            </a>

            <button
              onClick={onOpenAppDownload}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105 border border-slate-700"
            >
              <Smartphone className="w-5 h-5 text-rose-400" />
              <span>معاينة المحاكي</span>
            </button>

            <button
              onClick={() => onNavigate('store')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <span>متجر البرامج والأصول</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 text-center shadow-sm">
            <span className="block text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">+140,000</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">تحميل ولعب مباشر</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 text-center shadow-sm">
            <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">+350</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">مطور روبلوكس موثق</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 text-center shadow-sm">
            <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">100%</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">تحقق أمني برمز OTP</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 text-center shadow-sm">
            <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">+25</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">تحديث شهري جديد للألعاب</span>
          </div>
        </div>
      </section>

      {/* Mobile App Promotion Card */}
      <section className="rounded-3xl border border-rose-300 dark:border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-white dark:via-slate-900 to-indigo-500/10 p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-xl shadow-rose-600/30 shrink-0">
              <Smartphone className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white">
                  حمّل تطبيق المنصة الأصلي للأندرويد (ملف APK مباشر)
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold">2.8 MB • ميزات VIP حصرية</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                تنزيل مباشر وسريع من موقعنا مخصص لـ developer-blush-psi.vercel.app، يحتوي على مكافآت Robux يومية، مسرّع ألعاب روبلوكس، وأكواد سرية لا توجد في موقع الويب.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="/RobloxDevStore-v1.0.0.apk"
              download="RobloxDevStore-v1.0.0.apk"
              className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 animate-bounce" />
              <span>تحميل ملف APK مباشرة</span>
            </a>

            <button
              onClick={onOpenAppDownload}
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700"
            >
              <Smartphone className="w-4 h-4 text-rose-500" />
              <span>تشغيل المحاكي التفاعلي</span>
            </button>
          </div>
        </div>

        {/* 3 Step Installation Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs shrink-0">1</span>
            <span>اضغط فوق زر <strong>تحميل ملف APK</strong> ليتم حفظه بهاتفك</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs shrink-0">2</span>
            <span>افتح الملف من التنزيلات واضغط <strong>تثبيت (Install)</strong></span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">3</span>
            <span>افتح التطبيق وسجل دخولك لتظهر <strong>شارة التوثيق</strong> فوراً</span>
          </div>
        </div>
      </section>

      {/* Live Roblox Updates Banner */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">آخر تحديثات وسجلات ألعاب روبلوكس (Live Changelogs)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">أحدث الإضافات والمزايا التي أطلقها المطورون لألعابهم</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('roblox')}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            عرض جميع التحديثات <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {allRecentUpdates.length === 0 ? (
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-xs text-slate-400 shadow-sm">
            لا توجد تحديثات منشورة بعد. سجل كمطور أو ادخل كـ أدمن لإطلاق أول تحديث للعبة!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allRecentUpdates.map((upd) => (
              <div
                key={upd.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {upd.gameOrAppName}
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    {upd.version}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{upd.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{upd.description}</p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>تاريخ التحديث: {upd.releaseDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Roblox Games Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">أشهر ألعاب روبلوكس</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">ألعاب عربية متميزة تم تطويرها بواسطة نخبة المطورين</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('roblox')}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            عرض الكل <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {featuredGames.length === 0 ? (
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-xs text-slate-400 shadow-sm">
            لا توجد ألعاب روبلوكس منشورة حالياً. المتجر جاهز لنشر أول لعبة!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGames.map((game) => (
              <div
                key={game.id}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col shadow-sm"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-rose-400 border border-slate-700 text-xs font-bold font-mono">
                      {game.version}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md">
                      Roblox Game
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3
                      onClick={() => onOpenProduct(game)}
                      className="text-lg font-bold text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer transition-colors"
                    >
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{game.developerName}</span>
                    <button
                      onClick={() => onOpenProduct(game)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-xs font-bold"
                    >
                      التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Developer Invitation Callout with OTP highlight */}
      <section className="rounded-3xl bg-gradient-to-r from-rose-100 via-rose-50 to-indigo-100 dark:from-rose-950/60 dark:via-slate-900 dark:to-indigo-900/50 border border-rose-300 dark:border-rose-500/30 p-8 sm:p-12 text-center space-y-6 shadow-xl transition-colors">
        <div className="w-14 h-14 rounded-2xl bg-rose-600/20 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center border border-rose-500/40 shadow-lg shadow-rose-600/20">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            هل أنت مطور ألعاب روبلوكس أو مبرمج تطبيقات؟
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            انضم إلى شبكة مطورينا المعتمدين، احصل على شارة التوثيق (Verified Dev ⚡)، وانشر ألعابك وتطبيقاتك للمستخدمين فورياً. التحقق فوري عبر إرسال رمز تحقق (OTP) إلى بريدك الإلكتروني!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('developer-register')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105"
          >
            إنشاء حساب مطور والتحقق بالبريد الآن
          </button>
        </div>
      </section>
    </div>
  );
};
