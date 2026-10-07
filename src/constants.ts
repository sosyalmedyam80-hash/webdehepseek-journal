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
  sentiment?: string;
  executiveSummary?: string;
  correctionLog?: string;
  canonicalUrl?: string;
  sharesCount?: number;
  reactions?: {
    like: number;
    analytic: number;
    mindblown: number;
  };
  sections?: ContentSection[];
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
  "YapayZeka", "AGI", "Bitcoin", "BIST100", "Kuantum", "Togg", 
  "Girişimcilik", "6G", "DeFi", "WallStreet", "LiDAR", "SiberGüvenlik",
  "OtonomAraçlar", "NükleerFüzyon", "Web3", "UzayLojistiği"
];

export const AUTHORS_LIST: AuthorProfile[] = [
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
  },
  {
    id: "auth-3",
    name: "Ahmet Erdem",
    title: "Makro Ekonomi & Borsa Analisti",
    bio: "Sermaye piyasaları, BIST 100 şirket değerlemeleri ve küresel makroekonomik analizler yazarı.",
    avatarLetter: "A",
    articlesCount: 29,
    verified: true
  },
  {
    id: "auth-4",
    name: "Kaan Erdem",
    title: "Mobilite & Otomotiv Editörü",
    bio: "Elektrikli araçlar, batarya kimyaları ve LiDAR otonom sürüş teknolojileri uzmanı gazeteci.",
    avatarLetter: "K",
    articlesCount: 25,
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
  { symbol: "USD/TRY", label: "USD/TRY", value: "38.45 ₺", change: "+0.25%", isPositive: true },
  { symbol: "EUR/TRY", label: "EUR/TRY", value: "41.80 ₺", change: "+0.18%", isPositive: true },
  { symbol: "BIST100", label: "BIST 100", value: "10,845.50", change: "+1.42%", isPositive: true },
  { symbol: "ALTIN", label: "Gram Altın", value: "3,380 ₺", change: "+0.95%", isPositive: true },
  { symbol: "ONS", label: "Ons Altın", value: "$2,890.00", change: "+0.54%", isPositive: true },
  { symbol: "BTC/USD", label: "Bitcoin (BTC)", value: "$152,400", change: "+3.45%", isPositive: true },
  { symbol: "ETH/USD", label: "Ethereum (ETH)", value: "$4,480", change: "+2.30%", isPositive: true },
  { symbol: "SP500", label: "S&P 500", value: "6,120.80", change: "+0.68%", isPositive: true }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "AGI", definition: "Yapay Genel Zeka - İnsan düzeyinde zihinsel muhakeme yeteneğine sahip otonom AI sistemleri." },
  { term: "LLM", definition: "Büyük Dil Modeli - Milyarlarca parametreyle eğitilmiş gelişmiş metin ve mantık işleme yapay zekası." },
  { term: "DeFi", definition: "Centralized olmayan, akıllı sözleşmelerle yürütülen ademi merkeziyetçi finans ekosistemi." },
  { term: "LiDAR", definition: "Işık tespiti ve uzaklık tayini sağlayan otonom araç sensör teknolojisi." },
  { term: "Qubit", definition: "Kuantum bilgisayarlarında aynı anda hem 0 hem 1 durumunda bulunabilen temel bilgi birimi." },
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

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "NEWS-101",
    title: "Yapay Zeka Modellerinde Yeni Çağ: Akıl Yürütme Kapasitesi İnsan Düzeyini Aştı",
    excerpt: "Yeni nesil derin öğrenme mimarileri, karmaşık finansal analizlerde ve yazılım mühendisliğinde insan muhakeme yeteneğini geride bırakan sonuçlar üretiyor.",
    category: "Yapay Zeka & Gelecek",
    subcategory: "AGI (Yapay Genel Zeka)",
    date: "6 Ekim 2026",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    readTime: "5 dk",
    author: "Selin Yılmaz",
    authorTitle: "AI & Gelecek Teknolojileri Başeditörü",
    authorBio: "Yapay zeka modelleri, otonom ajans mimarileri ve makine öğrenimi etiği alanında küresel yayıncı ve teknoloji araştırmacısı.",
    verifiedSource: true,
    isEditorsChoice: true,
    sentiment: "Boğa (Bullish)",
    executiveSummary: "Son jenerasyon çok adımlı mantık zincirine sahip AI modelleri, karmaşık yazılım mimarilerinde %98 doğruluk oranı yakalayarak AGI yolculuğunda tarihi dönüm noktasını işaret ediyor.",
    sharesCount: 1240,
    reactions: { like: 342, analytic: 215, mindblown: 189 },
    correctionLog: "6 Ekim 2026 18:20: Derin öğrenme test parametrelerinin AB AI Act uyumluluk raporu eklendi.",
    canonicalUrl: "https://webdehepseek.com/haber/ai/akil-yurutme-kapasitesi-rekor",
    sections: [
      {
        id: "sec-1",
        heading: "1. Akıl Yürütme ve Çok Adımlı Mantık Çözümü (AGI Adımları)",
        body: "Son geliştirilen dil ve mantık modelleri, sadece metin üretmekle kalmayıp karmaşık matematik teoremlerini ve yazılım mimarilerini çok adımlı doğrulama zinciriyle (Chain of Thought) çözüme kavuşturuyor. AGI eşiği hiç olmadığı kadar yakın görünmektedir."
      },
      {
        id: "sec-2",
        heading: "2. Yazılım Mühendisliği ve Finansal Modellemede Dönüşüm",
        body: "Otonom kodlama sistemleri kurumsal seviyedeki kod tabanlarında güvenlik açıklarını saliseler içinde tespit edip yamayabiliyor. Finans sektöründe ise algoritmik alım-satım stratejileri anlık duygu analiziyle destekleniyor."
      },
      {
        id: "sec-3",
        heading: "3. Etik Çerçeve ve Güvenli AI Standartları",
        body: "Küresel regülatörler ve AB AI Act temsilcileri, modellerin hizalanması (Alignment) ve şeffaflık raporlaması konusunda yeni yayın ilkelerini zorunlu kılıyor."
      }
    ]
  },
  {
    id: "NEWS-102",
    title: "Bitcoin $152,400 Eşiğini Aşarak Rekor Kırdı: Kurumsal ETF Fonlarından Dev Nakit Girişi",
    excerpt: "Wall Street merkezli spot ETF fonlarının günlük giriş rekoru kırmasıyla birlikte borsalardaki soğuk cüzdan çekimleri son yılların en yüksek seviyesine ulaştı.",
    category: "Kripto & Web3",
    subcategory: "Bitcoin (BTC) Analiz",
    date: "6 Ekim 2026",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    readTime: "3 dk",
    author: "Metin Şahin",
    authorTitle: "Finans & Piyasa Başanalisti",
    authorBio: "Makro borsa hareketleri, kripto varlık zincir-üstü (On-Chain) verileri ve türev piyasalar uzmanı.",
    verifiedSource: true,
    isEditorsChoice: true,
    sharesCount: 890,
    reactions: { like: 280, analytic: 190, mindblown: 145 },
    canonicalUrl: "https://webdehepseek.com/haber/crypto/bitcoin-150k-rekor",
    sections: [
      {
        id: "sec-1",
        heading: "1. Kurumsal ETF Girişleri ve Borsa Arz Sıkışması",
        body: "BlackRock ve Fidelity fonlarına haftalık $2.4 milyarlık rekor net nakit akışı sağlandı. DeFi ekosisteminde kilitli toplam değer (TVL) rekor seviyelere yükseldi."
      },
      {
        id: "sec-2",
        heading: "2. On-Chain Veriler Ne Söylüyor?",
        body: "Uzun vadeli tutucuların (Long-Term Holders) cüzdanlarındaki birikim oranı %78 ile tarihi zirvesinde. Madenci rezervlerinde ise satış baskısı gözlenmiyor."
      }
    ]
  },
  {
    id: "NEWS-103",
    title: "BIST 100 Endeksi 10,845 Puanı Aşarak Yıllık Rekor Kırdı: Teknoloji Şirketleri Lider",
    excerpt: "Borsa İstanbul'da üçüncü çeyrek bilanço beklentilerinin üzerinde gelen büyüme rakamları, sanayi ve teknoloji hisselerine güçlü yabancı fon girişi sağladı.",
    category: "Finans & Küresel Piyasalar",
    subcategory: "Borsa İstanbul (BIST 100)",
    date: "6 Ekim 2026",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    readTime: "4 dk",
    author: "Ahmet Erdem",
    authorTitle: "Makro Ekonomi & Borsa Analisti",
    authorBio: "Sermaye piyasaları, BIST 100 şirket değerlemeleri ve küresel makroekonomik analizler yazarı.",
    verifiedSource: true,
    sharesCount: 650,
    reactions: { like: 195, analytic: 160, mindblown: 80 },
    canonicalUrl: "https://webdehepseek.com/haber/finance/bist100-rekor-yukselis",
    sections: [
      {
        id: "sec-1",
        heading: "1. BIST 100 Endeksinde Teknoloji ve İhracatçı Hisseler Öncü",
        body: "Üçüncü çeyrek kârlılık rasyoları açıklanan teknoloji ve ihracat odaklı sanayi şirketleri endeksin yükselişine %60 katkı sağlandı. Yabancı takas oranında son 6 ayın en hızlı artışı kaydedildi."
      },
      {
        id: "sec-2",
        heading: "2. Merkez Bankası Politikaları ve Piyasa Likiditesi",
        body: "Dezenflasyon patikasının kararlılıkla sürdürülmesi ve kredi derecelendirme kuruluşlarının not artırım beklentileri, yerli ve yabancı kurumsal yatırımcı güvenini pekiştiriyor."
      }
    ]
  },
  {
    id: "NEWS-104",
    title: "Togg T10F Sedan Modelinde Seviye 4 Otonom Sürüş Entegrasyonu Tamamlandı",
    excerpt: "Milli mobilite markamız Togg'un yeni sedan modeli, gelişmiş sensör füzyonu ve 600 km artırılmış menziliyle uluslararası sürüş testlerinde tam puan aldı.",
    category: "Otomotiv & Mobilite",
    subcategory: "Togg & Yerli Otomobil",
    date: "6 Ekim 2026",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    readTime: "4 dk",
    author: "Kaan Erdem",
    authorTitle: "Mobilite & Otomotiv Editörü",
    authorBio: "Elektrikli araçlar, batarya kimyaları ve LiDAR otonom sürüş teknolojileri uzmanı gazeteci.",
    verifiedSource: true,
    sharesCount: 520,
    reactions: { like: 240, analytic: 110, mindblown: 95 },
    canonicalUrl: "https://webdehepseek.com/haber/automotive/togg-t10f-otonom-surus",
    sections: [
      {
        id: "sec-1",
        heading: "1. Seviye 4 Otonom Sürüş ve LiDAR Füzyonu",
        body: "Togg T10F Sedan, tampon ve tavan sütunlarına entegre edilen 360 derece LiDAR ve ultra-hassas radar sensörleriyle sürücüsüz otonom sürüş testlerini sıfır hata ile tamamladı."
      },
      {
        id: "sec-2",
        heading: "2. Avrupa Pazarı İhracat Hedefleri",
        body: "Almanya ve İskandinav ülkelerinde ön sipariş süreci başlayan T10F, yüksek batarya verimliliği ve Trumore akıllı mobilite ekosistemiyle küresel rakiplerine kıyasla fiyat-performans avantajı sunuyor."
      }
    ]
  },
  {
    id: "NEWS-105",
    title: "Kuantum Bilgisayarlarda 10,000 Qubit Eşiği Aşıldı: Siber Güvenlik Mimarisi Değişiyor",
    excerpt: "Küresel çip devleri tarafından duyurulan yeni kuantum işlemcisi, klasik şifreleme yöntemlerini saniyeler içinde çözebilecek hesaplama gücüne erişti.",
    category: "Teknoloji & Dijital Dönüşüm",
    subcategory: "Kuantum Bilgisayarlar",
    date: "5 Ekim 2026",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    readTime: "6 dk",
    author: "Selin Yılmaz",
    authorTitle: "Siber Güvenlik & Kuantum Bilişim Direktörü",
    verifiedSource: true,
    sharesCount: 410,
    reactions: { like: 180, analytic: 155, mindblown: 110 },
    canonicalUrl: "https://webdehepseek.com/haber/tech/kuantum-bilgisayar-qubit-rekor"
  },
  {
    id: "NEWS-106",
    title: "Starship Mars Görevi İçi Geri Sayım Başladı: İlk İnsansız Kargo Filosu Yola Çıkıyor",
    excerpt: "SpaceX'in Kızıl Gezegen'e kalıcı üs kurma hedefi doğrultusunda hazırladığı 5 araçlık kargo filosu yörünge testlerini başarıyla tamamladı.",
    category: "Bilim & Uzay",
    subcategory: "Mars Kolonisi & Starship",
    date: "5 Ekim 2026",
    imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
    readTime: "5 dk",
    author: "Aylin Özkan",
    authorTitle: "Uzay & Bilim Araştırmacısı",
    verifiedSource: true,
    sharesCount: 390,
    reactions: { like: 165, analytic: 130, mindblown: 140 },
    canonicalUrl: "https://webdehepseek.com/haber/science/starship-mars-gorevi"
  }
];

