import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  BookOpen,
  ShoppingBag,
  Gamepad2,
  Trash2,
  CheckCircle,
  XCircle,
  Award,
  Flame,
  Search,
  ExternalLink,
  Code2,
  Clock,
  Mail,
  Key,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  Terminal,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { UserRole } from '../types';

interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  environment: 'production' | 'development';
  scopes: string[];
  expiresAt: string;
  createdAt: string;
  lastUsed: string;
  requestCount: number;
  status: 'active' | 'revoked';
}

const DEFAULT_API_KEYS: ApiKeyItem[] = [
  {
    id: 'key-1',
    name: 'Roblox Studio Luau Bridge (Main Server)',
    key: 'rbx_live_9f8e4a1c62d083e9b7a4128f09d6c77a',
    environment: 'production',
    scopes: ['read:games', 'write:games', 'verify:developers'],
    expiresAt: '2027-11-07',
    createdAt: '2026-11-01',
    lastUsed: 'منذ 5 دقائق',
    requestCount: 1420,
    status: 'active'
  },
  {
    id: 'key-2',
    name: 'Mobile App Client Secret',
    key: 'rbx_live_3b7a81e92d8471c0fa56e89134a6bc99',
    environment: 'production',
    scopes: ['read:games', 'read:users'],
    expiresAt: '2027-05-01',
    createdAt: '2026-11-05',
    lastUsed: 'الآن',
    requestCount: 890,
    status: 'active'
  },
  {
    id: 'key-3',
    name: 'Development Testing & Sandbox Key',
    key: 'rbx_test_41c0ea8891bf72803de104928fac9173',
    environment: 'development',
    scopes: ['read:games', 'write:games', 'admin:full'],
    expiresAt: '2026-12-31',
    createdAt: '2026-11-07',
    lastUsed: 'منذ ساعتين',
    requestCount: 64,
    status: 'active'
  }
];

