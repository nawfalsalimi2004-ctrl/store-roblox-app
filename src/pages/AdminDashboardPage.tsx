import React, { useState } from 'react';
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
  Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { UserRole } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { users, currentUser, pendingApplications, updateUserRole, verifyDeveloperManual } = useAuth();
  const { articles, products, deleteArticle, deleteProduct } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'products' | 'articles'>('overview');
  const [userSearch, setUserSearch] = useState('');
  const [actionNotice, setActionNotice] = useState('');

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
            {products.reduce((acc, p) => acc + p.updates.length, 0)}
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
          <h3 className="text-base font-bold text-white">إدارة المنتجات وألعاب روبلوكس</h3>
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
                      showNotice(`تم حذف المنتج "${prod.title}" بنجاح!`);
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
        </div>
      )}

      {/* TAB 4: Articles Management */}
      {activeTab === 'articles' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">إدارة المقالات والشروحات التقنية</h3>
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
                      <span className="px-2 py-0.2 rounded bg-slate-800 text-rose-300">{art.category}</span>
                      <span>الكاتب: {art.author.name}</span>
                      <span>•</span>
                      <span>{art.views} مشاهدة</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      deleteArticle(art.id);
                      showNotice(`تم حذف المقال "${art.title}"`);
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
        </div>
      )}
    </div>
  );
};
