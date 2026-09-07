import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, Star, Car, Shield, Radio, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface HeaderProps {
  onBookClick: () => void;
  onMyBookingsClick: () => void;
  savedBookingsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onBookClick,
  onMyBookingsClick,
  savedBookingsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white backdrop-blur-md border-b border-[#0B192C]/20 shadow-xs">
      {/* Top emergency & dispatch bar - Navy Blue & White */}
      <div className="bg-[#0B192C] text-white text-xs py-2 px-4 border-b border-black">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-white font-bold">
              <Clock className="w-3.5 h-3.5 mr-1 text-white animate-pulse" />
              24/7 Cab & Airport Taxi Dispatch in Vadodara
            </span>
            <span className="hidden md:inline-flex items-center text-white/90 text-[11px]">
              <MapPin className="w-3.5 h-3.5 mr-1 text-white" />
              Sun Pharma Rd, Tandalja, Vadodara
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="inline-flex items-center bg-black text-white px-2.5 py-0.5 rounded-full border border-white/30 text-[11px] font-semibold">
              <Star className="w-3 h-3 mr-1 fill-white text-white" />
              4.9/5 Google Rated (180+ Reviews)
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="font-bold text-white hover:text-white/80 transition-colors flex items-center"
            >
              <Phone className="w-3 h-3 mr-1 text-white" />
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between bg-white text-black">
        <div className="flex items-center space-x-3">
          <a href="#hero" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-[#0B192C] p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-[#0B192C]/20">
              <img 
                src="/logo.png" 
                alt="Kabeer Travels Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B192C] font-serif">
                  KABEER<span className="text-black ml-1.5">TRAVELS</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-black font-bold tracking-wide">
                Vadodara Cab & Airport Taxi Service
              </p>
            </div>
          </a>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-[#0B192C]">
          <a href="#calculator" className="hover:text-black transition-colors">
            Book Online
          </a>
          <a href="#tariffs" className="hover:text-black transition-colors flex items-center text-[#0B192C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B192C] mr-1.5"></span>
            Tariff Rates
          </a>
          <a href="#fleet" className="hover:text-black transition-colors">
            Our Fleet
          </a>
          <a href="#popular-routes" className="hover:text-black transition-colors">
            Routes
          </a>
          <a href="#statue-of-unity" className="hover:text-black transition-colors flex items-center text-[#0B192C]">
            <span className="w-2 h-2 rounded-full bg-[#0B192C] mr-1.5"></span>
            Statue of Unity
          </a>
          <a href="#map-location" className="hover:text-black transition-colors">
            Contact
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-2.5">
          {savedBookingsCount > 0 && (
            <button
              onClick={onMyBookingsClick}
              className="relative text-xs font-bold px-3 py-2 rounded-xl border-2 border-[#0B192C] hover:bg-[#0B192C] hover:text-white text-[#0B192C] transition cursor-pointer"
              title="View your saved bookings"
            >
              My Bookings
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white border border-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {savedBookingsCount}
              </span>
            </button>
          )}

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
              'Hello Kabeer Travels! I need a taxi from Vadodara. Please share details & availability.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 bg-[#0B192C] hover:bg-black text-white border border-[#0B192C] text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="inline-flex items-center space-x-1.5 bg-black hover:bg-[#0B192C] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition border border-black"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Call Now</span>
            <span className="sm:hidden">Call</span>
          </a>

          <button
            onClick={onBookClick}
            className="bg-[#0B192C] hover:bg-black text-white font-black text-xs px-4 py-2 rounded-xl shadow-sm transition active:scale-95 border-2 border-white/20 cursor-pointer"
          >
            Book Cab
          </button>
        </div>
      </div>
    </header>
  );
};
