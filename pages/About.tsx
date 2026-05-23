
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Code, Search, FileText, GraduationCap, School, Heart, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: "Mustafa Efe Yüksel",
      role: "Kodlama ve Yazılım",
      desc: "10. sınıfta okuyan bir öğrencidir. Kendisinin orta düzeyde kodlama bilgisi vardır. Bu uygulamanın yazılımını Google AI Studio'nun desteği ile yapmıştır. Kendisi daha önce İHA, SİHA ve İDA projelerinde ve Hackathon yarışmasında yer almıştır.",
      icon: Code,
      badge: "İHA/SİHA Yazılımcısı",
      color: "from-red-500 via-orange-500 to-yellow-500",
      skills: ["React & TS", "AI Integration", "İHA/SİHA/İDA", "Hackathon"]
    },
    {
      name: "Ahmet Miraç Erdoğan",
      role: "Araştırma ve Metin Yazımı",
      desc: "10. sınıfta okuyan bir öğrencidir. Projedeki bilgilerin araştırılıp yazılmasında görev almıştır. Kendisi daha önce birçok alanda birçok Tübitak ve Teknofest projesinde yer almıştır.",
      icon: Search,
      badge: "Teknofest & Tübitak Gazisi",
      color: "from-blue-500 via-indigo-500 to-purple-500",
      skills: ["Coğrafya Araştırma", "Teknofest", "TÜBİTAK", "Veri Analizi"]
    },
    {
      name: "Emre Berk Kabacık",
      role: "Araştırma ve Metin Yazımı",
      desc: "10. sınıfta okuyan bir öğrencidir. Uygulamadaki kullanıcı sözleşmesinin yapımında rol almıştır. Kendisi daha önce manyetik alanda birçok Tübitak ve Teknofest projesinde yer almıştır.",
      icon: FileText,
      badge: "Mevzuat ve Analiz Lideri",
      color: "from-green-500 via-emerald-500 to-teal-500",
      skills: ["Sözleşme Tasarımı", "TÜBİTAK", "Teknofest", "Akademik Yazım"]
    },
    {
      name: "Cem Oğuz Büke",
      role: "Danışmanlık",
      desc: "10. sınıflarda ders anlatan bir coğrafya öğretmenidir. Kendisi bu projede öğrencilere danışmanlık yapıp onlara yol göstermiştir.",
      icon: GraduationCap,
      badge: "Proje Koordinatörü",
      color: "from-purple-500 via-pink-500 to-red-500",
      skills: ["Coğrafya Eğitimi", "Proje Danışmanlığı", "Mentörlük", "Haritacılık"]
    }
  ];

  // Particle list for background visual impact
  const particles = React.useMemo(() => [...Array(15)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * -15
  })), []);

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 relative overflow-hidden px-4">
      {/* Immersive Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: ["0%", "-100%"],
              opacity: [0, 0.8, 0.8, 0],
              x: [`${p.x}%`, `${p.x + (Math.random() * 8 - 4)}%`]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
            className="absolute bg-red-600 rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              bottom: "0%"
            }}
          />
        ))}
      </div>

      {/* Magnificent Interactive Hero Section */}
      <section className="text-center space-y-8 py-10 relative z-10">
        {/* Cosmic Ultra-glowing Concentric Ring Animation for Question Mark */}
        <div className="relative inline-flex items-center justify-center mb-4">
          {/* Animated Wave Rings (Pulsing outwards) */}
          <motion.div
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
            className="absolute w-24 h-24 border-2 border-red-500 rounded-full blur-md"
          />
          <motion.div
            animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
            className="absolute w-24 h-24 border-2 border-orange-500 rounded-full blur-sm"
          />
          <motion.div
            animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 1 }}
            className="absolute w-24 h-24 border-2 border-red-600 rounded-full"
          />

          {/* Core Glorious Glowing Button */}
          <motion.div
            animate={{ 
              rotate: [0, 8, -8, 8, -8, 0],
              scale: [1, 1.08, 0.96, 1.04, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.5, 
              ease: "easeInOut" 
            }}
            whileHover={{ scale: 1.15, rotate: 360, transition: { duration: 0.8 } }}
            className="relative z-20 bg-gradient-to-tr from-red-600 to-orange-500 p-8 rounded-full border border-red-400/40 shadow-[0_0_50px_rgba(239,68,68,0.7)] cursor-pointer"
          >
            <HelpCircle className="w-16 h-16 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" />
            <motion.div
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-full filter blur-[1px]"
            />
          </motion.div>

          <div className="absolute -top-12 -right-12 animate-bounce">
            <span className="bg-red-500/15 text-red-500 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-red-500/30 shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Keşfet
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-black title-font tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500">
            Biz Kimiz?
          </h2>
          <div className="w-28 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full" />
        </div>

        {/* Dynamic Glassmorphism Intro Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-3xl mx-auto p-8 bg-slate-900/80 border border-slate-800/80 rounded-[40px] relative overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-red-500/20 transition-all duration-500"
        >
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-700" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl group-hover:bg-orange-600/20 transition-all duration-700" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4 justify-center">
              <School className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="text-red-500 font-extrabold tracking-[0.2em] uppercase text-xs">Darüşşafaka Eğitim Kurumları</span>
            </div>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-semibold">
              Biz Darüşşafaka Eğitim Kurumları'nın yetiştirmekte olduğu öğrencileriz. Bu uygulamayı oluşturma amacımız okulumuz tarafından bize verilen coğrafya projesini tamamlamaktır.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Gorgeous Immersive Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            className="group relative bg-slate-950 border border-slate-900 rounded-[48px] p-8 md:p-10 overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_25px_50px_rgba(220,38,38,0.12)] shadow-xl"
          >
            {/* Immersive Custom Gradient Lights behind each card */}
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${member.color} opacity-[0.03] blur-3xl group-hover:opacity-[0.16] transition-all duration-700`} />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

            <div className="relative z-10 space-y-6">
              {/* Card Header Info with Icon Badge */}
              <div className="flex items-center justify-between gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white shadow-xl shadow-red-950/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <member.icon className="w-7 h-7" />
                </div>
                {/* Achievement Badge */}
                <span className="text-[10px] md:text-xs font-black uppercase text-red-400 bg-red-900/15 border border-red-500/20 px-3 py-1.5 rounded-full shadow-inner tracking-wide">
                  {member.badge}
                </span>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-black text-white title-font group-hover:text-red-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-slate-400 font-extrabold text-xs md:text-sm tracking-widest uppercase">
                  {member.role}
                </p>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                {member.desc}
              </p>

              {/* Skill Pill Badges */}
              <div className="pt-4 border-t border-slate-900 flex flex-wrap gap-2">
                {member.skills.map((skill, si) => (
                  <span 
                    key={si}
                    className="text-[10px] md:text-xs text-slate-400 bg-slate-900/95 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Elegant Moving Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-3 pt-12 text-slate-400 font-bold italic tracking-wide text-center"
      >
        <Heart className="w-5 h-5 text-red-500 animate-pulse fill-red-600 shrink-0" />
        <span>Eğitimde Fırsat Eşitliği ile Geleceği Aydınlatıyoruz.</span>
      </motion.div>
    </div>
  );
};

export default About;
