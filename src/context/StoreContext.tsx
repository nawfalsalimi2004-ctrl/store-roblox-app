import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, Product, GameUpdate, CartItem } from '../types';
import { initialArticles, initialProducts } from '../data/mockData';
import {
  db,
  saveArticleToCloud,
  deleteArticleFromCloud,
  saveProductToCloud,
  deleteProductFromCloud,
  loadCloudArticles,
  loadCloudProducts
} from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

interface StoreContextType {
  articles: Article[];
  products: Product[];
  cart: CartItem[];
  addArticle: (article: Omit<Article, 'id' | 'views' | 'likes' | 'commentsCount' | 'comments' | 'createdAt'>) => void;
  updateArticle: (id: string, data: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  likeArticle: (id: string) => void;
  addComment: (articleId: string, authorName: string, authorAvatar: string, content: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'downloads' | 'lastUpdated' | 'updates'>) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addGameUpdate: (productId: string, update: Omit<GameUpdate, 'id' | 'releaseDate'>) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalCartPrice: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Safe normalizer for Products / Roblox Games from Cloud / LocalStorage
const normalizeProduct = (p: any): Product => {
  const dev = p.developer || {};
  const latestUpd = p.latestUpdate || {};
  
  let updatesList: GameUpdate[] = [];
  if (Array.isArray(p.updates)) {
    updatesList = p.updates;
  } else if (latestUpd.title) {
    updatesList = [{
      id: `upd-${p.id || 'game'}`,
      gameOrAppName: p.title || 'لعبة روبلوكس',
      version: p.version || '1.0.0',
      title: latestUpd.title || 'تحديث أخير',
      releaseDate: p.lastUpdated || '2026-11-01',
      description: Array.isArray(latestUpd.changes) ? latestUpd.changes.join(' • ') : 'تحسينات عامة للأداء',
      changes: Array.isArray(latestUpd.changes) ? latestUpd.changes : []
    }];
  }

  return {
    id: p.id || `prod-${Date.now()}`,
    title: p.title || 'لعبة روبلوكس',
    description: p.description || '',
    detailedDescription: p.detailedDescription || p.description || '',
    price: typeof p.price === 'number' ? p.price : 0,
    originalPrice: p.originalPrice,
    category: p.category || 'ألعاب روبلوكس',
    type: p.type || 'roblox_game',
    platform: p.platform || 'Roblox',
    rating: typeof p.rating === 'number' ? p.rating : 4.8,
    reviewsCount: typeof p.reviewsCount === 'number' ? p.reviewsCount : 100,
    downloads: typeof p.downloads === 'number' ? p.downloads : 1000,
    image: p.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
    screenshots: Array.isArray(p.screenshots) ? p.screenshots : [],
    tags: Array.isArray(p.tags) ? p.tags : ['Roblox'],
    developerId: p.developerId || dev.id || 'admin',
    developerName: p.developerName || dev.name || 'مشرف المنصة',
    developerAvatar: p.developerAvatar || dev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    version: p.version || '1.0.0',
    lastUpdated: p.lastUpdated || '2026-11-01',
    downloadUrl: p.downloadUrl,
    robloxPlaceId: p.robloxPlaceId || '',
    robloxGameUrl: p.robloxGameUrl || (p.robloxPlaceId ? `https://www.roblox.com/games/${p.robloxPlaceId}` : 'https://www.roblox.com'),
    featured: p.featured ?? true,
    updates: updatesList
  };
};

// Safe normalizer for Articles from Cloud / LocalStorage
const normalizeArticle = (a: any): Article => {
  const authorObj = a.author && typeof a.author === 'object' ? a.author : {};
  return {
    id: a.id || `art-${Date.now()}`,
    title: a.title || '',
    slug: a.slug || a.id || 'article',
    excerpt: a.excerpt || '',
    content: a.content || '',
    coverImage: a.coverImage || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000',
    author: {
      id: authorObj.id || 'admin',
      name: authorObj.name || (typeof a.author === 'string' ? a.author : 'المشرف العام'),
      avatar: authorObj.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: authorObj.role || 'مشرف المنصة'
    },
    category: a.category || 'تطوير روبلوكس',
    tags: Array.isArray(a.tags) ? a.tags : ['Roblox'],
    views: typeof a.views === 'number' ? a.views : 100,
    likes: typeof a.likes === 'number' ? a.likes : 10,
    commentsCount: typeof a.commentsCount === 'number' ? a.commentsCount : 0,
    comments: Array.isArray(a.comments) ? a.comments : [],
    readTimeMinutes: typeof a.readTimeMinutes === 'number' ? a.readTimeMinutes : 4,
    featured: a.featured ?? false,
    createdAt: a.createdAt || '2026-11-01'
  };
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('app_articles_v3');
    const initial = saved ? JSON.parse(saved) : initialArticles;
    return Array.isArray(initial) ? initial.map(normalizeArticle) : initialArticles.map(normalizeArticle);
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('app_products_v3');
    const initial = saved ? JSON.parse(saved) : initialProducts;
    return Array.isArray(initial) ? initial.map(normalizeProduct) : initialProducts.map(normalizeProduct);
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('app_cart_v3');
    return saved ? JSON.parse(saved) : [];
  });

