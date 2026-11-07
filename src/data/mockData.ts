import { Article, Product, User, Friend, FriendRequest } from '../types';

// Official Admin & Developer accounts
export const initialUsers: User[] = [
  {
    id: 'user-admin',
    name: 'المشرف العام (أدمن)',
    email: 'admin@robloxdev.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    bio: 'مدير المنصة ومشرف النظام السحابي وقاعدة ألعاب روبلوكس',
    robloxUsername: 'PlatformAdmin_RBX',
    robloxProfileUrl: 'https://www.roblox.com',
    specialty: 'إدارة أمن المنصات وتطوير الأنظمة السحابية',
    isVerified: true,
    createdAt: '2024-01-01'
  },
  {
    id: 'user-dev-tariq',
    name: 'طارق الحربي',
    email: 'tariq@robloxdev.com',
    password: 'dev123',
    role: 'developer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    bio: 'مطور ألعاب روبلوكس ومبرمج Luau متخصص في فيزياء الألعاب والـ FPS',
    robloxUsername: 'Tariq_DevX',
    robloxProfileUrl: 'https://www.roblox.com/users/1234567/profile',
    specialty: 'برمجة Luau وهندسة خرائط العالم المفتوح',
    isVerified: true,
    createdAt: '2024-02-15'
  }
];

export const initialFriends: Friend[] = [];
export const initialFriendRequests: FriendRequest[] = [];

