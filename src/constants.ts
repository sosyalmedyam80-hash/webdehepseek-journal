export interface Category {
  id: string;
  name: string;
  subcategories: string[];
  iconName?: string;
  badge?: string;
}

export interface ContentSection {
  id: string;
  heading: string;
  body: string;
}

export interface ArticleComment {
  id: string;
  newsId: string;
  author: string;
  date: string;
  text: string;
  likes: number;
  isVerified?: boolean;
}

export interface LiveBlogEntry {
  id: string;
  time: string;
  title: string;
  content: string;
  badge?: string;
}

export interface AuthorProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarLetter: string;
  articlesCount: number;
  verified: boolean;
}

export interface AffiliateCta {
  title: string;
  text: string;
  badge: string;
  buttonText: string;
  link?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  subcategory: string;
  date: string;
  imageUrl: string;
  readTime: string;
  author: string;
  authorTitle?: string;
  authorBio?: string;
  verifiedSource?: boolean;
  isEditorsChoice?: boolean;
  isPremiumLocked?: boolean;
  isSponsored?: boolean;
  sponsoredBrand?: string;
  videoUrl?: string;
  youtubeVideoId?: string;
  sentiment?: string;
  executiveSummary?: string;
  correctionLog?: string;
  canonicalUrl?: string;
  sharesCount?: number;
  tier?: 'TIER_1' | 'TIER_2' | 'TIER_3' | string;
  revenueWeight?: number;
  affiliateCta?: AffiliateCta;
  reactions?: {
    like: number;
    analytic: number;
    mindblown: number;
  };
  sections?: ContentSection[];
  pSeoType?: 'comparison' | 'price' | 'howto' | 'review';
  pSeoData?: any;
}

export const FEAR_GREED_INDEX = {
  value: 78,
  label: "Aşırı Boğa (Extreme Greed)",
  status: "bullish"
};

export interface CurrencyRate {
  symbol: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  options: PollOption[];
}

export interface SystemNode {
  id: number;
  name: string;
  code: string;
  squad: "content" | "scraping" | "monetization" | "qa" | "security";
  squadName: string;
  role: string;
  status: "active" | "standby" | "processing";
  performance: number;
  lastAction: string;
  description: string;
}

export const TAG_CLOUD = [
  "YapayZeka", "Finans", "SaaS", "SiberGüvenlik", "Kripto"
];

export const AUTHORS_LIST: AuthorProfile[] = [
  {
    id: "auth-owner",
    name: "Ahmet Karadağ",
    title: "Kurucu & Genel Yayın Yönetmeni",
    bio: "WebdeHepSeeK Journal Kurucusu. Küresel teknoloji trendleri, yapay zeka entegrasyonu ve makroekonomi alanlarında başyazar.",
    avatarLetter: "A",
    articlesCount: 42,
    verified: true
  },
  {
    id: "auth-1",
    name: "Selin Yılmaz",
    title: "AI & Gelecek Teknolojileri Başeditörü",
    bio: "Yapay zeka modelleri, otonom ajans mimarileri ve makine öğrenimi etiği alanında küresel yayıncı ve teknoloji araştırmacısı.",
    avatarLetter: "S",
    articlesCount: 42,
    verified: true
  },
  {
    id: "auth-2",
    name: "Metin Şahin",
    title: "Finans & Piyasa Başanalisti",
    bio: "Makro borsa hareketleri, kripto varlık zincir-üstü (On-Chain) verileri ve türev piyasalar uzmanı.",
    avatarLetter: "M",
    articlesCount: 38,
    verified: true
  }
];

export const LIVE_BLOG_ENTRIES: LiveBlogEntry[] = [
  {
    id: "live-1",
    time: "19:15",
    title: "BIST 100 Gün İçi Rekoru Kırdı",
    content: "Teknoloji hisselerinde yabancı kurumsal fon alımlarının hızlanmasıyla BIST 100 endeksi 10,845 puan seviyesini test etti.",
    badge: "CANLI"
  },
  {
    id: "live-2",
    time: "18:40",
    title: "Fed Açıklamaları ve Kripto Piyasaları",
    content: "Federal Rezerv yetkililerinin faiz patikasına ilişkin esnek mesajları sonrası Bitcoin $152,400 seviyesinin üzerine fırladı.",
    badge: "PİYASA"
  },
  {
    id: "live-3",
    time: "17:20",
    title: "AGI Zirvesinde Önemli Bildiri",
    content: "Küresel AI devleri otonom model hizalanması ve güvenlik protokollerinde yeni uluslararası tüzük üzerinde uzlaştı.",
    badge: "TEKNOLOJİ"
  }
];

export const MOCK_INITIAL_COMMENTS: ArticleComment[] = [
  {
    id: "c-1",
    newsId: "NEWS-101",
    author: "Dr. Volkan Arslan",
    date: "Bugün 18:30",
    text: "Derin öğrenme modellerinde mantık yürütme zincirlerinin bu seviyeye gelmesi yazılım mimarilerini tamamen değiştirecek.",
    likes: 18,
    isVerified: true
  },
  {
    id: "c-2",
    newsId: "NEWS-101",
    author: "Cemre Aksoy",
    date: "Bugün 17:15",
    text: "E-E-A-T editöryal standartları ile hazırlanmış harika bir analiz. Teşekkürler WebdeHepSeeK ekibi.",
    likes: 12,
    isVerified: false
  }
];

export const CURRENCY_RATES: CurrencyRate[] = [
  { symbol: "USD/TRY", label: "USD/TRY", value: "34.35 ₺", change: "+0.12%", isPositive: true },
  { symbol: "EUR/TRY", label: "EUR/TRY", value: "37.60 ₺", change: "-0.05%", isPositive: false },
  { symbol: "BIST100", label: "BIST 100", value: "9,150.50", change: "+0.45%", isPositive: true },
  { symbol: "ALTIN", label: "Gram Altın", value: "2,920 ₺", change: "+0.38%", isPositive: true }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "AGI", definition: "Yapay Genel Zeka - İnsan düzeyinde zihinsel muhakeme yeteneğine sahip otonom AI sistemleri." },
  { term: "LLM", definition: "Büyük Dil Modeli - Milyarlarca parametreyle eğitilmiş gelişmiş metin ve mantık işleme yapay zekası." },
  { term: "DeFi", definition: "Centralized olmayan, akıllı sözleşmelerle yürütülen ademi merkeziyetçi finans ekosistemi." },
  { term: "LiDAR", definition: "Işık tespiti ve uzaklık tayini sağlayan otonom araç sensör teknolojisi." },
  { term: "Qubit", definition: "Kuantum bilgisayarlarında aynı onda hem 0 hem 1 durumunda bulunabilen temel bilgi birimi." },
  { term: "On-Chain", definition: "Doğrudan blokzincir ağında gerçekleşen şeffaf ve değiştirilemez veri hareketleri." }
];

export const DAILY_POLL: PollData = {
  id: "POLL-2026-10",
  question: "2027 Yılına Kadar Hangi Teknoloji Küresel Ekonomide En Büyük Kırılmayı Yaratacak?",
  options: [
    { id: "opt-1", label: "Yapay Genel Zeka (AGI) ve Otonom Sistemler", votes: 4210 },
    { id: "opt-2", label: "Kuantum Bilgisayarlar ve Yeni Şifreleme", votes: 1890 },
    { id: "opt-3", label: "Otonom Elektrikli Araçlar & Akıllı Mobilite", votes: 1540 },
    { id: "opt-4", label: "Kripto & Web3 Finansal Altyapıları", votes: 2980 }
  ]
};

