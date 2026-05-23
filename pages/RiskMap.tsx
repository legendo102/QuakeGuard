
import React from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Info, AlertTriangle, ExternalLink, Globe, Layers } from 'lucide-react';

const RiskMap: React.FC = () => {
  const mapUrl = "https://tdth.afad.gov.tr/TDTH/main.xhtml";

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-xs font-black uppercase tracking-widest mb-2"
        >
          <Layers className="w-3.5 h-3.5" /> Resmi Veri Kaynakları
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold title-font text-white">Sarıyer Risk Analiz Merkezi</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          AFAD ve resmi kurumlar tarafından sağlanan interaktif haritalar üzerinden bölgenizdeki sismik riskleri sorgulayabilirsiniz.
        </p>
      </div>

      {/* AFAD Map Link Section */}
      <div className="relative min-h-[480px] md:h-[500px] w-full rounded-[40px] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center py-12 px-5 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),transparent_70%)]" />
        <div className="relative z-10 text-center max-w-2xl space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-red-600/20 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mx-auto border border-red-500/30">
              <MapIcon className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white title-font px-2">Resmi AFAD İnteraktif Haritası</h3>
            <p className="text-slate-400 text-sm sm:text-xl leading-relaxed px-2">
              Türkiye Deprem Tehlike Haritaları (TDTH) sistemi üzerinden Sarıyer'deki parsel bazlı ivme değerlerini ve deprem tehlike parametrelerini resmi olarak sorgulayabilirsiniz.
            </p>
          </div>

          <motion.a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 sm:gap-4 bg-white text-slate-950 px-6 sm:px-12 py-4 sm:py-6 rounded-[24px] sm:rounded-[28px] font-black text-base sm:text-xl transition-all shadow-xl shadow-white/5"
          >
            <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
            E-DEVLET SİSTEMİNE GİT
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
          
          <p className="text-slate-500 text-sm font-medium">
            * Yönlendirilen site T.C. İçişleri Bakanlığı AFAD Başkanlığı'na aittir.
          </p>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4 hover:border-red-500/30 transition-all group">
          <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center">
            <Info className="w-6 h-6 text-red-500" />
          </div>
          <h4 className="font-bold text-xl">Zemin Yapısı</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Sarıyer'in jeolojik yapısı çoğunlukla dirençli kayaçlardan oluşur. Ancak vadi içleri ve kıyı dolgu alanlarında yerel zemin büyütmesi riski mevcuttur.
          </p>
        </div>

        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4 hover:border-orange-500/30 transition-all group">
          <div className="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
          </div>
          <h4 className="font-bold text-xl">Yapı Güvenliği</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            İlçedeki yapı stoğunun yaşı, olası bir sarsıntıda binanın performansını doğrudan etkiler. Eski yönetmeliklere göre yapılmış binalar öncelikli incelenmelidir.
          </p>
        </div>

        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4 hover:border-blue-500/30 transition-all group">
          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center">
            <MapIcon className="w-6 h-6 text-blue-500" />
          </div>
          <h4 className="font-bold text-xl">Toplanma Planı</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Acil durum anında en yakın toplanma alanını bilmek hayati önem taşır. Sarıyer Belediyesi'nin güncel afet haritalarını takip edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskMap;
