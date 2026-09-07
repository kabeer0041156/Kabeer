import React from 'react';
import { Sparkles, CheckCircle2, Clock, Car, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/travelData';

interface StatueOfUnityProps {
  onBookSOU: () => void;
}

export const StatueOfUnitySpotlight: React.FC<StatueOfUnityProps> = ({ onBookSOU }) => {
  return (
    <section id="statue-of-unity" className="py-14 bg-[#0B192C] text-white relative overflow-hidden border-t-2 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left information */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-1.5 bg-black text-white border border-white/20 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Vadodara’s #1 Tourist Package</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Statue of Unity (Kevadia) Day Tour Package
            </h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              Experience the world’s tallest 182-metre monument without the hassle of crowded public transport. Our dedicated cabs pick you up directly from your home/hotel in Vadodara, stay with you through the day, and bring you back comfortably after the spectacular evening Laser Projection Show.
            </p>

            {/* Inclusions list */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white">
              <div className="flex items-center space-x-2 bg-black/40 p-2.5 rounded-lg border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Valley of Flowers & Dam View Waiting</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/40 p-2.5 rounded-lg border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Evening Laser Projection Show Waiting</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/40 p-2.5 rounded-lg border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Doorstep Vadodara Pickup & Drop</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/40 p-2.5 rounded-lg border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Chilled AC & Polite Family Chauffeur</span>
              </div>
            </div>

            {/* Quick Pricing pills */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="bg-black border border-white/20 px-4 py-2.5 rounded-xl">
                <span className="text-[10px] text-slate-300 uppercase font-bold block">Sedan (Dzire / Etios)</span>
                <span className="text-xl font-extrabold text-white">₹3,600</span>
                <span className="text-[11px] text-slate-300 ml-1">same-day return</span>
              </div>

              <div className="bg-black border border-white/20 px-4 py-2.5 rounded-xl">
                <span className="text-[10px] text-slate-300 uppercase font-bold block">SUV (Ertiga 6+1)</span>
                <span className="text-xl font-extrabold text-white">₹4,500</span>
                <span className="text-[11px] text-slate-300 ml-1">family special</span>
              </div>

              <div className="bg-black border border-white/20 px-4 py-2.5 rounded-xl">
                <span className="text-[10px] text-slate-300 uppercase font-bold block">Innova Crysta</span>
                <span className="text-xl font-extrabold text-white">₹5,800</span>
                <span className="text-[11px] text-slate-300 ml-1">executive comfort</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onBookSOU}
                className="bg-white hover:bg-slate-100 text-black font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition active:scale-95 cursor-pointer border border-black"
              >
                Book Statue of Unity Cab
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Kabeer Travels, I want to book a cab from Vadodara to Statue of Unity (Kevadia). Please share available dates and packages.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 bg-black hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition border border-white/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp SOU Inquiry</span>
              </a>
            </div>
          </div>

          {/* Right visual card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-black shadow-2xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80"
                alt="Statue of Unity Tour"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-5 flex flex-col justify-end">
                <span className="text-xs font-bold text-white">90 km from Vadodara • 1.5 - 2 Hours Drive</span>
                <h4 className="text-lg font-extrabold text-white mt-1">Sardar Sarovar Dam & Kevadia Tour</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Leave early morning, visit the viewing gallery, flower gardens, and return post laser show with zero hassle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
