import React from 'react';
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

export const LocationMapSection: React.FC = () => {
  // Google Maps embed URL using the verified location
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    'Kabeer Travels Vadodara Cab & Airport Taxi, Al mukam residansy, Sun Pharma Rd, near zydus API park, Tandalja, Vadodara, Gujarat 390020'
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const coveredNeighborhoods = [
    'Tandalja',
    'Sun Pharma Road',
    'Alkapuri',
    'Gotri',
    'Vasna Road',
    'Sayajigunj',
    'Manjalpur',
    'Karelibaug',
    'Fatehgunj',
    'Vadodara Airport (BDQ)',
    'Makarpura GIDC',
    'Waghodia Road',
    'Sama-Savli Road',
    'Gorwa',
    'Sevasi / Bhayli',
    'Atladra',
  ];

  return (
    <section id="map-location" className="py-14 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-600 text-xs font-bold uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full">
            Visit Our Office or Call for Doorstep Pickup
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Location & Service Areas in Vadodara
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Centrally located on Sun Pharma Road near Zydus API Park in Tandalja, dispatching cabs across all zones of Vadodara within 15-20 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Office Address & Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase tracking-wide">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>Verified Google Business Listing</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {BUSINESS_INFO.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">Vadodara Cab & Airport Taxi Service</p>

              {/* Address card */}
              <div className="mt-5 space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 text-sm font-bold">Office Address:</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      {BUSINESS_INFO.address}
                    </span>
                    <span className="inline-block mt-1 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded font-medium">
                      Landmark: Near Zydus API Park, Sun Pharma Road
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Operating Hours:</strong>{' '}
                    <span className="text-emerald-700 font-semibold">{BUSINESS_INFO.hours}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900">24/7 Booking Phone:</strong>{' '}
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="font-bold text-amber-700 hover:underline"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Email Inquiry:</strong>{' '}
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-slate-700 hover:underline"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-2.5 px-4 rounded-xl transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Office</span>
                </a>
              </div>
            </div>

            {/* Service areas pills */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Quick Doorstep Pickup Zones in Vadodara:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {coveredNeighborhoods.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="w-full h-96 lg:h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-md relative bg-slate-100">
              <iframe
                title="Kabeer Travels Vadodara Google Map"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating overlay badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-md flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900">Live Office Location</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
