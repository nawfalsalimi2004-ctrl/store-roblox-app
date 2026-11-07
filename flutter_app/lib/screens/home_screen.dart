import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';

class HomeScreen extends StatelessWidget {
  final String userName;
  final VoidCallback onOpenVip;
  final VoidCallback onOpenRoblox;
  final VoidCallback onOpenStore;

  const HomeScreen({
    Key? key,
    required this.userName,
    required this.onOpenVip,
    required this.onOpenRoblox,
    required this.onOpenStore,
  }) : super(key: key);

  final List<RobloxGame> featuredGames = const [
    RobloxGame(
      id: 'rbx-1',
      title: 'محاكي القتال العربي (Arabian Combat)',
      description: 'لعبة قتال ملحمية مبنية بنظام فيزياء Luau المتطور، تدعم المبارزات الجماعية والأسلحة التاريخية.',
      developerName: 'سعد القحطاني',
      version: 'v2.1.0',
      downloads: 48500,
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
      robloxUrl: 'https://www.roblox.com/games/example-1',
      changelog: ['إضافة ميزة السحر المزدوج', 'تحسين أداء السيرفرات'],
    ),
    RobloxGame(
      id: 'rbx-2',
      title: 'مدينة الأحلام والوظائف (Riyadh Life RP)',
      description: 'أضخم لعبة حياة واقعية وتقمص أدوار باللغة العربية مع نظام قيادة واقعي ونظام وظائف واقتصاد متكامل.',
      developerName: 'فريق مطوري الرياض',
      version: 'v3.0.4',
      downloads: 92300,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
      robloxUrl: 'https://www.roblox.com/games/example-2',
      changelog: ['إطلاق نظام سيارات الدفع الرباعي', 'تحديث خريطة المدينة'],
    ),
  ];

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.darkBg,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // VIP Exclusive Promo Card
              GestureDetector(
                onTap: onOpenVip,
                child: Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF831843), Color(0xFF4C1D95)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: AppTheme.secondaryAmber.withOpacity(0.4)),
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.primaryRose.withOpacity(0.2),
                        blurRadius: 15,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [AppTheme.secondaryAmber, AppTheme.primaryRose],
                          ),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Center(
                          child: Icon(Icons.card_giftcard, color: Colors.white, size: 24),
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(
                                  'ميزات التطبيق الحصرية (VIP)',
                                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                                ),
                                SizedBox(width: 6),
                                Chip(
                                  label: Text('حصرية', style: TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: Colors.black)),
                                  backgroundColor: AppTheme.secondaryAmber,
                                  padding: EdgeInsets.zero,
                                  materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                ),
                              ],
                            ),
                            SizedBox(height: 2),
                            Text(
                              'مكافآت يومية مجانية، مسرّع ألعاب روبلوكس، وأكواد سرية لا توجد بالموقع!',
                              style: TextStyle(fontSize: 10, color: Color(0xFFFDE68A)),
                            ),
                          ],
                        ),
                      ),
                      const Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.secondaryAmber),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Hero Card
              Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF881337), AppTheme.darkCard],
                    begin: Alignment.topRight,
                    end: Alignment.bottomLeft,
                  ),
                  borderRadius: BorderRadius.circular(22),
                  border: Border.all(color: AppTheme.primaryRose.withOpacity(0.3)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppTheme.primaryRose.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text(
                            'تطبيق روبلوكس الرسمي',
                            style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Color(0xFFFDA4AF)),
                          ),
                        ),
                        const Row(
                          children: [
                            Icon(Icons.circle, size: 8, color: AppTheme.successEmerald),
                            SizedBox(width: 4),
                            Text(
                              'متصل ومحدث',
                              style: TextStyle(fontSize: 10, color: AppTheme.successEmerald, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      'استكشف أضخم ألعاب روبلوكس وتطبيقات المطورين',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'شارك مع المطورين المعتمدين، تابع سجلات التحديثات الحية، وجرّب المزايا الحصرية.',
                      style: TextStyle(fontSize: 11, color: Color(0xFFCBD5E1)),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton.icon(
                            onPressed: onOpenRoblox,
                            icon: const Icon(Icons.sports_esports, size: 16),
                            label: const Text('ألعاب روبلوكس', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppTheme.primaryRose,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: onOpenStore,
                            icon: const Icon(Icons.shopping_bag_outlined, size: 16),
                            label: const Text('متجر البرامج', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: Colors.white,
                              side: const BorderSide(color: AppTheme.darkCardBorder),
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),

              // Metrics Row
              Row(
                children: [
                  _buildMetricBox('+140,000', 'لعب وتحميل', AppTheme.primaryRose),
                  const SizedBox(width: 8),
                  _buildMetricBox('+350', 'مطور معتمد', AppTheme.secondaryAmber),
                  const SizedBox(width: 8),
                  _buildMetricBox('100%', 'تحقق OTP', AppTheme.successEmerald),
                  const SizedBox(width: 8),
                  _buildMetricBox('+25', 'تحديث شهري', AppTheme.accentIndigo),
                ],
              ),
              const SizedBox(height: 24),

              // Roblox Games Feed Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.local_fire_department, color: AppTheme.primaryRose, size: 20),
                      SizedBox(width: 6),
                      Text(
                        'أحدث ألعاب وتحديثات روبلوكس',
                        style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ],
                  ),
                  TextButton(
                    onPressed: onOpenRoblox,
                    child: const Text('عرض الكل', style: TextStyle(fontSize: 11, color: AppTheme.primaryRose)),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              ...featuredGames.map((game) => _buildGameCard(game)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMetricBox(String num, String label, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: AppTheme.darkCard,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AppTheme.darkCardBorder),
        ),
        child: Column(
          children: [
            Text(
              num,
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900, color: color, fontFamily: 'monospace'),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: const TextStyle(fontSize: 9, color: Color(0xFF94A3B8)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGameCard(RobloxGame game) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.darkCard,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppTheme.darkCardBorder),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(14),
            child: Image.network(
              game.imageUrl,
              width: 70,
              height: 70,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                width: 70,
                height: 70,
                color: const Color(0xFF1E293B),
                child: const Icon(Icons.videogame_asset, color: Colors.white54),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  game.title,
                  style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Text(
                      game.version,
                      style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryRose, fontFamily: 'monospace'),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      game.developerName,
                      style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    const Icon(Icons.download, size: 12, color: Color(0xFF94A3B8)),
                    const SizedBox(width: 2),
                    Text(
                      '${game.downloads} لاعب',
                      style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                    ),
                    const SizedBox(width: 10),
                    const Icon(Icons.star, size: 12, color: AppTheme.secondaryAmber),
                    const SizedBox(width: 2),
                    Text(
                      '${game.rating}',
                      style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                    ),
                  ],
                ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () => _launchUrl(game.robloxUrl),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryRose,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: const Text('العب', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}