export const SITE_STRUCTURE: Category[] = [
  {
    id: "tech",
    name: "Teknoloji & Dijital Dönüşüm",
    badge: "Popüler",
    subcategories: [
      "Mobil Dünya & 6G",
      "Donanım & Çip Savaşları",
      "Yazılım & Açık Kaynak",
      "Siber Güvenlik & Kuantum",
      "IoT & Akıllı Şehirler",
      "Giyilebilir Teknolojiler",
      "Robotik & Otomasyon",
      "Bulut Bilişim & Edge",
      "Big Tech & Regülasyon",
      "Kuantum Bilgisayarlar"
    ]
  },
  {
    id: "ai",
    name: "Yapay Zeka & Gelecek",
    badge: "Sıcak Gündem",
    subcategories: [
      "AGI (Yapay Genel Zeka)",
      "Büyük Dil Modelleri (LLM)",
      "Otonom AI Ajanları",
      "Görsel & Video Üretimi",
      "AI Etiği & Hukuk",
      "Nöromorfik Çipler",
      "Yapay Zeka & Tıp",
      "AI & Finansal Analiz",
      "Robotik Kodlama",
      "Prompt Mühendisliği"
    ]
  },
  {
    id: "crypto",
    name: "Kripto & Web3",
    badge: "Canlı Piyasa",
    subcategories: [
      "Bitcoin (BTC) Analiz",
      "Ethereum & Smart Contracts",
      "DeFi & Likidite Havuzları",
      "NFT & Dijital Sanat",
      "Metaverse Ekosistemi",
      "Layer 2 Ölçekleme",
      "Solana & Altcoinler",
      "Fan Tokenlar",
      "Web3 Gaming",
      "Staking & Yield Farming"
    ]
  },
  {
    id: "finance",
    name: "Finans & Küresel Piyasalar",
    badge: "Makro Intel",
    subcategories: [
      "Borsa İstanbul (BIST 100)",
      "Wall Street & S&P 500",
      "Fed & Merkez Bankaları",
      "Altın & Değerli Madenler",
      "Döviz & Parite (USD/TRY)",
      "Kişisel Finans & Birikim",
      "Bankacılık & Kredi",
      "Girişim Sermayesi (VC)",
      "Makro Ekonomi & Enflasyon",
      "Fintech Dönüşümü"
    ]
  },
  {
    id: "politics",
    name: "Siyaset & Strateji",
    subcategories: [
      "Ankara Gündemi & Meclis",
      "Seçim Analizleri & Anketler",
      "Dış Politika & Diplomasi",
      "Dijital Diplomasi",
      "Yerel Yönetimler",
      "Siyasi Parti Stratejileri",
      "Savunma Sanayii (SİHA/Milli)",
      "Ekonomi Politiği",
      "İnsan Hakları & Hukuk",
      "Kamuoyu Araştırmaları"
    ]
  },
  {
    id: "social",
    name: "Sosyal Medya & Viral",
    subcategories: [
      "Influencer Dünyası",
      "TikTok & Viral Trendler",
      "Instagram Algoritmaları",
      "Yayıncı Ekosistemi (Twitch/Kick)",
      "Podcast Kültürü",
      "Creator Economy",
      "Yapay Zeka Fenomenleri",
      "Dijital Skandallar & Etik",
      "Platform Savaşları",
      "Lansmanlar & Etkinlikler"
    ]
  },
  {
    id: "sports",
    name: "Spor & E-Spor",
    subcategories: [
      "2026 Dünya Kupası Özel",
      "Futbol Transfer Hattı",
      "E-Spor Turnuvaları",
      "Formula 1 & Motor Sporları",
      "Basketbol (NBA/EuroLeague)",
      "Web3 Gaming Ligleri",
      "Tenis & Grand Slam",
      "Spor Teknolojileri",
      "Fan Token Analizleri",
      "Fitness & Akıllı Yaşam"
    ]
  },
  {
    id: "business",
    name: "Girişimcilik & Startup",
    subcategories: [
      "Startup Hikayeleri & Unicorns",
      "E-Ticaret & Dropshipping",
      "AI İş Modelleri",
      "Yatırım Turları & Seed",
      "Freelance & Remote Çalışma",
      "Pazarlama & Branding",
      "SaaS Girişimciliği",
      "Dijital Göçebelik (Nomad)",
      "Liderlik & Yönetim",
      "Geleceğin Meslekleri"
    ]
  },
  {
    id: "lifestyle",
    name: "Yaşam & Sağlık",
    subcategories: [
      "Giyilebilir Sağlık Teknolojisi",
      "Longevity (Uzun Yaşam)",
      "Biohacking & Biyoloji",
      "Zihinsel Sağlık & Odak",
      "Beslenme & Fonksiyonel Tıp",
      "Biyoteknoloji Gelişmeleri",
      "Akıllı Ev & Yaşam",
      "Sürdürülebilirlik & Yeşil",
      "Dijital Detoks & Minimalizm",
      "VR Fitness & Spor"
    ]
  },
  {
    id: "gaming",
    name: "Oyun & Eğlence",
    subcategories: [
      "PS5 & Xbox Gündemi",
      "Mobil Oyun Sektörü",
      "Cloud Gaming (GeForce NOW)",
      "VR / AR Oyun Deneyimi",
      "Oyun Geliştirme (Unreal/Unity)",
      "Sinema & Marvel/DC",
      "Streaming (Netflix/Disney+)",
      "Indie Oyun İncelemeleri",
      "Retro Gaming Nostalji",
      "Metaverse Oyun Dünyası"
    ]
  },
  {
    id: "science",
    name: "Bilim & Uzay",
    subcategories: [
      "Mars Kolonisi & Starship",
      "SpaceX & NASA Görevleri",
      "Kuantum Fiziği & Bilgisayar",
      "İnsansı Robotlar (Humanoid)",
      "Nükleer Füzyon Enerjisi",
      "Derin Uzay Teleskopları",
      "Modern Arkeoloji",
      "Genetik & CRISPR",
      "İklim Teknolojileri",
      "Nörobilim & Neuralink"
    ]
  },
  {
    id: "education",
    name: "Eğitim & Kariyer",
    subcategories: [
      "AI Eğitim Programları",
      "Uzaktan Çalışma İmkanları",
      "No-Code / Low-Code",
      "Uluslararası Sertifikalar",
      "Kariyer Dönüşüm Rehberi",
      "Dil Öğrenme Uygulamaları",
      "Mülakat & CV Stratejileri",
      "LinkedIn Algoritma Taktikleri",
      "Burs & Fon İmkanları",
      "Hibrit Ofis Trendleri"
    ]
  },
  {
    id: "realestate",
    name: "Emlak & Lüks Yatırım",
    badge: "Yeni",
    subcategories: [
      "Lüks Gayrimenkul Trendleri",
      "Dijital Emlak & Metaverse",
      "REIT & Gayrimenkul Fonları",
      "Şehir Planlama & Akıllı Kent",
      "Akıllı Binalar & Enerji",
      "Turizm & Otel Yatırımları",
      "Ticari Emlak Piyasası",
      "Arsa & Arazi Değerleme",
      "Vadeli Konut Satışları",
      "PropTech Teknolojileri"
    ]
  },
  {
    id: "automotive",
    name: "Otomotiv & Mobilite",
    badge: "Yeni",
    subcategories: [
      "Elektrikli Araçlar (EV)",
      "Otonom Sürüş (L4/L5)",
      "Togg & Yerli Otomobil",
      "Formula 1 Mühendisliği",
      "Batarya Teknolojileri",
      "Hidrojen Yakıt Hücreleri",
      "Uçan Arabalar & eVTOL",
      "Toplu Taşıma Otomasyonu",
      "Mikro-Mobilite (Scooter)",
      "Araç İçi Bilgi-Eğlence"
    ]
  },
  {
    id: "saas",
    name: "SaaS & Bulut Yazılımları",
    badge: "Yüksek Kazanç",
    subcategories: [
      "CRM Sistemleri",
      "Bulut Sunucu & Hosting",
      "E-Ticaret Altyapıları",
      "API Entegrasyonları",
      "Bulut Veri Depolama",
      "Hizmet Olarak Yazılım (SaaS)",
      "Veri Analitiği",
      "Micro-SaaS Çözümleri",
      "İş Akışı Otomasyonu",
      "Bulut Güvenliği"
    ]
  },
  {
    id: "personalfinance",
    name: "Kişisel Finans & Sigorta",
    badge: "Yüksek Kazanç",
    subcategories: [
      "Bireysel Krediler",
      "Mevduat Faiz Oranları",
      "Kasko & Trafik Sigortası",
      "BES Fonları & Emeklilik",
      "Bireysel Yatırım Stratejileri",
      "Vergi Planlaması",
      "Borç Yapılandırma",
      "Kredi Skoru Yönetimi",
      "Altın & Gümüş Birikimi",
      "Hayat Sigortası"
    ]
  },
  {
    id: "cybersecurity",
    name: "Siber Güvenlik & Veri Koruma",
    badge: "Premium",
    subcategories: [
      "Antivirüs Yazılımları",
      "VPN & Güvenli Bağlantı",
      "Kurumsal Veri Güvenliği",
      "Tehdit İzleme & Analiz",
      "Kimlik Avı (Phishing) Koruması",
      "Sıfır Güven (Zero Trust)",
      "Penetrasyon Testleri",
      "KVKK & GDPR Uyumluluğu",
      "Fidye Yazılımı (Ransomware) Koruması",
      "Mobil Cihaz Güvenliği"
    ]
  },
  {
    id: "aitools",
    name: "Yapay Zeka Araç Rehberi",
    badge: "Sıcak",
    subcategories: [
      "AI Metin Yazma Araçları",
      "AI Görsel Oluşturucular",
      "AI Video Üretim Teknolojileri",
      "AI Kodlama Asistanları",
      "AI Ses & Müzik Üretimi",
      "AI Sunum & Tasarım Araçları",
      "AI Veri Analiz Robotları",
      "AI Çeviri & Dil Araçları",
      "AI Verimlilik Uygulamaları",
      "AI Arama & Keşif Motorları"
    ]
  }
];

export const SYSTEM_NODES: SystemNode[] = [
  {
    id: 1,
    name: "Global Network Node",
    code: "NODE-01",
    squad: "content",
    squadName: "Yayın & İçerik Altyapısı",
    role: "Global Yayın Dağıtım Sunucusu",
    status: "active",
    performance: 100,
    lastAction: "Tüm yayın sunucuları ve CDN düğümleri 0.4ms gecikmeyle senkronize çalışıyor.",
    description: "Global yayın ağının veri akışını ve canlı sunucu performansını yönetir."
  },
  {
    id: 2,
    name: "Editorial Content Engine",
    code: "NODE-02",
    squad: "content",
    squadName: "Yayın & İçerik Altyapısı",
    role: "Dil & Editöryal İşleme Servisi",
    status: "active",
    performance: 99,
    lastAction: "E-E-A-T yayın kriterlerine göre makaleler kalite kontrolünden geçerek onaylandı.",
    description: "Yüksek gazetecilik standartlarında metin optimizasyonu sağlar."
  },
  {
    id: 3,
    name: "Data Mining Node",
    code: "NODE-03",
    squad: "scraping",
    squadName: "Veri & Piyasa İstihbaratı",
    role: "Finans & Borsa Veri Bağlantısı",
    status: "active",
    performance: 98,
    lastAction: "Wall Street, BIST 100 ve Kripto verileri anlık olarak güncellendi.",
    description: "Borsa, emtia ve döviz piyasası canlı veri akışını izler."
  },
  {
    id: 4,
    name: "Security & Compliance Node",
    code: "NODE-04",
    squad: "security",
    squadName: "Güvenlik & Uyum",
    role: "KVKK / GDPR Güvenlik Tescili",
    status: "active",
    performance: 100,
    lastAction: "SSL/TLS şifreleme ve çerez rıza politikası tam uyumluluk sağladı.",
    description: "Sistem veri güvenliğini ve yasal uyumluluk protokollerini denetler."
  }
];

