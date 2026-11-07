import React, { useState } from 'react';
import {
  ArrowRight,
  Download,
  ExternalLink,
  Star,
  ShieldCheck,
  Flame,
  Calendar,
  CheckCircle,
  Copy,
  Check,
  Gamepad2,
  Users,
  Layers,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onOpenCart: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onOpenCart }) => {
  const { addToCart } = useStore();
  const [copiedPlaceId, setCopiedPlaceId] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const copyPlaceId = () => {
    if (product.robloxPlaceId) {
      navigator.clipboard.writeText(product.robloxPlaceId);
      setCopiedPlaceId(true);
      setTimeout(() => setCopiedPlaceId(false), 2000);
    }
  };

  return (
    <div className="space-y-8 py-6 text-right max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span>العودة للمتجر</span>
      </button>

      {/* Main Showcase Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        {/* Image & Screenshots */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-slate-900/90 text-rose-400 border border-slate-700 text-xs font-mono font-bold">
                {product.version}
              </span>
              <span className="px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-bold">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Info & Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h1 className="text-2xl font-black text-white leading-tight">{product.title}</h1>
            <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                {product.rating} ({product.reviewsCount} تقييم)
              </span>
              <span>•</span>
              <span>{product.downloads.toLocaleString()} مستخدم</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">السعر الإجمالي</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-rose-400 font-mono">
                  {product.price === 0 ? 'مجاناً' : `$${product.price}`}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-slate-500 font-mono">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Roblox Place ID Badge */}
            {product.robloxPlaceId && (
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Roblox Place ID:</span>
                <button
                  onClick={copyPlaceId}
                  className="font-mono text-rose-400 font-bold flex items-center gap-1 hover:underline"
                >
                  {copiedPlaceId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{product.robloxPlaceId}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-2">
            {product.type === 'roblox_game' && product.robloxGameUrl ? (
              <a
                href={product.robloxGameUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Gamepad2 className="w-5 h-5" />
                <span>تشغيل اللعبة الآن في روبلوكس</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>تمت الإضافة إلى السلة!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>إضافة للسلة والتحميل المباشر</span>
                  </>
                )}
              </button>
            )}

            {/* Developer Card */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <img
                src={product.developerAvatar}
                alt={product.developerName}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">المطور المعتمد</span>
                <span className="text-xs font-bold text-white">{product.developerName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description and Changelogs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              تفاصيل ومميزات المنتج
            </h2>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-2">
              {product.detailedDescription}
            </div>
          </div>
        </div>

        {/* Updates / Changelogs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Flame className="w-5 h-5 text-rose-500" />
            <span>سجل التحديثات الحية ({product.updates.length})</span>
          </div>

          {product.updates.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 text-center">
              الإصدار الأولي مستقر. لم تصدر تحديثات لاحقة بعد.
            </div>
          ) : (
            <div className="space-y-3">
              {product.updates.map((upd) => (
                <div
                  key={upd.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                      {upd.version}
                    </span>
                    <span className="text-slate-400">{upd.releaseDate}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs">{upd.title}</h4>
                  <ul className="space-y-1 text-slate-300 text-xs">
                    {upd.changes.map((c, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
