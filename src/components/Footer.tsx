import React from 'react';
import { Leaf, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white">
              <Leaf className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold font-mukta text-white text-lg tracking-tight">EcoGram — Morgaon Digras</h3>
              <p className="text-xs text-slate-400">Gram Panchayat Portal & Community Engagement Project (CEP)</p>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-slate-400 space-y-1">
            <p>District: Buldhana, Maharashtra, India — Pincode 443201</p>
            <p className="flex items-center justify-center md:justify-end gap-1">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>for University Community Engagement</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
