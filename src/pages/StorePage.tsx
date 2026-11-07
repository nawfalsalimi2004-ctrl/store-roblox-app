import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Star,
  ExternalLink,
  Gamepad2,
  Code2,
  Layers,
  Box,
  Monitor,
  Check,
  PlusCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';

interface StorePageProps {
  onOpenProduct: (product: Product) => void;
  onOpenCart: () => void;
}

export const StorePage: React.FC<StorePageProps> = ({ onOpenProduct, onOpenCart }) => {
  const { products, addToCart } = useStore();
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const categories = [
    { label: 'الكل', icon: Box },
    { label: 'ألعاب روبلوكس', icon: Gamepad2 },
    { label: 'تطبيقات وبرامج', icon: Monitor },
    { label: 'سكربتات ونظم Luau', icon: Code2 },
    { label: 'نماذج وخرائط 3D', icon: Layers },
    { label: 'واجهات مستخدم UI', icon: Box }
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'الكل' || p.category === selectedCategory;
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'free' && p.price === 0) ||
      (priceFilter === 'paid' && p.price > 0);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesPrice && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div className="space-y-8 py-6 text-right">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-xl transition-colors">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <ShoppingBag className="w-4 h-4" />
            <span>متجر التطبيقات والبرمجيات وأصول ألعاب روبلوكس</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            المتجر الرقمي للمطورين واللاعبين
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            تصفح أدوات المطورين، برامج سطح المكتب، نماذج 3D، سكربتات وأنظمة Luau المتقدمة وأضخم ألعاب روبلوكس.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search and Price Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
            <input
              type="text"
              placeholder="ابحث بالاسم أو الوسوم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-rose-500 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 self-end sm:self-auto">
            <button
              onClick={() => setPriceFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                priceFilter === 'all' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setPriceFilter('free')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                priceFilter === 'free' ? 'bg-emerald-600 text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              مجاناً
            </button>
            <button
              onClick={() => setPriceFilter('paid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                priceFilter === 'paid' ? 'bg-rose-600 text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              مدفوع
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3 shadow-sm">
          <ShoppingBag className="w-14 h-14 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">المتجر فارغ حالياً</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            تم تفريغ المنتجات التجريبية. يمكن للمطورين الآن إضافة برامجهم، سكربتاتهم، ونماذجهم الخاصة إلى المتجر.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-xs font-bold">
                    {prod.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3
                    onClick={() => onOpenProduct(prod)}
                    className="font-bold text-slate-900 dark:text-white text-base hover:text-rose-500 cursor-pointer"
                  >
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{prod.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-base font-black text-rose-600 dark:text-rose-400 font-mono">
                    {prod.price === 0 ? 'مجاناً' : `$${prod.price}`}
                  </span>
                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
                  >
                    إضافة للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
