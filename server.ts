import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
import path from 'path';
import fs from 'fs';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production' || fs.existsSync(path.resolve(process.cwd(), 'dist'));
const port = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client on the server side
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Endpoint for Programmatic SEO Content Generation
  app.post('/api/gemini/generate-seo-content', async (req, res) => {
    try {
      const { keyword, mode, customInstructions } = req.body;
      if (!keyword) {
        return res.status(400).json({ error: 'Anahtar kelime / girdi boş olamaz.' });
      }

      // Generate the programmatic SEO prompt based on the chosen mode
      const prompt = buildSeoPrompt(keyword, mode, customInstructions);

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Sen 'WebdeHepSeek' için çalışan bir Baş Programmatik SEO Mimarı ve İçerik Ajanısın. Google E-E-A-T ve Helpful Content yönergelerine uygun, asla thin-content sayılmayacak, arama motorlarında üst sıralara çıkacak derinlemesine Türkçe içerikler hazırlarsın. Çıktı formatın her zaman JSON olmalıdır.",
        }
      });

      const responseText = response.text || '';
      res.json({ success: true, data: JSON.parse(responseText.trim()) });
    } catch (error: any) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: error.message || 'Yapay zeka içerik üretimi sırasında bir hata oluştu.' });
    }
  });

  // API Endpoint for AI Classifier
  app.post('/api/gemini/classify', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Metin boş olamaz.' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Aşağıdaki haber metnini analiz et ve kategorisini, alt kategorisini, güven skorunu (confidence), piyasa duyarlılığını (sentiment) ve gerekçesini (reasoning) belirle. Çıktıyı JSON formatında ver.\n\nMetin: ${text}`,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Aşağıdaki JSON şemasına uygun yanıt ver: { \"category\": \"string\", \"subcategory\": \"string\", \"confidence\": number, \"sentiment\": \"string\", \"reasoning\": \"string\" }",
        }
      });

      const responseText = response.text || '';
      res.json({ success: true, data: JSON.parse(responseText.trim()) });
    } catch (error: any) {
      console.error('Classification error:', error);
      res.status(500).json({ error: error.message || 'Sınıflandırma sırasında bir hata oluştu.' });
    }
  });

  if (!isProd) {
    // Mount Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true, port: Number(port) },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

// Prompt builder helper based on the mode
function buildSeoPrompt(keyword: string, mode: string, customInstructions: string) {
  let modePrompt = '';

  if (mode === 'comparison') {
    modePrompt = `
MOD 1: "X vs Y" KIYASLAMA
H1 Başlığı: "[X] vs [Y] Karşılaştırması 2026: Hangisi Alınmalı? (Özellik, Fiyat ve Karar Matrisi)" formunda olsun.
İçerik bileşenleri:
1. H1 Başlığı
2. Spot Özet (2 cümlelik tarafsız özet)
3. Hızlı Karar Kutusu: "Kısaca Hangisi?" (Fiyat, Performans ve Kullanım Amacına göre 3 maddede net kazanan belirten bir nesne).
4. Kıyaslama Tablosu: En az 6 teknik parametrede net karşılaştırma tablosu.
5. Kullanım Senaryosu: "Kimler X'i, Kimler Y'yi Tercih Etmeli?" detaylı analizi.
6. Sıkça Sorulan Sorular (3 adet soru ve cevap).
7. Doğrulanmış Schema.org JSON-LD verisi (@graph yapısında NewsArticle + FAQPage + Product şemalarını içeren geçerli JSON-LD script bloğu).
`;
  } else if (mode === 'price') {
    modePrompt = `
MOD 2: "FİYATI NE KADAR? / KAÇ TL?"
H1 Başlığı: "[Ürün/Hizmet] 2026 Fiyatı Ne Kadar Oldu? (Güncel Tarife & Kalem Kalem Maliyet)" formunda olsun.
İçerik bileşenleri:
1. H1 Başlığı
2. Spot Rakam Kutusu: Kullanıcının ilk 3 saniyede göreceği net güncel fiyat.
3. Kalem Kalem Maliyet Tablosu: Taban Fiyat, KDV/ÖTV/Harç, Ek Masraflar ve Toplam Tutar.
4. Geçen Yıla Göre Değişim Analizi (% artış ve ekonomik gerekçeler).
5. Tasarruf İpuçları (En az 3 adet pratik tasarruf önerisi).
6. Sıkça Sorulan Sorular (3 adet soru ve cevap).
7. Doğrulanmış Schema.org JSON-LD verisi (@graph yapısında NewsArticle + FAQPage + PriceSpecification içeren geçerli JSON-LD script bloğu).
`;
  } else if (mode === 'howto') {
    modePrompt = `
MOD 3: "NASIL YAPILIR? / REHBER"
H1 Başlığı: "Adım Adım [Konu/Yazılım] Nasıl Yapılır? (2026 Güncel Rehberi & Resimli Anlatım)" formunda olsun.
İçerik bileşenleri:
1. H1 Başlığı
2. Spot Giriş (2 cümlelik açıklayıcı özet)
3. Adım Adım Liste (En az 5 net adım, her adımın altında teknik detaylar ve açıklamalar).
4. Potansiyel Hatalar ve Çözümleri Tablosu (En az 3 kritik hata, nedeni ve çözümü).
5. Sıkça Sorulan Sorular (3 adet soru ve cevap).
6. Doğrulanmış Schema.org JSON-LD verisi (@graph yapısında NewsArticle + FAQPage + HowTo içeren geçerli JSON-LD script bloğu).
`;
  } else {
    modePrompt = `
MOD 4: GENEL TEKNOLOJİ / FİNANS ANALİZİ
H1 Başlığı: "[Konu] Hakkında Bilmeniz Gereken Her Şey (2026 Derinlemesine Analiz & Gelecek Öngörüsü)" formunda olsun.
İçerik bileşenleri:
1. H1 Başlığı
2. Spot Özet (2 cümlelik spot açıklama)
3. Detaylı Analiz Metni (Kapsamlı ve veri odaklı, en az 3 alt başlıklı makale metni).
4. Sıkça Sorulan Sorular (3 adet soru ve cevap).
5. Doğrulanmış Schema.org JSON-LD verisi (@graph yapısında NewsArticle + FAQPage içeren geçerli JSON-LD script bloğu).
`;
  }

  return `
Girdi: "${keyword}"
Aşağıdaki çalışma moduna göre E-E-A-T ve Helpful Content uyumlu derinlemesine Türkçe içerik üret.

${modePrompt}

Ek Özel Talimatlar: ${customInstructions || 'Yok'}

Senden her zaman şu JSON şemasında çıktı bekliyorum:
{
  "h1": "H1 başlığı",
  "spot": "Spot özet veya giriş",
  "quickDecision": {
    "title": "Kısaca Hangisi?",
    "winner": "Net kazanan veya durum",
    "points": ["madde 1", "madde 2", "madde 3"]
  },
  "spotPrice": "Net fiyat rakamı (örn: 49.999 TL)",
  "table": {
    "headers": ["Parametre", "Değer 1", "Değer 2"],
    "rows": [
      ["Özellik", "Değer A", "Değer B"]
    ]
  },
  "sections": [
    {
      "heading": "Alt Başlık",
      "body": "Paragraf bazlı zengin içerik..."
    }
  ],
  "faq": [
    {
      "question": "Soru?",
      "answer": "Cevap..."
    }
  ],
  "savings": ["tasarruf ipucu 1"],
  "errorsTable": {
    "headers": ["Olası Hata", "Nedeni", "Çözümü"],
    "rows": [
      ["Hata", "Neden", "Çözüm"]
    ]
  },
  "schemaJson": "Geçerli bir JSON dizesi olarak Schema.org JSON-LD verisi. Doğrudan <script type=\\"application/ld+json\\"> içerisine gömülebilir olmalı.",
  "metaTitle": "SEO optimize edilmiş Title etiketi (maksimum 60 karakter)",
  "metaDescription": "SEO optimize edilmiş Meta Description (maksimum 160 karakter)",
  "eeatScore": 98,
  "eeatReasons": ["Güvenilir veri kaynakları kullanıldı", "Uzman görüşü simüle edildi", "Reklam veya sponsorluk baskısı yoktur"]
}
`;
}

startServer();
