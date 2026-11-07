import { Article, Product, User, Friend, FriendRequest } from '../types';

// Only official Admin credentials preserved as requested
export const initialUsers: User[] = [
  {
    id: 'user-admin',
    name: 'المشرف العام (أدمن)',
    email: 'admin@robloxdev.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    bio: 'مدير المنصة ومشرف النظام الرئيسي',
    robloxUsername: 'PlatformAdmin_RBX',
    robloxProfileUrl: 'https://www.roblox.com',
    specialty: 'إدارة أمن المنصات وتطوير الأنظمة السحابية',
    isVerified: true,
    createdAt: '2024-01-01'
  }
];

// Clean empty friends list
export const initialFriends: Friend[] = [];

// Clean empty friend requests list
export const initialFriendRequests: FriendRequest[] = [];

// Clean empty products and roblox games list (ready for developers and admin to publish)
export const initialProducts: Product[] = [];

// Clean empty articles list (ready for authors to publish)
export const initialArticles: Article[] = [];
