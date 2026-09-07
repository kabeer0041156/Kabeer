import React from 'react';
import { Users, Briefcase, Snowflake, Check, ArrowRight } from 'lucide-react';
import { VEHICLES, BUSINESS_INFO } from '../data/travelData';

interface FleetSectionProps {
  onSelectVehicle: (id: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  return (
    <section id="fleet" className="py-16 bg-white border-t border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-white bg-[#0B192C] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs border border-black">
            Commercial Chauffeur-Driven Taxi Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black mt-3">
            Our Cab Fleet & Transparent Tariffs
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Well-maintained vehicles with chilled AC, spotless interiors, and verified commercial chauffeurs for corporate & family travel.
          </p>
        </div>

        {/* 4-Column Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VEHICLES.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-3xl border-2 border-[#0B192C] shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Vehicle image container */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-black text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-white/20 shadow-md">
                    {v.badge}
                  </span>
                  <span className="absolute bottom-3 left-3 bg-[#0B192C]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-white/20">
                    {v.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-lg font-black text-black leading-snug">{v.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{v.models}</p>

                  {/* Quick specs */}
                  <div className="flex items-center justify-between my-3 text-xs text-black bg-slate-100 p-2.5 rounded-2xl border border-slate-300 font-semibold">
                    <span className="flex items-center" title="Passenger Capacity">
                      <Users className="w-3.5 h-3.5 mr-1 text-black" />
                      {v.passengers}
                    </span>
                    <span className="flex items-center" title="Luggage Capacity">
                      <Briefcase className="w-3.5 h-3.5 mr-1 text-black" />
                      {v.luggage} Bags
                    </span>
                    <span className="flex items-center text-black font-bold" title="Air Conditioning">
                      <Snowflake className="w-3.5 h-3.5 mr-1 text-black" />
                      Chilled AC
                    </span>
                  </div>

                  {/* Tariff box */}
                  <div className="p-3.5 bg-[#0B192C] text-white rounded-2xl border border-black mb-3">
                    <div className="flex items-baseline justify-between border-b border-black/40 pb-2 mb-2">
                      <span className="text-[11px] font-bold text-slate-300">Base Outstation:</span>
                      <span className="text-base font-black text-white">
                        ₹{v.baseFarePerKm} <span className="text-xs font-normal text-slate-300">/ km</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>BDQ Airport:</span>
                      <span className="font-extrabold text-white">Fixed ₹{v.airportVadodaraFlat}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-300">
                      <span>AMD Airport:</span>
                      <span className="font-extrabold text-white">Fixed ₹{v.airportAhmedabadFlat}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5 mb-2">
                    {v.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center text-xs text-black font-medium">
                        <Check className="w-3 h-3 mr-1.5 text-black shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    onSelectVehicle(v.id);
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#0B192C] hover:bg-black text-white border border-white/20 font-black text-xs py-3 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Select {v.category}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note on transparent policies */}
        <div className="mt-10 text-center text-xs text-slate-600 max-w-xl mx-auto">
          * Toll charges, state tax permits, and airport parking fees are payable as per actual government receipts. Driver allowance of ₹300/day applies on outstation round-trip tours.
        </div>
      </div>
    </section>
  );
};
