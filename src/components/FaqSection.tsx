import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/travelData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-white text-xs font-bold uppercase tracking-wider bg-[#0B192C] px-3.5 py-1 rounded-full border border-black">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Everything you need to know about our cab booking, airport pickups, and tariff structure.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-2 border-[#0B192C] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm text-black flex items-center justify-between bg-white hover:bg-slate-50 transition cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-black shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 text-xs text-slate-700 leading-relaxed border-t border-slate-200 bg-slate-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-[#0B192C] rounded-2xl border-2 border-black text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-black border border-white/20 text-white flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Have a custom question or specific itinerary?</h4>
              <p className="text-[11px] text-slate-300">Our dispatch desk is active 24/7 to assist you directly.</p>
            </div>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="bg-black hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition shrink-0"
          >
            Call +91 88664 78812
          </a>
        </div>
      </div>
    </section>
  );
};
