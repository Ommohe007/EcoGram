import React from 'react';
import { MONTHLY_PLASTIC_TREND, WasteRecord } from '../lib/config';
import { calculateWasteTotals } from '../lib/data';
import { Recycle, Trash2, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';

interface PlasticFreeSectionProps {
  wasteRecords: WasteRecord[];
}

export const PlasticFreeSection: React.FC<PlasticFreeSectionProps> = ({ wasteRecords }) => {
  const totals = calculateWasteTotals(wasteRecords);

  // SVG Chart dimensions
  const chartHeight = 240;
  const maxPlastic = Math.max(...MONTHLY_PLASTIC_TREND.map(d => d.plasticKg), 500);

  return (
    <section id="plastic-cep" className="py-16 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-terracotta text-xs font-semibold mb-3">
            <Recycle className="w-4 h-4" />
            <span>Community Engagement Project 01</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-mukta text-slate-900">
            Plastic-Free Village Mission
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Morgaon Digras has actively curbed single-use plastic through rigorous household segregation, weekly collection drives by student volunteers, and conversion of plastic waste into road aggregates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Category Summary Cards */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold font-mukta text-slate-900 flex items-center gap-2">
              <span>Waste Segregation Metrics (Current Log)</span>
            </h3>

            <div className="bg-cream rounded-xl p-5 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-forest flex items-center justify-center">
                  <span className="font-bold">♻️</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Wet Waste (Biodegradable)</h4>
                  <p className="text-xs text-slate-500">Composted for village organic farming</p>
                </div>
              </div>
              <span className="text-lg font-extrabold font-mukta text-forest">{totals.totalWet} kg</span>
            </div>

            <div className="bg-cream rounded-xl p-5 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="font-bold">📦</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Dry Recyclable Waste</h4>
                  <p className="text-xs text-slate-500">Paper, cardboard, glass & metal</p>
                </div>
              </div>
              <span className="text-lg font-extrabold font-mukta text-blue-700">{totals.totalDry} kg</span>
            </div>

            <div className="bg-orange-50 rounded-xl p-5 border border-orange-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-terracotta text-white flex items-center justify-center">
                  <Recycle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-terracotta">Plastic Waste</h4>
                  <p className="text-xs text-orange-700">Single-use bags & packaging</p>
                </div>
              </div>
              <span className="text-lg font-extrabold font-mukta text-terracotta">{totals.totalPlastic} kg</span>
            </div>


          </div>

          {/* Monthly Plastic Trend Bar Chart (Inline SVG) */}
          <div className="lg:col-span-2 bg-cream rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold font-mukta text-slate-900">Plastic Waste Log Trend</h3>
                <p className="text-xs text-slate-500">Tracking daily plastic waste logs entered by Panchayat workers</p>
              </div>

              {/* Dynamic Chart based on Panchayat Worker Logs */}
              {wasteRecords.length > 0 ? (
                <div className="w-full overflow-x-auto">
                  <svg viewBox="0 0 700 280" className="w-full h-auto min-w-[500px]">
                    {/* Grid lines */}
                    {[0, 10, 20, 30, 40, 50].map((val, idx) => {
                      const maxVal = Math.max(...wasteRecords.map(r => r.plasticKg), 50);
                      const y = 220 - (val / maxVal) * 180;
                      return (
                        <g key={idx}>
                          <line x1="50" y1={y} x2="680" y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
                          <text x="40" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-sans">{val}kg</text>
                        </g>
                      );
                    })}

                    {/* Bars from logged records */}
                    {wasteRecords.map((item, idx) => {
                      const maxVal = Math.max(...wasteRecords.map(r => r.plasticKg), 50);
                      const barWidth = 36;
                      const spacing = 15;
                      const x = 70 + idx * (barWidth + spacing);
                      const barHeight = (item.plasticKg / maxVal) * 180;
                      const y = 220 - barHeight;

                      return (
                        <g key={idx} className="group cursor-pointer">
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            rx="6"
                            fill="#D84315"
                            className="transition-all duration-300 hover:opacity-80"
                          />
                          <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" className="text-[10px] font-bold fill-slate-700">
                            {item.plasticKg}kg
                          </text>
                          <text x={x + barWidth / 2} y="242" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium" transform={`rotate(-25 ${x + barWidth / 2} 242)`}>
                            {item.date}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 text-xs">
                  No waste records logged yet by Panchayat worker. Log daily waste in the Panchayat Portal to display data here.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
