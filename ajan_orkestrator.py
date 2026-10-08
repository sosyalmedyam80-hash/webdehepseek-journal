import urllib.request
import xml.etree.ElementTree as ET
import json
import os
import datetime
import re

# Gemini 2.0 Flash API Key & URL
GEMINI_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_KEY}"

# RSS Feed sources
RSS_FEEDS = [
    "https://feeds.feedburner.com/reuters/technologyNews",
    "https://www.theverge.com/rss/index.xml",
    "https://cointelegraph.com/rss",
    "https://techcrunch.com/feed/"
]

# Category Tiers Matrix (Engagement & Revenue Weighted)
CATEGORY_TIERS = {
    "TIER_1": {
        "weight": 3,
        "description": "En Yüksek Gelir ve İlgi - 5-6 Derinlemesine Analiz & Affiliate CTA",
        "categories": [
            "Finans & Küresel Piyasalar",
            "Yapay Zeka & Gelecek",
            "Kripto & Web3",
            "SaaS & Bulut Yazılımları"
        ],
        "affiliate_ctas": {
            "Finans & Küresel Piyasalar": {
                "title": "Borsa & Emtia İşlemlerinde %20 Komisyon İndirimi",
                "text": "WebdeHepSeek okurlarına özel VIP yatırım hesabı ile BIST ve ABD borsalarında sıfır komisyonlu işlem yapın.",
                "badge": "YATIRIM FIRSATI",
                "buttonText": "Ücretsiz Yatırım Hesabı Aç",
                "link": "https://webdehepseek.com/affiliate/borsa"
            },
            "Yapay Zeka & Gelecek": {
                "title": "Enterprise AI & LLM Cloud API 100$ Ücretsiz Kredi",
                "text": "Yapay zeka agent modellerinizi ölçeklendirmek için kurumsal bulut altyapısına hemen geçiş yapın.",
                "badge": "YAPAY ZEKA ENTEGRASYONU",
                "buttonText": "100$ AI Kredisini Al",
                "link": "https://webdehepseek.com/affiliate/ai-cloud"
            },
            "Kripto & Web3": {
                "title": "Binance & OKX VIP Kayıt + 100 USDT Hoş Geldin Bonusu",
                "text": "Kripto varlıklarınızı soğuk cüzdan güvencesiyle yönetin ve otomatik al-sat botlarını ücretsiz deneyin.",
                "badge": "KRİPTO ÖZEL TEKLİF",
                "buttonText": "VIP Bonusu Tanımla",
                "link": "https://webdehepseek.com/affiliate/crypto"
            },
            "SaaS & Bulut Yazılımları": {
                "title": "Cloudways & Hetzner Sunucu Altyapısında %30 İndirim",
                "text": "SaaS uygulamanızı NVMe SSD destekli yüksek performanslı bulut sunucularda %99.99 uptime ile barındırın.",
                "badge": "BULUT SUNUCU SPONSORU",
                "buttonText": "Sunucu Sunumunu İncele",
                "link": "https://webdehepseek.com/affiliate/saas-cloud"
            }
        }
    },
    "TIER_2": {
        "weight": 2,
        "description": "Yüksek Trafik & Trendler - 3-4 Güncel Haber",
        "categories": [
            "Teknoloji & Dijital Dönüşüm",
            "Siber Güvenlik & Veri Koruma",
            "Otomotiv & Mobilite",
            "Girişimcilik & Startup"
        ]
    },
    "TIER_3": {
        "weight": 1,
        "description": "Destekleyici & Niş Alanlar - 1-2 Özet İçerik",
        "categories": [
            "Yaşam & Sağlık",
            "Bilim & Uzay",
            "Eğitim & Kariyer",
            "Kişisel Finans",
            "Siyaset & Jeopolitik",
            "Emlak & Gayrimenkul",
            "AI Araç Rehberi",
            "Sosyal Medya & İçerik",
            "Oyun & Espor",
            "Spor & Performans"
        ]
    }
}

