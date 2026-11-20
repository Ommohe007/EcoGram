import React from 'react';
import { Leaf, ShieldCheck, Home, BarChart3, Settings } from 'lucide-react';

interface NavbarProps {
  activeTab: 'public' | 'admin';
  setActiveTab: (tab: 'public' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('public')}>
          <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white shadow-sm">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight font-mukta tracking-tight">EcoGram</h1>
            <p className="text-[11px] text-slate-500 font-medium">Morgaon Digras, Buldhana</p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Public showcase jump links or active view) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {activeTab === 'public' ? (
            <>
              <a href="#demographics" className="hover:text-forest transition-colors whitespace-nowrap shrink-0">Demographics</a>
              <a href="#leadership" className="hover:text-forest transition-colors whitespace-nowrap shrink-0">Leadership</a>
              <a href="#plastic-cep" className="hover:text-forest transition-colors whitespace-nowrap shrink-0">Plastic-Free CEP</a>
              <a href="#housing-cep" className="hover:text-forest transition-colors whitespace-nowrap shrink-0">Sustainable Housing</a>
              <a href="#map" className="hover:text-forest transition-colors whitespace-nowrap shrink-0">Village Map</a>
            </>
          ) : (
            <span className="text-forest font-semibold text-xs px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
              Panchayat Worker / Gram Sevak Portal Active
            </span>
          )}
        </nav>

        {/* Zone 3: Primary Action (Switch between Public Portal & Panchayat Worker Admin) */}
        <div className="flex items-center gap-3 shrink-0">
          {activeTab === 'public' ? (
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-forest rounded-lg hover:bg-emerald-800 transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <Settings className="w-4 h-4" />
              <span>Panchayat Portal</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('public')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all whitespace-nowrap shrink-0"
            >
              <Home className="w-4 h-4" />
              <span>Back to Village Public Showcase</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
