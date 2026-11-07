import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  Home,
  Gamepad2,
  ShoppingBag,
  User,
  Sparkles
} from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EmailInboxModal } from './components/ui/EmailInboxModal';
import { CartModal } from './components/modals/CartModal';
import { AppDownloadModal } from './components/modals/AppDownloadModal';
import { MobileAppExperience } from './components/app/MobileAppExperience';

import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { RobloxGamesPage } from './pages/RobloxGamesPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DeveloperRegisterPage } from './pages/DeveloperRegisterPage';
import { DeveloperDashboardPage } from './pages/DeveloperDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { FriendsPage } from './pages/FriendsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Product } from './types';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('art-1');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAppDownloadOpen, setIsAppDownloadOpen] = useState(false);
  const [isStandaloneApp, setIsStandaloneApp] = useState(false);

  // Check if launched as PWA standalone or query ?mode=app
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'app' || window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandaloneApp(true);
    }
  }, []);

  const handleNavigate = (page: string, param?: string) => {
    if (page === 'article-detail' && param) {
      setSelectedArticleId(param);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in PWA standalone app mode, render the full mobile app interface directly
  if (isStandaloneApp) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-slate-950">
        <MobileAppExperience isStandalone={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 overflow-x-hidden">
      {/* Sticky Mobile Announcement Bar for APK Download */}
      <div className="md:hidden sticky top-0 z-40 bg-gradient-to-r from-rose-600 via-red-600 to-indigo-700 text-white px-3 py-2 flex items-center justify-between text-xs font-bold shadow-md">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 shrink-0 animate-bounce text-white" />
          <span className="text-[11px] font-black">حمّل تطبيق الأندرويد الآن من موقعنا</span>
        </div>
        <a
          href="/RobloxDevStore-v1.0.0.apk"
          download="RobloxDevStore-v1.0.0.apk"
          className="bg-white text-rose-600 hover:bg-rose-50 px-3 py-1 rounded-lg text-[11px] font-black shadow-sm flex items-center gap-1 active:scale-95 transition-transform"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تنزيل APK</span>
        </a>
      </div>

      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAppDownload={() => setIsAppDownloadOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-2 pb-24 md:pb-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenProduct={handleOpenProduct}
            onOpenAppDownload={() => setIsAppDownloadOpen(true)}
          />
        )}

        {currentPage === 'roblox' && (
          <RobloxGamesPage
            onOpenProduct={handleOpenProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'store' && (
          <StorePage
            onOpenProduct={handleOpenProduct}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentPage === 'articles' && (
          <ArticlesPage
            onOpenArticle={(id) => handleNavigate('article-detail', id)}
          />
        )}

        {currentPage === 'article-detail' && (
          <ArticleDetailPage
            articleId={selectedArticleId}
            onBack={() => handleNavigate('articles')}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => handleNavigate('store')}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            onOpenProduct={handleOpenProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'friends' && (
          <FriendsPage />
        )}

        {currentPage === 'developer-register' && (
          <DeveloperRegisterPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'developer-dashboard' && (
          <DeveloperDashboardPage />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboardPage />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'register' && (
          <RegisterPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => handleNavigate('home')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            currentPage === 'home'
              ? 'text-rose-600 dark:text-rose-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">الرئيسية</span>
        </button>

        <button
          onClick={() => handleNavigate('roblox')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            currentPage === 'roblox'
              ? 'text-rose-600 dark:text-rose-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          <span className="text-[10px]">روبلوكس</span>
        </button>

        {/* Center Prominent APK Download Button */}
        <a
          href="/RobloxDevStore-v1.0.0.apk"
          download="RobloxDevStore-v1.0.0.apk"
          className="flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-lg shadow-rose-600/40 border-2 border-white dark:border-slate-900 active:scale-90 transition-transform"
          title="تحميل تطبيق الأندرويد APK"
        >
          <Download className="w-5 h-5 animate-bounce" />
          <span className="text-[8px] font-black leading-none mt-0.5">APK</span>
        </a>

        <button
          onClick={() => handleNavigate('store')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            currentPage === 'store'
              ? 'text-rose-600 dark:text-rose-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">المتجر</span>
        </button>

        <button
          onClick={() => handleNavigate('profile')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            currentPage === 'profile' || currentPage === 'login'
              ? 'text-rose-600 dark:text-rose-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">حسابي</span>
        </button>
      </nav>

      {/* Interactive Email Inbox Modal for Developer OTP Verification */}
      <EmailInboxModal />

      {/* Cart & Checkout Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Mobile App Download & Live Simulator Modal */}
      <AppDownloadModal
        isOpen={isAppDownloadOpen}
        onClose={() => setIsAppDownloadOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <StoreProvider>
            <MainApp />
          </StoreProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
