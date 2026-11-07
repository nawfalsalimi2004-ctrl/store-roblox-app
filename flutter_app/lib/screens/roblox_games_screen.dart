import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';

class RobloxGamesScreen extends StatelessWidget {
  const RobloxGamesScreen({Key? key}) : super(key: key);

  final List<RobloxGame> games = const [
    RobloxGame(
      id: 'rbx-1',
      title: 'محاكي القتال العربي (Arabian Combat)',
      description: 'لعبة قتال ملحمية مبنية بنظام فيزياء Luau المتطور، تدعم المبارزات الجماعية والأسلحة التاريخية.',
      developerName: 'سعد القحطاني',
      version: 'v2.1.0',
      downloads: 48500,
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
      robloxUrl: 'https://www.roblox.com',
      changelog: [
        'إضافة سلاح السيف الدمشقي الحصري',
        'نظام تحسين البينغ واستجابة الضرر',
        'ميدان تدريب جديد للمبتدئين'
      ],
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
      robloxUrl: 'https://www.roblox.com',
      changelog: [
        'إضافة سيارات دفع رباعي جديدة',
        'توسيع منطقة وسط المدينة والمستشفى',
        'إصلاح مشكلة حفظ الرصيد في DataStore'
      ],
    ),
    RobloxGame(
      id: 'rbx-3',
      title: 'مغامرات الجزيرة الغامضة (Mystery Island)',
      description: 'لعبة نجاة وبناء قواعد مع نظام مناخ ديناميكي وألغاز تستكشفها مع أصدقائك.',
      developerName: 'عمر التميمي',
      version: 'v1.5.0',
      downloads: 34100,
      rating: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80',
      robloxUrl: 'https://www.roblox.com',
      changelog: [
        'إطلاق كهف الكنز المخفي',
        'نظام صياغة القوارب السريعة'
      ],
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
      appBar: AppBar(
        title: const Text(
          'ألعاب روبلوكس وتحديثات المطورين',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: AppTheme.darkCard,
        elevation: 0,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: games.length,
        itemBuilder: (context, index) {
          final game = games[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.darkCard,
              borderRadius: BorderRadius.circular(22),
              border: Border.all(color: AppTheme.darkCardBorder),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: Image.network(
                        game.imageUrl,
                        width: 80,
                        height: 80,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            game.title,
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: AppTheme.primaryRose.withOpacity(0.15),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  game.version,
                                  style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryRose, fontFamily: 'monospace'),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Text(
                                game.developerName,
                                style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              const Icon(Icons.download, size: 12, color: Color(0xFF94A3B8)),
                              const SizedBox(width: 4),
                              Text(
                                '${game.downloads} لاعب',
                                style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                              ),
                              const SizedBox(width: 12),
                              const Icon(Icons.star, size: 12, color: AppTheme.secondaryAmber),
                              const SizedBox(width: 4),
                              Text(
                                '${game.rating}',
                                style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  game.description,
                  style: const TextStyle(fontSize: 11, color: Color(0xFFCBD5E1), height: 1.4),
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppTheme.darkBg,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppTheme.darkCardBorder),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Row(
                        children: [
                          Icon(Icons.update, size: 14, color: AppTheme.secondaryAmber),
                          SizedBox(width: 6),
                          Text(
                            'سجل التحديث الأخير (Live Changelog):',
                            style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.secondaryAmber),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      ...game.changelog.map(
                        (log) => Padding(
                          padding: const EdgeInsets.only(bottom: 2.0),
                          child: Text(
                            '• $log',
                            style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () => _launchUrl(game.robloxUrl),
                    icon: const Icon(Icons.sports_esports, size: 16),
                    label: const Text('تشغيل اللعبة الآن في روبلوكس', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primaryRose,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 11),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
