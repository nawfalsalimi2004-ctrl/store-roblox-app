import React, { useState } from 'react';
import {
  Gamepad2,
  BookOpen,
  ShoppingBag,
  Sparkles,
  User,
  Shield,
  Code2,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Users,
  LogIn,
  Smartphone,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenCart: () => void;
  onOpenAppDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenCart, onOpenAppDownload }) => {
  const { currentUser, logout, friends, friendRequests } = useAuth();
  const { cart } = useStore();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Sparkles },
    { id: 'roblox', label: 'ألعاب روبلوكس والتحديثات', icon: Gamepad2 },
    { id: 'store', label: 'متجر التطبيقات والمنتجات', icon: ShoppingBag },
    { id: 'articles', label: 'المقالات والشروحات', icon: BookOpen },
    { id: 'friends', label: 'الأصدقاء', icon: Users, badge: friendRequests.length > 0 ? friendRequests.length : undefined },
    { id: 'profile', label: 'بروفايلي', icon: User, requiresAuth: true },
    { id: 'developer-dashboard', label: 'بوابة المطورين', icon: Code2, requiresDev: true },
    { id: 'admin-dashboard', label: 'لوحة الإدارة', icon: Shield, requiresAdmin: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-6 h-6 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950"></span>
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              منصة المطورين
            </span>
            <span className="block text-[10px] text-rose-600 dark:text-rose-400 font-mono tracking-widest uppercase font-bold">
              ROBLOX & DEV STORE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            if (item.requiresAdmin && currentUser?.role !== 'admin') return null;
            if (item.requiresDev && currentUser?.role !== 'developer' && currentUser?.role !== 'admin') return null;
            if (item.requiresAuth && !currentUser) return null;

            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all relative ${
                  isActive
                    ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500 text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: App Download, Theme Toggle, Cart, Profile / Login */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Direct APK Download Button (Visible on mobile and desktop) */}
          <a
            href="/RobloxDevStore-v1.0.0.apk"
            download="RobloxDevStore-v1.0.0.apk"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/25 active:scale-95"
            title="تحميل تطبيق الأندرويد APK مباشرة"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
            <span className="text-[11px] sm:text-xs">تنزيل APK</span>
          </a>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all shadow-sm"
            title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع المظلم'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform rotate-0 hover:-rotate-45" />
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all shadow-sm"
            title="سلة التسوق"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-md">
                {cart.length}
              </span>
            )}
          </button>

          {/* User Profile Dropdown or Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-right"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover border border-slate-300 dark:border-slate-700"
                />
                <div className="text-right hidden sm:block pr-1 pl-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    {currentUser.name}
                    {currentUser.role === 'admin' && (
                      <span className="text-[9px] px-1.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-400 font-mono font-bold">ADMIN</span>
                    )}
                    {currentUser.role === 'developer' && (
                      <span className="text-[9px] px-1.5 rounded bg-rose-500/20 text-rose-500 font-mono font-bold">DEV</span>
                    )}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pl-1" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 text-right animate-fadeIn">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-400">الحساب الحالي:</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                    <span className="inline-block mt-0.5 text-[10px] px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-rose-500 font-semibold">
                      {currentUser.role === 'admin' ? '🛡️ مدير النظام (Admin)' : currentUser.role === 'developer' ? '⚡ مطور معتمد' : '👤 مستخدم عادي'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <User className="w-4 h-4 text-rose-500" />
                      <span>الملف الشخصي (بروفايلي)</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('friends');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Users className="w-4 h-4 text-indigo-500" />
                      <span>قائمة الأصدقاء ({friends.length})</span>
                    </button>

                    {currentUser.role === 'developer' && (
                      <button
                        onClick={() => {
                          onNavigate('developer-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Code2 className="w-4 h-4 text-rose-400" />
                        <span>لوحة المطور والتحديثات</span>
                      </button>
                    )}

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('admin-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Shield className="w-4 h-4 text-purple-500" />
                        <span>لوحة تحكم الأدمن</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        onNavigate('login');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>تسجيل الدخول</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 text-right">
          <a
            href="/RobloxDevStore-v1.0.0.apk"
            download="RobloxDevStore-v1.0.0.apk"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xs shadow-md active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 animate-bounce" />
              <span>تحميل تطبيق APK مباشرة للهاتف</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-rose-600 font-bold">7.3 MB</span>
          </a>

          <button
            onClick={() => {
              onOpenAppDownload();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-rose-500" />
              <span>معاينة محاكي التطبيق التفاعلي</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-bold">محاكي</span>
          </button>

          {navItems.map((item) => {
            if (item.requiresAdmin && currentUser?.role !== 'admin') return null;
            if (item.requiresDev && currentUser?.role !== 'developer' && currentUser?.role !== 'admin') return null;
            if (item.requiresAuth && !currentUser) return null;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                  currentPage === item.id
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