// Official published Roblox Games on the platform
export const initialProducts: Product[] = [
  {
    id: 'game-kingdom-legends',
    title: 'مملكة الأساطير: مغامرة العالم المفتوح',
    description: 'لعبة مغامرات وتقمص أدوار RPG خرافية في عالم روبلوكس المفتوح مع معارك حية وأسلحة سحرية متطورة.',
    detailedDescription: 'انطلق في أضخم مغامرة في عالم روبلوكس! استكشف الغابات المفقودة والكهوف العميقة، وطور مهارات فارسك وقاتل التنانين في معارك لاعب ضد لاعب (PvP) أو تعاوني (Co-op).',
    price: 0,
    category: 'ألعاب روبلوكس',
    type: 'roblox_game',
    platform: 'Roblox',
    rating: 4.9,
    reviewsCount: 1240,
    downloads: 185000,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    ],
    tags: ['Roblox', 'RPG', 'عالم مفتوح', 'مغامرات', 'PvP'],
    developerId: 'user-dev-tariq',
    developerName: 'طارق الحربي',
    developerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    version: '2.4.0',
    lastUpdated: '2026-11-05',
    robloxPlaceId: '15482910482',
    robloxGameUrl: 'https://www.roblox.com/games/15482910482/Kingdom-of-Legends',
    featured: true,
    updates: [
      {
        id: 'upd-1',
        gameOrAppName: 'مملكة الأساطير',
        version: '2.4.0',
        title: 'تحديث عالم التنانين والسيرفرات السريعة',
        releaseDate: '2026-11-05',
        description: 'إضافة منطقة جبل النار، أسلحة نارية جديدة، وتحسين معدل الإطارات بنسبة 40%.',
        changes: [
          'إضافة خريطة بركان التنانين الجديدة',
          'تحسين استجابة الشبكة وتقليل اللاج إلى 20ms',
          'إضافة 12 درعاً وسيفاً أسطورياً جديداً',
          'إصلاح مشاكل الحركة على هواتف الأندرويد'
        ],
        placeId: '15482910482',
        badge: 'تحديث رئيسي'
      }
    ]
  },
  {
    id: 'game-arena-strike',
    title: 'حرب الساحات التكتيكية (Arena Strike FPS)',
    description: 'لعبة إطلاق نار تكتيكية متعددة اللاعبين بنظام فيزياء واقعي وأسلحة مخصصة بدقة عالية.',
    detailedDescription: 'تنافس في معارك 5 ضد 5 في ساحات قتال حديثة. استمتع بحركة سلسة وفيزياء أسلحة مبنية بمحرك Luau متطور مع نظام تصنيف ورتب للمحترفين.',
    price: 0,
    category: 'ألعاب روبلوكس',
    type: 'roblox_game',
    platform: 'Roblox',
    rating: 4.8,
    reviewsCount: 890,
    downloads: 94000,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    tags: ['Roblox', 'FPS', 'شوتر', 'تكتيكي', 'أكشن'],
    developerId: 'user-admin',
    developerName: 'المشرف العام (أدمن)',
    developerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    version: '1.8.2',
    lastUpdated: '2026-11-01',
    robloxPlaceId: '18924018293',
    robloxGameUrl: 'https://www.roblox.com/games/18924018293/Arena-Strike-FPS',
    featured: true,
    updates: [
      {
        id: 'upd-2',
        gameOrAppName: 'حرب الساحات',
        version: '1.8.2',
        title: 'تحديث بنادق القنص وسيرفرات الشرق الأوسط',
        releaseDate: '2026-11-01',
        description: 'إضافة سيرفرات مخصصة منخفضة البينغ وبنادق قنص محسنة.',
        changes: [
          'تفعيل سيرفرات الشرق الأوسط (بينغ 15ms)',
          'إضافة خريطة المصنع المهجور',
          'نظام تصنيف جديد وجوائز أسبوعية'
        ],
        placeId: '18924018293',
        badge: 'سيرفرات جديدة'
      }
    ]
  },
  {
    id: 'game-speed-city',
    title: 'مدينة السرعة والمطاردات (Speed City Simulator)',
    description: 'محاكي سباقات قيادة واقعية وتعديل سيارات خارقة في شوارع مدينة مفتوحة ضخمة.',
    detailedDescription: 'اجمع سياراتك المفضلة وعدلها بمحركات تيربو ونيترو، وشارك في سباقات شوارع ليلية وتحديات دريفت حماسية.',
    price: 0,
    category: 'ألعاب روبلوكس',
    type: 'roblox_game',
    platform: 'Roblox',
    rating: 4.7,
    reviewsCount: 650,
    downloads: 142000,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    tags: ['Roblox', 'سباق', 'سيارات', 'محاكي', 'عالم مفتوح'],
    developerId: 'user-dev-tariq',
    developerName: 'طارق الحربي',
    developerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    version: '3.1.0',
    lastUpdated: '2026-10-28',
    robloxPlaceId: '16739201948',
    robloxGameUrl: 'https://www.roblox.com/games/16739201948/Speed-City-Simulator',
    featured: false,
    updates: [
      {
        id: 'upd-3',
        gameOrAppName: 'مدينة السرعة',
        version: '3.1.0',
        title: 'تحديث السيارات الخارقة والسباقات الليلية',
        releaseDate: '2026-10-28',
        description: 'إضافة 6 سيارات سوبر كار وتأثيرات إضاءة ليلية واقعية.',
        changes: [
          'إضافة نظام الدريفت التفاعلي',
          'تحديث صوت المحركات بنقاء صوتي عالي',
          'دعم كامل للتحكم بشاشات اللمس للهواتف'
        ],
        placeId: '16739201948',
        badge: 'سيارات جديدة'
      }
    ]
  },
  {
    id: 'game-escape-maze',
    title: 'كوابيس الظلام: الهروب من المتاهة (Escape The Maze)',
    description: 'لعبة رعب وبقاء نفسي مع ألغاز صوتية ومتاهات تتغير تلقائياً في كل جولة.',
    detailedDescription: 'اهرب مع أصدقائك من المتاهة المظلمة قبل نفاد ضوء كشافك. احذر من الوحوش المتربصة واجمع المفاتيح لفتح البوابات السرية.',
    price: 0,
    category: 'ألعاب روبلوكس',
    type: 'roblox_game',
    platform: 'Roblox',
    rating: 4.9,
    reviewsCount: 1120,
    downloads: 210000,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    tags: ['Roblox', 'رعب', 'بقاء', 'ألغاز', 'تعاوني'],
    developerId: 'user-admin',
    developerName: 'المشرف العام (أدمن)',
    developerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    version: '1.2.0',
    lastUpdated: '2026-11-04',
    robloxPlaceId: '19028374612',
    robloxGameUrl: 'https://www.roblox.com/games/19028374612/Escape-The-Maze',
    featured: true,
    updates: [
      {
        id: 'upd-4',
        gameOrAppName: 'كوابيس الظلام',
        version: '1.2.0',
        title: 'تحديث الفصل الثاني والمتاهات العشوائية',
        releaseDate: '2026-11-04',
        description: 'إضافة المتاهة المتغيرة وألغاز صوتية ثلاثية الأبعاد.',
        changes: [
          'إضافة وحش الشبح الجديد',
          'نظام صوتي محيطي 3D مرعب',
          'تعديل صعوبة الألغاز لفرق اللاعبين'
        ],
        placeId: '19028374612',
        badge: 'رعب جديد'
      }
    ]
  }
];