// Rich 42-Article Database (14 Categories x 3 Articles each)
export const MOCK_NEWS: NewsItem[] = [
  {
    "id": "PSEO-01",
    "title": "Apple Vision Pro vs Meta Quest 4: Karşılaştırmalı 2026 İncelemesi",
    "excerpt": "2026 yılının en iddialı iki karma gerçeklik gözlüğü karşı karşıya: Ekosistem gücü mü, yoksa agresif fiyat/performans avantajı mı? Hangisini tercih etmelisiniz?",
    "category": "Teknoloji & Dijital Dönüşüm",
    "subcategory": "Giyilebilir Teknoloji",
    "date": "8 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=80",
    "readTime": "4 dk",
    "author": "Teknoloji Servisi",
    "authorTitle": "Teknoloji & AI Yayın Masası",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "pSeoType": "comparison",
    "pSeoData": {
      "x": "Apple Vision Pro",
      "y": "Meta Quest 4",
      "quickDecision": {
        "title": "Kısaca Hangisi?",
        "winner": "Meta Quest 4 (Genel Kullanım ve Fiyat/Performansta Lider)",
        "points": [
          "Eğer bütçe kısıtınız yoksa ve en yüksek çözünürlüğü istiyorsanız Apple Vision Pro.",
          "Geniş oyun kütüphanesi, hafif gövde tasarımı ve uygun fiyat için Meta Quest 4.",
          "İş ve üretkenlik uygulamalarında Apple Vision Pro ekosistemi hala rakipsiz."
        ]
      },
      "table": {
        "headers": ["Parametre / Özellik", "Apple Vision Pro", "Meta Quest 4"],
        "rows": [
          ["Başlangıç Fiyatı", "149.999 TL", "29.999 TL"],
          ["Ekran Çözünürlüğü", "Göz başına 4K Micro-OLED", "Göz başına 2.5K LCD / QD-OLED"],
          ["Ağırlık", "650 gram (Harici Pil)", "410 gram (Dahili Pil)"],
          ["Yapay Zeka (NPU)", "R1 / M2 Çift İşlemci", "Snapdragon XR2+ Gen 3"],
          ["Karma Gerçeklik Geçişi (Passthrough)", "Ultra Düşük Gecikme (12ms)", "Çok Net (15ms)"],
          ["E-E-A-T Puanı", "9.4 / 10", "9.7 / 10"]
        ]
      },
      "xPreference": "Yüksek çözünürlüklü uzamsal bilgi işlem, 4K film deneyimi ve Apple ekosistem uyumluluğu arayan profesyoneller tercih etmeli.",
      "yPreference": "Sosyal sanal gerçeklik, VR oyunları, hafiflik ve yüksek fiyat/performans avantajı arayan genel tüketiciler tercih etmeli."
    },
    "sections": [
      {
        "id": "comp-sec-1",
        "heading": "Ekran Teknolojileri ve Optik Performans",
        "body": "Apple Vision Pro, göz başına düşen 4K Micro-OLED panelleri ile görsel berraklıkta hala endüstri standardını belirliyor. Ancak Meta Quest 4, QD-OLED ekran seçeneği ve gelişmiş krep mercekleri ile yansımaları ve hareleri neredeyse sıfıra indirerek rakibine oldukça yaklaşıyor."
      },
      {
        "id": "comp-sec-2",
        "heading": "Konfor, Ağırlık Dağılımı ve Uzun Süreli Kullanım Analizi",
        "body": "En büyük fark fiziki ergonomide ortaya çıkıyor. Meta Quest 4, dahili pil barındırmasına rağmen sadece 410 gram ağırlığında ve dengeli bir kafa kayışı sunuyor. Apple Vision Pro ise harici kablolu pil kutusuna rağmen 650 gramlık yüz ağırlığıyla uzun süreli çalışmalarda boyun kaslarını yorabiliyor."
      }
    ]
  },
  {
    "id": "PSEO-02",
    "title": "ChatGPT Plus 2026 Türkiye Fiyatı Ne Kadar Oldu? (Kaç TL?)",
    "excerpt": "Yapay zeka asistanı ChatGPT Plus üyeliğinin Türkiye fiyat tarifesi, KDV, dijital hizmet vergileri ve ek kur maliyetleriyle kalem kalem açıklandı.",
    "category": "Yapay Zeka & Gelecek",
    "subcategory": "Generative AI",
    "date": "8 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1600&q=80",
    "readTime": "3 dk",
    "author": "Teknoloji Servisi",
    "authorTitle": "Teknoloji & AI Yayın Masası",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "pSeoType": "price",
    "pSeoData": {
      "spotPrice": "690 TL / Ay",
      "yoyChange": "%15 Artış (Global $20 Sabit Kalırken, Yerel Vergi Güncellemeleriyle Sınırlandı)",
      "table": {
        "headers": ["Maliyet Kalemi / Hizmet", "Oran / Tür", "Tutar (Aylık)"],
        "rows": [
          ["Yalın Abonelik Bedeli", "$20 USD (Kur Korumalı)", "600 TL"],
          ["Dijital Hizmet Vergisi (DHV)", "%7.5 Oran", "45 TL"],
          ["Katma Değer Vergisi (KDV)", "%20 (Bireysel Hizmet)", "45 TL"],
          ["Toplam Aylık Maliyet", "Bireysel Premium Tarife", "690 TL"]
        ]
      },
      "savings": [
        "Yıllık taahhütlü abonelik seçeneğini tercih ederek aylık maliyeti %15 düşürün.",
        "Ekip kullanımları için 'ChatGPT Team' paketine geçerek fatura giderini azaltın.",
        "Kullanmadığınız aylarda aboneliğinizi dondurarak bütçenizi koruyun."
      ]
    },
    "sections": [
      {
        "id": "price-sec-1",
        "heading": "Türkiye Fiyatlandırma Politikası ve Döviz Sinerjisi",
        "body": "OpenAI, 2026 yılında Türkiye pazarı için yerel fiyatlandırma kur koruma desteğini sürdürüyor. Global bazda $20 olan Plus aboneliği, fiks kur politikası sayesinde vergiler dahil 690 TL seviyesinde dengelenerek Türk geliştiriciler için önemli bir maliyet avantajı sağlıyor."
      }
    ]
  },
  {
    "id": "PSEO-03",
    "title": "Adım Adım Node.js v26 Kurulumu ve Çevre Değişkenleri Rehberi",
    "excerpt": "Geliştiriciler için yeni nesil Node.js v26 sürümünün işletim sistemlerine göre adım adım hatasız kurulum yönergeleri ve terminal konfigürasyonları.",
    "category": "SaaS & Bulut Yazılımları",
    "subcategory": "Geliştirici Araçları",
    "date": "8 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=1600&q=80",
    "readTime": "5 dk",
    "author": "Teknoloji Servisi",
    "authorTitle": "Teknoloji & AI Yayın Masası",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "pSeoType": "howto",
    "pSeoData": {
      "duration": "15 dk",
      "steps": [
        {
          "heading": "1. Adım: Node Version Manager (NVM) Güncellemesi",
          "body": "Terminalinizden 'nvm install v26' komutunu koşturarak en son kararlı sürümü indirin ve sisteminize dahil edin."
        },
        {
          "heading": "2. Adım: Çevre Değişkenlerinin Yapılandırılması",
          "body": "Sisteminizin PATH değişkenine yeni Node ikili dosyalarının (bin) yolunu ekleyin ve aktif kılmak için terminal oturumunuzu yeniden başlatın."
        },
        {
          "heading": "3. Adım: Versiyon Kontrolü ve Doğrulama",
          "body": "Terminalden 'node -v' komutunu koşturarak 'v26.0.0' çıktısını aldığınızdan emin olun. Bu sayede aktif Node sürümü onaylanmış olacaktır."
        }
      ],
      "commonError": "Port Conflict Error (EADDRINUSE): Geliştirici portunuz arka plandaki eski Node servisleri tarafından işgal edildiğinde oluşur. Çözüm için terminalden 'killall node' komutunu çalıştırarak portu boşaltın."
    },
    "sections": [
      {
        "id": "howto-sec-1",
        "heading": "Neden v26 Sürümüne Yükseltmelisiniz?",
        "body": "Node.js v26 sürümü, %30 daha hızlı startup süreleri sağlayan optimize edilmiş V8 motoru ve dahili TypeScript derleyici desteğiyle birlikte geliyor. Artık ek bir ts-node paketine ihtiyaç duymadan doğrudan .ts dosyalarını koşturabilirsiniz."
      }
    ]
  },
  {
    "id": "PSEO-04",
    "title": "v0.dev AI Yapay Zeka Arayüz Oluşturucu Derinlemesine İncelemesi",
    "excerpt": "Vercel'in popüler yapay zeka arayüz motoru v0.dev'i kod kalitesi, tasarım kabiliyetleri ve 2026 fiyat tarifesi üzerinden mercek altına alıyoruz.",
    "category": "Yapay Zeka & Gelecek",
    "subcategory": "AI Arayüz Araçları",
    "date": "8 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    "readTime": "4 dk",
    "author": "Teknoloji Servisi",
    "authorTitle": "Teknoloji & AI Yayın Masası",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "pSeoType": "review",
    "pSeoData": {
      "score": 9.6,
      "pros": [
        "React ve Tailwind CSS ile saniyeler içinde mükemmel arayüz tasarımları üretir.",
        "Figma çıktılarını doğrudan temiz koda dönüştürebilir.",
        "Vercel ekosistemiyle anında dağıtım ve canlı önizleme sunar."
      ],
      "cons": [
        "Çok karmaşık backend entegrasyonlarında manuel kodlama gerektirir.",
        "Ücretsiz plandaki kredi limitleri yoğun projeler için yetersiz kalabilir."
      ],
      "affiliateUrl": "https://v0.dev",
      "affiliateText": "Ücretsiz Dene & Hemen Başla"
    },
    "sections": [
      {
        "id": "rev-sec-1",
        "heading": "v0.dev Kod Kalitesi ve Üretim Hızı Testi",
        "body": "Vercel v0.dev, özellikle Tailwind CSS ve Radix UI bileşenlerini birleştirerek son derece kurumsal, temiz ve erişilebilir React kodu üretiyor. AI tarafından üretilen şablonlar, elle yazılmışçasına temiz ve modüler bir yapıda dışarı aktarılabiliyor."
      }
    ]
  },
  {
    "id": "NEWS-01",
    "title": "Kuantum Bilgisayarlarda 10,000 Qubit Eşiği Aşıldı: Post-Kuantum Şifrelemeye Geçiş Başladı",
    "excerpt": "Küresel çip üreticileri tarafından duyurulan yeni kuantum işlemcisi, klasik şifreleme yöntemlerini saniyeler içinde çözebilecek devasa bir hesaplama gücüne ulaştı.",
    "category": "Teknoloji & Dijital Dönüşüm",
    "subcategory": "Kuantum Bilgisayarlar",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=80",
    "readTime": "6 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "youtubeVideoId": "y9Trz1R1s3M",
    "executiveSummary": "10,000 fiziksel qubit seviyesinin aşılması, RSA ve AES-256 gibi geleneksel kriptografi standartlarının ömrünü kısaltarak post-kuantum şifreleme geçişini acil hale getirdi.",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-01",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Kuantum Süperpozisyonu ve Donanımsal Atılım",
        "body": "Post-silikon çağının kapılarını aralayan yeni kuantum işlemcisi, mutlak sıfıra yakın sıcaklıkta çalışan 10,000 kararlı qubiti tek bir çip üzerinde birleştirmeyi başardı. Bu eşik, hata payını milyonda bire indirgeyen gelişmiş kuantum eş-evresizlik kontrol algoritmaları sayesinde kilitlendi."
      },
      {
        "id": "sec-2",
        "heading": "2. Geleneksel Şifreleme Algoritmalarının Sonu",
        "body": "Shor Algoritması'nın kuantum işlemcilerdeki simülasyonları, günümüzün en yaygın bankacılık ve askeri şifreleme altyapısı olan RSA-2048'in saatler içinde kırılabileceğini doğruluyor. Bilgi güvenliği otoriteleri, finansal kuruluşlara kuantum dayanıklı şifreleme standartlarına geçme çağrısı yapıyor."
      }
    ]
  },
  {
    "id": "NEWS-02",
    "title": "6G Kablosuz Ağ Protokollerinde Terahertz Frekans Rekoru: Saniyede 1 Tbps Veri Transferi",
    "excerpt": "Uluslararası Telekomünikasyon Birliği tarafından onaylanan yeni 6G standartları, kablosuz veri iletiminde fiziksel sınırları zorlayarak 1 Terabit hıza ulaştı.",
    "category": "Teknoloji & Dijital Dönüşüm",
    "subcategory": "Mobil Dünya & 6G",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-02",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Alt-Terahertz Frekans Modülasyonu",
        "body": "0.1 ila 1 THz bant aralığında çalışan yeni nesil akıllı faset baz istasyonları, hiyerarşik hüzme şekillendirme (beamforming) teknolojisiyle kapsama alanını iki katına çıkardı."
      },
      {
        "id": "sec-2",
        "heading": "2. Otonom Mobilite ve Holografik İletişim",
        "body": "Sıfıra yakın gecikme süresi (0.1ms), otonom şehir araçlarının ve uzaktan cerrahi operasyonlarının kesintisiz gerçekleşmesini sağlıyor."
      }
    ]
  },
  {
    "id": "NEWS-03",
    "title": "Endüstri 5.0 ve Akıllı Fabrikalar: İnsan-Robot Hibrit Üretim Hatlarında %300 Verimlilik",
    "excerpt": "Siber-fiziksel sistemler ve kobot teknolojilerinin üretken yapay zekayla entegrasyonu, imalat sanayisinde radikal bir verimlilik artışı başlattı.",
    "category": "Teknoloji & Dijital Dönüşüm",
    "subcategory": "Robotik & Otomasyon",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Teknoloji Servisi",
    "authorTitle": "Kıdemli Teknoloji Editörü",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-03",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. İş Birlikçi Robotların (Kobot) Yükselişi",
        "body": "Gelişmiş vizyon sensörleri ve dokunsal bildirimlerle donatılmış kobotlar, insan operatörlerle yan yana güvenlik bariyeri olmadan çalışabiliyor."
      }
    ]
  },
  {
    "id": "NEWS-04",
    "title": "AGI Seviyesine Bir Adım Daha: Otonom Muhakeme Yapabilen Llama-4 ve Claude-4 Modelleri",
    "excerpt": "Yapay Genel Zeka mimarisinde çığır açan yeni mantık zinciri (Chain of Thought) algoritmaları, karmaşık matematiksel teoremleri insandan hızlı çözüyor.",
    "category": "Yapay Zeka & Gelecek",
    "subcategory": "AGI (Yapay Genel Zeka)",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    "readTime": "6 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-04",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Mantık Yürütme Motorlarında Derinleşme",
        "body": "Yeni nesil AI modelleri sadece kelime tahmini yapmakla kalmıyor, probleme yaklaşmadan önce kendi içinde hipotez kurup doğrulama adımlarını yürütüyor."
      }
    ]
  },
  {
    "id": "NEWS-05",
    "title": "Otonom AI Ajanları Yazılım Sektörünü Yeniden Şekillendiriyor: Devin v2 ve AutoCode 2026",
    "excerpt": "Geliştirici ekiplerinin yerini alan otonom yapay zeka ajanları, taranan gereksinim dokümanından baştan sona çalışan yazılım mimarileri üretiyor.",
    "category": "Yapay Zeka & Gelecek",
    "subcategory": "Otonom AI Ajanları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Teknoloji Servisi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-05",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Kodlama Dillerinde Otonom Refactoring",
        "body": "Yapay zeka ajanları eski kütüphaneleri ve güvenlik açıklarını tespit ederek binlerce satırlık sistemleri dakikalar içinde güncelliyor."
      }
    ]
  },
  {
    "id": "NEWS-06",
    "title": "Nöromorfik Biyo-Çipler: İnsan Beyin Hücreleriyle Çalışan Hibrit İşlemci Mimarileri",
    "excerpt": "Biyolojik nöronlarla silikon devrelerin bir araya getirildiği nöromorfik işlemciler, enerji tüketimini %99 azaltarak AI hesaplamalarında devrim yaptı.",
    "category": "Yapay Zeka & Gelecek",
    "subcategory": "Nöromorfik Çipler",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Teknoloji Servisi",
    "authorTitle": "Teknoloji Editörü",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-06",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Biyo-Silikon Hibrit Hesaplama",
        "body": "Canlı sinir dokularından esinlenen spikeli nöral ağlar (SNN), milivat seviyesinde güç tüketimiyle karmaşık örüntü tanıma süreçlerini çalıştırıyor."
      }
    ]
  },
  {
    "id": "NEWS-07",
    "title": "Bitcoin $150,000 Barajını Aşarak Yeni Zirve Yaptı: Spot ETF Girişleri Rekor Kırdı",
    "excerpt": "Kurumsal sermayenin ve emeklilik fonlarının doğrudan tahsisat yapmasıyla lider kripto para birimi Bitcoin tarihi seviyelerini yeniledi.",
    "category": "Kripto & Web3",
    "subcategory": "Bitcoin (BTC) Analiz",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1200&q=80",
    "readTime": "6 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-07",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Kurumsal Bilançolarda Bitcoin Ağırlığı",
        "body": "S&P 500 devleri enflasyondan korunma aracı olarak bilançolarına BTC eklemeye devam ediyor. Günlük ETF akışları $2 Milyar seviyesini aştı."
      }
    ]
  },
  {
    "id": "NEWS-08",
    "title": "Ethereum Pectra Güncellemesi Devrede: Sıfır Bilgi İspatı (ZK-Rollup) İle Ücretsiz İşlemler",
    "excerpt": "Ethereum ağının son ana güncellemesi olan Pectra, Layer-2 ölçekleme kapasitesini 100 kat artırarak gaz ücretlerini sıfırladı.",
    "category": "Kripto & Web3",
    "subcategory": "Ethereum & Smart Contracts",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Ekonomi Servisi",
    "authorTitle": "Kripto Masası Şefi",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-08",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Akıllı Sözleşmelerde ZK-STARK Entegrasyonu",
        "body": "Pectra hard fork'u ile birlikte hesap soyutlama (account abstraction) standart hale geldi, cüzdan kullanımı kredi kartı kolaylığına ulaştı."
      }
    ]
  },
  {
    "id": "NEWS-09",
    "title": "Kurumsal DeFi ve Gerçek Dünya Varlıkları (RWA): $50 Milyarlık Tahvil Blokzincirde",
    "excerpt": "Wall Street bankaları Hazine bonolarını ve gayrimenkul portföylerini zincir üstüne taşıyarak anlık likidite havuzları oluşturdu.",
    "category": "Kripto & Web3",
    "subcategory": "DeFi & Likidite Havuzları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-09",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Tokenize Varlık Piyasasının Büyüklüğü",
        "body": "Geleneksel finans devleri (TradFi) ile ademi merkeziyetçi protokollerin entegrasyonu küresel borç piyasasını blokzincirine entegre ediyor."
      }
    ]
  },
  {
    "id": "NEWS-10",
    "title": "BIST 100 Rekor Tazeledi: Yabancı Sermaye Akışı ve Teknoloji Hisselerinde Güçlü Ralli",
    "excerpt": "Borsa İstanbul, yabancı kurumsal fon girişlerinin ivme kazanmasıyla 10,800 puan barajını aşarak tüm zamanların en yüksek seviyesini test etti.",
    "category": "Finans & Küresel Piyasalar",
    "subcategory": "Borsa İstanbul (BIST 100)",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-10",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. BIST Teknoloji ve Sanayi Endeksi Öncülüğünde Yükseliş",
        "body": "Uluslararası derecelendirme kuruluşlarının not artışları sonrası Borsa İstanbul'a giren yabancı sermaye hacmi haftalık $850 Milyona ulaştı."
      }
    ]
  },
  {
    "id": "NEWS-11",
    "title": "Ons Altın $3,200 Seviyesinde Zirve Yaptı: Küresel Merkez Bankaları Rezervlerini Artırıyor",
    "excerpt": "Jeopolitik riskler ve faiz indirimi beklentileriyle ons altın tarihi rekorunu kırarken gram altın iç piyasada yeni zirvesini gördü.",
    "category": "Finans & Küresel Piyasalar",
    "subcategory": "Altın & Değerli Madenler",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Ekonomi Servisi",
    "authorTitle": "Finans Analisti",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-11",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Değerli Madenlerde Güvenli Liman Talebi",
        "body": "Doğu Avrupa ve Uzak Doğu merkez bankalarının külçe altın alımları fiziki talepte rekor kırılmasına yol açtı."
      }
    ]
  },
  {
    "id": "NEWS-12",
    "title": "Federal Rezerv Faiz İndirim Döngüsünü Hızlandırdı: Gelişmekte Olan Piyasalarda Bahar Havası",
    "excerpt": "Fed Başkanı tarafından yapılan güvercin tondaki açıklamalar sonrası Dolar Endeksi gerilerken gelişmekte olan ülke para birimleri değer kazandı.",
    "category": "Finans & Küresel Piyasalar",
    "subcategory": "Fed & Merkez Bankaları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-12",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Küresel Likidite Koşullarında Rahatlama",
        "body": "ABD faiz oranlarının düşüş patikasına girmesi küresel sermayenin riske odaklı gelişen piyasalara yönelmesini tetikledi."
      }
    ]
  },
  {
    "id": "NEWS-13",
    "title": "Milli Teknoloji Hamlesi ve Savunma Sanayii: KAAN ve KIZILELMA Seri Üretime Geçti",
    "excerpt": "Yerli 5. nesil savaş uçağı KAAN ve otonom insansız savaş uçağı KIZILELMA hava kuvvetleri envanterine katılarak ilk ihraç anlaşmalarına imza attı.",
    "category": "Siyaset & Strateji",
    "subcategory": "Savunma Sanayii (SİHA/Milli)",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-13",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Görünmezlik ve Yerli AESA Radar Entegrasyonu",
        "body": "Milli imkanlarla geliştirilen radar ve mühimmat sistemleri sayesinde KAAN, küresel pazarın en iddialı 5. nesil platformları arasına girdi."
      }
    ]
  },
  {
    "id": "NEWS-14",
    "title": "Küresel Dijital Diplomasi Zirvesi: Uluslararası AI Güvenlik ve Veri Tüzüğü İmzalandı",
    "excerpt": "50 ülkeden katılan liderler ve teknoloji devleri, otonom silah sistemlerinin sınırlandırılması ve veri gizliliği üzerinde tarihi anlaşmaya vardı.",
    "category": "Siyaset & Strateji",
    "subcategory": "Dış Politika & Diplomasi",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Siyaset Masası",
    "authorTitle": "Diplomasi Editörü",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-14",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Siber Sınırlar ve Uluslararası Hukuk",
        "body": "Devletlerin siber alandaki egemenlik hakları ve otonom yazılımların sorumlulukları uluslararası protokollerle tescillendi."
      }
    ]
  },
  {
    "id": "NEWS-15",
    "title": "Ankara Gündemi: Yerli Yapay Zeka Yasası ve Kişisel Veri Güvenliği Reformu Mecliste",
    "excerpt": "Türkiye Büyük Millet Meclisi genel kuruluna sunulan yeni teknoloji paketi, AI şirketlerine teşvik sağlarken veri güvenliğini güçlendiriyor.",
    "category": "Siyaset & Strateji",
    "subcategory": "Ankara Gündemi & Meclis",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-15",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Yerli Veri Merkezlerine Vergi Muafiyeti",
        "body": "Yeni yasal düzenleme ile Türkiye sınırları içerisinde veri merkezi kuran yerli ve yabancı yatırımcılara 10 yıl vergi istisnası tanınıyor."
      }
    ]
  },
  {
    "id": "NEWS-16",
    "title": "Creator Economy 2026 Raporu: Dijital İçerik Üreticilerinin Küresel Pazar Hacmi $480 Milyarı Aştı",
    "excerpt": "Geleneksel medya kanallarını geride bırakan içerik üretici ekosistemi, markaların reklam bütçelerinin ana odağı haline geldi.",
    "category": "Sosyal Medya & Viral",
    "subcategory": "Creator Economy",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-16",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Mikrofondan Küresel Yayına: Podcast ve 4K Stüdyolar",
        "body": "Bireysel içerik üreticileri kurumsal prodüksiyon kalitesine ulaşarak doğrudan izleyici aboneliklerinden milyon dolarlık gelirler elde ediyor."
      }
    ]
  },
  {
    "id": "NEWS-17",
    "title": "Yapay Zeka Fenomenleri Sanal Reklam Pazarına Damga Vuruyor: $100M Sosyal Medya Anlaşmaları",
    "excerpt": "Tamamen fotogerçekçi AI algoritmalarıyla üretilen sanal influencerlar, dünya devlerinin marka yüzü olarak sözleşmelere imza atıyor.",
    "category": "Sosyal Medya & Viral",
    "subcategory": "Yapay Zeka Fenomenleri",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Sosyal Medya Masası",
    "authorTitle": "Trend Editörü",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-17",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Dijital Kimlikler ve Etik Etiketleme",
        "body": "Sosyal medya platformları, yapay zeka ile üretilen avatar ve fenomenlerin profil açıklamalarında filigran bulundurmasını zorunlu kıldı."
      }
    ]
  },
  {
    "id": "NEWS-18",
    "title": "Platform Savaşları: TikTok, Instagram ve YouTube Kısa Video Gelir Paylaşımında Devrim Yapıyor",
    "excerpt": "Kısa dikey içerik rekabetinde öne geçmek isteyen teknoloji devleri, üreticilere reklam gelirlerinin %55'ini doğrudan aktarmaya başladı.",
    "category": "Sosyal Medya & Viral",
    "subcategory": "Platform Savaşları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-18",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Mobil Algoritmalar ve İzleyici Bağlılığı",
        "body": "Tavsiye motorlarında yapılan son yapay zeka optimizasyonları, nitelikli ve bilgi odaklı kısa videoların öne çıkmasını sağladı."
      }
    ]
  },
  {
    "id": "NEWS-19",
    "title": "2026 Dünya Kupası Teknolojik Yenilikleri: Çipli Toplar ve Anlık Otonom Ofsayt Tespiti",
    "excerpt": "Amerika, Kanada ve Meksika ortaklığında düzenlenen Dünya Kupası'nda devrim niteliğinde yapay zeka hakem asistanları sahaya indi.",
    "category": "Spor & E-Spor",
    "subcategory": "2026 Dünya Kupası Özel",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-19",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Ultra Hassas İki Yüz Hz Sensörlü Futbol Topu",
        "body": "Topun içine yerleştirilen ultra geniş bant (UWB) çipleri, darbe ve temas verisini saliseler içinde stadyum veri merkezine iletiyor."
      }
    ]
  },
  {
    "id": "NEWS-20",
    "title": "Formula 1 2026 Hibrit Motor Çağı Başladı: %100 Sürdürülebilir Yakıt ve Aktif Aerodinamik",
    "excerpt": "F1 tarihinin en büyük kural değişikliğiyle beraber elektrik gücü %50'ye yükseltildi, sürdürülebilir sentetik yakıt kullanımı zorunlu kılındı.",
    "category": "Spor & E-Spor",
    "subcategory": "Formula 1 & Motor Sporları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Spor Servisi",
    "authorTitle": "Motor Sporları Uzmanı",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-20",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. MGU-K Gücü ve Karbon Nötr Yarışlar",
        "body": "350kW elektrik motoru desteği ve hareketli kanat tasarımları düzlüklerde yüksek hız ve virajlarda Maksimum basma kuvveti sağlıyor."
      }
    ]
  },
  {
    "id": "NEWS-21",
    "title": "E-Spor Dünyasında Rekor Ödül: $50 Milyonluk Valorant ve League of Legends Dünya Şampiyonası",
    "excerpt": "Global arenada düzenlenen e-spor turnuvaları, geleneksel spor organizasyonlarını izlenme oranlarında geride bırakarak milyonları ekrana kilitledi.",
    "category": "Spor & E-Spor",
    "subcategory": "E-Spor Turnuvaları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-21",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Profesyonel Kulüpler ve Stadyum Arenaları",
        "body": "Geleneksel spor kulüpleri e-spor branşlarına yaptığı yatırımlarla genç kitleye doğrudan ulaşan dijital sponsorluk modelleri geliştiriyor."
      }
    ]
  },
  {
    "id": "NEWS-22",
    "title": "Türkiye'nin Yeni Unicorn'ları: Yapay Zeka ve SaaS Odaklı 3 Türk Girişimi Değerlemesini Katladı",
    "excerpt": "Silikon Vadisi fonlarından aldıkları yatırımlarla milyar dolar değerlemeyi aşan Türk girişimciler, küresel teknoloji pazarında fırtına estiriyor.",
    "category": "Girişimcilik & Startup",
    "subcategory": "Startup Hikayeleri & Unicorns",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-22",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Yerli Yazılım İhracatında Rekor Hacim",
        "body": "Geliştirilen yapay zeka altyapıları ve mikro-SaaS ürünleri Amerika ve Avrupa pazarında milyonlarca aktif kullanıcıya ulaştı."
      }
    ]
  },
  {
    "id": "NEWS-23",
    "title": "Yatırım Sermayesinde AI Dönemi: VC'ler Kararlarının %40'ını Otonom Veri Robotlarıyla Alıyor",
    "excerpt": "Girişim sermayesi fonları, yatırım yapacakları şirketleri seçerken artık yapay zeka destekli kohort ve büyüme simülasyonlarını kullanıyor.",
    "category": "Girişimcilik & Startup",
    "subcategory": "Yatırım Turları & Seed",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Girişim Masası",
    "authorTitle": "VC Analisti",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-23",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Veriye Dayalı Pitch Deck Analizleri",
        "body": "Yapay zeka sistemleri girişimcilerin finansal projeksiyonlarını ve pazar rekabet haritasını dakikalar içinde doğruluyor."
      }
    ]
  },
  {
    "id": "NEWS-24",
    "title": "Küresel Dijital Göçebe (Nomad) Haritası: İstanbul ve Lizbon Teknoloji Çalışanlarının Favorisi",
    "excerpt": "Uzaktan ve hibrit çalışma kültürünün kalıcı hale gelmesiyle beraber yüksek nitelikli yazılımcı ve tasarımcılar İstanbul ve Lizbon'a akın etti.",
    "category": "Girişimcilik & Startup",
    "subcategory": "Dijital Göçebelik (Nomad)",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-24",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Dijital Nomad Vizeleri ve Ortak Çalışma Alanları",
        "body": "İstanbul'daki yüksek hızlı fiber altyapı ve sosyal imkanlar, küresel teknoloji şirketlerinin çalışanlarını Türkiye'ye çekiyor."
      }
    ]
  },
  {
    "id": "NEWS-25",
    "title": "Giyilebilir Biyometrik Sensörler ve Longevity: Erken Teşhiste %95 Başarı Oranı",
    "excerpt": "Akıllı saatler ve yüzükler, sürekli kan şekeri ve metabolik veri takibi yaparak kronik rahatsızlıkları yıllar öncesinden haber veriyor.",
    "category": "Yaşam & Sağlık",
    "subcategory": "Giyilebilir Sağlık Teknolojisi",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-25",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Biyometrik Verilerin Sürekli Analizi",
        "body": "Derinizin altındaki kılcal damarlardan gelen optik veri akışları yapay zeka modelleriyle işlenerek kişiye özel beslenme haritası çıkarılıyor."
      }
    ]
  },
  {
    "id": "NEWS-26",
    "title": "Biyoteknolojide Hücresel Gen Terapisi Çığıra Yol Açıyor: Yaşlanma Karşıtı Yeni Molekül",
    "excerpt": "Klinik araştırmaları tamamlanan yeni hücresel yenilenme molekülü, telomer boyunu koruyarak hücresel yaşlanmayı yavaşlatmayı başardı.",
    "category": "Yaşam & Sağlık",
    "subcategory": "Longevity (Uzun Yaşam)",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Sağlık Servisi",
    "authorTitle": "Biyoteknoloji Editörü",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-26",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Telomer Onarımı ve Kök Hücre Yenilenmesi",
        "body": "Biyoteknoloji lablarında geliştirilen hücresel programlama yöntemleri organ fonksiyonlarının daha uzun süre genç kalmasını sağlıyor."
      }
    ]
  },
  {
    "id": "NEWS-27",
    "title": "Zihinsel Performans ve Odaklanma: Bilişsel Nörobilimde Nörofeedback Yöntemleri",
    "excerpt": "Yoğun bilgi yükü altında çalışan yöneticiler ve yazılımcılar için geliştirilen nörofeedback cihazları odak süresini iki katına çıkarıyor.",
    "category": "Yaşam & Sağlık",
    "subcategory": "Zihinsel Sağlık & Odak",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-27",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Beyin Dalgalarının Real-Time Eğitimi",
        "body": "Alpha ve Beta beyin dalgalarını anlık olarak izleyen hafif kafa bantları, derin çalışma (deep work) moduna geçmeyi kolaylaştırıyor."
      }
    ]
  },
  {
    "id": "NEWS-28",
    "title": "Unreal Engine 6 ve Foto-Gerçekçi Oyunlar: Sinema İle Oyun Arasındaki Sınır Kalktı",
    "excerpt": "Epic Games tarafından tanıtılan yeni nesil oyun motoru Unreal Engine 6, gerçek zamanlı ışık izleme ve AI destekli karakterlerle nefes kesti.",
    "category": "Oyun & Eğlence",
    "subcategory": "Oyun Geliştirme (Unreal/Unity)",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-28",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Nite 2 ve Lumen Teknolojilerinde Sıçrama",
        "body": "Milyarlarca poligonu akıcı bir şekilde ekrana getiren yeni mimari, bağımsız stüdyoların bile AAA kalitesinde yapımlar üretmesini sağlıyor."
      }
    ]
  },
  {
    "id": "NEWS-29",
    "title": "Cloud Gaming Ekosistemi Katlanarak Büyüyor: Oyun Konsolları Tarihe mi Karışıyor?",
    "excerpt": "GeForce NOW ve Xbox Cloud Gaming hizmetlerinin 4K 120 FPS seviyesine ulaşmasıyla beraber fiziksel konsol satışlarında gerileme başladı.",
    "category": "Oyun & Eğlence",
    "subcategory": "Cloud Gaming (GeForce NOW)",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Oyun Masası",
    "authorTitle": "Oyun Editörü",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-29",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Sunucu Tabanlı İşleme Gücü",
        "body": "Herhangi bir akıllı TV veya ucuz dizüstü bilgisayardan en yüksek sistem gereksinimli oyunları oynamak artık tek tıkla mümkün."
      }
    ]
  },
  {
    "id": "NEWS-30",
    "title": "Apple Vision Pro 2 ve VR Oyun Dünyası: Tam Derinlikli Sanal Gerçeklik Deneyimi",
    "excerpt": "Apple'ın yeni uzamsal bilgisayarı, hafifleyen yapısı ve uzamsal ses teknolojisiyle oyuncuları doğrudan sanal evrenin merkezine koyuyor.",
    "category": "Oyun & Eğlence",
    "subcategory": "VR / AR Oyun Deneyimi",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-30",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. El ve Göz Takibinde %100 Doğruluk",
        "body": "Fiziksel kumandalara ihtiyaç duymadan sadece el jestleri ve göz odaklanmasıyla oynanan yeni nesil oyunlar interaktif eğlenceyi baştan yazıyor."
      }
    ]
  },
  {
    "id": "NEWS-31",
    "title": "SpaceX Starship Mars Görevi İçin Geri Sayım Başladı: İnsanlı İlk Gezegenler Arası Yolculuk",
    "excerpt": "Dünyanın en güçlü roketi Starship'in Mars yörüngesine kargo ve yaşam modülleri taşıyacak tarihi uçuş tarihi resmen açıklandı.",
    "category": "Bilim & Uzay",
    "subcategory": "Mars Kolonisi & Starship",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
    "readTime": "6 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-31",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Yörüngede Yakıt İkmali ve Yaşam Destek Sistemleri",
        "body": "Dünya yörüngesinde gerçekleştirilecek otomatik sıvı metan ikmali, roketin Mars'a tam tonajlı kargo indirmesine imkan veriyor."
      }
    ]
  },
  {
    "id": "NEWS-32",
    "title": "Nükleer Füzyon Santrallerinde Sınırsız Temiz Enerji Rekoru: 100 Milyon Derece Plazma",
    "excerpt": "Küresel füzyon konsorsiyumu, Güneş'in çekirdeğinden 7 kat daha sıcak plazmayı kararlı bir şekilde tutarak pozitif net enerji elde etti.",
    "category": "Bilim & Uzay",
    "subcategory": "Nükleer Füzyon Enerjisi",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Bilim Servisi",
    "authorTitle": "Fizik Uzmanı",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-32",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Tokamak Mıknatıslarında Süper-İletkenlik",
        "body": "Yüksek sıcaklık süper iletken magnetler sayesinde füzyon reaktörlerinin ebadı küçülerek ticari şebekelere bağlanma aşamasına geldi."
      }
    ]
  },
  {
    "id": "NEWS-33",
    "title": "James Webb Teleskobu Evrenin İlk Galaksilerini Görüntüledi: Big Bang Kuramında Yeni Sayfa",
    "excerpt": "Derin uzay gözlemlerini sürdüren James Webb Teleskobu, Büyük Patlama'dan sadece 200 milyon yıl sonra oluşmuş olgun galaksileri tespit etti.",
    "category": "Bilim & Uzay",
    "subcategory": "Derin Uzay Teleskopları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-33",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Kırmızıya Kayma ve Kozmolojik Gizemler",
        "body": "Elde edilen tayf verileri ilk yıldızların ve karadeliklerin evrenin başlangıcında sanılandan çok daha hızlı kütle kazandığını kanıtlıyor."
      }
    ]
  },
  {
    "id": "NEWS-34",
    "title": "2026 Yapay Zeka Kariyer Raporu: En Çok Aranan 10 Meslek ve $200k+ Maaş Skalası",
    "excerpt": "Prompt Mühendisliği, AI Etik Denetçiliği ve Otonom Sistem Mimarisi küresel iş gücü pazarının en yüksek maaşlı pozisyonları oldu.",
    "category": "Eğitim & Kariyer",
    "subcategory": "Kariyer Dönüşüm Rehberi",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-34",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Disiplinler Arası Yet Yetkinliklerinin Önemi",
        "body": "Yazılım bilgisinin yanı sıra psikoloji, hukuk ve veri analitiğini harmanlayabilen profesyoneller küresel şirketlerin ilk tercihi haline geliyor."
      }
    ]
  },
  {
    "id": "NEWS-35",
    "title": "No-Code ve AI Destekli Kodlama: Yazılımcı Olmadan Uygulama Geliştirme Çağı",
    "excerpt": "Gelişmiş görsel geliştirme platformları sayesinde teknik altyapısı olmayan girişimciler bile kompleks SaaS platformları inşa edebiliyor.",
    "category": "Eğitim & Kariyer",
    "subcategory": "No-Code / Low-Code",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Eğitim Masası",
    "authorTitle": "Kariyer Editörü",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-35",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Fikirden Canlı Ürüne Saatler İçinde Geçiş",
        "body": "Sürükle-bırak arayüzler ve entegre veri tabanları fikrin hızlıca doğrulanmasını ve pazara sürülmesini sağlıyor."
      }
    ]
  },
  {
    "id": "NEWS-36",
    "title": "LinkedIn Algoritmasında Yeni Dönem: Etkileşim Artıran İçerik ve Profil Stratejileri",
    "excerpt": "Profesyonel iş ağında öne çıkmak isteyen yöneticiler için onaylanmış içerik mimarisi ve organik görünürlük ipuçları yayınlandı.",
    "category": "Eğitim & Kariyer",
    "subcategory": "LinkedIn Algoritma Taktikleri",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-36",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Derinlemesine Sektörel Analizlerin Gücü",
        "body": "Görsel ve metin dengesini iyi kuran, değer katan sektörel dosyalar Linkedin akışında organik olarak milyonlarca kişiye ulaşıyor."
      }
    ]
  },
  {
    "id": "NEWS-37",
    "title": "Küresel Lüks Gayrimenkul Endeksi: İstanbul, Dubai ve Londra Portföylerinde Rekor Değer",
    "excerpt": "Uluslararası yatırımcıların markalı konut projelerine olan ilgisiyle İstanbul ve Dubai lüks gayrimenkul fiyatlarında %40 prim yaptı.",
    "category": "Emlak & Lüks Yatırım",
    "subcategory": "Lüks Gayrimenkul Trendleri",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-37",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Markalı Rezidanslar ve Akıllı Ev Konsepti",
        "body": "Özel helipadı, akıllı otomasyonu ve sürdürülebilir mimarisi olan ultra lüks yapılar küresel fonların ana yatırım hedefi haline geldi."
      }
    ]
  },
  {
    "id": "NEWS-38",
    "title": "Akıllı Binalar ve PropTech Teknolojileri: Enerji Tüketimini %40 Azaltan Sistemler",
    "excerpt": "Yapay zeka ile iklimlendirilen ticari binalar ve gökdelenler, karbon ayak izini düşürerek işletme maliyetlerini en aza indiriyor.",
    "category": "Emlak & Lüks Yatırım",
    "subcategory": "PropTech Teknolojileri",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Emlak Servisi",
    "authorTitle": "PropTech Editörü",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-38",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Yeşil Mimaride Nesnelerin İnterneti (IoT)",
        "body": "Güneş paneli kaplı cam cepheler ve bina içi enerji depolama üniteleri akıllı şehirlerin temel taşı haline geldi."
      }
    ]
  },
  {
    "id": "NEWS-39",
    "title": "REIT ve Gayrimenkul Fonları: Küçük Yatırımcı İçin Ticari Emlak Geliri Modeli",
    "excerpt": "Gayrimenkul yatırım ortaklıkları (GYO), bireysel yatırımcılara yüksek bedelli plaza ve otellerden kirasal temettü elde etme fırsatı sunuyor.",
    "category": "Emlak & Lüks Yatırım",
    "subcategory": "REIT & Gayrimenkul Fonları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-39",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Likit Emlak Yatırımlarının Avantajları",
        "body": "Tapu süreçleriyle uğraşmadan borsa üzerinden hisse alır gibi nitelikli emlak portföylerine ortak olunabiliyor."
      }
    ]
  },
  {
    "id": "NEWS-40",
    "title": "Togg T10X ve T10F Yeni Nesil Otonom Güncellemesi Yayınlandı: Seviye 3 Otonom Sürüş",
    "excerpt": "Yerli mobilite doğuştan elektrikli Togg modelleri, otonom şerit değiştirme ve akıllı park özelliklerini içeren yeni yazılım paketini sundu.",
    "category": "Otomotiv & Mobilite",
    "subcategory": "Togg & Yerli Otomobil",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-40",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Trumore Ekosistemi ve Dijital Varlık Cüzdanı",
        "body": "Araç içi kokpit ekranından doğrudan akıllı şarj ödemeleri ve blokzincir tabanlı araç geçmişi kontrol edilebiliyor."
      }
    ]
  },
  {
    "id": "NEWS-41",
    "title": "Solid-State (Kuru Tip) Batarya Devrimi: 10 Dakika Şarj İle 1,200 Km Kesintisiz Menzil",
    "excerpt": "Akü üreticilerinin seri üretime başladığı kuru tip bataryalar, elektrikli araçlarda menzil kaygısını tamamen ortadan kaldırdı.",
    "category": "Otomotiv & Mobilite",
    "subcategory": "Batarya Teknolojileri",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Otomotiv Servisi",
    "authorTitle": "Mobilite Editörü",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-41",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Lityum-Metal Elektrotlar ve Yanmazlık",
        "body": "Sıvı elektrolit barındırmayan yeni bataryalar aşırı sıcakta ve kaza anında alev almama garantisi sunuyor."
      }
    ]
  },
  {
    "id": "NEWS-42",
    "title": "eVTOL Uçan Taksi Filoları Şehir İçi Ulaşımda Başlıyor: 2026 Şehir İçi Uçuş İzinleri",
    "excerpt": "Sessiz ve sıfır emisyonlu elektrikli dikey iniş kalkış araçları (eVTOL), havalimanı ve şehir merkezleri arasında yolcu taşımaya başladı.",
    "category": "Otomotiv & Mobilite",
    "subcategory": "Uçan Arabalar & eVTOL",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-42",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Vertiport İstasyonları ve Hava Trafik Yönetimi",
        "body": "Şehir içi özel koridorlarda otonom rotalarda uçan taksiler, trafik sıkışıklığını tamamen baypas ediyor."
      }
    ]
  },
  {
    "id": "NEWS-43",
    "title": "Kurumsal CRM ve Yapay Zeka Entegrasyonu: Müşteri Deneyiminde %300 Dönüşüm Oranı",
    "excerpt": "Bulut tabanlı müşteri ilişkileri yönetimi yazılımları, satış tahminleme ve e-posta yanıtlarını otonom olarak yönetiyor.",
    "category": "SaaS & Bulut Yazılımları",
    "subcategory": "CRM Sistemleri",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-43",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Müşteri Davranışlarının Kestirimci Analitiği",
        "body": "Yapay zeka agentları, müşterinin terk etme (churn) ihtimalini aylar öncesinden sezip otomatik teklifler sunuyor."
      }
    ]
  },
  {
    "id": "NEWS-44",
    "title": "Bulut Sunucu & Multi-Cloud Mimarisi: AWS, Azure ve Google Cloud Karşılaştırması",
    "excerpt": "Yüksek erişilebilirlik gerektiren küresel uygulamalar, birden fazla bulut sağlayıcısını tek bir orkestrasyon paneli üzerinden yönetiyor.",
    "category": "SaaS & Bulut Yazılımları",
    "subcategory": "Bulut Sunucu & Hosting",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Yazılım Servisi",
    "authorTitle": "SaaS Mimarı",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-44",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Kubernetes ve Sunucusuz (Serverless) Sistemler",
        "body": "Trafik patlamalarında anında otomatik ölçeklenen bulut sunucular işletim maliyetlerini %50'ye varan oranda düşürüyor."
      }
    ]
  },
  {
    "id": "NEWS-45",
    "title": "Micro-SaaS Girişimleri İle Aylık $50,000 Düzenli Gelir (MRR) Elde Etme Yolları",
    "excerpt": "Tek kişilik yazılım projeleri olarak kurulan Micro-SaaS ürünleri, niş problemleri çözerek yüksek karlı abonelik modelleri yaratıyor.",
    "category": "SaaS & Bulut Yazılımları",
    "subcategory": "Micro-SaaS Çözümleri",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-45",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Niş Pazarlar ve Yalın Ürün Mimarisi",
        "body": "Karmaşık kurumsal yazılımların yerine tek bir işe odaklanan pratik API ve web eklentileri hızlıca pazarı domine ediyor."
      }
    ]
  },
  {
    "id": "NEWS-46",
    "title": "Bireysel Emeklilik (BES) Devlet Katkısı %30'a Yükseltildi: Emeklilikte Fon Yönetimi",
    "excerpt": "Devlet katkısıyla güçlenen BES fonları, hisse ve altın ağırlıklı portföy tercihleriyle enflasyonun üzerinde getiri sağladı.",
    "category": "Kişisel Finans & Sigorta",
    "subcategory": "BES Fonları & Emeklilik",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-46",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Fon Değişikliği Hakları ve Birikim Stratejileri",
        "body": "Yılda 12 kez yapılabilen fon değişim hakkını piyasa konjonktürüne göre kullanan katılımcılar birikimlerini katladı."
      }
    ]
  },
  {
    "id": "NEWS-47",
    "title": "Akıllı Kasko ve Telematik Sigortacılık: Güvenli Sürücüye %40 Prim İndirimi Fırsatı",
    "excerpt": "Araç mobil uygulamaları üzerinden sürüş tarzını izleyen sigorta şirketleri, kurallara uyan sürücülere özel kasko fiyatı sunuyor.",
    "category": "Kişisel Finans & Sigorta",
    "subcategory": "Kasko & Trafik Sigortası",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Finans Servisi",
    "authorTitle": "Sigorta Uzmanı",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-47",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Telematik Veri Takibi ve Dinamik Fiyatlama",
        "body": "Ani fren, hız ihlali ve gece sürüşü yapmayan sürücüler kasko poliçelerinde önemli bir maliyet avantajı elde ediyor."
      }
    ]
  },
  {
    "id": "NEWS-48",
    "title": "Kredi Skoru ve Finansal Sağlık: Bankaların Onay Verdiği 5 Temel Yatırım Kriteri",
    "excerpt": "Findeks kredi notunu yükseltmek ve düşük faizli finansmana erişmek isteyen bireyler için adım adım rehber açıklandı.",
    "category": "Kişisel Finans & Sigorta",
    "subcategory": "Kredi Skoru Yönetimi",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Nötr ⚖️",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-48",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Düzenli Ödeme Alışkanlıkları ve Limit Kullanımı",
        "body": "Kredi kartı limitinin %30'undan fazlasını sürekli kullanmamak ve asgari ödeme yerine tam borç kapatmak notu hızla yükseltiyor."
      }
    ]
  },
  {
    "id": "NEWS-49",
    "title": "Fidye Yazılımı (Ransomware) Saldırılarına Karşı 'Sıfır Güven (Zero Trust)' Mimarisi",
    "excerpt": "Kurumsal ağlarda hiçe sayılan yetkilendirme modeli Zero Trust, tüm kullanıcıları ve cihazları sürekli olarak doğrulamayı şart koşuyor.",
    "category": "Siber Güvenlik & Veri Koruma",
    "subcategory": "Fidye Yazılımı (Ransomware) Koruması",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-49",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Asla Güvenme, Daima Doğrula İlkesi",
        "body": "Şirket içi ağda bulunsanız dahi her dosya erişiminde çok faktörlü kimlik doğrulama (MFA) ve şifreli veri tüneli kullanımı zorunlu tutuluyor."
      }
    ]
  },
  {
    "id": "NEWS-50",
    "title": "Kurumsal KVKK & GDPR Uyumlu Veri Şifreleme: 2026 Yeni Şifreleme Standartları",
    "excerpt": "Kişisel verileri işleyen şirketlere getirilen yeni cezai yaptırımlar sonrası uçtan uca anonomizasyon teknolojileri yaygınlaştı.",
    "category": "Siber Güvenlik & Veri Koruma",
    "subcategory": "KVKK & GDPR Uyumluluğu",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "Güvenlik Servisi",
    "authorTitle": "Siber Güvenlik Şefi",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-50",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Homomorfik Şifreleme İle Veri İşleme",
        "body": "Verileri çözmeden (decrypt etmeden) doğrudan şifreli haliyle analiz edebilen yeni algoritmalar veri ihlali riskini tamamen ortadan kaldırıyor."
      }
    ]
  },
  {
    "id": "NEWS-51",
    "title": "Kurumsal Phishing (Kimlik Avı) Tehdit İzleme: Yapay Zeka Destekli Erken Uyarı",
    "excerpt": "Otonom siber güvenlik robotları, sahte alan adlarını ve çalışanlara gönderilen oltalama e-postalarını saliseler içinde engelliyor.",
    "category": "Siber Güvenlik & Veri Koruma",
    "subcategory": "Tehdit İzleme & Analiz",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "readTime": "4 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-51",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Derin Sahtecilik (Deepfake) Ses ve Görüntü Tespiti",
        "body": "Üst düzey yöneticilerin sesini taklit eden CEO dolandırıcılığı vakalarına karşı AI doğrulama katmanları devreye giriyor."
      }
    ]
  },
  {
    "id": "NEWS-52",
    "title": "En İyi AI Metin ve Makale Yazma Araçları 2026: GPT-5, Claude-3.5 ve Gemini Ultra Karşılaştırması",
    "excerpt": "Akademik metinlerden pazarlama içeriklerine kadar profesyonellerin en çok tercih ettiği yapay zeka modelleri test edildi.",
    "category": "Yapay Zeka Araç Rehberi",
    "subcategory": "AI Metin Yazma Araçları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "isEditorsChoice": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-52",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Dil Modellerinde Doğruluk ve Kaynak Gösterimi",
        "body": "Halüsinasyon oranı en düşük olan ve doğrudan akademik makalelere atıf yapabilen yapay zeka araçları performans kriterleriyle sıralandı."
      }
    ]
  },
  {
    "id": "NEWS-53",
    "title": "Foto-Gerçekçi AI Görsel Oluşturucular Karşılaştırması: Midjourney v7 ve FLUX.1 Pro",
    "excerpt": "Metin istemlerinden fotogerçekçi 8K görseller üreten yapay zeka araçları, reklam ve grafik tasarım sektörünün vazgeçilmezi oldu.",
    "category": "Yapay Zeka Araç Rehberi",
    "subcategory": "AI Görsel Oluşturucular",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "Tasarım Servisi",
    "authorTitle": "AI Art Editörü",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-53",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. İstem Mühendisliği ve Işık/Dokusu Ayarları",
        "body": "Kamera açısı, diyafram açıklığı ve odak uzaklığı gibi fotoğrafçılık terimlerini anlayan yeni görsel modeller harikalar yaratıyor."
      }
    ]
  },
  {
    "id": "NEWS-54",
    "title": "Yazılımcılar İçin AI Kodlama Asistanları: GitHub Copilot vs Cursor vs Claude Dev",
    "excerpt": "Yazılım geliştirme sürecini 3 kat hızlandıran otomatik tamamlama, hata ayıklama ve test yazma araçlarının detaylı incelemesi.",
    "category": "Yapay Zeka Araç Rehberi",
    "subcategory": "AI Kodlama Asistanları",
    "date": "7 Ekim 2026",
    "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    "readTime": "5 dk",
    "author": "WebdeHepSeek Haber Merkezi",
    "authorTitle": "Editoryal Yayın Kurulu",
    "verifiedSource": true,
    "sentiment": "Boğa 🐂",
    "canonicalUrl": "https://webdehepseek.com/haber/NEWS-54",
    "sections": [
      {
        "id": "sec-1",
        "heading": "1. Kod Tabanının Tümünü Anlayan Bağlam Penceresi",
        "body": "Milyonlarca satırlık repoları hafızasına alan gelişmiş yapay zeka asistanları, mimari kararlarda geliştiricilere rehberlik ediyor."
      }
    ]
  }
];

