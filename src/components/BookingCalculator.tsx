import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Car,
  Plane,
  Clock,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Search,
  CheckCircle2,
  ChevronRight,
  ArrowLeftRight,
  ArrowUpDown,
  Star,
  ShieldCheck,
  Phone,
  MessageSquare,
  X,
  ArrowLeft,
  Info,
  Navigation,
  Compass,
  Crosshair,
  Building2,
  Sparkles,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { VEHICLES, BUSINESS_INFO, PAYMENT_CONFIG } from '../data/travelData';
import { CSV_LOCAL_RENTALS } from '../data/csvFares';
import { GUJARAT_CITIES, calculateGujaratCabFare, detectSameCityTrip } from '../data/gujaratCities';
import { GoogleMapsRouteCard } from './GoogleMapsRouteCard';
import {
  VADODARA_PICKUP_POINTS,
  ALL_GUJARAT_PICKUP_POINTS,
  GUJARAT_DROP_DESTINATIONS,
  ALL_GUJARAT_DROP_DESTINATIONS,
  getDetailedRoute,
  RouteDetail,
  LocationItem,
} from '../data/locationSuggestions';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';
import { Vehicle, BookingFormData, PaymentOptionType, PaymentInfo, ServiceCategory } from '../types';

interface BookingCalculatorProps {
  selectedVehicleId?: string;
  initialRoute?: {
    pickup?: string;
    drop?: string;
    vehicleId?: string;
    tripType?: 'oneway' | 'roundtrip';
    category?: 'airport' | 'outstation' | 'local';
    hours?: number;
    autoOpenBooking?: boolean;
  } | null;
  onVehicleSelect?: (vehicleId: string) => void;
  onBookingConfirmed: (bookingData: BookingFormData & { estimatedFare: number; id: string }) => void;
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({
  selectedVehicleId = 'sedan-dzire',
  initialRoute,
  onVehicleSelect,
  onBookingConfirmed,
}) => {
  // Service Category Tabs
  const [activeTab, setActiveTab] = useState<
    'outstation_oneway' | 'outstation_roundtrip' | 'airport' | 'local'
  >('outstation_oneway');

  // Input states - initialized without forcing fixed addresses so users can freely type any address
  const [fromCity, setFromCity] = useState('Vadodara');
  const [toCity, setToCity] = useState('Ahmedabad');
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [selectedPincodeFilter, setSelectedPincodeFilter] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('06:00');
  const [returnDate, setReturnDate] = useState(() => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter.toISOString().split('T')[0];
  });

  // Airport & Local Rental Sub-selectors
  const [airportTarget, setAirportTarget] = useState<'ahmedabad' | 'vadodara' | 'mumbai'>('ahmedabad');
  const [localPackageHours, setLocalPackageHours] = useState<number>(8); // 8 hr default

  // Search state - All fares hidden until customer searches!
  const [hasSearched, setHasSearched] = useState(false);

  // Selected vehicle & checkout drawer modal
  const [activeVehicleId, setActiveVehicleId] = useState(selectedVehicleId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);
  const [bookingFareInfo, setBookingFareInfo] = useState<{
    totalFare: number;
    baseFare: number;
    driverAllowance: number;
    summary: string;
    returnKmBilled?: boolean;
    minKmApplied?: boolean;
    isPredefinedFare?: boolean;
    billedDistanceKm?: number;
    actualDistanceKm?: number;
  }>({ totalFare: 1899, baseFare: 1899, driverAllowance: 0, summary: 'Standard Tariff' });

  // Traveler Details Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [paymentOption, setPaymentOption] = useState<PaymentOptionType>('advance_10');
  const [formError, setFormError] = useState('');

