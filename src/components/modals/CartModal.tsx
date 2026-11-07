import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, CheckCircle2, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, totalCartPrice } = useStore();
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsSuccess(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-right flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">سلة المشتريات والتحميل</h3>
              <p className="text-xs text-slate-400">{cart.length} عناصر محددة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">تم تأكيد الطلب والتحميل بنجاح!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                شكراً لدعمك مطوري روبلوكس والتطبيقات! أصبحت المنتجات متاحة الآن في حسابك وجاهزة للتحميل والتشغيل فوراً.
              </p>
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-right space-y-2">
                <p className="text-xs text-slate-400 font-semibold">روابط التحميل المباشرة:</p>
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between py-1.5 border-b border-slate-700/50 last:border-0 text-sm">
                    <span className="text-white truncate max-w-[200px]">{item.product.title}</span>
                    {item.product.type === 'roblox_game' ? (
                      <a
                        href={item.product.robloxGameUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-lg bg-rose-600/30 text-rose-400 hover:bg-rose-600 hover:text-white text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        تشغيل على روبلوكس <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="px-3 py-1 rounded-lg bg-emerald-600/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
                        جاهز للتنزيل <Download className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:brightness-110 transition-all shadow-lg shadow-emerald-600/30"
              >
                إنهاء والعودة للمتجر
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-14 h-14 text-slate-600 mx-auto stroke-[1.5]" />
              <p className="text-slate-400 font-medium">سلة التسوق فارغة حالياً</p>
              <button
                onClick={onClose}
                className="text-xs text-rose-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                تصفح متجر التطبيقات والألعاب <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-2xl border border-slate-700/70"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-white text-sm truncate">{item.product.title}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                        {item.product.category}
                      </span>
                      <span className="text-xs text-slate-400">الكمية: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-left flex flex-col items-end gap-1">
                    <span className="font-bold text-rose-400 text-sm">
                      {item.product.price === 0 ? 'مجاناً' : `$${(item.product.price * item.quantity).toFixed(2)}`}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && cart.length > 0 && (
          <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-sm">المجموع الكلي:</span>
              <span className="text-2xl font-black text-white font-mono">
                {totalCartPrice === 0 ? 'مجاناً 0.00$' : `$${totalCartPrice.toFixed(2)}`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCheckout}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all"
              >
                إتمام الطلب وتنزيل الملفات
              </button>
              <button
                onClick={clearCart}
                className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="تفريغ السلة"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
