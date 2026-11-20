import React from 'react';
import { HOUSING_TECH_DETAILS } from '../lib/config';
import { Layers, TreePine, Sun, Droplets, Home, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export const HousingSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-6 h-6 text-forest" />;
      case 'TreePine': return <TreePine className="w-6 h-6 text-forest" />;
      case 'Sun': return <Sun className="w-6 h-6 text-forest" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-forest" />;
      default: return <Home className="w-6 h-6 text-forest" />;
    }
  };

  return (
    <section id="housing-cep" className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-forest text-xs font-semibold mb-3">
            <Home className="w-4 h-4" />
            <span>Community Engagement Project 02</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-mukta text-slate-900">
            Sustainable Low-Cost Housing
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Demonstrating climate-resilient, affordable rural housing in Morgaon Digras using locally available black cotton soil, Compressed Stabilised Earth Blocks (CSEB), and treated bamboo framing.
          </p>
        </div>

        {/* 4 Technical Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {HOUSING_TECH_DETAILS.map((tech, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  {getIcon(tech.icon)}
                </div>
                <h3 className="text-lg font-bold font-mukta text-slate-900 mb-2">{tech.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tech.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-forest font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Eco-Friendly Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Gallery Placeholder for Future Site Photos */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold font-mukta text-slate-900">Model House Construction Gallery</h3>
              <p className="text-xs text-slate-500">Photographs from the ongoing student CEP construction site at Morgaon Digras</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-forest rounded-full border border-emerald-200">
              Phase 1 Completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-cream rounded-xl p-6 border border-slate-200 text-center flex flex-col items-center justify-center h-48 group hover:border-forest transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">CSEB Block Pressing Unit</h4>
              <p className="text-xs text-slate-500 mt-1">Hydraulic compression of black soil blocks</p>
            </div>

            <div className="bg-cream rounded-xl p-6 border border-slate-200 text-center flex flex-col items-center justify-center h-48 group hover:border-forest transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">Bamboo Roof Truss Frame</h4>
              <p className="text-xs text-slate-500 mt-1">Boron-treated bamboo structural joinery</p>
            </div>

            <div className="bg-cream rounded-xl p-6 border border-slate-200 text-center flex flex-col items-center justify-center h-48 group hover:border-forest transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">Completed Model Dwelling</h4>
              <p className="text-xs text-slate-500 mt-1">Ready for beneficiary handover</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
