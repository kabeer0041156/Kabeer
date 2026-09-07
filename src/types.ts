export type ServiceCategory = 'airport' | 'outstation' | 'local';

export type AirportSubtype = 'vadodara_drop' | 'vadodara_pickup' | 'ahmedabad_drop' | 'ahmedabad_pickup' | 'mumbai_drop';

export type TripType = 'oneway' | 'roundtrip';

export interface Vehicle {
  id: string;
  name: string;
  category: 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury SUV' | 'Van';
  models: string;
  passengers: number;
  luggage: number;
  ac: boolean;
  baseFarePerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  airportVadodaraFlat: number;
  airportAhmedabadFlat: number;
  features: string[];
  popularFor: string;
  badge?: string;
  image: string;
}

export interface RoutePackage {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  estimatedDuration: string;
  tag: string;
  description: string;
  startingPriceSedan: number;
  startingPriceSUV: number;
  highlights: string[];
  isPopular?: boolean;
}

export type PaymentOptionType = 'advance_10' | 'full_online' | 'advance_20' | 'pay_driver';
export type PaymentMethod = 'cash' | 'upi' | 'card' | 'netbanking';
export type PaymentStatus = 'Pending (Pay in Cab)' | 'Advance Paid' | 'Fully Paid';

export interface PaymentInfo {
  option: PaymentOptionType;
  method?: PaymentMethod;
  status: PaymentStatus;
  totalFare: number;
  discount: number;
  promoCode?: string;
  amountPaid: number;
  amountDue: number;
  transactionId?: string;
  paymentTimestamp?: string;
  utrNumber?: string;
  isGstRequired?: boolean;
  companyName?: string;
  gstNumber?: string;
}

export interface BookingFormData {
  serviceCategory: ServiceCategory;
  tripType: TripType;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  vehicleId: string;
  passengerCount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  flightTrainNumber?: string;
  specialInstructions?: string;
  localPackageHours?: number;
  payment?: PaymentInfo;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  relativeTime: string;
  text: string;
  tripType: string;
  verified: boolean;
}

export interface BookingRecord extends BookingFormData {
  id: string;
  createdAt: string;
  estimatedFare: number;
  status: 'Confirmed' | 'Pending Callback' | 'Completed';
  payment?: PaymentInfo;
}

export type TrackingRideStatus =
  | 'chauffeur_assigned'
  | 'on_the_way'
  | 'arrived'
  | 'trip_started'
  | 'completed';

export interface ChauffeurDetails {
  name: string;
  phone: string;
  rating: number;
  totalTrips: number;
  vehicleModel: string;
  vehicleColor: string;
  vehiclePlate: string;
  vehicleCategory: string;
  photoUrl: string;
  badge: string;
  languages: string[];
  otp: string;
}

export interface LiveTrackingState {
  bookingId: string;
  customerName: string;
  customerPhone?: string;
  pickupLocation: string;
  dropLocation: string;
  serviceCategory: ServiceCategory;
  tripStatus: TrackingRideStatus;
  statusMessage: string;
  currentSpeedKmH: number;
  etaMinutes: number;
  distanceRemainingKm: number;
  currentLandmark: string;
  trafficStatus: 'Clear' | 'Moderate' | 'Heavy';
  driver: ChauffeurDetails;
  currentCoords: { lat: number; lng: number };
  pickupCoords: { lat: number; lng: number };
  dropCoords: { lat: number; lng: number };
  routeProgressPercent: number; // 0 to 100
  fareAmount: number;
  balanceDue: number;
  lastUpdated: string;
}
