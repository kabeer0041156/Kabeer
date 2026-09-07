/**
/**
 * Comprehensive Gujarat Cities, Talukas & Villages Directory & Tariff Calculator
 * Kabeer Travels - Vadodara, Gujarat
 */

import { findCsvFaresForRoute, CsvPointToPointFare } from './csvFares';

export interface GujaratLocation {
  name: string;
  district: string;
  type: 'city' | 'taluka' | 'town' | 'village' | 'attraction' | 'airport' | 'interstate';
  distanceKmFromVadodara: number;
  coords: { lat: number; lng: number };
  popular?: boolean;
}

export const GUJARAT_LOCATIONS: GujaratLocation[] = [
  // Vadodara & Surrounding Central Gujarat
  { name: 'Vadodara', district: 'Vadodara', type: 'city', distanceKmFromVadodara: 0, coords: { lat: 22.3072, lng: 73.1812 }, popular: true },
  { name: 'Vadodara Airport (BDQ)', district: 'Vadodara', type: 'airport', distanceKmFromVadodara: 8, coords: { lat: 22.3325, lng: 73.2264 }, popular: true },
  { name: 'Tandalja / Sun Pharma Rd', district: 'Vadodara', type: 'village', distanceKmFromVadodara: 5, coords: { lat: 22.2882, lng: 73.1534 }, popular: true },
  { name: 'Mahabalipuram Society', district: 'Vadodara', type: 'village', distanceKmFromVadodara: 5, coords: { lat: 22.2856, lng: 73.1558 }, popular: true },
  { name: 'Alkapuri / Station', district: 'Vadodara', type: 'city', distanceKmFromVadodara: 3, coords: { lat: 22.3107, lng: 73.1712 }, popular: true },
  { name: 'Vasna - Bhayli', district: 'Vadodara', type: 'village', distanceKmFromVadodara: 8, coords: { lat: 22.2925, lng: 73.1235 }, popular: true },
  { name: 'Padra', district: 'Vadodara', type: 'taluka', distanceKmFromVadodara: 18, coords: { lat: 22.2405, lng: 73.0827 }, popular: true },
  { name: 'Karjan', district: 'Vadodara', type: 'taluka', distanceKmFromVadodara: 40, coords: { lat: 22.0526, lng: 73.1205 }, popular: true },
  { name: 'Dabhoi', district: 'Vadodara', type: 'taluka', distanceKmFromVadodara: 35, coords: { lat: 22.1815, lng: 73.4325 }, popular: true },
  { name: 'Waghodia / Parul Univ', district: 'Vadodara', type: 'taluka', distanceKmFromVadodara: 25, coords: { lat: 22.3025, lng: 73.4215 }, popular: true },
  { name: 'Savli', district: 'Vadodara', type: 'taluka', distanceKmFromVadodara: 38, coords: { lat: 22.5615, lng: 73.2215 } },
  { name: 'Desar', district: 'Vadodara', type: 'taluka', distanceKmFromVadodara: 48, coords: { lat: 22.6115, lng: 73.3415 } },
  { name: 'Shinor', district: 'Vadodara', type: 'taluka', distanceKmFromVadodara: 52, coords: { lat: 21.9125, lng: 73.3325 } },

  // Ahmedabad & Gandhinagar Region
  { name: 'Ahmedabad', district: 'Ahmedabad', type: 'city', distanceKmFromVadodara: 115, coords: { lat: 23.0225, lng: 72.5714 }, popular: true },
  { name: 'Ahmedabad Airport (AMD)', district: 'Ahmedabad', type: 'airport', distanceKmFromVadodara: 115, coords: { lat: 23.0772, lng: 72.6347 }, popular: true },
  { name: 'Gandhinagar / GIFT City', district: 'Gandhinagar', type: 'city', distanceKmFromVadodara: 135, coords: { lat: 23.2156, lng: 72.6369 }, popular: true },
  { name: 'Sanand / GIDC', district: 'Ahmedabad', type: 'taluka', distanceKmFromVadodara: 135, coords: { lat: 22.9868, lng: 72.3815 }, popular: true },
  { name: 'Bavla', district: 'Ahmedabad', type: 'taluka', distanceKmFromVadodara: 125, coords: { lat: 22.8365, lng: 72.3615 } },
  { name: 'Dholka', district: 'Ahmedabad', type: 'taluka', distanceKmFromVadodara: 110, coords: { lat: 22.7215, lng: 72.4415 } },
  { name: 'Dholera SIR', district: 'Ahmedabad', type: 'town', distanceKmFromVadodara: 130, coords: { lat: 22.2455, lng: 72.1955 }, popular: true },
  { name: 'Viramgam', district: 'Ahmedabad', type: 'taluka', distanceKmFromVadodara: 175, coords: { lat: 23.1235, lng: 72.0325 } },
  { name: 'Kalol (Gandhinagar)', district: 'Gandhinagar', type: 'taluka', distanceKmFromVadodara: 145, coords: { lat: 23.2415, lng: 72.4925 } },
  { name: 'Mansa', district: 'Gandhinagar', type: 'taluka', distanceKmFromVadodara: 165, coords: { lat: 23.4215, lng: 72.6615 } },
  { name: 'Dehgam', district: 'Gandhinagar', type: 'taluka', distanceKmFromVadodara: 140, coords: { lat: 23.1615, lng: 72.8125 } },

  // Anand & Kheda Districts
  { name: 'Anand', district: 'Anand', type: 'city', distanceKmFromVadodara: 45, coords: { lat: 22.5645, lng: 72.9289 }, popular: true },
  { name: 'Vidyanagar (V.V. Nagar)', district: 'Anand', type: 'town', distanceKmFromVadodara: 48, coords: { lat: 22.5515, lng: 72.9215 }, popular: true },
  { name: 'Nadiad', district: 'Kheda', type: 'city', distanceKmFromVadodara: 60, coords: { lat: 22.6916, lng: 72.8634 }, popular: true },
  { name: 'Petlad', district: 'Anand', type: 'taluka', distanceKmFromVadodara: 52, coords: { lat: 22.4715, lng: 72.8015 } },
  { name: 'Khambhat (Cambay)', district: 'Anand', type: 'taluka', distanceKmFromVadodara: 78, coords: { lat: 22.3135, lng: 72.6215 } },
  { name: 'Borsad', district: 'Anand', type: 'taluka', distanceKmFromVadodara: 48, coords: { lat: 22.4115, lng: 72.9015 } },
  { name: 'Umreth', district: 'Anand', type: 'taluka', distanceKmFromVadodara: 50, coords: { lat: 22.6985, lng: 73.1185 } },
  { name: 'Dakor (Ranchhodraiji Temple)', district: 'Kheda', type: 'attraction', distanceKmFromVadodara: 70, coords: { lat: 22.7562, lng: 73.1502 }, popular: true },
  { name: 'Kapadvanj', district: 'Kheda', type: 'taluka', distanceKmFromVadodara: 95, coords: { lat: 23.0215, lng: 73.0715 } },
  { name: 'Mahudha', district: 'Kheda', type: 'taluka', distanceKmFromVadodara: 75, coords: { lat: 22.8215, lng: 72.9315 } },
  { name: 'Matar', district: 'Kheda', type: 'taluka', distanceKmFromVadodara: 75, coords: { lat: 22.7115, lng: 72.6615 } },
  { name: 'Kheda', district: 'Kheda', type: 'taluka', distanceKmFromVadodara: 80, coords: { lat: 22.7515, lng: 72.6815 } },

  // Panchmahal, Dahod & Mahisagar
  { name: 'Pavagadh / Halol (Kalika Mata)', district: 'Panchmahal', type: 'attraction', distanceKmFromVadodara: 48, coords: { lat: 22.4635, lng: 73.5325 }, popular: true },
  { name: 'Godhra', district: 'Panchmahal', type: 'city', distanceKmFromVadodara: 80, coords: { lat: 22.7765, lng: 73.6145 }, popular: true },
  { name: 'Kalol (Panchmahal)', district: 'Panchmahal', type: 'taluka', distanceKmFromVadodara: 50, coords: { lat: 22.6025, lng: 73.4615 } },
  { name: 'Shehra', district: 'Panchmahal', type: 'taluka', distanceKmFromVadodara: 95, coords: { lat: 22.9515, lng: 73.6315 } },
  { name: 'Lunawada', district: 'Mahisagar', type: 'taluka', distanceKmFromVadodara: 110, coords: { lat: 23.1315, lng: 73.6125 } },
  { name: 'Santrampur', district: 'Mahisagar', type: 'taluka', distanceKmFromVadodara: 140, coords: { lat: 23.1915, lng: 73.8915 } },
  { name: 'Balasinor', district: 'Mahisagar', type: 'taluka', distanceKmFromVadodara: 85, coords: { lat: 22.9565, lng: 73.3345 } },
  { name: 'Dahod', district: 'Dahod', type: 'city', distanceKmFromVadodara: 150, coords: { lat: 22.8365, lng: 74.2545 }, popular: true },
  { name: 'Jhalod', district: 'Dahod', type: 'taluka', distanceKmFromVadodara: 175, coords: { lat: 23.1015, lng: 74.1515 } },
  { name: 'Limkheda', district: 'Dahod', type: 'taluka', distanceKmFromVadodara: 125, coords: { lat: 22.8315, lng: 73.9915 } },
  { name: 'Devgadh Baria', district: 'Dahod', type: 'taluka', distanceKmFromVadodara: 110, coords: { lat: 22.7025, lng: 73.9115 } },

  // Narmada & Chhota Udepur
  { name: 'Statue of Unity (Kevadia)', district: 'Narmada', type: 'attraction', distanceKmFromVadodara: 90, coords: { lat: 21.8380, lng: 73.7191 }, popular: true },
  { name: 'Poicha (Nilkanthdham)', district: 'Narmada', type: 'attraction', distanceKmFromVadodara: 65, coords: { lat: 21.8952, lng: 73.4985 }, popular: true },
  { name: 'Rajpipla', district: 'Narmada', type: 'taluka', distanceKmFromVadodara: 75, coords: { lat: 21.7895, lng: 73.5685 }, popular: true },
  { name: 'Dediapada', district: 'Narmada', type: 'taluka', distanceKmFromVadodara: 110, coords: { lat: 21.6365, lng: 73.5915 } },
  { name: 'Sagbara', district: 'Narmada', type: 'taluka', distanceKmFromVadodara: 135, coords: { lat: 21.5515, lng: 73.7815 } },
  { name: 'Garudeshwar', district: 'Narmada', type: 'village', distanceKmFromVadodara: 82, coords: { lat: 21.8715, lng: 73.6615 } },
  { name: 'Chhota Udepur', district: 'Chhota Udepur', type: 'city', distanceKmFromVadodara: 105, coords: { lat: 22.3115, lng: 74.0115 }, popular: true },
  { name: 'Bodeli', district: 'Chhota Udepur', type: 'taluka', distanceKmFromVadodara: 65, coords: { lat: 22.2565, lng: 73.7215 }, popular: true },
  { name: 'Sankheda', district: 'Chhota Udepur', type: 'taluka', distanceKmFromVadodara: 50, coords: { lat: 22.1615, lng: 73.5815 } },
  { name: 'Kawant', district: 'Chhota Udepur', type: 'taluka', distanceKmFromVadodara: 115, coords: { lat: 22.0715, lng: 74.0515 } },
  { name: 'Nasvadi', district: 'Chhota Udepur', type: 'taluka', distanceKmFromVadodara: 75, coords: { lat: 21.9815, lng: 73.7615 } },

  // South Gujarat (Bharuch, Surat, Navsari, Valsad, Dang)
  { name: 'Bharuch', district: 'Bharuch', type: 'city', distanceKmFromVadodara: 75, coords: { lat: 21.7051, lng: 72.9959 }, popular: true },
  { name: 'Ankleshwar', district: 'Bharuch', type: 'city', distanceKmFromVadodara: 85, coords: { lat: 21.6265, lng: 73.0015 }, popular: true },
  { name: 'Dahej / PCPIR GIDC', district: 'Bharuch', type: 'town', distanceKmFromVadodara: 120, coords: { lat: 21.7125, lng: 72.5852 }, popular: true },
  { name: 'Jambusar', district: 'Bharuch', type: 'taluka', distanceKmFromVadodara: 70, coords: { lat: 22.0515, lng: 72.8015 } },
  { name: 'Amod', district: 'Bharuch', type: 'taluka', distanceKmFromVadodara: 65, coords: { lat: 21.9915, lng: 72.8815 } },
  { name: 'Hansot', district: 'Bharuch', type: 'taluka', distanceKmFromVadodara: 95, coords: { lat: 21.5815, lng: 72.8015 } },
  { name: 'Zagadiya', district: 'Bharuch', type: 'taluka', distanceKmFromVadodara: 90, coords: { lat: 21.7115, lng: 73.1515 } },
  { name: 'Surat', district: 'Surat', type: 'city', distanceKmFromVadodara: 155, coords: { lat: 21.1702, lng: 72.8311 }, popular: true },
  { name: 'Surat Airport (STV)', district: 'Surat', type: 'airport', distanceKmFromVadodara: 170, coords: { lat: 21.1141, lng: 72.7419 }, popular: true },
  { name: 'Bardoli', district: 'Surat', type: 'taluka', distanceKmFromVadodara: 175, coords: { lat: 21.1215, lng: 73.1115 }, popular: true },
  { name: 'Kamrej', district: 'Surat', type: 'taluka', distanceKmFromVadodara: 145, coords: { lat: 21.2715, lng: 72.9615 } },
  { name: 'Olpad', district: 'Surat', type: 'taluka', distanceKmFromVadodara: 160, coords: { lat: 21.3315, lng: 72.7515 } },
  { name: 'Mandvi (Surat)', district: 'Surat', type: 'taluka', distanceKmFromVadodara: 180, coords: { lat: 21.2615, lng: 73.3015 } },
  { name: 'Navsari', district: 'Navsari', type: 'city', distanceKmFromVadodara: 190, coords: { lat: 20.9515, lng: 72.9315 }, popular: true },
  { name: 'Bilimora', district: 'Navsari', type: 'city', distanceKmFromVadodara: 215, coords: { lat: 20.7615, lng: 72.9615 }, popular: true },
  { name: 'Gandevi', district: 'Navsari', type: 'taluka', distanceKmFromVadodara: 210, coords: { lat: 20.8115, lng: 72.9815 } },
  { name: 'Valsad', district: 'Valsad', type: 'city', distanceKmFromVadodara: 235, coords: { lat: 20.6015, lng: 72.9315 }, popular: true },
  { name: 'Vapi / GIDC', district: 'Valsad', type: 'city', distanceKmFromVadodara: 260, coords: { lat: 20.3715, lng: 72.9115 }, popular: true },
  { name: 'Pardi', district: 'Valsad', type: 'taluka', distanceKmFromVadodara: 250, coords: { lat: 20.5115, lng: 72.9515 } },
  { name: 'Umbergaon', district: 'Valsad', type: 'taluka', distanceKmFromVadodara: 285, coords: { lat: 20.1915, lng: 72.7515 } },
  { name: 'Dharampur', district: 'Valsad', type: 'taluka', distanceKmFromVadodara: 260, coords: { lat: 20.5415, lng: 73.1815 } },
  { name: 'Daman', district: 'Daman', type: 'interstate', distanceKmFromVadodara: 275, coords: { lat: 20.3974, lng: 72.8328 }, popular: true },
  { name: 'Silvassa', district: 'Dadra & Nagar Haveli', type: 'interstate', distanceKmFromVadodara: 285, coords: { lat: 20.2763, lng: 73.0083 }, popular: true },
  { name: 'Vyara', district: 'Tapi', type: 'city', distanceKmFromVadodara: 210, coords: { lat: 21.1115, lng: 73.4015 } },
  { name: 'Songadh', district: 'Tapi', type: 'taluka', distanceKmFromVadodara: 225, coords: { lat: 21.1715, lng: 73.5615 } },
  { name: 'Saputara (Hill Station)', district: 'Dang', type: 'attraction', distanceKmFromVadodara: 290, coords: { lat: 20.5815, lng: 73.7515 }, popular: true },
  { name: 'Ahwa', district: 'Dang', type: 'taluka', distanceKmFromVadodara: 265, coords: { lat: 20.7615, lng: 73.6815 } },

  // Saurashtra & Kutch
  { name: 'Rajkot', district: 'Rajkot', type: 'city', distanceKmFromVadodara: 275, coords: { lat: 22.3039, lng: 70.8022 }, popular: true },
  { name: 'Gondal', district: 'Rajkot', type: 'taluka', distanceKmFromVadodara: 310, coords: { lat: 21.9615, lng: 70.8015 }, popular: true },
  { name: 'Jetpur', district: 'Rajkot', type: 'taluka', distanceKmFromVadodara: 340, coords: { lat: 21.7515, lng: 70.7815 } },
  { name: 'Dhoraji', district: 'Rajkot', type: 'taluka', distanceKmFromVadodara: 360, coords: { lat: 21.7315, lng: 70.4515 } },
  { name: 'Jasdan', district: 'Rajkot', type: 'taluka', distanceKmFromVadodara: 245, coords: { lat: 22.0315, lng: 71.2015 } },
  { name: 'Morbi / Ceramic Hub', district: 'Morbi', type: 'city', distanceKmFromVadodara: 290, coords: { lat: 22.8215, lng: 70.8415 }, popular: true },
  { name: 'Wankaner', district: 'Morbi', type: 'taluka', distanceKmFromVadodara: 270, coords: { lat: 22.6115, lng: 70.9315 } },
  { name: 'Jamnagar', district: 'Jamnagar', type: 'city', distanceKmFromVadodara: 365, coords: { lat: 22.4707, lng: 70.0577 }, popular: true },
  { name: 'Dwarka (Dwarkadhish Mandir)', district: 'Devbhoomi Dwarka', type: 'attraction', distanceKmFromVadodara: 500, coords: { lat: 22.2442, lng: 68.9685 }, popular: true },
  { name: 'Bet Dwarka / Okha', district: 'Devbhoomi Dwarka', type: 'attraction', distanceKmFromVadodara: 525, coords: { lat: 22.4615, lng: 69.0715 }, popular: true },
  { name: 'Khambhalia', district: 'Devbhoomi Dwarka', type: 'taluka', distanceKmFromVadodara: 420, coords: { lat: 22.2115, lng: 69.6515 } },
  { name: 'Porbandar (Kirti Mandir)', district: 'Porbandar', type: 'city', distanceKmFromVadodara: 450, coords: { lat: 21.6417, lng: 69.6293 }, popular: true },
  { name: 'Junagadh (Girnar / Ropeway)', district: 'Junagadh', type: 'city', distanceKmFromVadodara: 375, coords: { lat: 21.5222, lng: 70.4579 }, popular: true },
  { name: 'Keshod', district: 'Junagadh', type: 'taluka', distanceKmFromVadodara: 410, coords: { lat: 21.3015, lng: 70.2515 } },
  { name: 'Sasan Gir (Asiatic Lion Safari)', district: 'Gir Somnath', type: 'attraction', distanceKmFromVadodara: 410, coords: { lat: 21.1615, lng: 70.5815 }, popular: true },
  { name: 'Somnath (Veraval / Jyotirlinga)', district: 'Gir Somnath', type: 'attraction', distanceKmFromVadodara: 430, coords: { lat: 20.8880, lng: 70.4010 }, popular: true },
  { name: 'Diu (Union Territory)', district: 'Diu', type: 'interstate', distanceKmFromVadodara: 390, coords: { lat: 20.7144, lng: 70.9874 }, popular: true },
  { name: 'Una', district: 'Gir Somnath', type: 'taluka', distanceKmFromVadodara: 375, coords: { lat: 20.8215, lng: 71.0415 } },
  { name: 'Amreli', district: 'Amreli', type: 'city', distanceKmFromVadodara: 260, coords: { lat: 21.6015, lng: 71.2215 }, popular: true },
  { name: 'Savarkundla', district: 'Amreli', type: 'taluka', distanceKmFromVadodara: 285, coords: { lat: 21.3315, lng: 71.3015 } },
  { name: 'Dhari', district: 'Amreli', type: 'taluka', distanceKmFromVadodara: 295, coords: { lat: 21.3215, lng: 71.0215 } },
  { name: 'Rajula', district: 'Amreli', type: 'taluka', distanceKmFromVadodara: 320, coords: { lat: 20.9415, lng: 71.4315 } },
  { name: 'Bhavnagar', district: 'Bhavnagar', type: 'city', distanceKmFromVadodara: 205, coords: { lat: 21.7645, lng: 72.1519 }, popular: true },
  { name: 'Palitana (Shatrunjaya Hills)', district: 'Bhavnagar', type: 'attraction', distanceKmFromVadodara: 220, coords: { lat: 21.5215, lng: 71.8315 }, popular: true },
  { name: 'Mahuva', district: 'Bhavnagar', type: 'taluka', distanceKmFromVadodara: 290, coords: { lat: 21.0915, lng: 71.7615 } },
  { name: 'Talaja', district: 'Bhavnagar', type: 'taluka', distanceKmFromVadodara: 245, coords: { lat: 21.3515, lng: 72.0415 } },
  { name: 'Sihor', district: 'Bhavnagar', type: 'taluka', distanceKmFromVadodara: 195, coords: { lat: 21.7015, lng: 71.9615 } },
  { name: 'Botad', district: 'Botad', type: 'city', distanceKmFromVadodara: 180, coords: { lat: 22.1715, lng: 71.6615 }, popular: true },
  { name: 'Sarangpur (Kashtbhanjan Hanuman)', district: 'Botad', type: 'attraction', distanceKmFromVadodara: 175, coords: { lat: 22.1485, lng: 71.8965 }, popular: true },
  { name: 'Gadhada (Swaminarayan Mandir)', district: 'Botad', type: 'attraction', distanceKmFromVadodara: 205, coords: { lat: 21.9715, lng: 71.5815 }, popular: true },
  { name: 'Surendranagar', district: 'Surendranagar', type: 'city', distanceKmFromVadodara: 210, coords: { lat: 22.7215, lng: 71.6415 }, popular: true },
  { name: 'Chotila (Chamunda Mata)', district: 'Surendranagar', type: 'attraction', distanceKmFromVadodara: 235, coords: { lat: 22.4215, lng: 71.1915 }, popular: true },
  { name: 'Limbdi', district: 'Surendranagar', type: 'taluka', distanceKmFromVadodara: 180, coords: { lat: 22.5615, lng: 71.8115 } },
  { name: 'Dhrangadhra', district: 'Surendranagar', type: 'taluka', distanceKmFromVadodara: 240, coords: { lat: 22.9915, lng: 71.4615 } },
  { name: 'Bhuj', district: 'Kutch', type: 'city', distanceKmFromVadodara: 450, coords: { lat: 23.2420, lng: 69.6669 }, popular: true },
  { name: 'Gandhidham', district: 'Kutch', type: 'city', distanceKmFromVadodara: 395, coords: { lat: 23.0765, lng: 70.1345 }, popular: true },
  { name: 'Anjar', district: 'Kutch', type: 'taluka', distanceKmFromVadodara: 410, coords: { lat: 23.1115, lng: 70.0215 } },
  { name: 'Mundra / Port GIDC', district: 'Kutch', type: 'town', distanceKmFromVadodara: 450, coords: { lat: 22.8415, lng: 69.7215 }, popular: true },
  { name: 'Mandvi (Kutch / Beach)', district: 'Kutch', type: 'attraction', distanceKmFromVadodara: 500, coords: { lat: 22.8315, lng: 69.3515 }, popular: true },
  { name: 'Rann of Kutch (Dhordo / Tent City)', district: 'Kutch', type: 'attraction', distanceKmFromVadodara: 520, coords: { lat: 23.8215, lng: 69.5115 }, popular: true },

  // North Gujarat
  { name: 'Mehsana', district: 'Mehsana', type: 'city', distanceKmFromVadodara: 185, coords: { lat: 23.5880, lng: 72.3693 }, popular: true },
  { name: 'Kadi', district: 'Mehsana', type: 'taluka', distanceKmFromVadodara: 155, coords: { lat: 23.3015, lng: 72.3315 } },
  { name: 'Visnagar', district: 'Mehsana', type: 'taluka', distanceKmFromVadodara: 195, coords: { lat: 23.7015, lng: 72.5515 } },
  { name: 'Vadnagar (Heritage)', district: 'Mehsana', type: 'town', distanceKmFromVadodara: 210, coords: { lat: 23.7815, lng: 72.6415 } },
  { name: 'Unjha (Spice Mandi)', district: 'Mehsana', type: 'taluka', distanceKmFromVadodara: 210, coords: { lat: 23.8015, lng: 72.3915 }, popular: true },
  { name: 'Becharaji (Bahuchar Mata)', district: 'Mehsana', type: 'attraction', distanceKmFromVadodara: 200, coords: { lat: 23.5015, lng: 72.0415 } },
  { name: 'Modhera (Sun Temple)', district: 'Mehsana', type: 'attraction', distanceKmFromVadodara: 205, coords: { lat: 23.5835, lng: 72.1335 }, popular: true },
  { name: 'Patan (Rani Ki Vav)', district: 'Patan', type: 'city', distanceKmFromVadodara: 230, coords: { lat: 23.8515, lng: 72.1215 }, popular: true },
  { name: 'Sidhpur (Matrugaya)', district: 'Patan', type: 'taluka', distanceKmFromVadodara: 235, coords: { lat: 23.9115, lng: 72.3815 }, popular: true },
  { name: 'Radhanpur', district: 'Patan', type: 'taluka', distanceKmFromVadodara: 275, coords: { lat: 23.8315, lng: 71.6015 } },
  { name: 'Palanpur', district: 'Banaskantha', type: 'city', distanceKmFromVadodara: 255, coords: { lat: 24.1715, lng: 72.4315 }, popular: true },
  { name: 'Deesa', district: 'Banaskantha', type: 'city', distanceKmFromVadodara: 280, coords: { lat: 24.2515, lng: 72.1815 }, popular: true },
  { name: 'Ambaji (Shaktipeeth Mandir)', district: 'Banaskantha', type: 'attraction', distanceKmFromVadodara: 295, coords: { lat: 24.3315, lng: 72.8515 }, popular: true },
  { name: 'Tharad', district: 'Banaskantha', type: 'taluka', distanceKmFromVadodara: 340, coords: { lat: 24.3915, lng: 71.6315 } },
  { name: 'Himatnagar', district: 'Sabarkantha', type: 'city', distanceKmFromVadodara: 190, coords: { lat: 23.6015, lng: 72.9615 }, popular: true },
  { name: 'Idar', district: 'Sabarkantha', type: 'taluka', distanceKmFromVadodara: 220, coords: { lat: 23.8315, lng: 73.0015 } },
  { name: 'Khedbrahma', district: 'Sabarkantha', type: 'taluka', distanceKmFromVadodara: 245, coords: { lat: 24.0315, lng: 73.0415 } },
  { name: 'Modasa', district: 'Aravalli', type: 'city', distanceKmFromVadodara: 170, coords: { lat: 23.4615, lng: 73.3015 } },
  { name: 'Shamlaji (Vishnu Mandir)', district: 'Aravalli', type: 'attraction', distanceKmFromVadodara: 215, coords: { lat: 23.6915, lng: 73.3915 }, popular: true },
  { name: 'Bayad', district: 'Aravalli', type: 'taluka', distanceKmFromVadodara: 135, coords: { lat: 23.2315, lng: 73.2215 } },

  // Interstate Popular Routes
  { name: 'Mumbai Airport (BOM)', district: 'Maharashtra', type: 'interstate', distanceKmFromVadodara: 440, coords: { lat: 19.0896, lng: 72.8656 }, popular: true },
  { name: 'Mumbai City (Bandra/Andheri)', district: 'Maharashtra', type: 'interstate', distanceKmFromVadodara: 430, coords: { lat: 19.0760, lng: 72.8777 }, popular: true },
  { name: 'Udaipur (City Palace/Fatehsagar)', district: 'Rajasthan', type: 'interstate', distanceKmFromVadodara: 340, coords: { lat: 24.5854, lng: 73.7125 }, popular: true },
  { name: 'Mount Abu (Dilwara Temples)', district: 'Rajasthan', type: 'interstate', distanceKmFromVadodara: 320, coords: { lat: 24.5926, lng: 72.7156 }, popular: true },
  { name: 'Shirdi (Sai Baba Mandir)', district: 'Maharashtra', type: 'interstate', distanceKmFromVadodara: 420, coords: { lat: 19.7667, lng: 74.4767 }, popular: true },
  { name: 'Nashik (Trimbakeshwar)', district: 'Maharashtra', type: 'interstate', distanceKmFromVadodara: 380, coords: { lat: 19.9975, lng: 73.7898 }, popular: true },
  { name: 'Indore (Mahakal Corridor)', district: 'Madhya Pradesh', type: 'interstate', distanceKmFromVadodara: 340, coords: { lat: 22.7196, lng: 75.8577 }, popular: true },
  { name: 'Ujjain (Mahakaleshwar)', district: 'Madhya Pradesh', type: 'interstate', distanceKmFromVadodara: 380, coords: { lat: 23.1765, lng: 75.7885 }, popular: true },
];

