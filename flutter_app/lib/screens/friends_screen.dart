import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';

class FriendsScreen extends StatelessWidget {
  const FriendsScreen({Key? key}) : super(key: key);

  final List<FriendUser> friends = const [
    FriendUser(
      id: 'fr-1',
      name: 'عبدالرحمن الشهري',
      robloxUsername: 'Abdurahman_Dev',
      status: 'يلعب Arabian Combat',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    ),
    FriendUser(
      id: 'fr-2',
      name: 'فيصل العتيبي',
      robloxUsername: 'FaisalRbx_99',
      status: 'متصل الآن',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    ),
    FriendUser(
      id: 'fr-3',
      name: 'سارة خالد',
      robloxUsername: 'SaraStudio_3D',
      status: 'غير متصل (منذ ساعتين)',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.darkBg,
      appBar: AppBar(
        title: const Text(
          'قائمة الأصدقاء والمجتمع',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: AppTheme.darkCard,
        elevation: 0,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: friends.length,
        itemBuilder: (context, index) {
          final fr = friends[index];
          final isOnline = fr.status.contains('متصل') || fr.status.contains('يلعب');
          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppTheme.darkCard,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: AppTheme.darkCardBorder),
            ),
            child: Row(
              children: [
                Stack(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: Image.network(
                        fr.avatarUrl,
                        width: 48,
                        height: 48,
                        fit: BoxFit.cover,
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        width: 12,
                        height: 12,
                        decoration: BoxDecoration(
                          color: isOnline ? AppTheme.successEmerald : Colors.grey,
                          shape: BoxShape.circle,
                          border: Border.all(color: AppTheme.darkCard, width: 2),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        fr.name,
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '@${fr.robloxUsername}',
                        style: const TextStyle(fontSize: 10, color: AppTheme.primaryRose, fontFamily: 'monospace'),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        fr.status,
                        style: TextStyle(
                          fontSize: 10,
                          color: isOnline ? AppTheme.successEmerald : const Color(0xFF94A3B8),
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('بدء المحادثة مع ${fr.name}...')),
                    );
                  },
                  icon: const Icon(Icons.chat_bubble_outline, color: Colors.white70, size: 20),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
