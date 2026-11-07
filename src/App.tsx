import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAppDownload={() => setIsAppDownloadOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-2">
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
    <ThemeProvider>
      <AuthProvider>
        <StoreProvider>
          <MainApp />
        </StoreProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
