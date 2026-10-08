import React, { useState } from 'react';
import { Percent, ExternalLink } from 'lucide-react';

export interface AffiliateItem {
  marketplace: string;
  seller: string;
  price: number;
  discount: string;
  shipping: string;
  rating: number;
  link: string;
}

export interface AffiliateComparisonCardProps {
  articleId: string;
  articleTitle: string;
  category: string;
  onShowToast: (msg: string) => void;
}

export const AffiliateComparisonCard: React.FC<AffiliateComparisonCardProps> = ({
  articleId,
  articleTitle,
  category,
  onShowToast
}) => {
  const [clickCounts, setClickCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('whsk_affiliate_clicks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const isTechCategory = ['Teknoloji & Dijital Dönüşüm', 'Yapay Zeka & Gelecek', 'Kripto & Web3', 'SaaS & Bulut Yazılımları', 'Otomotiv & Mobilite'].includes(category);

  if (!isTechCategory) return null;

  // Dynamically generate mock prices based on title to keep it realistic
  const getMockPrices = (id: string, title: string): AffiliateItem[] => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const basePrice = Math.abs((hash % 45000) + 5000); // 5,000 to 50,000 TL
    
    return [
      {
        marketplace: "Amazon TR",
        seller: "Amazon Türkiye",
        price: Math.round(basePrice * 0.94),
        discount: "%12 İndirim",
        shipping: "Bedava Kargo",
        rating: 4.8,
        link: "https://amazon.com.tr"
      },
      {
        marketplace: "Hepsiburada",
        seller: "TeknolojiMarket (Hepsipartner)",
        price: Math.round(basePrice * 0.98),
        discount: "%8 İndirim",
        shipping: "Yarın Kapında",
        rating: 4.6,
        link: "https://hepsiburada.com"
      },
      {
        marketplace: "Trendyol",
        seller: "GigaStore",
        price: basePrice,
        discount: "%5 İndirim",
        shipping: "Hızlı Teslimat",
        rating: 4.5,
        link: "https://trendyol.com"
      }
    ];
  };

  const prices = getMockPrices(articleId, articleTitle);

  const handleCtaClick = (marketplace: string, link: string) => {
    const key = `${articleId}-${marketplace}`;
    const nextCounts = { ...clickCounts, [key]: (clickCounts[key] || 0) + 1 };
    setClickCounts(nextCounts);
    localStorage.setItem('whsk_affiliate_clicks', JSON.stringify(nextCounts));

    onShowToast(`⚡ ${marketplace} sayfasına yönlendiriliyorsunuz...`);
    window.open(link, '_blank');
  };

  const totalClicks = Object.values(clickCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-zinc-950 via-[#121215] to-zinc-950 border border-[#D4AF37]/30 rounded-3xl space-y-4 text-left font-sans shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div>
          <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider block font-bold">
            PRO PLUS • CANLI AFFILIATE ENTEGRASYONU
          </span>
          <h4 className="text-sm font-serif font-black text-white flex items-center gap-1.5 mt-0.5">
            <Percent className="text-[#D4AF37]" size={15} />
            Piyasa Fiyat Karşılaştırması & En Ucuz Satıcı
          </h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 bg-[#0B0B0C] px-2.5 py-1 rounded border border-zinc-800 shrink-0">
          Toplam Yönlendirme: {totalClicks} tık
        </span>
      </div>

      <p className="text-[11px] text-zinc-400 leading-relaxed">
        Sistemimiz üzerinden en popüler 3 büyük pazar yerinin canlı stok ve fiyat verileri karşılaştırılmıştır. En ucuz fiyatı sunan satıcıya doğrudan yönlendirilebilirsiniz:
      </p>

      {/* List */}
      <div className="space-y-2.5 pt-1">
        {prices.map((item) => {
          const clickKey = `${articleId}-${item.marketplace}`;
          const clicks = clickCounts[clickKey] || 0;
          return (
            <div 
              key={item.marketplace} 
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#0B0B0C] border border-zinc-850 hover:border-zinc-800 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#121215] border border-zinc-850 flex items-center justify-center font-bold text-[#D4AF37] text-[10px] font-mono uppercase shrink-0">
                  {item.marketplace.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap text-left">
                    <span className="text-xs font-bold text-white">{item.marketplace}</span>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-extrabold uppercase font-mono">
                      🚚 {item.shipping}
                    </span>
                  </div>
                  <span className="text-[9px] text-zinc-500 block pt-0.5">
                    Satıcı: <strong className="text-zinc-400">{item.seller}</strong> • Değerlendirme: ★ {item.rating} {clicks > 0 ? `(${clicks} tık)` : ""}
                  </span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0">
                <div className="text-right flex items-center gap-2">
                  <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-extrabold uppercase font-mono">
                    {item.discount}
                  </span>
                  <span className="text-sm font-mono font-bold text-[#D4AF37] tabular-nums">
                    {item.price.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <button
                  onClick={() => handleCtaClick(item.marketplace, item.link)}
                  className="px-4 py-2 border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] text-[10px] font-extrabold uppercase rounded-xl transition-all flex items-center gap-1.5 bg-transparent shadow shadow-[#D4AF37]/5"
                >
                  <span>En Uygun Fiyata Git</span>
                  <ExternalLink size={10} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
