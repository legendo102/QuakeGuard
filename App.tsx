
import React from 'react';
import Layout from './components/Layout';
import Register from './pages/Register';
import Home from './pages/Home';
import RiskMap from './pages/RiskMap';
import Profile from './pages/Profile';
import AIAnalyze from './pages/AIAnalyze';
import FloorPlan from './pages/FloorPlan';
import About from './pages/About';
import TransitionCurtain from './components/TransitionCurtain';
import SafetyNotifications from './components/SafetyNotifications';
import { UserProfile, BuildingMaterial } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('home');
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  
  const [user, setUser] = React.useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('quakeguard_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Kullanıcı verisi okunamadı:", e);
      return null;
    }
  });

  const triggerEntryTransition = (profile: UserProfile) => {
    setIsTransitioning(true);
    // Veriyi set etmeden önce perdenin gelmesini bekle
    setTimeout(() => {
      setUser(profile);
      if (profile.isRegistered) {
        localStorage.setItem('quakeguard_user', JSON.stringify(profile));
      }
    }, 600);
    // Perdeyi kaldır
    setTimeout(() => setIsTransitioning(false), 2400);
  };

  const handleRegister = (profile: UserProfile) => {
    triggerEntryTransition(profile);
  };

  const handleSkip = () => {
    const guest: UserProfile = {
      name: 'Misafir',
      surname: 'Kullanıcı',
      city: 'İstanbul',
      district: '',
      buildingAge: 1,
      material: BuildingMaterial.ReinforcedConcrete,
      isRegistered: false,
      notificationsEnabled: true
    };
    triggerEntryTransition(guest);
  };

  const updateProfile = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('quakeguard_user', JSON.stringify(profile));
  };

  const startRegistration = () => {
    setUser(null);
    localStorage.removeItem('quakeguard_user');
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <AnimatePresence>
        {isTransitioning && <TransitionCurtain key="entry-transition" />}
      </AnimatePresence>

      <div className="relative">
        {!user ? (
          <Register onComplete={handleRegister} onSkip={handleSkip} />
        ) : (
          <Layout 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            userName={user.name}
          >
            <div className="relative z-10">
              {activeTab === 'home' && <Home />}
              {activeTab === 'map' && <RiskMap />}
              {activeTab === 'profile' && (
                <Profile 
                  profile={user} 
                  updateProfile={updateProfile} 
                  onStartRegistration={startRegistration}
                />
              )}
              {activeTab === 'ai' && (
                <AIAnalyze 
                  profile={user} 
                  onStartRegistration={startRegistration}
                />
              )}
              {activeTab === 'floorplan' && <FloorPlan />}
              {activeTab === 'about' && <About />}
            </div>
            {/* Bildirim Sistemi Sadece Giriş Yapıldığında ve Aktif Edildiğinde Çalışır */}
            {user.notificationsEnabled !== false && <SafetyNotifications />}
          </Layout>
        )}
      </div>
    </div>
  );
};

export default App;
