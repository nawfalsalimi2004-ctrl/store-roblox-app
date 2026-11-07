import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Gamepad2,
  Code2,
  Calendar,
  ExternalLink,
  Edit3,
  Check,
  Flame,
  Users,
  ShoppingBag,
  Sparkles,
  Link,
  Save,
  CheckCircle2,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { firebaseConfig } from '../firebase/config';
import { Product } from '../types';

interface ProfilePageProps {
  onOpenProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onOpenProduct, onNavigate }) => {
  const { currentUser, updateProfile, friends } = useAuth();
  const { products } = useStore();

  const [activeTab, setActiveTab] = useState<'creations' | 'purchases' | 'edit'>('creations');
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [name, setName] = useState(currentUser?.name || '');
  const [robloxUsername, setRobloxUsername] = useState(currentUser?.robloxUsername || '');
  const [robloxProfileUrl, setRobloxProfileUrl] = useState(currentUser?.robloxProfileUrl || '');
  const [specialty, setSpecialty] = useState(currentUser?.specialty || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold dark:text-white text-slate-800">يرجى تسجيل الدخول لعرض ملفك الشخصي</h2>
        <button
          onClick={() => onNavigate('login')}
          className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
        >
          تسجيل الدخول
        </button>
      </div>
    );
  }

  const myGames = products.filter(p => p.developerId === currentUser.id || currentUser.role === 'developer');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      robloxUsername,
      robloxProfileUrl,
      specialty,
      bio,
      avatar
    });
    setSavedSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 py-6 text-right max-w-5xl mx-auto">
      {/* Profile Banner & Header Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-colors">
        {/* Cover Photo */}
        <div className="h-44 sm:h-56 w-full relative overflow-hidden bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-700">
          <img
            src={currentUser.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'}
            alt="Cover"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-slate-900 via-transparent to-transparent"></div>

          {/* Firebase Connection Pill */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[11px] text-amber-400 font-mono shadow-md">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Firebase: Connected ({firebaseConfig.projectId})</span>
          </div>
        </div>

        {/* Profile Avatar & Info Row */}
        <div className="px-6 sm:px-10 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-right">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-2xl bg-slate-800"
              />
              {currentUser.isVerified && (
                <div
                  className="absolute -bottom-1 -left-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-lg"
                  title="مطور معتمد"
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {currentUser.name}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                    : currentUser.role === 'developer'
                    ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    : 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                }`}>
                  {currentUser.role === 'admin' ? '🛡️ ADMIN' : currentUser.role === 'developer' ? '⚡ VERIFIED DEV' : '👤 USER'}
                </span>
              </div>

              {currentUser.robloxUsername && (
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono">
                  <span className="text-rose-500 dark:text-rose-400 font-bold">@{currentUser.robloxUsername}</span>
                  {currentUser.robloxProfileUrl && (
                    <a
                      href={currentUser.robloxProfileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center gap-0.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>رابط روبلوكس</span>
                    </a>
                  )}
                </div>
              )}

              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                {currentUser.bio || 'لم يتم إضافة نبذة شخصية بعد.'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('edit');
                setIsEditing(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all border border-slate-300 dark:border-slate-700"
            >
              <Edit3 className="w-4 h-4 text-rose-500" />
              <span>تعديل الملف الشخصي</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-200 dark:border-slate-800 divide-x divide-x-reverse divide-slate-200 dark:divide-slate-800 bg-slate-50/70 dark:bg-slate-950/40 text-center py-4">
          <div className="p-2">
            <span className="block text-xl font-black text-rose-600 dark:text-rose-400 font-mono">
              {myGames.length}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">ألعاب ومشاريع منشورة</span>
          </div>

          <div className="p-2">
            <span className="block text-xl font-black text-slate-800 dark:text-white font-mono">
              {friends.length}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">أصدقاء في روبلوكس</span>
          </div>

          <div className="p-2">
            <span className="block text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {myGames.reduce((acc, p) => acc + p.downloads, 0).toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">إجمالي اللاعبين</span>
          </div>

          <div className="p-2">
            <span className="block text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {currentUser.createdAt}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">تاريخ الانضمام</span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>تم حفظ وتحديث بيانات ملفك الشخصي ومزامنتها بنجاح!</span>
        </div>
      )}

      {/* Profile Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('creations')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'creations'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>ألعابي ومشاريعي ({myGames.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('purchases')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'purchases'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>ألعابي المحملة والمشتريات</span>
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'edit'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>تعديل الحساب والبيانات</span>
        </button>
      </div>

      {/* TAB 1: Creations */}
      {activeTab === 'creations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">الألعاب والأدوات المنشورة</h3>
            {currentUser.role === 'developer' && (
              <button
                onClick={() => onNavigate('developer-dashboard')}
                className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
              >
                <span>فتح لوحة تحكم المطورين</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myGames.map(game => (
              <div
                key={game.id}
                className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-bold">
                      {game.category}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{game.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{game.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">الإصدار: {game.version}</span>
                  <button
                    onClick={() => onOpenProduct(game)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                  >
                    معاينة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Purchases */}
      {activeTab === 'purchases' && (
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-900 dark:text-white text-base">سجل مشترياتك وتنزيلاتك</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            جميع السكربتات والنماذج والتطبيقات التي قمت بتنزيلها ستظهر هنا مع روابط التحميل المباشرة الخاصة بك.
          </p>
          <button
            onClick={() => onNavigate('store')}
            className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all inline-block"
          >
            تصفح المتجر الآن
          </button>
        </div>
      )}

      {/* TAB 3: Edit Profile */}
      {activeTab === 'edit' && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-rose-500" />
              <span>تعديل بيانات الملف الشخصي وحساب روبلوكس</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              قم بتحديث اسمك، حساب روبلوكس، ورابط ملفك لتظهر لزملائك وأصدقائك في المنصة
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  الاسم المعروض
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  اسم المستخدم في روبلوكس (Roblox Username)
                </label>
                <div className="relative">
                  <span className="absolute right-3.5 top-3.5 text-slate-400 font-mono text-sm">@</span>
                  <input
                    type="text"
                    value={robloxUsername}
                    onChange={(e) => setRobloxUsername(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-rose-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  رابط ملف روبلوكس (Profile URL)
                </label>
                <input
                  type="url"
                  placeholder="https://www.roblox.com/users/..."
                  value={robloxProfileUrl}
                  onChange={(e) => setRobloxProfileUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-rose-500 font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  التخصص البرمجي / الدور
                </label>
                <input
                  type="text"
                  placeholder="مثال: مطور ألعاب روبلوكس و Luau"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                رابط الصورة الرمزية (Avatar URL)
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-rose-500 font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                النبذة الشخصية (Bio)
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-rose-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>حفظ التعديلات وتحديث البروفيل</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
