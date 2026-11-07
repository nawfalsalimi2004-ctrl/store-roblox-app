import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';

class RobloxGamesScreen extends StatefulWidget {
  const RobloxGamesScreen({super.key});

  @override
  State<RobloxGamesScreen> createState() => _RobloxGamesScreenState();
}

class _RobloxGamesScreenState extends State<RobloxGamesScreen> {
  List<RobloxGame> _games = [];
  bool _isLoading = true;
  String _searchQuery = '';
  String _selectedCategory = 'الكل';

  final List<String> _categories = [
    'الكل',
    'RPG / عالم مفتوح',
    'FPS / شوتر',
    'سباقات',
    'رعب',
  ];

  @override
  void initState() {
    super.initState();
    _loadGames();
  }

  Future<void> _loadGames() async {
    setState(() => _isLoading = true);
    final games = await ApiService.fetchGames();
    if (mounted) {
      setState(() {
        _games = games;
        _isLoading = false;
      });
    }
  }

  Future<void> _launchGame(String url) async {
    try {
      final uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      }
    } catch (_) {}
  }

  void _copyPlaceId(String placeId) {
    Clipboard.setData(ClipboardData(text: placeId));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.check_circle_rounded, color: AppTheme.successEmerald, size: 18),
            const SizedBox(width: 8),
            Text('تم نسخ معرف اللعبة (Place ID: $placeId) بنجاح!'),
          ],
        ),
        backgroundColor: AppTheme.darkCard,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _showGameDetails(RobloxGame game) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          height: MediaQuery.of(ctx).size.height * 0.85,
          decoration: const BoxDecoration(
            color: AppTheme.darkCard,
            borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
            border: Border(top: BorderSide(color: AppTheme.darkCardBorder, width: 1.5)),
          ),
          child: Column(
            children: [
              // Handle
              Container(
                margin: const EdgeInsets.only(top: 12),
                width: 44,
                height: 4,
                decoration: BoxDecoration(
                  color: AppTheme.darkCardBorder,
                  borderRadius: BorderRadius.circular(4),
                ),
              ),

              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Header image
                      ClipRRect(
                        borderRadius: BorderRadius.circular(18),
                        child: Stack(
                          children: [
                            Image.network(
                              game.image,
                              height: 180,
                              width: double.infinity,
                              fit: BoxFit.cover,
                              errorBuilder: (_, __, ___) => Container(
                                height: 180,
                                color: AppTheme.darkBg,
                                child: const Icon(Icons.sports_esports_rounded, size: 48, color: AppTheme.primaryRose),
                              ),
                            ),
                            Positioned(
                              top: 12,
                              right: 12,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.black.withOpacity(0.7),
                                  borderRadius: BorderRadius.circular(20),
                                  border: Border.all(color: Colors.white.withOpacity(0.2)),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    const Icon(Icons.star_rounded, color: Colors.amber, size: 14),
                                    const SizedBox(width: 4),
                                    Text(
                                      game.rating.toString(),
                                      style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 18),

                      // Title & Version
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Text(
                              game.title,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppTheme.primaryRose.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: AppTheme.primaryRose.withOpacity(0.3)),
                            ),
                            child: Text(
                              'v${game.version}',
                              style: const TextStyle(color: AppTheme.primaryRose, fontSize: 11, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),

                      // Developer Pill
                      Row(
                        children: [
                          CircleAvatar(
                            radius: 12,
                            backgroundImage: NetworkImage(game.developerAvatar),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            game.developerName,
                            style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 12, fontWeight: FontWeight.w600),
                          ),
                          const SizedBox(width: 4),
                          const Icon(Icons.verified_rounded, color: Colors.blueAccent, size: 14),
                        ],
                      ),

                      const SizedBox(height: 18),

                      // Place ID Card
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
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('معرف اللعبة (Roblox Place ID)', style: TextStyle(color: AppTheme.darkTextSecondary, fontSize: 10)),
                                const SizedBox(height: 2),
                                Text(
                                  game.robloxPlaceId,
                                  style: const TextStyle(color: Colors.white, fontSize: 13, fontFamily: 'monospace', fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            IconButton(
                              icon: const Icon(Icons.copy_rounded, color: AppTheme.primaryRose, size: 18),
                              onPressed: () => _copyPlaceId(game.robloxPlaceId),
                              tooltip: 'نسخ المعرف',
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 18),

                      // Description
                      const Text(
                        'نبذة عن اللعبة',
                        style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        game.description,
                        style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 13, height: 1.5),
                      ),

                      const SizedBox(height: 18),

                      // Latest Update Changelog
                      if (game.latestUpdateTitle.isNotEmpty) ...[
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: AppTheme.primaryRose.withOpacity(0.08),
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: AppTheme.primaryRose.withOpacity(0.25)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  const Icon(Icons.campaign_rounded, color: AppTheme.primaryRose, size: 18),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      game.latestUpdateTitle,
                                      style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              if (game.latestUpdateChanges.isNotEmpty) ...[
                                const SizedBox(height: 8),
                                ...game.latestUpdateChanges.map((change) => Padding(
                                  padding: const EdgeInsets.only(bottom: 4),
                                  child: Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const Text('• ', style: TextStyle(color: AppTheme.primaryRose, fontSize: 14)),
                                      Expanded(
                                        child: Text(
                                          change,
                                          style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 11),
                                        ),
                                      ),
                                    ],
                                  ),
                                )),
                              ],
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                      ],

                      // Play Now Button
                      ElevatedButton.icon(
                        onPressed: () => _launchGame(game.robloxGameUrl),
                        icon: const Icon(Icons.play_arrow_rounded, size: 22),
                        label: const Text('تشغيل اللعبة الآن في Roblox'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.primaryRose,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final filteredGames = _games.where((g) {
      final matchesSearch = g.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          g.description.toLowerCase().contains(_searchQuery.toLowerCase());
      final matchesCat = _selectedCategory == 'الكل' || g.genre.contains(_selectedCategory);
      return matchesSearch && matchesCat;
    }).toList();

    return Scaffold(
      backgroundColor: AppTheme.darkBg,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadGames,
          color: AppTheme.primaryRose,
          backgroundColor: AppTheme.darkCard,
          child: CustomScrollView(
            slivers: [
              // Search & Filter Header
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Search Bar
                      Container(
                        decoration: BoxDecoration(
                          color: AppTheme.darkCard,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppTheme.darkCardBorder),
                        ),
                        child: TextField(
                          onChanged: (val) => setState(() => _searchQuery = val),
                          style: const TextStyle(color: Colors.white, fontSize: 13),
                          decoration: InputDecoration(
                            hintText: 'ابحث عن ألعاب روبلوكس المنشورة...',
                            hintStyle: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 12),
                            prefixIcon: const Icon(Icons.search_rounded, color: AppTheme.darkTextSecondary, size: 20),
                            border: InputBorder.none,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            suffixIcon: _searchQuery.isNotEmpty
                                ? IconButton(
                                    icon: const Icon(Icons.clear_rounded, size: 16, color: AppTheme.darkTextSecondary),
                                    onPressed: () => setState(() => _searchQuery = ''),
                                  )
                                : null,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Category Pills
                      SizedBox(
                        height: 34,
                        child: ListView.separated(
                          scrollDirection: Axis.horizontal,
                          itemCount: _categories.length,
                          separatorBuilder: (_, __) => const SizedBox(width: 8),
                          itemBuilder: (ctx, idx) {
                            final cat = _categories[idx];
                            final isSel = cat == _selectedCategory;
                            return GestureDetector(
                              onTap: () => setState(() => _selectedCategory = cat),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                decoration: BoxDecoration(
                                  color: isSel ? AppTheme.primaryRose : AppTheme.darkCard,
                                  borderRadius: BorderRadius.circular(20),
                                  border: Border.all(
                                    color: isSel ? AppTheme.primaryRose : AppTheme.darkCardBorder,
                                  ),
                                ),
                                child: Text(
                                  cat,
                                  style: TextStyle(
                                    color: isSel ? Colors.white : AppTheme.darkTextSecondary,
                                    fontSize: 11,
                                    fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Game Cards List
              _isLoading
                  ? const SliverFillRemaining(
                      child: Center(
                        child: CircularProgressIndicator(color: AppTheme.primaryRose),
                      ),
                    )
                  : filteredGames.isEmpty
                      ? SliverFillRemaining(
                          child: Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.sports_esports_outlined, size: 48, color: Colors.white.withOpacity(0.3)),
                                const SizedBox(height: 12),
                                const Text(
                                  'لا توجد ألعاب منشورة مطابقة للبحث',
                                  style: TextStyle(color: AppTheme.darkTextSecondary, fontSize: 13),
                                ),
                              ],
                            ),
                          ),
                        )
                      : SliverPadding(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          sliver: SliverList(
                            delegate: SliverChildBuilderDelegate(
                              (context, index) {
                                final game = filteredGames[index];
                                return _buildGameCard(game);
                              },
                              childCount: filteredGames.length,
                            ),
                          ),
                        ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildGameCard(RobloxGame game) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: AppTheme.darkCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.darkCardBorder),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: () => _showGameDetails(game),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Top Media Banner
                ClipRRect(
                  borderRadius: BorderRadius.circular(14),
                  child: Stack(
                    children: [
                      Image.network(
                        game.image,
                        height: 150,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => Container(
                          height: 150,
                          color: AppTheme.darkBg,
                          child: const Center(
                            child: Icon(Icons.sports_esports_rounded, size: 40, color: AppTheme.primaryRose),
                          ),
                        ),
                      ),
                      // Genre pill
                      Positioned(
                        top: 10,
                        right: 10,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.black.withOpacity(0.75),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.white.withOpacity(0.2)),
                          ),
                          child: Text(
                            game.genre,
                            style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                      // Rating pill
                      Positioned(
                        bottom: 10,
                        right: 10,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppTheme.primaryRose.withOpacity(0.9),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.star_rounded, color: Colors.white, size: 12),
                              const SizedBox(width: 4),
                              Text(
                                game.rating.toString(),
                                style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),

                // Title and Version
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        game.title,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'v${game.version}',
                      style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 10),
                    ),
                  ],
                ),
                const SizedBox(height: 6),

                // Description
                Text(
                  game.description,
                  style: const TextStyle(
                    color: AppTheme.darkTextSecondary,
                    fontSize: 11,
                    height: 1.4,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 12),

                // Footer: Developer info + Play Button
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 11,
                          backgroundImage: NetworkImage(game.developerAvatar),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          game.developerName,
                          style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(width: 4),
                        const Icon(Icons.verified_rounded, color: Colors.blueAccent, size: 12),
                      ],
                    ),

                    ElevatedButton.icon(
                      onPressed: () => _launchGame(game.robloxGameUrl),
                      icon: const Icon(Icons.play_arrow_rounded, size: 16),
                      label: const Text('تشغيل'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primaryRose,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        textStyle: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                        elevation: 0,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
