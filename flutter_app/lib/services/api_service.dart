import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/models.dart';

class ApiService {
  static const String baseUrl = 'https://developer-blush-psi.vercel.app';
  static bool isOnline = true;
  static int lastLatencyMs = 24;
  static DateTime? lastSyncTime;

  /// Fetch published Roblox games from the website API
  static Future<List<RobloxGame>> fetchGames() async {
    final urls = [
      '$baseUrl/api/games',
      '$baseUrl/api/games.json',
    ];

    for (final url in urls) {
      try {
        final stopwatch = Stopwatch()..start();
        final response = await http.get(
          Uri.parse(url),
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'RobloxDevStore-Flutter/1.0',
          },
        ).timeout(const Duration(seconds: 6));
        stopwatch.stop();

        if (response.statusCode == 200) {
          isOnline = true;
          lastLatencyMs = stopwatch.elapsedMilliseconds;
          lastSyncTime = DateTime.now();

          final data = json.decode(utf8.decode(response.bodyBytes));
          if (data['games'] is List) {
            return (data['games'] as List)
                .map((g) => RobloxGame.fromJson(g))
                .toList();
          }
        }
      } catch (e) {
        // Continue to fallback
      }
    }

    // Fallback default official games if offline
    isOnline = false;
    return defaultPublishedGames;
  }

  /// Fetch published articles and dev tutorials from the website API
  static Future<List<Article>> fetchArticles() async {
    final urls = [
      '$baseUrl/api/articles',
      '$baseUrl/api/articles.json',
    ];

    for (final url in urls) {
      try {
        final stopwatch = Stopwatch()..start();
        final response = await http.get(
          Uri.parse(url),
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'RobloxDevStore-Flutter/1.0',
          },
        ).timeout(const Duration(seconds: 6));
        stopwatch.stop();

        if (response.statusCode == 200) {
          isOnline = true;
          lastLatencyMs = stopwatch.elapsedMilliseconds;
          lastSyncTime = DateTime.now();

          final data = json.decode(utf8.decode(response.bodyBytes));
          if (data['articles'] is List) {
            return (data['articles'] as List)
                .map((a) => Article.fromJson(a))
                .toList();
          }
        }
      } catch (e) {
        // Continue to fallback
      }
    }

    // Fallback default official articles if offline
    isOnline = false;
    return defaultPublishedArticles;
  }
}
