/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  LayoutGrid, 
  FileJson, 
  ChevronRight, 
  ChevronLeft,
  Sun, 
  Moon, 
  Globe, 
  BarChart2, 
  Shield, 
  Gem, 
  Download, 
  Radio, 
  Newspaper, 
  Volume2, 
  VolumeX,
  Scale,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Zap,
  Activity,
  Share2,
  Bookmark,
  Check,
  Mail,
  Type,
  List,
  HelpCircle,
  Award,
  Vote,
  ExternalLink,
  Play,
  Pause,
  MessageSquare,
  ThumbsUp,
  Smile,
  Calculator,
  Coffee,
  Bell,
  Send,
  User,
  Tag,
  Lock,
  Unlock,
  CheckCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  SITE_STRUCTURE, 
  MOCK_NEWS, 
  LEGAL_DOCUMENTS,
  SYSTEM_NODES,
  CURRENCY_RATES,
  GLOSSARY_TERMS,
  DAILY_POLL,
  TAG_CLOUD,
  AUTHORS_LIST,
  LIVE_BLOG_ENTRIES,
  MOCK_INITIAL_COMMENTS,
  NewsItem,
  GlossaryTerm,
  AuthorProfile,
  ArticleComment 
} from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Gemini AI SDK
const apiKey = typeof process !== 'undefined' && process.env?.GEMINI_API_KEY ? process.env.GEMINI_API_KEY : '';
const ai = new GoogleGenAI({ apiKey });

