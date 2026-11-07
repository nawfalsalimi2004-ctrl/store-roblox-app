import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, DeveloperApplication, Friend, FriendRequest, ChatMessage } from '../types';
import { initialUsers, initialFriends, initialFriendRequests } from '../data/mockData';

interface VerificationEmailData {
  email: string;
  code: string;
  fullName: string;
  robloxUsername: string;
  sentAt: number;
}

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  friends: Friend[];
  friendRequests: FriendRequest[];
  chatMessages: ChatMessage[];
  pendingApplications: DeveloperApplication[];
  login: (email: string, password?: string) => { success: boolean; message: string };
  registerUser: (data: { name: string; email: string; password?: string }) => { success: boolean; message: string };
  updateProfile: (updatedData: Partial<User>) => void;
  addFriend: (robloxOrName: string) => { success: boolean; message: string };
  acceptFriendRequest: (reqId: string) => void;
  rejectFriendRequest: (reqId: string) => void;
  removeFriend: (friendId: string) => void;
  sendChatMessage: (friendId: string, text: string) => void;
  requestDeveloperVerification: (data: {
    fullName: string;
    email: string;
    password?: string;
    robloxUsername: string;
    robloxProfileUrl: string;
    portfolio: string;
    bio: string;
    specialty: string;
    experienceYears: number;
  }) => { success: boolean; message: string; emailData: VerificationEmailData };
  verifyDeveloperCode: (code: string) => { success: boolean; message: string };
  resendVerificationCode: () => { success: boolean; message: string };
  logout: () => void;
  verificationEmail: VerificationEmailData | null;
  clearVerificationEmailModal: () => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  verifyDeveloperManual: (appId: string, approve: boolean) => void;
  resetAllData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('app_users_v3');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('app_current_user_v3');
    return saved ? JSON.parse(saved) : null; // Starts logged out as requested
  });

  const [friends, setFriends] = useState<Friend[]>(() => {
    const saved = localStorage.getItem('app_friends_v3');
    return saved ? JSON.parse(saved) : initialFriends;
  });

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(() => {
    const saved = localStorage.getItem('app_requests_v3');
    return saved ? JSON.parse(saved) : initialFriendRequests;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('app_chats_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [pendingApplications, setPendingApplications] = useState<DeveloperApplication[]>(() => {
    const saved = localStorage.getItem('app_dev_apps_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeVerification, setActiveVerification] = useState<{
    formData: any;
    emailData: VerificationEmailData;
  } | null>(null);

  const [showInboxModalData, setShowInboxModalData] = useState<VerificationEmailData | null>(null);

  useEffect(() => {
    localStorage.setItem('app_users_v3', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('app_current_user_v3', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('app_current_user_v3');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('app_friends_v3', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('app_requests_v3', JSON.stringify(friendRequests));
  }, [friendRequests]);

  useEffect(() => {
    localStorage.setItem('app_chats_v3', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('app_dev_apps_v3', JSON.stringify(pendingApplications));
  }, [pendingApplications]);

  const login = (email: string, password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      return { success: false, message: 'البريد الإلكتروني غير مسجل، يرجى إنشاء حساب جديد.' };
    }

    // Verify password if set on user
    if (found.password && password && found.password !== password) {
      return { success: false, message: 'كلمة المرور غير صحيحة، يرجى التحقق وإعادة المحاولة.' };
    }

    setCurrentUser(found);
    return {
      success: true,
      message: `مرحباً بك مجدداً يا ${found.name} (${found.role === 'admin' ? 'مدير النظام' : found.role === 'developer' ? 'مطور معتمد' : 'مستخدم'})!`
    };
  };

  const registerUser = (data: { name: string; email: string; password?: string }) => {
    const exists = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) {
      return { success: false, message: 'هذا البريد مسجل بالفعل.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password || '123456',
      role: 'user',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.name)}`,
      coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, message: 'تم إنشاء الحساب بنجاح! تم تسجيل الدخول.' };
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  const addFriend = (robloxOrName: string) => {
    const trimmed = robloxOrName.trim().replace(/^@/, '');
    if (!trimmed) {
      return { success: false, message: 'يرجى كتابة اسم حساب روبلوكس.' };
    }
    const alreadyFriend = friends.some(
      f => f.robloxUsername.toLowerCase() === trimmed.toLowerCase() || f.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyFriend) {
      return { success: false, message: 'المستخدم موجود في قائمة أصدقائك بالفعل!' };
    }

    const newFriend: Friend = {
      id: `fr-${Date.now()}`,
      name: trimmed,
      robloxUsername: trimmed,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(trimmed)}`,
      status: 'online',
      level: 1,
      bio: 'صديق في روبلوكس',
      joinedDate: '2026'
    };

    setFriends(prev => [newFriend, ...prev]);
    return { success: true, message: `تمت إضافة @${trimmed} إلى أصدقائك بنجاح!` };
  };

  const acceptFriendRequest = (reqId: string) => {
    const req = friendRequests.find(r => r.id === reqId);
    if (req) {
      setFriends(prev => [req.fromUser, ...prev]);
      setFriendRequests(prev => prev.filter(r => r.id !== reqId));
    }
  };

  const rejectFriendRequest = (reqId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== reqId));
  };

  const removeFriend = (friendId: string) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
  };

  const sendChatMessage = (friendId: string, text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      friendId,
      sender: 'me',
      text: text.trim(),
      time: timeStr
    };

    setChatMessages(prev => [...prev, newMsg]);
  };

  const requestDeveloperVerification = (formData: any) => {
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    const emailData: VerificationEmailData = {
      email: formData.email,
      code: generatedCode,
      fullName: formData.fullName,
      robloxUsername: formData.robloxUsername,
      sentAt: Date.now()
    };

    setActiveVerification({ formData, emailData });
    setShowInboxModalData(emailData);

    return {
      success: true,
      message: `تم إرسال رمز التحقق إلى بريدك (${formData.email}). يمكنك نسخ الرمز من نافذة صندوق البريد.`,
      emailData
    };
  };

  const verifyDeveloperCode = (code: string) => {
    if (!activeVerification) {
      return { success: false, message: 'انتهت صلاحية جلسة التحقق، أعد المحاولة.' };
    }

    if (activeVerification.emailData.code.trim() !== code.trim()) {
      return { success: false, message: 'رمز التحقق غير صحيح، يرجى التأكد وإعادة المحاولة.' };
    }

    const { formData } = activeVerification;
    const newDev: User = {
      id: `dev-${Date.now()}`,
      name: formData.fullName,
      email: formData.email,
      password: formData.password || '123456',
      role: 'developer',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formData.robloxUsername || formData.fullName)}`,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      bio: formData.bio,
      robloxUsername: formData.robloxUsername,
      robloxProfileUrl: formData.robloxProfileUrl,
      specialty: formData.specialty,
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newDev, ...prev.filter(u => u.email.toLowerCase() !== formData.email.toLowerCase())]);
    setCurrentUser(newDev);
    setActiveVerification(null);
    setShowInboxModalData(null);

    return {
      success: true,
      message: '🎉 تم تأكيد بريدك الإلكتروني وتفعيل حساب المطور بنجاح.'
    };
  };

  const resendVerificationCode = () => {
    if (!activeVerification) return { success: false, message: 'لا توجد عملية نشطة.' };
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const emailData: VerificationEmailData = { ...activeVerification.emailData, code: newCode, sentAt: Date.now() };
    setActiveVerification({ ...activeVerification, emailData });
    setShowInboxModalData(emailData);
    return { success: true, message: `تم إرسال رمز جديد إلى ${emailData.email}` };
  };

  const logout = () => setCurrentUser(null);

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
  };

  const verifyDeveloperManual = (appId: string, approve: boolean) => {
    setPendingApplications(prev =>
      prev.map(a => a.id === appId ? { ...a, status: approve ? 'approved' : 'rejected' } : a)
    );
  };

  const clearVerificationEmailModal = () => setShowInboxModalData(null);

  const resetAllData = () => {
    localStorage.clear();
    setUsers(initialUsers);
    setCurrentUser(null);
    setFriends(initialFriends);
    setFriendRequests(initialFriendRequests);
    setPendingApplications([]);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        friends,
        friendRequests,
        chatMessages,
        pendingApplications,
        login,
        registerUser,
        updateProfile,
        addFriend,
        acceptFriendRequest,
        rejectFriendRequest,
        removeFriend,
        sendChatMessage,
        requestDeveloperVerification,
        verifyDeveloperCode,
        resendVerificationCode,
        logout,
        verificationEmail: showInboxModalData,
        clearVerificationEmailModal,
        updateUserRole,
        verifyDeveloperManual,
        resetAllData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
