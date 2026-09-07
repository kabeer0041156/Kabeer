import React, { useState, useMemo } from 'react';
import { Search, MapPin, Car, ArrowRight, ShieldCheck, Check, Sparkles, Filter, FileSpreadsheet, X, CheckCircle2 } from 'lucide-react';
import { 
  CSV_POINT_TO_POINT_FARES, 
  CSV_LOCAL_RENTALS, 
  CSV_AIRPORT_STATION_FARES, 
  CSV_CITIES,
  CsvPointToPointFare,
  searchDestinationFares,
  RouteFaresBreakdown
} from '../data/csvFares';

interface CsvFareLookupSectionProps {
  onSelectRouteFare?: (
    source: string,
    destination: string,
    vehicleId: string,
    tripType: 'oneway' | 'roundtrip',
    category?: 'outstation' | 'local' | 'airport',
    hours?: number
  ) => void;
}

export const CsvFareLookupSection: React.FC<CsvFareLookupSectionProps> = ({ onSelectRouteFare }) => {
  const [activeTab, setActiveTab] = useState<'outstation' | 'local' | 'airport'>('outstation');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [tripTypeFilter, setTripTypeFilter] = useState<'all' | 'drop' | 'return'>('all');
  const [carFilter, setCarFilter] = useState<'all' | 'sedan-dzire' | 'suv-ertiga' | 'luxury-innova'>('all');

  const isSearching = searchQuery.trim().length > 0;

  // When searching, find destination breakdown with One-Way and Round-Trip options
  const searchedDestinations: RouteFaresBreakdown[] = useMemo(() => {
    if (!isSearching) return [];
    return searchDestinationFares(searchQuery);
  }, [searchQuery, isSearching]);

  // Filtered Point-to-Point Fares for full directory table view
  const filteredPointToPoint = useMemo(() => {
    return CSV_POINT_TO_POINT_FARES.filter((f) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q || 
        f.sourceCity.toLowerCase().includes(q) || 
        f.destinationCity.toLowerCase().includes(q) || 
        f.carCategory.toLowerCase().includes(q) ||
        f.fareId.includes(q);

      const matchesCity = 
        selectedCityFilter === 'All' || 
        f.sourceCity === selectedCityFilter || 
        f.destinationCity === selectedCityFilter;

      const matchesTrip = 
        tripTypeFilter === 'all' || 
        f.tripType === tripTypeFilter;

      const matchesCar = 
        carFilter === 'all' || 
        f.standardizedCarId === carFilter;

      return matchesQuery && matchesCity && matchesTrip && matchesCar;
    });
  }, [searchQuery, selectedCityFilter, tripTypeFilter, carFilter]);

  const handleQuickSearch = (destination: string) => {
    setSearchQuery(destination);
    const el = document.getElementById('csv-tariff');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookOption = (
    source: string,
    destination: string,
    vehicleId: string,
    tripType: 'oneway' | 'roundtrip',
    category: 'outstation' | 'local' | 'airport' = 'outstation',
    hours?: number
  ) => {
    if (onSelectRouteFare) {
      onSelectRouteFare(source, destination, vehicleId, tripType, category, hours);
    }
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="csv-tariff" className="py-14 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navy Blue, White, Black styling */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 bg-[#0B192C] text-white border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-xs">
            <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
            <span>Official Fixed Tariff Guarantee</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-black mt-3 tracking-tight">
            Search Exact Destination <span className="text-[#0B192C]">Tariff Rate Card</span>
          </h2>
          <p className="text-sm text-slate-700 mt-2">
            Searching a route? Type in the search box below: <strong className="text-black">only your searched destination fare is shown</strong> with Outstation One-Way & Round Trip options, hiding all other fares to keep your booking fast and clear.
          </p>
        </div>

        {/* Global Destination Search Bar with Search Icon */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative shadow-lg rounded-2xl">
            <Search className="w-5 h-5 text-white absolute left-4 top-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search destination (e.g., Ahmedabad, Statue of Unity, Surat, Mumbai...)"
              className="w-full bg-[#0B192C] border-2 border-black text-white placeholder-slate-300 rounded-2xl pl-12 pr-12 py-3.5 text-sm sm:text-base font-semibold focus:outline-none focus:ring-4 focus:ring-slate-400"
            />
            {isSearching && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-zinc-800 transition"
                title="Clear Search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Destination Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-slate-700 font-bold mr-1 flex items-center">
              <Search className="w-3.5 h-3.5 mr-1 text-black" />
              Popular Destinations:
            </span>
            {[
              { label: 'Ahmedabad', to: 'Ahmedabad' },
              { label: 'Statue of Unity', to: 'Statue of Unity' },
              { label: 'Surat', to: 'Surat' },
              { label: 'Mumbai', to: 'Mumbai' },
              { label: 'Pavagadh', to: 'Pavagadh' },
              { label: 'Bharuch', to: 'Bharuch' },
              { label: 'Dahej', to: 'Dahej' },
              { label: 'Rajkot', to: 'Rajkot' },
            ].map((chip) => {
              const isSelected = searchQuery.toLowerCase().includes(chip.to.toLowerCase());
              return (
                <button
                  key={chip.to}
                  type="button"
                  onClick={() => handleQuickSearch(chip.to)}
                  className={`px-3 py-1.5 rounded-full font-bold transition flex items-center space-x-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B192C] text-white shadow-xs ring-2 ring-black'
                      : 'bg-white text-black hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE 1: SEARCH ACTIVE -> SHOW ONLY SEARCHED DESTINATION FARE, ANOTHER HIDE */}
        {/* ========================================================================= */}
        {isSearching ? (
          <div className="max-w-5xl mx-auto">
            {/* Search Header Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-[#0B192C] border-2 border-black text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center text-white font-black shrink-0">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      Destination Search Active
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Showing ONLY Fares for: <span className="underline decoration-white">"{searchQuery}"</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    All other destination fares are hidden. Review Outstation One-Way & Round Trip options below.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSearchQuery('')}
                className="bg-black hover:bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl border border-white/30 transition flex items-center space-x-1.5 shrink-0 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Show All Fares (Clear)</span>
              </button>
            </div>

            {/* If structured breakdowns exist (e.g. Ahmedabad, Statue of Unity, Surat) */}
            {searchedDestinations.length > 0 ? (
              <div className="space-y-8">
                {searchedDestinations.map((routeItem) => (
                  <div 
                    key={routeItem.destination}
                    className="bg-white rounded-3xl border-2 border-[#0B192C] shadow-2xl overflow-hidden"
                  >
                    {/* Route Top Header */}
                    <div className="p-5 sm:p-6 bg-[#0B192C] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black uppercase tracking-wider text-white bg-black px-2.5 py-0.5 rounded border border-white/20">
                            Vadodara ⇄ {routeItem.destination}
                          </span>
                          <span className="text-xs text-slate-300">
                            Approx {routeItem.approxDistanceKm} km
                          </span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                          {routeItem.source} to {routeItem.destination} Commercial Tariff
                        </h4>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Compare Outstation One-Way Drop vs. Outstation Round Trip Return with transparent driver allowance.
                        </p>
                      </div>

                      <div className="text-xs text-white font-bold bg-black px-4 py-2 rounded-xl border border-white/20 shrink-0">
                        Zero Surge • Driver Allowance Breakdown Included
                      </div>
                    </div>

                    {/* Both Options Side-by-Side: Outstation One-Way vs. Round Trip */}
                    <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-100">
                      {/* OPTION 1: Outstation One-Way Drop */}
                      <div className="bg-white rounded-2xl p-5 border-2 border-[#0B192C] shadow-md flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-[#0B192C] text-white font-extrabold text-xs px-3 py-1 rounded-full flex items-center space-x-1.5 border border-white/20">
                              <span className="w-2 h-2 rounded-full bg-white" />
                              <span>OPTION 1: Outstation One-Way (Drop)</span>
                            </span>
                            <span className="text-[11px] font-bold text-slate-600">
                              {routeItem.oneway.dzire?.includedKms || routeItem.approxDistanceKm} km included
                            </span>
                          </div>

                          <h5 className="text-base font-black text-black mb-1">
                            {routeItem.source} → {routeItem.destination} Direct Drop
                          </h5>
                          <p className="text-xs text-slate-600 mb-4">
                            Ideal for single drop, airport transfers, or one-way travel with doorstep pickup.
                          </p>

                          {/* Standard Vehicles for One-Way */}
                          <div className="space-y-3">
                            {/* Swift Dzire */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 flex items-center justify-between">
                              <div>
                                <div className="font-extrabold text-sm text-black">Swift Dzire (Sedan)</div>
                                <div className="text-[10px] text-slate-600">
                                  4 Seats • Extra: ₹{routeItem.oneway.dzire?.extraKmRate || 25}/km
                                </div>
                                {routeItem.oneway.dzire?.baseFare && (
                                  <div className="text-[10px] text-black font-bold mt-0.5">
                                    Base ₹{routeItem.oneway.dzire.baseFare.toLocaleString('en-IN')} + ₹{routeItem.oneway.dzire.driverAllowance} DA
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-black text-black">
                                  ₹{routeItem.oneway.dzire?.rate.toLocaleString('en-IN') || '2,199'}
                                </div>
                                <div className="text-[9px] font-bold text-black">Toll Included</div>
                                <button
                                  onClick={() => handleBookOption(routeItem.source, routeItem.destination, 'sedan-dzire', 'oneway')}
                                  className="mt-1 bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-3 py-1 rounded-lg border border-white/20 active:scale-95 transition cursor-pointer"
                                >
                                  Book One-Way
                                </button>
                              </div>
                            </div>

                            {/* Maruti Ertiga */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 flex items-center justify-between">
                              <div>
                                <div className="font-extrabold text-sm text-black">Maruti Ertiga (SUV)</div>
                                <div className="text-[10px] text-slate-600">
                                  6 Seats • Extra: ₹{routeItem.oneway.ertiga?.extraKmRate || 35}/km
                                </div>
                                {routeItem.oneway.ertiga?.baseFare && (
                                  <div className="text-[10px] text-black font-bold mt-0.5">
                                    Base ₹{routeItem.oneway.ertiga.baseFare.toLocaleString('en-IN')} + ₹{routeItem.oneway.ertiga.driverAllowance} DA
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-black text-black">
                                  ₹{routeItem.oneway.ertiga?.rate.toLocaleString('en-IN') || '2,900'}
                                </div>
                                <div className="text-[9px] font-bold text-black">Toll Included</div>
                                <button
                                  onClick={() => handleBookOption(routeItem.source, routeItem.destination, 'suv-ertiga', 'oneway')}
                                  className="mt-1 bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-3 py-1 rounded-lg border border-white/20 active:scale-95 transition cursor-pointer"
                                >
                                  Book One-Way
                                </button>
                              </div>
                            </div>

                            {/* Innova Crysta */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 flex items-center justify-between">
                              <div>
                                <div className="font-extrabold text-sm text-black">Innova Crysta (Premium SUV)</div>
                                <div className="text-[10px] text-slate-600">
                                  7 Seats • Extra: ₹{routeItem.oneway.crysta?.extraKmRate || 35}/km
                                </div>
                                {routeItem.oneway.crysta?.baseFare && (
                                  <div className="text-[10px] text-black font-bold mt-0.5">
                                    Base ₹{routeItem.oneway.crysta.baseFare.toLocaleString('en-IN')} + ₹{routeItem.oneway.crysta.driverAllowance} DA
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-black text-black">
                                  ₹{routeItem.oneway.crysta?.rate.toLocaleString('en-IN') || '6,399'}
                                </div>
                                <div className="text-[9px] font-bold text-black">Toll Included</div>
                                <button
                                  onClick={() => handleBookOption(routeItem.source, routeItem.destination, 'luxury-innova', 'oneway')}
                                  className="mt-1 bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-3 py-1 rounded-lg border border-white/20 active:scale-95 transition cursor-pointer"
                                >
                                  Book One-Way
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-black font-bold flex flex-wrap items-center justify-between gap-1">
                          <span>✓ Toll Tax Included in Fare • Driver Allowance Included</span>
                          <span className="text-slate-600 font-normal">Parking & State Tax Extra</span>
                        </div>
                      </div>

                      {/* OPTION 2: Outstation Round Trip Return */}
                      <div className="bg-white rounded-2xl p-5 border-2 border-black shadow-md flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-black text-white font-extrabold text-xs px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-xs border border-white/20">
                              <span className="w-2 h-2 rounded-full bg-white" />
                              <span>OPTION 2: Outstation Round Trip (Return)</span>
                            </span>
                            <span className="text-[11px] font-bold text-slate-600">
                              {routeItem.roundtrip.dzire?.includedKms || 300} km min / day
                            </span>
                          </div>

                          <h5 className="text-base font-black text-black mb-1">
                            {routeItem.source} ⇄ {routeItem.destination} (Same-Day / Multi-Day)
                          </h5>
                          <p className="text-xs text-slate-600 mb-4">
                            Vehicle remains with you for city local, meetings, sight-seeing, and return journey.
                          </p>

                          {/* Vehicles for Round-Trip */}
                          <div className="space-y-3">
                            {/* Swift Dzire */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 flex items-center justify-between">
                              <div>
                                <div className="font-extrabold text-sm text-black">Swift Dzire (Sedan)</div>
                                <div className="text-[10px] text-slate-600">
                                  4 Seats • Extra: ₹{routeItem.roundtrip.dzire?.extraKmRate || 14}/km
                                </div>
                                {routeItem.roundtrip.dzire?.baseFare && (
                                  <div className="text-[10px] text-black font-medium mt-0.5">
                                    Base ₹{routeItem.roundtrip.dzire.baseFare.toLocaleString('en-IN')} + ₹{routeItem.roundtrip.dzire.driverAllowance} DA
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-black text-black">
                                  ₹{routeItem.roundtrip.dzire?.rate.toLocaleString('en-IN') || '3,600'}
                                </div>
                                <button
                                  onClick={() => handleBookOption(routeItem.source, routeItem.destination, 'sedan-dzire', 'roundtrip')}
                                  className="mt-1 bg-black hover:bg-[#0B192C] text-white font-bold text-xs px-3 py-1 rounded-lg shadow-xs active:scale-95 transition cursor-pointer border border-white/20"
                                >
                                  Book Round-Trip
                                </button>
                              </div>
                            </div>

                            {/* Maruti Ertiga */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 flex items-center justify-between">
                              <div>
                                <div className="font-extrabold text-sm text-black">Maruti Ertiga (SUV)</div>
                                <div className="text-[10px] text-slate-600">
                                  6 Seats • Extra: ₹{routeItem.roundtrip.ertiga?.extraKmRate || 18}/km
                                </div>
                                {routeItem.roundtrip.ertiga?.baseFare && (
                                  <div className="text-[10px] text-black font-medium mt-0.5">
                                    Base ₹{routeItem.roundtrip.ertiga.baseFare.toLocaleString('en-IN')} + ₹{routeItem.roundtrip.ertiga.driverAllowance} DA
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-black text-black">
                                  ₹{routeItem.roundtrip.ertiga?.rate.toLocaleString('en-IN') || '5,400'}
                                </div>
                                <button
                                  onClick={() => handleBookOption(routeItem.source, routeItem.destination, 'suv-ertiga', 'roundtrip')}
                                  className="mt-1 bg-black hover:bg-[#0B192C] text-white font-bold text-xs px-3 py-1 rounded-lg shadow-xs active:scale-95 transition cursor-pointer border border-white/20"
                                >
                                  Book Round-Trip
                                </button>
                              </div>
                            </div>

                            {/* Innova Crysta */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-300 flex items-center justify-between">
                              <div>
                                <div className="font-extrabold text-sm text-black">Innova Crysta (Premium SUV)</div>
                                <div className="text-[10px] text-slate-600">
                                  7 Seats • Extra: ₹{routeItem.roundtrip.crysta?.extraKmRate || 25}/km
                                </div>
                                {routeItem.roundtrip.crysta?.baseFare && (
                                  <div className="text-[10px] text-black font-medium mt-0.5">
                                    Base ₹{routeItem.roundtrip.crysta.baseFare.toLocaleString('en-IN')} + ₹{routeItem.roundtrip.crysta.driverAllowance} DA
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-black text-black">
                                  ₹{routeItem.roundtrip.crysta?.rate.toLocaleString('en-IN') || '7,200'}
                                </div>
                                <button
                                  onClick={() => handleBookOption(routeItem.source, routeItem.destination, 'luxury-innova', 'roundtrip')}
                                  className="mt-1 bg-black hover:bg-[#0B192C] text-white font-bold text-xs px-3 py-1 rounded-lg shadow-xs active:scale-95 transition cursor-pointer border border-white/20"
                                >
                                  Book Round-Trip
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-700 font-medium">
                          ✓ Includes ₹300 Driver Allowance • Toll, State Tax & Parking Extra as per actuals
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPointToPoint.length > 0 ? (
              /* Fallback table if keyword matches raw CSV items */
              <div className="bg-white rounded-2xl border-2 border-[#0B192C] shadow-xl overflow-hidden">
                <div className="p-4 bg-[#0B192C] text-white flex items-center justify-between border-b border-black">
                  <span className="text-xs font-bold text-white">
                    Found {filteredPointToPoint.length} route matches for "{searchQuery}"
                  </span>
                  <span className="text-xs text-slate-300">Verified Taxi Fleet</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0B192C] text-white border-b border-black font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4">Route</th>
                        <th className="py-3 px-4">Trip Type</th>
                        <th className="py-3 px-4">Vehicle Model</th>
                        <th className="py-3 px-4">Total Fare (Base + DA)</th>
                        <th className="py-3 px-4">Included Distance</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredPointToPoint.map((fare) => {
                        const driverAllowance = fare.driverAllowance || 300;
                        const totalFare = fare.packageRate + driverAllowance;
                        return (
                          <tr key={fare.fareId} className="hover:bg-slate-100 transition">
                            <td className="py-3 px-4 font-bold text-black">
                              {fare.sourceCity} → {fare.destinationCity}
                            </td>
                            <td className="py-3 px-4">
                              {fare.tripType === 'drop' ? (
                                <span className="inline-flex items-center space-x-1 bg-[#0B192C] text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                                  <span>One-Way Drop</span>
                                  <span className="text-[9px] bg-black text-white px-1 rounded border border-white/20">Toll Included</span>
                                </span>
                              ) : (
                                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                                  Round Trip
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-semibold text-black">
                              {fare.standardizedCarId === 'sedan-dzire'
                                ? 'Swift Dzire'
                                : fare.standardizedCarId === 'suv-ertiga'
                                ? 'Maruti Ertiga'
                                : 'Innova Crysta'}
                            </td>
                            <td className="py-3 px-4 font-black text-black">
                              <div className="text-sm font-black text-black">
                                ₹{totalFare.toLocaleString('en-IN')}
                              </div>
                              <div className="text-[10px] text-slate-600 font-normal">
                                Base ₹{fare.packageRate.toLocaleString('en-IN')} + ₹{driverAllowance} DA
                              </div>
                            </td>
                            <td className="py-3 px-4 text-black">
                              {fare.includedKms} km
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleBookOption(fare.sourceCity, fare.destinationCity, fare.standardizedCarId, fare.tripType === 'drop' ? 'oneway' : 'roundtrip')}
                                className="bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-white/20 transition cursor-pointer"
                              >
                                Book
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border-2 border-[#0B192C] shadow-md">
                <p className="text-black text-sm font-medium">
                  No exact match found for "{searchQuery}". Try searching for <strong>Ahmedabad, Statue of Unity, Surat, Mumbai, Bharuch, Dahej, or Pavagadh</strong>.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl border border-white/20 transition cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* MODE 2: NO SEARCH ACTIVE -> DIRECTORY VIEW WITH TABS                      */
          /* ========================================================================= */
          <>
            {/* Tab Selection */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1.5 bg-[#0B192C] rounded-2xl border-2 border-black shadow-md">
                <button
                  onClick={() => setActiveTab('outstation')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
                    activeTab === 'outstation'
                      ? 'bg-white text-[#0B192C] shadow-md'
                      : 'text-white hover:text-slate-200'
                  }`}
                >
                  Point-to-Point Outstation Tariffs
                </button>
                <button
                  onClick={() => setActiveTab('local')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
                    activeTab === 'local'
                      ? 'bg-white text-[#0B192C] shadow-md'
                      : 'text-white hover:text-slate-200'
                  }`}
                >
                  Vadodara Local Rentals (1 to 12 Hrs)
                </button>
                <button
                  onClick={() => setActiveTab('airport')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
                    activeTab === 'airport'
                      ? 'bg-white text-[#0B192C] shadow-md'
                      : 'text-white hover:text-slate-200'
                  }`}
                >
                  Airport & Railway Transfers
                </button>
              </div>
            </div>

            {/* TAB 1: Outstation Full Directory Table */}
            {activeTab === 'outstation' && (
              <div className="bg-white rounded-2xl border-2 border-[#0B192C] shadow-xl overflow-hidden">
                {/* Secondary Filters Bar */}
                <div className="p-4 sm:p-6 bg-[#0B192C] border-b border-black">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* City Filter */}
                    <div>
                      <label className="text-[11px] font-bold text-white mb-1 block">Filter By City:</label>
                      <select
                        value={selectedCityFilter}
                        onChange={(e) => setSelectedCityFilter(e.target.value)}
                        className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                      >
                        <option value="All">All Cities ({CSV_CITIES.length})</option>
                        {CSV_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Trip Type Filter */}
                    <div>
                      <label className="text-[11px] font-bold text-white mb-1 block">Trip Type:</label>
                      <select
                        value={tripTypeFilter}
                        onChange={(e) => setTripTypeFilter(e.target.value as any)}
                        className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                      >
                        <option value="all">All Trip Types</option>
                        <option value="drop">One-Way Drop Only</option>
                        <option value="return">Round Trip Return</option>
                      </select>
                    </div>

                    {/* Vehicle Filter */}
                    <div>
                      <label className="text-[11px] font-bold text-white mb-1 block">Vehicle Category:</label>
                      <select
                        value={carFilter}
                        onChange={(e) => setCarFilter(e.target.value as any)}
                        className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                      >
                        <option value="all">All Vehicles</option>
                        <option value="sedan-dzire">Swift Dzire (Sedan)</option>
                        <option value="suv-ertiga">Maruti Ertiga (SUV)</option>
                        <option value="luxury-innova">Innova Crysta (Premium SUV)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-300">
                    <span>
                      Showing <strong className="text-white font-black">{filteredPointToPoint.length}</strong> official route tariffs
                    </span>
                    <span className="text-white font-semibold">
                      Tip: Use the search box above to isolate any destination fare instantly.
                    </span>
                  </div>
                </div>

                {/* Fares Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0B192C] text-white border-b border-black font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4">Route (Source → Destination)</th>
                        <th className="py-3 px-4">Trip Type</th>
                        <th className="py-3 px-4">Vehicle Model</th>
                        <th className="py-3 px-4">Total Fare (Base + DA)</th>
                        <th className="py-3 px-4">Included Distance</th>
                        <th className="py-3 px-4">Extra Rate / Km</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredPointToPoint.map((fare) => {
                        const carLabel = 
                          fare.standardizedCarId === 'sedan-dzire'
                            ? 'Swift Dzire'
                            : fare.standardizedCarId === 'suv-ertiga'
                            ? 'Maruti Ertiga'
                            : 'Innova Crysta';

                        const da = fare.driverAllowance || 300;
                        const total = fare.packageRate + da;

                        return (
                          <tr key={fare.fareId} className="hover:bg-slate-100 transition">
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-black flex items-center">
                                <span>{fare.sourceCity}</span>
                                <ArrowRight className="w-3.5 h-3.5 mx-1.5 text-black inline" />
                                <span>{fare.destinationCity}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 font-mono font-bold">
                                Tariff #{fare.fareId}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                fare.tripType === 'drop'
                                  ? 'bg-[#0B192C] text-white'
                                  : 'bg-black text-white'
                              }`}>
                                {fare.tripType === 'drop' ? 'One-Way Drop' : 'Round Trip'}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-bold text-black">{carLabel}</div>
                              <div className="text-[11px] text-slate-600">{fare.carCategory}</div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="text-base font-black text-black">
                                ₹{total.toLocaleString('en-IN')}
                              </div>
                              <div className="text-[10px] text-slate-600 font-semibold">
                                Base ₹{fare.packageRate.toLocaleString('en-IN')} + ₹{da} DA
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-black font-semibold">
                              {fare.includedKms} km included
                            </td>

                            <td className="py-3.5 px-4 text-black font-medium">
                              ₹{fare.extraKmRate} / km
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleBookOption(fare.sourceCity, fare.destinationCity, fare.standardizedCarId, fare.tripType === 'drop' ? 'oneway' : 'roundtrip')}
                                className="bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-3.5 py-1.5 rounded-lg border border-white/20 transition active:scale-95 shadow-xs cursor-pointer"
                              >
                                Book Now
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Vadodara Local Rentals */}
            {activeTab === 'local' && (
              <div className="bg-white rounded-2xl border-2 border-[#0B192C] shadow-xl overflow-hidden">
                <div className="p-4 sm:p-6 bg-[#0B192C] text-white flex flex-wrap items-center justify-between gap-2 border-b border-black">
                  <div>
                    <h3 className="text-lg font-black text-white">
                      Vadodara City Hourly Local Rentals
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Fixed packages from 1 hour to 12 hours. Driver allowance included. Extra hour rate: ₹300.
                    </p>
                  </div>
                  <div className="text-xs text-white bg-black px-3 py-1.5 rounded-lg border border-white/20">
                    Doorstep Pickup Anywhere in Vadodara (Alkapuri, Gotri, Manjalpur, Karelibaug, etc.)
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0B192C] text-white border-b border-black font-bold uppercase text-[11px]">
                        <th className="py-3 px-4">Package Duration & Km</th>
                        <th className="py-3 px-4">Swift Dzire (Sedan)</th>
                        <th className="py-3 px-4">Maruti Ertiga (SUV)</th>
                        <th className="py-3 px-4">Innova Crysta (Premium)</th>
                        <th className="py-3 px-4 text-right">Instant Booking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {CSV_LOCAL_RENTALS.map((pkg) => (
                        <tr key={pkg.hours} className="hover:bg-slate-100 transition">
                          <td className="py-3.5 px-4 font-black text-black">
                            <div className="text-sm font-black text-black">{pkg.hours} Hours / {pkg.kms} Kms</div>
                            <div className="text-[10px] font-normal text-slate-600">
                              Extra KM: ₹{pkg.extraKmRateDzire} (Dzire) | ₹{pkg.extraKmRateErtiga} (Ertiga) | ₹{pkg.extraKmRateCrysta} (Crysta)
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <span className="text-base font-black text-black">₹{pkg.dzirePrice}</span>
                                <div className="text-[10px] text-slate-600 font-medium">4 Seater • AC</div>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleBookOption(
                                    'Vadodara',
                                    `Vadodara Local (${pkg.hours} Hr / ${pkg.kms} Km)`,
                                    'sedan-dzire',
                                    'oneway',
                                    'local',
                                    pkg.hours
                                  )
                                }
                                className="bg-[#0B192C] hover:bg-black text-white font-bold text-[11px] px-2.5 py-1.5 rounded-lg border border-white/20 transition active:scale-95 cursor-pointer shadow-xs"
                                title={`Book Swift Dzire for ${pkg.hours} Hr package`}
                              >
                                Book Dzire
                              </button>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <span className="text-base font-black text-black">₹{pkg.ertigaPrice}</span>
                                <div className="text-[10px] text-slate-600 font-medium">6+1 Seater • AC</div>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleBookOption(
                                    'Vadodara',
                                    `Vadodara Local (${pkg.hours} Hr / ${pkg.kms} Km)`,
                                    'suv-ertiga',
                                    'oneway',
                                    'local',
                                    pkg.hours
                                  )
                                }
                                className="bg-[#0B192C] hover:bg-black text-white font-bold text-[11px] px-2.5 py-1.5 rounded-lg border border-white/20 transition active:scale-95 cursor-pointer shadow-xs"
                                title={`Book Ertiga for ${pkg.hours} Hr package`}
                              >
                                Book Ertiga
                              </button>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <span className="text-base font-black text-black">₹{pkg.crystaPrice}</span>
                                <div className="text-[10px] text-slate-600 font-medium">7 Seater • VIP</div>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleBookOption(
                                    'Vadodara',
                                    `Vadodara Local (${pkg.hours} Hr / ${pkg.kms} Km)`,
                                    'luxury-innova',
                                    'oneway',
                                    'local',
                                    pkg.hours
                                  )
                                }
                                className="bg-[#0B192C] hover:bg-black text-white font-bold text-[11px] px-2.5 py-1.5 rounded-lg border border-white/20 transition active:scale-95 cursor-pointer shadow-xs"
                                title={`Book Crysta for ${pkg.hours} Hr package`}
                              >
                                Book Crysta
                              </button>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleBookOption(
                                    'Vadodara',
                                    `Vadodara Local (${pkg.hours} Hr / ${pkg.kms} Km)`,
                                    'sedan-dzire',
                                    'oneway',
                                    'local',
                                    pkg.hours
                                )
                              }
                              className="bg-black hover:bg-[#0B192C] text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition active:scale-95 cursor-pointer whitespace-nowrap border border-white/20"
                            >
                              Book {pkg.hours} Hr Now
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Airport & Railway Station Fixed Transfers */}
            {activeTab === 'airport' && (
              <div className="bg-white rounded-2xl border-2 border-[#0B192C] shadow-xl overflow-hidden">
                <div className="p-4 sm:p-6 bg-[#0B192C] text-white flex flex-wrap items-center justify-between gap-2 border-b border-black">
                  <div>
                    <h3 className="text-lg font-black text-white">
                      Airport & Railway Station Fixed Transfer Tariffs
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Guaranteed flat tariffs for Vadodara Airport (BDQ), Ahmedabad Airport, and Vadodara Railway Station.
                    </p>
                  </div>
                  <div className="text-xs text-white bg-black px-3 py-1.5 rounded-lg border border-white/20">
                    Zero Flight Delay Waiting Fee • Doorstep Luggage Assist
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0B192C] text-white border-b border-black font-bold uppercase text-[11px]">
                        <th className="py-3 px-4">Transfer Terminal / Station</th>
                        <th className="py-3 px-4">Vehicle Model</th>
                        <th className="py-3 px-4">Included In Fare</th>
                        <th className="py-3 px-4">Base Fare</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {CSV_AIRPORT_STATION_FARES.map((item) => (
                        <tr key={fareIdToKey(item.fareId, item.standardizedCarId)} className="hover:bg-slate-100 transition">
                          <td className="py-3.5 px-4 font-black text-black">
                            {item.name}
                            <div className="text-[10px] font-normal text-slate-600">City: {item.city} (ID: #{item.fareId})</div>
                          </td>

                          <td className="py-3.5 px-4 font-bold text-black">
                            {item.standardizedCarId === 'sedan-dzire'
                              ? 'Swift Dzire'
                              : item.standardizedCarId === 'suv-ertiga'
                              ? 'Maruti Ertiga'
                              : 'Innova Crysta'}
                          </td>

                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {item.includedKm} km • {item.includedMin} mins included (Extra: ₹{item.extraKmRate}/km)
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-lg font-black text-black">₹{item.baseFare}</span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleBookOption(
                                  'Vadodara',
                                  item.name,
                                  item.standardizedCarId,
                                  'oneway',
                                  'airport'
                                )
                              }
                              className="bg-[#0B192C] hover:bg-black text-white font-bold text-xs px-3.5 py-1.5 rounded-lg border border-white/20 transition active:scale-95 cursor-pointer"
                            >
                              Book Transfer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Commercial Fleet Guarantee Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-[#0B192C] border-2 border-black text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center text-white font-black shrink-0">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Commercial Chauffeur Taxi Fleet Guarantee</h4>
              <p className="text-xs text-slate-300">
                All vehicles dispatched by Kabeer Travels are commercial yellow-plate AC taxis: Hatchback, Swift Dzire, Maruti Ertiga, and Toyota Innova Crysta.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs font-black text-white shrink-0 bg-black px-4 py-2 rounded-xl border border-white/20">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Official Verified Fixed Rates</span>
          </div>
        </div>
      </div>
    </section>
  );
};

function fareIdToKey(id: string, car: string) {
  return `${id}-${car}`;
}
