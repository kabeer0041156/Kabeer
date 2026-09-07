import React from 'react';
import { Car, Phone, MessageSquare, MapPin, Mail, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B192C] text-white pt-12 pb-24 sm:pb-12 border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-white border-2 border-white p-0.5 shadow-md flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-black">
                <img 
                  src="/logo.png" 
                  alt="Kabeer Travels Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight font-serif">
                  KABEER<span className="text-white ml-1.5 font-sans">TRAVELS</span>
                </span>
                <p className="text-[10px] text-slate-200 font-bold uppercase tracking-wider">
                  Vadodara Cab & Airport Taxi
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your trusted 24x7 cab partner in Vadodara for Airport Transfers, Outstation Trips, Statue of Unity Packages, and Local Car Rentals.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-xs text-white font-semibold">
              <Clock className="w-4 h-4 text-white" />
              <span>Available 24 Hours / 365 Days</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Services & Packages
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#calculator" className="hover:text-white hover:underline transition">
                  Vadodara Airport (BDQ) Taxi
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white hover:underline transition">
                  Ahmedabad Airport (AMD) Express Cab
                </a>
              </li>
              <li>
                <a href="#statue-of-unity" className="hover:text-white hover:underline transition">
                  Statue of Unity (Kevadia) Day Tour
                </a>
              </li>
              <li>
                <a href="#popular-routes" className="hover:text-white hover:underline transition">
                  Pavagadh Temple Pilgrimage Cab
                </a>
              </li>
              <li>
                <a href="#popular-routes" className="hover:text-white hover:underline transition">
                  Vadodara to Mumbai Outstation Cab
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white hover:underline transition">
                  Local Hourly Car Rental
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Contact & Dispatch
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-white hover:underline font-semibold">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-white shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline"
                >
                  WhatsApp: +91 88664 78812
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white hover:underline">
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="flex items-start space-x-2 pt-1">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="leading-tight text-slate-300">
                  Al mukam residansy, Sun Pharma Rd, near zydus API park, Tandalja, Vadodara, Gujarat 390020
                </span>
              </li>
            </ul>
          </div>

          {/* Google Listing & Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Google Maps Location
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Find our central office in Tandalja, Vadodara or navigate with live GPS.
            </p>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-black hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-lg border border-white/20 transition cursor-pointer"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="mt-3 text-[11px] text-slate-300">
              ★ 4.9 Rating based on 180+ verified Google user reviews.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-3">
          <p>© {new Date().getFullYear()} Kabeer Travels | Vadodara Cab & Airport Taxi. All Rights Reserved.</p>
          <p>Tandalja • Alkapuri • Gotri • Vadodara Airport • Gujarat</p>
        </div>
      </div>
    </footer>
  );
};
