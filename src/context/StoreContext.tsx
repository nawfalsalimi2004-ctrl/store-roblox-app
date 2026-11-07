import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, Product, GameUpdate, CartItem } from '../types';
import { initialArticles, initialProducts } from '../data/mockData';

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

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('app_articles_v3');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('app_products_v3');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('app_cart_v3');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('app_articles_v3', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('app_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('app_cart_v3', JSON.stringify(cart));
  }, [cart]);

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
  };

  const updateArticle = (id: string, data: Partial<Article>) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const likeArticle = (id: string) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
  };

  const addComment = (articleId: string, authorName: string, authorAvatar: string, content: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      authorName,
      authorAvatar,
      content,
      createdAt: 'الآن'
    };
    setArticles(prev => prev.map(a => {
      if (a.id === articleId) {
        return {
          ...a,
          commentsCount: a.commentsCount + 1,
          comments: [newComment, ...a.comments]
        };
      }
      return a;
    }));
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
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addGameUpdate = (productId: string, updateData: Omit<GameUpdate, 'id' | 'releaseDate'>) => {
    const newUpdate: GameUpdate = {
      ...updateData,
      id: `upd-${Date.now()}`,
      releaseDate: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          version: updateData.version,
          lastUpdated: 'الآن',
          updates: [newUpdate, ...p.updates]
        };
      }
      return p;
    }));
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
