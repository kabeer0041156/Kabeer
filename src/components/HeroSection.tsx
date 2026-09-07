import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Star, MapPin, Clock, ArrowDown } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface HeroSectionProps {
  onExploreFleet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreFleet }) => {
  return (
    <section id="hero" className="relative bg-[#0B192C] text-white pt-8 sm:pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-black">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          {/* Centered Circular Kabeer Travels Royal Logo */}
          <div className="inline-flex flex-col items-center mb-5">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white p-1 shadow-2xl border-4 border-black ring-4 ring-white/30 flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <img 
                src="/logo.png" 
                alt="Kabeer Travels Vadodara Cab Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {/* Stars under logo */}
            <div className="flex items-center space-x-1 mt-3 text-white">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
              <span className="text-xs font-black text-white ml-1.5 tracking-wider">
                4.9/5 GOOGLE RATED
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-serif leading-tight">
            KABEER <span className="underline decoration-white decoration-4">TRAVELS</span>
          </h1>

          <p className="mt-2 text-sm sm:text-base font-extrabold text-white uppercase tracking-widest">
            Vadodara Cab & Airport Taxi Service
          </p>

          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Premium Chauffeur-Driven AC Taxis • Hatchback, Swift Dzire, Maruti Ertiga & Innova Crysta for Vadodara (BDQ) & Ahmedabad (AMD) Airport transfers, Statue of Unity, and Gujarat outstation tours.
          </p>

          {/* Clean Quick action buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-black font-black text-sm px-6 py-3 rounded-xl shadow-lg transition active:scale-95 border-2 border-white cursor-pointer"
            >
              <Phone className="w-4 h-4 text-black" />
              <span>Call +91 88664 78812</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hi Kabeer Travels! I would like to book a cab from Vadodara. Please check availability.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-black hover:bg-[#050E1A] text-white border-2 border-white font-bold text-sm px-5 py-3 rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>WhatsApp Booking</span>
            </a>

            <button
              onClick={onExploreFleet}
              className="inline-flex items-center space-x-1.5 bg-[#0B192C] hover:bg-black text-white font-bold text-sm px-4 py-3 rounded-xl border-2 border-white shadow-xs transition cursor-pointer"
            >
              <span>Fleet & Tariffs</span>
              <ArrowDown className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-black/60 rounded-xl p-2.5 border border-white/20 shadow-xs">
              <div className="flex items-center justify-center space-x-1 text-white font-black text-lg">
                <Star className="w-4 h-4 fill-white text-white" />
                <span>4.9 / 5.0</span>
              </div>
              <p className="text-xs text-white/80 font-semibold mt-0.5">180+ Google Reviews</p>
            </div>

            <div className="bg-black/60 rounded-xl p-2.5 border border-white/20 shadow-xs">
              <div className="text-white font-black text-lg flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1 text-white" />
                24 / 7
              </div>
              <p className="text-xs text-white/80 font-semibold mt-0.5">Instant Cab Dispatch</p>
            </div>

            <div className="bg-black/60 rounded-xl p-2.5 border border-white/20 shadow-xs">
              <div className="text-white font-black text-lg flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-white" />
                Min. 10%
              </div>
              <p className="text-xs text-white/80 font-semibold mt-0.5">Advance Booking</p>
            </div>

            <div className="bg-black/60 rounded-xl p-2.5 border border-white/20 shadow-xs">
              <div className="text-white font-black text-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-1 text-white" />
                Vadodara
              </div>
              <p className="text-xs text-white/80 font-semibold mt-0.5">Doorstep Pickup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
