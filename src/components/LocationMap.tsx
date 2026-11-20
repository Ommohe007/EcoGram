import React from 'react';
import { VillageConfig } from '../lib/config';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface LocationMapProps {
  config: VillageConfig;
}

export const LocationMap: React.FC<LocationMapProps> = ({ config }) => {
  // Google Maps embed URL with satellite view (t=k) centered on coordinates
  const mapEmbedUrl = `https://maps.google.com/maps?q=${config.latitude},${config.longitude}&z=14&output=embed&t=k`;

  return (
    <section id="map" className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest bg-emerald-100 px-3 py-1 rounded-full">
            Geographic Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mukta text-slate-900 mt-3">
            Morgaon Digras on Satellite Map
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Located in Buldhana District, Maharashtra. Interactive satellite mapping view.
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-w-5xl mx-auto">
          
          {/* Map Header details */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white">
                <MapPin className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-base font-mukta">Morgaon Digras Gram Panchayat</h3>
                <p className="text-xs text-slate-300">Latitude: {config.latitude}° N, Longitude: {config.longitude}° E</p>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${config.latitude},${config.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/25 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Embedded Map iframe */}
          <div className="w-full h-[450px] relative bg-slate-100">
            <iframe
              title="Morgaon Digras Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
};
