// Official CSV Tariff Database provided by Kabeer Travels
// Includes exact One-way (drop), Round-trip (return), Local hourly rentals, and Airport/Station transfers

export interface CsvPointToPointFare {
  fareId: string;
  sourceCity: string;
  destinationCity: string;
  tripType: 'drop' | 'return'; // 'drop' = one-way, 'return' = round trip
  carCategory: string; // 'Dzire CNG' | 'Sedan CNG' | 'Ertiga CNG' | 'Crysta Diesel' etc.
  standardizedCarId: 'sedan-dzire' | 'suv-ertiga' | 'luxury-innova';
  packageRate: number;
  includedKms: number;
  extraKmRate: number;
  driverAllowance: number;
  nightCharges: number;
}

export interface CsvAirportStationFare {
  fareId: string;
  name: string;
  city: string;
  standardizedCarId: 'sedan-dzire' | 'suv-ertiga' | 'luxury-innova';
  baseFare: number;
  includedKm: number;
  includedMin: number;
  extraKmRate: number;
  waitingChargePerHour: number;
}

export interface CsvLocalRentalPackage {
  hours: number;
  kms: number;
  dzirePrice: number;
  ertigaPrice: number;
  crystaPrice: number;
  extraKmRateDzire: number;
  extraKmRateErtiga: number;
  extraKmRateCrysta: number;
  extraHourRate: number;
}

