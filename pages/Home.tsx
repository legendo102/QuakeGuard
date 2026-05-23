
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, ShieldCheck, HeartPulse, ExternalLink, X, Shield } from 'lucide-react';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="space-y-12 pb-20">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck className="w-64 h-64 -rotate-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-red-500/30 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-red-400/30"
          >
            Önemli Bilgilendirme
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold title-font mb-6 leading-tight"
          >
            Depreme Karşı Hazır Mısınız?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-red-100 mb-8"
          >
            Türkiye bir deprem ülkesidir. Hazırlıklı olmak, panik yerine bilinçle hareket etmek hayat kurtarır. QuakeGuard ile risklerinizi analiz edin ve yaşam alanınızı güvenli hale getirin.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center gap-2"
            >
              <Info className="w-5 h-5" /> Daha Fazla Öğren
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-600 p-3 rounded-2xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold title-font text-white">QuakeGuard Hakkında</h3>
              </div>
              
              <div className="space-y-4 text-slate-300">
                <p>
                  QuakeGuard, deprem risklerini minimize etmek için tasarlanmış kapsamlı bir güvenlik platformudur. Yapay zeka destekli analizler, interaktif kat planları ve yerel risk haritaları ile kullanıcıların hazırlıklı olmasını sağlar.
                </p>
                <p>
                  Misyonumuz, modern teknolojiyi (Gemini AI) ve bilimsel verileri birleştirerek, deprem öncesinde, anında ve sonrasında hayat kurtaran pratik çözümler sunmaktır.
                </p>
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="font-bold text-white mb-2">Özelliklerimiz:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Konum Bazlı Risk Analizi</li>
                    <li>Bina Yapısı Değerlendirmesi</li>
                    <li>Akıllı Yaşam Üçgeni Planlayıcı</li>
                    <li>Uzman AI Tavsiyeleri</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-600/20 rounded-2xl">
              <HeartPulse className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold title-font">Yaşam Üçgeni Nedir?</h3>
          </div>
          <p className="text-slate-400 leading-relaxed mb-6">
            Deprem anında bina yıkılması durumunda, tavanın ağırlığı altındaki eşyaların (koltuk, yatak, sandık vb.) yanına düştüğünde oluşan boşluğa <strong>Yaşam Üçgeni</strong> denir. Bu alanlar hayatta kalma şansını artırır.
          </p>
          <ul className="space-y-4">
            {[
              "Sabitlenmemiş ağır eşyalardan uzak durun.",
              "Dayanıklı bir mobilyanın yanına cenin pozisyonunda kıvrılın.",
              "Pencerelerden ve dış duvarlardan kaçının.",
              "Başınızı ve ensenizi ellerinizle koruyun."
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-600/20 rounded-2xl">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold title-font">Deprem Çantası</h3>
          </div>
          <p className="text-slate-400 leading-relaxed mb-6">
            Afet sonrası ilk 72 saat hayati önem taşır. Çantanızın her an ulaşılabilecek bir yerde olması gerekir.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Su ve Kuru Gıda",
              "İlk Yardım Seti",
              "El Feneri ve Pil",
              "Düdük ve Çakı",
              "Kişisel Evraklar",
              "Battaniye ve Giysi"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl text-slate-300">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <section className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Daha Fazla Bilgi Mi Gerekiyor?</h3>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          AFAD ve Kızılay'ın resmi web sitelerini ziyaret ederek bölgenizdeki toplanma alanlarını ve acil durum protokollerini öğrenebilirsiniz.
        </p>
        <div className="flex justify-center gap-6">
          <a href="https://www.afad.gov.tr" target="_blank" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium underline underline-offset-4">AFAD Resmi Sitesi</a>
          <a href="https://www.kizilay.org.tr" target="_blank" className="text-red-400 hover:text-red-300 flex items-center gap-1 font-medium underline underline-offset-4">Türk Kızılay</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
