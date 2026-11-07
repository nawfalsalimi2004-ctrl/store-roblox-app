import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'auth_screen.dart';

class ProfileScreen extends StatelessWidget {
  final String userName;

  const ProfileScreen({Key? key, required this.userName}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.darkBg,
      appBar: AppBar(
        title: const Text(
          'الملف الشخصي',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: AppTheme.darkCard,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            // User Avatar Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.darkCard,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppTheme.darkCardBorder),
              ),
              child: Column(
                children: [
                  Stack(
                    children: [
                      Container(
                        width: 84,
                        height: 84,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: AppTheme.primaryRose, width: 2),
                        ),
                        child: const CircleAvatar(
                          backgroundImage: NetworkImage(
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          padding: const EdgeInsets.all(4),
                          decoration: const BoxDecoration(
                            color: AppTheme.successEmerald,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.check, color: Colors.white, size: 14),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    userName,
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    '@RobloxDev_Official',
                    style: TextStyle(fontSize: 11, color: AppTheme.primaryRose, fontFamily: 'monospace'),
                  ),
                  const SizedBox(height: 14),
                  // Badges
                  Wrap(
                    alignment: WrapAlignment.center,
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: AppTheme.successEmerald.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppTheme.successEmerald.withOpacity(0.4)),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.shield, size: 14, color: AppTheme.successEmerald),
                            SizedBox(width: 4),
                            Text(
                              'مطور معتمد وموثق (Verified Dev ⚡)',
                              style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successEmerald),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: AppTheme.secondaryAmber.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppTheme.secondaryAmber.withOpacity(0.4)),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.card_giftcard, size: 14, color: AppTheme.secondaryAmber),
                            SizedBox(width: 4),
                            Text(
                              'عضوية VIP التطبيق • رصيد 250 R\$',
                              style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.secondaryAmber),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'مطور ألعاب في منصة روبلوكس، متخصص في لغة Luau وأنظمة الـ DataStores ثلاثية الأبعاد.',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8), height: 1.4),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Profile Actions List
            _buildActionItem(
              icon: Icons.vpn_key_outlined,
              title: 'مفاتيح الربط والـ API الخاصة بي',
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('مفاتيح الـ API للمطورين مفعلة ومرتبطة بحسابك.')),
                );
              },
            ),
            _buildActionItem(
              icon: Icons.history,
              title: 'سجل الطلبات والمشتريات',
              onTap: () {},
            ),
            _buildActionItem(
              icon: Icons.security,
              title: 'الأمان والتحقق عبر OTP',
              onTap: () {},
            ),
            _buildActionItem(
              icon: Icons.logout,
              title: 'تسجيل الخروج من التطبيق',
              color: Colors.redAccent,
              onTap: () {
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (_) => const AuthScreen()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    Color? color,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppTheme.darkCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.darkCardBorder),
      ),
      child: ListTile(
        leading: Icon(icon, color: color ?? Colors.white70, size: 20),
        title: Text(
          title,
          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: color ?? Colors.white),
        ),
        trailing: const Icon(Icons.arrow_forward_ios, size: 12, color: Colors.white24),
        onTap: onTap,
      ),
    );
  }
}
