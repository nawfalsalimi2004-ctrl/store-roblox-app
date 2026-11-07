import React, { useState } from 'react';
import {
  Gamepad2,
  Code2,
  PlusCircle,
  Flame,
  TrendingUp,
  Download,
  Users,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles,
  Layers,
  X,
  UploadCloud,
  FileCode2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const DeveloperDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { products, addProduct, addGameUpdate, deleteProduct } = useStore();

  const [activeTab, setActiveTab] = useState<'my-items' | 'post-update' | 'new-item'>('my-items');

  // Filter products developed by current user or show demo developer products
  const myProducts = products.filter(
    (p) => p.developerId === currentUser?.id || currentUser?.role === 'developer'
  );

  // Post update form state
  const [selectedProductForUpdate, setSelectedProductForUpdate] = useState(myProducts[0]?.id || '');
  const [updateVersion, setUpdateVersion] = useState('v2.5.0');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateChanges, setUpdateChanges] = useState(['', '', '']);
  const [updateBadge, setUpdateBadge] = useState('تحديث جديد');
  const [updateSuccess, setUpdateSuccess] = useState('');

  // New Product / Game form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'roblox_game' | 'app' | 'script' | 'asset'>('roblox_game');
  const [newCategory, setNewCategory] = useState<'ألعاب روبلوكس' | 'تطبيقات وبرامج' | 'سكربتات ونظم Luau' | 'نماذج وخرائط 3D' | 'واجهات مستخدم UI'>('ألعاب روبلوكس');
  const [newPlatform, setNewPlatform] = useState<'Roblox' | 'Windows' | 'Web'>('Roblox');
  const [newPrice, setNewPrice] = useState(0);
  const [newPlaceId, setNewPlaceId] = useState('');
  const [newGameUrl, setNewGameUrl] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80');
  const [newDescription, setNewDescription] = useState('');
  const [newDetailedDescription, setNewDetailedDescription] = useState('');
  const [newTags, setNewTags] = useState('Roblox, Luau, Game');
  const [newItemSuccess, setNewItemSuccess] = useState('');

  // Handle Post Update
  const handlePublishUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForUpdate || !updateTitle || !updateVersion) return;

    const prod = products.find((p) => p.id === selectedProductForUpdate);
    const validChanges = updateChanges.filter((c) => c.trim().length > 0);

    addGameUpdate(selectedProductForUpdate, {
      gameOrAppName: prod?.title || 'لعبة المطور',
      version: updateVersion,
      title: updateTitle,
      description: updateDescription || 'تحديث دوري وإصلاحات لمجتمع اللاعبين والمستخدمين.',
      changes: validChanges.length > 0 ? validChanges : ['تحسين استقرار الأداء', 'إصلاح بعض المشاكل البسيطة'],
      placeId: prod?.robloxPlaceId,
      badge: updateBadge
    });

    setUpdateSuccess(`🎉 تم نشر التحديث ${updateVersion} للعبة/التطبيق بنجاح! سيظهر لجميع اللاعبين.`);
    setUpdateTitle('');
    setUpdateDescription('');
    setUpdateChanges(['', '', '']);
    setTimeout(() => {
      setUpdateSuccess('');
      setActiveTab('my-items');
    }, 2500);
  };

  // Handle Create New Game or App
  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;

    const tagsArray = newTags.split(',').map((t) => t.trim()).filter(Boolean);

    addProduct({
      title: newTitle,
      description: newDescription,
      detailedDescription: newDetailedDescription || newDescription,
      price: Number(newPrice),
      category: newCategory,
      type: newType,
      platform: newPlatform,
      image: newImage,
      tags: tagsArray,
      developerId: currentUser?.id || 'dev-anon',
      developerName: currentUser?.name || 'مطور معتمد',
      developerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      version: 'v1.0.0',
      robloxPlaceId: newPlaceId || undefined,
      robloxGameUrl: newGameUrl || (newPlaceId ? `https://www.roblox.com/games/${newPlaceId}` : undefined),
      downloadUrl: '#download'
    });

    setNewItemSuccess('✨ تم نشر لعبتك/تطبيقك بنجاح في المتجر والمنصة!');
    setNewTitle('');
    setNewDescription('');
    setNewPlaceId('');
    setNewGameUrl('');
    setTimeout(() => {
      setNewItemSuccess('');
      setActiveTab('my-items');
    }, 2000);
  };

  // Quick helper to fill update modal for a specific game
  const openUpdateForGame = (productId: string) => {
    setSelectedProductForUpdate(productId);
    setActiveTab('post-update');
  };

  return (
    <div className="space-y-8 py-6 text-right">
      {/* Top Banner with Developer Profile */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt="Dev Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-rose-500 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser?.name || 'مطور روبلوكس'}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold font-mono">
                VERIFIED DEV
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              حساب روبلوكس: <span className="font-mono text-rose-300 font-bold">@{currentUser?.robloxUsername || 'SaadDev_Studio'}</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              التخصص: {currentUser?.specialty || 'مطور ألعاب روبلوكس ومبرمج Luau محترف'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('post-update')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all"
          >
            <Flame className="w-4 h-4" />
            <span>نشر تحديث جديد للعبة / تطبيق</span>
          </button>
          <button
            onClick={() => setActiveTab('new-item')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>إضافة لعبة أو تطبيق جديد</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>إجمالي الألعاب والتطبيقات</span>
            <Gamepad2 className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{myProducts.length}</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">ألعاب نشطة ومتاحة</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>إجمالي التحميلات واللاعبين</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {myProducts.reduce((acc, p) => acc + p.downloads, 0).toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">زيارة ولعب متواصل</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>إجمالي التحديثات المنشورة</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {myProducts.reduce((acc, p) => acc + p.updates.length, 0)}
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">سجلات Changelog حية</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>متوسط التقييمات</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">4.9 / 5.0</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">تقييم ممتاز من اللاعبين</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('my-items')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'my-items'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-rose-400" />
          <span>ألعابي وتطبيقاتي ({myProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('post-update')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'post-update'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>نشر تحديث لعبة (Post Changelog)</span>
        </button>

        <button
          onClick={() => setActiveTab('new-item')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'new-item'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>إضافة لعبة أو تطبيق جديد</span>
        </button>
      </div>

      {/* TAB 1: My Items */}
      {activeTab === 'my-items' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">قائمة المشاريع المنشورة</h3>
            <span className="text-xs text-slate-400">يمكنك إدارة التحديثات وتعديل بيانات اللعبة في أي وقت</span>
          </div>

          <div className="space-y-4">
            {myProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{prod.title}</h4>
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                        {prod.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono text-rose-400 bg-rose-500/10">
                        {prod.version}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">{prod.description}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                      <span>اللاعبون / التحميلات: <strong className="text-white">{prod.downloads.toLocaleString()}</strong></span>
                      <span>•</span>
                      <span>التحديثات المنشورة: <strong className="text-amber-400">{prod.updates.length}</strong></span>
                      {prod.robloxPlaceId && (
                        <>
                          <span>•</span>
                          <span>Roblox Place: <strong className="text-rose-400 font-mono">{prod.robloxPlaceId}</strong></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <button
                    onClick={() => openUpdateForGame(prod.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold border border-rose-500/30 transition-all"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>نشر تحديث</span>
                  </button>

                  {prod.robloxGameUrl && (
                    <a
                      href={prod.robloxGameUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>رابط روبلوكس</span>
                    </a>
                  )}

                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                    title="حذف المشروع"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Post Game Update / Changelog */}
      {activeTab === 'post-update' && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <span>نشر تحديث جديد للعبة روبلوكس أو تطبيق (Release Notes)</span>
            </h3>
            <p className="text-xs text-slate-400">
              سيظهر هذا التحديث فورياً في شريط التحديثات الحي وفي صفحة اللعبة لإعلام اللاعبين
            </p>
          </div>

          {updateSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{updateSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePublishUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">اختر اللعبة أو التطبيق المراد تحديثه</label>
              <select
                value={selectedProductForUpdate}
                onChange={(e) => setSelectedProductForUpdate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-white outline-none"
              >
                {myProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.version})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">رقم الإصدار الجديد (Version)</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: v2.5.0 أو v3.0-Beta"
                  value={updateVersion}
                  onChange={(e) => setUpdateVersion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-white font-mono outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">شارة التحديث (Badge)</label>
                <select
                  value={updateBadge}
                  onChange={(e) => setUpdateBadge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-white outline-none"
                >
                  <option value="تحديث ضخم">تحديث ضخم 🔥</option>
                  <option value="محتوى جديد">محتوى جديد 🎮</option>
                  <option value="حدث خاص">حدث موسمي / فعاليات 🎁</option>
                  <option value="إصلاحات أخطاء">إصلاحات أخطاء وتحسين أداء ⚡</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">عنوان التحديث الرئيسي</label>
              <input
                type="text"
                required
                placeholder="مثال: تحديث جزيرة البركان وسلاح الليزر 🌋"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">وصف موجز للتحديث</label>
              <textarea
                rows={2}
                placeholder="شرح بسيط للاعبين عن سبب هذا التحديث وما ينتظرهم..."
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-white outline-none"
              ></textarea>
            </div>

            {/* Changes list */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                تفاصيل التغييرات (سجل المزايا والإصلاحات Changelog)
              </label>
              {updateChanges.map((change, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-rose-500 font-mono">#{idx + 1}</span>
                  <input
                    type="text"
                    placeholder={`تغيير ${idx + 1}: مثال: إضافة 3 أسلحة جديدة وإصلاح لاق الخادم`}
                    value={change}
                    onChange={(e) => {
                      const newArr = [...updateChanges];
                      newArr[idx] = e.target.value;
                      setUpdateChanges(newArr);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-xs text-white outline-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setUpdateChanges([...updateChanges, ''])}
                className="text-xs text-rose-400 hover:underline pt-1 inline-block"
              >
                + إضافة سطر تغييرات إضافي
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5" />
              <span>إطلاق ونشر التحديث للاعبين الآن</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Add New Game or App */}
      {activeTab === 'new-item' && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
              <span>إضافة لعبة روبلوكس أو تطبيق أو أصل جديد إلى المتجر</span>
            </h3>
            <p className="text-xs text-slate-400">انشر مشاريعك ليتمكن اللاعبون والمطورون من اكتشافها واستخدامها</p>
          </div>

          {newItemSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{newItemSuccess}</span>
            </div>
          )}

          <form onSubmit={handleCreateNewItem} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">عنوان المشروع / اللعبة <span className="text-rose-500">*</span></label>
              <input
                type="text"
                required
                placeholder="مثال: لعبة حرب القراصنة أو تطبيق Studio Helper"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">نوع المنتج</label>
                <select
                  value={newType}
                  onChange={(e: any) => setNewType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white outline-none"
                >
                  <option value="roblox_game">لعبة روبلوكس كاملة</option>
                  <option value="app">تطبيق / برنامج كمبيوتر</option>
                  <option value="script">سكربت / نظام Luau</option>
                  <option value="asset">خريطة وموديلات 3D</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">القسم</label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white outline-none"
                >
                  <option value="ألعاب روبلوكس">ألعاب روبلوكس</option>
                  <option value="تطبيقات وبرامج">تطبيقات وبرامج</option>
                  <option value="سكربتات ونظم Luau">سكربتات ونظم Luau</option>
                  <option value="نماذج وخرائط 3D">نماذج وخرائط 3D</option>
                  <option value="واجهات مستخدم UI">واجهات مستخدم UI</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">السعر (USD)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0 للمجاني"
                  value={newPrice}
                  onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white outline-none font-mono"
                />
              </div>
            </div>

            {newType === 'roblox_game' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-rose-300 block">Roblox Place ID</label>
                  <input
                    type="text"
                    placeholder="مثال: 14285920194"
                    value={newPlaceId}
                    onChange={(e) => setNewPlaceId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-rose-300 block">رابط اللعبة المباشر على روبلوكس</label>
                  <input
                    type="url"
                    placeholder="https://www.roblox.com/games/..."
                    value={newGameUrl}
                    onChange={(e) => setNewGameUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">رابط صورة الغلاف أو الأيقونة</label>
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">وصف قصير</label>
              <textarea
                rows={2}
                required
                placeholder="وصف مختصر يظهر في بطاقة المنتج أو اللعبة..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white outline-none"
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">الوسوم (مفصولة بفواصل)</label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>إضافة ونشر في المنصة فوراً</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
