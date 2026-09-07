import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Navigation,
  Phone,
  MessageSquare,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Car,
  MapPin,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Radio,
  Maximize2,
  Minimize2,
  Map as MapIcon,
  Layers,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { LiveTrackingState, TrackingRideStatus, BookingRecord } from '../types';
import { BUSINESS_INFO, PRESET_TRACKING_RIDES, getLiveTrackingForBooking } from '../data/travelData';

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBooking?: BookingRecord | null;
  savedBookings?: BookingRecord[];
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  isOpen,
  onClose,
  initialBooking,
  savedBookings = [],
}) => {
  // Active tracking state
  const [activeTracking, setActiveTracking] = useState<LiveTrackingState>(() => {
    if (initialBooking) {
      return getLiveTrackingForBooking(initialBooking);
    }
    return PRESET_TRACKING_RIDES[0];
  });

  // Track user input search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  // Simulation controls
  const [isSimulating, setIsSimulating] = useState(true);
  const [progress, setProgress] = useState(activeTracking.routeProgressPercent || 50);
  const [mapViewMode, setMapViewMode] = useState<'vector' | 'satellite'>('vector');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSosConfirm, setShowSosConfirm] = useState(false);

  // Update tracking if initialBooking changes
  useEffect(() => {
    if (initialBooking) {
      const live = getLiveTrackingForBooking(initialBooking);
      setActiveTracking(live);
      setProgress(live.routeProgressPercent);
      setIsSimulating(true);
    }
  }, [initialBooking]);

  // Live simulation tick: animates vehicle progress smoothly
  useEffect(() => {
    if (!isSimulating || !isOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // loop simulation
        }
        return prev + 0.8;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isSimulating, isOpen]);

  if (!isOpen) return null;

  // Derive dynamic metrics based on simulation progress
  const currentProgressPercent = Math.min(100, Math.max(0, Math.round(progress)));
  const dynamicDistanceKm = Number(Math.max(0.1, (100 - currentProgressPercent) * 0.05 * (activeTracking.distanceRemainingKm || 3)).toFixed(1));
  const dynamicEtaMins = Math.max(1, Math.ceil((100 - currentProgressPercent) * 0.12));
  const dynamicSpeed = activeTracking.tripStatus === 'arrived' ? 0 : Math.min(65, Math.max(25, Math.round(38 + Math.sin(progress) * 8)));

  // Handle preset selection
  const handleSelectPreset = (preset: typeof PRESET_TRACKING_RIDES[0]) => {
    setActiveTracking(preset);
    setProgress(preset.routeProgressPercent);
    setSearchFeedback(null);
  };

  // Handle Search by ID or Phone
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // Check saved bookings first
    const foundSaved = savedBookings.find(
      (b) =>
        b.id.toLowerCase().includes(query) ||
        b.customerPhone.includes(query) ||
        b.customerName.toLowerCase().includes(query)
    );

    if (foundSaved) {
      const live = getLiveTrackingForBooking(foundSaved);
      setActiveTracking(live);
      setProgress(live.routeProgressPercent);
      setSearchFeedback(`Found booking #${foundSaved.id} for ${foundSaved.customerName}`);
      return;
    }

    // Check presets
    const foundPreset = PRESET_TRACKING_RIDES.find(
      (p) =>
        p.bookingId.toLowerCase().includes(query) ||
        p.customerPhone?.includes(query) ||
        p.pickupLocation.toLowerCase().includes(query) ||
        p.dropLocation.toLowerCase().includes(query)
    );

    if (foundPreset) {
      setActiveTracking(foundPreset);
      setProgress(foundPreset.routeProgressPercent);
      setSearchFeedback(`Tracking ride #${foundPreset.bookingId} (${foundPreset.customerName})`);
      return;
    }

    setSearchFeedback(`No active ride found for "${searchQuery}". Showing standard demo tracking.`);
  };

  // Status progression click
  const handleSetStatus = (status: TrackingRideStatus) => {
    let msg = '';
    let newProgress = progress;

    switch (status) {
      case 'chauffeur_assigned':
        msg = `Chauffeur ${activeTracking.driver.name.split(' ')[0]} assigned and preparing vehicle.`;
        newProgress = 10;
        break;
      case 'on_the_way':
        msg = `Chauffeur is on the way to your pickup location.`;
        newProgress = 50;
        break;
      case 'arrived':
        msg = `Chauffeur has arrived at pickup point and is waiting.`;
        newProgress = 100;
        break;
      case 'trip_started':
        msg = `Trip is in progress. Navigating safely to destination.`;
        newProgress = 35;
        break;
      case 'completed':
        msg = `Trip completed successfully. Thank you for riding with Kabeer Travels!`;
        newProgress = 100;
        break;
    }

    setActiveTracking((prev) => ({
      ...prev,
      tripStatus: status,
      statusMessage: msg,
    }));
    setProgress(newProgress);
  };

  const copyOtp = () => {
    navigator.clipboard.writeText(activeTracking.driver.otp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const shareLiveTrip = () => {
    const text = `🚕 *LIVE CAB TRACKING - KABEER TRAVELS*\nBooking: ${activeTracking.bookingId}\nChauffeur: ${activeTracking.driver.name} (${activeTracking.driver.phone})\nVehicle: ${activeTracking.driver.vehicleModel} [${activeTracking.driver.vehiclePlate}]\nPickup: ${activeTracking.pickupLocation}\nDrop: ${activeTracking.dropLocation}\nETA: ~${dynamicEtaMins} mins | Distance: ~${dynamicDistanceKm} km\nStatus: ${activeTracking.statusMessage}\nLive Tracking: ${window.location.origin}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Google maps direction link
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    activeTracking.pickupLocation
  )}&destination=${encodeURIComponent(activeTracking.dropLocation)}`;

  // SVG road geometry points
  // Simple bezier curve representing road from pickup (top-left) to drop (bottom-right)
  const pathD = "M 50 180 C 130 90, 240 240, 360 120 S 490 60, 580 150 S 710 260, 800 130";

  // Calculate moving car coordinates along curve
  const t = currentProgressPercent / 100;
  // Approximate coordinate interpolation
  const carX = 50 + t * 750;
  const carY = 160 + Math.sin(t * Math.PI * 2.8) * 60;
  const angleDeg = Math.cos(t * Math.PI * 2.8) * 35;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div
        className={`bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 w-full overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen ? 'max-w-none h-screen rounded-none' : 'max-w-5xl max-h-[92vh]'
        }`}
      >
        {/* Top Live Bar */}
        <div className="bg-[#0B192C] text-white px-4 sm:px-6 py-3 border-b border-black flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-white animate-ping absolute"></span>
              <span className="w-3 h-3 rounded-full bg-white relative"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase flex items-center">
                  <Radio className="w-3.5 h-3.5 mr-1.5 text-white" />
                  Live Cab Tracking System
                </span>
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                  GPS Active
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Booking Ref: <strong className="text-white font-mono">{activeTracking.bookingId}</strong> • Vadodara Fleet Control
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-black transition hidden sm:inline-flex cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-black transition cursor-pointer"
              title="Close Tracking"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Selector Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 shrink-0">
          <form onSubmit={handleSearch} className="flex items-center space-x-2 flex-1 max-w-md">
            <input
              type="text"
              placeholder="Track by Booking ID (e.g. KT-...) or Mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-[#0B192C] hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Quick Preset Selector Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 text-[11px]">
            <span className="text-black font-semibold text-[10px] shrink-0">Live Demos:</span>
            {PRESET_TRACKING_RIDES.map((p) => (
              <button
                key={p.bookingId}
                onClick={() => handleSelectPreset(p)}
                className={`px-2 py-1 rounded-md font-medium whitespace-nowrap transition border cursor-pointer ${
                  activeTracking.bookingId === p.bookingId
                    ? 'bg-[#0B192C] text-white font-bold border-black shadow-xs'
                    : 'bg-white text-black border-slate-300 hover:bg-slate-50'
                }`}
              >
                {p.bookingId.split('-')[1]} ({p.serviceCategory})
              </button>
            ))}
          </div>
        </div>

        {searchFeedback && (
          <div className="bg-slate-100 text-black text-xs px-4 py-1.5 border-b border-slate-300 flex items-center justify-between">
            <span className="flex items-center">
              <Info className="w-3.5 h-3.5 mr-1 text-black shrink-0" />
              {searchFeedback}
            </span>
            <button onClick={() => setSearchFeedback(null)} className="text-[10px] font-bold text-black underline cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* Modal Body: Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Main Map Visualizer */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md">
            {/* Map Canvas / SVG Road Renderer */}
            <div className="w-full h-72 sm:h-96 relative overflow-hidden select-none bg-[#0B192C]">
              {/* Background Grid Lines simulating Map Tile Grids */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Vadodara Landmark Water & River Mock */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 850 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>
                </defs>

                {/* Vishwamitri River Blue Ribbon in Vadodara */}
                <path
                  d="M 280 0 Q 320 120, 290 200 T 340 300"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="14"
                  opacity="0.25"
                />

                {/* Secondary Roads */}
                <path d="M 0 100 L 850 100" stroke="#334155" strokeWidth="3" opacity="0.4" strokeDasharray="6,6" />
                <path d="M 0 220 L 850 220" stroke="#334155" strokeWidth="3" opacity="0.4" strokeDasharray="6,6" />
                <path d="M 180 0 L 180 300" stroke="#334155" strokeWidth="2.5" opacity="0.4" />
                <path d="M 640 0 L 640 300" stroke="#334155" strokeWidth="2.5" opacity="0.4" />

                {/* Main GPS Route Track */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Active Colored Route Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Pickup Location Marker (Green) */}
                <g transform="translate(50, 180)">
                  <circle r="14" fill="#10b981" fillOpacity="0.25" className="animate-ping" />
                  <circle r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <text x="14" y="4" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    Pickup: {activeTracking.pickupLocation.slice(0, 18)}...
                  </text>
                </g>

                {/* Drop Location Marker (Red) */}
                <g transform="translate(800, 130)">
                  <circle r="14" fill="#ef4444" fillOpacity="0.25" className="animate-ping" />
                  <circle r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <text x="-120" y="-12" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    Drop: {activeTracking.dropLocation.slice(0, 18)}...
                  </text>
                </g>

                {/* Moving Cab Marker */}
                <g transform={`translate(${carX}, ${carY}) rotate(${angleDeg})`}>
                  {/* Radar beacon pulses */}
                  <circle r="22" fill="#f59e0b" fillOpacity="0.2" />
                  <circle r="14" fill="#f59e0b" fillOpacity="0.35" />
                  {/* Car body */}
                  <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#000000" stroke="#ffffff" strokeWidth="2" />
                  {/* Windshields */}
                  <rect x="-4" y="-6" width="10" height="12" rx="1.5" fill="#ffffff" />
                  {/* Headlights beam */}
                  <polygon points="14,-6 28,-10 28,10 14,6" fill="#ffffff" fillOpacity="0.3" />
                </g>
              </svg>

              {/* Floating Top-Left Telemetry HUD */}
              <div className="absolute top-3 left-3 bg-[#0B192C]/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 shadow-lg text-white space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                  <span className="text-xs font-black tracking-wide text-white uppercase">
                    {activeTracking.tripStatus === 'arrived'
                      ? 'Chauffeur Arrived'
                      : activeTracking.tripStatus === 'trip_started'
                      ? 'En Route to Destination'
                      : 'Chauffeur Approaching'}
                  </span>
                </div>
                <div className="flex items-baseline space-x-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-300 block uppercase font-bold">ETA</span>
                    <span className="text-lg font-black text-white">{dynamicEtaMins} mins</span>
                  </div>
                  <div className="h-6 w-px bg-white/20"></div>
                  <div>
                    <span className="text-[10px] text-slate-300 block uppercase font-bold">Distance</span>
                    <span className="text-lg font-black text-white">{dynamicDistanceKm} km</span>
                  </div>
                  <div className="h-6 w-px bg-white/20"></div>
                  <div>
                    <span className="text-[10px] text-slate-300 block uppercase font-bold">Live Speed</span>
                    <span className="text-lg font-black text-white">{dynamicSpeed} km/h</span>
                  </div>
                </div>
              </div>

              {/* Floating Top-Right View Controls */}
              <div className="absolute top-3 right-3 flex flex-col space-y-1.5">
                <button
                  onClick={() => setMapViewMode(mapViewMode === 'vector' ? 'satellite' : 'vector')}
                  className="bg-black/90 backdrop-blur-md hover:bg-black text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-white/20 flex items-center space-x-1 shadow-md transition cursor-pointer"
                  title="Toggle Map Style"
                >
                  <Layers className="w-3.5 h-3.5 text-white" />
                  <span>{mapViewMode === 'vector' ? 'Vector GPS' : 'Satellite'}</span>
                </button>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/90 backdrop-blur-md hover:bg-black text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-white/20 flex items-center space-x-1 shadow-md transition cursor-pointer"
                  title="Open live directions on Google Maps App"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                  <span>Google Maps</span>
                </a>
              </div>

              {/* Floating Bottom-Center Live Landmark Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 max-w-sm bg-[#0B192C]/95 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center space-x-2 truncate">
                  <Compass className="w-4 h-4 text-white shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-300 block uppercase font-semibold">Current Landmark:</span>
                    <span className="text-xs font-bold text-white truncate block">
                      {activeTracking.currentLandmark}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-black text-white font-bold px-2 py-0.5 rounded border border-white/20 shrink-0 ml-2">
                  {activeTracking.trafficStatus} Flow
                </span>
              </div>
            </div>

            {/* Simulation Controls & Status Stage Bar */}
            <div className="bg-[#0B192C] p-3 sm:px-4 flex flex-wrap items-center justify-between gap-3 text-white border-t border-black">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`p-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
                    isSimulating
                      ? 'bg-white text-black hover:bg-slate-200'
                      : 'bg-black text-white hover:bg-slate-900 border border-white/20'
                  }`}
                  title={isSimulating ? 'Pause GPS Telemetry' : 'Resume Live Telemetry'}
                >
                  {isSimulating ? <Pause className="w-3.5 h-3.5 text-black" /> : <Play className="w-3.5 h-3.5 text-white" />}
                  <span>{isSimulating ? 'Live Telemetry Active' : 'Simulation Paused'}</span>
                </button>

                <button
                  onClick={() => setProgress(0)}
                  className="p-2 rounded-lg bg-black hover:bg-slate-900 text-white text-xs transition border border-white/20 cursor-pointer"
                  title="Rewind Route"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              {/* Status Jumpers */}
              <div className="flex items-center space-x-1 overflow-x-auto text-[10px]">
                <span className="text-slate-300 font-semibold mr-1">Ride Stage:</span>
                {(['chauffeur_assigned', 'on_the_way', 'arrived', 'trip_started', 'completed'] as TrackingRideStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleSetStatus(st)}
                      className={`px-2 py-1 rounded transition whitespace-nowrap capitalize cursor-pointer ${
                        activeTracking.tripStatus === st
                          ? 'bg-white text-black font-bold'
                          : 'bg-black text-white hover:bg-slate-900 border border-white/20'
                      }`}
                    >
                      {st.replace(/_/g, ' ')}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Chauffeur Verification, Security OTP & Vehicle Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Chauffeur Details & Actions */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#0B192C] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1 text-black" />
                    Verified Chauffeur & Vehicle Dispatch
                  </span>
                  <span className="text-[10px] bg-[#0B192C] text-white font-extrabold px-2 py-0.5 rounded-full border border-black">
                    Police Verified
                  </span>
                </div>

                <div className="flex items-start space-x-3.5">
                  <img
                    src={activeTracking.driver.photoUrl}
                    alt={activeTracking.driver.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-[#0B192C] shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base sm:text-lg font-black text-black">
                        {activeTracking.driver.name}
                      </h4>
                      <span className="text-xs font-black bg-slate-100 text-black px-2 py-0.5 rounded border border-slate-300">
                        ★ {activeTracking.driver.rating} ({activeTracking.driver.totalTrips}+ trips)
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-semibold mt-0.5">
                      {activeTracking.driver.badge}
                    </p>

                    <div className="flex items-center space-x-2 mt-2 flex-wrap gap-y-1">
                      <span className="text-xs font-bold text-black">
                        {activeTracking.driver.vehicleModel}
                      </span>
                      {/* Commercial RTO Number Plate */}
                      <span className="bg-slate-100 text-black font-mono font-black text-xs px-2.5 py-0.5 rounded border border-black shadow-xs tracking-wider">
                        {activeTracking.driver.vehiclePlate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Direct Call & WhatsApp Chauffeur */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200">
                <a
                  href={`tel:${activeTracking.driver.phone}`}
                  className="inline-flex items-center justify-center space-x-1.5 bg-[#0B192C] hover:bg-black text-white font-bold text-xs py-2.5 px-3 rounded-xl transition shadow-xs cursor-pointer border border-black"
                >
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>Call Driver</span>
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hi ${activeTracking.driver.name}, I am tracking booking #${activeTracking.bookingId}. Please update your arrival location.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-1.5 bg-black hover:bg-slate-900 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition shadow-xs cursor-pointer border border-white/20"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={shareLiveTrip}
                  className="inline-flex items-center justify-center space-x-1.5 bg-white hover:bg-slate-100 text-black border border-slate-300 font-bold text-xs py-2.5 px-3 rounded-xl transition shadow-xs cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-black" />
                  <span>{copiedLink ? 'Shared!' : 'Share Trip'}</span>
                </button>

                <button
                  onClick={() => setShowSosConfirm(!showSosConfirm)}
                  className="inline-flex items-center justify-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-black border border-slate-400 font-bold text-xs py-2.5 px-3 rounded-xl transition shadow-xs cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-black" />
                  <span>Safety SOS</span>
                </button>
              </div>

              {showSosConfirm && (
                <div className="p-3 bg-slate-100 border-2 border-black rounded-xl text-black text-xs space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 font-bold text-black">
                    <Shield className="w-4 h-4 text-black" />
                    <span>Emergency Safety Assistance (24/7 Police & Control Room)</span>
                  </div>
                  <p className="text-[11px] text-slate-700">
                    Need instant emergency support? Your live GPS coordinates and vehicle registration ({activeTracking.driver.vehiclePlate}) are logged.
                  </p>
                  <div className="flex space-x-2">
                    <a
                      href="tel:112"
                      className="bg-black hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Call Police (112)
                    </a>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="bg-[#0B192C] hover:bg-black text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Call Kabeer Control Room
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Security OTP & Trip Snapshot */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#0B192C] flex flex-col justify-between space-y-4">
              {/* Ride Start Security OTP */}
              <div className="bg-white p-4 rounded-xl border-2 border-black shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider flex items-center">
                    <Shield className="w-3.5 h-3.5 mr-1 text-black" />
                    Ride Start Security OTP
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold">Required at Boarding</span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-black tracking-widest bg-slate-100 px-3 py-1 rounded-lg border border-slate-300">
                    {activeTracking.driver.otp}
                  </div>
                  <button
                    onClick={copyOtp}
                    className="flex items-center space-x-1 text-xs font-bold bg-[#0B192C] hover:bg-black text-white px-3 py-2 rounded-lg transition cursor-pointer"
                  >
                    {copiedOtp ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                    <span>{copiedOtp ? 'Copied' : 'Copy OTP'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-600 mt-2">
                  Verify the car plate <strong>{activeTracking.driver.vehiclePlate}</strong> before sharing this OTP with the chauffeur.
                </p>
              </div>

              {/* Tariff & Balance HUD */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Total Tariff:</span>
                  <span className="font-bold text-black">₹{activeTracking.fareAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Balance Due to Driver:</span>
                  <span className="font-extrabold text-black text-sm">
                    ₹{activeTracking.balanceDue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Payment Mode:</span>
                  <span className="font-semibold text-black">
                    {activeTracking.balanceDue === 0 ? '100% Prepaid Online' : 'Cash / Chauffeur UPI'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Route Milestones & Locations Accordion */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#0B192C]">
            <h4 className="text-xs font-bold text-black uppercase tracking-wider mb-3 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-black" />
              Route & Landmark Waypoints
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-300">
                <span className="text-[10px] font-bold text-black uppercase block mb-1">
                  Pickup Location:
                </span>
                <p className="font-semibold text-black">{activeTracking.pickupLocation}</p>
                <span className="text-[10px] text-slate-600 block mt-1">
                  Driver arriving via shortest bypass route.
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-300">
                <span className="text-[10px] font-bold text-black uppercase block mb-1">
                  Drop Location:
                </span>
                <p className="font-semibold text-black">{activeTracking.dropLocation}</p>
                <span className="text-[10px] text-slate-600 block mt-1">
                  Estimated Travel Time: ~{dynamicEtaMins + 15} minutes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info & Done button */}
        <div className="bg-slate-100 px-4 sm:px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-black flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1 text-black" />
            24/7 GPS Tracking & SOS Protection Enabled
          </span>
          <button
            onClick={onClose}
            className="bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-5 py-2 rounded-xl transition cursor-pointer border border-black"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
