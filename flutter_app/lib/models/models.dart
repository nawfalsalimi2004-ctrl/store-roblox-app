class RobloxGame {
  final String id;
  final String title;
  final String description;
  final String developerName;
  final String version;
  final int downloads;
  final double rating;
  final String imageUrl;
  final String robloxUrl;
  final List<String> changelog;

  const RobloxGame({
    required this.id,
    required this.title,
    required this.description,
    required this.developerName,
    required this.version,
    required this.downloads,
    required this.rating,
    required this.imageUrl,
    required this.robloxUrl,
    required this.changelog,
  });
}

class StoreProduct {
  final String id;
  final String title;
  final String category;
  final double price;
  final String developerName;
  final String imageUrl;

  const StoreProduct({
    required this.id,
    required this.title,
    required this.category,
    required this.price,
    required this.developerName,
    required this.imageUrl,
  });
}

class FriendUser {
  final String id;
  final String name;
  final String robloxUsername;
  final String status;
  final String avatarUrl;

  const FriendUser({
    required this.id,
    required this.name,
    required this.robloxUsername,
    required this.status,
    required this.avatarUrl,
  });
}

class PromoCode {
  final String code;
  final String reward;
  final String tag;

  const PromoCode({
    required this.code,
    required this.reward,
    required this.tag,
  });
}
