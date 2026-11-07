import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  PlusCircle,
  Tag,
  CheckCircle,
  X,
  Trash2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Article } from '../types';

interface ArticlesPageProps {
  onOpenArticle: (id: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onOpenArticle }) => {
  const { articles, addArticle, deleteArticle } = useStore();
  const { currentUser } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'تطوير روبلوكس' | 'برمجة Luau' | 'شروحات تقنية' | 'أخبار الألعاب' | 'تصميم ثلاثي الأبعاد'>('تطوير روبلوكس');
  const [newTags, setNewTags] = useState('Roblox, Luau, برمجة');
  const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80');

  const categories = [
    'الكل',
    'تطوير روبلوكس',
    'برمجة Luau',
    'شروحات تقنية',
    'أخبار الألعاب',
    'تصميم ثلاثي الأبعاد'
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'الكل' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    addArticle({
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      excerpt: newExcerpt || newContent.slice(0, 120) + '...',
      content: newContent,
      coverImage: newCover,
      category: newCategory,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      readTimeMinutes: Math.ceil(newContent.length / 500) || 4,
      author: {
        id: currentUser?.id || 'admin',
        name: currentUser?.name || 'المشرف',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: currentUser?.role === 'admin' ? 'مشرف المنصة' : 'مطور معتمد'
      }
    });

    setIsCreateOpen(false);
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
  };

  return (
    <div className="space-y-8 py-6 text-right">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl transition-colors">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <BookOpen className="w-4 h-4" />
            <span>مدونة ومكتبة المقالات والشروحات</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            شروحات ومقالات تطوير ألعاب روبلوكس
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            تعلم أسرار محرك روبلوكس، حماية السيرفرات، برمجة Luau، ونماذج الألعاب الحديثة مع كتابات نخبة المطورين والمشرفين.
          </p>
        </div>

        {(currentUser?.role === 'developer' || currentUser?.role === 'admin') && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>نشر مقال جديد</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-rose-500 transition-all shadow-sm"
            />
          </div>

          <span className="text-xs text-slate-400">
            {filteredArticles.length} مقالات
          </span>
        </div>
      </div>

      {/* Articles Grid or Empty State */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3 shadow-sm">
          <BookOpen className="w-14 h-14 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">لا توجد مقالات منشورة بعد</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            تم تفريغ المقالات التجريبية. يمكنك تسجيل الدخول كـ أدمن أو كمطور لنشر أول درس أو مقال برمجي!
          </p>
          {(currentUser?.role === 'developer' || currentUser?.role === 'admin') && (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold inline-block"
            >
              كتابة ونشر مقال الآن
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onOpenArticle(art.id)}
              className="group cursor-pointer rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-slate-900/90 text-rose-300 border border-slate-700 text-xs font-semibold">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-rose-600 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{art.excerpt}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>{art.author.name}</span>
                  <div className="flex items-center gap-2">
                    <span>{art.readTimeMinutes} دقيقة</span>
                    {(currentUser?.role === 'admin' || currentUser?.id === art.author.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`هل أنت متأكد من حذف مقال "${art.title}" نهائياً من الموقع والتطبيق؟`)) {
                            deleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all ml-1"
                        title="حذف المقال"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Article Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">نشر مقال أو شرح برمجي جديد</h3>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">عنوان المقال</label>
                <input
                  type="text"
                  required
                  placeholder="عنوان الدرس أو المقال..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">التصنيف</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  >
                    <option value="تطوير روبلوكس">تطوير روبلوكس</option>
                    <option value="برمجة Luau">برمجة Luau</option>
                    <option value="شروحات تقنية">شروحات تقنية</option>
                    <option value="أخبار الألعاب">أخبار الألعاب</option>
                    <option value="تصميم ثلاثي الأبعاد">تصميم ثلاثي الأبعاد</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">الوسوم</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">نص المقال الكامل</label>
                <textarea
                  rows={6}
                  required
                  placeholder="اكتب المحتوى والشرح البرمجي..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>نشر المقال فوراً</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
