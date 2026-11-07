import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/app_theme.dart';

class VipPerksScreen extends StatefulWidget {
  const VipPerksScreen({Key? key}) : super(key: key);

  @override
  State<VipPerksScreen> createState() => _VipPerksScreenState();
}

class _VipPerksScreenState extends State<VipPerksScreen> {
  bool _dailyClaimed = false;
  int _robuxBalance = 200;
  bool _gameBooster = true;
  bool _pushNotifications = true;
  String? _copiedCode;

  void _claimDailyReward() {
    if (_dailyClaimed) return;
    setState(() {
      _dailyClaimed = true;
      _robuxBalance += 50;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: AppTheme.successEmerald,
        content: Text(
          '🎉 تهانينا! استلمت 50 Robux افتراضي وكود VIP حصري للتطبيق!',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  void _copyCode(String code) {
    Clipboard.setData(ClipboardData(text: code));
    setState(() => _copiedCode = code);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppTheme.primaryRose,
        duration: const Duration(seconds: 2),
        content: Text('تم نسخ الكود: $code للحافظة!'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.darkBg,
      appBar: AppBar(
        title: const Text(
          'ميزات التطبيق الحصرية (VIP)',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: AppTheme.darkCard,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Top VIP Banner
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppTheme.secondaryAmber, AppTheme.primaryRose, AppTheme.accentIndigo],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(22),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.secondaryAmber.withOpacity(0.3),
                    blurRadius: 20,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '⭐ ميزات حصرية لتطبيق الهاتف فقط',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                      Chip(
                        label: Text('VIP PASS', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.black)),
                        backgroundColor: Colors.white,
                        padding: EdgeInsets.zero,
                        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Text(
                    'مزايا تفاعلية لا توجد في موقع الويب',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'استلم رصيد Robux اليومي، فعّل وضع تسريع الألعاب، وانسخ أكواد الهدايا السرية.',
                    style: TextStyle(fontSize: 11, color: Colors.white),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 1. Daily Robux Drop Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.darkCard,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.secondaryAmber.withOpacity(0.3)),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            width: 36,
                            height: 36,
                            decoration: BoxDecoration(
                              color: AppTheme.secondaryAmber.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Icon(Icons.card_giftcard, color: AppTheme.secondaryAmber, size: 20),
                          ),
                          const SizedBox(width: 10),
                          const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'صندوق الهدايا اليومي',
                                style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                              Text(
                                'يتجدد مجاناً كل 24 ساعة',
                                style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            '$_robuxBalance R\$',
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w900,
                              color: AppTheme.secondaryAmber,
                            ),
                          ),
                          const Text(
                            'رصيدك الافتراضي',
                            style: TextStyle(fontSize: 9, color: Color(0xFF94A3B8)),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: AppTheme.darkBg,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: AppTheme.darkCardBorder),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '+50 Robux افتراضي',
                              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                            ),
                            Text(
                              'مع كود خصم 30% للمتجر',
                              style: TextStyle(fontSize: 9, color: Color(0xFF94A3B8)),
                            ),
                          ],
                        ),
                        ElevatedButton(
                          onPressed: _dailyClaimed ? null : _claimDailyReward,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.secondaryAmber,
                            foregroundColor: Colors.black,
                            elevation: 0,
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                          child: Text(
                            _dailyClaimed ? 'تم الاستلام اليوم ✓' : 'مطالبة بالهدية 🎁',
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 2. Game Booster Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.darkCard,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.darkCardBorder),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            width: 36,
                            height: 36,
                            decoration: BoxDecoration(
                              color: _gameBooster
                                  ? AppTheme.successEmerald.withOpacity(0.2)
                                  : const Color(0xFF1E293B),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Icon(
                              Icons.bolt,
                              color: _gameBooster ? AppTheme.successEmerald : const Color(0xFF94A3B8),
                              size: 20,
                            ),
                          ),
                          const SizedBox(width: 10),
                          const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'مسرّع ألعاب روبلوكس (Game Booster)',
                                style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                              Text(
                                'تقليل البينغ وتوفير 65% من استهلاك البيانات',
                                style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Switch(
                        value: _gameBooster,
                        onChanged: (val) => setState(() => _gameBooster = val),
                        activeColor: AppTheme.successEmerald,
                      ),
                    ],
                  ),
                  if (_gameBooster) ...[
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        _buildStatBox('14 ms', 'Server Ping', AppTheme.successEmerald),
                        const SizedBox(width: 8),
                        _buildStatBox('60 FPS', 'Frame Lock', AppTheme.primaryRose),
                        const SizedBox(width: 8),
                        _buildStatBox('-65%', 'Data Saved', AppTheme.accentIndigo),
                      ],
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 3. Exclusive App Codes Vault
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.darkCard,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.darkCardBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.vpn_key_outlined, color: AppTheme.accentIndigo, size: 20),
                      SizedBox(width: 8),
                      Text(
                        'خزينة الأكواد الحصرية للتطبيق (App Vault)',
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _buildCodeItem('ROBLOX-APP-VIP26', 'شارة VIP + سلاح حصري في الألعاب'),
                  const SizedBox(height: 8),
                  _buildCodeItem('BOOSTER-SPEED-99', 'مضاعفة سرعة الترقية وXP بنسبة 200%'),
                  const SizedBox(height: 8),
                  _buildCodeItem('DEV-OFFER-50X', 'خصم 50% على متجر الأدوات والسكربتات'),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 4. Notifications Toggle
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.darkCard,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.darkCardBorder),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.notifications_active_outlined, color: AppTheme.accentIndigo, size: 20),
                      SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'إشعارات الأكواد الفورية',
                            style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          Text(
                            'تنبيه فوري عند نزول كود جديد لروبلوكس',
                            style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Switch(
                    value: _pushNotifications,
                    onChanged: (val) => setState(() => _pushNotifications = val),
                    activeColor: AppTheme.accentIndigo,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatBox(String val, String label, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: AppTheme.darkBg,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppTheme.darkCardBorder),
        ),
        child: Column(
          children: [
            Text(
              val,
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: color),
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

  Widget _buildCodeItem(String code, String desc) {
    final isCopied = _copiedCode == code;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: AppTheme.darkBg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.darkCardBorder),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                code,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'monospace',
                  color: AppTheme.primaryRose,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                desc,
                style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
              ),
            ],
          ),
          IconButton(
            onPressed: () => _copyCode(code),
            icon: Icon(
              isCopied ? Icons.check_circle : Icons.copy,
              size: 18,
              color: isCopied ? AppTheme.successEmerald : Colors.white70,
            ),
          ),
        ],
      ),
    );
  }
}