CATEGORY_IMAGES = {
    "Teknoloji & Dijital Dönüşüm": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "Yapay Zeka & Gelecek": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    "Finans & Küresel Piyasalar": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    "Kripto & Web3": "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80",
    "SaaS & Bulut Yazılımları": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "Siber Güvenlik & Veri Koruma": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "Otomotiv & Mobilite": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "Girişimcilik & Startup": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    "Yaşam & Sağlık": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80",
    "Bilim & Uzay": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "Eğitim & Kariyer": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    "Kişisel Finans": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    "Siyaset & Jeopolitik": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    "Emlak & Gayrimenkul": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    "AI Araç Rehberi": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    "Sosyal Medya & İçerik": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    "Oyun & Espor": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
    "Spor & Performans": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80"
}

TURKISH_MONTHS = {
    "January": "Ocak", "February": "Şubat", "March": "Mart", "April": "Nisan",
    "May": "Mayıs", "June": "Haziran", "July": "Temmuz", "August": "Ağustos",
    "September": "Eylül", "October": "Ekim", "November": "Kasım", "December": "Aralık"
}

TURKISH_TOPIC_TITLES = {
    "Finans & Küresel Piyasalar": [
        "Fed Faiz Kararı Sonrası Küresel Piyasalarda Dev Dalgalanma: Borsa ve Emtia Analizi",
        "Borsa İstanbul'da Teknoloji Hisselerine Rekor Yabancı Sermaye Girişi",
        "Küresel Enflasyon Baskısı ve Merkez Bankalarının 2026 Dijital Para Stratejisi",
        "Sermaye Piyasalarında Algoritmik Ticaret Hacmi %65 Seviyesine Ulaştı",
        "Uluslararası Tahvil Piyasaları ve Gelişmekte Olan Ülke Risk Primleri Analizi",
        "Makro Ekonomi Raporu: Büyüme Rakamları ve Sanayi Üretim Endeksi Verileri"
    ],
    "Yapay Zeka & Gelecek": [
        "AGI Seviyesine Bir Adım Daha: Otonom Akıl Yürütme ve Nöral Ağ Donanımları",
        "Yapay Zeka Veri Merkezlerinde Enerji Devrimi: Nükleer ve Yeşil Enerji İş Birlikleri",
        "Kurumsal LLM Entegrasyonlarında Veri Mahremiyeti ve Güvenlik Protokolleri",
        "Generative AI Sistemlerinin İş Gücü ve Yazılım Sektörüne Makro Etkileri",
        "Derin Öğrenme Algoritmalarında Terabayt Düzeyinde Model Eğitim Verimliliği",
        "Otonom Yazılım Ajanları (AI Agents) Şirket Operasyonlarını Devralıyor"
    ],
    "Kripto & Web3": [
        "Bitcoin ve Ethereum Katman-2 Ağlarında Toplam Kilitli Değer Rekoru Kırıldı",
        "Kripto Varlık Düzenlemesi Resmileşti: Kurumsal Fonların Web3 Girişi Hızlandı",
        "Merkeziyetsiz Finans (DeFi) Protokollerinde Sıfır Bilgi Kanıtı (ZKP) Devrimi",
        "Web3 Akıllı Sözleşmelerinde Otomatik AI Güvenlik Denetimi Standartları",
        "Küresel Kripto Piyasası Boğa Sezonu: On-Chain Veriler Ne Söylüyor?",
        "CBDC ve Stablecoin Entegrasyonları: Dijital Ödemelerde Yeni Çağ"
    ],
    "SaaS & Bulut Yazılımları": [
        "SaaS Girişimlerinde Büyüme Yılı: Bulut Sunucu Mimarilerinde Devrim",
        "Multi-Tenant Bulut Veri Tabanlarında Yüksek Erişilebilirlik ve NVMe Performansı",
        "Yazılım Hizmetlerinde (SaaS) Yapay Zeka Copilot Entegrasyon Standartları",
        "Kurumsal Bulut Depolama Maliyetlerinde %40 Verimlilik Sağlayan Yeni Altyapı",
        "Mikro-SaaS Ekosistemi ve Küresel Pazaryeri Başarı Hikayeleri",
        "DevOps ve Sunucusuz (Serverless) Mimari Trendleri Raporu"
    ],
    "Teknoloji & Dijital Dönüşüm": [
        "Küresel Çip Üretiminde Kuantum Sınırı Aşıldı: Altyapılar Yenileniyor",
        "6G Kablosuz Ağ Protokollerinde Terahertz Frekans Rekoru Kırıldı",
        "Endüstri 5.0 ve Akıllı Fabrikalar: İnsan-Robot Hibrit Dönemi",
        "SaaS Yazılımlarında Yapay Zeka Entegrasyonları Hız Kesmiyor"
    ],
    "Siber Güvenlik & Veri Koruma": [
        "Post-Kuantum Şifreleme Standartları Finansal Ağlara Entegre Ediliyor",
        "Sıfır Güven (Zero Trust) Mimarilerinde Kurumsal Güvenlik Trendleri",
        "Bulut Sunucu Güvenliği ve Otomatik Tehdit Tespit Sistemleri"
    ],
    "Otomotiv & Mobilite": [
        "Otonom Sürüş Teknolojilerinde Seviye 4 Sürücüsüz Araç Testleri Başarılı",
        "Elektrikli Araç Batarya Teknolojilerinde Şarj Süresi Yarıya İndi",
        "Akıllı Şehir Mobilite Altyapıları ve Otonom Toplu Taşıma"
    ],
    "Girişimcilik & Startup": [
        "Girişim Sermayesi (VC) Fonlarında Teknolojiye Rekor Yatırım Hacmi",
        "Unicorn Adayı Yerli Girişimler Küresel Pazara Açılıyor",
        "Startup Kuluçka Merkezleri ve Melek Yatırımcı Ağları Raporu"
    ],
    "Yaşam & Sağlık": [
        "Biyoteknoloji ve Gen Tedavisinde Kişiselleştirilmiş Tıp Devrimi",
        "Dijital Sağlık Takip Sistemleri ve Giyilebilir Teknoloji Trendleri"
    ],
    "Bilim & Uzay": [
        "Derin Uzay Teleskoplarından Gelen Yeni Verilerle Evrenin Yaşı Tartışılıyor",
        "Kuantum Fizik Deneylerinde Süper İletkenlik Rekoru Kırıldı"
    ],
    "Eğitim & Kariyer": [
        "Geleceğin Meslekleri Raporu: Yapay Zeka ve Veri Mühendisliği Ön Planda",
        "Uzaktan Çalışma ve Hibrit Ofis Kültüründe Performans Yönetimi"
    ],
    "Kişisel Finans": [
        "Enflasyona Karşı Birikimleri Koruma Rehberi: Portföy Çeşitlendirmesi",
        "Bireysel Emeklilik ve Fon Seçimi Stratejileri"
    ]
}

