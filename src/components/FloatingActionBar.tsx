import React from 'react';
import { Phone, MessageSquare, Calendar, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface FloatingActionBarProps {
  onBookClick: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ onBookClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2 sm:hidden shadow-2xl">
      <div className="flex items-center space-x-2">
        {/* Call Now */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-xl border border-slate-700 active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
            'Hello Kabeer Travels! I need an urgent cab booking from Vadodara.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Book / Calculator */}
        <button
          onClick={onBookClick}
          className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-md active:scale-95 transition cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Cab</span>
        </button>
      </div>
    </div>
  );
};
