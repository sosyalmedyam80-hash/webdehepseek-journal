import json
import os
import datetime

# 18 Categories and 3 deep articles each (54 articles total)
ARTICLES = [
    # 1. Teknoloji & Dijital Dönüşüm
    {
        "id": "NEWS-01",
        "title": "Kuantum Bilgisayarlarda 10,000 Qubit Eşiği Aşıldı: Post-Kuantum Şifrelemeye Geçiş Başladı",
        "excerpt": "Küresel çip üreticileri tarafından duyurulan yeni kuantum işlemcisi, klasik şifreleme yöntemlerini saniyeler içinde çözebilecek devasa bir hesaplama gücüne ulaştı.",
        "category": "Teknoloji & Dijital Dönüşüm",
        "subcategory": "Kuantum Bilgisayarlar",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
        "readTime": "6 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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
        "verifiedSource": True,
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

    # 2. Yapay Zeka & Gelecek
    {
        "id": "NEWS-04",
        "title": "AGI Seviyesine Bir Adım Daha: Otonom Muhakeme Yapabilen Llama-4 ve Claude-4 Modelleri",
        "excerpt": "Yapay Genel Zeka mimarisinde çığır açan yeni mantık zinciri (Chain of Thought) algoritmaları, karmaşık matematiksel teoremleri insandan hızlı çözüyor.",
        "category": "Yapay Zeka & Gelecek",
        "subcategory": "AGI (Yapay Genel Zeka)",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "readTime": "6 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "author": "Ahmet Karadağ & Teknoloji Masası",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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
        "verifiedSource": True,
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

    # 3. Kripto & Web3
    {
        "id": "NEWS-07",
        "title": "Bitcoin $150,000 Barajını Aşarak Yeni Zirve Yaptı: Spot ETF Girişleri Rekor Kırdı",
        "excerpt": "Kurumsal sermayenin ve emeklilik fonlarının doğrudan tahsisat yapmasıyla lider kripto para birimi Bitcoin tarihi seviyelerini yeniledi.",
        "category": "Kripto & Web3",
        "subcategory": "Bitcoin (BTC) Analiz",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1200&q=80",
        "readTime": "6 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 4. Finans & Küresel Piyasalar
    {
        "id": "NEWS-10",
        "title": "BIST 100 Rekor Tazeledi: Yabancı Sermaye Akışı ve Teknoloji Hisselerinde Güçlü Ralli",
        "excerpt": "Borsa İstanbul, yabancı kurumsal fon girişlerinin ivme kazanmasıyla 10,800 puan barajını aşarak tüm zamanların en yüksek seviyesini test etti.",
        "category": "Finans & Küresel Piyasalar",
        "subcategory": "Borsa İstanbul (BIST 100)",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 5. Siyaset & Strateji
    {
        "id": "NEWS-13",
        "title": "Milli Teknoloji Hamlesi ve Savunma Sanayii: KAAN ve KIZILELMA Seri Üretime Geçti",
        "excerpt": "Yerli 5. nesil savaş uçağı KAAN ve otonom insansız savaş uçağı KIZILELMA hava kuvvetleri envanterine katılarak ilk ihraç anlaşmalarına imza attı.",
        "category": "Siyaset & Strateji",
        "subcategory": "Savunma Sanayii (SİHA/Milli)",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 6. Sosyal Medya & Viral
    {
        "id": "NEWS-16",
        "title": "Creator Economy 2026 Raporu: Dijital İçerik Üreticilerinin Küresel Pazar Hacmi $480 Milyarı Aştı",
        "excerpt": "Geleneksel medya kanallarını geride bırakan içerik üretici ekosistemi, markaların reklam bütçelerinin ana odağı haline geldi.",
        "category": "Sosyal Medya & Viral",
        "subcategory": "Creator Economy",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 7. Spor & E-Spor
    {
        "id": "NEWS-19",
        "title": "2026 Dünya Kupası Teknolojik Yenilikleri: Çipli Toplar ve Anlık Otonom Ofsayt Tespiti",
        "excerpt": "Amerika, Kanada ve Meksika ortaklığında düzenlenen Dünya Kupası'nda devrim niteliğinde yapay zeka hakem asistanları sahaya indi.",
        "category": "Spor & E-Spor",
        "subcategory": "2026 Dünya Kupası Özel",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 8. Girişimcilik & Startup
    {
        "id": "NEWS-22",
        "title": "Türkiye'nin Yeni Unicorn'ları: Yapay Zeka ve SaaS Odaklı 3 Türk Girişimi Değerlemesini Katladı",
        "excerpt": "Silikon Vadisi fonlarından aldıkları yatırımlarla milyar dolar değerlemeyi aşan Türk girişimciler, küresel teknoloji pazarında fırtına estiriyor.",
        "category": "Girişimcilik & Startup",
        "subcategory": "Startup Hikayeleri & Unicorns",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 9. Yaşam & Sağlık
    {
        "id": "NEWS-25",
        "title": "Giyilebilir Biyometrik Sensörler ve Longevity: Erken Teşhiste %95 Başarı Oranı",
        "excerpt": "Akıllı saatler ve yüzükler, sürekli kan şekeri ve metabolik veri takibi yaparak kronik rahatsızlıkları yıllar öncesinden haber veriyor.",
        "category": "Yaşam & Sağlık",
        "subcategory": "Giyilebilir Sağlık Teknolojisi",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 10. Oyun & Eğlence
    {
        "id": "NEWS-28",
        "title": "Unreal Engine 6 ve Foto-Gerçekçi Oyunlar: Sinema İle Oyun Arasındaki Sınır Kalktı",
        "excerpt": "Epic Games tarafından tanıtılan yeni nesil oyun motoru Unreal Engine 6, gerçek zamanlı ışık izleme ve AI destekli karakterlerle nefes kesti.",
        "category": "Oyun & Eğlence",
        "subcategory": "Oyun Geliştirme (Unreal/Unity)",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 11. Bilim & Uzay
    {
        "id": "NEWS-31",
        "title": "SpaceX Starship Mars Görevi İçin Geri Sayım Başladı: İnsanlı İlk Gezegenler Arası Yolculuk",
        "excerpt": "Dünyanın en güçlü roketi Starship'in Mars yörüngesine kargo ve yaşam modülleri taşıyacak tarihi uçuş tarihi resmen açıklandı.",
        "category": "Bilim & Uzay",
        "subcategory": "Mars Kolonisi & Starship",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
        "readTime": "6 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 12. Eğitim & Kariyer
    {
        "id": "NEWS-34",
        "title": "2026 Yapay Zeka Kariyer Raporu: En Çok Aranan 10 Meslek ve $200k+ Maaş Skalası",
        "excerpt": "Prompt Mühendisliği, AI Etik Denetçiliği ve Otonom Sistem Mimarisi küresel iş gücü pazarının en yüksek maaşlı pozisyonları oldu.",
        "category": "Eğitim & Kariyer",
        "subcategory": "Kariyer Dönüşüm Rehberi",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 13. Emlak & Lüks Yatırım
    {
        "id": "NEWS-37",
        "title": "Küresel Lüks Gayrimenkul Endeksi: İstanbul, Dubai ve Londra Portföylerinde Rekor Değer",
        "excerpt": "Uluslararası yatırımcıların markalı konut projelerine olan ilgisiyle İstanbul ve Dubai lüks gayrimenkul fiyatlarında %40 prim yaptı.",
        "category": "Emlak & Lüks Yatırım",
        "subcategory": "Lüks Gayrimenkul Trendleri",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 14. Otomotiv & Mobilite
    {
        "id": "NEWS-40",
        "title": "Togg T10X ve T10F Yeni Nesil Otonom Güncellemesi Yayınlandı: Seviye 3 Otonom Sürüş",
        "excerpt": "Yerli mobilite doğuştan elektrikli Togg modelleri, otonom şerit değiştirme ve akıllı park özelliklerini içeren yeni yazılım paketini sundu.",
        "category": "Otomotiv & Mobilite",
        "subcategory": "Togg & Yerli Otomobil",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 15. SaaS & Bulut Yazılımları
    {
        "id": "NEWS-43",
        "title": "Kurumsal CRM ve Yapay Zeka Entegrasyonu: Müşteri Deneyiminde %300 Dönüşüm Oranı",
        "excerpt": "Bulut tabanlı müşteri ilişkileri yönetimi yazılımları, satış tahminleme ve e-posta yanıtlarını otonom olarak yönetiyor.",
        "category": "SaaS & Bulut Yazılımları",
        "subcategory": "CRM Sistemleri",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 16. Kişisel Finans & Sigorta
    {
        "id": "NEWS-46",
        "title": "Bireysel Emeklilik (BES) Devlet Katkısı %30'a Yükseltildi: Emeklilikte Fon Yönetimi",
        "excerpt": "Devlet katkısıyla güçlenen BES fonları, hisse ve altın ağırlıklı portföy tercihleriyle enflasyonun üzerinde getiri sağladı.",
        "category": "Kişisel Finans & Sigorta",
        "subcategory": "BES Fonları & Emeklilik",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 17. Siber Güvenlik & Veri Koruma
    {
        "id": "NEWS-49",
        "title": "Fidye Yazılımı (Ransomware) Saldırılarına Karşı 'Sıfır Güven (Zero Trust)' Mimarisi",
        "excerpt": "Kurumsal ağlarda hiçe sayılan yetkilendirme modeli Zero Trust, tüm kullanıcıları ve cihazları sürekli olarak doğrulamayı şart koşuyor.",
        "category": "Siber Güvenlik & Veri Koruma",
        "subcategory": "Fidye Yazılımı (Ransomware) Koruması",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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

    # 18. Yapay Zeka Araç Rehberi
    {
        "id": "NEWS-52",
        "title": "En İyi AI Metin ve Makale Yazma Araçları 2026: GPT-5, Claude-3.5 ve Gemini Ultra Karşılaştırması",
        "excerpt": "Akademik metinlerden pazarlama içeriklerine kadar profesyonellerin en çok tercih ettiği yapay zeka modelleri test edildi.",
        "category": "Yapay Zeka Araç Rehberi",
        "subcategory": "AI Metin Yazma Araçları",
        "date": "7 Ekim 2026",
        "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        "readTime": "5 dk",
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
        "isEditorsChoice": True,
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
        "verifiedSource": True,
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
        "author": "Ahmet Karadağ",
        "authorTitle": "Kurucu & Genel Yayın Yönetmeni",
        "verifiedSource": True,
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
]

def generate_public_files():
    os.makedirs("public", exist_ok=True)
    
    # 1. Write public/haberler.json
    with open("public/haberler.json", "w", encoding="utf-8") as f:
        json.dump(ARTICLES, f, ensure_ascii=False, indent=2)
    print("public/haberler.json successfully updated with 54 articles.")

    # 2. Write public/feed.xml (RSS 2.0 / Google News XML)
    rss_items = []
    for a in ARTICLES:
        title = a["title"].replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        excerpt = a["excerpt"].replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        cat = a["category"].replace("&", "&amp;")
        url = f"https://webdehepseek.com/haber/{a['id']}"
        rss_items.append(f"""    <item>
      <title>{title}</title>
      <link>{url}</link>
      <guid isPermaLink="true">{url}</guid>
      <pubDate>Wed, 07 Oct 2026 12:00:00 GMT</pubDate>
      <category>{cat}</category>
      <description>{excerpt}</description>
    </item>""")

    feed_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>WebdeHepSeeK | Teknoloji &amp; Finans Haber Portalı</title>
    <link>https://webdehepseek.com</link>
    <description>Teknoloji, Yapay Zeka, Kripto, Finans, SaaS, Siber Güvenlik ve Girişimcilik Haber Portalı</description>
    <language>tr-TR</language>
    <atom:link href="https://webdehepseek.com/feed.xml" rel="self" type="application/rss+xml" />
{chr(10).join(rss_items)}
  </channel>
</rss>"""

    with open("public/feed.xml", "w", encoding="utf-8") as f:
        f.write(feed_xml)
    print("public/feed.xml successfully created with 54 articles.")

    # 3. Write public/sitemap.xml (Google News Sitemap)
    sitemap_items = []
    for a in ARTICLES:
        title = a["title"].replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        url = f"https://webdehepseek.com/haber/{a['id']}"
        sitemap_items.append(f"""  <url>
    <loc>{url}</loc>
    <lastmod>2026-10-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <news:news>
      <news:publication>
        <news:name>WebdeHepSeeK Journal</news:name>
        <news:language>tr</news:language>
      </news:publication>
      <news:publication_date>2026-10-07</news:publication_date>
      <news:title>{title}</news:title>
    </news:news>
  </url>""")

    sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://webdehepseek.com/</loc>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
{chr(10).join(sitemap_items)}
</urlset>"""

    with open("public/sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_xml)
    print("public/sitemap.xml successfully created with 54 articles.")

if __name__ == "__main__":
    generate_public_files()
