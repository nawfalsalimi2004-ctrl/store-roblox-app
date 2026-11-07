import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  MessageCircle,
  Gamepad2,
  Trash2,
  Check,
  X,
  Search,
  ExternalLink,
  Circle,
  Send,
  Sparkles,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Friend } from '../types';

export const FriendsPage: React.FC = () => {
  const { friends, friendRequests, addFriend, acceptFriendRequest, rejectFriendRequest, removeFriend, chatMessages, sendChatMessage } = useAuth();

  const [activeTab, setActiveTab] = useState<'all' | 'requests'>('all');
  const [newFriendInput, setNewFriendInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Direct chat state
  const [activeChatFriend, setActiveChatFriend] = useState<Friend | null>(null);
  const [msgInput, setMsgInput] = useState('');

  const showNotice = (type: 'success' | 'error', text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3000);
  };

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendInput.trim()) return;

    const res = addFriend(newFriendInput.trim());
    if (res.success) {
      showNotice('success', res.message);
      setNewFriendInput('');
    } else {
      showNotice('error', res.message);
    }
  };

  const filteredFriends = friends.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.robloxUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChatFriend || !msgInput.trim()) return;
    sendChatMessage(activeChatFriend.id, msgInput.trim());
    setMsgInput('');
  };

  const activeFriendMessages = chatMessages.filter(
    (m) => activeChatFriend && m.friendId === activeChatFriend.id
  );

  return (
    <div className="space-y-8 py-6 text-right max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-xl transition-colors">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold">
              <Users className="w-4 h-4" />
              <span>مجتمع الأصدقاء ومطوري روبلوكس</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              قائمة أصدقائي ومطوري الألعاب
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              تواصل مع أصدقائك، انضم إليهم داخل ألعاب روبلوكس الحية، وشاركهم التحديثات والدردشة المباشرة.
            </p>
          </div>

          {/* Quick Add Friend Input */}
          <form onSubmit={handleAddFriend} className="w-full md:w-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="اسم حساب روبلوكس (Username)..."
              value={newFriendInput}
              onChange={(e) => setNewFriendInput(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-rose-500 font-mono w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/30 shrink-0 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>إضافة صديق</span>
            </button>
          </form>
        </div>
      </div>

      {notice && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold animate-fadeIn ${
            notice.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-500/15 border-red-500/30 text-red-600 dark:text-red-400'
          }`}
        >
          {notice.text}
        </div>
      )}

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            جميع الأصدقاء ({friends.length})
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'requests'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>طلبات الصداقة</span>
            {friendRequests.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {friendRequests.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'all' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              placeholder="بحث في الأصدقاء..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-rose-500"
            />
          </div>
        )}
      </div>

      {/* TAB 1: Friends List */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span
                      className={`absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                        friend.status === 'in_game'
                          ? 'bg-rose-500 animate-pulse'
                          : friend.status === 'online'
                          ? 'bg-emerald-500'
                          : 'bg-slate-400'
                      }`}
                      title={friend.status}
                    ></span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{friend.name}</h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                        LVL {friend.level}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-rose-500 dark:text-rose-400 font-semibold">
                      @{friend.robloxUsername}
                    </div>

                    {/* Status details */}
                    <div className="text-[11px] mt-1 flex items-center gap-1.5">
                      {friend.status === 'in_game' ? (
                        <span className="text-rose-500 font-bold flex items-center gap-1">
                          <Gamepad2 className="w-3.5 h-3.5" />
                          يلعب الآن: {friend.currentGame}
                        </span>
                      ) : friend.status === 'online' ? (
                        <span className="text-emerald-500 font-semibold">متصل الآن بالمنصة</span>
                      ) : (
                        <span className="text-slate-400">غير متصل</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFriend(friend.id)}
                  className="text-slate-300 dark:text-slate-600 hover:text-red-500 p-1.5 rounded-lg transition-colors"
                  title="إزالة الصديق"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {friend.bio && (
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                  {friend.bio}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setActiveChatFriend(friend)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-rose-500" />
                  <span>مراسلة فورية</span>
                </button>

                {friend.status === 'in_game' && (
                  <a
                    href="https://www.roblox.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>انضمام للعبة</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Friend Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {friendRequests.length === 0 ? (
            <div className="p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
              <Users className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">لا توجد طلبات صداقة معلقة</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">شارك اسم حسابك مع أصدقائك في روبلوكس ليضيفوك هنا!</p>
            </div>
          ) : (
            friendRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={req.fromUser.avatar}
                    alt={req.fromUser.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{req.fromUser.name}</h4>
                    <span className="text-xs font-mono text-rose-500">@{req.fromUser.robloxUsername}</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{req.sentAt} • {req.fromUser.bio}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      acceptFriendRequest(req.id);
                      showNotice('success', `تم قبول طلب صداقة ${req.fromUser.name}!`);
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
                  >
                    <Check className="w-4 h-4" />
                    <span>قبول</span>
                  </button>

                  <button
                    onClick={() => {
                      rejectFriendRequest(req.id);
                      showNotice('error', 'تم رفض الطلب.');
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>تجاهل</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Interactive Direct Message / Chat Modal */}
      {activeChatFriend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-right flex flex-col h-[520px]">
            {/* Chat Header */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeChatFriend.avatar}
                    alt={activeChatFriend.name}
                    className="w-10 h-10 rounded-2xl object-cover"
                  />
                  <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{activeChatFriend.name}</h4>
                  <span className="text-[11px] font-mono text-rose-500">@{activeChatFriend.robloxUsername}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveChatFriend(null)}
                className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-white dark:bg-slate-900/60">
              <div className="text-center py-2">
                <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  بداية المحادثة المشفرة مع {activeChatFriend.name}
                </span>
              </div>

              {activeFriendMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'me'
                        ? 'bg-rose-600 text-white rounded-br-none shadow-md shadow-rose-600/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Footer / Input */}
            <form onSubmit={handleSendChat} className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="اكتب رسالتك لصديقك..."
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="p-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