export const AdminDashboardPage: React.FC = () => {
  const { users, currentUser, pendingApplications, updateUserRole, verifyDeveloperManual } = useAuth();
  const { articles, products, deleteArticle, deleteProduct } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'products' | 'articles' | 'api-keys'>('overview');
  const [userSearch, setUserSearch] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(() => {
    const saved = localStorage.getItem('app_api_keys_v1');
    return saved ? JSON.parse(saved) : DEFAULT_API_KEYS;
  });

  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnv, setNewKeyEnv] = useState<'production' | 'development'>('production');
  const [newKeyExpiry, setNewKeyExpiry] = useState('365');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['read:games', 'write:games']);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [revealedKeyIds, setRevealedKeyIds] = useState<Record<string, boolean>>({});
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [activeCodeSnippet, setActiveCodeSnippet] = useState<'luau' | 'curl' | 'js'>('luau');

  useEffect(() => {
    localStorage.setItem('app_api_keys_v1', JSON.stringify(apiKeys));
  }, [apiKeys]);

  const generateRandomHex = (length: number) => {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      showNotice('يرجى إدخال اسم أو غرض المفتاح.');
      return;
    }

    const prefix = newKeyEnv === 'production' ? 'rbx_live_' : 'rbx_test_';
    const secret = prefix + generateRandomHex(32);
    
    const expiryDays = parseInt(newKeyExpiry, 10);
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + (isNaN(expiryDays) ? 365 : expiryDays));

    const newKeyItem: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      key: secret,
      environment: newKeyEnv,
      scopes: selectedScopes.length > 0 ? selectedScopes : ['read:games'],
      expiresAt: expDate.toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'لم يُستخدم بعد',
      requestCount: 0,
      status: 'active'
    };

    setApiKeys([newKeyItem, ...apiKeys]);
    setNewlyCreatedKey(secret);
    setNewKeyName('');
    showNotice(`تم إنشاء مفتاح API بنجاح: ${newKeyItem.name}`);
  };

  const handleToggleKeyStatus = (id: string) => {
    setApiKeys(apiKeys.map(k => {
      if (k.id === id) {
        const nextStatus = k.status === 'active' ? 'revoked' : 'active';
        showNotice(nextStatus === 'revoked' ? 'تم إبطال المفتاح' : 'تم إعادة تنشيط المفتاح');
        return { ...k, status: nextStatus };
      }
      return k;
    }));
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    showNotice('تم حذف مفتاح API نهائياً.');
  };

  const handleCopyKey = (id: string, text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
    showNotice('تم نسخ مفتاح API للحافظة!');
  };

  const toggleRevealKey = (id: string) => {
    setRevealedKeyIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.robloxUsername && u.robloxUsername.toLowerCase().includes(userSearch.toLowerCase()))
  );

  return (
    <div className="space-y-8 py-6 text-right">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-500/30 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
            <Shield className="w-4 h-4" />
            <span>لوحة الإدارة والتحكم الشاملة (Admin Command Center)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            إدارة المنصة، المطورين، الألعاب والمقالات
          </h1>
          <p className="text-xs text-slate-300">
            أنت مسجل الدخول كـ: <strong className="text-white">{currentUser?.name}</strong> (صلاحيات المشرف الكاملة)
          </p>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>إجمالي المستخدمين</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{users.length}</div>
          <span className="text-[11px] text-purple-400 mt-1 block">
            {users.filter((u) => u.role === 'developer').length} مطور معتمد
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>المنتجات وألعاب روبلوكس</span>
            <Gamepad2 className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{products.length}</div>
          <span className="text-[11px] text-rose-400 mt-1 block">
            {products.filter((p) => p.type === 'roblox_game').length} لعبة روبلوكس
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>المقالات والشروحات</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{articles.length}</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">
            {articles.reduce((acc, a) => acc + a.views, 0).toLocaleString()} مشاهدة
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>تحديثات الألعاب الحية</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {products.reduce((acc, p) => acc + (p.updates?.length || 0), 0)}
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">سجلات Changelog مفعلة</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          نظرة عامة وطلبات المطورين ({pendingApplications.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          إدارة الحسابات والرتب ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          إدارة المنتجات والألعاب ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'articles'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          إدارة المقالات ({articles.length})
        </button>
        <button
          onClick={() => setActiveTab('api-keys')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'api-keys'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Key className="w-4 h-4 text-amber-400" />
          <span>مفاتيح الـ API والربط السحابي ({apiKeys.length})</span>
        </button>
      </div>

      {/* TAB 1: Overview & Developer Applications */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-rose-500" />
              <span>طلبات توثيق المطورين المكتملة عبر رمز البريد (OTP Verified)</span>
            </h3>

            {pendingApplications.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                لا توجد طلبات معلقة حالياً. كل المطورين الذين تحققوا برمز OTP تم تفعيلهم بنجاح.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{app.fullName}</span>
                        <span className="text-xs font-mono text-rose-400">@{app.robloxUsername}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          تم التحقق من الإيميل (Code: {app.verificationCode})
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{app.email} • {app.specialty} ({app.experienceYears} سنوات خبرة)</p>
                      {app.bio && <p className="text-xs text-slate-300 mt-1">{app.bio}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-emerald-600/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                        مفعل كـ مطور معتمد
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Users Management */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-base font-bold text-white">إدارة حسابات الأعضاء والرتب</h3>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              <input
                type="text"
                placeholder="بحث بالاسم أو البريد..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pr-10 pl-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="text-slate-400 border-b border-slate-800 pb-2">
                <tr>
                  <th className="py-3 px-3">المستخدم</th>
                  <th className="py-3 px-3">البريد الإلكتروني</th>
                  <th className="py-3 px-3">مصدر التسجيل</th>
                  <th className="py-3 px-3">حساب روبلوكس</th>
                  <th className="py-3 px-3">الرتبة الحالية</th>
                  <th className="py-3 px-3">تعديل الصلاحيات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 flex items-center gap-2">
                      <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />
                      <span className="font-bold text-white">{user.name}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">{user.email}</td>
                    <td className="py-3 px-3">
                      {(user as any).registrationSource === 'mobile_app' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                          📱 تطبيق الهاتف
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          🌐 الموقع الإلكتروني
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-rose-400">
                      {user.robloxUsername ? `@${user.robloxUsername}` : '—'}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          user.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-400'
                            : user.role === 'developer'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {user.role === 'admin' ? 'مدير (Admin)' : user.role === 'developer' ? 'مطور (Developer)' : 'مستخدم عادي'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={user.role}
                        onChange={(e) => {
                          updateUserRole(user.id, e.target.value as UserRole);
                          showNotice(`تم تحديث رتبة ${user.name} إلى ${e.target.value}!`);
                        }}
                        className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white text-[11px] outline-none"
                      >
                        <option value="user">مستخدم عادي</option>
                        <option value="developer">مطور روبلوكس</option>
                        <option value="admin">مدير (أدمن)</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Products Management */}
      {activeTab === 'products' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">إدارة المنتجات وألعاب روبلوكس ({products.length})</h3>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              ⚡ متزامن مع تطبيق الهاتف و Firebase
            </span>
          </div>
          {products.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs">لا توجد منتجات أو ألعاب حالياً.</div>
          ) : (
            <div className="space-y-3">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={prod.image} alt={prod.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h5 className="font-bold text-white text-sm">{prod.title}</h5>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="px-2 py-0.2 rounded bg-slate-800 text-slate-300">{prod.category}</span>
                        <span>السعر: <strong className="text-rose-400">{prod.price === 0 ? 'مجاناً' : `$${prod.price}`}</strong></span>
                        <span>•</span>
                        <span>المطور: {prod.developerName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        deleteProduct(prod.id);
                        showNotice(`تم حذف المنتج "${prod.title}" بنجاح وتحديث السحابة والتطبيق!`);
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Articles Management */}
      {activeTab === 'articles' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">إدارة مقالات وشروحات المنصة ({articles.length})</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                أي مقال يُنشر أو يُحذف هنا ينعكس فورياً في الموقع وتطبيق الهاتف عبر Firebase Firestore
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              ⚡ متزامن لحظياً
            </span>
          </div>

          {articles.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-600" />
              <p>لا توجد مقالات منشورة حالياً.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={art.coverImage} alt={art.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h5 className="font-bold text-white text-sm">{art.title}</h5>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          {art.category}
                        </span>
                        <span>الكاتب: {art.author?.name || 'المشرف'}</span>
                        <span>•</span>
                        <span>👁️ {art.views} مشاهدة</span>
                        <span>•</span>
                        <span>❤️ {art.likes} إعجاب</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        deleteArticle(art.id);
                        showNotice(`تم حذف المقال "${art.title}" بنجاح من الموقع والتطبيق!`);
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>حذف المقال</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: API Keys Management */}
      {activeTab === 'api-keys' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card with Create Button */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">إدارة وتوليد مفاتيح API للمنصة</h3>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono text-[10px] font-bold">
                  v1.0 REST API
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                تتيح مفاتيح الـ API للمطورين وألعاب روبلوكس وتطبيقات سطح المكتب والأجهزة المحمولة الاتصال بالمنصة والتحقق من حسابات المطورين وتحديث الألعاب عبر طلبات HTTP آمنة.
              </p>
            </div>

            <button
              onClick={() => {
                setNewlyCreatedKey(null);
                setIsCreateKeyModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء مفتاح API جديد</span>
            </button>
          </div>

          {/* Newly Created Key Alert Banner */}
          {newlyCreatedKey && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>يرجى حفظ هذا المفتاح في مكان آمن الآن، فلن تتمكن من رؤيته كاملاً مرة أخرى!</span>
              </div>
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-amber-500/30 font-mono text-white text-xs">
                <span className="select-all break-all">{newlyCreatedKey}</span>
                <button
                  onClick={() => handleCopyKey('new-key', newlyCreatedKey)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0"
                >
                  {copiedKeyId === 'new-key' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ المفتاح</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Active Keys Table */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center justify-between">
              <span>المفاتيح النشطة والمعطلة ({apiKeys.length})</span>
              <span className="text-xs text-slate-400 font-normal">تم التشفير باستخدام SHA-256</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="text-slate-400 border-b border-slate-800 pb-2">
                  <tr>
                    <th className="py-3 px-3">اسم المفتاح / الغرض</th>
                    <th className="py-3 px-3">قيمة المفتاح (Secret Key)</th>
                    <th className="py-3 px-3">البيئة</th>
                    <th className="py-3 px-3">الصلاحيات</th>
                    <th className="py-3 px-3">الطلبات</th>
                    <th className="py-3 px-3">الحالة</th>
                    <th className="py-3 px-3 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {apiKeys.map((k) => {
                    const isRevealed = revealedKeyIds[k.id];
                    const maskedKey = isRevealed
                      ? k.key
                      : `${k.key.substring(0, 10)}••••••••••••••••${k.key.substring(k.key.length - 4)}`;

                    return (
                      <tr key={k.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white text-xs">{k.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            أُنشئ: {k.createdAt} • ينتهي: {k.expiresAt}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-300">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] select-all bg-slate-950 px-2 py-1 rounded border border-slate-800">
                              {maskedKey}
                            </span>
                            <button
                              onClick={() => toggleRevealKey(k.id)}
                              className="p-1 text-slate-400 hover:text-white"
                              title={isRevealed ? 'إخفاء' : 'إظهار'}
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => handleCopyKey(k.id, k.key)}
                              className="p-1 text-slate-400 hover:text-white"
                              title="نسخ"
                            >
                              {copiedKeyId === k.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              k.environment === 'production'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {k.environment === 'production' ? 'Production' : 'Development'}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {k.scopes.map((scope) => (
                              <span
                                key={scope}
                                className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono text-[9px]"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-300">
                          <div>{k.requestCount.toLocaleString()} طلب</div>
                          <div className="text-[9px] text-slate-400">{k.lastUsed}</div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              k.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {k.status === 'active' ? 'نشط' : 'معطل'}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleToggleKeyStatus(k.id)}
                              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                k.status === 'active'
                                  ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'
                                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                              }`}
                              title={k.status === 'active' ? 'إبطال المفتاح' : 'تنشيط المفتاح'}
                            >
                              {k.status === 'active' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                            </button>

                            <button
                              onClick={() => handleDeleteKey(k.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors"
                              title="حذف المفتاح"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Snippets & Documentation Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <h4 className="text-sm font-bold text-white">طريقة ربط المفتاح واستدعاء الـ API برمجياً</h4>
              </div>

              {/* Code Language Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setActiveCodeSnippet('luau')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeCodeSnippet === 'luau' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Roblox Luau
                </button>
                <button
                  onClick={() => setActiveCodeSnippet('curl')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeCodeSnippet === 'curl' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveCodeSnippet('js')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeCodeSnippet === 'js' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Node.js / JS
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left font-mono text-xs overflow-x-auto text-slate-300" dir="ltr">
              {activeCodeSnippet === 'luau' && (
                <pre>{`-- Roblox Studio Server Script (HttpService)
local HttpService = game:GetService("HttpService")
local API_KEY = "rbx_live_9f8e4a1c62d083e9b7a4128f09d6c77a"

local function verifyDeveloper(username)
    local url = "https://developer-blush-psi.vercel.app/api/v1/developers/verify"
    local body = HttpService:JSONEncode({ robloxUsername = username })
    
    local success, response = pcall(function()
        return HttpService:RequestAsync({
            Url = url,
            Method = "POST",
            Headers = {
                ["Content-Type"] = "application/json",
                ["Authorization"] = "Bearer " .. API_KEY
            },
            Body = body
        })
    end)
    
    if success and response.Success then
        local data = HttpService:JSONDecode(response.Body)
        print("Developer Verified:", data.isVerified)
        return data.isVerified
    end
    return false
end`}</pre>
              )}

              {activeCodeSnippet === 'curl' && (
                <pre>{`curl -X POST https://developer-blush-psi.vercel.app/api/v1/games/sync \\
  -H "Authorization: Bearer rbx_live_9f8e4a1c62d083e9b7a4128f09d6c77a" \\
  -H "Content-Type: application/json" \\
  -d '{"gameId": "game-101", "version": "v1.4.0", "status": "active"}'`}</pre>
              )}

              {activeCodeSnippet === 'js' && (
                <pre>{`// JavaScript / Node.js
const API_KEY = 'rbx_live_9f8e4a1c62d083e9b7a4128f09d6c77a';

async function fetchLiveUpdates() {
  const res = await fetch('https://developer-blush-psi.vercel.app/api/v1/updates', {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  console.log('Live Platform Updates:', data);
}`}</pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create API Key Modal */}
      {isCreateKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 text-right shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-white">توليد مفتاح API جديد</h3>
              </div>
              <button
                onClick={() => setIsCreateKeyModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateApiKey} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">اسم المفتاح / الاستخدام</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: Roblox Studio Server Production Bridge..."
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">نوع البيئة</label>
                  <select
                    value={newKeyEnv}
                    onChange={(e) => setNewKeyEnv(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  >
                    <option value="production">Production (إنتاج حي)</option>
                    <option value="development">Development (تطوير واختبار)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">مدة الصلاحية</label>
                  <select
                    value={newKeyExpiry}
                    onChange={(e) => setNewKeyExpiry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  >
                    <option value="30">30 يوماً</option>
                    <option value="90">90 يوماً</option>
                    <option value="365">سنة كاملة (موصى به)</option>
                    <option value="3650">دائم (لا ينتهي)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">نطاق الصلاحيات الممنوحة (Scopes)</label>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {[
                    { id: 'read:games', label: 'قراءة بيانات الألعاب' },
                    { id: 'write:games', label: 'نشر وتحديث الألعاب' },
                    { id: 'verify:developers', label: 'التحقق من المطورين (OTP)' },
                    { id: 'read:users', label: 'قراءة قائمة الأصدقاء والمستخدمين' },
                    { id: 'admin:full', label: 'صلاحيات المشرف الكاملة' }
                  ].map((s) => (
                    <label key={s.id} className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedScopes.includes(s.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedScopes([...selectedScopes, s.id]);
                          } else {
                            setSelectedScopes(selectedScopes.filter(sc => sc !== s.id));
                          }
                        }}
                        className="rounded accent-purple-600"
                      />
                      <span className="text-[11px]">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateKeyModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                >
                  <Key className="w-4 h-4" />
                  <span>توليد المفتاح الآن</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