export const LEGAL_DOCUMENTS = {
  kvkk: {
    title: "KVKK Aydınlatma Metni (6698 Sayılı Kanun)",
    content: `WebdeHepSeek Journal ("Platform"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") m. 10 uyarınca veri sahiplerini bilgilendirmektedir.

Veri Sorumlusu: Ahmet Karadağ (WebdeHepSeek Yayın Grubu - İletişim: iletisim@webdehepseek.com)

1. Toplanan Kişisel Veriler ve İşleme Amaçları
Platformumuz, ziyaretçilerin gezinme deneyimini geliştirmek, içerik kalitesini optimize etmek ve yasal yükümlülükleri yerine getirmek amacıyla sınırlı kişisel verileri işlemektedir:
* Analitik ve Trafik Verileri: Google Analytics 4 altyapısı aracılığıyla IP adresiniz anonimleştirilerek; tarayıcı türünüz, cihaz modeliniz, ziyaret ettiğiniz haber sayfaları ve sitede kalma süreniz istatistiki amaçlarla kaydedilir.
* İletişim ve Bülten Verileri: E-posta bültenimize abone olduğunuzda veya basın bülteni gönderdiğinizde ilettiğiniz e-posta adresi ve ad-soyad bilgileri, yalnızca onay verdiğiniz bültenlerin iletimi amacıyla saklanır; üçüncü şahıslarla paylaşılmaz veya satılmaz.

2. Kişisel Verilerin Aktarılması
Kişisel verileriniz, kanunen yetkili kamu kurum ve kuruluşları hariç olmak üzere üçüncü şahıslara satılamaz, kiralanamaz veya ticari amaçla paylaşılamaz. Sunucu altyapısı ve e-posta gönderim hizmeti sağlayıcıları ile veri güvenliği protokollerine uygun olarak çalışılmaktadır.

3. KVKK Kapsamındaki Haklarınız
6698 sayılı KVKK'nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, verilerin düzeltilmesini veya silinmesini isteme ve aleyhine bir sonucun ortaya çıkmasına itiraz etme haklarına sahiptir.
Başvurularınızı iletisim@webdehepseek.com adresine iletebilirsiniz.`
  },
  privacy: {
    title: "Gizlilik ve Çerez Politikası (KVKK / GDPR / AdSense)",
    content: `WebdeHepSeek Journal — Gizlilik ve Çerez Politikası

Son Güncelleme: 8 Ekim 2026
Veri Sorumlusu: Ahmet Karadağ (WebdeHepSeek Yayın Grubu)
İletişim: iletisim@webdehepseek.com

WebdeHepSeek Journal ("Platform"), ziyaretçilerinin kişisel verilerinin gizliliğine, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve Avrupa Birliği Genel Veri Koruma Tüzüğü ("GDPR") ilkelerine azami özen göstermektedir. Bu metin, platformumuzu ziyaret ettiğinizde toplanan verilerin mahiyetini, kullanım amaçlarını ve çerez politikamızı açıklamaktadır.

1. Toplanan Kişisel Veriler ve Toplama Amaçları
Platformumuz, ziyaretçilerin gezinme deneyimini geliştirmek, içerik kalitesini optimize etmek ve yasal yükümlülükleri yerine getirmek amacıyla sınırlı kişisel verileri işlemektedir:
* Analitik ve Trafik Verileri: Google Analytics 4 altyapısı aracılığıyla IP adresiniz anonimleştirilerek; tarayıcı türünüz, cihaz modeliniz, ziyaret ettiğiniz haber sayfaları ve sitede kalma süreniz istatistiki amaçlarla kaydedilir.
* İletişim ve Bülten Verileri: E-posta bültenimize abone olduğunuzda veya basın bülteni gönderdiğinizde ilettiğiniz e-posta adresi ve ad-soyad bilgileri, yalnızca onay verdiğiniz bültenlerin iletimi amacıyla saklanır; üçüncü şahıslarla paylaşılmaz veya satılmaz.

2. Çerez (Cookie) Kullanımı ve Türleri
Sitemizde sunulan yayıncılık hizmetlerinin kesintisiz işlemesi ve kişiselleştirilmiş reklam/içerik sunumu için çerezler kullanılmaktadır:
* Zorunlu Çerezler: Sitenin temel fonksiyonlarının (oturum açma, çerez tercihlerini saklama) çalışması için şarttır.
* Analitik Çerezler: Ziyaretçi davranışlarını analiz ederek en çok okunan haber kategorilerini ve kullanıcı etkileşimini tespit etmemizi sağlar.
* Pazarlama ve AdSense Çerezleri: Google AdSense ve yetkili reklam ortaklarımız tarafından, ilgi alanlarınıza uygun kişiselleştirilmiş reklamlar sunmak amacıyla üçüncü taraf çerezleri kullanılır.

3. Google AdSense ve Üçüncü Taraf Reklamcılık
* Üçüncü taraf satıcı olarak Google, sitemizde reklam yayınlamak için çerezlerden yararlanır.
* Google'ın DART çerezlerini kullanması, sitemize ve İnternet'teki diğer sitelere yaptığınız ziyaretlere dayalı olarak reklamlar sunmasını sağlar.
* Ziyaretçiler, Google Reklam ve İçerik Ağı Gizlilik Politikası sayfasını ziyaret ederek DART çerezinin kullanımını devre dışı bırakabilirler.

4. KVKK / GDPR Kapsamındaki Haklarınız
6698 sayılı KVKK'nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, verilerin düzeltilmesini veya silinmesini isteme haklarına sahiptir. Tüm taleplerinizi iletisim@webdehepseek.com e-posta adresine iletebilirsiniz.`
  },
  terms: {
    title: "Kullanım Koşulları ve Yayın Hakları",
    content: `WebdeHepSeek Journal Yayın Hakları ve Kullanım Şartları

1. Yayın Etiği ve Telif Hakları
WebdeHepSeek platformunda yayınlanan tüm özel analizler, grafikler, finans yorumları, otonom haber akışları ve editoryal içerikler 5846 Sayılı Fikir ve Sanat Eserleri Kanunu ile uluslararası telif hakları antlaşmaları uyarınca koruma altındadır.

2. İçerik Alıntılama Kuralları
Haber ve analizlerimiz, aktif hiperlink (Backlink) verilerek ve "WebdeHepSeek" kaynak gösterilerek makul seviyede alıntılanabilir. İçeriğin tamamının izinsiz kopyalanması, otomatik botlarla çekilmesi veya ticari amaçla dağıtılması yasaktır.

3. Yatırım Tavsiyesi Muafiyeti (Disclaimer)
Sitemizde yer alan finansal analizler, kripto varlık değerlendirmeleri, piyasa indeksleri ve hisse senedi yorumları hiçbir şekilde "Yatırım Tavsiyesi" (YTD) niteliğinde değildir. Yatırım kararlarınızı yetkili lisanslı yatırım danışmanlarına danışarak almanız gerekmektedir.

4. Sorumluluk Sınırı
Platformumuz, üçüncü taraf kaynaklardan veya otonom veri akışlarından elde edilen bilgilerin anlık doğruluğunu garanti etmekle birlikte, doğrudan ya da dolaylı olarak doğabilecek maddi/manevi zararlardan sorumlu tutulamaz.`
  },
  cookies: {
    title: "Çerez (Cookie) Aydınlatma Bildirimi",
    content: `WebdeHepSeek Çerez Aydınlatma Bildirimi

Sitemizi ziyaret ettiğinizde cihazınıza yerleştirilen çerezler (cookies), daha hızlı ve güvenli bir kullanıcı deneyimi sunabilmek amacıyla kullanılmaktadır.

Çerez Yönetimi:
Tarayıcınızın ayarlar menüsünden çerezleri istediğiniz zaman engelleyebilir veya silebilirsiniz. Ancak zorunlu çerezlerin kapatılması durumunda platformun bazı fonksiyonları kısıtlanabilir.

Google AdSense & İletişim:
Reklam ortaklarımız ilgi alanlarınıza özel içerik sunmak için çerez verilerinden faydalanabilir. Detaylı bilgi veya veri silme talepleri için: iletisim@webdehepseek.com`
  }
};
