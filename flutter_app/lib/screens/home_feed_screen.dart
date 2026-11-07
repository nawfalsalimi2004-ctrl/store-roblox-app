import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import 'articles_screen.dart';

class HomeFeedScreen extends StatefulWidget {
  final Function(int) onTabChange;
  const HomeFeedScreen({super.key, required this.onTabChange});

  @override
  State<HomeFeedScreen> createState() => _HomeFeedScreenState();
}

class _HomeFeedScreenState extends State<HomeFeedScreen> {
  List<RobloxGame> _games = [];
  List<Article> _articles = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final results = await Future.wait([
      ApiService.fetchGames(),
      ApiService.fetchArticles(),
    ]);

    if (mounted) {
      setState(() {
        _games = results[0] as List<RobloxGame>;
        _articles = results[1] as List<Article>;
        _isLoading = false;
      });
    }
  }

  Future<void> _launchUrl(String url) async {
    try {
      final uri = Uri.parse(url);
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
          onRefresh: _loadData,
          color: AppTheme.primaryRose,
          backgroundColor: AppTheme.darkCard,
          child: _isLoading
              ? const Center(child: CircularProgressIndicator(color: AppTheme.primaryRose))
              : CustomScrollView(
                  slivers: [
                    // Cloud Status Pill
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                AppTheme.successEmerald.withOpacity(0.12),
                                AppTheme.primaryRose.withOpacity(0.12),
                              ],
                            ),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: AppTheme.successEmerald.withOpacity(0.3)),
                          ),
                          child: Row(
                            children: [
                              Container(
                                width: 8,
                                height: 8,
                                decoration: const BoxDecoration(
                                  color: AppTheme.successEmerald,
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: 8),
                              const Expanded(
                                child: Text(
                                  'متصل بسحابة الموقع • developer-blush-psi.vercel.app',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: AppTheme.darkBg,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  '${ApiService.lastLatencyMs}ms',
                                  style: const TextStyle(
                                    color: AppTheme.successEmerald,
                                    fontSize: 10,
                                    fontFamily: 'monospace',
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),

                    // Featured Hero Game
                    if (_games.isNotEmpty)
                      SliverToBoxAdapter(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          child: _buildHeroCard(_games.first),
                        ),
                      ),

                    // Published Roblox Games Section Header
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(16, 18, 16, 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Row(
                              children: [
                                Icon(Icons.sports_esports_rounded, color: AppTheme.primaryRose, size: 20),
                                SizedBox(width: 8),
                                Text(
                                  'ألعاب روبلوكس المنشورة حديثاً',
                                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            TextButton(
                              onPressed: () => widget.onTabChange(1),
                              child: const Text('عرض الكل ←', style: TextStyle(color: AppTheme.primaryRose, fontSize: 12)),
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Horizontal Games List
                    SliverToBoxAdapter(
                      child: SizedBox(
                        height: 210,
                        child: ListView.separated(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          scrollDirection: Axis.horizontal,
                          itemCount: _games.length,
                          separatorBuilder: (_, __) => const SizedBox(width: 12),
                          itemBuilder: (ctx, idx) => _buildMiniGameCard(_games[idx]),
                        ),
                      ),
                    ),

                    // Published Articles Section Header
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(16, 24, 16, 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Row(
                              children: [
                                Icon(Icons.menu_book_rounded, color: AppTheme.accentIndigo, size: 20),
                                SizedBox(width: 8),
                                Text(
                                  'مقالات وشروحات المطورين',
                                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            TextButton(
                              onPressed: () => widget.onTabChange(2),
                              child: const Text('عرض الكل ←', style: TextStyle(color: AppTheme.primaryRose, fontSize: 12)),
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Latest Articles List
                    SliverPadding(
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
                      sliver: SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (ctx, idx) {
                            final art = _articles[idx];
                            return _buildMiniArticleCard(art);
                          },
                          childCount: _articles.length > 3 ? 3 : _articles.length,
                        ),
                      ),
                    ),
                  ],
                ),
        ),
      ),
    );
  }

  Widget _buildHeroCard(RobloxGame game) {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppTheme.darkCardBorder),
        image: DecorationImage(
          image: NetworkImage(game.image),
          fit: BoxFit.cover,
        ),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.transparent,
              Colors.black.withOpacity(0.85),
            ],
          ),
        ),
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryRose,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Text(
                    'اللعبة المميزة اليوم',
                    style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  game.genre,
                  style: const TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              game.title,
              style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    CircleAvatar(radius: 10, backgroundImage: NetworkImage(game.developerAvatar)),
                    const SizedBox(width: 6),
                    Text(game.developerName, style: const TextStyle(color: Colors.white70, fontSize: 11)),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: () => _launchUrl(game.robloxGameUrl),
                  icon: const Icon(Icons.play_arrow_rounded, size: 16),
                  label: const Text('العب الآن في Roblox'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primaryRose,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    textStyle: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMiniGameCard(RobloxGame game) {
    return Container(
      width: 160,
      decoration: BoxDecoration(
        color: AppTheme.darkCard,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppTheme.darkCardBorder),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(18),
          onTap: () => _launchUrl(game.robloxGameUrl),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(18)),
                child: Image.network(
                  game.image,
                  height: 100,
                  width: double.infinity,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => Container(height: 100, color: AppTheme.darkBg),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      game.title,
                      style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      game.genre,
                      style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 10),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.star_rounded, color: Colors.amber, size: 12),
                        const SizedBox(width: 3),
                        Text(
                          game.rating.toString(),
                          style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                        const Spacer(),
                        const Text(
                          'تشغيل ⚡',
                          style: TextStyle(color: AppTheme.primaryRose, fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMiniArticleCard(Article article) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppTheme.darkCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.darkCardBorder),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.all(12),
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => ArticleDetailScreen(article: article)),
          );
        },
        leading: ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: Image.network(
            article.coverImage,
            width: 55,
            height: 55,
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(width: 55, height: 55, color: AppTheme.darkBg),
          ),
        ),
        title: Text(
          article.title,
          style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text(
            '${article.category} • ${article.authorName}',
            style: const TextStyle(color: AppTheme.darkTextSecondary, fontSize: 10),
          ),
        ),
        trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 14, color: AppTheme.darkTextSecondary),
      ),
    );
  }
}
