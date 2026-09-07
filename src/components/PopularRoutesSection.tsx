import React from 'react';
import { MapPin, Clock, ArrowRight, Sparkles, Navigation } from 'lucide-react';
import { POPULAR_ROUTES, BUSINESS_INFO } from '../data/travelData';
import { RoutePackage } from '../types';

interface PopularRoutesProps {
  onSelectRoute: (route: RoutePackage) => void;
}

export const PopularRoutesSection: React.FC<PopularRoutesProps> = ({ onSelectRoute }) => {
  return (
    <section id="popular-routes" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-white text-xs font-bold uppercase tracking-wider bg-[#0B192C] px-3.5 py-1 rounded-full border border-black">
              Frequent Journeys
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black mt-2">
              Popular Outstation Routes from Vadodara
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Transparent fixed fares for top travel destinations across Gujarat and Maharashtra with doorstep pickup anywhere in Vadodara.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hi Kabeer Travels, I need custom outstation cab rates from Vadodara.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-black hover:text-[#0B192C] hover:underline transition cursor-pointer"
            >
              <span>Custom Route Inquiry? Contact us</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => (
            <div
              key={route.id}
              className="rounded-2xl border-2 border-[#0B192C] bg-white p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-black border border-slate-300">
                    {route.tag}
                  </span>
                  <div className="flex items-center text-xs font-semibold text-slate-600">
                    <Clock className="w-3 h-3 mr-1 text-black" />
                    {route.estimatedDuration}
                  </div>
                </div>

                <div className="my-2">
                  <div className="flex items-center text-xs text-slate-500 font-medium">
                    <span>{route.from}</span>
                    <span className="mx-2 text-black font-bold">→</span>
                    <span className="text-black font-bold text-base">{route.to}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Approx Distance: <span className="font-semibold text-black">{route.distanceKm} km</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 my-2 leading-relaxed">
                  {route.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {route.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-black px-2 py-0.5 rounded border border-slate-200 font-medium"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between mt-2">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Starting From</div>
                  <div className="text-lg font-black text-black">
                    ₹{route.startingPriceSedan.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-slate-600">(Sedan)</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectRoute(route)}
                  className="inline-flex items-center space-x-1 bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-3.5 py-2 rounded-lg transition shadow-xs active:scale-95 border border-white/20 cursor-pointer"
                >
                  <span>Select Route</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
