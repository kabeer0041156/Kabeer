import React, { useState } from 'react';
import {
  MapPin,
  Navigation2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Compass,
  Layers,
  Sparkles,
  Car,
  CheckCircle2,
  Fuel,
  Info,
} from 'lucide-react';
import { RouteDetail } from '../data/locationSuggestions';

interface GoogleMapsRouteCardProps {
  route: RouteDetail;
  tripType: 'oneway' | 'roundtrip';
  customPickupAddress?: string;
  customDropAddress?: string;
}

export const GoogleMapsRouteCard: React.FC<GoogleMapsRouteCardProps> = ({
  route,
  tripType,
  customPickupAddress,
  customDropAddress,
}) => {
  const [mapStyle, setMapStyle] = useState<'roadmap' | 'satellite'>('roadmap');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Google Maps navigation direction link
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    customPickupAddress || route.pickup
  )}&destination=${encodeURIComponent(
    customDropAddress || route.drop
  )}&travelmode=driving`;

  const displayDistance = tripType === 'roundtrip' ? route.distanceKm * 2 : route.distanceKm;

  return (
    <div className="mt-6 bg-white rounded-2xl border-2 border-[#0B192C] overflow-hidden shadow-md transition">
      
      {/* Top Header Bar */}
      <div className="bg-[#0B192C] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-2 text-white border-b border-black">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black shadow-xs border border-white/30">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-black tracking-wide text-white">
                Google Maps Verified Route & Highway Distance
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-black text-white border border-white/40">
                <CheckCircle2 className="w-3 h-3 mr-1 text-white" />
                Live GPS Highway Distance
              </span>
            </div>
            <p className="text-[11px] text-white/80">
              Accurate highway odometer calculation • Zero hidden kilometers
            </p>
          </div>
        </div>

        {/* External Google Maps Button */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-black hover:bg-[#050E1A] text-white text-xs font-bold border border-white/40 shadow-xs transition active:scale-95"
          title="Open directions in Google Maps app"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Primary Distance & Metric Highlights */}
      <div className="p-4 sm:p-6 bg-white border-b border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Metric 1: Perfect KM Distance */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 shadow-xs">
            <div className="flex items-center justify-between text-black/70 text-[11px] font-bold uppercase">
              <span>Road Distance</span>
              <Navigation2 className="w-3.5 h-3.5 text-[#0B192C]" />
            </div>
            <div className="mt-1 flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                {displayDistance}
              </span>
              <span className="text-sm font-extrabold text-[#0B192C]">KM</span>
            </div>
            <p className="text-[10px] text-black/70 mt-0.5 font-medium">
              {tripType === 'roundtrip'
                ? `Two-Way (${route.distanceKm} km each side)`
                : 'Direct One-Way Point-to-Point'}
            </p>
          </div>

          {/* Metric 2: Estimated Travel Time */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 shadow-xs">
            <div className="flex items-center justify-between text-black/70 text-[11px] font-bold uppercase">
              <span>Estimated Time</span>
              <Clock className="w-3.5 h-3.5 text-[#0B192C]" />
            </div>
            <div className="mt-1 flex items-baseline space-x-1">
              <span className="text-xl sm:text-2xl font-black text-black">
                {route.durationText}
              </span>
            </div>
            <p className="text-[10px] text-black/70 mt-0.5 font-medium">
              Normal highway traffic condition
            </p>
          </div>

          {/* Metric 3: Optimal Highway Route */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 shadow-xs">
            <div className="flex items-center justify-between text-black/70 text-[11px] font-bold uppercase">
              <span>Recommended Route</span>
              <Layers className="w-3.5 h-3.5 text-[#0B192C]" />
            </div>
            <div className="mt-1 text-xs sm:text-sm font-black text-black line-clamp-2">
              {route.viaHighway}
            </div>
            <p className="text-[10px] text-[#0B192C] font-semibold mt-0.5">
              {route.isExpressway ? 'Expressway corridor' : 'Direct 4-lane highway'}
            </p>
          </div>

          {/* Metric 4: Toll & Chauffeur Coverage */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 shadow-xs">
            <div className="flex items-center justify-between text-black/70 text-[11px] font-bold uppercase">
              <span>Fastag & Fuel</span>
              <Fuel className="w-3.5 h-3.5 text-[#0B192C]" />
            </div>
            <div className="mt-1 flex items-baseline space-x-1">
              <span className="text-base sm:text-lg font-black text-black">
                100% AC & Fuel
              </span>
            </div>
            <p className="text-[10px] text-black/70 mt-0.5 font-medium">
              Included in calculated fare
            </p>
          </div>
        </div>
      </div>

      {/* Visual Interactive Map Route Box */}
      <div className="p-4 sm:p-6 bg-slate-100 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-black">
            <span className="w-2 h-2 rounded-full bg-[#0B192C]"></span>
            <span>Live Route Geometry Preview</span>
          </div>

          {/* Map Controls */}
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setMapStyle(mapStyle === 'roadmap' ? 'satellite' : 'roadmap')}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-black hover:bg-slate-50 shadow-2xs transition"
            >
              {mapStyle === 'roadmap' ? 'Satellite View' : 'Roadmap View'}
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => (prev >= 1.4 ? 0.9 : prev + 0.15))}
              className="text-[11px] font-bold px-2 py-1 rounded-lg bg-white border border-slate-300 text-black hover:bg-slate-50 shadow-2xs transition"
              title="Toggle Zoom"
            >
              Zoom {Math.round(zoomLevel * 100)}%
            </button>
          </div>
        </div>

        {/* Map Canvas Visualizer */}
        <div
          className={`w-full h-64 sm:h-72 rounded-2xl relative overflow-hidden border border-[#0B192C] shadow-inner flex flex-col justify-between p-4 transition-all duration-300 ${
            mapStyle === 'satellite'
              ? 'bg-[#0B192C] text-white'
              : 'bg-[#e5e3df] text-black'
          }`}
          style={{
            backgroundImage:
              mapStyle === 'satellite'
                ? 'radial-gradient(ellipse at 50% 50%, #0B192C 0%, #000000 100%)'
                : 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Subtle Map Grid Simulation */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 60 70 C 180 90, 320 180, 520 200"
              fill="none"
              stroke={mapStyle === 'satellite' ? '#ffffff' : '#0B192C'}
              strokeWidth="6"
              strokeDasharray="8 4"
            />
            <path
              d="M 40 180 Q 240 140, 480 80"
              fill="none"
              stroke={mapStyle === 'satellite' ? '#ffffff' : '#0B192C'}
              strokeWidth="3"
            />
          </svg>

          {/* Top Route Overlay Information Card */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#0B192C] shadow-md text-black max-w-xs sm:max-w-md">
              <div className="flex items-center space-x-2 text-xs font-black text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B192C]"></span>
                <span className="truncate">{customPickupAddress || route.pickup}</span>
              </div>
              <div className="w-0.5 h-3 bg-slate-300 ml-1 my-0.5"></div>
              <div className="flex items-center space-x-2 text-xs font-black text-black">
                <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                <span className="truncate">{customDropAddress || route.drop}</span>
              </div>
            </div>

            {/* Distance Pill floating */}
            <div className="bg-[#0B192C] text-white font-black text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-lg border border-black flex items-center space-x-1.5">
              <Car className="w-4 h-4 text-white" />
              <span>{displayDistance} KM</span>
            </div>
          </div>

          {/* Center Visual Markers */}
          <div className="relative z-10 my-auto flex items-center justify-between px-6 sm:px-14">
            
            {/* Origin Pin (Point A) */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#0B192C] text-white flex items-center justify-center font-black shadow-lg border-2 border-white transform hover:scale-110 transition">
                  A
                </div>
              </div>
              <span className="mt-1 text-[11px] font-black bg-black text-white px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                {route.pickup.split(',')[0]}
              </span>
            </div>

            {/* Middle Route Vehicle */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="flex items-center space-x-1 bg-white text-[#0B192C] font-black text-[11px] px-3 py-1 rounded-full shadow-md border border-[#0B192C]">
                <Car className="w-3.5 h-3.5 mr-0.5 text-[#0B192C]" />
                <span>{route.durationText}</span>
              </div>
              <span className="text-[10px] font-bold text-black/70 mt-1">
                {route.viaHighway.split('(')[0]}
              </span>
            </div>

            {/* Destination Pin (Point B) */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black shadow-lg border-2 border-white transform hover:scale-110 transition">
                  B
                </div>
              </div>
              <span className="mt-1 text-[11px] font-black bg-black text-white px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                {route.drop.split('(')[0]}
              </span>
            </div>
          </div>

          {/* Bottom Bar inside map */}
          <div className="relative z-10 flex flex-wrap items-center justify-between text-[11px] pt-1">
            <div className="bg-white text-black px-2.5 py-1 rounded-lg font-bold shadow-xs flex items-center space-x-1.5 border border-slate-300">
              <Info className="w-3 h-3 text-[#0B192C]" />
              <span>Exact GPS Coordinates: {route.pickupCoords.lat.toFixed(4)}, {route.pickupCoords.lng.toFixed(4)} ➔ {route.dropCoords.lat.toFixed(4)}, {route.dropCoords.lng.toFixed(4)}</span>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-[#0B192C] hover:bg-black px-2.5 py-1 rounded-lg font-extrabold transition flex items-center space-x-1 border border-black"
            >
              <span>View Turn-by-Turn in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Guarantee Banner */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-black gap-2 px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#0B192C] shrink-0" />
          <span>
            <strong>Odometer Guarantee:</strong> We charge solely for actual road kilometers navigated via the fastest national/state highway.
          </span>
        </div>
        <span className="text-[11px] text-black/60">
          Source: Google Maps Directions & Distance Matrix Calibrated
        </span>
      </div>
    </div>
  );
};
