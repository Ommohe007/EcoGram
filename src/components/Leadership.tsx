import React from 'react';
import { VillageConfig } from '../lib/config';
import { UserCheck, Award, Shield, PhoneCall } from 'lucide-react';

interface LeadershipProps {
  config: VillageConfig;
}

export const Leadership: React.FC<LeadershipProps> = ({ config }) => {
  return (
    <section id="leadership" className="py-16 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest bg-emerald-100 px-3 py-1 rounded-full">
            Gram Panchayat Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mukta text-slate-900 mt-3">
            Elected Representatives & Administrative Officials
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Leading community-driven development and the University Community Engagement Project (CEP).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Sarpanch Card */}
          <div className="bg-cream rounded-2xl p-8 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-forest text-white flex items-center justify-center font-mukta text-2xl font-bold shadow-md">
                  {config.sarpanchName.split(' ')[1]?.[0] || 'S'}
                </div>
                <div>
                  <span className="text-xs font-semibold text-forest uppercase tracking-wider">Elected Head</span>
                  <h3 className="text-2xl font-bold font-mukta text-slate-900">{config.sarpanchName}</h3>
                  <p className="text-sm font-medium text-slate-600">Sarpanch, Gram Panchayat Morgaon Digras</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Guiding rural infrastructure development, water conservation initiatives, and full community participation in the Plastic-Free Village campaign.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-forest">
                <Award className="w-4 h-4" />
                <span>Elected Office Bearer</span>
              </span>
              <span className="text-slate-400">Buldhana District, MH</span>
            </div>
          </div>

          {/* Gram Sevak Card */}
          <div className="bg-cream rounded-2xl p-8 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-700 text-white flex items-center justify-center font-mukta text-2xl font-bold shadow-md">
                  {config.gramSevakName.split(' ')[1]?.[0] || 'G'}
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Administrative Officer</span>
                  <h3 className="text-2xl font-bold font-mukta text-slate-900">{config.gramSevakName}</h3>
                  <p className="text-sm font-medium text-slate-600">Gram Sevak & Development Officer</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Supervising daily sanitation tracking, waste collection logs, government welfare schemes, and student CEP project implementations on ground.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-amber-800">
                <Shield className="w-4 h-4" />
                <span>Panchayat Administration</span>
              </span>
              <span className="text-slate-400">Buldhana District, MH</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
