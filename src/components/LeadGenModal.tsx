import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield, Building2, Phone, Mail, User, DollarSign } from 'lucide-react';

interface LeadGenModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
  onShowToast: (msg: string) => void;
}

export function LeadGenModal({ isOpen, onClose, category, onShowToast }: LeadGenModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('50.000 TL - 250.000 TL');
  const [company, setCompany] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      onShowToast("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    setSubmitted(true);
    onShowToast("B2B Teklif talebiniz uzman ekibimize iletildi!");
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-[#111827] border border-[#2563EB]/40 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A0E17] via-[#111827] to-[#0A0E17] p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2563EB]/15 border border-[#2563EB]/40 flex items-center justify-center text-[#2563EB]">
              <Building2 size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                B2B & Kurumsal Çözümler
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                {category ? `${category} - Uzmanından Teklif Al` : "B2B Kurumsal Teklif Al"}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 size={48} className="text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-white">Talebiniz Alındı!</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Sektör uzmanımız 15 dakika içerisinde sizinle iletişime geçerek özel bütçe ve analiz raporunu iletecektir.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-300 flex items-center gap-1">
                    <User size={12} className="text-[#2563EB]" />
                    Ad Soyad *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmet Yılmaz"
                    className="w-full px-3 py-2 bg-[#0A0E17] border border-zinc-800 focus:border-[#2563EB] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-300 flex items-center gap-1">
                    <Building2 size={12} className="text-[#2563EB]" />
                    Şirket Adı
                  </label>
                  <input 
                    type="text" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Tech Corp A.Ş."
                    className="w-full px-3 py-2 bg-[#0A0E17] border border-zinc-800 focus:border-[#2563EB] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-300 flex items-center gap-1">
                    <Mail size={12} className="text-[#2563EB]" />
                    Kurumsal E-Posta *
                  </label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ahmet@sirket.com"
                    className="w-full px-3 py-2 bg-[#0A0E17] border border-zinc-800 focus:border-[#2563EB] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-300 flex items-center gap-1">
                    <Phone size={12} className="text-[#2563EB]" />
                    Telefon Numarası *
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0532 000 00 00"
                    className="w-full px-3 py-2 bg-[#0A0E17] border border-zinc-800 focus:border-[#2563EB] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-300 flex items-center gap-1">
                  <DollarSign size={12} className="text-[#2563EB]" />
                  Tahmini Yatırım Bütçesi
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0E17] border border-zinc-800 focus:border-[#2563EB] rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="20.000 TL - 50.000 TL">20.000 TL - 50.000 TL</option>
                  <option value="50.000 TL - 250.000 TL">50.000 TL - 250.000 TL</option>
                  <option value="250.000 TL - 1.000.000 TL">250.000 TL - 1.000.000 TL</option>
                  <option value="1.000.000 TL+">1.000.000 TL ve Üzeri</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-300">
                  Proje Detayları ve Özel Notlar
                </label>
                <textarea 
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="İhtiyaçlarınızı veya sorularınızı kısaca yazabilirsiniz..."
                  className="w-full px-3 py-2 bg-[#0A0E17] border border-zinc-800 focus:border-[#2563EB] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80">
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                  <Shield size={12} className="text-emerald-400" />
                  <span>KVKK & B2B Gizlilik Garantisi</span>
                </div>

                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#2563EB] hover:brightness-110 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Teklif Talebi Gönder</span>
                  <Send size={13} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