export const GUJARAT_CITIES = GUJARAT_LOCATIONS;

/**
 * Verified road distances for common highway corridors
 */
const VERIFIED_HIGHWAY_PAIRS: Record<string, number> = {
  'vadodara_ahmedabad': 115,
  'ahmedabad_vadodara': 115,
  'vadodara_surat': 155,
  'surat_vadodara': 155,
  'surat_ahmedabad': 270,
  'ahmedabad_surat': 270,
  'vadodara_rajkot': 275,
  'rajkot_vadodara': 275,
  'ahmedabad_rajkot': 215,
  'rajkot_ahmedabad': 215,
  'vadodara_mumbai': 430,
  'mumbai_vadodara': 430,
  'surat_mumbai': 280,
  'mumbai_surat': 280,
  'vadodara_statue of unity': 90,
  'statue of unity_vadodara': 90,
  'vadodara_kevadia': 90,
  'kevadia_vadodara': 90,
  'ahmedabad_statue of unity': 195,
  'statue of unity_ahmedabad': 195,
  'surat_statue of unity': 155,
  'statue of unity_surat': 155,
  'vadodara_pavagadh': 48,
  'pavagadh_vadodara': 48,
  'vadodara_halol': 45,
  'halol_vadodara': 45,
  'vadodara_anand': 45,
  'anand_vadodara': 45,
  'vadodara_nadiad': 60,
  'nadiad_vadodara': 60,
  'vadodara_bharuch': 75,
  'bharuch_vadodara': 75,
  'vadodara_ankleshwar': 85,
  'ankleshwar_vadodara': 85,
  'vadodara_dahej': 120,
  'dahej_vadodara': 120,
  'vadodara_somnath': 430,
  'somnath_vadodara': 430,
  'vadodara_dwarka': 500,
  'dwarka_vadodara': 500,
  'ahmedabad_dwarka': 440,
  'dwarka_ahmedabad': 440,
  'ahmedabad_somnath': 410,
  'somnath_ahmedabad': 410,
  'vadodara_bhavnagar': 205,
  'bhavnagar_vadodara': 205,
  'ahmedabad_bhavnagar': 175,
  'bhavnagar_ahmedabad': 175,
  'vadodara_bhuj': 450,
  'bhuj_vadodara': 450,
  'ahmedabad_bhuj': 335,
  'bhuj_ahmedabad': 335,
  'vadodara_udaipur': 340,
  'udaipur_vadodara': 340,
  'vadodara_mount abu': 320,
  'mount abu_vadodara': 320,
  'vadodara_poicha': 65,
  'poicha_vadodara': 65,
  'vadodara_dakor': 70,
  'dakor_vadodara': 70,
  'vadodara_navsari': 190,
  'navsari_vadodara': 190,
  'vadodara_valsad': 235,
  'valsad_vadodara': 235,
  'vadodara_vapi': 260,
  'vapi_vadodara': 260,
};

