import React, { useState } from 'react';
import { 
  getStoredConfig, 
  saveStoredConfig, 
  getStoredWasteRecords, 
  saveStoredWasteRecords, 
  VillageConfig, 
  WasteRecord 
} from './lib/config';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Demographics } from './components/Demographics';
import { Leadership } from './components/Leadership';
import { LocationMap } from './components/LocationMap';
import { PlasticFreeSection } from './components/PlasticFreeSection';
import { HousingSection } from './components/HousingSection';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'public' | 'admin'>('public');
  const [config, setConfig] = useState<VillageConfig>(() => getStoredConfig());
  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>(() => getStoredWasteRecords());

  return (
    <div className="min-h-screen flex flex-col bg-cream text-slate-900 selection:bg-forest selection:text-white">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content View */}
      <main className="flex-grow">
        {activeTab === 'public' ? (
          <>
            <Hero config={config} onOpenAdmin={() => setActiveTab('admin')} />
            <Demographics config={config} />
            <Leadership config={config} />
            <PlasticFreeSection wasteRecords={wasteRecords} />
            <HousingSection />
            <LocationMap config={config} />
          </>
        ) : (
          <AdminPortal
            config={config}
            setConfig={setConfig}
            wasteRecords={wasteRecords}
            setWasteRecords={setWasteRecords}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