export const LEGAL_DOCUMENTS = {
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    content: "WebdeHepSeeK Journal (6698 Sayılı Kişisel Verilerin Korunması Kanunu uyarınca), kullanıcılarımızın kişisel verilerinin gizliliğini korumayı en üst düzey ilke olarak benimser. Sitemizi ziyaretiniz sırasında elde edilen log kayıtları ve kullanıcı tercihleri yalnızca hizmet kalitesini artırmak amacıyla işlenir."
  },
  privacy: {
    title: "Gizlilik Politikası",
    content: "İşbu Gizlilik Politikası, WebdeHepSeeK platformu üzerinden toplanan verilerin nasıl kullanıldığını, saklandığını ve korunduğunu açıklamaktadır. Verileriniz üçüncü şahıslarla asla satılmaz veya rızanız olmadan paylaşılmaz."
  },
  terms: {
    title: "Kullanım Koşulları",
    content: "WebdeHepSeeK platformunda yayınlanan tüm haberler, borsa verileri, analizler ve telif hakkına tabi materyaller kaynak gösterilerek dahi izinsiz ticari amaçla kullanılamaz."
  },
  cookies: {
    title: "Çerez (Cookie) Politikası",
    content: "Sitemizde kullanıcı tecrübesini optimize etmek, oturum yönetimi sağlamak ve anonim istatistiksel analizler yürütmek amacıyla zorunlu ve analitik çerezler kullanılmaktadır."
  }
};
