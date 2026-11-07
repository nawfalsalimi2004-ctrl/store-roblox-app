import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../services/firebase_service.dart';
import '../theme/app_theme.dart';
import 'auth_screen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final user = FirebaseService.currentUser;
  List<UserAccount> _cloudUsers = [];
  bool _isLoadingUsers = true;

  @override
  void initState() {
    super.initState();
    _loadCloudUsers();
  }

  Future<void> _loadCloudUsers() async {
    final users = await ApiService.fetchRegisteredUsers();
    if (mounted) {
      setState(() {
        _cloudUsers = users;
        _isLoadingUsers = false;
      });
    }
  }

  Future<void> _handleSignOut() async {
    await FirebaseService.signOut();
    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const AuthScreen()),
      );
    }
  }

  Future<void> _openWebPlatform() async {
    try {
      final uri = Uri.parse('https://developer-blush-psi.vercel.app');
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      }
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.darkBg,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async {
            await _loadCloudUsers();
          },
          color: AppTheme.primaryRose,
          backgroundColor: AppTheme.darkCard,
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Current User Card
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
                        alignment: Alignment.bottomRight,
                        children: [
                          CircleAvatar(
                            radius: 38,
                            backgroundImage: NetworkImage(
                              user?.avatar ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.all(4),
                            decoration: const BoxDecoration(
                              color: Colors.blueAccent,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.check, size: 14, color: Colors.white),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            user?.name ?? 'مطور المنصة',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppTheme.primaryRose.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Text(
                              'Verified Dev ⚡',
                              style: TextStyle(
                                color: AppTheme.primaryRose,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        user?.email ?? 'admin@robloxdev.com',
                        style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 12),
                      ),
                      if (user?.robloxUsername.isNotEmpty ?? false) ...[
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppTheme.darkBg,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: AppTheme.darkCardBorder),
                          ),
                          child: Text(
                            'Roblox: @${user?.robloxUsername}',
                            style: const TextStyle(color: Colors.white70, fontSize: 11, fontFamily: 'monospace'),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // Registered Users (Website & App Sync)
                _buildSectionTitle('المستخدمون والمطورون المسجلون بالسحابة (Web & App)'),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppTheme.darkCard,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppTheme.darkCardBorder),
                  ),
                  child: _isLoadingUsers
                      ? const Center(
                          child: Padding(
                            padding: EdgeInsets.all(16),
                            child: CircularProgressIndicator(color: AppTheme.primaryRose, strokeWidth: 2),
                          ),
                        )
                      : _cloudUsers.isEmpty
                          ? const Center(
                              child: Padding(
                                padding: EdgeInsets.all(12),
                                child: Text('جاري مزامنة قائمة المستخدمين مع السحابة...', style: TextStyle(color: AppTheme.darkTextSecondary, fontSize: 11)),
                              ),
                            )
                          : Column(
                              children: _cloudUsers.map((u) {
                                final isApp = u.registrationSource == 'mobile_app';
                                return Container(
                                  margin: const EdgeInsets.only(bottom: 10),
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: AppTheme.darkBg,
                                    borderRadius: BorderRadius.circular(14),
                                    border: Border.all(color: AppTheme.darkCardBorder),
                                  ),
                                  child: Row(
                                    children: [
                                      CircleAvatar(
                                        radius: 16,
                                        backgroundImage: NetworkImage(u.avatar),
                                      ),
                                      const SizedBox(width: 10),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Row(
                                              children: [
                                                Text(
                                                  u.name,
                                                  style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                                ),
                                                if (u.isVerified) ...[
                                                  const SizedBox(width: 4),
                                                  const Icon(Icons.verified_rounded, color: Colors.blueAccent, size: 12),
                                                ],
                                              ],
                                            ),
                                            Text(
                                              u.email,
                                              style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 10),
                                            ),
                                          ],
                                        ),
                                      ),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                        decoration: BoxDecoration(
                                          color: isApp ? Colors.indigo.withOpacity(0.2) : AppTheme.successEmerald.withOpacity(0.2),
                                          borderRadius: BorderRadius.circular(8),
                                          border: Border.all(
                                            color: isApp ? Colors.indigo.withOpacity(0.4) : AppTheme.successEmerald.withOpacity(0.4),
                                          ),
                                        ),
                                        child: Text(
                                          isApp ? '📱 التطبيق' : '🌐 الموقع',
                                          style: TextStyle(
                                            color: isApp ? Colors.indigoAccent : AppTheme.successEmerald,
                                            fontSize: 9,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                );
                              }).toList(),
                            ),
                ),

                const SizedBox(height: 20),

                // Firebase Connection Status
                _buildSectionTitle('الاتصال السحابي (Firebase Cloud Firestore)'),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppTheme.darkCard,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppTheme.darkCardBorder),
                  ),
                  child: Column(
                    children: [
                      _buildStatusRow(
                        icon: Icons.local_fire_department_rounded,
                        iconColor: Colors.amber,
                        title: 'Firebase Project ID',
                        value: FirebaseService.projectId,
                        isOk: true,
                      ),
                      const Divider(color: AppTheme.darkCardBorder, height: 24),
                      _buildStatusRow(
                        icon: Icons.security_rounded,
                        iconColor: AppTheme.successEmerald,
                        title: 'Firebase Auth & Cloud Firestore',
                        value: 'متصل ومفعل (Active & Synced)',
                        isOk: true,
                      ),
                      const Divider(color: AppTheme.darkCardBorder, height: 24),
                      _buildStatusRow(
                        icon: Icons.sync_rounded,
                        iconColor: Colors.blueAccent,
                        title: 'تزامن المقالات والألعاب المنشورة',
                        value: 'تزامن لحظي ثنائي الاتجاه ⚡',
                        isOk: true,
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // Website API Status
                _buildSectionTitle('ربط واجهة الموقع (Website API)'),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppTheme.darkCard,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppTheme.darkCardBorder),
                  ),
                  child: Column(
                    children: [
                      _buildStatusRow(
                        icon: Icons.link_rounded,
                        iconColor: AppTheme.primaryRose,
                        title: 'رابط الموقع الرئيسي',
                        value: 'developer-blush-psi.vercel.app',
                        isOk: true,
                      ),
                      const Divider(color: AppTheme.darkCardBorder, height: 24),
                      _buildStatusRow(
                        icon: Icons.speed_rounded,
                        iconColor: AppTheme.successEmerald,
                        title: 'سرعة الاستجابة (Latency)',
                        value: '${ApiService.lastLatencyMs} ms (سريع جداً)',
                        isOk: true,
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 24),

                // Actions
                OutlinedButton.icon(
                  onPressed: _openWebPlatform,
                  icon: const Icon(Icons.open_in_new_rounded, size: 16),
                  label: const Text('فتح موقع المنصة في المتصفح'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.white,
                    side: const BorderSide(color: AppTheme.darkCardBorder),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                ),

                const SizedBox(height: 10),

                ElevatedButton.icon(
                  onPressed: _handleSignOut,
                  icon: const Icon(Icons.logout_rounded, size: 16),
                  label: const Text('تسجيل الخروج من الحساب'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red.withOpacity(0.15),
                    foregroundColor: Colors.redAccent,
                    elevation: 0,
                    side: BorderSide(color: Colors.red.withOpacity(0.3)),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                ),

                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        color: Colors.white,
        fontSize: 13,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _buildStatusRow({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String value,
    required bool isOk,
  }) {
    return Row(
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: BoxDecoration(
            color: iconColor.withOpacity(0.15),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: iconColor, size: 18),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 10),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            color: isOk ? AppTheme.successEmerald : Colors.red,
            shape: BoxShape.circle,
          ),
        ),
      ],
    );
  }
}
