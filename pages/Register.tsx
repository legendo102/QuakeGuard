
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, MapPin, Building, Calendar, ArrowRight, Search, ChevronRight } from 'lucide-react';
import { UserProfile, BuildingMaterial } from '../types';
import { TURKEY_CITIES_DATA, BUILDING_MATERIALS } from '../constants';

interface RegisterProps {
  onComplete: (profile: UserProfile) => void;
  onSkip: () => void;
}

const SelectionSlider: React.FC<{
  label: string;
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
  placeholder?: string;
}> = ({ label, items, selected, onSelect, placeholder }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredItems = items.filter(item => 
    item.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR'))
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-red-500/50 transition-all">
        <div className="relative p-2 border-b border-slate-700/50">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder={placeholder || 'Ara...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent py-2 pl-10 pr-4 text-sm outline-none text-slate-200"
          />
        </div>
        <div className="h-48 overflow-y-auto custom-scrollbar p-1">
          {filteredItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all mb-1 ${
                selected === item 
                  ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-900/20' 
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-100'
              }`}
            >
              {item}
              {selected === item && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
          {filteredItems.length === 0 && (
            <p className="p-4 text-xs text-slate-500 text-center italic">Sonuç bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Register: React.FC<RegisterProps> = ({ onComplete, onSkip }) => {
  const [formData, setFormData] = React.useState<Partial<UserProfile>>({
    name: '',
    surname: '',
    city: 'İstanbul',
    district: '',
    buildingAge: 20,
    material: BuildingMaterial.ReinforcedConcrete,
    isRegistered: true,
    notificationsEnabled: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.surname || !formData.district) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    onComplete(formData as UserProfile);
  };

  const cities = Object.keys(TURKEY_CITIES_DATA).sort((a, b) => a.localeCompare(b, 'tr-TR'));
  const districts = TURKEY_CITIES_DATA[formData.city || 'İstanbul'] || [];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 overflow-y-auto py-12 relative">
      {/* Basit Dekoratif Blurlar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-950" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/5 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[40px] p-8 md:p-12 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="bg-red-600 p-5 rounded-3xl shadow-2xl shadow-red-600/30 mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black title-font text-white mb-2 text-center">QuakeGuard</h1>
          <p className="text-slate-400 text-center text-lg max-w-md">Kişiye özel deprem risk analiziniz için kaydınızı oluşturun.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Personal & Building Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3 text-red-500 mb-2">
                <User className="w-6 h-6" /> Temel Bilgiler
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Adınız</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-600 text-white"
                    placeholder="Ad"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Soyadınız</label>
                  <input 
                    required
                    type="text" 
                    value={formData.surname}
                    onChange={e => setFormData({...formData, surname: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-600 text-white"
                    placeholder="Soyad"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1 flex justify-between">
                  <span>Bina Yaşı</span>
                  <span className="text-red-500 font-bold">{formData.buildingAge} Yıl</span>
                </label>
                <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                  <Calendar className="w-5 h-5 text-slate-500 hover:scale-110 transition-transform" />
                  <input 
                    type="range"
                    min="1"
                    max="100"
                    value={formData.buildingAge}
                    onChange={e => setFormData({...formData, buildingAge: parseInt(e.target.value)})}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-red-500/50
                      [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-red-900/40 [&::-webkit-slider-thumb]:active:scale-125 [&::-webkit-slider-thumb]:transition-transform
                      [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-red-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:shadow-red-900/40 [&::-moz-range-thumb]:active:scale-125 [&::-moz-range-thumb]:transition-transform"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Yapı Malzemesi</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <select 
                    value={formData.material}
                    onChange={e => setFormData({...formData, material: e.target.value as BuildingMaterial})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer text-white"
                  >
                    {BUILDING_MATERIALS.map(mat => (
                      <option key={mat} value={mat} className="bg-slate-900">{mat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location Slider Part */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3 text-red-500 mb-2">
                <MapPin className="w-6 h-6" /> Konum Seçimi
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectionSlider 
                  label="Şehir Seçiniz (81 İl)"
                  items={cities}
                  selected={formData.city || ''}
                  onSelect={(city) => setFormData({...formData, city, district: ''})}
                  placeholder="Şehir ara..."
                />
                
                <SelectionSlider 
                  label="İlçe Seçiniz"
                  items={districts}
                  selected={formData.district || ''}
                  onSelect={(district) => setFormData({...formData, district})}
                  placeholder="İlçe ara..."
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-6 rounded-[24px] shadow-2xl shadow-red-900/40 flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              KORUMAYI BAŞLAT <ArrowRight className="w-6 h-6" />
            </button>
            <button 
              type="button"
              onClick={onSkip} 
              className="mt-6 w-full text-slate-500 hover:text-slate-300 text-sm font-bold transition-colors uppercase tracking-widest"
            >
              Şimdilik Misafir Olarak Devam Et
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