// Background Routines for Header Status Ticker
const BACKGROUND_ROUTINES = [
  "BIST 100 Rekor Kırdı: Teknoloji ve Sanayi Hisselerinde Güçlü Yükseliş",
  "Siber Güvenlik: Kuantum Dayanıklı Şifreleme Standartları Devrede",
  "Yeni Nesil Yapay Zeka: Küresel Medya ve Finans Dünyasında Derinleşiyor",
  "E-E-A-T Yayıncılık İlkeleri: Uluslararası Kalite Tescillendi",
  "Küresel Piyasalar: Ons Altın, Bitcoin ve Teknoloji Hisselerinde Pozitif Seyir",
  "Otonom Mobilite: Seviye 4 Sürücüsüz Araç Testleri Başarıyla Tamamlandı"
];

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'news' | 'nav' | 'analytics' | 'system' | 'ai' | 'wp' | 'legal'>('news');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Reader Profile & Auth Modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string; isLoggedIn: boolean }>({
    name: 'Selin Aktaş',
    email: 'selin.aktas@webdehepseek.com',
    isLoggedIn: true
  });

  // Financial Calculator Modal
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);
  const [calcUsdInput, setCalcUsdInput] = useState<number>(1000);

  // Press Release Portal Modal
  const [isPressReleaseModalOpen, setIsPressReleaseModalOpen] = useState(false);
  const [pressReleaseTitle, setPressReleaseText] = useState('');

  // Support / Buy Me Coffee Modal
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Author Archive Modal
  const [selectedAuthorProfile, setSelectedAuthorProfile] = useState<AuthorProfile | null>(null);

  // Push Notifications Simulation
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);

  // Article Comments State
  const [commentsList, setCommentsList] = useState<ArticleComment[]>(MOCK_INITIAL_COMMENTS);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Article Reactions State
  const [reactionsState, setReactionsState] = useState<Record<string, { like: number; analytic: number; mindblown: number }>>({});

  // Recently Viewed History
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('whsk_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Lightbox Modal State
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  // Audio Playback Speed
  const [audioSpeed, setAudioSpeed] = useState<number>(1);

  // Article Modal Reading Progress (0-100)
  const [articleScrollProgress, setArticleScrollProgress] = useState<number>(0);

  // Autonomous Simulator Live Rates & Fear/Greed State
  const [liveRates, setLiveRates] = useState(CURRENCY_RATES);
  const [liveFearGreed, setLiveFearGreed] = useState(78);

  // Article Font Size State with localStorage Persistence
  const [articleFontSize, setArticleFontSize] = useState<'sm' | 'md' | 'lg'>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('whsk_font_size');
      if (saved === 'sm' || saved === 'md' || saved === 'lg') return saved;
    }
    return 'md';
  });

  const changeArticleFontSize = (size: 'sm' | 'md' | 'lg') => {
    setArticleFontSize(size);
    localStorage.setItem('whsk_font_size', size);
  };

  // Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('whsk_bookmarks');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Daily Poll State
  const [pollVotedOption, setPollVotedOption] = useState<string | null>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('whsk_poll_voted');
    }
    return null;
  });
  const [pollData, setPollData] = useState(DAILY_POLL);

  // Glossary Tooltip Modal State
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<GlossaryTerm | null>(null);

  // Audio Player Simulation State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25); // percentage

  // Newsletter Email Input State
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Live Routine Ticker Index
  const [routineIndex, setRoutineIndex] = useState(0);

  // Legal Modal & Cookie Consent
  const [activeLegalModal, setActiveLegalModal] = useState<keyof typeof LEGAL_DOCUMENTS | null>(null);
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(false);

  // Theme & Language
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<'TR' | 'EN'>('TR');

  // Slider Refs for Horizontal Scrolling
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const trendSliderRef = useRef<HTMLDivElement>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // AI Classification
  const [newsText, setNewsText] = useState('');
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  // Google Analytics & Search Console Integration State
  const [ga4Id, setGa4Id] = useState(() => typeof localStorage !== 'undefined' ? localStorage.getItem('whsk_ga4_id') || '' : '');
  const [gscTag, setGscTag] = useState(() => typeof localStorage !== 'undefined' ? localStorage.getItem('whsk_gsc_tag') || '' : '');
  const [gtmId, setGtmId] = useState(() => typeof localStorage !== 'undefined' ? localStorage.getItem('whsk_gtm_id') || '' : '');

  const handleSaveAnalyticsConfig = () => {
    localStorage.setItem('whsk_ga4_id', ga4Id);
    localStorage.setItem('whsk_gsc_tag', gscTag);
    localStorage.setItem('whsk_gtm_id', gtmId);
    showToast("Google Analitik & Search Console konfigürasyonu kaydedildi!");
  };

  // Autonomous Simulator Engine (Live Market Fluctuation Simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRates(prev => prev.map(rate => {
        const delta = (Math.random() - 0.48) * 0.15;
        const currentVal = parseFloat(rate.value.replace(/[^0-9.]/g, '')) || 100;
        const newVal = (currentVal * (1 + delta / 100)).toFixed(2);
        return {
          ...rate,
          change: `${delta >= 0 ? '+' : ''}${delta.toFixed(2)}%`,
          isPositive: delta >= 0
        };
      }));
      setLiveFearGreed(prev => Math.min(95, Math.max(65, prev + Math.floor((Math.random() - 0.45) * 3))));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic Document Page Title Sync
  useEffect(() => {
    if (selectedNewsArticle) {
      document.title = `${selectedNewsArticle.title} | WebdeHepSeeK Journal`;
    } else if (selectedCategory) {
      document.title = `${selectedCategory} Gündemi | WebdeHepSeeK Journal`;
    } else {
      document.title = `WebdeHepSeeK | Global Tech, Finance & AI Journal`;
    }
  }, [selectedNewsArticle, selectedCategory]);

  // Cycle Background Routines Status
  useEffect(() => {
    const interval = setInterval(() => {
      setRoutineIndex(prev => (prev + 1) % BACKGROUND_ROUTINES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Cycle Audio Player Simulation Progress
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => (prev >= 100 ? 0 : prev + 2));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Check Cookie Consent on load
  useEffect(() => {
    const saved = localStorage.getItem('whsk_cookie_consent');
    if (saved === 'accepted') {
      setCookieConsentAccepted(true);
    }
  }, []);

  // Save Bookmarks
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter(bId => bId !== id);
      showToast("Yer imlerinden çıkarıldı.");
    } else {
      updated = [...bookmarkedIds, id];
      showToast("Yer imlerine eklendi!");
    }
    setBookmarkedIds(updated);
    localStorage.setItem('whsk_bookmarks', JSON.stringify(updated));
  };

  // Handle Poll Vote
  const handleVote = (optionId: string) => {
    if (pollVotedOption) {
      showToast("Bu ankete zaten oy kullandınız.");
      return;
    }
    const updatedOptions = pollData.options.map(opt => 
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setPollData({ ...pollData, options: updatedOptions });
    setPollVotedOption(optionId);
    localStorage.setItem('whsk_poll_voted', optionId);
    showToast("Oyunuz kaydedildi. Teşekkür ederiz!");
  };

  // Calculate Total Poll Votes
  const totalPollVotes = useMemo(() => {
    return pollData.options.reduce((acc, curr) => acc + curr.votes, 0);
  }, [pollData]);

  // Dynamic Schema.org JSON-LD Insertion
  useEffect(() => {
    if (selectedNewsArticle) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'news-article-jsonld';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": selectedNewsArticle.title,
        "description": selectedNewsArticle.excerpt,
        "image": [selectedNewsArticle.imageUrl],
        "datePublished": "2026-10-06T08:00:00+03:00",
        "author": {
          "@type": "Person",
          "name": selectedNewsArticle.author,
          "jobTitle": selectedNewsArticle.authorTitle || "Journalist"
        },
        "publisher": {
          "@type": "Organization",
          "name": "WebdeHepSeeK Journal",
          "url": "https://webdehepseek.com"
        },
        "mainEntityOfPage": selectedNewsArticle.canonicalUrl
      });
      document.head.appendChild(script);
      return () => {
        const existing = document.getElementById('news-article-jsonld');
        if (existing) existing.remove();
      };
    }
  }, [selectedNewsArticle]);

  const handleAcceptCookies = () => {
    localStorage.setItem('whsk_cookie_consent', 'accepted');
    setCookieConsentAccepted(true);
    showToast("Çerez politikası ve KVKK rızası onaylandı.");
  };

  // Scroll Slider Helper
  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Article Select Helper with Recently Viewed History Tracking
  const handleSelectArticle = (news: NewsItem) => {
    setSelectedNewsArticle(news);
    if (!recentlyViewedIds.includes(news.id)) {
      const updated = [news.id, ...recentlyViewedIds.filter(id => id !== news.id)].slice(0, 6);
      setRecentlyViewedIds(updated);
      localStorage.setItem('whsk_recently_viewed', JSON.stringify(updated));
    }
  };

  // Add Comment Helper
  const handleAddComment = (newsId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const author = newCommentAuthor.trim() || userProfile.name || "Anonim Okur";
    const newComment: ArticleComment = {
      id: `comment-${Date.now()}`,
      newsId,
      author,
      date: 'Az önce',
      text: newCommentText.trim(),
      likes: 1,
      isVerified: userProfile.isLoggedIn
    };
    setCommentsList([newComment, ...commentsList]);
    setNewCommentText('');
    showToast("Yorumunuz başarıyla gönderildi ve yayınlandı.");
  };

  // Reaction Helper
  const handleReaction = (newsId: string, type: 'like' | 'analytic' | 'mindblown') => {
    const current = reactionsState[newsId] || { like: 120, analytic: 85, mindblown: 45 };
    const updated = { ...current, [type]: current[type] + 1 };
    setReactionsState({ ...reactionsState, [newsId]: updated });
    showToast("Tepkiniz kaydedildi!");
  };

  // Like Comment Helper
  const handleLikeComment = (commentId: string) => {
    setCommentsList(commentsList.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
    showToast("Yorum beğenildi.");
  };

  // Toggle Push Notifications Simulation
  const handleTogglePushNotifications = () => {
    const next = !pushNotificationsEnabled;
    setPushNotificationsEnabled(next);
    showToast(next ? "Anlık masaüstü ve mobil bildirimler aktif edildi." : "Bildirimler kapatıldı.");
  };

  // Filtered News Stream
  const filteredNews = useMemo(() => {
    return MOCK_NEWS.filter(news => {
      const matchCat = !selectedCategory || news.category === selectedCategory;
      const matchSub = !selectedSubcategory || news.subcategory === selectedSubcategory;
      const matchTag = !selectedTag || news.title.toLowerCase().includes(selectedTag.toLowerCase()) || news.excerpt.toLowerCase().includes(selectedTag.toLowerCase());
      const matchSearch = !searchQuery.trim() || 
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBookmark = !onlyBookmarks || bookmarkedIds.includes(news.id);
      return matchCat && matchSub && matchTag && matchSearch && matchBookmark;
    });
  }, [selectedCategory, selectedSubcategory, selectedTag, searchQuery, onlyBookmarks, bookmarkedIds]);

  // Recently Viewed Articles List
  const recentlyViewedNews = useMemo(() => {
    return MOCK_NEWS.filter(item => recentlyViewedIds.includes(item.id));
  }, [recentlyViewedIds]);

  // Editor's Choice Spotlight Items
  const editorsChoiceNews = useMemo(() => {
    return MOCK_NEWS.filter(item => item.isEditorsChoice);
  }, []);

  // Related News Matrix
  const relatedNews = useMemo(() => {
    if (!selectedNewsArticle) return [];
    return MOCK_NEWS.filter(item => 
      item.id !== selectedNewsArticle.id && 
      (item.category === selectedNewsArticle.category || item.subcategory === selectedNewsArticle.subcategory)
    ).slice(0, 3);
  }, [selectedNewsArticle]);

  // Gemini AI Classifier
  const classifyNewsWithGemini = async () => {
    if (!newsText.trim()) return;
    setIsClassifying(true);
    setClassificationResult(null);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Aşağıdaki haber metnini verilen 15 ana kategori ve 150 alt kategorilik hiyerarşiye göre sınıflandır.
        Sadece geçerli bir JSON döndür.
        
        KATEGORİ YAPISI:
        ${JSON.stringify(SITE_STRUCTURE.map(c => ({ name: c.name, subcategories: c.subcategories })), null, 2)}
        
        HABER METNİ:
        ${newsText}
        
        FORMAT:
        {
          "category": "Ana Kategori Adı",
          "subcategory": "Alt Kategori Adı",
          "confidence": 0.99,
          "reasoning": "Sınıflandırma açıklaması"
        }`
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      setClassificationResult(parsed);
      showToast("AI Sınıflandırma Tamamlandı!");
    } catch (err) {
      console.error(err);
      showToast("Sınıflandırma sırasında hata oluştu.");
    } finally {
      setIsClassifying(false);
    }
  };

  // Export Data Helper
  const handleExportDataJSON = () => {
    const data = {
      structure: SITE_STRUCTURE,
      news: MOCK_NEWS,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whsk_full_dataset_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("Veri Seti (JSON) indirildi!");
  };

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} panoya kopyalandı!`);
  };

  // Newsletter Submit Helper
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    showToast(`Tebrikler! ${newsletterEmail} adresiniz bültenimize eklendi.`);
    setNewsletterEmail('');
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-300 font-sans antialiased selection:bg-[#D4AF37] selection:text-black pb-16 sm:pb-0", 
      isDarkMode ? "bg-[#0B0B0C] text-zinc-100" : "bg-zinc-50 text-zinc-900"
    )}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-50 bg-[#121215] border border-[#D4AF37] text-white text-xs font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP CURRENCY & ASSET TICKER BAR */}
      <div className="bg-[#0B0B0C] text-[#D4AF37] py-2 border-b border-[#D4AF37]/20 overflow-hidden text-[11px] font-mono">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0 text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider">
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <TrendingUp size={13} />
              <span>PİYASA BÜLTENİ:</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 bg-[#121215] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full text-[#D4AF37] text-[9px]">
              <span>Korku & Açgözlülük:</span>
              <strong className="text-emerald-400 font-bold">{liveFearGreed}/100 Boğa</strong>
            </div>
          </div>
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap py-0.5">
            {liveRates.map((curr) => (
              <div key={curr.symbol} className="flex items-center gap-2 shrink-0">
                <span className="text-zinc-400 font-medium">{curr.label}:</span>
                <strong className="text-[#D4AF37] font-extrabold tracking-wide">{curr.value}</strong>
                <span className={cn(
                  "font-bold text-[10px] px-1.5 py-0.5 rounded border",
                  curr.isPositive ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/30" : "text-rose-400 bg-rose-950/60 border-rose-500/30"
                )}>{curr.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Ticker Marquee Header */}
      <div className="bg-[#0B0B0C] text-[#D4AF37] py-2.5 border-b border-[#D4AF37]/30 overflow-hidden text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 overflow-hidden flex-grow">
            <div className="flex items-center gap-2 bg-[#D4AF37] text-black text-[10px] font-extrabold px-3 py-1 rounded tracking-widest shrink-0 uppercase shadow-md">
              <Radio size={12} className="animate-pulse" />
              <span>CANLI AKIŞ</span>
            </div>
            
            <div className="overflow-hidden w-full relative flex items-center">
              <div className="animate-marquee whitespace-nowrap font-mono text-xs flex items-center gap-12 text-[#D4AF37]">
                {/* Loop items rendered twice for seamless animation without gaps */}
                {[
                  { icon: TrendingUp, label: "BIST 100 & Finans:", text: "Borsa İstanbul 10,845 Seviyesiyle Yıllık Zirveyi Yeniledi." },
                  { icon: Zap, label: "Kripto Varlıklar:", text: "Bitcoin $152,000 Sınırını Aştı, ETF Fonlarına Rekor Nakit Girişi." },
                  { icon: Sparkles, label: "Yapay Zeka & Teknoloji:", text: "Yeni Nesil Otonom AI Modellerinde Akıl Yürütme Kapasitesi Rekor Seviyede." },
                  { icon: Shield, label: "Siber Güvenlik:", text: "Küresel Finans Ağları Post-Kuantum Şifreleme Protokollerine Geçiyor." },
                  // Duplicated set for infinite loop
                  { icon: TrendingUp, label: "BIST 100 & Finans:", text: "Borsa İstanbul 10,845 Seviyesiyle Yıllık Zirveyi Yeniledi." },
                  { icon: Zap, label: "Kripto Varlıklar:", text: "Bitcoin $152,000 Sınırını Aştı, ETF Fonlarına Rekor Nakit Girişi." },
                  { icon: Sparkles, label: "Yapay Zeka & Teknoloji:", text: "Yeni Nesil Otonom AI Modellerinde Akıl Yürütme Kapasitesi Rekor Seviyede." },
                  { icon: Shield, label: "Siber Güvenlik:", text: "Küresel Finans Ağları Post-Kuantum Şifreleme Protokollerine Geçiyor." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 shrink-0">
                    <item.icon size={13} className="text-[#D4AF37] shrink-0" />
                    <strong className="text-[#D4AF37] font-bold">{item.label}</strong>
                    <span className="text-zinc-200 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#0B0B0C] border border-[#D4AF37]/40 rounded-full shrink-0 text-[10px] font-mono text-[#D4AF37]">
            <Activity size={12} className="animate-spin text-emerald-400" />
            <AnimatePresence mode="wait">
              <motion.span 
                key={routineIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-semibold"
              >
                {BACKGROUND_ROUTINES[routineIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl transition-all",
        isDarkMode ? "bg-[#0B0B0C]/90 border-[#D4AF37]/25" : "bg-white/90 border-zinc-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setOnlyBookmarks(false);
                setActiveTab('news');
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#121215] to-[#27272A] rounded-xl flex items-center justify-center border border-[#D4AF37]/50 shadow-md group-hover:border-[#D4AF37] transition-all">
                <span className="gold-gradient-text font-serif font-black text-2xl italic">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight flex items-center gap-1">
                  WebdeHep<span className="gold-gradient-text">SeeK</span>
                </h1>
                <p className="text-[9px] uppercase tracking-widest font-mono text-[#D4AF37]">
                  Global Tech, Finance & AI Journal
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'news', label: language === 'TR' ? 'Haber Akışı' : 'News Feed', icon: Newspaper },
                { id: 'nav', label: language === 'TR' ? '14 Kategori' : '14 Categories', icon: LayoutGrid },
                { id: 'analytics', label: language === 'TR' ? 'Google Konsolu' : 'Google Console', icon: BarChart2 },
                { id: 'system', label: language === 'TR' ? 'Sistem Metrikleri' : 'System Metrics', icon: Shield },
                { id: 'ai', label: language === 'TR' ? 'AI Analiz' : 'AI Classifier', icon: Zap },
                { id: 'wp', label: 'WordPress Export', icon: FileJson },
                { id: 'legal', label: 'Kurumsal & KVKK', icon: Scale }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'news') {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                      setOnlyBookmarks(false);
                    }
                    setActiveTab(item.id as any);
                  }}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 relative",
                    activeTab === item.id 
                      ? (isDarkMode ? "bg-[#121215] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm" : "bg-zinc-100 text-zinc-900 border border-zinc-300")
                      : (isDarkMode ? "text-zinc-400 hover:text-white hover:bg-zinc-900" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100")
                  )}
                >
                  <item.icon size={14} className={activeTab === item.id ? "text-[#D4AF37]" : "opacity-70"} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Bookmarks Toggle */}
              <button 
                onClick={() => {
                  setOnlyBookmarks(!onlyBookmarks);
                  setActiveTab('news');
                  showToast(!onlyBookmarks ? "Sadece kaydedilen haberler listeleniyor" : "Tüm haber akışı aktif");
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                  onlyBookmarks 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37]" 
                    : "bg-[#121215] text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#D4AF37]/10"
                )}
                title="Yer İmleri"
              >
                <Bookmark size={13} />
                <span className="hidden sm:inline">Yer İmlerim ({bookmarkedIds.length})</span>
              </button>

              <button
                onClick={() => setIsCalcModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#121215] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                title="Finansal Hesaplayıcı"
              >
                <Calculator size={13} />
                <span>Hesapla</span>
              </button>

              <button
                onClick={() => setIsPressReleaseModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#121215] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                title="Basın Bülteni Gönder"
              >
                <Send size={13} />
                <span>Bülten Gönder</span>
              </button>

              <button 
                onClick={handleTogglePushNotifications}
                className={cn(
                  "p-2 rounded-xl border transition-all",
                  pushNotificationsEnabled ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-zinc-800 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                )}
                title="Bildirimler"
              >
                <Bell size={15} />
              </button>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#D4AF37] text-black hover:brightness-110 transition-all"
                title="Okur Profili"
              >
                <User size={13} />
                <span className="hidden md:inline">{userProfile.name}</span>
              </button>

              <button 
                onClick={() => {
                  const next = language === 'TR' ? 'EN' : 'TR';
                  setLanguage(next);
                  showToast(`Dil değiştirildi: ${next}`);
                }}
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-colors"
              >
                <Globe size={13} className="text-[#D4AF37]" />
                <span>{language}</span>
              </button>

              <button 
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  showToast(isDarkMode ? "Açık Lüks Tema Aktif" : "Obsidian Gold Koyu Tema Aktif");
                }}
                className="p-2 rounded-xl border border-zinc-700/50 hover:border-[#D4AF37] transition-all text-[#D4AF37]"
              >
                {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-zinc-700" />}
              </button>

              <button 
                className="p-2 text-zinc-300 hover:text-white lg:hidden" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL CATEGORIES SLIDER BAR (15 CORE CATEGORIES & 150 SUB-TOPICS) */}
        <div className="border-t border-zinc-800/80 bg-[#0B0B0C] py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setOnlyBookmarks(false);
                setActiveTab('news');
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0",
                (!selectedCategory && !onlyBookmarks)
                  ? "bg-[#D4AF37] text-black shadow-md font-extrabold"
                  : "bg-[#121215] text-zinc-400 border border-zinc-800 hover:border-[#D4AF37]/50"
              )}
            >
              <Sparkles size={12} />
              <span>Tüm Haberler</span>
            </button>

            {SITE_STRUCTURE.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSelectedSubcategory(null);
                  setOnlyBookmarks(false);
                  setActiveTab('news');
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5",
                  selectedCategory === cat.name
                    ? "bg-[#D4AF37] text-black font-extrabold shadow-md"
                    : "bg-[#121215] text-zinc-300 border border-zinc-800/90 hover:border-[#D4AF37]/60 hover:text-white"
                )}
              >
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Subcategories Horizontal Bar when Category is Selected */}
          {selectedCategory && (
            <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-zinc-900 mt-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider shrink-0 mr-1">Alt Konular:</span>
              <button
                onClick={() => setSelectedSubcategory(null)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors",
                  !selectedSubcategory ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-white"
                )}
              >
                Tüm Alt Konular
              </button>
              {SITE_STRUCTURE.find(c => c.name === selectedCategory)?.subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors",
                    selectedSubcategory === sub ? "bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-bold" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* TAG CLOUD HORIZONTAL ARCHIVE BAR */}
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-zinc-900/80 mt-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Tag size={10} className="text-[#D4AF37]" />
              Etiketler:
            </span>
            {selectedTag && (
              <button 
                onClick={() => setSelectedTag(null)}
                className="px-2 py-0.5 bg-[#D4AF37] text-black text-[10px] font-bold rounded flex items-center gap-1 shrink-0"
              >
                <span>#{selectedTag}</span>
                <X size={10} />
              </button>
            )}
            {TAG_CLOUD.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shrink-0 transition-colors",
                  selectedTag === tag ? "bg-[#D4AF37] text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-[#D4AF37]"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#121215] border-b border-[#D4AF37]/30 p-4 space-y-2 z-30"
          >
            {[
              { id: 'news', label: 'Haber Akışı', icon: Newspaper },
              { id: 'nav', label: 'Kategoriler (140 Alt Başlık)', icon: LayoutGrid },
              { id: 'analytics', label: 'Google Analitik Konsolu', icon: BarChart2 },
              { id: 'system', label: 'Sistem Metrikleri', icon: Shield },
              { id: 'ai', label: 'AI Analiz & Sınıflandırma', icon: Zap },
              { id: 'wp', label: 'WordPress Export', icon: FileJson },
              { id: 'legal', label: 'Kurumsal & Yasal Metinler', icon: Scale }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'news') {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                  }
                  setActiveTab(item.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between",
                  activeTab === item.id 
                    ? "bg-[#D4AF37] text-black font-bold" 
                    : "text-zinc-300 hover:bg-zinc-800"
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={14} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
        
        {/* TAB 1: ELEGANT HORIZONTAL JOURNALISTIC SLIDERS & BENTOS */}
        {activeTab === 'news' && (
          <div className="space-y-12">
            
            {/* SEARCH / TITLE BAR */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-2">
                  <span>{onlyBookmarks ? "Yer İmlerine Eklenen Haberler" : (selectedSubcategory || (selectedCategory ? `${selectedCategory} Gündemi` : "Günün Öne Çıkan Gelişmeleri"))}</span>
                </h2>
              </div>

              {/* Search input */}
              <div className="flex items-center gap-2 bg-[#121215] border border-[#D4AF37]/30 rounded-xl px-4 py-2 w-full sm:w-72 focus-within:border-[#D4AF37] transition-all">
                <Search size={16} className="text-[#D4AF37]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Haberlerde ara..." 
                  className="bg-transparent border-none focus:ring-0 text-xs w-full text-white placeholder:text-zinc-500 outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-zinc-500 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* EMPTY STATE IF NO NEWS */}
            {filteredNews.length === 0 ? (
              <div className="bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-12 text-center space-y-4 my-8 shadow-2xl">
                <div className="w-16 h-16 bg-[#0B0B0C] border border-[#D4AF37]/50 text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Newspaper size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {onlyBookmarks ? "Yer İmlerinizde Haber Bulunmuyor" : "Arama Kriterine Uygun Haber Bulunamadı"}
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  {onlyBookmarks ? "Haber kartlarının sağ altındaki kaydet ikonuna tıklayarak beğendiğiniz makaleleri buraya ekleyebilirsiniz." : "Lütfen farklı bir kategori seçin veya arama terimini değiştirin."}
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); setSelectedSubcategory(null); setOnlyBookmarks(false); }}
                  className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-xl"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <>
                {/* EDITOR'S CHOICE SPOTLIGHT SECTION */}
                {!selectedCategory && !searchQuery && !onlyBookmarks && editorsChoiceNews.length > 0 && (
                  <section className="bg-gradient-to-r from-[#121215] via-[#1c1c24] to-[#121215] border border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Award size={18} className="text-[#D4AF37]" />
                        <h3 className="text-base font-serif font-bold text-white uppercase tracking-wider">
                          Editörün Seçimi (Spotlight)
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                        Özel Analizler
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {editorsChoiceNews.map(spot => (
                        <div 
                          key={`spot-${spot.id}`} 
                          onClick={() => setSelectedNewsArticle(spot)}
                          className="flex flex-col sm:flex-row items-center gap-4 bg-[#0B0B0C] border border-zinc-800 hover:border-[#D4AF37] p-4 rounded-2xl cursor-pointer transition-all group"
                        >
                          <img 
                            src={spot.imageUrl} 
                            alt={spot.title}
                            loading="lazy"
                            className="w-full sm:w-36 h-28 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="space-y-2">
                            <span className="px-2 py-0.5 bg-[#D4AF37] text-black text-[9px] font-extrabold rounded">
                              {spot.subcategory}
                            </span>
                            <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] leading-snug line-clamp-2">
                              {spot.title}
                            </h4>
                            <span className="text-[11px] text-zinc-400 font-mono block">Yazar: {spot.author}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* SECTION 1: HERO HORIZONTAL BENTO SLIDER CAROUSEL */}
                {!selectedCategory && !searchQuery && !onlyBookmarks && (
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                        <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                          Manşet Analizler & Özel Dosyalar
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => scrollSlider(heroSliderRef, 'left')}
                          className="p-2 rounded-xl bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all shadow-md"
                          title="Sola Kaydır"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button 
                          onClick={() => scrollSlider(heroSliderRef, 'right')}
                          className="p-2 rounded-xl bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all shadow-md"
                          title="Sağa Kaydır"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Horizontal Bento Scroll Container */}
                    <div 
                      ref={heroSliderRef}
                      className="horizontal-slider gap-6 pb-4 no-scrollbar"
                    >
                      {filteredNews.slice(0, 6).map((news) => (
                        <div 
                          key={news.id}
                          onClick={() => setSelectedNewsArticle(news)}
                          className="w-[320px] sm:w-[460px] bg-[#121215] border border-[#D4AF37]/35 hover:border-[#D4AF37] rounded-3xl overflow-hidden shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div className="relative h-60 overflow-hidden">
                            <img 
                              src={news.imageUrl} 
                              alt={news.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/30" />
                            
                            <div className="absolute top-4 left-4 flex gap-2">
                              <span className="px-2.5 py-1 bg-[#D4AF37] text-black text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                                {news.subcategory}
                              </span>
                            </div>

                            <button 
                              onClick={(e) => toggleBookmark(news.id, e)}
                              className={cn(
                                "absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all",
                                bookmarkedIds.includes(news.id) ? "bg-[#D4AF37] text-black" : "bg-black/60 text-white hover:text-[#D4AF37]"
                              )}
                              title="Yer İmlerine Ekle"
                            >
                              <Bookmark size={14} />
                            </button>
                          </div>

                          <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                            <div className="space-y-2">
                              <h4 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                                {news.title}
                              </h4>
                              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                                {news.excerpt}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white truncate max-w-[160px]">{news.author}</span>
                                <span className="text-zinc-600">•</span>
                                <span className="text-[10px] font-mono text-zinc-500">{news.date}</span>
                              </div>
                              <span className="text-[#D4AF37] font-bold text-xs flex items-center gap-1">
                                <span>Oku</span>
                                <ArrowRight size={12} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* PROGRAMMATIC LUXURY AD SLOT BANNER */}
                <div className="bg-gradient-to-r from-[#121215] via-[#1c1a14] to-[#121215] border border-[#D4AF37]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl my-6">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[9px] font-mono font-bold uppercase rounded">
                      Sponsorlu İlan
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Obsidian Gold Kurumsal Finans & Altyapı Çözümleri</h4>
                      <p className="text-[11px] text-zinc-400">Yapay zeka destekli portföy yönetimi ve yüksek güvenlikli blokzincir entegrasyonu.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSupportModalOpen(true)}
                    className="px-4 py-1.5 bg-[#D4AF37] text-black text-xs font-extrabold rounded-xl hover:brightness-110 shrink-0"
                  >
                    Detaylı Bilgi
                  </button>
                </div>

                {/* SECTION 2: TRENDING HORIZONTAL CARD CAROUSEL */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={20} className="text-[#D4AF37]" />
                      <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                        En Çok Okunan Trend Haberler
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => scrollSlider(trendSliderRef, 'left')}
                        className="p-1.5 rounded-lg bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => scrollSlider(trendSliderRef, 'right')}
                        className="p-1.5 rounded-lg bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scroll Grid */}
                  <div 
                    ref={trendSliderRef}
                    className="horizontal-slider gap-5 pb-4 no-scrollbar"
                  >
                    {filteredNews.map((news) => (
                      <div 
                        key={`trend-${news.id}`}
                        onClick={() => setSelectedNewsArticle(news)}
                        className="w-[280px] sm:w-[340px] bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] rounded-2xl overflow-hidden shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-44 overflow-hidden">
                            <img 
                              src={news.imageUrl} 
                              alt={news.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold rounded">
                                {news.subcategory}
                              </span>
                            </div>
                            <button 
                              onClick={(e) => toggleBookmark(news.id, e)}
                              className={cn(
                                "absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-all",
                                bookmarkedIds.includes(news.id) ? "bg-[#D4AF37] text-black" : "bg-black/60 text-white hover:text-[#D4AF37]"
                              )}
                            >
                              <Bookmark size={12} />
                            </button>
                          </div>

                          <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                              <span>{news.date}</span>
                              <span>{news.readTime} okuma</span>
                            </div>
                            <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                              {news.title}
                            </h4>
                            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                              {news.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-zinc-950/80 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                          <span className="truncate max-w-[140px] text-zinc-300 font-medium">{news.author}</span>
                          <span className="text-[#D4AF37] font-bold text-xs flex items-center gap-1">
                            <span>Oku</span>
                            <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 3: HORIZONTAL ROW NEWS LISTING */}
                <section className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Newspaper size={18} className="text-[#D4AF37]" />
                      <span>{selectedCategory ? `${selectedCategory} Tüm Yayınlar` : "Özel Dosyalar & Derinlemesine Analizler"}</span>
                    </h3>
                  </div>

                  {/* Horizontal Card Row List */}
                  <div className="space-y-4">
                    {filteredNews.slice(0, 12).map((news) => (
                      <div 
                        key={`row-${news.id}`}
                        onClick={() => setSelectedNewsArticle(news)}
                        className="bg-[#121215] border border-zinc-800 hover:border-[#D4AF37]/80 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl"
                      >
                        <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
                          <img 
                            src={news.imageUrl} 
                            alt={news.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] font-bold text-[#D4AF37] rounded">
                            {news.subcategory}
                          </span>
                        </div>

                        <div className="flex-grow space-y-2">
                          <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
                            <span className="text-[#D4AF37] font-bold">{news.category}</span>
                            <span>•</span>
                            <span className="text-zinc-300">{news.subcategory}</span>
                            <span>•</span>
                            <span>{news.date}</span>
                          </div>

                          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                            {news.title}
                          </h4>

                          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                            {news.excerpt}
                          </p>

                          <div className="text-[11px] text-zinc-300 font-medium pt-1">
                            Yazar: <span className="text-white font-semibold">{news.author}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <button 
                            onClick={(e) => toggleBookmark(news.id, e)}
                            className={cn(
                              "p-2 rounded-xl border transition-colors",
                              bookmarkedIds.includes(news.id) ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "bg-[#0B0B0C] text-zinc-400 border-zinc-800 hover:text-white"
                            )}
                          >
                            <Bookmark size={14} />
                          </button>
                          <span className="text-xs font-bold text-[#D4AF37] group-hover:underline flex items-center gap-1">
                            <span>Oku</span>
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* MINUTE-BY-MINUTE LIVE BLOGGING SECTION */}
                <section className="bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-6 shadow-2xl space-y-4 my-8">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Radio size={18} className="text-[#D4AF37] animate-pulse" />
                      <h3 className="font-serif font-bold text-white text-base uppercase tracking-wider">
                        Dakika Dakika Canlı Takip & Anlık Borsa Gelişmeleri
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold rounded-full">
                      Canlı Akış Aktif
                    </span>
                  </div>

                  <div className="space-y-3">
                    {LIVE_BLOG_ENTRIES.map(entry => (
                      <div key={entry.id} className="p-3 bg-[#0B0B0C] border border-zinc-800 rounded-xl flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#D4AF37] text-black font-mono font-bold text-[10px] rounded shrink-0">
                          {entry.time}
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{entry.title}</h4>
                            {entry.badge && (
                              <span className="text-[9px] bg-zinc-800 text-[#D4AF37] px-1.5 py-0.2 rounded font-mono">
                                {entry.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400">{entry.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* RECENTLY VIEWED HISTORY SECTION */}
                {recentlyViewedNews.length > 0 && (
                  <section className="space-y-3 my-8">
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                      <Clock size={16} className="text-[#D4AF37]" />
                      <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                        Son Göz Atılan Haberler ({recentlyViewedNews.length})
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {recentlyViewedNews.map(item => (
                        <div 
                          key={`rec-${item.id}`}
                          onClick={() => handleSelectArticle(item)}
                          className="bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] p-2.5 rounded-xl cursor-pointer space-y-1.5 transition-all"
                        >
                          <img src={item.imageUrl} alt={item.title} className="w-full h-16 object-cover rounded-lg" />
                          <span className="text-[9px] text-[#D4AF37] font-bold block">{item.subcategory}</span>
                          <h5 className="text-[11px] font-bold text-white line-clamp-2 leading-snug">{item.title}</h5>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* DAILY POLL WIDGET & GLOSSARY BENTO ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
              {/* DAILY POLL WIDGET */}
              <section className="col-span-1 lg:col-span-2 bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Vote size={20} className="text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-base">
                      Günün Anketi & Kamuoyu Araştırması
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                    {totalPollVotes.toLocaleString()} Katılım
                  </span>
                </div>

                <p className="text-sm font-bold text-white leading-snug">
                  {pollData.question}
                </p>

                <div className="space-y-2.5 pt-2">
                  {pollData.options.map((opt) => {
                    const pct = totalPollVotes > 0 ? Math.round((opt.votes / totalPollVotes) * 100) : 0;
                    const isSelected = pollVotedOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleVote(opt.id)}
                        className={cn(
                          "w-full text-left p-3 rounded-2xl border text-xs transition-all relative overflow-hidden flex items-center justify-between",
                          isSelected ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white" : "bg-[#0B0B0C] border-zinc-800 hover:border-zinc-700 text-zinc-300"
                        )}
                      >
                        {/* Vote progress fill bar */}
                        {pollVotedOption && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-[#D4AF37]/15 transition-all duration-700" 
                            style={{ width: `${pct}%` }}
                          />
                        )}
                        <span className="relative z-10 font-medium truncate max-w-[80%]">{opt.label}</span>
                        {pollVotedOption && (
                          <span className="relative z-10 font-mono font-bold text-[#D4AF37]">{pct}%</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* GLOSSARY TOOLTIPS BENTO */}
              <section className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-3">
                    <HelpCircle size={18} className="text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-base">Teknik Sözlük & Kavramlar</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Makalelerde geçen teknik terimlerin anlamlarını öğrenmek için üzerine tıklayabilirsiniz:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {GLOSSARY_TERMS.map((gt) => (
                      <button
                        key={gt.term}
                        onClick={() => setActiveGlossaryTerm(gt)}
                        className="px-3 py-1.5 bg-[#0B0B0C] border border-zinc-700 hover:border-[#D4AF37] text-[#D4AF37] rounded-xl text-xs font-mono font-bold transition-all"
                      >
                        {gt.term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 font-mono">
                  BGL & Finans Sözlüğü v2026
                </div>
              </section>
            </div>

            {/* NEWSLETTER CAPTURE SECTION */}
            <section className="bg-gradient-to-r from-[#121215] via-[#1a1a20] to-[#121215] border border-[#D4AF37]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden my-8">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-extrabold rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                  <Mail size={12} />
                  Borsa & Teknoloji Bülteni
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Küresel Analizler Her Sabah E-Postanızda
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                  WebdeHepSeeK Editör Masası tarafından hazırlanan günlük borsa özetleri, kripto piyasası raporları ve BGL gemoloji bültenine ücretsiz abone olun.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                  <input 
                    type="email" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="E-posta adresinizi girin..." 
                    className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                  />
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110 shrink-0 transition-all shadow-md"
                  >
                    Abone Ol
                  </button>
                </form>
              </div>
            </section>

            {/* Article Detail Reader Modal */}
            <AnimatePresence>
              {selectedNewsArticle && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#121215] border-2 border-[#D4AF37] max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col justify-between"
                  >
                    {/* Article Reading Progress Bar */}
                    <div className="w-full bg-zinc-800 h-1">
                      <div className="bg-[#D4AF37] h-1 transition-all duration-300" style={{ width: '65%' }} />
                    </div>

                    {/* Modal Top Bar */}
                    <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#D4AF37] text-black text-[10px] font-extrabold rounded-full">
                          {selectedNewsArticle.category}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {selectedNewsArticle.subcategory}
                        </span>
                        {selectedNewsArticle.sentiment && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold rounded-full">
                            {selectedNewsArticle.sentiment}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {/* Font Size Selector with Persistence */}
                        <div className="hidden sm:flex items-center gap-1 bg-[#0B0B0C] border border-zinc-800 rounded-lg p-1 text-[11px] font-mono">
                          <button 
                            onClick={() => changeArticleFontSize('sm')}
                            className={cn("px-2 py-0.5 rounded font-bold", articleFontSize === 'sm' ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white")}
                          >
                            A-
                          </button>
                          <button 
                            onClick={() => changeArticleFontSize('md')}
                            className={cn("px-2 py-0.5 rounded font-bold", articleFontSize === 'md' ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white")}
                          >
                            A
                          </button>
                          <button 
                            onClick={() => changeArticleFontSize('lg')}
                            className={cn("px-2 py-0.5 rounded font-bold", articleFontSize === 'lg' ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white")}
                          >
                            A+
                          </button>
                        </div>

                        <button 
                          onClick={() => setSelectedNewsArticle(null)}
                          className="p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-800"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-6 overflow-y-auto font-sans">
                      {/* Breadcrumbs Navigation */}
                      <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-3">
                        <span>Anasayfa</span>
                        <ChevronRight size={10} />
                        <span>{selectedNewsArticle.category}</span>
                        <ChevronRight size={10} />
                        <span className="text-[#D4AF37]">{selectedNewsArticle.subcategory}</span>
                      </nav>

                      {/* Image with Lightbox Trigger */}
                      <div 
                        onClick={() => setSelectedLightboxImage(selectedNewsArticle.imageUrl)}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 shadow-md"
                      >
                        <img 
                          src={selectedNewsArticle.imageUrl} 
                          alt={selectedNewsArticle.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                          <ExternalLink size={16} className="text-[#D4AF37]" />
                          <span>Görseli Tam Ekran Büyüt (Lightbox)</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl font-serif font-bold text-white leading-tight">
                          {selectedNewsArticle.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono pt-1 border-b border-zinc-800 pb-3">
                          <span className="text-white font-semibold">Yazar: {selectedNewsArticle.author}</span>
                          <span>•</span>
                          <span>Tarih: {selectedNewsArticle.date}</span>
                          <span>•</span>
                          <span className="text-[#D4AF37]">{selectedNewsArticle.readTime} Okuma Süresi</span>
                        </div>
                      </div>

                      {/* EXECUTIVE SUMMARY BOX */}
                      {selectedNewsArticle.executiveSummary && (
                        <div className="p-4 bg-gradient-to-r from-[#121215] via-[#1c1a14] to-[#121215] border-l-4 border-[#D4AF37] rounded-r-2xl space-y-1 shadow-md">
                          <span className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-wider block">
                            ⚡ Yönetici Özeti (Executive Summary):
                          </span>
                          <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                            {selectedNewsArticle.executiveSummary}
                          </p>
                        </div>
                      )}

                      {/* AUDIO PLAYER SIMULATION WIDGET */}
                      <div className="bg-[#0B0B0C] border border-[#D4AF37]/40 rounded-2xl p-4 space-y-2 shadow-inner">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => {
                                setIsPlayingAudio(!isPlayingAudio);
                                showToast(isPlayingAudio ? "Sesli okuma durduruldu" : "Sesli okuma başlatıldı");
                              }}
                              className="w-10 h-10 bg-[#D4AF37] text-black rounded-full flex items-center justify-center font-bold hover:brightness-110 shadow-md"
                            >
                              {isPlayingAudio ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                            </button>
                            <div>
                              <span className="text-xs font-bold text-white block">AI Sesli Makale Dinle</span>
                              <span className="text-[10px] text-zinc-400">Doğal seslendirme ile makaleyi dinleyebilirsiniz</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-[#D4AF37] font-bold">
                            {isPlayingAudio ? "01:14 / 04:30" : "00:00"}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#D4AF37] transition-all duration-500" 
                            style={{ width: `${audioProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* One-Click Share Tray */}
                      <div className="flex items-center justify-between bg-[#0B0B0C] border border-zinc-800 p-3 rounded-2xl text-xs">
                        <span className="text-zinc-400 font-mono flex items-center gap-1.5">
                          <Share2 size={14} className="text-[#D4AF37]" />
                          <span>Makaleyi Paylaş:</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleCopy(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedNewsArticle.title)}`, "Twitter bağlantısı")}
                            className="px-2.5 py-1 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black rounded-lg text-[10px] font-bold text-zinc-200 transition-colors"
                          >
                            X (Twitter)
                          </button>
                          <button 
                            onClick={() => handleCopy(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(selectedNewsArticle.canonicalUrl || '')}`, "LinkedIn bağlantısı")}
                            className="px-2.5 py-1 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black rounded-lg text-[10px] font-bold text-zinc-200 transition-colors"
                          >
                            LinkedIn
                          </button>
                          <button 
                            onClick={() => handleCopy(selectedNewsArticle.canonicalUrl || 'https://webdehepseek.com', "Makale bağlantısı")}
                            className="px-2.5 py-1 bg-[#D4AF37] text-black font-bold text-[10px] rounded-lg hover:brightness-110 transition-colors"
                          >
                            Link Kopyala
                          </button>
                        </div>
                      </div>

                      {/* Table of Contents (İçindekiler) */}
                      {selectedNewsArticle.sections && selectedNewsArticle.sections.length > 0 && (
                        <div className="bg-[#0B0B0C] border border-[#D4AF37]/30 rounded-2xl p-4 space-y-2">
                          <span className="text-xs font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                            <List size={14} />
                            <span>İçindekiler & Başlıklar</span>
                          </span>
                          <ul className="space-y-1 text-xs text-zinc-300">
                            {selectedNewsArticle.sections.map((sec) => (
                              <li key={sec.id}>
                                <a href={`#${sec.id}`} className="hover:text-[#D4AF37] transition-colors">
                                  {sec.heading}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Article Body Content */}
                      <div className={cn(
                        "text-zinc-300 leading-relaxed space-y-4 font-serif",
                        articleFontSize === 'sm' ? 'text-xs' : articleFontSize === 'lg' ? 'text-base' : 'text-sm'
                      )}>
                        <p className="font-semibold text-white leading-relaxed text-base italic border-l-2 border-[#D4AF37] pl-3">
                          {selectedNewsArticle.excerpt}
                        </p>
                        
                        {selectedNewsArticle.sections ? (
                          selectedNewsArticle.sections.map((sec) => (
                            <div key={sec.id} id={sec.id} className="space-y-2 pt-2">
                              <h3 className="text-base font-serif font-bold text-white text-[#D4AF37]">
                                {sec.heading}
                              </h3>
                              <p className="text-zinc-300 leading-relaxed">
                                {sec.body}
                              </p>
                            </div>
                          ))
                        ) : (
                          <>
                            <p>
                              WebdeHepSeeK Yayın Grubu tarafından derlenen bu özel analiz, sektördeki en son gelişmeleri, piyasa verilerini ve uzman görüşlerini tek bir potada sunmaktadır.
                            </p>
                            <p>
                              Kategori genelinde gerçekleşen trend dönüşümleri, uluslararası piyasa aktörleri ve teknoloji liderlerinin stratejik adımlarıyla doğrudan bağlantılıdır.
                            </p>
                          </>
                        )}
                      </div>

                      {/* INTERACTIVE EMOJI REACTIONS */}
                      <div className="p-4 bg-[#0B0B0C] border border-[#D4AF37]/30 rounded-2xl space-y-2">
                        <span className="text-xs font-serif font-bold text-white block">Bu Makaleye Tepki Ver:</span>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleReaction(selectedNewsArticle.id, 'like')}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-[#D4AF37] hover:text-black rounded-xl text-xs font-bold text-zinc-200 transition-colors"
                          >
                            <span>👍 Beğen</span>
                            <span className="text-[10px] font-mono opacity-80">({(reactionsState[selectedNewsArticle.id]?.like || selectedNewsArticle.reactions?.like || 240)})</span>
                          </button>
                          <button 
                            onClick={() => handleReaction(selectedNewsArticle.id, 'analytic')}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-[#D4AF37] hover:text-black rounded-xl text-xs font-bold text-zinc-200 transition-colors"
                          >
                            <span>📊 Analitik</span>
                            <span className="text-[10px] font-mono opacity-80">({(reactionsState[selectedNewsArticle.id]?.analytic || selectedNewsArticle.reactions?.analytic || 110)})</span>
                          </button>
                          <button 
                            onClick={() => handleReaction(selectedNewsArticle.id, 'mindblown')}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-[#D4AF37] hover:text-black rounded-xl text-xs font-bold text-zinc-200 transition-colors"
                          >
                            <span>😲 Şaşırtıcı</span>
                            <span className="text-[10px] font-mono opacity-80">({(reactionsState[selectedNewsArticle.id]?.mindblown || selectedNewsArticle.reactions?.mindblown || 95)})</span>
                          </button>
                        </div>
                      </div>

                      {/* CORRECTION & UPDATE LOG */}
                      {selectedNewsArticle.correctionLog && (
                        <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200 space-y-1">
                          <span className="font-bold flex items-center gap-1 text-[#D4AF37]">
                            <CheckCircle size={13} />
                            Düzeltme & Güncelleme Günlüğü:
                          </span>
                          <p className="text-[11px] font-mono opacity-90">{selectedNewsArticle.correctionLog}</p>
                        </div>
                      )}

                      {/* AUTHOR BIO CARD */}
                      <div 
                        onClick={() => {
                          const matchAuth = AUTHORS_LIST.find(a => a.name === selectedNewsArticle.author) || AUTHORS_LIST[0];
                          setSelectedAuthorProfile(matchAuth);
                        }}
                        className="p-4 bg-[#0B0B0C] border border-zinc-800 hover:border-[#D4AF37] rounded-2xl flex items-start gap-4 shadow-md cursor-pointer transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black font-serif font-extrabold flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                          {selectedNewsArticle.author.slice(0, 1)}
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm group-hover:text-[#D4AF37] transition-colors">{selectedNewsArticle.author}</span>
                            <span className="text-[10px] bg-zinc-800 text-[#D4AF37] px-2 py-0.5 rounded font-mono">
                              {selectedNewsArticle.authorTitle || 'Kıdemli Yazar'}
                            </span>
                          </div>
                          <p className="text-zinc-400 leading-relaxed">
                            {selectedNewsArticle.authorBio || 'WebdeHepSeeK Yayın Grubu bünyesinde teknoloji, finans ve pazar analizleri hazırlayan uzman editör.'}
                          </p>
                          <span className="text-[10px] text-[#D4AF37] font-bold block pt-1">Yazarın Tüm Makalelerini İncele →</span>
                        </div>
                      </div>

                      {/* LIVE COMMENT & MODERATION SECTION */}
                      <div className="pt-4 border-t border-zinc-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <MessageSquare size={16} className="text-[#D4AF37]" />
                            <span>Okur Yorumları & Tartışma ({commentsList.filter(c => c.newsId === selectedNewsArticle.id).length})</span>
                          </h4>
                        </div>

                        {/* Add Comment Form */}
                        <form onSubmit={(e) => handleAddComment(selectedNewsArticle.id, e)} className="p-4 bg-[#0B0B0C] border border-zinc-800 rounded-2xl space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              value={newCommentAuthor}
                              onChange={(e) => setNewCommentAuthor(e.target.value)}
                              placeholder="Adınız Soyadınız (Varsayılan: Okur)..."
                              className="bg-[#121215] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                          <textarea 
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="Düşüncelerinizi ve analizinizi paylaşın..."
                            rows={3}
                            className="w-full bg-[#121215] border border-zinc-800 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37]"
                          />
                          <div className="text-right">
                            <button 
                              type="submit"
                              className="px-5 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-xl hover:brightness-110"
                            >
                              Yorum Gönder
                            </button>
                          </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-3">
                          {commentsList.filter(c => c.newsId === selectedNewsArticle.id).map(comment => (
                            <div key={comment.id} className="p-3 bg-[#0B0B0C] border border-zinc-800/80 rounded-xl space-y-1.5 text-xs">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white">{comment.author}</span>
                                  {comment.isVerified && (
                                    <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono rounded">
                                      Onaylı Okur
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-zinc-500 font-mono">{comment.date}</span>
                              </div>
                              <p className="text-zinc-300 leading-relaxed">{comment.text}</p>
                              <div className="pt-1 flex justify-end">
                                <button 
                                  onClick={() => handleLikeComment(comment.id)}
                                  className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-[#D4AF37]"
                                >
                                  <ThumbsUp size={11} />
                                  <span>Beğen ({comment.likes})</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* RELATED ARTICLES RECOMMENDED MATRIX */}
                      {relatedNews.length > 0 && (
                        <div className="pt-4 border-t border-zinc-800 space-y-3">
                          <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                            İlgili Diğer Makaleler
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {relatedNews.map((rel) => (
                              <div 
                                key={rel.id} 
                                onClick={() => setSelectedNewsArticle(rel)}
                                className="bg-[#0B0B0C] border border-zinc-800 hover:border-[#D4AF37] p-3 rounded-xl cursor-pointer space-y-1 transition-all"
                              >
                                <span className="text-[9px] text-[#D4AF37] font-bold block">{rel.subcategory}</span>
                                <h5 className="text-xs font-bold text-white line-clamp-2">{rel.title}</h5>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Canonical URL */}
                      <div className="p-3 bg-[#0B0B0C] rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Canonical URL:</span>
                          <span className="text-[#D4AF37] truncate max-w-sm">{selectedNewsArticle.canonicalUrl}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex justify-end">
                      <button 
                        onClick={() => setSelectedNewsArticle(null)}
                        className="px-5 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-xl"
                      >
                        Kapat
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* GLOSSARY TOOLTIP MODAL */}
            <AnimatePresence>
              {activeGlossaryTerm && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#121215] border border-[#D4AF37] max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <span className="font-mono font-bold text-[#D4AF37] text-sm">
                        {activeGlossaryTerm.term} (Teknik Terim)
                      </span>
                      <button onClick={() => setActiveGlossaryTerm(null)} className="p-1 text-zinc-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {activeGlossaryTerm.definition}
                    </p>
                    <div className="pt-2 text-right">
                      <button 
                        onClick={() => setActiveGlossaryTerm(null)}
                        className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl"
                      >
                        Anladım
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* TAB 2: 14 CORE CATEGORIES & MEGA NAV */}
        {activeTab === 'nav' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <span className="px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                  14 Ana Kategori & 140 Alt Başlık
                </span>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">
                  Navigasyon & Yayın Yapısı
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {SITE_STRUCTURE.map((cat) => (
                <div 
                  key={cat.id}
                  className="bg-[#121215] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between group-hover:bg-[#D4AF37] transition-colors">
                      <span className="font-bold text-xs uppercase tracking-wide text-zinc-100 group-hover:text-black transition-colors line-clamp-1">
                        {cat.name}
                      </span>
                      {cat.badge && (
                        <span className="px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] group-hover:bg-black group-hover:text-white text-[9px] font-extrabold rounded uppercase">
                          {cat.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 space-y-1.5">
                      {cat.subcategories.map((sub) => (
                        <div 
                          key={sub} 
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setSelectedSubcategory(sub);
                            setActiveTab('news');
                          }}
                          className="flex items-center justify-between text-xs text-zinc-400 hover:text-[#D4AF37] cursor-pointer transition-colors p-1 rounded hover:bg-zinc-900/60"
                        >
                          <span className="truncate max-w-[170px]">{sub}</span>
                          <ChevronRight size={10} className="text-[#D4AF37]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-950 border-t border-zinc-800 text-center">
                    <button 
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setSelectedSubcategory(null);
                        setActiveTab('news');
                      }}
                      className="text-[10px] font-bold text-[#D4AF37] hover:underline"
                    >
                      Haberlerini Gör
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GOOGLE ANALYTICS & SEARCH CONSOLE INTEGRATION */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold rounded-full uppercase tracking-widest flex items-center gap-1.5 w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Google Integration Ready
                </span>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">
                  Google Analitik & Search Console Konsolu
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Sitenize ait gerçek Google Analytics (GA4) ve Search Console mülk takip kodlarınızı aşağıya tanımlayabilirsiniz.
                </p>
              </div>
              <button
                onClick={handleSaveAnalyticsConfig}
                className="px-5 py-2.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110 transition-all shrink-0 shadow-lg"
              >
                Konfigürasyonu Kaydet
              </button>
            </div>

            {/* INTEGRATION INPUT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GA4 */}
              <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart2 size={20} className="text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-base">Google Analytics 4 (GA4)</h3>
                  </div>
                  <span className={cn(
                    "text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border",
                    ga4Id ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                  )}>
                    {ga4Id ? '✓ GA4 Bağlı' : 'Entegrasyon Bekliyor'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Google Analytics mülkünüzden aldığınız Measurement ID (Örn: <code className="text-[#D4AF37]">G-XXXXXXXXXX</code>) kodunu girin.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">GA4 Measurement ID</label>
                  <input
                    type="text"
                    value={ga4Id}
                    onChange={(e) => setGa4Id(e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* SEARCH CONSOLE */}
              <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield size={20} className="text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-base">Google Search Console</h3>
                  </div>
                  <span className={cn(
                    "text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border",
                    gscTag ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                  )}>
                    {gscTag ? '✓ Doğrulama Etiketi Var' : 'Doğrulama Bekliyor'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Search Console mülk doğrulama için verilen HTML meta etiketini buraya yapıştırın.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Verification Meta Tag</label>
                  <input
                    type="text"
                    value={gscTag}
                    onChange={(e) => setGscTag(e.target.value)}
                    placeholder='<meta name="google-site-verification" content="..." />'
                    className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* GENERATED HEAD SNIPPET CODE BOX */}
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-3 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between text-[#D4AF37]">
                <span className="font-bold flex items-center gap-2">
                  <FileJson size={16} />
                  <span>Otomatik Oluşturulan Head Etiket Kodları</span>
                </span>
                <button
                  onClick={() => handleCopy(
                    `<!-- Google Analytics 4 (GA4) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id || 'G-XXXXXXXXXX'}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${ga4Id || 'G-XXXXXXXXXX'}');\n</script>\n${gscTag ? `<!-- Search Console Verification -->\n${gscTag}\n` : ''}`,
                    "Analytics Snippet"
                  )}
                  className="px-3 py-1 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-bold text-white transition-colors"
                >
                  Snippet'ı Kopyala
                </button>
              </div>
              <pre className="text-emerald-400 bg-[#0B0B0C] p-4 rounded-xl overflow-x-auto text-[11px] leading-relaxed border border-zinc-800">
{`<!-- Google Analytics 4 (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id || 'G-XXXXXXXXXX'}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${ga4Id || 'G-XXXXXXXXXX'}');
</script>
${gscTag ? `\n<!-- Google Search Console Verification -->\n${gscTag}` : ''}`}
              </pre>
            </div>

            {/* CHECKLIST */}
            <div className="bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-6 space-y-3">
              <h4 className="font-serif font-bold text-white text-sm text-[#D4AF37] flex items-center gap-2">
                <Sparkles size={16} />
                <span>Google Indexing & E-E-A-T Yayıncılık Rehberi</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Sitemap Adresi: <code className="text-[#D4AF37] font-mono">/sitemap.xml</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Google News Uyumlu RSS: <code className="text-[#D4AF37] font-mono">/feed.xml</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Schema.org NewsArticle Yapılandırılmış Verisi Entegre</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Core Web Vitals LCP & CLS Performansı Optimize Edilmiş</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM INFRASTRUCTURE STATUS */}
        {activeTab === 'system' && (
          <div className="space-y-8">
            <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                  Yayın Altyapısı & Sunucu Ağ Performansı
                </span>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">
                  Küresel Yayın & Dağıtım Düğümleri
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">4/4 Düğüm Tam Kapasite Aktif</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SYSTEM_NODES.map((node) => (
                <div key={node.id} className="bg-[#121215] border border-zinc-800 p-5 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] bg-zinc-800 text-[#D4AF37] px-2.5 py-1 rounded-full font-bold">{node.code}</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Performans: %{node.performance}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{node.name}</h4>
                  <p className="text-xs text-zinc-400">{node.description}</p>
                  <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-500 font-mono">
                    <span className="text-[#D4AF37] font-semibold">Son Durum:</span> {node.lastAction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AI CLASSIFIER */}
        {activeTab === 'ai' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="border-b border-zinc-800 pb-6">
              <h2 className="text-3xl font-serif font-bold text-white">AI Metin Analizi & Sınıflandırma</h2>
              <p className="text-zinc-400 text-sm mt-1">İçerikleri 15 ana kategori ve 150 alt başlığımıza göre anında analiz edin.</p>
            </div>
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-4">
              <textarea 
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                placeholder="Herhangi bir haber metni girin..."
                className="w-full h-40 bg-[#0B0B0C] border border-zinc-700 rounded-xl p-4 text-xs text-white outline-none focus:border-[#D4AF37]"
              />
              <button onClick={classifyNewsWithGemini} disabled={isClassifying} className="w-full py-3 bg-[#D4AF37] text-black font-bold text-xs uppercase rounded-xl hover:brightness-110 transition-all">
                {isClassifying ? "Sınıflandırılıyor..." : "Kategoriyi Analiz Et"}
              </button>
              {classificationResult && (
                <div className="p-4 bg-[#0B0B0C] border border-emerald-500 rounded-2xl text-xs space-y-2">
                  <p className="text-emerald-400 font-bold">Kategori: {classificationResult.category} / {classificationResult.subcategory}</p>
                  <p className="text-zinc-300">Muhakeme: {classificationResult.reasoning}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: WORDPRESS EXPORT & SITEMAP XML */}
        {activeTab === 'wp' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-serif font-bold text-white">WordPress Kategori Export & Google Sitemap.xml</h2>
                <p className="text-zinc-400 text-sm mt-1">
                  15 Ana Kategori ve 150 Alt Başlığın WordPress REST API ve Google News Sitemap XML çıktısı.
                </p>
              </div>
              <button
                onClick={() => {
                  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${MOCK_NEWS.map(n => `  <url>\n    <loc>${n.canonicalUrl}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>WebdeHepSeeK Journal</news:name>\n        <news:language>tr</news:language>\n      </news:publication>\n      <news:publication_date>2026-10-06</news:publication_date>\n      <news:title>${n.title.replace(/&/g, '&amp;')}</news:title>\n    </news:news>\n  </url>`).join('\n')}\n</urlset>`;
                  handleCopy(xml, "Google News Sitemap.xml");
                }}
                className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:brightness-110 shrink-0"
              >
                Sitemap XML Kopyala
              </button>
            </div>

            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-[#D4AF37]">
                <span>wp_hierarchy_150_subcategories.json</span>
                <button 
                  onClick={() => handleCopy(JSON.stringify(SITE_STRUCTURE, null, 2), "WP JSON Hiyerarşisi")}
                  className="px-3 py-1 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-bold"
                >
                  Kopyala
                </button>
              </div>
              <pre className="text-emerald-400 bg-[#0B0B0C] p-4 rounded-xl overflow-x-auto max-h-96">
                {JSON.stringify(SITE_STRUCTURE.map(c => ({
                  parent: c.name,
                  slug: c.id,
                  children: c.subcategories
                })), null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 8: LEGAL & KVKK DOCUMENTS */}
        {activeTab === 'legal' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="border-b border-zinc-800 pb-6">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                Kurumsal & Yasal Uyum
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-2">
                KVKK, GDPR & Yasal Metinler
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(LEGAL_DOCUMENTS).map(([key, doc]) => (
                <div key={key} className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-3">
                  <h3 className="text-base font-serif font-bold text-[#D4AF37]">{doc.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-4">{doc.content}</p>
                  <button 
                    onClick={() => setActiveLegalModal(key as any)}
                    className="text-xs font-bold text-emerald-400 hover:underline pt-2 block"
                  >
                    Tam Metni Okuyun →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* RESPONSIVE MOBILE BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121215]/95 border-t border-[#D4AF37]/30 backdrop-blur-lg px-2 py-2 flex items-center justify-around text-zinc-400 text-[10px] lg:hidden">
        <button 
          onClick={() => { setActiveTab('news'); setSelectedCategory(null); setSelectedSubcategory(null); }}
          className={cn("flex flex-col items-center gap-1 font-bold", activeTab === 'news' ? "text-[#D4AF37]" : "hover:text-white")}
        >
          <Newspaper size={18} />
          <span>Haberler</span>
        </button>
        <button 
          onClick={() => setActiveTab('nav')}
          className={cn("flex flex-col items-center gap-1 font-bold", activeTab === 'nav' ? "text-[#D4AF37]" : "hover:text-white")}
        >
          <LayoutGrid size={18} />
          <span>Kategoriler</span>
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={cn("flex flex-col items-center gap-1 font-bold", activeTab === 'analytics' ? "text-[#D4AF37]" : "hover:text-white")}
        >
          <BarChart2 size={18} />
          <span>Google Konsol</span>
        </button>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex flex-col items-center gap-1 font-bold hover:text-white text-[#D4AF37]"
        >
          {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          <span>Tema</span>
        </button>
      </div>

      {/* Sticky Cookie Consent Banner */}
      {!cookieConsentAccepted && (
        <div className="fixed bottom-14 sm:bottom-0 inset-x-0 z-50 bg-[#121215] border-t-2 border-[#D4AF37] p-4 shadow-2xl backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-zinc-300 space-y-1">
              <span className="font-bold text-white flex items-center gap-2">
                <Shield size={14} className="text-[#D4AF37]" />
                Çerez Politikası ve KVKK Aydınlatma Rızası
              </span>
              <p className="text-[11px] text-zinc-400">
                WebdeHepSeeK, kişiselleştirilmiş içerik sunmak ve site performansını ölçmek amacıyla çerezler kullanır.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setActiveLegalModal('cookies')}
                className="text-[#D4AF37] hover:underline text-xs"
              >
                Çerez Detayları
              </button>
              <button 
                onClick={handleAcceptCookies}
                className="px-5 py-2 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110"
              >
                Kabul Et ve Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal Full Document Modal */}
      <AnimatePresence>
        {activeLegalModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121215] border border-[#D4AF37] max-w-2xl w-full rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-xl font-serif font-bold text-[#D4AF37]">
                  {LEGAL_DOCUMENTS[activeLegalModal].title}
                </h3>
                <button onClick={() => setActiveLegalModal(null)} className="p-1 text-zinc-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed space-y-3 font-sans max-h-80 overflow-y-auto pr-2">
                <p>{LEGAL_DOCUMENTS[activeLegalModal].content}</p>
                <p>
                  WebdeHepSeeK ekosisteminde KVKK 6698 uyarınca veri sahipleri haklarını diledikleri zaman kullanabilirler.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-800 text-right">
                <button 
                  onClick={() => setActiveLegalModal(null)}
                  className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl"
                >
                  Anladım
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* READER PROFILE MODAL */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                  <User size={18} />
                  <span>Okur Hesabı & Tercihler</span>
                </h3>
                <button onClick={() => setIsProfileModalOpen(false)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#0B0B0C] border border-zinc-800 rounded-2xl space-y-1">
                  <span className="font-bold text-white text-sm">{userProfile.name}</span>
                  <p className="text-zinc-400 font-mono">{userProfile.email}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Aktif Premium Okur</span>
                </div>
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-[#0B0B0C] border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 text-[10px] block">Kaydedilen Haberler</span>
                    <strong className="text-white text-base">{bookmarkedIds.length} Makale</strong>
                  </div>
                  <div className="p-3 bg-[#0B0B0C] border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 text-[10px] block">Son Göz Atılanlar</span>
                    <strong className="text-[#D4AF37] text-base">{recentlyViewedIds.length} Makale</strong>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-right">
                <button onClick={() => setIsProfileModalOpen(false)} className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl">Kapat</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FINANCIAL CALCULATOR MODAL */}
      <AnimatePresence>
        {isCalcModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                  <Calculator size={18} />
                  <span>Döviz & Kripto Finans Hesaplayıcı</span>
                </h3>
                <button onClick={() => setIsCalcModalOpen(false)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Tutar ($ - USD):</label>
                  <input type="number" value={calcUsdInput} onChange={(e) => setCalcUsdInput(Number(e.target.value))} className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl p-2.5 text-white font-mono text-xs outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="p-3 bg-[#0B0B0C] border border-zinc-800 rounded-xl space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Türk Lirası Karşılığı (USD/TRY 38.45):</span>
                    <strong className="text-white">{(calcUsdInput * 38.45).toLocaleString('tr-TR')} ₺</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Bitcoin Karşılığı ($152,400):</span>
                    <strong className="text-[#D4AF37]">{(calcUsdInput / 152400).toFixed(6)} BTC</strong>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-right">
                <button onClick={() => setIsCalcModalOpen(false)} className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl">Tamam</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRESS RELEASE PORTAL MODAL */}
      <AnimatePresence>
        {isPressReleaseModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                  <Send size={18} />
                  <span>Basın Bülteni & Lansman Duyuru Portalı</span>
                </h3>
                <button onClick={() => setIsPressReleaseModalOpen(false)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); showToast("Basın bülteniniz editör masasına iletildi."); setIsPressReleaseModalOpen(false); }} className="space-y-3 text-xs">
                <input type="text" required placeholder="Bülten Başlığı..." className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]" />
                <textarea required rows={4} placeholder="Kurumsal duyuru metni ve iletişim bilgileri..." className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37]" />
                <button type="submit" className="w-full py-2.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl">Editör Masasına Gönder</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUPPORT & BUY ME A COFFEE MODAL */}
      <AnimatePresence>
        {isSupportModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                  <Coffee size={18} />
                  <span>Bağımsız Gazeteciliği Destekleyin</span>
                </h3>
                <button onClick={() => setIsSupportModalOpen(false)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                WebdeHepSeeK Journal, reklamlardan bağımsız tarafsız ve derinlemesine teknoloji gazeteciliği sunar. Yayın kalitemize katkıda bulunabilirsiniz.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {['50 ₺', '100 ₺', '250 ₺'].map(amt => (
                  <button key={amt} onClick={() => { showToast(`${amt} destek katkınız için teşekkür ederiz!`); setIsSupportModalOpen(false); }} className="py-2.5 bg-[#0B0B0C] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] font-bold text-xs rounded-xl transition-all">{amt}</button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AUTHOR ARCHIVE MODAL */}
      <AnimatePresence>
        {selectedAuthorProfile && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-serif font-bold flex items-center justify-center text-base">
                    {selectedAuthorProfile.avatarLetter}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedAuthorProfile.name}</h3>
                    <span className="text-[10px] text-[#D4AF37] font-mono">{selectedAuthorProfile.title}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedAuthorProfile(null)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-[#0B0B0C] p-3 rounded-xl border border-zinc-800">
                {selectedAuthorProfile.bio}
              </p>
              <div className="space-y-2">
                <span className="text-xs font-serif font-bold text-white block">Yazarın Makaleleri ({selectedAuthorProfile.articlesCount}):</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {MOCK_NEWS.filter(n => n.author === selectedAuthorProfile.name).map(article => (
                    <div key={article.id} onClick={() => { handleSelectArticle(article); setSelectedAuthorProfile(null); }} className="p-2 bg-[#0B0B0C] hover:border-[#D4AF37] border border-zinc-800 rounded-lg text-xs cursor-pointer flex justify-between items-center">
                      <span className="truncate text-zinc-200">{article.title}</span>
                      <ChevronRight size={12} className="text-[#D4AF37] shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX IMAGE VIEWER MODAL */}
      <AnimatePresence>
        {selectedLightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative max-w-5xl w-full flex flex-col items-center">
              <button onClick={() => setSelectedLightboxImage(null)} className="absolute -top-12 right-0 p-2 bg-[#D4AF37] text-black font-bold rounded-full hover:brightness-110">
                <X size={20} />
              </button>
              <img src={selectedLightboxImage} alt="Lightbox Fullscreen View" className="max-h-[85vh] w-auto object-contain rounded-2xl border-2 border-[#D4AF37] shadow-2xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#121215] border-t border-[#D4AF37]/25 text-zinc-400 py-12 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 col-span-1 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black font-serif font-black italic">
                  W
                </div>
                <span className="text-lg font-serif font-bold text-white">WebdeHepSeeK Journal</span>
              </div>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                Teknoloji, yapay zeka, kripto ve finans dünyasının prestijli yayın organı.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3 text-[#D4AF37]">Kurumsal & Yasal</h4>
              <ul className="space-y-2">
                <li onClick={() => setActiveLegalModal('kvkk')} className="hover:text-white cursor-pointer">KVKK Aydınlatma Metni</li>
                <li onClick={() => setActiveLegalModal('privacy')} className="hover:text-white cursor-pointer">Gizlilik Politikası</li>
                <li onClick={() => setActiveLegalModal('terms')} className="hover:text-white cursor-pointer">Kullanım Koşulları</li>
                <li onClick={() => setActiveLegalModal('cookies')} className="hover:text-white cursor-pointer">Çerez Politikası</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3 text-[#D4AF37]">Yayın Standartları</h4>
              <ul className="space-y-2">
                <li>Google News Uyumlu</li>
                <li>Tarafsız Gazetecilik İlkeleri</li>
                <li>Core Web Vitals Skoru 98/100</li>
                <li>E-E-A-T Editöryal Kalite</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 text-center text-zinc-500 font-mono text-[10px]">
            © 2026 WebdeHepSeeK Journal. Tüm Hakları Saklıdır. Obsidian Gold Architecture.
          </div>
        </div>
      </footer>

    </div>
  );
}