  // Local storage persistence
  useEffect(() => {
    localStorage.setItem('app_articles_v3', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('app_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('app_cart_v3', JSON.stringify(cart));
  }, [cart]);

  // Real-time Firestore Cloud Sync for Articles & Products
  useEffect(() => {
    if (!db) {
      loadCloudArticles().then(cloudArticles => {
        if (cloudArticles.length > 0) setArticles(cloudArticles.map(normalizeArticle));
      });
      loadCloudProducts().then(cloudProds => {
        if (cloudProds.length > 0) setProducts(cloudProds.map(normalizeProduct));
      });
      return;
    }

    // Subscribe to Firestore articles collection
    const unsubArticles = onSnapshot(collection(db, 'articles'), (snapshot) => {
      const cloudArts = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setArticles(cloudArts.map(normalizeArticle));
    }, (err) => {
      console.warn("Firestore articles listener warning:", err);
    });

    // Subscribe to Firestore products collection
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const cloudProds = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(cloudProds.map(normalizeProduct));
    }, (err) => {
      console.warn("Firestore products listener warning:", err);
    });

    return () => {
      unsubArticles();
      unsubProducts();
    };
  }, []);

  // Article handlers
  const addArticle = (newArt: Omit<Article, 'id' | 'views' | 'likes' | 'commentsCount' | 'comments' | 'createdAt'>) => {
    const article: Article = {
      ...newArt,
      id: `art-${Date.now()}`,
      views: 1,
      likes: 0,
      commentsCount: 0,
      comments: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setArticles(prev => [article, ...prev]);
    saveArticleToCloud(article);
  };

  const updateArticle = (id: string, data: Partial<Article>) => {
    setArticles(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...data } : a);
      const target = updated.find(a => a.id === id);
      if (target) saveArticleToCloud(target);
      return updated;
    });
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    deleteArticleFromCloud(id);
  };

  const likeArticle = (id: string) => {
    setArticles(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a);
      const target = updated.find(a => a.id === id);
      if (target) saveArticleToCloud(target);
      return updated;
    });
  };

  const addComment = (articleId: string, authorName: string, authorAvatar: string, content: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      authorName,
      authorAvatar,
      content,
      createdAt: 'الآن'
    };
    setArticles(prev => {
      const updated = prev.map(a => {
        if (a.id === articleId) {
          return {
            ...a,
            commentsCount: a.commentsCount + 1,
            comments: [newComment, ...a.comments]
          };
        }
        return a;
      });
      const target = updated.find(a => a.id === articleId);
      if (target) saveArticleToCloud(target);
      return updated;
    });
  };

  // Product & Game handlers
  const addProduct = (prodData: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'downloads' | 'lastUpdated' | 'updates'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      downloads: 0,
      lastUpdated: 'الآن',
      updates: []
    };
    setProducts(prev => [newProd, ...prev]);
    saveProductToCloud(newProd);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...data } : p);
      const target = updated.find(p => p.id === id);
      if (target) saveProductToCloud(target);
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    deleteProductFromCloud(id);
  };

  const addGameUpdate = (productId: string, updateData: Omit<GameUpdate, 'id' | 'releaseDate'>) => {
    const newUpdate: GameUpdate = {
      ...updateData,
      id: `upd-${Date.now()}`,
      releaseDate: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => {
      const updated = prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            version: updateData.version,
            lastUpdated: 'الآن',
            updates: [newUpdate, ...p.updates]
          };
        }
        return p;
      });
      const target = updated.find(p => p.id === productId);
      if (target) saveProductToCloud(target);
      return updated;
    });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <StoreContext.Provider
      value={{
        articles,
        products,
        cart,
        addArticle,
        updateArticle,
        deleteArticle,
        likeArticle,
        addComment,
        addProduct,
        updateProduct,
        deleteProduct,
        addGameUpdate,
        addToCart,
        removeFromCart,
        clearCart,
        totalCartPrice
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
