export type UserRole = 'user' | 'developer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  robloxUsername?: string;
  robloxProfileUrl?: string;
  specialty?: string;
  isVerified?: boolean;
  coverImage?: string;
  createdAt: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  robloxUsername: string;
  status: 'online' | 'offline' | 'in_game';
  currentGame?: string;
  level: number;
  bio?: string;
  joinedDate: string;
}

export interface FriendRequest {
  id: string;
  fromUser: Friend;
  sentAt: string;
}

export interface ChatMessage {
  id: string;
  friendId: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface GameUpdate {
  id: string;
  gameOrAppName: string;
  version: string;
  title: string;
  releaseDate: string;
  description?: string;
  changes: string[];
  placeId?: string;
  badge?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  price: number;
  originalPrice?: number;
  category: 'ألعاب روبلوكس' | 'تطبيقات وبرامج' | 'سكربتات ونظم Luau' | 'نماذج وخرائط 3D' | 'واجهات مستخدم UI';
  type: 'app' | 'roblox_game' | 'asset' | 'script';
  platform: 'Roblox' | 'Windows' | 'Web' | 'Android';
  rating: number;
  reviewsCount: number;
  downloads: number;
  image: string;
  screenshots?: string[];
  tags: string[];
  developerId: string;
  developerName: string;
  developerAvatar: string;
  version: string;
  lastUpdated: string;
  downloadUrl?: string;
  robloxPlaceId?: string;
  robloxGameUrl?: string;
  featured?: boolean;
  updates: GameUpdate[];
}

export interface ArticleComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  category: 'تطوير روبلوكس' | 'برمجة Luau' | 'شروحات تقنية' | 'أخبار الألعاب' | 'تصميم ثلاثي الأبعاد';
  tags: string[];
  views: number;
  likes: number;
  commentsCount: number;
  comments: ArticleComment[];
  readTimeMinutes: number;
  featured?: boolean;
  createdAt: string;
}

export interface DeveloperApplication {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  robloxUsername: string;
  robloxProfileUrl: string;
  portfolio: string;
  bio: string;
  specialty: string;
  experienceYears: number;
  verificationCode: string;
  isEmailVerified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
