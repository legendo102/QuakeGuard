
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Home, Map, User, BrainCircuit, LayoutGrid, Menu, X, Info } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'Ana Sayfa' },
    { id: 'map', icon: Map, label: 'Sarıyer Haritası' },
    { id: 'profile', icon: User, label: 'Profilim' },
    { id: 'ai', icon: BrainCircuit, label: 'AI Analiz' },
    { id: 'floorplan', icon: LayoutGrid, label: 'Kat Planı' },
    { id: 'about', icon: Info, label: 'Hakkımızda' },
  ];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen w-screen text-slate-100 flex flex-col md:flex-row overflow-hidden relative font-sans select-none bg-slate-950">
      
      {/* Arka Plan Dekoratif Efekt (Sade) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 to-slate-950" />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 p-6 h-full z-30 shrink-0 overflow-hidden relative">
        <div className="flex items-center gap-3 mb-8 shrink-0 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-red-600 p-2 rounded-xl shadow-xl shadow-red-900/40"
          >
            <Shield className="w-5 h-5 text-white" />
          </motion.div>
          <h1 className="text-xl font-black tracking-tighter title-font text-white leading-none">
            Quake<span className="text-red-600">Guard</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2 relative z-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 relative group overflow-hidden ${
                activeTab === item.id 
                  ? 'text-white' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 bg-red-600 shadow-md shadow-red-900/20"
                  transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                />
              )}
              <item.icon className={`w-4 h-4 relative z-10 ${activeTab === item.id ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="font-bold relative z-10 text-xs tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        {userName && (
          <div className="mt-auto pt-4 border-t border-slate-800/50 shrink-0 relative z-10">
            <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-2xl border border-slate-700/30">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-black text-sm shadow-inner shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{userName}</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest">AKTİF</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-50 w-full shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-600" />
          <span className="text-lg font-black title-font">QuakeGuard</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-slate-800 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10 h-full scroll-smooth">
        <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto w-full min-h-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="md:hidden fixed inset-0 z-[60] bg-slate-950 p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl font-black">MENÜ</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-900 rounded-full">
                <X />
              </button>
            </div>
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl text-xl font-bold ${activeTab === item.id ? 'bg-red-600' : 'bg-slate-900'}`}
                >
                  <item.icon /> {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
