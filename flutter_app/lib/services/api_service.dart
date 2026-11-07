import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/models.dart';

class ApiService {
  static const String firestoreProjectId = 'gen-lang-client-0560640026';
  static const String firestoreBaseUrl =
      'https://firestore.googleapis.com/v1/projects/$firestoreProjectId/databases/(default)/documents';
  static const String webBaseUrl = 'https://developer-blush-psi.vercel.app';

  static bool isOnline = true;
  static int lastLatencyMs = 24;
  static DateTime? lastSyncTime;

  /// Helper to convert Google Cloud Firestore REST values to plain Dart types
  static dynamic _parseFirestoreValue(Map<String, dynamic> val) {
    if (val.containsKey('stringValue')) return val['stringValue'];
    if (val.containsKey('integerValue')) {
      return int.tryParse(val['integerValue'].toString()) ?? 0;
    }
    if (val.containsKey('doubleValue')) {
      return (val['doubleValue'] as num).toDouble();
    }
    if (val.containsKey('booleanValue')) return val['booleanValue'] == true;
    if (val.containsKey('arrayValue')) {
      final list = val['arrayValue']['values'] as List?;
      return list?.map((v) => _parseFirestoreValue(v as Map<String, dynamic>)).toList() ?? [];
    }
    if (val.containsKey('mapValue')) {
      final map = val['mapValue']['fields'] as Map<String, dynamic>?;
      final res = <String, dynamic>{};
      map?.forEach((k, v) => res[k] = _parseFirestoreValue(v as Map<String, dynamic>));
      return res;
    }
    return null;
  }

  static Map<String, dynamic> _docToMap(Map<String, dynamic> doc) {
    final fields = doc['fields'] as Map<String, dynamic>? ?? {};
    final res = <String, dynamic>{};
    fields.forEach((k, v) => res[k] = _parseFirestoreValue(v as Map<String, dynamic>));
    if (!res.containsKey('id')) {
      final name = doc['name'] as String? ?? '';
      res['id'] = name.split('/').last;
    }
    return res;
  }

  /// Fetch live published Roblox Games directly from Google Cloud Firestore
  static Future<List<RobloxGame>> fetchGames() async {
    try {
      final stopwatch = Stopwatch()..start();
      final response = await http.get(
        Uri.parse('$firestoreBaseUrl/products'),
        headers: {'Accept': 'application/json'},
      ).timeout(const Duration(seconds: 6));
      stopwatch.stop();

      if (response.statusCode == 200) {
        isOnline = true;
        lastLatencyMs = stopwatch.elapsedMilliseconds;
        lastSyncTime = DateTime.now();

        final data = json.decode(utf8.decode(response.bodyBytes));
        final docs = data['documents'] as List?;
        if (docs != null) {
          return docs.map((d) => RobloxGame.fromJson(_docToMap(d))).toList();
        } else {
          // Empty collection in Firestore
          return [];
        }
      }
    } catch (_) {}

    // Fallback: Website API endpoint
    try {
      final response = await http.get(
        Uri.parse('$webBaseUrl/api/games'),
        headers: {'Accept': 'application/json'},
      ).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        final data = json.decode(utf8.decode(response.bodyBytes));
        if (data['games'] is List) {
          return (data['games'] as List)
              .map((g) => RobloxGame.fromJson(g))
              .toList();
        }
      }
    } catch (_) {}

    isOnline = false;
    return defaultPublishedGames;
  }

  /// Fetch live published Articles & Guides directly from Google Cloud Firestore
  static Future<List<Article>> fetchArticles() async {
    try {
      final stopwatch = Stopwatch()..start();
      final response = await http.get(
        Uri.parse('$firestoreBaseUrl/articles'),
        headers: {'Accept': 'application/json'},
      ).timeout(const Duration(seconds: 6));
      stopwatch.stop();

      if (response.statusCode == 200) {
        isOnline = true;
        lastLatencyMs = stopwatch.elapsedMilliseconds;
        lastSyncTime = DateTime.now();

        final data = json.decode(utf8.decode(response.bodyBytes));
        final docs = data['documents'] as List?;
        if (docs != null) {
          return docs.map((d) => Article.fromJson(_docToMap(d))).toList();
        } else {
          // Empty collection in Firestore
          return [];
        }
      }
    } catch (_) {}

    // Fallback: Website API endpoint
    try {
      final response = await http.get(
        Uri.parse('$webBaseUrl/api/articles'),
        headers: {'Accept': 'application/json'},
      ).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        final data = json.decode(utf8.decode(response.bodyBytes));
        if (data['articles'] is List) {
          return (data['articles'] as List)
              .map((a) => Article.fromJson(a))
              .toList();
        }
      }
    } catch (_) {}

    isOnline = false;
    return defaultPublishedArticles;
  }

  /// Fetch all registered users from Website & App via Firestore
  static Future<List<UserAccount>> fetchRegisteredUsers() async {
    try {
      final response = await http.get(
        Uri.parse('$firestoreBaseUrl/users'),
        headers: {'Accept': 'application/json'},
      ).timeout(const Duration(seconds: 6));

      if (response.statusCode == 200) {
        final data = json.decode(utf8.decode(response.bodyBytes));
        final docs = data['documents'] as List?;
        if (docs != null && docs.isNotEmpty) {
          return docs.map((d) => UserAccount.fromJson(_docToMap(d))).toList();
        }
      }
    } catch (_) {}
    return [];
  }
}
