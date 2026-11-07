import React, { useState } from 'react';
import {
  ArrowRight,
  Heart,
  Share2,
  Clock,
  Eye,
  MessageSquare,
  Send,
  Sparkles,
  Tag,
  CheckCircle,
  Copy,
  Check,
  Trash2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

interface ArticleDetailPageProps {
  articleId: string;
  onBack: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleId, onBack }) => {
  const { articles, likeArticle, addComment, deleteArticle } = useStore();
  const { currentUser } = useAuth();

  const article = articles.find((a) => a.id === articleId);

  const [commentText, setCommentText] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!article) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">المقال غير موجود أو تم حذفه</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
        >
          العودة للمقالات
        </button>
      </div>
    );
  }

  const handleLike = () => {
    if (!hasLiked) {
      likeArticle(article.id);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(
      article.id,
      currentUser?.name || 'مطور زائر',
      currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      commentText.trim()
    );

    setCommentText('');
  };

  const copyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-right space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span>العودة لجميع المقالات</span>
      </button>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTimeMinutes} دقائق قراءة
          </span>
          <span className="text-xs text-slate-400">تاريخ النشر: {article.createdAt}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {article.title}
        </h1>

        {/* Author & Interactions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-700"
            />
            <div>
              <h4 className="font-bold text-white text-sm">{article.author.name}</h4>
              <p className="text-xs text-slate-400">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                hasLiked
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'text-rose-500'}`} />
              <span>{article.likes} إعجاب</span>
            </button>

            <button
              onClick={copyShare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">تم نسخ الرابط!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة</span>
                </>
              )}
            </button>

            {(currentUser?.role === 'admin' || currentUser?.id === article.author.id) && (
              <button
                onClick={() => {
                  if (window.confirm(`هل أنت متأكد من حذف مقال "${article.title}" نهائياً من الموقع والتطبيق؟`)) {
                    deleteArticle(article.id);
                    onBack();
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 border border-red-500/30 text-red-400 hover:text-white text-xs font-bold transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>حذف المقال</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none text-slate-200 text-base leading-relaxed space-y-6 bg-slate-900/60 border border-slate-800/80 p-6 sm:p-10 rounded-3xl backdrop-blur-md">
        <div className="whitespace-pre-line font-sans text-sm sm:text-base leading-loose">
          {article.content}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-bold ml-2">الوسوم:</span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Comments Section */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-lg text-white">التعليقات والمناقشات ({(article.comments || []).length})</h3>
          </div>
        </div>

        {/* New Comment Input */}
        <form onSubmit={handleAddComment} className="flex gap-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt="Current User"
            className="w-10 h-10 rounded-xl object-cover shrink-0 hidden sm:block"
          />
          <div className="flex-1 space-y-2">
            <textarea
              rows={3}
              placeholder="شارك رأيك أو استفسارك حول هذا الدرس أو الشرح..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all"
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>إرسال التعليق</span>
              </button>
            </div>
          </div>
        </form>

        {/* Existing Comments */}
        <div className="space-y-4 pt-4">
          {(!article.comments || article.comments.length === 0) ? (
            <p className="text-xs text-slate-400 text-center py-6">
              كن أول من يعلق ويشارك في هذا المقال!
            </p>
          ) : (
            (article.comments || []).map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                    <span className="font-bold text-white">{comment.authorName}</span>
                  </div>
                  <span className="text-slate-500">{comment.createdAt}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pr-9">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