// Official published Articles & Guides on the platform
export const initialArticles: Article[] = [
  {
    id: 'art-mastering-luau-2026',
    title: 'الدليل الشامل لاحتراف محرك Roblox Studio وبرمجة Luau 2026',
    slug: 'mastering-roblox-studio-luau-2026',
    excerpt: 'تعلم أهم الممارسات والتقنيات الحديثة في لغة Luau لبناء ألعاب روبلوكس سريعة واحترافية قابلة للتوسع.',
    content: `مرحباً بكم في الدليل البرمجي الشامل لمطوري روبلوكس!

تطورت لغة Luau بشكل مذهل خلال الفترة الأخيرة لتصبح أسرع وأقوى لغات البرمجة المخصصة للألعاب. في هذا المقال، سنستعرض الخطوات الأساسية لتحويل أفكارك إلى ألعاب حقيقية جاهزة للنشر:

1. البنية المعمارية النظيفة (ModuleScripts):
تجنب تكرار الكود عبر تقسيم منطق اللعبة إلى وحدات نمطية منفصلة للعميل (Client) والخادم (Server). استخدم دائماً RemoteEvents لنقل الأوامر بشكل آمن مع التحقق الصارم من مدخلات اللاعبين.

2. تحسين الأداء وإدارة الذاكرة (Memory Leaks):
احرص دائماً على إلغاء ربط الأحداث (Disconnect Events) عند تدمير الكائنات أو موت الشخصية لتفادي تراكم استهلاك الذاكرة في السيرفرات الطويلة.

3. استغلال نظام Parallel Luau:
يقدم Luau الحديث دعماً حقيقياً لتعدد الأنوية، مما يمكنك من معالجة الذكاء الاصطناعي والحسابات المعقدة في خيوط منفصلة دون إبطاء حركة اللعبة الرئيسية.

استمر في بناء تجاربك وتحديث ألعابك بانتظام وشاركها مع مجتمع المطورين!`,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80',
    category: 'برمجة Luau',
    tags: ['Roblox', 'Luau', 'Studio', 'برمجة', 'أداء'],
    author: {
      id: 'user-admin',
      name: 'المشرف العام (أدمن)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'مشرف المنصة'
    },
    createdAt: '2026-11-04',
    readTimeMinutes: 5,
    views: 3420,
    likes: 412,
    commentsCount: 28,
    comments: [
      {
        id: 'comm-1',
        authorName: 'أحمد التميمي',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        content: 'شرح ممتاز جداً ومفيد! خصوصاً جزئية RemoteEvents وتأمين السيرفر.',
        createdAt: 'منذ يومين'
      }
    ]
  },
  {
    id: 'art-server-lag-optimization',
    title: 'أفضل الممارسات لتقليل اللاج وتحسين أداء سيرفرات روبلوكس',
    slug: 'roblox-server-lag-optimization',
    excerpt: 'دليل عملي للمطورين لمعالجة بطء السيرفرات، خفض استهلاك النطاق الترددي، وضمان معدل 60 إطاراً في الثانية.',
    content: `يعتبر اللاج وبطء الاستجابة العدو الأول لنجاح أي لعبة روبلوكس. إليك أهم النصائح العملية لحل هذه المشكلة جذرياً:

1. ضغط حزم البيانات عبر الشبكة (Network Bandwidth):
لا ترسل جداول ضخمة عبر RemoteEvents كل فريم! أرسل التغييرات الضرورية فقط عند حدوثها، واستخدم أنواع بيانات صغيرة مثل الأرقام الصحيحة أو الـ Enums بدلاً من النصوص الطويلة.

2. تقليل الاعتماد على Physics Engine الثقيل:
استخدم CanCollide = false و CanTouch = false و CastShadow = false للأجزاء التجميلية والديكورات التي لا يتفاعل معها اللاعب مباشرة.

3. الاستفادة من Culling و StreamingEnabled:
تفعيل StreamingEnabled في Workspace يقلل وقت تحميل الخريطة للهواتف والأجهزة الضعيفة بنسبة تصل إلى 70%، مما يتيح للاعبين بدء اللعب فوراً.`,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80',
    category: 'شروحات تقنية',
    tags: ['Server', 'Lag', 'Optimization', 'شبكات'],
    author: {
      id: 'user-dev-tariq',
      name: 'طارق الحربي',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'مطور معتمد'
    },
    createdAt: '2026-11-02',
    readTimeMinutes: 4,
    views: 2890,
    likes: 358,
    commentsCount: 19,
    comments: []
  },
  {
    id: 'art-custom-ui-ux-design',
    title: 'كيفية تصميم واجهات مستخدم (UI/UX) تفاعلية تجذب ملايين اللاعبين',
    slug: 'roblox-custom-ui-ux-design',
    excerpt: 'طرق تصميم واجهات روبلوكس عصرية متجاوبة مع كافة مقاسات الشاشات وخاصة الهواتف الذكية.',
    content: `تصميم الواجهة ليس مجرد ألوان، بل هو الطريقة التي يتنقل بها اللاعب داخل عالمك:

- التجاوب الكامل (Scale vs Offset): استخدم دائماً مقياس Scale مع تقييد AspectRatioConstraint حتى تظهر الواجهة بنفس النسبة على شاشة الهاتف، التابلت، وشاشة الكمبيوتر الضخمة.
- المؤثرات الحركية باستخدام TweenService: إعطاء انسيابية للأزرار عند الضغط أو فتح النوافذ يعطي انطباعاً بالجودة الاحترافية للعبة.
- تبسيط الأزرار للهواتف: أكثر من 70% من لاعبي روبلوكس يلعبون عبر الهواتف، لذا اجعل أزرار التحكم بحجم مريح لإصبع الإبهام.`,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80',
    category: 'تطوير روبلوكس',
    tags: ['UI', 'UX', 'واجهات', 'تصميم', 'Mobile'],
    author: {
      id: 'user-admin',
      name: 'المشرف العام (أدمن)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'مشرف المنصة'
    },
    createdAt: '2026-10-30',
    readTimeMinutes: 6,
    views: 1980,
    likes: 245,
    commentsCount: 14,
    comments: []
  }
];
