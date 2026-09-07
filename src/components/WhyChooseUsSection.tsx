import React from 'react';
import { Clock, Sparkles, ShieldCheck, Banknote, MapPin, Briefcase } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/travelData';

const iconMap = {
  Clock,
  Sparkles,
  ShieldCheck,
  Banknote,
  MapPin,
  Briefcase,
};

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-white text-xs font-bold uppercase tracking-wider bg-[#0B192C] px-3.5 py-1 rounded-full border border-black">
            Our Service Commitment
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black mt-2">
            Why Travelers Choose Kabeer Travels
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Built on punctuality, pristine hygiene, verified drivers, and 100% transparent rates across Vadodara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || ShieldCheck;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border-2 border-[#0B192C] bg-white hover:shadow-md transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B192C] text-white flex items-center justify-center mb-4 group-hover:bg-black transition border border-black">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-black mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
