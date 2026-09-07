import React from 'react';
import { Star, CheckCircle, ExternalLink, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS, BUSINESS_INFO } from '../data/travelData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-14 bg-white border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#0B192C] text-white text-xs font-bold px-3 py-1 rounded-full mb-2 border border-black">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span>4.9 / 5.0 on Google Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black">
              Trusted by Hundreds of Happy Travelers
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Read real experiences from airport commuters, families visiting Statue of Unity, and corporate guests.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 shadow-xs transition cursor-pointer"
            >
              <span>View All Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50 rounded-2xl p-5 border-2 border-[#0B192C] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-black">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-black text-black" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500">{review.relativeTime}</span>
                </div>

                <div className="relative mb-3">
                  <Quote className="w-5 h-5 text-slate-300 absolute -top-1 -left-1 -z-0 opacity-50" />
                  <p className="text-xs text-black relative z-10 leading-relaxed italic font-medium">
                    "{review.text}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-black">{review.author}</h4>
                  <span className="text-[10px] text-[#0B192C] font-semibold">{review.tripType}</span>
                </div>
                {review.verified && (
                  <span className="inline-flex items-center text-[10px] text-black font-semibold" title="Verified Customer">
                    <CheckCircle className="w-3 h-3 mr-0.5 text-black" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
