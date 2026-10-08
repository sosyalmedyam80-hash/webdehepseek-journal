import React, { useState } from 'react';
import { Gift, Copy, Check } from 'lucide-react';

export interface CouponItem {
  id: string;
  title: string;
  description: string;
  code: string;
  expiry: string;
}

export interface CouponHubCardProps {
  onShowToast: (msg: string) => void;
}

export const CouponHubCard: React.FC<CouponHubCardProps> = ({ onShowToast }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const coupons: CouponItem[] = [
    { 
      id: '1', 
      title: 'Teknoloji Sepetinde 500 TL İndirim', 
      description: 'Trendyol Teknoloji alışverişlerinde geçerli net 500 TL indirim.', 
      code: 'WHSK500', 
      expiry: 'Bugün Son' 
    },
    { 
      id: '2', 
      title: 'Yıllık Hosting & Domain %30 İndirim', 
      description: 'Yeni sunucu ve alan adı alımlarında anında net %30 indirim.', 
      code: 'HOST30', 
      expiry: 'Sınırlı Stok' 
    },
    { 
      id: '3', 
      title: 'Kurumsal AI Asistanı 1 Ay Ücretsiz', 
      description: 'Gelişmiş yapay zeka metin/tasarım aracında 1 ay ücretsiz deneme.', 
      code: 'AIPRO', 
      expiry: 'PR Fırsatı' 
    }
  ];

  const handleCopyCode = (id: string, code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      onShowToast(`🔥 Kupon Kopyalandı! Pano: ${code}`);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  return (
    <div className="bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-5 space-y-4 shadow-xl text-left font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Gift size={16} className="text-[#D4AF37]" />
          <h4 className="font-serif font-bold text-white text-xs uppercase tracking-wider">
            🔥 Günün Fırsat Kodları
          </h4>
        </div>
        <span className="text-[9px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded font-bold uppercase">Aktif</span>
      </div>

      <div className="space-y-3">
        {coupons.map((coupon) => (
          <div 
            key={coupon.id} 
            className="p-3 bg-[#0B0B0C] border border-zinc-850 hover:border-[#D4AF37]/30 rounded-2xl relative overflow-hidden transition-all group"
          >
            {/* Expiry Badge */}
            <div className="absolute top-2 right-2 text-[8px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded">
              {coupon.expiry}
            </div>

            <div className="space-y-1 pr-14 text-left">
              <h5 className="text-[11px] font-bold text-white leading-snug">{coupon.title}</h5>
              <p className="text-[10px] text-zinc-500 leading-normal">{coupon.description}</p>
            </div>

            {/* Code Field and Copy Action */}
            <div className="mt-2.5 flex items-center justify-between gap-2 bg-[#121215] border border-zinc-850 rounded-xl p-1.5">
              <span className="text-xs font-mono font-black text-[#D4AF37] tracking-wider pl-2 select-all">
                {coupon.code}
              </span>
              <button
                onClick={() => handleCopyCode(coupon.id, coupon.code)}
                className={`px-3 py-1 text-[9px] font-extrabold uppercase rounded-lg transition-all flex items-center gap-1 ${
                  copiedId === coupon.id
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#D4AF37] text-black hover:brightness-110'
                }`}
              >
                {copiedId === coupon.id ? (
                  <>
                    <Check size={10} />
                    <span>Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy size={10} />
                    <span>Kodu Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
