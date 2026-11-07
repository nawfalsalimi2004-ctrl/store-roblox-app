class UserAccount {
  final String id;
  final String name;
  final String email;
  final String role;
  final String avatar;
  final bool isVerified;
  final String robloxUsername;

  UserAccount({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    required this.avatar,
    this.isVerified = true,
    this.robloxUsername = '',
  });

  factory UserAccount.fromJson(Map<String, dynamic> json) {
    return UserAccount(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      role: json['role'] ?? 'user',
      avatar: json['avatar'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: json['isVerified'] ?? true,
      robloxUsername: json['robloxUsername'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'email': email,
    'role': role,
    'avatar': avatar,
    'isVerified': isVerified,
    'robloxUsername': robloxUsername,
  };
}

class RobloxGame {
  final String id;
  final String title;
  final String category;
  final String genre;
  final double rating;
  final int reviewsCount;
  final int downloads;
  final String version;
  final String lastUpdated;
  final String robloxPlaceId;
  final String robloxGameUrl;
  final String image;
  final String description;
  final String developerName;
  final String developerAvatar;
  final bool isVerified;
  final List<String> tags;
  final String latestUpdateTitle;
  final List<String> latestUpdateChanges;

  RobloxGame({
    required this.id,
    required this.title,
    required this.category,
    required this.genre,
    required this.rating,
    required this.reviewsCount,
    required this.downloads,
    required this.version,
    required this.lastUpdated,
    required this.robloxPlaceId,
    required this.robloxGameUrl,
    required this.image,
    required this.description,
    required this.developerName,
    required this.developerAvatar,
    this.isVerified = true,
    required this.tags,
    this.latestUpdateTitle = '',
    this.latestUpdateChanges = const [],
  });

  factory RobloxGame.fromJson(Map<String, dynamic> json) {
    final dev = json['developer'] as Map<String, dynamic>?;
    final upd = json['latestUpdate'] as Map<String, dynamic>?;

    return RobloxGame(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      category: json['category'] ?? 'ألعاب روبلوكس',
      genre: json['genre'] ?? 'مغامرة / أكشن',
      rating: (json['rating'] is num) ? (json['rating'] as num).toDouble() : 4.8,
      reviewsCount: json['reviewsCount'] ?? 500,
      downloads: json['downloads'] ?? 50000,
      version: json['version'] ?? '1.0.0',
      lastUpdated: json['lastUpdated'] ?? '2026-11-01',
      robloxPlaceId: json['robloxPlaceId'] ?? '',
      robloxGameUrl: json['robloxGameUrl'] ?? 'https://www.roblox.com',
      image: json['image'] ?? 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      description: json['description'] ?? '',
      developerName: dev?['name'] ?? json['developerName'] ?? 'المشرف',
      developerAvatar: dev?['avatar'] ?? json['developerAvatar'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: dev?['isVerified'] ?? json['isVerified'] ?? true,
      tags: (json['tags'] as List?)?.map((e) => e.toString()).toList() ?? ['Roblox'],
      latestUpdateTitle: upd?['title'] ?? '',
      latestUpdateChanges: (upd?['changes'] as List?)?.map((e) => e.toString()).toList() ?? [],
    );
  }
}

class Article {
  final String id;
  final String title;
  final String slug;
  final String category;
  final int readTimeMinutes;
  final int views;
  final int likes;
  final int commentsCount;
  final String createdAt;
  final String coverImage;
  final String excerpt;
  final String content;
  final String authorName;
  final String authorRole;
  final String authorAvatar;
  final bool isVerified;
  final List<String> tags;

  Article({
    required this.id,
    required this.title,
    required this.slug,
    required this.category,
    required this.readTimeMinutes,
    required this.views,
    required this.likes,
    required this.commentsCount,
    required this.createdAt,
    required this.coverImage,
    required this.excerpt,
    required this.content,
    required this.authorName,
    required this.authorRole,
    required this.authorAvatar,
    this.isVerified = true,
    required this.tags,
  });

  factory Article.fromJson(Map<String, dynamic> json) {
    final author = json['author'] as Map<String, dynamic>?;

    return Article(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      slug: json['slug'] ?? '',
      category: json['category'] ?? 'تطوير روبلوكس',
      readTimeMinutes: json['readTimeMinutes'] ?? 4,
      views: json['views'] ?? 1000,
      likes: json['likes'] ?? 150,
      commentsCount: json['commentsCount'] ?? 10,
      createdAt: json['createdAt'] ?? '2026-11-01',
      coverImage: json['coverImage'] ?? 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000',
      excerpt: json['excerpt'] ?? '',
      content: json['content'] ?? '',
      authorName: author?['name'] ?? 'مشرف المنصة',
      authorRole: author?['role'] ?? 'مشرف',
      authorAvatar: author?['avatar'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: author?['isVerified'] ?? true,
      tags: (json['tags'] as List?)?.map((e) => e.toString()).toList() ?? ['Roblox'],
    );
  }
}

// Built-in official published Roblox Games (Offline fallback matching website API)
final List<RobloxGame> defaultPublishedGames = [
  RobloxGame(
    id: 'game-kingdom-legends',
    title: 'مملكة الأساطير: مغامرة العالم المفتوح',
    category: 'ألعاب روبلوكس',
    genre: 'RPG / عالم مفتوح',
    rating: 4.9,
    reviewsCount: 1240,
    downloads: 185000,
    version: '2.4.0',
    lastUpdated: '2026-11-05',
    robloxPlaceId: '15482910482',
    robloxGameUrl: 'https://www.roblox.com/games/15482910482/Kingdom-of-Legends',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
    description: 'لعبة مغامرات وتقمص أدوار RPG خرافية في عالم روبلوكس المفتوح مع معارك حية وأسلحة سحرية متطورة.',
    developerName: 'طارق الحربي',
    developerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    tags: ['Roblox', 'RPG', 'عالم مفتوح', 'مغامرات', 'PvP'],
    latestUpdateTitle: 'تحديث عالم التنانين والسيرفرات السريعة',
    latestUpdateChanges: [
      'إضافة خريطة بركان التنانين الجديدة',
      'تحسين استجابة الشبكة وتقليل اللاج إلى 20ms',
      'إضافة 12 درعاً وسيفاً أسطورياً جديداً',
    ],
  ),
  RobloxGame(
    id: 'game-arena-strike',
    title: 'حرب الساحات التكتيكية (Arena Strike FPS)',
    category: 'ألعاب روبلوكس',
    genre: 'FPS / إطلاق نار تكتيكي',
    rating: 4.8,
    reviewsCount: 890,
    downloads: 94000,
    version: '1.8.2',
    lastUpdated: '2026-11-01',
    robloxPlaceId: '18924018293',
    robloxGameUrl: 'https://www.roblox.com/games/18924018293/Arena-Strike-FPS',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    description: 'لعبة إطلاق نار تكتيكية متعددة اللاعبين بنظام فيزياء واقعي وأسلحة مخصصة بدقة عالية.',
    developerName: 'المشرف العام (أدمن)',
    developerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    tags: ['Roblox', 'FPS', 'شوتر', 'تكتيكي', 'أكشن'],
    latestUpdateTitle: 'تحديث بنادق القنص وسيرفرات الشرق الأوسط',
    latestUpdateChanges: [
      'تفعيل سيرفرات الشرق الأوسط (بينغ 15ms)',
      'إضافة خريطة المصنع المهجور',
      'نظام تصنيف جديد وجوائز أسبوعية',
    ],
  ),
  RobloxGame(
    id: 'game-speed-city',
    title: 'مدينة السرعة والمطاردات (Speed City Simulator)',
    category: 'ألعاب روبلوكس',
    genre: 'سباقات / قيادة واقعية',
    rating: 4.7,
    reviewsCount: 650,
    downloads: 142000,
    version: '3.1.0',
    lastUpdated: '2026-10-28',
    robloxPlaceId: '16739201948',
    robloxGameUrl: 'https://www.roblox.com/games/16739201948/Speed-City-Simulator',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    description: 'محاكي سباقات قيادة واقعية وتعديل سيارات خارقة في شوارع مدينة مفتوحة ضخمة.',
    developerName: 'طارق الحربي',
    developerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    tags: ['Roblox', 'سباق', 'سيارات', 'محاكي', 'عالم مفتوح'],
    latestUpdateTitle: 'تحديث السيارات الخارقة والسباقات الليلية',
    latestUpdateChanges: [
      'إضافة نظام الدريفت التفاعلي',
      'تحديث صوت المحركات بنقاء صوتي عالي',
    ],
  ),
  RobloxGame(
    id: 'game-escape-maze',
    title: 'كوابيس الظلام: الهروب من المتاهة (Escape The Maze)',
    category: 'ألعاب روبلوكس',
    genre: 'رعب / بقاء وألغاز',
    rating: 4.9,
    reviewsCount: 1120,
    downloads: 210000,
    version: '1.2.0',
    lastUpdated: '2026-11-04',
    robloxPlaceId: '19028374612',
    robloxGameUrl: 'https://www.roblox.com/games/19028374612/Escape-The-Maze',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
    description: 'لعبة رعب وبقاء نفسي مع ألغاز صوتية ومتاهات تتغير تلقائياً في كل جولة.',
    developerName: 'المشرف العام (أدمن)',
    developerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    tags: ['Roblox', 'رعب', 'بقاء', 'ألغاز', 'تعاوني'],
    latestUpdateTitle: 'تحديث الفصل الثاني والمتاهات العشوائية',
    latestUpdateChanges: [
      'إضافة وحش الشبح الجديد',
      'نظام صوتي محيطي 3D مرعب',
    ],
  ),
];

// Built-in official published Articles (Offline fallback matching website API)
final List<Article> defaultPublishedArticles = [
  Article(
    id: 'art-mastering-luau-2026',
    title: 'الدليل الشامل لاحتراف محرك Roblox Studio وبرمجة Luau 2026',
    slug: 'mastering-roblox-studio-luau-2026',
    category: 'برمجة Luau',
    readTimeMinutes: 5,
    views: 3420,
    likes: 412,
    commentsCount: 28,
    createdAt: '2026-11-04',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000',
    excerpt: 'تعلم أهم الممارسات والتقنيات الحديثة في لغة Luau لبناء ألعاب روبلوكس سريعة واحترافية قابلة للتوسع.',
    content: '''مرحباً بكم في الدليل البرمجي الشامل لمطوري روبلوكس!

تطورت لغة Luau بشكل مذهل خلال الفترة الأخيرة لتصبح أسرع وأقوى لغات البرمجة المخصصة للألعاب. في هذا المقال، سنستعرض الخطوات الأساسية لتحويل أفكارك إلى ألعاب حقيقية جاهزة للنشر:

1. البنية المعمارية النظيفة (ModuleScripts):
تجنب تكرار الكود عبر تقسيم منطق اللعبة إلى وحدات نمطية منفصلة للعميل (Client) والخادم (Server). استخدم دائماً RemoteEvents لنقل الأوامر بشكل آمن مع التحقق الصارم من مدخلات اللاعبين.

2. تحسين الأداء وإدارة الذاكرة (Memory Leaks):
احرص دائماً على إلغاء ربط الأحداث (Disconnect Events) عند تدمير الكائنات أو موت الشخصية لتفادي تراكم استهلاك الذاكرة في السيرفرات الطويلة.

3. استغلال نظام Parallel Luau:
يقدم Luau الحديث دعماً حقيقياً لتعدد الأنوية، مما يمكنك من معالجة الذكاء الاصطناعي والحسابات المعقدة في خيوط منفصلة دون إبطاء حركة اللعبة الرئيسية.

استمر في بناء تجاربك وتحديث ألعابك بانتظام وشاركها مع مجتمع المطورين!''',
    authorName: 'المشرف العام (أدمن)',
    authorRole: 'مشرف المنصة',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    tags: ['Roblox', 'Luau', 'Studio', 'برمجة', 'أداء'],
  ),
  Article(
    id: 'art-server-lag-optimization',
    title: 'أفضل الممارسات لتقليل اللاج وتحسين أداء سيرفرات روبلوكس',
    slug: 'roblox-server-lag-optimization',
    category: 'شروحات تقنية',
    readTimeMinutes: 4,
    views: 2890,
    likes: 358,
    commentsCount: 19,
    createdAt: '2026-11-02',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000',
    excerpt: 'دليل عملي للمطورين لمعالجة بطء السيرفرات، خفض استهلاك النطاق الترددي، وضمان معدل 60 إطاراً في الثانية.',
    content: '''يعتبر اللاج وبطء الاستجابة العدو الأول لنجاح أي لعبة روبلوكس. إليك أهم النصائح العملية لحل هذه المشكلة جذرياً:

1. ضغط حزم البيانات عبر الشبكة (Network Bandwidth):
لا ترسل جداول ضخمة عبر RemoteEvents كل فريم! أرسل التغييرات الضرورية فقط عند حدوثها، واستخدم أنواع بيانات صغيرة مثل الأرقام الصحيحة بدلاً من النصوص الطويلة.

2. تقليل الاعتماد على Physics Engine الثقيل:
استخدم CanCollide = false و CanTouch = false و CastShadow = false للأجزاء التجميلية والديكورات التي لا يتفاعل معها اللاعب مباشرة.

3. الاستفادة من Culling و StreamingEnabled:
تفعيل StreamingEnabled في Workspace يقلل وقت تحميل الخريطة للهواتف والأجهزة الضعيفة بنسبة تصل إلى 70%، مما يتيح للاعبين بدء اللعب فوراً.''',
    authorName: 'طارق الحربي',
    authorRole: 'مطور معتمد',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    tags: ['Server', 'Lag', 'Optimization', 'شبكات'],
  ),
  Article(
    id: 'art-custom-ui-ux-design',
    title: 'كيفية تصميم واجهات مستخدم (UI/UX) تفاعلية تجذب ملايين اللاعبين',
    slug: 'roblox-custom-ui-ux-design',
    category: 'تطوير روبلوكس',
    readTimeMinutes: 6,
    views: 1980,
    likes: 245,
    commentsCount: 14,
    createdAt: '2026-10-30',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000',
    excerpt: 'طرق تصميم واجهات روبلوكس عصرية متجاوبة مع كافة مقاسات الشاشات وخاصة الهواتف الذكية.',
    content: '''تصميم الواجهة ليس مجرد ألوان، بل هو الطريقة التي يتنقل بها اللاعب داخل عالمك:

- التجاوب الكامل (Scale vs Offset): استخدم دائماً مقياس Scale مع تقييد AspectRatioConstraint حتى تظهر الواجهة بنفس النسبة على كافة الشاشات وخاصة الهواتف.
- المؤثرات الحركية باستخدام TweenService: إعطاء انسيابية للأزرار عند الضغط أو فتح النوافذ يعطي انطباعاً بالجودة الاحترافية للعبة.
- تبسيط الأزرار للهواتف: أكثر من 70% من لاعبي روبلوكس يلعبون عبر الهواتف، لذا اجعل أزرار التحكم بحجم مريح لإصبع الإبهام.''',
    authorName: 'المشرف العام (أدمن)',
    authorRole: 'مشرف المنصة',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    tags: ['UI', 'UX', 'واجهات', 'تصميم', 'Mobile'],
  ),
];
