import React from 'react';
import { VillageConfig } from '../lib/config';
import { Users, Home as HomeIcon, UserCheck, Calendar } from 'lucide-react';

interface DemographicsProps {
  config: VillageConfig;
}

export const Demographics: React.FC<DemographicsProps> = ({ config }) => {
  const malePercentage = Math.round((config.maleCount / config.population) * 100);
  const femalePercentage = 100 - malePercentage;

  return (
    <section id="demographics" className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest bg-emerald-100 px-3 py-1 rounded-full">
            Village Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mukta text-slate-900 mt-3">
            Demographics & Household Statistics
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Verified Gram Panchayat records for Morgaon Digras, Buldhana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Total Population */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-forest flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-400 font-medium">Census Data</span>
            </div>
            <h3 className="text-3xl font-extrabold font-mukta text-slate-900">{config.population.toLocaleString('en-IN')}</h3>
            <p className="text-sm font-medium text-slate-700 mt-1">Total Village Population</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Male: {config.maleCount.toLocaleString('en-IN')} ({malePercentage}%)</span>
              <span>Female: {config.femaleCount.toLocaleString('en-IN')} ({femalePercentage}%)</span>
            </div>
          </div>

          {/* Card 2: Total Houses */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <HomeIcon className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-400 font-medium">Habitations</span>
            </div>
            <h3 className="text-3xl font-extrabold font-mukta text-slate-900">{config.houses.toLocaleString('en-IN')}</h3>
            <p className="text-sm font-medium text-slate-700 mt-1">Total Households</p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span>100% electrified & connected</span>
            </div>
          </div>

          {/* Card 3: Gender Split Bar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Gender Ratio Distribution</h4>
                  <p className="text-xs text-slate-500">Balanced community representation</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Updated {config.lastUpdated}
              </span>
            </div>

            {/* Visual breakdown bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-blue-700">Male: {config.maleCount} ({malePercentage}%)</span>
                <span className="text-pink-600">Female: {config.femaleCount} ({femalePercentage}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${malePercentage}%` }}></div>
                <div className="bg-pink-500 h-full transition-all duration-500" style={{ width: `${femalePercentage}%` }}></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
              <span>District: {config.district}, Maharashtra</span>
              <span>Pincode: {config.pincode}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
