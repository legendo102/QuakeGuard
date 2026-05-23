
import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Building, Calendar, Edit3, Save, ShieldCheck, Search, ChevronRight, Bell } from 'lucide-react';
import { UserProfile, BuildingMaterial } from '../types';
import { TURKEY_CITIES_DATA, BUILDING_MATERIALS } from '../constants';
import RestrictedAccess from '../components/RestrictedAccess';

interface ProfileProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  onStartRegistration?: () => void;
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
      <label className="text-xs text-slate-500 font-bold uppercase tracking-widest ml-1">{label}</label>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-red-500/50 transition-all">
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
        <div className="h-40 overflow-y-auto custom-scrollbar p-1">
          {filteredItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-sm transition-all mb-1 ${
                selected === item 
                  ? 'bg-red-600 text-white font-bold' 
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-100'
              }`}
            >
              {item}
              {selected === item && <ChevronRight className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC<ProfileProps> = ({ profile, updateProfile, onStartRegistration }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<UserProfile>(profile);

  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const cities = Object.keys(TURKEY_CITIES_DATA).sort((a, b) => a.localeCompare(b, 'tr-TR'));
  const districts = TURKEY_CITIES_DATA[formData.city] || [];

  if (!profile.isRegistered) {
    return <RestrictedAccess onAction={onStartRegistration || (() => {})} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-red-600/20">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-4xl font-bold title-font">{profile.name} {profile.surname}</h2>
            <div className="flex items-center gap-2 text-red-500 mt-1">
              <ShieldCheck className="w-4 h-4" />
              <p className="text-sm font-medium">QuakeGuard Koruma Üyesi</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all w-full md:w-auto justify-center ${
            isEditing ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
          }`}
        >
          {isEditing ? <><Save className="w-5 h-5" /> Değişiklikleri Kaydet</> : <><Edit3 className="w-5 h-5" /> Profili Düzenle</>}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: General Info */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold title-font flex items-center gap-3 text-red-500">
              <User className="w-6 h-6" /> Temel ve Yapı Bilgileri
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">Ad</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-slate-200"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg font-medium text-slate-200">{profile.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">Soyad</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-slate-200"
                      value={formData.surname}
                      onChange={e => setFormData({...formData, surname: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg font-medium text-slate-200">{profile.surname}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest flex justify-between">
                  <span>Bina Yaşı</span>
                  {isEditing && <span className="text-red-500">{formData.buildingAge} Yıl</span>}
                </label>
                {isEditing ? (
                  <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
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
                ) : (
                  <p className="text-lg font-medium text-slate-200">{profile.buildingAge} Yıl</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">Yapı Malzemesi</label>
                {isEditing ? (
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <select 
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-red-500/50 appearance-none cursor-pointer transition-all text-slate-200"
                      value={formData.material}
                      onChange={e => setFormData({...formData, material: e.target.value as BuildingMaterial})}
                    >
                      {BUILDING_MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                ) : (
                  <p className="text-lg font-medium text-slate-200">{profile.material}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Location Selection Slider */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold title-font flex items-center gap-3 text-red-500">
              <MapPin className="w-6 h-6" /> Bölgesel Veriler
            </h3>
            
            <div className="space-y-6">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectionSlider 
                    label="Şehir"
                    items={cities}
                    selected={formData.city}
                    onSelect={(city) => setFormData({...formData, city, district: ''})}
                  />
                  <SelectionSlider 
                    label="İlçe"
                    items={districts}
                    selected={formData.district}
                    onSelect={(district) => setFormData({...formData, district})}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">Şehir</label>
                    <p className="text-lg font-medium text-slate-200">{profile.city}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-widest">İlçe</label>
                    <p className="text-lg font-medium text-slate-200">{profile.district || 'Belirtilmedi'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ayarlar ve Bildirim Tercihi */}
        <div className="mt-12 pt-10 border-t border-slate-800/80">
          <h3 className="text-xl font-bold title-font flex items-center gap-3 text-red-500 mb-6">
            <Bell className="w-6 h-6 animate-pulse" /> Sistem Ayarları
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-slate-800/20 rounded-3xl border border-slate-800 hover:border-slate-700/50 transition-all gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-white text-base">Güvenlik Kontrolü Bildirimleri</h4>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                Uygulamada gezinirken belirli aralıklarla ekranın alt köşesinde size hayat kurtarıcı deprem soruları ve hazırlık tüyoları gösterilmesini sağlar.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const notificationsEnabled = formData.notificationsEnabled === false ? true : false;
                const updated = {
                  ...formData,
                  notificationsEnabled
                };
                setFormData(updated);
                updateProfile(updated);
              }}
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.notificationsEnabled !== false ? 'bg-red-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  formData.notificationsEnabled !== false ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