// 1. Exact Local Rental packages directly from user CSV
export const CSV_LOCAL_RENTALS: CsvLocalRentalPackage[] = [
  { hours: 1, kms: 10, dzirePrice: 1290, ertigaPrice: 1799, crystaPrice: 3250, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 2, kms: 20, dzirePrice: 1349, ertigaPrice: 1800, crystaPrice: 3250, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 3, kms: 30, dzirePrice: 1349, ertigaPrice: 1950, crystaPrice: 3445, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 4, kms: 40, dzirePrice: 1300, ertigaPrice: 1950, crystaPrice: 3650, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 5, kms: 50, dzirePrice: 1538, ertigaPrice: 2100, crystaPrice: 3780, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 6, kms: 60, dzirePrice: 1625, ertigaPrice: 2350, crystaPrice: 3760, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 7, kms: 70, dzirePrice: 1825, ertigaPrice: 2710, crystaPrice: 4280, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 8, kms: 80, dzirePrice: 2100, ertigaPrice: 2700, crystaPrice: 3937, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 9, kms: 90, dzirePrice: 2320, ertigaPrice: 2748, crystaPrice: 4249, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 10, kms: 100, dzirePrice: 2320, ertigaPrice: 3440, crystaPrice: 4975, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 11, kms: 110, dzirePrice: 2340, ertigaPrice: 3435, crystaPrice: 5297, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
  { hours: 12, kms: 120, dzirePrice: 2320, ertigaPrice: 3210, crystaPrice: 5310, extraKmRateDzire: 25, extraKmRateErtiga: 35, extraKmRateCrysta: 45, extraHourRate: 300 },
];

// 2. Exact Airport & Station Transfers from user CSV
export const CSV_AIRPORT_STATION_FARES: CsvAirportStationFare[] = [
  { fareId: '212178', name: 'Vadodara Airport Transfer Sedan/Dzire', city: 'Vadodara', standardizedCarId: 'sedan-dzire', baseFare: 749, includedKm: 8, includedMin: 20, extraKmRate: 20, waitingChargePerHour: 300 },
  { fareId: '172938', name: 'Vadodara Airport Transfer Dzire CNG', city: 'Vadodara', standardizedCarId: 'sedan-dzire', baseFare: 749, includedKm: 8, includedMin: 20, extraKmRate: 20, waitingChargePerHour: 300 },
  { fareId: '172942', name: 'Vadodara Airport Transfer Ertiga CNG', city: 'Vadodara', standardizedCarId: 'suv-ertiga', baseFare: 1024, includedKm: 10, includedMin: 20, extraKmRate: 20, waitingChargePerHour: 300 },
  { fareId: '172941', name: 'Vadodara Airport Transfer Ertiga Xylo', city: 'Vadodara', standardizedCarId: 'suv-ertiga', baseFare: 1049, includedKm: 8, includedMin: 20, extraKmRate: 20, waitingChargePerHour: 300 },
  { fareId: '172945', name: 'Vadodara Airport Transfer Innova Crysta', city: 'Vadodara', standardizedCarId: 'luxury-innova', baseFare: 1799, includedKm: 8, includedMin: 20, extraKmRate: 30, waitingChargePerHour: 300 },
  { fareId: '208507', name: 'Vadodara Railway Station Transfer Dzire', city: 'Vadodara', standardizedCarId: 'sedan-dzire', baseFare: 749, includedKm: 8, includedMin: 20, extraKmRate: 20, waitingChargePerHour: 300 },
  { fareId: '191187', name: 'Hirasar Airport Rajkot Sedan/Dzire', city: 'Rajkot', standardizedCarId: 'sedan-dzire', baseFare: 1499, includedKm: 30, includedMin: 60, extraKmRate: 25, waitingChargePerHour: 300 },
  { fareId: '191189', name: 'Hirasar Airport Rajkot Ertiga', city: 'Rajkot', standardizedCarId: 'suv-ertiga', baseFare: 1799, includedKm: 25, includedMin: 60, extraKmRate: 30, waitingChargePerHour: 300 },
  { fareId: '191185', name: 'Hirasar Airport Rajkot Innova Crysta', city: 'Rajkot', standardizedCarId: 'luxury-innova', baseFare: 3800, includedKm: 30, includedMin: 60, extraKmRate: 35, waitingChargePerHour: 300 },
];

// 3. Exact Point-to-Point routes from user CSV
export const CSV_POINT_TO_POINT_FARES: CsvPointToPointFare[] = [
  // --- Vadodara <-> Ahmedabad ---
  { fareId: '194885', sourceCity: 'Vadodara', destinationCity: 'Ahmedabad', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 1899, includedKms: 115, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '172981', sourceCity: 'Vadodara', destinationCity: 'Ahmedabad', tripType: 'drop', carCategory: 'Dzire CNG (Peak/Express)', standardizedCarId: 'sedan-dzire', packageRate: 2150, includedKms: 115, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '172984', sourceCity: 'Vadodara', destinationCity: 'Ahmedabad', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 2600, includedKms: 115, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '172985', sourceCity: 'Vadodara', destinationCity: 'Ahmedabad', tripType: 'drop', carCategory: 'Ertiga CNG High', standardizedCarId: 'suv-ertiga', packageRate: 2650, includedKms: 115, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '172988', sourceCity: 'Vadodara', destinationCity: 'Ahmedabad', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 6099, includedKms: 112, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194886', sourceCity: 'Vadodara', destinationCity: 'Ahmedabad', tripType: 'return', carCategory: 'Dzire / Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4200, includedKms: 250, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194888', sourceCity: 'Vadodara', destinationCity: 'Ahmedabad', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5400, includedKms: 250, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194889', sourceCity: 'Vadodara', destinationCity: 'Ahmedabad', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7200, includedKms: 250, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Ahmedabad <-> Vadodara ---
  { fareId: '184236', sourceCity: 'Ahmedabad', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Dzire CNG Airport', standardizedCarId: 'sedan-dzire', packageRate: 1589, includedKms: 110, extraKmRate: 15, driverAllowance: 300, nightCharges: 300 },
  { fareId: '209606', sourceCity: 'Ahmedabad', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 1899, includedKms: 115, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '209608', sourceCity: 'Ahmedabad', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 2097, includedKms: 110, extraKmRate: 27, driverAllowance: 500, nightCharges: 500 },
  { fareId: '184831', sourceCity: 'Ahmedabad', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Ertiga Xylo CNG', standardizedCarId: 'suv-ertiga', packageRate: 2720, includedKms: 115, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195539', sourceCity: 'Ahmedabad', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 6999, includedKms: 115, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195540', sourceCity: 'Ahmedabad', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4500, includedKms: 250, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195541', sourceCity: 'Ahmedabad', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5400, includedKms: 250, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195542', sourceCity: 'Ahmedabad', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7300, includedKms: 250, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Vadodara <-> Statue of Unity / Kevadiya / Rajpipla ---
  { fareId: '173052', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 1900, includedKms: 90, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194343', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 2500, includedKms: 90, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '173055', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'drop', carCategory: 'Ertiga Xylo CNG', standardizedCarId: 'suv-ertiga', packageRate: 2499, includedKms: 90, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '173056', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 2550, includedKms: 90, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '173059', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 5000, includedKms: 90, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '173062', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3600, includedKms: 200, extraKmRate: 15, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194344', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 3600, includedKms: 200, extraKmRate: 15, driverAllowance: 300, nightCharges: 500 },
  { fareId: '173065', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'return', carCategory: 'Ertiga Xylo CNG', standardizedCarId: 'suv-ertiga', packageRate: 4500, includedKms: 200, extraKmRate: 20, driverAllowance: 300, nightCharges: 500 },
  { fareId: '173066', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4500, includedKms: 200, extraKmRate: 20, driverAllowance: 300, nightCharges: 500 },
  { fareId: '173069', sourceCity: 'Vadodara', destinationCity: 'Statue of Unity', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 5800, includedKms: 220, extraKmRate: 30, driverAllowance: 300, nightCharges: 500 },

  // --- Vadodara <-> Surat ---
  { fareId: '211385', sourceCity: 'Vadodara', destinationCity: 'Surat', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 1995, includedKms: 145, extraKmRate: 20, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211407', sourceCity: 'Vadodara', destinationCity: 'Surat', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 3270, includedKms: 145, extraKmRate: 20, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211388', sourceCity: 'Vadodara', destinationCity: 'Surat', tripType: 'drop', carCategory: 'Innova / Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 6990, includedKms: 145, extraKmRate: 35, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211381', sourceCity: 'Vadodara', destinationCity: 'Surat', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3900, includedKms: 280, extraKmRate: 13, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211406', sourceCity: 'Vadodara', destinationCity: 'Surat', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5120, includedKms: 280, extraKmRate: 16, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211384', sourceCity: 'Vadodara', destinationCity: 'Surat', tripType: 'return', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 7360, includedKms: 280, extraKmRate: 23, driverAllowance: 400, nightCharges: 500 },

  // --- Surat <-> Vadodara ---
  { fareId: '205924', sourceCity: 'Surat', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 3510, includedKms: 155, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '205926', sourceCity: 'Surat', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5750, includedKms: 155, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '205928', sourceCity: 'Surat', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7399, includedKms: 155, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '205929', sourceCity: 'Surat', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4480, includedKms: 300, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '205932', sourceCity: 'Surat', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5400, includedKms: 300, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '205933', sourceCity: 'Surat', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7500, includedKms: 300, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Vadodara <-> Mumbai Airport / Mumbai ---
  { fareId: '209009', sourceCity: 'Vadodara', destinationCity: 'Mumbai', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 5450, includedKms: 421, extraKmRate: 20, driverAllowance: 650, nightCharges: 500 },
  { fareId: '194565', sourceCity: 'Vadodara', destinationCity: 'Mumbai', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 6964, includedKms: 401, extraKmRate: 25, driverAllowance: 650, nightCharges: 500 },
  { fareId: '209016', sourceCity: 'Vadodara', destinationCity: 'Mumbai', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 7050, includedKms: 421, extraKmRate: 25, driverAllowance: 650, nightCharges: 500 },
  { fareId: '194567', sourceCity: 'Vadodara', destinationCity: 'Mumbai', tripType: 'drop', carCategory: 'Ertiga CNG High', standardizedCarId: 'suv-ertiga', packageRate: 9675, includedKms: 401, extraKmRate: 35, driverAllowance: 440, nightCharges: 500 },
  { fareId: '194568', sourceCity: 'Vadodara', destinationCity: 'Mumbai', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 26550, includedKms: 401, extraKmRate: 45, driverAllowance: 415, nightCharges: 500 },
  { fareId: '194569', sourceCity: 'Vadodara', destinationCity: 'Mumbai', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 11228, includedKms: 800, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194571', sourceCity: 'Vadodara', destinationCity: 'Mumbai', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 14400, includedKms: 800, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194572', sourceCity: 'Vadodara', destinationCity: 'Mumbai', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 27999, includedKms: 800, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Vadodara <-> Bharuch ---
  { fareId: '211361', sourceCity: 'Vadodara', destinationCity: 'Bharuch', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 1359, includedKms: 90, extraKmRate: 20, driverAllowance: 450, nightCharges: 500 },
  { fareId: '211401', sourceCity: 'Vadodara', destinationCity: 'Bharuch', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 1828, includedKms: 90, extraKmRate: 25, driverAllowance: 550, nightCharges: 500 },
  { fareId: '211364', sourceCity: 'Vadodara', destinationCity: 'Bharuch', tripType: 'drop', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 6165, includedKms: 90, extraKmRate: 35, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211357', sourceCity: 'Vadodara', destinationCity: 'Bharuch', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3600, includedKms: 250, extraKmRate: 12, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211400', sourceCity: 'Vadodara', destinationCity: 'Bharuch', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4800, includedKms: 250, extraKmRate: 16, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211360', sourceCity: 'Vadodara', destinationCity: 'Bharuch', tripType: 'return', carCategory: 'Innova Diesel', standardizedCarId: 'luxury-innova', packageRate: 6900, includedKms: 250, extraKmRate: 23, driverAllowance: 400, nightCharges: 500 },

  // --- Vadodara <-> Ankleshwar ---
  { fareId: '211365', sourceCity: 'Vadodara', destinationCity: 'Ankleshwar', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 1389, includedKms: 90, extraKmRate: 20, driverAllowance: 550, nightCharges: 500 },
  { fareId: '211402', sourceCity: 'Vadodara', destinationCity: 'Ankleshwar', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 2004, includedKms: 90, extraKmRate: 25, driverAllowance: 550, nightCharges: 500 },
  { fareId: '211368', sourceCity: 'Vadodara', destinationCity: 'Ankleshwar', tripType: 'drop', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 6165, includedKms: 90, extraKmRate: 35, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211369', sourceCity: 'Vadodara', destinationCity: 'Ankleshwar', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3600, includedKms: 250, extraKmRate: 12, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211403', sourceCity: 'Vadodara', destinationCity: 'Ankleshwar', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4800, includedKms: 250, extraKmRate: 16, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211372', sourceCity: 'Vadodara', destinationCity: 'Ankleshwar', tripType: 'return', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 6900, includedKms: 250, extraKmRate: 23, driverAllowance: 400, nightCharges: 500 },

  // --- Vadodara <-> Dahej ---
  { fareId: '211377', sourceCity: 'Vadodara', destinationCity: 'Dahej', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 2085, includedKms: 110, extraKmRate: 20, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211405', sourceCity: 'Vadodara', destinationCity: 'Dahej', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 3090, includedKms: 110, extraKmRate: 22, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211380', sourceCity: 'Vadodara', destinationCity: 'Dahej', tripType: 'drop', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 6160, includedKms: 110, extraKmRate: 35, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211373', sourceCity: 'Vadodara', destinationCity: 'Dahej', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3600, includedKms: 250, extraKmRate: 12, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211404', sourceCity: 'Vadodara', destinationCity: 'Dahej', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4800, includedKms: 250, extraKmRate: 16, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211376', sourceCity: 'Vadodara', destinationCity: 'Dahej', tripType: 'return', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 6900, includedKms: 250, extraKmRate: 23, driverAllowance: 400, nightCharges: 500 },

  // --- Vadodara <-> Anand ---
  { fareId: '211396', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'drop', carCategory: 'Dzire / Etios CNG', standardizedCarId: 'sedan-dzire', packageRate: 939, includedKms: 55, extraKmRate: 20, driverAllowance: 400, nightCharges: 500 },
  { fareId: '194284', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 1850, includedKms: 55, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '211397', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 1390, includedKms: 55, extraKmRate: 30, driverAllowance: 400, nightCharges: 500 },
  { fareId: '194285', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'drop', carCategory: 'Ertiga CNG High', standardizedCarId: 'suv-ertiga', packageRate: 2899, includedKms: 55, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '211349', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'drop', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 6210, includedKms: 55, extraKmRate: 35, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211343', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3600, includedKms: 250, extraKmRate: 12, driverAllowance: 400, nightCharges: 500 },
  { fareId: '194280', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4200, includedKms: 250, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '211395', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4800, includedKms: 250, extraKmRate: 16, driverAllowance: 400, nightCharges: 500 },
  { fareId: '194281', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5300, includedKms: 250, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '211346', sourceCity: 'Vadodara', destinationCity: 'Anand', tripType: 'return', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 6900, includedKms: 250, extraKmRate: 23, driverAllowance: 400, nightCharges: 500 },

  // --- Vadodara <-> Nadiad ---
  { fareId: '211350', sourceCity: 'Vadodara', destinationCity: 'Nadiad', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 1160, includedKms: 65, extraKmRate: 20, driverAllowance: 500, nightCharges: 500 },
  { fareId: '211398', sourceCity: 'Vadodara', destinationCity: 'Nadiad', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 1500, includedKms: 65, extraKmRate: 40, driverAllowance: 400, nightCharges: 500 },
  { fareId: '194290', sourceCity: 'Vadodara', destinationCity: 'Nadiad', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 6800, includedKms: 70, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '211354', sourceCity: 'Vadodara', destinationCity: 'Nadiad', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3600, includedKms: 250, extraKmRate: 12, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211399', sourceCity: 'Vadodara', destinationCity: 'Nadiad', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4800, includedKms: 250, extraKmRate: 16, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211356', sourceCity: 'Vadodara', destinationCity: 'Nadiad', tripType: 'return', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 6900, includedKms: 250, extraKmRate: 23, driverAllowance: 400, nightCharges: 500 },

  // --- Vadodara <-> Pavagadh ---
  { fareId: '211336', sourceCity: 'Vadodara', destinationCity: 'Pavagadh', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 1230, includedKms: 55, extraKmRate: 18, driverAllowance: 650, nightCharges: 500 },
  { fareId: '211393', sourceCity: 'Vadodara', destinationCity: 'Pavagadh', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 1549, includedKms: 55, extraKmRate: 25, driverAllowance: 700, nightCharges: 500 },
  { fareId: '211339', sourceCity: 'Vadodara', destinationCity: 'Pavagadh', tripType: 'drop', carCategory: 'Innova / Crysta', standardizedCarId: 'luxury-innova', packageRate: 4800, includedKms: 55, extraKmRate: 35, driverAllowance: 700, nightCharges: 500 },
  { fareId: '177860', sourceCity: 'Vadodara', destinationCity: 'Pavagadh', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3500, includedKms: 120, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '211394', sourceCity: 'Vadodara', destinationCity: 'Pavagadh', tripType: 'return', carCategory: 'Sedan/Etios CNG', standardizedCarId: 'sedan-dzire', packageRate: 3900, includedKms: 250, extraKmRate: 13, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211341', sourceCity: 'Vadodara', destinationCity: 'Pavagadh', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4800, includedKms: 250, extraKmRate: 16, driverAllowance: 400, nightCharges: 500 },
  { fareId: '211342', sourceCity: 'Vadodara', destinationCity: 'Pavagadh', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 6900, includedKms: 250, extraKmRate: 23, driverAllowance: 400, nightCharges: 500 },

  // --- Vadodara <-> Halol ---
  { fareId: '209978', sourceCity: 'Vadodara', destinationCity: 'Halol', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 1120, includedKms: 41, extraKmRate: 17, driverAllowance: 750, nightCharges: 500 },
  { fareId: '209985', sourceCity: 'Vadodara', destinationCity: 'Halol', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 1410, includedKms: 41, extraKmRate: 22, driverAllowance: 799, nightCharges: 500 },
  { fareId: '209981', sourceCity: 'Vadodara', destinationCity: 'Halol', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 4835, includedKms: 41, extraKmRate: 35, driverAllowance: 450, nightCharges: 500 },
  { fareId: '177480', sourceCity: 'Vadodara', destinationCity: 'Halol', tripType: 'return', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3300, includedKms: 150, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '177481', sourceCity: 'Vadodara', destinationCity: 'Halol', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4300, includedKms: 150, extraKmRate: 30, driverAllowance: 300, nightCharges: 500 },
  { fareId: '177479', sourceCity: 'Vadodara', destinationCity: 'Halol', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 5499, includedKms: 120, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },

  // --- Vadodara <-> Godhra ---
  { fareId: '194307', sourceCity: 'Vadodara', destinationCity: 'Godhra', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 3100, includedKms: 90, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194308', sourceCity: 'Vadodara', destinationCity: 'Godhra', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4500, includedKms: 90, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194309', sourceCity: 'Vadodara', destinationCity: 'Godhra', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7000, includedKms: 90, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194310', sourceCity: 'Vadodara', destinationCity: 'Godhra', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4500, includedKms: 250, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194311', sourceCity: 'Vadodara', destinationCity: 'Godhra', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5300, includedKms: 250, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194312', sourceCity: 'Vadodara', destinationCity: 'Godhra', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7300, includedKms: 250, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Vadodara <-> Rajkot ---
  { fareId: '194338', sourceCity: 'Vadodara', destinationCity: 'Rajkot', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 5010, includedKms: 285, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '207069', sourceCity: 'Rajkot', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 5640, includedKms: 285, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194339', sourceCity: 'Vadodara', destinationCity: 'Rajkot', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 6670, includedKms: 285, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '207070', sourceCity: 'Rajkot', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 6500, includedKms: 285, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194340', sourceCity: 'Vadodara', destinationCity: 'Rajkot', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 13000, includedKms: 285, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194333', sourceCity: 'Vadodara', destinationCity: 'Rajkot', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 8100, includedKms: 580, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '207074', sourceCity: 'Rajkot', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 7992, includedKms: 570, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194334', sourceCity: 'Vadodara', destinationCity: 'Rajkot', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 10500, includedKms: 580, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '207076', sourceCity: 'Rajkot', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 10250, includedKms: 570, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '194335', sourceCity: 'Vadodara', destinationCity: 'Rajkot', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 14700, includedKms: 580, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Vadodara <-> Bhavnagar ---
  { fareId: '209735', sourceCity: 'Vadodara', destinationCity: 'Bhavnagar', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 3710, includedKms: 215, extraKmRate: 25, driverAllowance: 450, nightCharges: 500 },
  { fareId: '209725', sourceCity: 'Bhavnagar', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 3140, includedKms: 215, extraKmRate: 25, driverAllowance: 450, nightCharges: 500 },
  { fareId: '209737', sourceCity: 'Vadodara', destinationCity: 'Bhavnagar', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5300, includedKms: 215, extraKmRate: 35, driverAllowance: 450, nightCharges: 500 },
  { fareId: '209726', sourceCity: 'Bhavnagar', destinationCity: 'Vadodara', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4420, includedKms: 215, extraKmRate: 35, driverAllowance: 450, nightCharges: 500 },
  { fareId: '209739', sourceCity: 'Vadodara', destinationCity: 'Bhavnagar', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 10250, includedKms: 215, extraKmRate: 45, driverAllowance: 450, nightCharges: 500 },
  { fareId: '209741', sourceCity: 'Vadodara', destinationCity: 'Bhavnagar', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 5850, includedKms: 420, extraKmRate: 13, driverAllowance: 300, nightCharges: 500 },
  { fareId: '209729', sourceCity: 'Bhavnagar', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 5879, includedKms: 420, extraKmRate: 13, driverAllowance: 300, nightCharges: 500 },
  { fareId: '209740', sourceCity: 'Vadodara', destinationCity: 'Bhavnagar', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 7500, includedKms: 420, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '209730', sourceCity: 'Bhavnagar', destinationCity: 'Vadodara', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 7550, includedKms: 420, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '209744', sourceCity: 'Vadodara', destinationCity: 'Bhavnagar', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 10500, includedKms: 420, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Rajkot <-> Junagadh ---
  { fareId: '212925', sourceCity: 'Rajkot', destinationCity: 'Junagadh', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 3415, includedKms: 135, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '212923', sourceCity: 'Rajkot', destinationCity: 'Junagadh', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 3555, includedKms: 135, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '215382', sourceCity: 'Rajkot', destinationCity: 'Junagadh', tripType: 'drop', carCategory: 'Ertiga Xylo CNG', standardizedCarId: 'suv-ertiga', packageRate: 4565, includedKms: 135, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '212927', sourceCity: 'Rajkot', destinationCity: 'Junagadh', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 6750, includedKms: 135, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '212928', sourceCity: 'Rajkot', destinationCity: 'Junagadh', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4200, includedKms: 270, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '212931', sourceCity: 'Rajkot', destinationCity: 'Junagadh', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5300, includedKms: 270, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '212932', sourceCity: 'Rajkot', destinationCity: 'Junagadh', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7300, includedKms: 270, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Rajkot <-> Morbi ---
  { fareId: '212936', sourceCity: 'Rajkot', destinationCity: 'Morbi', tripType: 'drop', carCategory: 'Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 2230, includedKms: 75, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '212934', sourceCity: 'Rajkot', destinationCity: 'Morbi', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 2850, includedKms: 75, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '212933', sourceCity: 'Rajkot', destinationCity: 'Morbi', tripType: 'drop', carCategory: 'Ertiga Xylo CNG', standardizedCarId: 'suv-ertiga', packageRate: 2260, includedKms: 75, extraKmRate: 30, driverAllowance: 300, nightCharges: 500 },

  // --- Ahmedabad <-> Rajkot ---
  { fareId: '209943', sourceCity: 'Rajkot', destinationCity: 'Ahmedabad', tripType: 'drop', carCategory: 'Etios/Dzire CNG', standardizedCarId: 'sedan-dzire', packageRate: 2800, includedKms: 220, extraKmRate: 11, driverAllowance: 350, nightCharges: 500 },
  { fareId: '195574', sourceCity: 'Ahmedabad', destinationCity: 'Rajkot', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 3200, includedKms: 220, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '209946', sourceCity: 'Rajkot', destinationCity: 'Ahmedabad', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 2960, includedKms: 220, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195575', sourceCity: 'Ahmedabad', destinationCity: 'Rajkot', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 6099, includedKms: 220, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '207088', sourceCity: 'Rajkot', destinationCity: 'Ahmedabad', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 10568, includedKms: 220, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195576', sourceCity: 'Ahmedabad', destinationCity: 'Rajkot', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 10300, includedKms: 220, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195578', sourceCity: 'Ahmedabad', destinationCity: 'Rajkot', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 6160, includedKms: 410, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195579', sourceCity: 'Ahmedabad', destinationCity: 'Rajkot', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 7559, includedKms: 410, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195580', sourceCity: 'Ahmedabad', destinationCity: 'Rajkot', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 10990, includedKms: 410, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Ahmedabad <-> Surat ---
  { fareId: '195593', sourceCity: 'Ahmedabad', destinationCity: 'Surat', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4500, includedKms: 252, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195594', sourceCity: 'Ahmedabad', destinationCity: 'Surat', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 6050, includedKms: 252, extraKmRate: 35, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195595', sourceCity: 'Ahmedabad', destinationCity: 'Surat', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 11000, includedKms: 252, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195597', sourceCity: 'Ahmedabad', destinationCity: 'Surat', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 7500, includedKms: 500, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195598', sourceCity: 'Ahmedabad', destinationCity: 'Surat', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 9060, includedKms: 500, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '195600', sourceCity: 'Ahmedabad', destinationCity: 'Surat', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 12700, includedKms: 500, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Ahmedabad <-> Unjha ---
  { fareId: '208403', sourceCity: 'Ahmedabad', destinationCity: 'Unjha', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 2430, includedKms: 105, extraKmRate: 25, driverAllowance: 650, nightCharges: 500 },
  { fareId: '208405', sourceCity: 'Ahmedabad', destinationCity: 'Unjha', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 3130, includedKms: 105, extraKmRate: 30, driverAllowance: 650, nightCharges: 500 },
  { fareId: '208406', sourceCity: 'Ahmedabad', destinationCity: 'Unjha', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 6450, includedKms: 105, extraKmRate: 45, driverAllowance: 650, nightCharges: 500 },
  { fareId: '208398', sourceCity: 'Ahmedabad', destinationCity: 'Unjha', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4100, includedKms: 250, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },
  { fareId: '208400', sourceCity: 'Ahmedabad', destinationCity: 'Unjha', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5000, includedKms: 250, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '208401', sourceCity: 'Ahmedabad', destinationCity: 'Unjha', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7100, includedKms: 250, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },

  // --- Ahmedabad <-> Patan ---
  { fareId: '208388', sourceCity: 'Ahmedabad', destinationCity: 'Patan', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 2995, includedKms: 125, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '208389', sourceCity: 'Ahmedabad', destinationCity: 'Patan', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4185, includedKms: 125, extraKmRate: 35, driverAllowance: 500, nightCharges: 500 },
  { fareId: '208391', sourceCity: 'Ahmedabad', destinationCity: 'Patan', tripType: 'drop', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 6750, includedKms: 125, extraKmRate: 45, driverAllowance: 300, nightCharges: 500 },
  { fareId: '208392', sourceCity: 'Ahmedabad', destinationCity: 'Patan', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 4150, includedKms: 250, extraKmRate: 25, driverAllowance: 300, nightCharges: 500 },
  { fareId: '208395', sourceCity: 'Ahmedabad', destinationCity: 'Patan', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 5300, includedKms: 250, extraKmRate: 18, driverAllowance: 300, nightCharges: 500 },
  { fareId: '208396', sourceCity: 'Ahmedabad', destinationCity: 'Patan', tripType: 'return', carCategory: 'Crysta Diesel', standardizedCarId: 'luxury-innova', packageRate: 7400, includedKms: 250, extraKmRate: 14, driverAllowance: 300, nightCharges: 500 },

  // --- Kota <-> Udaipur ---
  { fareId: '208380', sourceCity: 'Kota', destinationCity: 'Udaipur', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 3945, includedKms: 285, extraKmRate: 25, driverAllowance: 850, nightCharges: 500 },
  { fareId: '208377', sourceCity: 'Udaipur', destinationCity: 'Kota', tripType: 'drop', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 3950, includedKms: 285, extraKmRate: 25, driverAllowance: 1040, nightCharges: 500 },
  { fareId: '208018', sourceCity: 'Kota', destinationCity: 'Udaipur', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 4786, includedKms: 285, extraKmRate: 18, driverAllowance: 550, nightCharges: 500 },
  { fareId: '208378', sourceCity: 'Udaipur', destinationCity: 'Kota', tripType: 'drop', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 6360, includedKms: 285, extraKmRate: 35, driverAllowance: 1040, nightCharges: 500 },
  { fareId: '208385', sourceCity: 'Kota', destinationCity: 'Udaipur', tripType: 'return', carCategory: 'Sedan CNG', standardizedCarId: 'sedan-dzire', packageRate: 7920, includedKms: 560, extraKmRate: 25, driverAllowance: 500, nightCharges: 500 },
  { fareId: '208386', sourceCity: 'Kota', destinationCity: 'Udaipur', tripType: 'return', carCategory: 'Ertiga CNG', standardizedCarId: 'suv-ertiga', packageRate: 10180, includedKms: 560, extraKmRate: 35, driverAllowance: 500, nightCharges: 500 },
];

// Popular cities list from the CSV
export const CSV_CITIES = [
  'Vadodara',
  'Ahmedabad',
  'Statue of Unity',
  'Surat',
  'Pavagadh',
  'Halol',
  'Bharuch',
  'Ankleshwar',
  'Dahej',
  'Anand',
  'Nadiad',
  'Godhra',
  'Rajkot',
  'Bhavnagar',
  'Mumbai',
  'Unjha',
  'Patan',
  'Kota',
  'Udaipur',
  'Junagadh',
  'Morbi',
];

// Helper to normalize city names for searching
function normalizeCity(name: string): string {
  const s = name.toLowerCase().trim();
  if (s.includes('statue') || s.includes('kevadia') || s.includes('sou') || s.includes('rajpipla')) return 'statue of unity';
  if (s.includes('ahmedabad') || s.includes('amd')) return 'ahmedabad';
  if (s.includes('vadodara') || s.includes('baroda') || s.includes('bdq')) return 'vadodara';
  if (s.includes('surat')) return 'surat';
  if (s.includes('pavagadh') || s.includes('champaner')) return 'pavagadh';
  if (s.includes('mumbai') || s.includes('bombay') || s.includes('csia')) return 'mumbai';
  if (s.includes('bharuch')) return 'bharuch';
  if (s.includes('ankleshwar') || s.includes('ankleshwer')) return 'ankleshwar';
  if (s.includes('dahej')) return 'dahej';
  if (s.includes('anand')) return 'anand';
  if (s.includes('nadiad')) return 'nadiad';
  if (s.includes('godhra')) return 'godhra';
  if (s.includes('halol')) return 'halol';
  if (s.includes('rajkot')) return 'rajkot';
  if (s.includes('bhavnagar')) return 'bhavnagar';
  if (s.includes('unjha')) return 'unjha';
  if (s.includes('patan')) return 'patan';
  if (s.includes('kota')) return 'kota';
  if (s.includes('udaipur')) return 'udaipur';
  if (s.includes('junagadh')) return 'junagadh';
  if (s.includes('morbi')) return 'morbi';
  return s;
}

/**
 * Searches the CSV dataset for exact route matches
 */
export function findCsvFaresForRoute(
  source: string,
  destination: string,
  tripType: 'oneway' | 'roundtrip'
): {
  dzire?: CsvPointToPointFare;
  ertiga?: CsvPointToPointFare;
  crysta?: CsvPointToPointFare;
} {
  const normSrc = normalizeCity(source);
  const normDest = normalizeCity(destination);
  const csvTripType = tripType === 'oneway' ? 'drop' : 'return';

  // Search direct match
  const matches = CSV_POINT_TO_POINT_FARES.filter((f) => {
    const fSrc = normalizeCity(f.sourceCity);
    const fDest = normalizeCity(f.destinationCity);
    const matchesTripType = f.tripType === csvTripType;

    const isDirect = fSrc === normSrc && fDest === normDest;
    const isReverse = fSrc === normDest && fDest === normSrc;

    return (isDirect || isReverse) && matchesTripType;
  });

  const dzireMatch = matches.find((m) => m.standardizedCarId === 'sedan-dzire');
  const ertigaMatch = matches.find((m) => m.standardizedCarId === 'suv-ertiga');
  const crystaMatch = matches.find((m) => m.standardizedCarId === 'luxury-innova');

  return {
    dzire: dzireMatch,
    ertiga: ertigaMatch,
    crysta: crystaMatch,
  };
}

export interface RouteOptionDetail {
  fareId: string;
  rate: number; // Total Fare Amount (Base Fare + Driver Allowance)
  baseFare: number;
  includedKms: number;
  extraKmRate: number;
  driverAllowance: number;
  carCategory: string;
  tollIncluded?: boolean;
}

export interface RouteFaresBreakdown {
  source: string;
  destination: string;
  hasMatch: boolean;
  approxDistanceKm: number;
  oneWayAvailable?: boolean;
  oneWayNote?: string;
  oneway: {
    dzire?: RouteOptionDetail;
    ertiga?: RouteOptionDetail;
    crysta?: RouteOptionDetail;
  };
  roundtrip: {
    dzire?: RouteOptionDetail;
    ertiga?: RouteOptionDetail;
    crysta?: RouteOptionDetail;
  };
}

/**
 * Get both Outstation One-Way and Outstation Round-Trip options for a given route
 */
export function getRouteFaresBreakdown(source: string, destination: string): RouteFaresBreakdown {
  const normSrc = normalizeCity(source);
  const normDest = normalizeCity(destination);

  // All matches for this route in both directions and trip types
  const matches = CSV_POINT_TO_POINT_FARES.filter((f) => {
    const fSrc = normalizeCity(f.sourceCity);
    const fDest = normalizeCity(f.destinationCity);
    const isDirect = fSrc === normSrc && fDest === normDest;
    const isReverse = fSrc === normDest && fDest === normSrc;
    return isDirect || isReverse;
  });

  const onewayMatches = matches.filter((m) => m.tripType === 'drop');
  const roundtripMatches = matches.filter((m) => m.tripType === 'return');

  const onewayDzire = onewayMatches.find((m) => m.standardizedCarId === 'sedan-dzire');
  const onewayErtiga = onewayMatches.find((m) => m.standardizedCarId === 'suv-ertiga');
  const onewayCrysta = onewayMatches.find((m) => m.standardizedCarId === 'luxury-innova');

  const roundtripDzire = roundtripMatches.find((m) => m.standardizedCarId === 'sedan-dzire');
  const roundtripErtiga = roundtripMatches.find((m) => m.standardizedCarId === 'suv-ertiga');
  const roundtripCrysta = roundtripMatches.find((m) => m.standardizedCarId === 'luxury-innova');

  // Estimate distance for reference
  let approxKm = 100;
  let isSomnath = false;
  if (normDest.includes('ahmedabad')) approxKm = 115;
  else if (normDest.includes('statue') || normDest.includes('kevadia')) approxKm = 90;
  else if (normDest.includes('surat')) approxKm = 145;
  else if (normDest.includes('mumbai')) approxKm = 420;
  else if (normDest.includes('bharuch')) approxKm = 90;
  else if (normDest.includes('dahej')) approxKm = 110;
  else if (normDest.includes('pavagadh')) approxKm = 55;
  else if (normDest.includes('rajkot')) approxKm = 285;
  else if (normDest.includes('somnath') || normDest.includes('veraval')) {
    approxKm = 430;
    isSomnath = true;
  } else if (onewayDzire?.includedKms) approxKm = onewayDzire.includedKms;

  const toOptionDetail = (f?: CsvPointToPointFare): RouteOptionDetail | undefined => {
    if (!f) return undefined;
    const baseFare = f.packageRate;
    const da = f.driverAllowance || 300;
    const totalRate = baseFare + da;
    return {
      fareId: f.fareId,
      rate: totalRate,
      baseFare,
      includedKms: f.includedKms,
      extraKmRate: f.extraKmRate,
      driverAllowance: da,
      carCategory: f.carCategory,
      tollIncluded: f.tripType === 'drop',
    };
  };

  const hasMatch = isSomnath || !!(onewayDzire || onewayErtiga || onewayCrysta || roundtripDzire || roundtripErtiga || roundtripCrysta);

  // For Somnath or routes where one-way drop is not in CSV tariff, customer gets round trip fare
  const oneWayAvailable = !isSomnath && (!!onewayDzire || !normDest.includes('somnath'));
  const oneWayNote = !oneWayAvailable
    ? `One-way drop tariff not available in CSV for Vadodara to Somnath (${approxKm} Km). Round-trip return fare given.`
    : undefined;

  // Roundtrip fare calculation for Somnath (430 km × 2 = 860 km, 2 days @ 300 allowance = 600)
  const somnathRoundtripDzire: RouteOptionDetail = {
    fareId: 'CSV-SOM-DZ',
    rate: 860 * 13 + 600, // ₹11,780 (@ ₹13/km)
    baseFare: 860 * 13,
    includedKms: 860,
    extraKmRate: 13,
    driverAllowance: 600,
    carCategory: 'Swift Dzire (Sedan)',
    tollIncluded: false,
  };
  const somnathRoundtripErtiga: RouteOptionDetail = {
    fareId: 'CSV-SOM-ER',
    rate: 860 * 16 + 600, // ₹14,360 (@ ₹16/km)
    baseFare: 860 * 16,
    includedKms: 860,
    extraKmRate: 16,
    driverAllowance: 600,
    carCategory: 'Maruti Ertiga (SUV)',
    tollIncluded: false,
  };
  const somnathRoundtripCrysta: RouteOptionDetail = {
    fareId: 'CSV-SOM-CR',
    rate: 860 * 23 + 600, // ₹20,380 (@ ₹23/km)
    baseFare: 860 * 23,
    includedKms: 860,
    extraKmRate: 23,
    driverAllowance: 600,
    carCategory: 'Innova Crysta (Luxury SUV)',
    tollIncluded: false,
  };

  return {
    source: source.trim() || 'Vadodara',
    destination: destination.trim() || 'Ahmedabad',
    hasMatch,
    approxDistanceKm: approxKm,
    oneWayAvailable,
    oneWayNote,
    oneway: {
      dzire: isSomnath
        ? somnathRoundtripDzire // If CSV one-way not available, give round trip fare!
        : (toOptionDetail(onewayDzire) || (hasMatch ? {
            fareId: 'EST-DZ-OW',
            rate: getCsvOutstationFallback('sedan-dzire', approxKm, 'oneway'),
            baseFare: getCsvOutstationFallback('sedan-dzire', approxKm, 'oneway') - 300,
            includedKms: approxKm <= 150 ? 300 : approxKm * 2,
            extraKmRate: 13,
            driverAllowance: 300,
            carCategory: 'Swift Dzire (White)',
            tollIncluded: true,
          } : undefined)),
      ertiga: isSomnath
        ? somnathRoundtripErtiga
        : (toOptionDetail(onewayErtiga) || (hasMatch ? {
            fareId: 'EST-ER-OW',
            rate: getCsvOutstationFallback('suv-ertiga', approxKm, 'oneway'),
            baseFare: getCsvOutstationFallback('suv-ertiga', approxKm, 'oneway') - 300,
            includedKms: approxKm <= 150 ? 300 : approxKm * 2,
            extraKmRate: 16,
            driverAllowance: 300,
            carCategory: 'Maruti Ertiga (White)',
            tollIncluded: true,
          } : undefined)),
      crysta: isSomnath
        ? somnathRoundtripCrysta
        : (toOptionDetail(onewayCrysta) || (hasMatch ? {
            fareId: 'EST-CR-OW',
            rate: getCsvOutstationFallback('luxury-innova', approxKm, 'oneway'),
            baseFare: getCsvOutstationFallback('luxury-innova', approxKm, 'oneway') - 300,
            includedKms: approxKm <= 150 ? 300 : approxKm * 2,
            extraKmRate: 23,
            driverAllowance: 300,
            carCategory: 'Innova Crysta (White)',
            tollIncluded: true,
          } : undefined)),
    },
    roundtrip: {
      dzire: isSomnath
        ? somnathRoundtripDzire
        : (toOptionDetail(roundtripDzire) || (hasMatch ? {
            fareId: 'EST-DZ-RT',
            rate: getCsvOutstationFallback('sedan-dzire', approxKm, 'roundtrip'),
            baseFare: getCsvOutstationFallback('sedan-dzire', approxKm, 'roundtrip') - 300,
            includedKms: Math.max(approxKm * 2, 300),
            extraKmRate: 13,
            driverAllowance: 300,
            carCategory: 'Swift Dzire (White)',
            tollIncluded: false,
          } : undefined)),
      ertiga: isSomnath
        ? somnathRoundtripErtiga
        : (toOptionDetail(roundtripErtiga) || (hasMatch ? {
            fareId: 'EST-ER-RT',
            rate: getCsvOutstationFallback('suv-ertiga', approxKm, 'roundtrip'),
            baseFare: getCsvOutstationFallback('suv-ertiga', approxKm, 'roundtrip') - 300,
            includedKms: Math.max(approxKm * 2, 300),
            extraKmRate: 16,
            driverAllowance: 300,
            carCategory: 'Maruti Ertiga (White)',
            tollIncluded: false,
          } : undefined)),
      crysta: isSomnath
        ? somnathRoundtripCrysta
        : (toOptionDetail(roundtripCrysta) || (hasMatch ? {
            fareId: 'EST-CR-RT',
            rate: getCsvOutstationFallback('luxury-innova', approxKm, 'roundtrip'),
            baseFare: getCsvOutstationFallback('luxury-innova', approxKm, 'roundtrip') - 300,
            includedKms: Math.max(approxKm * 2, 300),
            extraKmRate: 23,
            driverAllowance: 300,
            carCategory: 'Innova Crysta (White)',
            tollIncluded: false,
          } : undefined)),
    },
  };
}

/**
 * Find matching destination fares for any search query (e.g. 'Ahmedabad', 'Surat')
 */
export function searchDestinationFares(destinationQuery: string): RouteFaresBreakdown[] {
  const q = destinationQuery.toLowerCase().trim();
  if (!q) return [];

  // Find unique destinations matching the query
  const matchedDestinations = new Set<string>();

  CSV_POINT_TO_POINT_FARES.forEach((f) => {
    const dest = f.destinationCity;
    const src = f.sourceCity;
    if (dest.toLowerCase().includes(q)) {
      matchedDestinations.add(dest);
    } else if (src.toLowerCase().includes(q) && src.toLowerCase() !== 'vadodara') {
      matchedDestinations.add(src);
    }
  });

  // Also support keywords
  if ('ahmedabad'.includes(q)) matchedDestinations.add('Ahmedabad');
  if ('statue of unity'.includes(q) || 'kevadia'.includes(q) || 'sou'.includes(q)) matchedDestinations.add('Statue of Unity');
  if ('surat'.includes(q)) matchedDestinations.add('Surat');
  if ('mumbai'.includes(q)) matchedDestinations.add('Mumbai');
  if ('pavagadh'.includes(q)) matchedDestinations.add('Pavagadh');
  if ('bharuch'.includes(q)) matchedDestinations.add('Bharuch');
  if ('dahej'.includes(q)) matchedDestinations.add('Dahej');
  if ('anand'.includes(q)) matchedDestinations.add('Anand');
  if ('nadiad'.includes(q)) matchedDestinations.add('Nadiad');
  if ('rajkot'.includes(q)) matchedDestinations.add('Rajkot');
  if ('bhavnagar'.includes(q)) matchedDestinations.add('Bhavnagar');
  if ('somnath'.includes(q) || 'veraval'.includes(q)) matchedDestinations.add('Somnath');

  return Array.from(matchedDestinations).map((dest) => getRouteFaresBreakdown('Vadodara', dest));
}

/**
 * Gujarat Taxi Rules when route fare is NOT available in CSV:
 * 1) One-Way under 150 km: Minimum 300 km amount + ₹300 driver allowance (Toll Included)
 * 2) One-Way over 150 km: Return km counted (distance * 2) + ₹300 driver allowance (Toll Included)
 * 3) Round-Trip: Minimum 300 km/day amount + ₹300/day driver allowance (Toll, State Tax, Parking Extra)
 */
export function getCsvOutstationFallback(
  vehicleId: string,
  distanceKm: number,
  tripType: 'oneway' | 'roundtrip',
  days: number = 1
): number {
  let perKm = 13;
  if (vehicleId === 'suv-ertiga') {
    perKm = 16;
  } else if (vehicleId === 'luxury-innova') {
    perKm = 23;
  } else if (vehicleId === 'hatchback-wagonr') {
    perKm = 11;
  }

  if (tripType === 'oneway') {
    if (distanceKm <= 150) {
      // Under 150 km: Min 300 km rule + ₹300 Driver Allowance (Toll Included)
      const baseFare = 300 * perKm;
      return Math.round(baseFare + 300);
    } else {
      // Over 150 km: Return km counted + ₹300 Driver Allowance (Toll Included)
      const baseFare = distanceKm * 2 * perKm;
      return Math.round(baseFare + 300);
    }
  } else {
    // Round trip: Min 300 km/day + ₹300 driver allowance/day (Toll & Taxes Extra)
    const billedKm = Math.max(distanceKm * 2, days * 300);
    const baseFare = billedKm * perKm;
    return Math.round(baseFare + days * 300);
  }
}