def clean_html(text):
    if not text:
        return ""
    clean = re.sub(r'<[^>]+>', '', text)
    clean = re.sub(r'https?://\S+', '', clean)
    clean = re.sub(r'\[.*?\]', '', clean)
    return clean.strip()

def fetch_raw_news():
    items = []
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    for feed in RSS_FEEDS:
        try:
            req = urllib.request.Request(feed, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as res:
                root = ET.fromstring(res.read())
                for item in root.findall('.//item')[:15]:
                    t = item.find('title').text if item.find('title') is not None else ""
                    d = item.find('description').text if item.find('description') is not None else ""
                    t_clean = clean_html(t)
                    d_clean = clean_html(d)
                    if t_clean:
                        items.append({"title": t_clean, "desc": d_clean})
        except Exception:
            pass
    return items[:54]

def classify_tier_and_category(raw_title, raw_desc):
    low_title = raw_title.lower()
    low_desc = raw_desc.lower()

    if any(k in low_title or k in low_desc for k in ["bitcoin", "crypto", "blockchain", "ethereum", "solana", "token", "coin", "sec", "binance", "defi"]):
        return "TIER_1", "Kripto & Web3", "Kripto Piyasalar & Blockchain"
    elif any(k in low_title or k in low_desc for k in ["ai", "artificial intelligence", "openai", "chatgpt", "claude", "gemini", "llm", "robot", "nvidia", "agi"]):
        return "TIER_1", "Yapay Zeka & Gelecek", "Yapay Zeka & Akıl Yürütme"
    elif any(k in low_title or k in low_desc for k in ["fed", "inflation", "stock", "market", "bank", "invest", "economy", "reuters", "dollar", "trade", "bist", "interest"]):
        return "TIER_1", "Finans & Küresel Piyasalar", "Makro Finans & Borsa"
    elif any(k in low_title or k in low_desc for k in ["saas", "cloud", "aws", "azure", "server", "hosting", "devops", "software", "api"]):
        return "TIER_1", "SaaS & Bulut Yazılımları", "Bulut & Kurumsal Yazılım"
    elif any(k in low_title or k in low_desc for k in ["cyber", "hack", "security", "data", "privacy", "breach", "firewall", "zero trust"]):
        return "TIER_2", "Siber Güvenlik & Veri Koruma", "Siber Güvenlik & Koruma"
    elif any(k in low_title or k in low_desc for k in ["car", "ev", "electric", "autonomous", "vehicle", "tesla", "togg", "mobility"]):
        return "TIER_2", "Otomotiv & Mobilite", "Elektrikli Araçlar & Otonom Sürüş"
    elif any(k in low_title or k in low_desc for k in ["startup", "venture", "vc", "funding", "entrepreneur", "girişim"]):
        return "TIER_2", "Girişimcilik & Startup", "Girişim Sermayesi & Yatırım"
    elif any(k in low_title or k in low_desc for k in ["health", "biotech", "medical", "gene", "pharma"]):
        return "TIER_3", "Yaşam & Sağlık", "Biyoteknoloji & Tıp"
    elif any(k in low_title or k in low_desc for k in ["space", "nasa", "physics", "quantum", "science"]):
        return "TIER_3", "Bilim & Uzay", "Kuantum & Uzay"
    elif any(k in low_title or k in low_desc for k in ["personal finance", "saving", "retirement", "portfolio"]):
        return "TIER_3", "Kişisel Finans", "Bireysel Yatırım & Portföy"
    else:
        return "TIER_2", "Teknoloji & Dijital Dönüşüm", "Piyasa & Teknoloji Raporları"

def generate_algorithmic_content(tier, cat, subcat, index):
    # Retrieve title list or fallback
    title_list = TURKISH_TOPIC_TITLES.get(cat, TURKISH_TOPIC_TITLES["Teknoloji & Dijital Dönüşüm"])
    tr_title = title_list[index % len(title_list)]

    summary = f"WebdeHepSeek Algoritmik Editör Masası tarafından hazırlanan bu {tier} analiz raporunda, {cat.lower()} alanında yaşanan en son gelişmeler ve sektörel etkiler 5N1K formatında değerlendirilmektedir."

    if tier == "TIER_1":
        content_sections = [
            {
                "id": f"sec-{index+1}-1",
                "heading": "1. Küresel Makro Piyasa Dönüm Noktası ve Veri Analizi",
                "body": f"Küresel finans ve teknoloji ekosisteminde {cat.lower()} alanında yaşanan son gelişmeler, kurumsal yatırımcılar ve sektör liderleri için hayati önem taşıyan bir dönüm noktasına işaret etmektedir. WebdeHepSeek Analitik Veri Masası'nın derlediği makro verilere göre, piyasa hacminde %35'i aşan bir hareketlilik kaydedilmiştir."
            },
            {
                "id": f"sec-{index+1}-2",
                "heading": "2. Kurumsal Adaptasyon ve Stratejik Altyapı Yatırımları",
                "body": f"Pazar lideri kurumların {cat.lower()} odaklı altyapı hamleleri, önümüzdeki çeyrek dönemin ana stratejisini belirlemektedir. Özellikle veri güvenliği, otomasyon ve verimlilik başlıklarında atılan adımlar, geleneksel iş modellerini hızla dönüştürmektedir."
            },
            {
                "id": f"sec-{index+1}-3",
                "heading": "3. Risk Faktörleri ve Regülasyon Standartları",
                "body": f"Sektörel uzmanlar, hızlı büyüme sürecinde ortaya çıkabilecek regülasyon ve uyum risklerine dikkat çekmektedir. Küresel otoritelerin yeni nesil standartları belirleme çabası, pazardaki rekabet dengelerini yeniden şekillendirmektedir."
            },
            {
                "id": f"sec-{index+1}-4",
                "heading": "4. 5N1K Sonuç Raporu ve Gelecek Öngörüsü",
                "body": f"Özetle; {cat.lower()} başlığında gerçekleşen bu stratejik atılım, orta ve uzun vadeli yatırım kararlarını doğrudan etkileyecek güce sahiptir. WebdeHepSeek Journal, analitik raporları ve anlık veri akışlarıyla okurlarına rehberlik etmeye devam edecektir."
            }
        ]
        full_content = "\n\n".join([sec["body"] for sec in content_sections])
    elif tier == "TIER_2":
        content_sections = [
            {
                "id": f"sec-{index+1}-1",
                "heading": "1. Sektörel Trendler ve Teknoloji Atılımları",
                "body": f"Teknoloji ve mobilite dünyasında {cat.lower()} alanında gerçekleşen son gelişmeler, kullanıcı deneyimini ve endüstriyel standartları üst seviyeye taşımaktadır. Yapılan saha testleri verimlilikte belirgin bir artış göstermektedir."
            },
            {
                "id": f"sec-{index+1}-2",
                "heading": "2. Pazar Payı ve Rekabet Dinamikleri",
                "body": f"Şirketlerin {cat.lower()} yatırımları, yerel ve küresel pazarlardaki rekabet avantajını doğrudan etkilemektedir. Önümüzdeki günlerde pazara sunulacak yeni çözümler rekabeti kızıştıracaktır."
            },
            {
                "id": f"sec-{index+1}-3",
                "heading": "3. Gelecek Vizyonu ve Değerlendirme",
                "body": f"Gelişmelerin hızı, sektörün dijital dönüşüm takvimini öne çekmiştir. WebdeHepSeek Yayın Grubu, gelişmeleri anlık olarak takip etmektedir."
            }
        ]
        full_content = "\n\n".join([sec["body"] for sec in content_sections])
    else: # TIER_3
        content_sections = [
            {
                "id": f"sec-{index+1}-1",
                "heading": "1. Özet Gelişmeler ve Saha Verileri",
                "body": f"{cat} alanında kaydedilen son güncellemeler, disiplinler arası araştırmalara yeni bir boyut kazandırmaktadır. Konuyla ilgili saha çalışmaları devam etmektedir."
            },
            {
                "id": f"sec-{index+1}-2",
                "heading": "2. Sektörel Değerlendirme",
                "body": f"Uzmanlar, {cat.lower()} konusundaki yeniliklerin kısa sürede günlük hayata entegre olacağını öngörmektedir."
            }
        ]
        full_content = "\n\n".join([sec["body"] for sec in content_sections])

    return tr_title, summary, full_content, content_sections

def run_news_factory():
    raw_list = fetch_raw_news()

    now = datetime.datetime.now()
    month_tr = TURKISH_MONTHS.get(now.strftime("%B"), now.strftime("%B"))
    today_str = f"{now.strftime('%d')} {month_tr} {now.strftime('%Y')}"

    # Target weighted distribution
    # Tier 1 categories produce 5-6 articles, Tier 2 produces 3-4, Tier 3 produces 1-2
    tier1_ctas = CATEGORY_TIERS["TIER_1"]["affiliate_ctas"]
    
    tier_counts = {"TIER_1": 0, "TIER_2": 0, "TIER_3": 0}
    articles = []

    # Pre-populate guaranteed Tier 1 & Tier 2 & Tier 3 articles to hit exactly 54 total articles
    all_target_categories = [
        # TIER 1 (High Revenue) - 24 articles total (6 per category)
        ("TIER_1", "Finans & Küresel Piyasalar", "Makro Finans & Borsa"),
        ("TIER_1", "Yapay Zeka & Gelecek", "Yapay Zeka & Akıl Yürütme"),
        ("TIER_1", "Kripto & Web3", "Kripto Piyasalar & Blockchain"),
        ("TIER_1", "SaaS & Bulut Yazılımları", "Bulut & Kurumsal Yazılım"),
        # TIER 2 (High Traffic) - 16 articles total (4 per category)
        ("TIER_2", "Teknoloji & Dijital Dönüşüm", "Piyasa & Teknoloji Raporları"),
        ("TIER_2", "Siber Güvenlik & Veri Koruma", "Siber Güvenlik & Koruma"),
        ("TIER_2", "Otomotiv & Mobilite", "Elektrikli Araçlar & Otonom Sürüş"),
        ("TIER_2", "Girişimcilik & Startup", "Girişim Sermayesi & Yatırım"),
        # TIER 3 (Supporting Niche) - 14 articles total
        ("TIER_3", "Yaşam & Sağlık", "Biyoteknoloji & Tıp"),
        ("TIER_3", "Bilim & Uzay", "Kuantum & Uzay"),
        ("TIER_3", "Eğitim & Kariyer", "Kariyer & Eğitim"),
        ("TIER_3", "Kişisel Finans", "Bireysel Yatırım & Portföy"),
        ("TIER_3", "Siyaset & Jeopolitik", "Jeopolitik & Ekonomi"),
        ("TIER_3", "Emlak & Gayrimenkul", "Emlak Piyasası & Yatırım"),
        ("TIER_3", "AI Araç Rehberi", "AI Araçları & İpuçları")
    ]

    article_index = 1

    # Generate weighted articles pool
    for tier_target, cat_target, subcat_target in all_target_categories:
        # Determine count per category according to Tier matrix rules
        count_for_cat = 6 if tier_target == "TIER_1" else (4 if tier_target == "TIER_2" else 2)
        
        for k in range(count_for_cat):
            tr_title, summary, full_content, content_sections = generate_algorithmic_content(tier_target, cat_target, subcat_target, article_index)
            img = CATEGORY_IMAGES.get(cat_target, CATEGORY_IMAGES["Teknoloji & Dijital Dönüşüm"])

            art_obj = {
                "id": f"whs-{article_index}",
                "title": tr_title,
                "summary": summary,
                "excerpt": summary,
                "category": cat_target,
                "subcategory": subcat_target,
                "content": full_content,
                "sections": content_sections,
                "author": "Ahmet Karadağ & Algoritmik Yayın Grubu",
                "authorTitle": "Kurucu & Baş Editör",
                "date": today_str,
                "readTime": "4 dk" if tier_target == "TIER_1" else "3 dk",
                "imageUrl": img,
                "canonicalUrl": f"https://webdehepseek.com/haber/whs-{article_index}",
                "tags": [cat_target.split()[0], tier_target, "Algoritmik Yayın"],
                "tier": tier_target,
                "revenueWeight": 3 if tier_target == "TIER_1" else (2 if tier_target == "TIER_2" else 1)
            }

            # Attach Affiliate CTA if Tier 1
            if tier_target == "TIER_1" and cat_target in tier1_ctas:
                art_obj["affiliateCta"] = tier1_ctas[cat_target]

            articles.append(art_obj)
            tier_counts[tier_target] += 1
            article_index += 1

    os.makedirs("public", exist_ok=True)
    with open("public/haberler.json", "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    print(f"==================================================")
    print(f"DİNAMİK İLGİ VE GELİR ODANLI HABER DAĞITIM MOTORU BAŞARIYLA ÇALIŞTI")
    print(f"Toplam Üretilen Haber: {len(articles)}")
    print(f"TIER 1 (En Yüksek Gelir / 6 Analiz): {tier_counts['TIER_1']} haber")
    print(f"TIER 2 (Yüksek Trafik / 4 Haber): {tier_counts['TIER_2']} haber")
    print(f"TIER 3 (Destekleyici / 2 Özet): {tier_counts['TIER_3']} haber")
    print(f"Görsel ve Affiliate CTA kartları public/haberler.json dosyasına yazıldı.")
    print(f"==================================================")

if __name__ == "__main__":
    run_news_factory()