  // Google Maps Style Location Selector states
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropDropdown, setShowDropDropdown] = useState(false);
  const [pickupSearchQuery, setPickupSearchQuery] = useState('');
  const [dropSearchQuery, setDropSearchQuery] = useState('');
  const [pickupFilterTab, setPickupFilterTab] = useState<'all' | 'vadodara' | 'cities' | 'villages'>('all');
  const [dropFilterTab, setDropFilterTab] = useState<'all' | 'popular' | 'cities' | 'villages'>('all');
  const [isLocating, setIsLocating] = useState(false);
  const pickupBoxRef = useRef<HTMLDivElement>(null);
  const dropBoxRef = useRef<HTMLDivElement>(null);

  // Dedicated UPI QR Payment Checkout Modal states
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentCheckoutDraft, setPaymentCheckoutDraft] = useState<any | null>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupBoxRef.current && !pickupBoxRef.current.contains(event.target as Node)) {
        setShowPickupDropdown(false);
      }
      if (dropBoxRef.current && !dropBoxRef.current.contains(event.target as Node)) {
        setShowDropDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live Google Maps calibrated Route Details (Distance, Duration, Highway, Coordinates)
  const routeDetail = useMemo<RouteDetail>(() => {
    const effectivePickup = pickupAddress.trim() || fromCity;
    const effectiveDrop = dropAddress.trim() || toCity || 'Ahmedabad';
    return getDetailedRoute(effectivePickup, effectiveDrop);
  }, [pickupAddress, fromCity, dropAddress, toCity]);

  // Detect whether pickup and drop addresses are within the same city (Requirement 1)
  const sameCityTrip = useMemo(() => {
    const effectivePickup = pickupAddress.trim() || fromCity;
    const effectiveDrop = dropAddress.trim() || toCity;
    return detectSameCityTrip(effectivePickup, effectiveDrop, routeDetail.distanceKm);
  }, [pickupAddress, fromCity, dropAddress, toCity, routeDetail.distanceKm]);

  // Automatically restrict activeTab to Local Rental or Airport Transfer for same-city searches
  useEffect(() => {
    if (sameCityTrip.isSameCity) {
      if (activeTab === 'outstation_oneway' || activeTab === 'outstation_roundtrip') {
        if (sameCityTrip.isAirportDrop) {
          setActiveTab('airport');
        } else {
          setActiveTab('local');
        }
      }
    }
  }, [sameCityTrip.isSameCity, sameCityTrip.isAirportDrop, activeTab]);

  // Category navigation tabs: Strictly filtered to Rental & Airport for same-city trips
  const availableCategoryTabs = useMemo(() => {
    if (sameCityTrip.isSameCity) {
      return [
        {
          id: 'local',
          label: 'Local Hourly Rental',
          sub: `${sameCityTrip.cityName} City 2-12 Hrs`,
          icon: Clock,
        },
        {
          id: 'airport',
          label: 'Local Airport Transfer',
          sub: sameCityTrip.airportName || `${sameCityTrip.cityName} Airport Transfer`,
          icon: Plane,
        },
      ];
    }

    return [
      {
        id: 'outstation_oneway',
        label: 'Outstation One-Way',
        sub: 'Direct Drop',
        icon: Car,
      },
      {
        id: 'outstation_roundtrip',
        label: 'Outstation Round-Trip',
        sub: 'Return Journey Included',
        icon: ArrowLeftRight,
      },
      {
        id: 'airport',
        label: 'Airport Cabs',
        sub: 'BDQ • AMD • BOM',
        icon: Plane,
      },
      {
        id: 'local',
        label: 'Hourly Rentals',
        sub: 'Vadodara City 4-12 Hrs',
        icon: Clock,
      },
    ];
  }, [sameCityTrip]);

  // Filtered pickup points (All Gujarat Cities, Talukas, Villages & Vadodara Localities)
  const filteredPickupPoints = useMemo(() => {
    let list = ALL_GUJARAT_PICKUP_POINTS;
    if (pickupFilterTab === 'vadodara') {
      list = VADODARA_PICKUP_POINTS;
      if (selectedPincodeFilter) {
        list = list.filter((p) => p.pincode === selectedPincodeFilter);
      }
    } else if (pickupFilterTab === 'cities') {
      list = list.filter((p) => p.category === 'city' || p.category === 'airport');
    } else if (pickupFilterTab === 'villages') {
      list = list.filter((p) => p.category === 'locality' || p.category === 'tourist');
    }

    const q = pickupSearchQuery.trim().toLowerCase();
    if (!q) return list.slice(0, 50);
    return list
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          (p.pincode && p.pincode.toLowerCase().includes(q))
      )
      .slice(0, 50);
  }, [pickupSearchQuery, selectedPincodeFilter, pickupFilterTab]);

  // Filtered drop destinations (All Gujarat cities, talukas, villages, pilgrimage & airports)
  const filteredDropDestinations = useMemo(() => {
    let list = ALL_GUJARAT_DROP_DESTINATIONS;
    if (dropFilterTab === 'popular') {
      list = list.filter((d) => d.popular || d.category === 'airport');
    } else if (dropFilterTab === 'cities') {
      list = list.filter((d) => d.category === 'city' || d.category === 'airport');
    } else if (dropFilterTab === 'villages') {
      list = list.filter((d) => d.category === 'locality' || d.category === 'tourist');
    }

    const q = dropSearchQuery.trim().toLowerCase();
    if (!q) return list.slice(0, 50);
    return list
      .filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.subtitle.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q)
      )
      .slice(0, 50);
  }, [dropSearchQuery, dropFilterTab]);

  // GPS Geolocation Auto-Detect
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setFromCity('Vadodara');
      setPickupAddress('Mahabalipuram Society Gate Number 2, Vadodara 390020');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setFromCity('Vadodara');
        setPickupAddress(`Current GPS Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`);
        setShowPickupDropdown(false);
      },
      () => {
        setIsLocating(false);
        setFromCity('Vadodara');
        setPickupAddress('Mahabalipuram Society Gate Number 2, Vadodara 390020');
        setShowPickupDropdown(false);
      },
      { timeout: 8000 }
    );
  };

  // Handle initialRoute changes from props
  useEffect(() => {
    if (initialRoute) {
      if (initialRoute.pickup) {
        setFromCity(initialRoute.pickup);
        setPickupAddress(initialRoute.pickup);
      }
      if (initialRoute.drop) {
        setToCity(initialRoute.drop);
        setDropAddress(initialRoute.drop);
      }
      if (initialRoute.vehicleId) {
        setActiveVehicleId(initialRoute.vehicleId);
        if (onVehicleSelect) onVehicleSelect(initialRoute.vehicleId);
      }
      if (initialRoute.hours) {
        setLocalPackageHours(initialRoute.hours);
      }
      if (initialRoute.category === 'airport') {
        setActiveTab('airport');
      } else if (initialRoute.category === 'local') {
        setActiveTab('local');
      } else if (initialRoute.tripType === 'roundtrip') {
        setActiveTab('outstation_roundtrip');
      } else {
        setActiveTab('outstation_oneway');
      }
      // If user came from a specific route click, show fares
      setHasSearched(true);

      // If clicked "Book Now" from CSV table or local packages, auto-open the booking modal!
      if (initialRoute.autoOpenBooking) {
        const targetVehicleId = initialRoute.vehicleId || 'sedan-dzire';
        const veh = VEHICLES.find((v) => v.id === targetVehicleId) || VEHICLES[1];

        let calculatedFare = 1899;
        let base = 1899;
        let da = 0;
        let summaryText = 'Official Tariff Booking';
        let billedDist = 80;

        if (initialRoute.category === 'local') {
          const hours = initialRoute.hours || 8;
          setLocalPackageHours(hours);
          const pkg = CSV_LOCAL_RENTALS.find((p) => p.hours === hours) || CSV_LOCAL_RENTALS[7];
          billedDist = pkg.kms;
          if (targetVehicleId === 'hatchback-wagonr') {
            calculatedFare = Math.round(pkg.dzirePrice * 0.85);
          } else if (targetVehicleId === 'suv-ertiga') {
            calculatedFare = pkg.ertigaPrice;
          } else if (targetVehicleId === 'luxury-innova') {
            calculatedFare = pkg.crystaPrice;
          } else {
            calculatedFare = pkg.dzirePrice;
          }
          base = calculatedFare;
          da = 0;
          summaryText = `${pkg.hours} Hours / ${pkg.kms} Kms Vadodara Local Package • Driver & Fuel Included`;
          setToCity(`Vadodara Local (${pkg.hours} Hr / ${pkg.kms} Km)`);
          setDropAddress(`Vadodara Local (${pkg.hours} Hr / ${pkg.kms} Km)`);
        } else {
          const calcResult = calculateGujaratCabFare(
            initialRoute.pickup || 'Vadodara',
            initialRoute.drop || 'Ahmedabad',
            targetVehicleId,
            initialRoute.tripType === 'roundtrip' ? 'roundtrip' : 'oneway',
            pickupDate,
            returnDate
          );
          calculatedFare = calcResult.totalFare;
          base = calcResult.baseFare;
          da = calcResult.driverAllowance;
          summaryText = calcResult.breakdownSummary;
          billedDist = calcResult.billedDistanceKm;
        }

        setPickupAddress((prev) => (prev && prev.trim() ? prev : (initialRoute.pickup || 'Vadodara')));
        setBookingVehicle(veh);
        setBookingFareInfo({
          totalFare: calculatedFare,
          baseFare: base,
          driverAllowance: da,
          summary: summaryText,
          billedDistanceKm: billedDist,
          isPredefinedFare: true,
        });
        setFormError('');
        setIsModalOpen(true);
      }
    }
  }, [initialRoute, onVehicleSelect]);

  // Handle selectedVehicleId changes from parent
  useEffect(() => {
    if (selectedVehicleId) {
      setActiveVehicleId(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  // Swap From and To
  const handleSwapCities = () => {
    const tempFrom = fromCity;
    const tempAddr = pickupAddress;
    setFromCity(toCity);
    setPickupAddress(dropAddress);
    setToCity(tempFrom);
    setDropAddress(tempAddr);
  };

  // Popular destination chips
  const POPULAR_DESTINATIONS = [
    { label: 'Vadodara', to: 'Vadodara' },
    { label: 'Ahmedabad', to: 'Ahmedabad' },
    { label: 'Statue of Unity', to: 'Statue of Unity (Kevadia)' },
    { label: 'Surat', to: 'Surat' },
    { label: 'Mumbai', to: 'Mumbai City' },
    { label: 'Pavagadh', to: 'Pavagadh / Halol' },
    { label: 'Bharuch', to: 'Bharuch' },
    { label: 'Dahej', to: 'Dahej' },
    { label: 'Rajkot', to: 'Rajkot' },
    { label: 'Somnath', to: 'Somnath (Veraval)' },
    { label: 'Dwarka', to: 'Dwarka' },
  ];

  // Compute fares for all 4 vehicle options based on active tab and inputs
  const calculatedVehicleFares = useMemo(() => {
    const isRoundTrip = activeTab === 'outstation_roundtrip';

    if (activeTab === 'outstation_oneway' || activeTab === 'outstation_roundtrip') {
      const tripType = isRoundTrip ? 'roundtrip' : 'oneway';

      return VEHICLES.map((vehicle) => {
        const effectivePickup = fromCity || 'Vadodara';
        const effectiveDrop = toCity || 'Ahmedabad';
        const result = calculateGujaratCabFare(
          vehicle.id,
          effectivePickup,
          effectiveDrop,
          tripType,
          pickupDate,
          returnDate,
          routeDetail.distanceKm
        );
        return {
          vehicle,
          fare: result.totalFare,
          baseFare: result.baseFare,
          driverAllowance: result.driverAllowance,
          distance: result.billedDistanceKm,
          actualDistance: result.oneWayDistanceKm,
          minKmApplied: result.minKmApplied,
          days: result.days,
          summary: result.breakdownSummary,
          oneWayNotAvailableInCsv: result.oneWayNotAvailableInCsv,
          roundTripFallbackNotice: result.roundTripFallbackNotice,
          returnKmBilled: result.returnKmBilled,
          isPredefinedFare: result.isPredefinedFare,
        };
      });
    } else if (activeTab === 'airport') {
      return VEHICLES.map((vehicle) => {
        let baseFare = vehicle.airportAhmedabadFlat;
        let dist = 115;
        let label = 'Ahmedabad Airport (AMD)';

        if (airportTarget === 'vadodara') {
          baseFare = vehicle.airportVadodaraFlat;
          dist = 15;
          label = 'Vadodara Airport (BDQ)';
        } else if (airportTarget === 'mumbai') {
          if (vehicle.id === 'hatchback-wagonr') baseFare = 5200;
          else if (vehicle.id === 'suv-ertiga') baseFare = 7800;
          else if (vehicle.id === 'luxury-innova') baseFare = 11500;
          else baseFare = 6200;
          dist = 440;
          label = 'Mumbai Airport (BOM)';
        }

        return {
          vehicle,
          fare: baseFare,
          baseFare: baseFare,
          driverAllowance: 0,
          distance: dist,
          actualDistance: dist,
          minKmApplied: false,
          days: 1,
          summary: `${label} Transfer • Fuel & Driver Allowance Included`,
          returnKmBilled: false,
          isPredefinedFare: true,
        };
      });
    } else {
      // Local hourly rentals
      const pkg = CSV_LOCAL_RENTALS.find((p) => p.hours === localPackageHours) || CSV_LOCAL_RENTALS[7];
      return VEHICLES.map((vehicle) => {
        let price = pkg.dzirePrice;
        if (vehicle.id === 'hatchback-wagonr') {
          price = Math.round(pkg.dzirePrice * 0.85);
        } else if (vehicle.id === 'suv-ertiga') {
          price = pkg.ertigaPrice;
        } else if (vehicle.id === 'luxury-innova') {
          price = pkg.crystaPrice;
        }

        return {
          vehicle,
          fare: price,
          baseFare: price,
          driverAllowance: 0,
          distance: pkg.kms,
          actualDistance: pkg.kms,
          minKmApplied: false,
          days: 1,
          summary: `${localPackageHours} Hours / ${pkg.kms} Kms City Package • Driver Allowance Included`,
          returnKmBilled: false,
          isPredefinedFare: true,
        };
      });
    }
  }, [activeTab, fromCity, toCity, pickupAddress, dropAddress, pickupDate, returnDate, airportTarget, localPackageHours]);

  // Handle Search Click
  const handleSearchCabs = () => {
    setHasSearched(true);
    setTimeout(() => {
      const el = document.getElementById('cabs-results-list');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Open Booking Drawer Modal
  const handleOpenBooking = (
    vehicle: Vehicle,
    fareInfo: {
      totalFare: number;
      baseFare: number;
      driverAllowance: number;
      summary: string;
      returnKmBilled?: boolean;
      minKmApplied?: boolean;
      isPredefinedFare?: boolean;
      billedDistanceKm?: number;
      actualDistanceKm?: number;
    }
  ) => {
    setBookingVehicle(vehicle);
    setBookingFareInfo(fareInfo);
    setActiveVehicleId(vehicle.id);
    if (onVehicleSelect) onVehicleSelect(vehicle.id);
    setFormError('');
    setIsModalOpen(true);
  };

  // Submit Booking Form
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!pickupAddress.trim()) {
      setFormError('Please enter your pickup address');
      return;
    }

    const bookingId = `KT-${Math.floor(100000 + Math.random() * 900000)}`;
    const isRound = activeTab === 'outstation_roundtrip';
    const finalCategory: ServiceCategory =
      activeTab === 'airport' ? 'airport' : activeTab === 'local' ? 'local' : 'outstation';

    let finalDrop = toCity;
    if (activeTab === 'airport') {
      finalDrop =
        airportTarget === 'vadodara'
          ? 'Vadodara Airport (BDQ)'
          : airportTarget === 'ahmedabad'
          ? 'Ahmedabad Airport (AMD)'
          : 'Mumbai Airport (BOM)';
    } else if (activeTab === 'local') {
      finalDrop = `Vadodara City Rental (${localPackageHours} Hours / ${localPackageHours * 10} Kms)`;
    }

    const formData: BookingFormData = {
      serviceCategory: finalCategory,
      tripType: isRound ? 'roundtrip' : 'oneway',
      pickupLocation: `${fromCity} (${pickupAddress})`,
      dropLocation: finalDrop,
      pickupDate,
      pickupTime,
      returnDate: isRound ? returnDate : undefined,
      vehicleId: bookingVehicle?.id || 'sedan-dzire',
      passengerCount: bookingVehicle?.passengers || 4,
      customerName,
      customerPhone: cleanPhone,
      flightTrainNumber: flightNumber,
      specialInstructions: specialNote,
      localPackageHours: activeTab === 'local' ? localPackageHours : undefined,
    };

    // If online UPI payment chosen, open UPI QR Verification modal so user actually verifies UTR payment
    if (paymentOption === 'advance_10' || paymentOption === 'advance_20' || paymentOption === 'full_online') {
      setPaymentCheckoutDraft({
        ...formData,
        id: bookingId,
        estimatedFare: bookingFareInfo.totalFare,
      });
      setIsModalOpen(false);
      setIsPaymentModalOpen(true);
      return;
    }

    // Honest Pay in Cab status - 0 rupees paid until ride starts
    const paymentRecord: PaymentInfo = {
      option: 'pay_driver',
      status: 'Pending (Pay in Cab)',
      totalFare: bookingFareInfo.totalFare,
      discount: 0,
      amountPaid: 0,
      amountDue: bookingFareInfo.totalFare,
      paymentTimestamp: new Date().toISOString(),
    };

    setIsModalOpen(false);

    onBookingConfirmed({
      ...formData,
      estimatedFare: bookingFareInfo.totalFare,
      id: bookingId,
      payment: paymentRecord,
    });
  };

  return (
    <div id="calculator" className="w-full">
      {/* Search Bar & Booking Panel Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-amber-200 overflow-hidden">
        
        {/* Navigation Category Tabs - Filtered strictly for same-city searches */}
        <div className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 p-2.5 sm:p-3.5 border-b border-amber-200">
          {sameCityTrip.isSameCity && (
            <div className="mb-2 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-between shadow-xs border border-amber-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Same-City Ride ({sameCityTrip.cityName}) — Showing Local Rental & Airport Transfer Fares Only</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider bg-slate-950 text-amber-300 px-2 py-0.5 rounded-md font-bold shrink-0 ml-2">
                Intra-City
              </span>
            </div>
          )}

          <div className={`grid ${sameCityTrip.isSameCity ? 'grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-2 sm:grid-cols-4'} gap-2`}>
            {availableCategoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (tab.id === 'airport') {
                      if (sameCityTrip.isSameCity && sameCityTrip.cityName === 'Vadodara') {
                        setAirportTarget('vadodara');
                        setToCity('Vadodara Airport (BDQ)');
                      } else {
                        setToCity('Ahmedabad Airport (AMD)');
                      }
                    } else if (tab.id === 'outstation_oneway' || tab.id === 'outstation_roundtrip') {
                      if (toCity.includes('Airport') || toCity.includes('City Rental')) {
                        setToCity('Ahmedabad');
                      }
                    }
                  }}
                  className={`flex items-center space-x-2.5 p-3 rounded-2xl text-left transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md border-2 border-amber-500 scale-[1.01]'
                      : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 shadow-xs'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl ${
                      isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-black leading-tight">{tab.label}</div>
                    <div
                      className={`text-[10px] sm:text-[11px] font-medium leading-tight mt-0.5 ${
                        isActive ? 'text-slate-950/80' : 'text-slate-500'
                      }`}
                    >
                      {tab.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Inputs Container */}
        <div className="p-5 sm:p-7 bg-gradient-to-b from-white to-slate-50">
          
          {/* Airport Sub-Selector if Airport Tab Active */}
          {activeTab === 'airport' && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Plane className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-black uppercase text-amber-950">Select Airport Route:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'ahmedabad', label: 'Ahmedabad Airport (AMD)' },
                  { id: 'vadodara', label: 'Vadodara Airport (BDQ)' },
                  { id: 'mumbai', label: 'Mumbai Airport (BOM)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setAirportTarget(item.id as any);
                      setToCity(item.label);
                    }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
                      airportTarget === item.id
                        ? 'bg-slate-950 text-amber-400 border-slate-950 font-extrabold shadow-xs'
                        : 'bg-white text-slate-700 border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Local Rental Hours Selector if Local Tab Active (1 to 12 Hours from CSV Tariff) */}
          {activeTab === 'local' && (
            <div className="mb-5 p-4 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-2.5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-black uppercase text-amber-950">
                    Select Vadodara Local Package (1h to 12h CSV Fares):
                  </span>
                </div>
                <span className="text-xs font-black text-amber-950 bg-amber-200/90 px-3 py-0.5 rounded-full border border-amber-400 shadow-xs">
                  Active: {localPackageHours} Hours • {localPackageHours * 10} Kms included
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5">
                {CSV_LOCAL_RENTALS.map((pkg) => (
                  <button
                    key={pkg.hours}
                    type="button"
                    onClick={() => setLocalPackageHours(pkg.hours)}
                    className={`py-2 px-1.5 text-center rounded-xl border transition cursor-pointer ${
                      localPackageHours === pkg.hours
                        ? 'bg-black text-amber-400 border-black font-extrabold shadow-md ring-2 ring-amber-400'
                        : 'bg-white text-slate-800 border-amber-200 hover:border-amber-400 hover:bg-amber-100/50'
                    }`}
                  >
                    <div className="text-xs font-black">{pkg.hours} Hr</div>
                    <div className="text-[10px] text-slate-500 font-medium">{pkg.kms} Km</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Point-to-Point Gujarat Route & Pure Typing Address Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-4 sm:p-5 mb-4 relative">
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-black text-slate-800 tracking-wide uppercase">
                  Route & Address (Pure Typing - Type Any Location Freely)
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-black bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
                <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                <span>{routeDetail.distanceKm} KM Route • {routeDetail.durationText}</span>
              </div>
            </div>

            {/* Dual-Location Input with Vertical Connecting Rail */}
            <div className="flex items-stretch gap-3">
              {/* Left Rail (Route visual line with Pickup Green Dot & Drop Amber Square) */}
              <div className="flex flex-col items-center justify-between py-3.5 shrink-0 select-none">
                <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100 flex items-center justify-center shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div className="w-0.5 flex-1 my-1.5 bg-slate-300 border-l border-dashed border-slate-400 min-h-[52px]" />
                <div className="w-4 h-4 rounded-sm bg-amber-500 ring-4 ring-amber-100 flex items-center justify-center shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-xs bg-black" />
                </div>
              </div>

              {/* Right Column: Pure Typing Pickup Field, Swap Bar, Pure Typing Drop Field */}
              <div className="flex-1 min-w-0 space-y-3">
                {/* 1. PICKUP ADDRESS INPUT (PURE TYPING) */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                      <span>PICKUP ADDRESS (ENTER ANY LOCATION / SOCIETY / AREA)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={isLocating}
                      className="text-[10px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-0.5 rounded-full flex items-center space-x-1 transition active:scale-95 cursor-pointer"
                      title="Auto-detect current GPS location"
                    >
                      <Crosshair className={`w-3 h-3 text-amber-700 ${isLocating ? 'animate-spin' : ''}`} />
                      <span>{isLocating ? 'Detecting GPS...' : '⌖ Use Current GPS'}</span>
                    </button>
                  </div>

                  <div className="relative flex items-center bg-slate-50 hover:bg-slate-100/80 focus-within:bg-white rounded-2xl border-2 border-slate-200 focus-within:border-amber-500 transition px-3.5 py-2.5 shadow-xs">
                    <input
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPickupAddress(val);
                        setFromCity(val);
                      }}
                      className="w-full text-sm sm:text-base font-black text-slate-900 bg-transparent focus:outline-none placeholder-slate-400 pr-20"
                      placeholder="Type pickup address (e.g. Alkapuri, Gotri, Sayajigunj, Vadodara, or any area)..."
                    />
                    <div className="absolute right-2.5 flex items-center space-x-1.5">
                      {pickupAddress.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setPickupAddress('');
                            setFromCity('');
                          }}
                          className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition cursor-pointer"
                          title="Clear pickup address"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                      <span className="text-[10px] font-black bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 max-w-[120px] truncate">
                        {fromCity || 'Vadodara'}
                      </span>
                    </div>
                  </div>

                  {/* Pickup Quick-fill chips */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-[10px] font-bold text-slate-400">Quick Fill:</span>
                    {['Vadodara', 'Ahmedabad', 'Surat', 'Mumbai'].map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setFromCity(city);
                          setPickupAddress(city);
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-slate-900 font-bold text-[10px] border border-slate-200 transition cursor-pointer"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating Center Swap Action Bar */}
                <div className="relative py-0.5 flex items-center justify-between">
                  <div className="h-px bg-slate-200 flex-1" />
                  <button
                    type="button"
                    onClick={handleSwapCities}
                    title="Swap Pickup and Drop Locations"
                    className="mx-3 px-3.5 py-1 rounded-full bg-slate-900 hover:bg-black text-amber-400 hover:text-amber-300 border border-amber-400/40 shadow-xs flex items-center space-x-1.5 text-xs font-black transition active:scale-95 cursor-pointer shrink-0"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px]">Swap Direction</span>
                  </button>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                {/* 2. DROP DESTINATION INPUT (PURE TYPING) */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1" />
                      <span>DROP DESTINATION / ADDRESS (ENTER ANY CITY OR ATTRACTION)</span>
                    </label>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      All Gujarat & Interstate
                    </span>
                  </div>

                  <div className="relative flex items-center bg-slate-50 hover:bg-slate-100/80 focus-within:bg-white rounded-2xl border-2 border-slate-200 focus-within:border-emerald-500 transition px-3.5 py-2.5 shadow-xs">
                    <input
                      type="text"
                      value={dropAddress}
                      onChange={(e) => {
                        const val = e.target.value;
                        setToCity(val);
                        setDropAddress(val);
                      }}
                      className="w-full text-sm sm:text-base font-black text-slate-900 bg-transparent focus:outline-none placeholder-slate-400 pr-24"
                      placeholder="Type destination (e.g. Vadodara, Ahmedabad, Statue of Unity, Surat, Mumbai)..."
                    />
                    <div className="absolute right-2.5 flex items-center space-x-1.5">
                      {dropAddress.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setDropAddress('');
                            setToCity('');
                          }}
                          className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition cursor-pointer"
                          title="Clear drop address"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                      <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md shadow-xs">
                        {routeDetail.distanceKm} KM
                      </span>
                    </div>
                  </div>

                  {/* Drop Destination Quick-Tap Chips (Includes Vadodara!) */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400">Popular Destinations:</span>
                    {POPULAR_DESTINATIONS.map((dest) => (
                      <button
                        key={dest.label}
                        type="button"
                        onClick={() => {
                          setToCity(dest.to);
                          setDropAddress(dest.to);
                          if (activeTab === 'airport' || activeTab === 'local') {
                            setActiveTab('outstation_oneway');
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                          toCity.toLowerCase() === dest.to.toLowerCase() ||
                          dropAddress.toLowerCase() === dest.to.toLowerCase()
                            ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-xs'
                            : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        {dest.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Date & Time Scheduling Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 mb-5">
            <div
              className={`${
                activeTab === 'outstation_roundtrip' ? 'md:col-span-6' : 'md:col-span-12'
              } p-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 transition shadow-xs flex flex-wrap items-center justify-between gap-3`}
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                  <Calendar className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">DEPARTURE SCHEDULE</span>
                  <span className="text-xs font-bold text-slate-800">Select Date & Chauffeur Time</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="text-xs sm:text-sm font-black text-slate-900 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="text-xs sm:text-sm font-black text-slate-900 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                />
              </div>
            </div>

            {activeTab === 'outstation_roundtrip' && (
              <div className="md:col-span-6 p-3.5 rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-500 transition shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                    <Clock className="w-4 h-4 text-amber-800" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">RETURN DATE</span>
                    <span className="text-xs font-bold text-slate-800">Roundtrip Return Journey</span>
                  </div>
                </div>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="text-xs sm:text-sm font-black text-slate-900 bg-amber-50/50 border border-amber-300 px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Quick Popular Destination Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[11px] font-black uppercase text-slate-500 flex items-center mr-1">
              <Search className="w-3 h-3 mr-1 text-amber-500" />
              Popular Destinations:
            </span>
            {POPULAR_DESTINATIONS.map((chip) => {
              const isActive = toCity.toLowerCase().includes(chip.to.toLowerCase());
              return (
                <button
                  key={chip.to}
                  type="button"
                  onClick={() => {
                    setFromCity('Vadodara');
                    setToCity(chip.to);
                    setDropAddress(chip.to);
                    setDropSearchQuery(chip.to);
                    if (activeTab === 'airport' || activeTab === 'local') {
                      setActiveTab('outstation_oneway');
                    }
                  }}
                  className={`text-xs font-bold px-3 py-1 rounded-full border transition ${
                    isActive
                      ? 'bg-slate-950 text-amber-400 border-slate-950 font-extrabold shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-amber-400 hover:text-black'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Big Search Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSearchCabs}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition transform hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <Search className="w-5 h-5 text-slate-950 stroke-[3]" />
              <span>SEARCH AVAILABLE CABS</span>
              <ChevronRight className="w-5 h-5 text-slate-950 stroke-[3]" />
            </button>
          </div>

          {/* Information hint when not searched yet */}
          {!hasSearched && (
            <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center space-x-3 text-slate-700 text-xs">
              <Info className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                Enter your pickup & destination city above, then click <strong>Search Available Cabs</strong> to check instant transparent fares with Hatchback, Sedan, SUV, and Luxury Innova options.
              </span>
            </div>
          )}
        </div>

        {/* RESULTS SECTION: Shown only after customer searches */}
        {hasSearched && (
          <div id="cabs-results-list" className="p-5 sm:p-7 bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20 border-t border-amber-200">
            
            {/* Same-City Ride Detected Banner (Requirement 1) */}
            {sameCityTrip.isSameCity && (
              <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-md border-2 border-amber-600 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-2xl bg-slate-950 text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-full">
                        Same-City Intra-City Ride ({sameCityTrip.cityName})
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-black text-slate-950 mt-1">
                      Both Pickup and Drop are within {sameCityTrip.cityName}! Only Local Hourly Rental Packages and Local Airport Transfers apply.
                    </p>
                    <p className="text-[11px] text-slate-900 font-medium">
                      Highway outstation kilometer rates are not charged for intra-city local travel.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 shrink-0 self-start md:self-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('local')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                      activeTab === 'local'
                        ? 'bg-slate-950 text-amber-400 shadow-md scale-105 border border-amber-300'
                        : 'bg-white/90 text-slate-900 hover:bg-white hover:shadow-xs'
                    }`}
                  >
                    🕒 City Hourly Rental
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('airport');
                      if (sameCityTrip.cityName === 'Vadodara') {
                        setAirportTarget('vadodara');
                        setToCity('Vadodara Airport (BDQ)');
                      } else {
                        setAirportTarget('ahmedabad');
                        setToCity('Ahmedabad Airport (AMD)');
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                      activeTab === 'airport'
                        ? 'bg-slate-950 text-amber-400 shadow-md scale-105 border border-amber-300'
                        : 'bg-white/90 text-slate-900 hover:bg-white hover:shadow-xs'
                    }`}
                  >
                    ✈️ Airport Transfer
                  </button>
                </div>
              </div>
            )}

            {/* Header with Back / Modify Search Option & Trip Type Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-white border border-amber-200 shadow-xs">
              <div className="flex items-center space-x-3">
                {/* Back Option */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-slate-950 text-xs font-black flex items-center space-x-1 border border-slate-300 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Modify Search</span>
                </button>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {fromCity} ➔ {toCity}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {sameCityTrip.isSameCity
                      ? activeTab === 'airport'
                        ? 'Local Airport Transfer Service'
                        : `${sameCityTrip.cityName} Local Hourly Rental Package`
                      : activeTab === 'outstation_roundtrip'
                      ? 'Round-Trip (Return Included • Min 300 Km/day Avg)'
                      : activeTab === 'airport'
                      ? 'Airport Transfer'
                      : activeTab === 'local'
                      ? 'Vadodara Local Rental'
                      : 'One-Way Direct Drop'}{' '}
                    • Commercial Clean AC Taxis
                  </p>
                </div>
              </div>

              {/* Quick Toggle for Outstation trips (only if NOT same city) */}
              {!sameCityTrip.isSameCity && (activeTab === 'outstation_oneway' || activeTab === 'outstation_roundtrip') && (
                <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-300">
                  <button
                    type="button"
                    onClick={() => setActiveTab('outstation_oneway')}
                    className={`text-xs font-black px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                      activeTab === 'outstation_oneway'
                        ? 'bg-[#0B192C] text-white shadow-xs'
                        : 'text-black hover:text-black'
                    }`}
                  >
                    One-Way Drop
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('outstation_roundtrip')}
                    className={`text-xs font-black px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                      activeTab === 'outstation_roundtrip'
                        ? 'bg-[#0B192C] text-white shadow-xs'
                        : 'text-black hover:text-black'
                    }`}
                  >
                    Round Trip (Return)
                  </button>
                </div>
              )}
            </div>

            {/* Outstation Round Trip Policy Notice */}
            {activeTab === 'outstation_roundtrip' && !sameCityTrip.isSameCity && (
              <div className="mb-5 p-3.5 rounded-2xl bg-white border-2 border-black text-xs text-black flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="font-black">Standard Gujarat Round-Trip Outstation Rule:</span> Minimum 300 km per day billing average. Driver allowance is ₹300 per day. All total fares below already include the complete base fare and driver allowance!
                </div>
              </div>
            )}

            {/* Google Maps Route & Perfect KM Distance Card */}
            <div className="mb-6">
              <GoogleMapsRouteCard
                route={routeDetail}
                tripType={activeTab === 'outstation_roundtrip' ? 'roundtrip' : 'oneway'}
                customPickupAddress={pickupAddress}
                customDropAddress={dropAddress}
              />
            </div>

            {/* Notice if One-way route is > 150 km and return km is counted */}
            {activeTab === 'outstation_oneway' && !sameCityTrip.isSameCity && calculatedVehicleFares.some((item) => item.returnKmBilled) && (
              <div className="mb-5 p-4 rounded-2xl bg-white border-2 border-[#0B192C] text-xs text-black flex items-start space-x-3 shadow-xs">
                <AlertCircle className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <div className="font-black text-sm text-black mb-0.5 flex flex-wrap items-center gap-2">
                    <span>One-Way Destination Exceeds 150 Km (Unlisted in CSV Tariff)</span>
                    <span className="text-[10px] font-extrabold bg-[#0B192C] text-white px-2.5 py-0.5 rounded-full border border-black">
                      Return Kilometer Running Included
                    </span>
                  </div>
                  <p className="text-black leading-relaxed mt-1">
                    For one-way trip to <strong>{toCity} ({routeDetail.distanceKm} Km)</strong>, as this destination is not in the official CSV tariff and distance exceeds 150 km, taxi tariff transparently includes empty cab return running (<strong>{routeDetail.distanceKm} Km × 2 = {routeDetail.distanceKm * 2} Km</strong>) plus <strong>₹300 Driver Allowance</strong> to facilitate cab return. Toll, State Tax & Parking are extra as per actual receipts.
                  </p>
                </div>
              </div>
            )}

            {/* Notice if One-way route is <= 150 km and not in official CSV tariff (Min 300 km rule) */}
            {activeTab === 'outstation_oneway' && !sameCityTrip.isSameCity && calculatedVehicleFares.some((item) => item.oneWayNotAvailableInCsv && !item.returnKmBilled && item.minKmApplied) && (
              <div className="mb-5 p-4 rounded-2xl bg-white border-2 border-black text-xs text-black flex items-start space-x-3 shadow-xs">
                <AlertCircle className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <div className="font-black text-sm text-black mb-0.5 flex flex-wrap items-center gap-2">
                    <span>One-Way Drop Under 150 Km (Unlisted in CSV Tariff)</span>
                    <span className="text-[10px] font-extrabold bg-slate-100 text-black px-2 py-0.5 rounded-full border border-black">
                      Min 300 Km Outstation Tariff Applied
                    </span>
                  </div>
                  <p className="text-black leading-relaxed mt-1">
                    For outstation one-way route <strong>{fromCity} ➔ {toCity} ({routeDetail.distanceKm} Km)</strong>, this destination is not listed with a fixed flat package in the official CSV tariff. For destinations under 150 km, the standard Gujarat outstation rule applies: <strong>Minimum 300 Km billing</strong> (300 Km @ per km rate) plus <strong>₹300 Driver Allowance</strong> to cover cab mobilization. Toll, State Tax & Parking are extra as per actual receipts.
                  </p>
                </div>
              </div>
            )}

            {/* 4 Available Vehicle Cards (Hatchback, Sedan, SUV, Luxury SUV) with White Taxi Pictures */}
            <div className="space-y-4">
              {calculatedVehicleFares.map((item) => {
                const {
                  vehicle,
                  fare,
                  baseFare,
                  driverAllowance,
                  distance,
                  actualDistance,
                  summary,
                  minKmApplied,
                  oneWayNotAvailableInCsv,
                  returnKmBilled,
                } = item;
                const isSelected = activeVehicleId === vehicle.id;

                return (
                  <div
                    key={vehicle.id}
                    className={`p-5 rounded-3xl bg-white border-2 transition-all shadow-sm hover:shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                      isSelected ? 'border-[#0B192C] ring-2 ring-[#0B192C]/20' : 'border-slate-300 hover:border-black'
                    }`}
                  >
                    {/* Vehicle Identity & Real White Taxi Photo */}
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-2xl bg-slate-100 overflow-hidden border-2 border-black shadow-xs shrink-0">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#0B192C] text-white border border-black">
                            {vehicle.category}
                          </span>
                          {(activeTab === 'outstation_oneway' || (item as any).tripType === 'oneway') && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-black border border-black flex items-center">
                              ✓ Toll Included
                            </span>
                          )}
                          {item.isPredefinedFare && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-black border border-black">
                              ✓ Official CSV Tariff
                            </span>
                          )}
                          {returnKmBilled && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-black text-white border border-black">
                              Return Km Counted ({distance} Km)
                            </span>
                          )}
                          {minKmApplied && activeTab === 'outstation_oneway' && !item.isPredefinedFare && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-black border border-black">
                              Min 300 Km Applied (Under 150 Km)
                            </span>
                          )}
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-black text-white flex items-center border border-black">
                            <Star className="w-3 h-3 fill-white text-white mr-1" />
                            4.9
                          </span>
                          <span className="text-[11px] font-bold text-black bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300">
                            ✓ Free Cancellation
                          </span>
                        </div>

                        <h4 className="text-lg sm:text-xl font-black text-black">
                          {vehicle.name}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          {vehicle.models}
                        </p>

                        {/* Specs pills */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-black font-semibold">
                          <span className="flex items-center">
                            <Users className="w-3.5 h-3.5 mr-1 text-black" />
                            {vehicle.passengers} Seats
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-3.5 h-3.5 mr-1 text-black" />
                            {vehicle.luggage} Luggage
                          </span>
                          <span className="flex items-center text-black font-bold">
                            ✓ AC Chilled
                          </span>
                          <span className="flex items-center text-slate-700 font-medium">
                            • {actualDistance || distance} km trip {returnKmBilled ? `(${distance} km billed)` : 'coverage'}
                          </span>
                        </div>

                        {/* Pricing details / breakdown summary */}
                        <div className="mt-2 text-[11px] text-slate-600">
                          {summary}
                        </div>
                      </div>
                    </div>

                    {/* Transparent Total Fare with Driver Allowance */}
                    <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200 gap-3">
                      <div className="text-left lg:text-right space-y-1">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                          Total Fare Amount
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-black">
                          ₹{fare.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-black font-bold">
                          {driverAllowance > 0
                            ? `Base ₹${baseFare.toLocaleString('en-IN')} + ₹${driverAllowance} Driver Allowance`
                            : 'Driver Allowance & Fuel Included'}
                        </div>

                        {/* Badges strictly complying with CSV availability */}
                        {item.isPredefinedFare ? (
                          <div className="flex flex-col items-start lg:items-end gap-1 pt-1">
                            <span className="text-[10px] text-white bg-[#0B192C] font-bold px-2 py-0.5 rounded border border-black">
                              ✓ Official CSV Tariff Route
                            </span>
                            {(activeTab === 'outstation_oneway' || (item as any).tripType === 'oneway') ? (
                              <span className="text-[10px] text-black font-extrabold bg-slate-100 px-2 py-0.5 rounded border border-black">
                                ✓ Toll Tax Included in Fare
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                                Toll & Parking extra as per receipt
                              </span>
                            )}
                          </div>
                        ) : (
                          /* WHEN FARE IS NOT AVAILABLE IN CSV */
                          <div className="flex flex-col items-start lg:items-end gap-1 pt-1">
                            <span className="text-[10px] text-black font-black bg-amber-100 px-2 py-0.5 rounded border border-amber-400">
                              ⚡ Route Not in CSV Tariff
                            </span>

                            {/* Oneway under 150 km */}
                            {(activeTab === 'outstation_oneway' || (item as any).tripType === 'oneway') && (actualDistance || distance) <= 150 && (
                              <span className="text-[10px] text-black font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-400">
                                Under 150 Km: Min 300 Km Rule Applied ({distance} Km billed)
                              </span>
                            )}

                            {/* Oneway over 150 km */}
                            {(activeTab === 'outstation_oneway' || (item as any).tripType === 'oneway') && (actualDistance || distance) > 150 && (
                              <span className="text-[10px] text-black font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-400">
                                Over 150 Km: Return Km Counted ({distance} Km billed)
                              </span>
                            )}

                            {/* Toll included for oneway */}
                            {(activeTab === 'outstation_oneway' || (item as any).tripType === 'oneway') && (
                              <span className="text-[10px] text-black font-extrabold bg-slate-100 px-2 py-0.5 rounded border border-black">
                                ✓ Toll Tax Included in Fare
                              </span>
                            )}

                            {/* Round trip when not in CSV */}
                            {activeTab === 'outstation_roundtrip' && (
                              <>
                                <span className="text-[10px] text-black font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-400">
                                  Min 300 Km/day Rule Applied ({distance} Km billed)
                                </span>
                                <span className="text-[10px] text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                                  Toll, State Tax & Parking Extra
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleOpenBooking(vehicle, {
                            totalFare: fare,
                            baseFare,
                            driverAllowance,
                            summary,
                            returnKmBilled,
                            minKmApplied,
                            isPredefinedFare: item.isPredefinedFare,
                            billedDistanceKm: distance,
                            actualDistanceKm: actualDistance,
                          })
                        }
                        className="px-6 sm:px-8 py-3 rounded-xl bg-[#0B192C] hover:bg-black text-white font-black text-sm shadow-md transition transform active:scale-95 flex items-center space-x-2 border border-black cursor-pointer"
                      >
                        <span>BOOK CAB</span>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Back / Modify Search button */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-black text-xs font-black flex items-center space-x-1.5 border border-black shadow-xs transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back / Modify Cities & Dates</span>
              </button>

              <span className="text-xs text-slate-500 font-medium">
                Showing 4 verified cab options for {toCity}
              </span>
            </div>

            {/* Trust Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-300 flex flex-wrap items-center justify-around gap-4 text-center text-xs text-black">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span className="font-bold">Zero Surge Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4 text-black" />
                <span className="font-bold">Clean AC Commercial Taxis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span className="font-bold">Doorstep Pickup in Vadodara</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-black" />
                <span className="font-bold">24x7 Driver Helpline</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QUICK BOOKING MODAL WITH CLEAR BACK OPTION */}
      {isModalOpen && bookingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-black animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header with Back Option */}
            <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between border-b border-black">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-black hover:bg-slate-900 text-white mr-1 transition cursor-pointer border border-white/20"
                  title="Back to Cabs"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                    Instant Cab Booking
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Confirm {bookingVehicle.name}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleConfirmBooking} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              
              {/* Trip Summary Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-300">
                <div className="flex items-center justify-between text-xs font-bold text-black mb-1">
                  <span>
                    {sameCityTrip.isSameCity
                      ? activeTab === 'airport'
                        ? 'Local Airport Transfer'
                        : `${sameCityTrip.cityName} Hourly Rental`
                      : activeTab === 'outstation_roundtrip'
                      ? 'Round-Trip Journey (Return Included)'
                      : bookingFareInfo.returnKmBilled
                      ? 'One-Way Journey (Return Km Counted)'
                      : 'One-Way Direct Drop'}
                  </span>
                  <span className="text-white bg-[#0B192C] px-2 py-0.5 rounded font-bold border border-black">
                    {bookingVehicle.category} AC Taxi
                  </span>
                </div>
                <div className="font-black text-base text-black">
                  {fromCity} ➔ {toCity}
                </div>
                <div className="text-xs text-slate-600 mt-1 flex items-center space-x-3">
                  <span>Date: <strong>{pickupDate}</strong></span>
                  <span>Time: <strong>{pickupTime}</strong></span>
                  {bookingFareInfo.billedDistanceKm && (
                    <span>Distance: <strong>{bookingFareInfo.billedDistanceKm} Km billed</strong></span>
                  )}
                </div>
                {bookingFareInfo.isPredefinedFare && (
                  <div className="mt-2 text-[11px] text-black font-semibold bg-slate-100 p-2 rounded-lg border border-slate-300">
                    ✓ Official CSV Tariff: Package includes Base Fare + Driver Allowance. Toll is included for One-Way Drop.
                  </div>
                )}
                {bookingFareInfo.returnKmBilled && (
                  <div className="mt-2 text-[11px] text-black font-semibold bg-slate-100 p-2 rounded-lg border border-slate-300">
                    ℹ️ Destination exceeds 150 km with no direct drop tariff in CSV: Total fare includes cab return running ({bookingFareInfo.billedDistanceKm} km) + ₹300 Driver Allowance. Toll Tax is included.
                  </div>
                )}
                {bookingFareInfo.minKmApplied && activeTab === 'outstation_oneway' && !bookingFareInfo.isPredefinedFare && (
                  <div className="mt-2 text-[11px] text-black font-semibold bg-slate-100 p-2 rounded-lg border border-slate-300">
                    ℹ️ Destination under 150 km with no direct drop tariff in CSV: Standard outstation minimum 300 km billing applied ({bookingFareInfo.billedDistanceKm} km @ per km rate) + ₹300 Driver Allowance. Toll Tax is included.
                  </div>
                )}
                <div className="mt-2 pt-2 border-t border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Base Ride Fare:</span>
                    <span className="font-bold text-black">₹{bookingFareInfo.baseFare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Driver Allowance (DA):</span>
                    <span className="font-bold text-black">₹{bookingFareInfo.driverAllowance}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Toll Tax:</span>
                    <span className="font-bold text-black">
                      {activeTab === 'outstation_oneway' ? '✓ Included in Fare' : 'Extra as per receipt'}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-black font-black">Total Payable Fare:</span>
                      <div className="text-[10px] text-slate-600 font-bold">
                        (Base Fare + Driver Allowance)
                      </div>
                    </div>
                    <span className="text-xl font-black text-black">
                      ₹{bookingFareInfo.totalFare.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-slate-100 text-black text-xs font-bold border-2 border-black">
                  {formError}
                </div>
              )}

              {/* Passenger Inputs */}
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Passenger Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rajesh Shah"
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Mobile Number (for Driver Dispatch & SMS) *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Exact Pickup Address / Society / Landmark *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="e.g. Al Mukam Residency, Sun Pharma Rd, Tandalja"
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black text-black"
                  />
                </div>
              </div>

              {/* Payment Choice */}
              <div>
                <label className="block text-xs font-bold text-black mb-1.5 flex items-center justify-between">
                  <span>Payment Preference</span>
                  <span className="text-[10px] text-white bg-black border border-black font-extrabold px-2 py-0.5 rounded-full">
                    3 Easy Options
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Option 1: 10% Advance via UPI QR */}
                  <div
                    onClick={() => setPaymentOption('advance_10')}
                    className={`cursor-pointer p-2.5 rounded-xl border-2 transition ${
                      paymentOption === 'advance_10'
                        ? 'border-[#0B192C] bg-slate-100 font-bold text-black shadow-xs ring-1 ring-black'
                        : 'border-slate-300 bg-white text-black hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black">10% Advance Token</span>
                      <span className="text-[9px] bg-[#0B192C] text-white font-extrabold px-1.5 py-0.5 rounded">UPI QR</span>
                    </div>
                    <div className="text-base font-black text-black mt-0.5">
                      ₹{Math.max(PAYMENT_CONFIG.advanceMinimum, Math.round(bookingFareInfo.totalFare * (PAYMENT_CONFIG.advancePercentage / 100))).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-600 leading-tight">
                      Scan UPI QR • Remaining ₹{(bookingFareInfo.totalFare - Math.max(PAYMENT_CONFIG.advanceMinimum, Math.round(bookingFareInfo.totalFare * (PAYMENT_CONFIG.advancePercentage / 100)))).toLocaleString('en-IN')} to chauffeur
                    </div>
                  </div>

                  {/* Option 2: Pay in Cab (Cash / UPI to Driver) */}
                  <div
                    onClick={() => setPaymentOption('pay_driver')}
                    className={`cursor-pointer p-2.5 rounded-xl border-2 transition ${
                      paymentOption === 'pay_driver'
                        ? 'border-[#0B192C] bg-slate-100 font-bold text-black shadow-xs ring-1 ring-black'
                        : 'border-slate-300 bg-white text-black hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black">Pay Later in Cab</span>
                      <span className="text-[9px] bg-slate-800 text-white font-extrabold px-1.5 py-0.5 rounded">₹0 Now</span>
                    </div>
                    <div className="text-base font-black text-black mt-0.5">
                      ₹0 Due Now
                    </div>
                    <div className="text-[10px] text-slate-600 leading-tight">
                      Pay ₹{bookingFareInfo.totalFare.toLocaleString('en-IN')} directly to chauffeur during journey
                    </div>
                  </div>

                  {/* Option 3: Full Payment */}
                  <div
                    onClick={() => setPaymentOption('full_online')}
                    className={`cursor-pointer p-2.5 rounded-xl border-2 transition ${
                      paymentOption === 'full_online'
                        ? 'border-[#0B192C] bg-slate-100 font-bold text-black shadow-xs ring-1 ring-black'
                        : 'border-slate-300 bg-white text-black hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black">100% Full Payment</span>
                      <span className="text-[9px] bg-black text-white font-extrabold px-1.5 py-0.5 rounded">Prepaid</span>
                    </div>
                    <div className="text-base font-black text-black mt-0.5">
                      ₹{bookingFareInfo.totalFare.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-600 leading-tight">
                      Scan UPI QR • ₹0 due during journey
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm & Back Actions */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#0B192C] hover:bg-black text-white font-black text-sm shadow-lg flex items-center justify-center space-x-2 transition border border-white/20 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>
                    {paymentOption === 'pay_driver'
                      ? `CONFIRM CAB BOOKING (Pay ₹${bookingFareInfo.totalFare.toLocaleString('en-IN')} in Cab)`
                      : paymentOption === 'advance_10'
                      ? `PROCEED TO UPI QR PAYMENT (₹${Math.max(PAYMENT_CONFIG.advanceMinimum, Math.round(bookingFareInfo.totalFare * (PAYMENT_CONFIG.advancePercentage / 100))).toLocaleString('en-IN')} Advance)`
                      : `PROCEED TO UPI QR PAYMENT (₹${bookingFareInfo.totalFare.toLocaleString('en-IN')} Full)`}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-bold text-xs flex items-center justify-center space-x-1 transition cursor-pointer border border-slate-300"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    <span>Back</span>
                  </button>

                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hi Kabeer Travels, I want to book ${bookingVehicle.name} for ${fromCity} to ${toCity} on ${pickupDate} at ${pickupTime}. Total Fare: ₹${bookingFareInfo.totalFare}. Name: ${customerName || 'Customer'}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-2/3 py-2.5 rounded-xl bg-[#0B192C] hover:bg-black text-white font-bold text-xs flex items-center justify-center space-x-1.5 border border-white/20 transition cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Authentic UPI QR Payment & UTR Verification Modal */}
      {isPaymentModalOpen && paymentCheckoutDraft && (
        <PaymentCheckoutModal
          isOpen={isPaymentModalOpen}
          bookingDraft={{
            id: paymentCheckoutDraft.id,
            vehicleId: paymentCheckoutDraft.vehicleId,
            pickupLocation: paymentCheckoutDraft.pickupLocation,
            dropLocation: paymentCheckoutDraft.dropLocation,
            pickupDate: paymentCheckoutDraft.pickupDate,
            pickupTime: paymentCheckoutDraft.pickupTime,
            customerName: paymentCheckoutDraft.customerName,
            customerPhone: paymentCheckoutDraft.customerPhone,
            totalFare: paymentCheckoutDraft.estimatedFare || paymentCheckoutDraft.totalFare || 0,
            discount: paymentCheckoutDraft.discount || 0,
            promoCode: paymentCheckoutDraft.promoCode,
            isGstRequired: paymentCheckoutDraft.isGstRequired,
            companyName: paymentCheckoutDraft.companyName,
            gstNumber: paymentCheckoutDraft.gstNumber,
          }}
          initialOption={paymentOption}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={(paymentInfo) => {
            setIsPaymentModalOpen(false);
            const finalBooking = {
              ...paymentCheckoutDraft,
              payment: paymentInfo,
            };
            setPaymentCheckoutDraft(null);
            onBookingConfirmed(finalBooking);
          }}
        />
      )}
    </div>
  );
};