/**
 * Haversine formula to compute road distance accurately using calibrated Gujarat highway factors
 */
function calculateHaversineRoadKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;

  // Gujarat state highway winding factor:
  // Highway road distance is approx 1.28x to 1.34x straight line distance
  const roadMultiplier = 1.31;
  return Math.max(15, Math.round(straightLine * roadMultiplier));
}

/**
 * Find matched Gujarat location from any user input string
 */
export function findMatchedGujaratLocation(query: string): GujaratLocation | undefined {
  if (!query) return undefined;
  const norm = query.toLowerCase().trim();

  // Exact match first
  let match = GUJARAT_LOCATIONS.find((loc) => loc.name.toLowerCase() === norm);
  if (match) return match;

  // Key word match
  match = GUJARAT_LOCATIONS.find((loc) => {
    const locNorm = loc.name.toLowerCase();
    return norm.includes(locNorm) || locNorm.includes(norm);
  });
  if (match) return match;

  // Match by district
  match = GUJARAT_LOCATIONS.find((loc) => norm.includes(loc.district.toLowerCase()));
  return match;
}

/**
 * Get accurate, calibrated driving distance between ANY two locations in Gujarat
 */
export function getGujaratRouteDistance(fromStr: string, toStr: string): number {
  const fromNorm = (fromStr || '').toLowerCase().trim();
  const toNorm = (toStr || '').toLowerCase().trim();

  if (!fromNorm || !toNorm) return 90;

  // Check direct verified highway pair
  const cleanFrom = fromNorm.split(/[\(,\s]/)[0];
  const cleanTo = toNorm.split(/[\(,\s]/)[0];
  const pairKey1 = `${cleanFrom}_${cleanTo}`;
  const pairKey2 = `${cleanTo}_${cleanFrom}`;

  if (VERIFIED_HIGHWAY_PAIRS[pairKey1]) return VERIFIED_HIGHWAY_PAIRS[pairKey1];
  if (VERIFIED_HIGHWAY_PAIRS[pairKey2]) return VERIFIED_HIGHWAY_PAIRS[pairKey2];

  // Specific common landmarks
  if (fromNorm.includes('vadodara') || fromNorm.includes('baroda')) {
    if (toNorm.includes('statue') || toNorm.includes('kevadia')) return 90;
    if (toNorm.includes('ahmedabad')) return 115;
    if (toNorm.includes('surat')) return 155;
    if (toNorm.includes('pavagadh') || toNorm.includes('halol')) return 48;
    if (toNorm.includes('poicha')) return 65;
    if (toNorm.includes('anand')) return 45;
    if (toNorm.includes('nadiad')) return 60;
    if (toNorm.includes('bharuch')) return 75;
    if (toNorm.includes('dahej')) return 120;
    if (toNorm.includes('rajkot')) return 275;
    if (toNorm.includes('somnath')) return 430;
    if (toNorm.includes('dwarka')) return 500;
    if (toNorm.includes('mumbai')) return 430;
    if (toNorm.includes('bhavnagar')) return 205;
    if (toNorm.includes('bhuj')) return 450;
    if (toNorm.includes('udaipur')) return 340;
    if (toNorm.includes('mount abu')) return 320;
    if (toNorm.includes('dakor')) return 70;
  }

  // Symmetric check when traveling TO Vadodara
  if (toNorm.includes('vadodara') || toNorm.includes('baroda')) {
    if (fromNorm.includes('statue') || fromNorm.includes('kevadia')) return 90;
    if (fromNorm.includes('ahmedabad')) return 115;
    if (fromNorm.includes('surat')) return 155;
    if (fromNorm.includes('pavagadh') || fromNorm.includes('halol')) return 48;
    if (fromNorm.includes('poicha')) return 65;
    if (fromNorm.includes('anand')) return 45;
    if (fromNorm.includes('nadiad')) return 60;
    if (fromNorm.includes('bharuch')) return 75;
    if (fromNorm.includes('dahej')) return 120;
    if (fromNorm.includes('rajkot')) return 275;
    if (fromNorm.includes('somnath')) return 430;
    if (fromNorm.includes('dwarka')) return 500;
    if (fromNorm.includes('mumbai')) return 430;
    if (fromNorm.includes('bhavnagar')) return 205;
    if (fromNorm.includes('bhuj')) return 450;
    if (fromNorm.includes('udaipur')) return 340;
    if (fromNorm.includes('mount abu')) return 320;
    if (fromNorm.includes('dakor')) return 70;
  }

  // Find coordinates of both locations
  const locFrom = findMatchedGujaratLocation(fromStr) || {
    coords: { lat: 22.3072, lng: 73.1812 }, // default Vadodara
    distanceKmFromVadodara: 0,
  };
  const locTo = findMatchedGujaratLocation(toStr);

  if (locTo) {
    return calculateHaversineRoadKm(
      locFrom.coords.lat,
      locFrom.coords.lng,
      locTo.coords.lat,
      locTo.coords.lng
    );
  }

  // Fallback sensible estimate
  return 110;
}

/**
 * Detect if pickup and drop address are in the same city or intra-city
 */
export function detectSameCityTrip(
  fromStr: string,
  toStr: string,
  distanceKm?: number
): {
  isSameCity: boolean;
  cityName: string;
  isAirportDrop: boolean;
  airportName?: string;
} {
  const normFrom = (fromStr || '').toLowerCase().trim();
  const normTo = (toStr || '').toLowerCase().trim();

  if (!normFrom || !normTo) {
    return { isSameCity: false, cityName: '', isAirportDrop: false };
  }

  // Check if either is airport
  const isVadodaraAirport =
    normTo.includes('vadodara airport') ||
    normTo.includes('bdq') ||
    normTo.includes('harni airport') ||
    normFrom.includes('vadodara airport') ||
    normFrom.includes('bdq') ||
    normFrom.includes('harni airport');

  const isAhmedabadAirport =
    normTo.includes('ahmedabad airport') ||
    normTo.includes('amd') ||
    normTo.includes('svpia') ||
    normFrom.includes('ahmedabad airport') ||
    normFrom.includes('amd') ||
    normFrom.includes('svpia');

  // List of recognized Gujarat city names and their common localities
  const cities = [
    {
      name: 'Vadodara',
      aliases: [
        'vadodara',
        'baroda',
        'tandalja',
        'alkapuri',
        'gotri',
        'manjalpur',
        'vasna',
        'bhayli',
        'makarpura',
        'karelibaug',
        'waghodia',
        'sama',
        'subhanpura',
        'gorwa',
        'ellora',
        'sayajigunj',
        'akota',
        'fatehgunj',
        'harni',
        'mahabalipuram',
        'atladara',
        'chhani',
        'koyali',
        'kalali',
        'sevasi',
        'sun pharma',
      ],
    },
    {
      name: 'Ahmedabad',
      aliases: [
        'ahmedabad',
        'amdavad',
        'bopal',
        'prahlad nagar',
        'maninagar',
        'sg highway',
        'navrangpura',
        'vastrapur',
        'chandkheda',
        'thaltej',
        'paldi',
        'satellite',
        'gota',
        'bodakdev',
      ],
    },
    {
      name: 'Surat',
      aliases: ['surat', 'adajan', 'varachha', 'vesu', 'rander', 'katargam', 'athwa', 'piplod'],
    },
    {
      name: 'Rajkot',
      aliases: ['rajkot', 'kalawad road', 'kuwadva', '150 feet ring road', 'morbi road', 'university road'],
    },
    {
      name: 'Anand',
      aliases: ['anand', 'vidyanagar', 'v.v. nagar', 'karamsad'],
    },
    {
      name: 'Bhavnagar',
      aliases: ['bhavnagar', 'ghogha road', 'subhashnagar'],
    },
    {
      name: 'Gandhinagar',
      aliases: ['gandhinagar', 'gift city', 'infocity', 'koba', 'sector 1', 'sector 21'],
    },
    {
      name: 'Bharuch',
      aliases: ['bharuch', 'ankleshwar', 'gnfc'],
    },
    {
      name: 'Navsari',
      aliases: ['navsari', 'jalalpore'],
    },
    {
      name: 'Valsad',
      aliases: ['valsad', 'tithal road'],
    },
    {
      name: 'Vapi',
      aliases: ['vapi', 'gunjan'],
    },
    {
      name: 'Jamnagar',
      aliases: ['jamnagar', 'digjam'],
    },
    {
      name: 'Junagadh',
      aliases: ['junagadh', 'motibaug'],
    },
  ];

  for (const c of cities) {
    const fromMatch = c.aliases.some((alias) => normFrom.includes(alias));
    const toMatch = c.aliases.some((alias) => normTo.includes(alias));
    if (fromMatch && toMatch) {
      const isAirport =
        (c.name === 'Vadodara' && isVadodaraAirport) ||
        (c.name === 'Ahmedabad' && isAhmedabadAirport);
      return {
        isSameCity: true,
        cityName: c.name,
        isAirportDrop: isAirport,
        airportName: isAirport
          ? c.name === 'Vadodara'
            ? 'Vadodara Airport (BDQ)'
            : 'Ahmedabad Airport (AMD)'
          : undefined,
      };
    }
  }

  // Exact identical search string (e.g. user typed "Vadodara" to "Vadodara")
  if (normFrom === normTo && normFrom.length > 2) {
    return {
      isSameCity: true,
      cityName: fromStr,
      isAirportDrop: false,
    };
  }

  // Check road distance: if distance is <= 30 km and neither is an outstation pilgrimage/tourist spot
  if (distanceKm !== undefined && distanceKm > 0 && distanceKm <= 30) {
    const isOutstationSpot =
      normTo.includes('statue') ||
      normTo.includes('kevadia') ||
      normTo.includes('pavagadh') ||
      normTo.includes('poicha') ||
      normTo.includes('dakor') ||
      normTo.includes('halol');
    if (!isOutstationSpot) {
      const locFrom = findMatchedGujaratLocation(fromStr);
      const locTo = findMatchedGujaratLocation(toStr);
      if (locFrom && locTo && locFrom.district.toLowerCase() === locTo.district.toLowerCase()) {
        return {
          isSameCity: true,
          cityName: locFrom.district,
          isAirportDrop: false,
        };
      }
    }
  }

  return { isSameCity: false, cityName: '', isAirportDrop: false };
}

export interface FareCalculationResult {
  vehicleId: string;
  vehicleName: string;
  category: string;
  passengers: number;
  luggage: number;
  image: string;
  tripType: 'oneway' | 'roundtrip';
  days: number;
  oneWayDistanceKm: number;
  billedDistanceKm: number;
  minKmApplied: boolean;
  ratePerKm: number;
  baseFare: number;
  driverAllowance: number;
  totalFare: number;
  breakdownSummary: string;
  oneWayNotAvailableInCsv?: boolean;
  roundTripFallbackNotice?: string;
  returnKmBilled?: boolean;
  isPredefinedFare?: boolean;
  tollIncluded?: boolean;
}

/**
 * Calculate accurate outstation fare strictly complying with Gujarat Taxi Rules:
 * - Round trip: Minimum 300 km average per day (days * 300 km min)
 * - Driver allowance: ₹300 per day (days * ₹300)
 * - One-Way > 150 km unlisted destination: Return Km included (2 x distance) + ₹300 Driver Allowance
 * - One-Way destination: Toll Tax is INCLUDED in the fare
 * - Parking and interstate permits (if any) are extra as per actual receipt
 */
export function calculateGujaratCabFare(
  vehicleId: string,
  from: string,
  to: string,
  tripType: 'oneway' | 'roundtrip',
  startDateStr?: string,
  endDateStr?: string,
  customDistanceKm?: number
): FareCalculationResult {
  const distance =
    customDistanceKm !== undefined && customDistanceKm > 0
      ? customDistanceKm
      : getGujaratRouteDistance(from, to);

  // Vehicle configs
  let vehicleName = 'Maruti Suzuki Dzire';
  let category = 'Sedan';
  let passengers = 4;
  let luggage = 2;
  let ratePerKm = 13;
  let image = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80';

  if (vehicleId === 'hatchback-wagonr') {
    vehicleName = 'Maruti WagonR / Tiago';
    category = 'Hatchback';
    passengers = 4;
    luggage = 2;
    ratePerKm = 11;
    image = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80';
  } else if (vehicleId === 'suv-ertiga') {
    vehicleName = 'Maruti Ertiga / Triber';
    category = 'SUV';
    passengers = 6;
    luggage = 3;
    ratePerKm = 16;
    image = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80';
  } else if (vehicleId === 'luxury-innova') {
    vehicleName = 'Toyota Innova Crysta';
    category = 'Luxury SUV';
    passengers = 7;
    luggage = 4;
    ratePerKm = 23;
    image = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80';
  }

  // Calculate days for round trip
  let days = 1;
  if (tripType === 'roundtrip' && startDateStr && endDateStr) {
    try {
      const d1 = new Date(startDateStr);
      const d2 = new Date(endDateStr);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      days = Math.max(1, diffDays + 1);
    } catch {
      days = 1;
    }
  }

  // =========================================================================
  // RULE 1: Check if route has an official fare updated in the CSV file
  // "jis destination ke fare already csv file me update he pehle vo fare show karna he"
  // =========================================================================
  const csvMatches = findCsvFaresForRoute(from, to, tripType);
  let matchedCsvFare: CsvPointToPointFare | undefined = undefined;

  if (vehicleId === 'sedan-dzire') {
    matchedCsvFare = csvMatches.dzire;
  } else if (vehicleId === 'suv-ertiga') {
    matchedCsvFare = csvMatches.ertiga;
  } else if (vehicleId === 'luxury-innova') {
    matchedCsvFare = csvMatches.crysta;
  } else if (vehicleId === 'hatchback-wagonr') {
    matchedCsvFare = csvMatches.dzire;
  }

  if (matchedCsvFare) {
    let packageRate = matchedCsvFare.packageRate;

    // Hatchback pricing logic based on Dzire package rate
    if (vehicleId === 'hatchback-wagonr') {
      const normTo = to.toLowerCase();
      if (normTo.includes('ahmedabad')) packageRate = 1599;
      else if (normTo.includes('statue') || normTo.includes('kevadia')) packageRate = 1799;
      else if (normTo.includes('surat')) packageRate = 1750;
      else if (normTo.includes('mumbai')) packageRate = 4800;
      else if (normTo.includes('bharuch')) packageRate = 1150;
      else if (normTo.includes('ankleshwar')) packageRate = 1180;
      else if (normTo.includes('dahej')) packageRate = 1770;
      else if (normTo.includes('anand')) packageRate = 799;
      else if (normTo.includes('nadiad')) packageRate = 980;
      else if (normTo.includes('pavagadh') || normTo.includes('halol')) packageRate = 950;
      else if (normTo.includes('godhra')) packageRate = 2600;
      else if (normTo.includes('rajkot')) packageRate = 4250;
      else if (normTo.includes('bhavnagar')) packageRate = 3150;
      else packageRate = Math.round(matchedCsvFare.packageRate * 0.85);
    }

    const csvDriverAllowancePerDay = matchedCsvFare.driverAllowance || 300;

    if (tripType === 'oneway') {
      const baseFare = packageRate;
      const driverAllowance = csvDriverAllowancePerDay;
      const totalFare = baseFare + driverAllowance;

      return {
        vehicleId,
        vehicleName,
        category,
        passengers,
        luggage,
        image,
        tripType: 'oneway',
        days: 1,
        oneWayDistanceKm: distance,
        billedDistanceKm: matchedCsvFare.includedKms || distance,
        minKmApplied: false,
        ratePerKm,
        baseFare,
        driverAllowance,
        totalFare,
        breakdownSummary: `Official CSV Tariff: One-Way Drop to ${to} (${matchedCsvFare.includedKms || distance} Km included) • Base: ₹${baseFare.toLocaleString('en-IN')} + Driver Allowance: ₹${driverAllowance} • Toll Tax Included • State Tax & Parking Extra`,
        isPredefinedFare: true,
        tollIncluded: true,
        returnKmBilled: false,
        oneWayNotAvailableInCsv: false,
      };
    } else {
      // Round trip from CSV: Base fare + Driver allowance (days * allowance/day)
      const baseFare = packageRate;
      const driverAllowance = csvDriverAllowancePerDay * days;
      const totalFare = baseFare + driverAllowance;
      const billedKm = Math.max(distance * 2, (matchedCsvFare.includedKms || 250) * (days > 1 ? days * 0.9 : 1));

      return {
        vehicleId,
        vehicleName,
        category,
        passengers,
        luggage,
        image,
        tripType: 'roundtrip',
        days,
        oneWayDistanceKm: distance,
        billedDistanceKm: Math.round(billedKm),
        minKmApplied: false,
        ratePerKm,
        baseFare,
        driverAllowance,
        totalFare,
        breakdownSummary:
          days > 1
            ? `Official CSV Tariff: ${days} Days Round-Trip to ${to} • Base: ₹${baseFare.toLocaleString('en-IN')} + Driver Allowance: ₹${driverAllowance} (${days} × ₹${csvDriverAllowancePerDay}/day) • Toll, State Tax & Parking Extra`
            : `Official CSV Tariff: Round-Trip Return to ${to} • Base: ₹${baseFare.toLocaleString('en-IN')} + Driver Allowance: ₹${driverAllowance} • Toll, State Tax & Parking Extra`,
        isPredefinedFare: true,
        tollIncluded: false,
        returnKmBilled: false,
        oneWayNotAvailableInCsv: false,
      };
    }
  }

  // =========================================================================
  // RULE 2 & 3: Route fare is NOT updated in CSV
  // "agar csv file me fare update nahi or oneway fare ho to:
  //  - under 150km ka minimum 300km ka fare count karna he,
  //  - agar distance 150km se ziyada he to return fare count karna he"
  //  - Oneway destinations me toll include he!
  // =========================================================================
  if (tripType === 'oneway') {
    if (distance <= 150) {
      // Under 150 km: Minimum 300 km rule!
      const billedDistanceKm = 300;
      const baseFare = billedDistanceKm * ratePerKm;
      const driverAllowance = 300;
      const totalFare = baseFare + driverAllowance;

      return {
        vehicleId,
        vehicleName,
        category,
        passengers,
        luggage,
        image,
        tripType: 'oneway',
        days: 1,
        oneWayDistanceKm: distance,
        billedDistanceKm: 300,
        minKmApplied: true,
        ratePerKm,
        baseFare,
        driverAllowance,
        totalFare,
        breakdownSummary: `${distance} Km One-Way Drop (Not in CSV • Under 150 Km: Min 300 Km applied: 300 Km @ ₹${ratePerKm}/km = ₹${baseFare.toLocaleString('en-IN')}) + ₹${driverAllowance} Driver Allowance • Toll Tax Included • State Tax & Parking Extra`,
        returnKmBilled: false,
        isPredefinedFare: false,
        tollIncluded: true,
        oneWayNotAvailableInCsv: true,
      };
    } else {
      // Distance > 150 km: Return km counted!
      const returnDistanceKm = distance * 2;
      const baseFare = returnDistanceKm * ratePerKm;
      const driverAllowance = 300;
      const totalFare = baseFare + driverAllowance;

      return {
        vehicleId,
        vehicleName,
        category,
        passengers,
        luggage,
        image,
        tripType: 'oneway',
        days: 1,
        oneWayDistanceKm: distance,
        billedDistanceKm: returnDistanceKm,
        minKmApplied: false,
        ratePerKm,
        baseFare,
        driverAllowance,
        totalFare,
        breakdownSummary: `${distance} Km One-Way Drop (Not in CSV • Distance > 150 Km: Return Km billed ${returnDistanceKm} Km @ ₹${ratePerKm}/km = ₹${baseFare.toLocaleString('en-IN')}) + ₹${driverAllowance} Driver Allowance • Toll Tax Included • State Tax & Parking Extra`,
        returnKmBilled: true,
        isPredefinedFare: false,
        tollIncluded: true,
        oneWayNotAvailableInCsv: true,
      };
    }
  }

  // ==========================================
  // ROUND TRIP CALCULATION - GUJARAT STANDARD (when not in CSV)
  // - Minimum 300 Km average per day
  // - Driver Allowance: ₹300 per day
  // - Toll, State Tax & Parking Extra
  // ==========================================
  const minKmRequired = days * 300;
  const actualTwoWayKm = distance * 2;
  const billedKm = Math.max(actualTwoWayKm, minKmRequired);
  const minKmApplied = minKmRequired > actualTwoWayKm;

  const baseFare = billedKm * ratePerKm;
  const driverAllowance = days * 300; // ₹300 per day driver allowance
  const totalFare = baseFare + driverAllowance;

  const breakdownSummary = minKmApplied
    ? `${days} Day(s) Round Trip • Min 300 Km/day avg applied (${minKmRequired} Km @ ₹${ratePerKm}/km) + ₹${driverAllowance} Driver Allowance (${days} × ₹300/day) • Toll, State Tax & Parking Extra`
    : `${actualTwoWayKm} Km Round Trip (${days} Day(s) @ ₹${ratePerKm}/km) + ₹${driverAllowance} Driver Allowance (${days} × ₹300/day) • Toll, State Tax & Parking Extra`;

  return {
    vehicleId,
    vehicleName,
    category,
    passengers,
    luggage,
    image,
    tripType: 'roundtrip',
    days,
    oneWayDistanceKm: distance,
    billedDistanceKm: billedKm,
    minKmApplied,
    ratePerKm,
    baseFare,
    driverAllowance,
    totalFare,
    breakdownSummary,
    returnKmBilled: false,
    isPredefinedFare: false,
    oneWayNotAvailableInCsv: false,
  };
}
