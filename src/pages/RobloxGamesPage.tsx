import React, { useState } from 'react';
import {
  Gamepad2,
  Flame,
  Star,
  Users,
  ExternalLink,
  Search,
  Sparkles,
  Calendar,
  CheckCircle,
  Copy,
  Check,
  PlusCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';

interface RobloxGamesPageProps {
  onOpenProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const RobloxGamesPage: React.FC<RobloxGamesPageProps> = ({ onOpenProduct, onNavigate }) => {
  const { products } = useStore();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPlaceId, setCopiedPlaceId] = useState<string | null>(null);

  const robloxGames = products.filter((p) => p.type === 'roblox_game');

  const filteredGames = robloxGames.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const copyPlaceId = (placeId: string) => {
    navigator.clipboard.writeText(placeId);
    setCopiedPlaceId(placeId);
    setTimeout(() => setCopiedPlaceId(null), 2000);
  };

  return (
    <div className="space-y-8 py-6 text-right">
      {/* Header */}
      <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 overflow-hidden shadow-xl transition-colors">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold">
            <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
            <span>مركز ألعاب روبلوكس وسجلات التحديثات الحية</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            عالم ألعاب روبلوكس وتحديثات المطورين
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            استعرض أحدث ألعاب روبلوكس المطورة، تابع تحديثات المطورين وسجلات التغيير (Changelogs)، وشغّل الألعاب مباشرة داخل محرك روبلوكس.
          </p>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
          <input
            type="text"
            placeholder="ابحث عن لعبة روبلوكس بالاسم أو الوسم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-11 pl-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-rose-500 transition-all shadow-sm"
          />
        </div>

        {(currentUser?.role === 'developer' || currentUser?.role === 'admin') && (
          <button
            onClick={() => onNavigate('developer-dashboard')}
            className="flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة لعبة روبلوكس جديدة</span>
          </button>
        )}
      </div>

      {/* Games List or Clean Empty State */}
      {filteredGames.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">لا توجد ألعاب روبلوكس منشورة حالياً</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              المتجر فارغ وجاهز لنشر أول لعبة! يمكنك تسجيل حساب مطور أو الدخول كـ أدمن لإضافة لعبتك الأولى وتحديثاتها.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {currentUser?.role === 'developer' || currentUser?.role === 'admin' ? (
              <button
                onClick={() => onNavigate('developer-dashboard')}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all"
              >
                نشر لعبتك الأولى الآن
              </button>
            ) : (
              <button
                onClick={() => onNavigate('developer-register')}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all"
              >
                انضم كمطور روبلوكس وانشر لعبتك
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-md"
                  />
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        onClick={() => onOpenProduct(game)}
                        className="text-xl font-bold text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer transition-colors"
                      >
                        {game.title}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/10 text-rose-500 font-mono text-xs font-bold">
                        {game.version}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                      {game.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                      <span>المطور: <strong className="text-slate-800 dark:text-white">{game.developerName}</strong></span>
                      <span>•</span>
                      <span>{game.downloads} لاعب</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                  {game.robloxPlaceId && (
                    <button
                      onClick={() => copyPlaceId(game.robloxPlaceId!)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-rose-500 transition-all"
                    >
                      {copiedPlaceId === game.robloxPlaceId ? 'تم النسخ!' : `Place: ${game.robloxPlaceId}`}
                    </button>
                  )}

                  <button
                    onClick={() => onOpenProduct(game)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    التفاصيل
                  </button>

                  {game.robloxGameUrl && (
                    <a
                      href={game.robloxGameUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>تشغيل بروبلوكس</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
