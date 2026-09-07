import React, { useState } from 'react';
import {
  Navigation,
  Radio,
  Clock,
  ShieldCheck,
  Search,
  ArrowRight,
  Car,
  MapPin,
  Compass,
  Phone,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { PRESET_TRACKING_RIDES } from '../data/travelData';
import { BookingRecord } from '../types';

interface LiveTrackingSectionProps {
  onOpenTracking: (booking?: BookingRecord | null) => void;
  savedBookings?: BookingRecord[];
}

export const LiveTrackingSection: React.FC<LiveTrackingSectionProps> = ({
  onOpenTracking,
  savedBookings = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      onOpenTracking(null);
      return;
    }

    // Try finding matching saved booking
    const found = savedBookings.find(
      (b) =>
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.customerPhone.includes(searchQuery)
    );

    if (found) {
      onOpenTracking(found);
    } else {
      onOpenTracking(null);
    }
  };

  return (
    <section id="live-tracking" className="py-14 bg-[#0B192C] text-white relative overflow-hidden border-t border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 mb-3 shadow-md">
            <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>24/7 Real-Time GPS Fleet Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Live Cab & Chauffeur Tracking
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Track your assigned cab in real-time with live GPS location, moving vehicle telemetry, precise ETA countdown, and chauffeur verification.
          </p>
        </div>

        {/* Central Live Tracking Console Box */}
        <div className="max-w-4xl mx-auto bg-white border-2 border-black rounded-3xl p-5 sm:p-8 shadow-2xl text-black">
          {/* Quick Track Form */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Booking ID (e.g. KT-49204) or Mobile Number..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-black placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] transition"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0B192C] hover:bg-black text-white font-black text-sm px-7 py-3.5 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center space-x-2 shrink-0 border border-white/20 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Track My Cab</span>
            </button>
          </form>

          {/* Quick Preset Active Rides */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center">
                <Radio className="w-3.5 h-3.5 mr-1.5 text-[#0B192C]" />
                Live Active Rides in Vadodara Right Now:
              </span>
              <button
                onClick={() => onOpenTracking(null)}
                className="text-xs text-[#0B192C] hover:text-black font-bold flex items-center group cursor-pointer"
              >
                <span>Launch Full Console</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRESET_TRACKING_RIDES.map((ride) => (
                <div
                  key={ride.bookingId}
                  onClick={() => onOpenTracking(null)}
                  className="bg-slate-50 hover:bg-slate-100 border-2 border-[#0B192C] p-3.5 rounded-2xl cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-extrabold text-[#0B192C]">
                      #{ride.bookingId}
                    </span>
                    <span className="text-[10px] bg-black text-white font-bold px-2 py-0.5 rounded border border-white/20 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping mr-1"></span>
                      ETA {ride.etaMinutes}m
                    </span>
                  </div>

                  <div className="text-xs text-black font-bold truncate mb-1">
                    {ride.pickupLocation}
                  </div>
                  <div className="text-[11px] text-slate-600 truncate flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-black shrink-0" />
                    <span className="truncate">{ride.dropLocation}</span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">
                      {ride.driver.name.split(' ')[0]} • {ride.driver.vehiclePlate}
                    </span>
                    <span className="text-[#0B192C] font-black group-hover:underline flex items-center">
                      Track <ArrowRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Feature Highlights */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200 text-center">
            <div className="p-2">
              <div className="w-9 h-9 rounded-xl bg-[#0B192C] border border-black flex items-center justify-center mx-auto mb-2 text-white">
                <Navigation className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-black">Turn-by-Turn GPS</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Live vehicle bearing & speed</p>
            </div>

            <div className="p-2">
              <div className="w-9 h-9 rounded-xl bg-[#0B192C] border border-black flex items-center justify-center mx-auto mb-2 text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-black">Chauffeur Verified</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Commercial yellow plate & badge</p>
            </div>

            <div className="p-2">
              <div className="w-9 h-9 rounded-xl bg-[#0B192C] border border-black flex items-center justify-center mx-auto mb-2 text-white">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-black">Ride Start OTP</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">4-digit security code for safety</p>
            </div>

            <div className="p-2">
              <div className="w-9 h-9 rounded-xl bg-[#0B192C] border border-black flex items-center justify-center mx-auto mb-2 text-white">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-black">Live ETA Updates</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Real-time traffic recalculation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
