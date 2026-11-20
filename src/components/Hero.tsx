import React from 'react';
import { VillageConfig } from '../lib/config';
import { ShieldCheck, ArrowRight, Sparkles, MapPin, Recycle, Home } from 'lucide-react';

interface HeroProps {
  config: VillageConfig;
  onOpenAdmin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenAdmin }) => {
  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white py-16 md:py-24 bg-cover bg-center" style={{ backgroundImage: `url('/public/assets/aistudio/________photo_6756b30b.jpeg')` }}>
      {/* Dark gradient contrast scrim */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/85 to-black/75"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-100 text-xs font-medium mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>University Community Engagement Project (CEP)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-mukta tracking-tight leading-none mb-6">
            Welcome to <span className="text-amber-300">{config.name}</span>
          </h1>

          <p className="text-lg sm:text-xl text-emerald-100/90 font-light mb-8 leading-relaxed max-w-2xl">
            Gram Panchayat Portal for <strong className="font-semibold text-white">{config.district} District, {config.state}</strong>. Pioneering rural sustainability through zero-plastic initiatives and eco-friendly low-cost housing.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#plastic-cep"
              className="flex items-center gap-2 px-6 py-3 bg-terracotta hover:bg-orange-800 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-black/20"
            >
              <Recycle className="w-4 h-4" />
              <span>Explore Plastic-Free CEP</span>
            </a>

            <a
              href="#housing-cep"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl text-sm border border-white/30 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Low-Cost Housing Model</span>
            </a>
          </div>

        </div>

        {/* Quick Location & Stats Banner */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <span className="block text-emerald-200 text-xs font-medium mb-1">Total Population</span>
            <span className="text-2xl sm:text-3xl font-bold font-mukta text-white">{config.population.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <span className="block text-emerald-200 text-xs font-medium mb-1">Households</span>
            <span className="text-2xl sm:text-3xl font-bold font-mukta text-white">{config.houses.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <span className="block text-emerald-200 text-xs font-medium mb-1">District</span>
            <span className="text-lg sm:text-xl font-bold font-mukta text-white truncate">{config.district}, {config.state}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <span className="block text-emerald-200 text-xs font-medium mb-1">Pincode</span>
            <span className="text-2xl sm:text-3xl font-bold font-mukta text-white">{config.pincode}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
