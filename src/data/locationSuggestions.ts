/**
 * Location suggestions and verified driving distance matrix
 * Kabeer Travels - Vadodara & Gujarat
 */
import { getGujaratRouteDistance, findMatchedGujaratLocation, GUJARAT_LOCATIONS } from './gujaratCities';

export interface LocationItem {
  id: string;
  name: string;
  category: 'airport' | 'station' | 'locality' | 'tourist' | 'city' | 'industrial' | 'pilgrimage';
  subtitle: string;
  city: string;
  pincode?: string;
  coords: { lat: number; lng: number };
  popular?: boolean;
}

export interface RouteDetail {
  pickup: string;
  drop: string;
  distanceKm: number;
  durationText: string;
  viaHighway: string;
  pickupCoords: { lat: number; lng: number };
  dropCoords: { lat: number; lng: number };
  tollEstimate?: number;
  isExpressway?: boolean;
}

// Comprehensive Pickup Locations in and around Vadodara with Pincode Suggestions
export const VADODARA_PICKUP_POINTS: LocationItem[] = [
  {
    id: 'vad-mahabalipuram',
    name: 'Mahabalipuram Society Gate Number 2',
    category: 'locality',
    subtitle: 'Near Sun Pharma Rd, Tandalja, Vadodara 390020',
    city: 'Vadodara',
    pincode: '390020',
    coords: { lat: 22.2856, lng: 73.1558 },
    popular: true,
  },
  {
    id: 'vad-office',
    name: 'Sun Pharma Rd, Tandalja (Kabeer Travels Office)',
    category: 'locality',
    subtitle: 'Near Zydus API Park, Tandalja, Vadodara 390020',
    city: 'Vadodara',
    pincode: '390020',
    coords: { lat: 22.2882, lng: 73.1534 },
    popular: true,
  },
  {
    id: 'vad-alkapuri',
    name: 'Alkapuri Central / RC Dutt Road',
    category: 'locality',
    subtitle: 'Express Hotel / Center Square Mall Area, Vadodara 390007',
    city: 'Vadodara',
    pincode: '390007',
    coords: { lat: 22.3107, lng: 73.1712 },
    popular: true,
  },
  {
    id: 'vad-vasna-bhayli',
    name: 'Vasna - Bhayli Canal Road / Nilamber Palms',
    category: 'locality',
    subtitle: 'Bright Day School / Nilamber Palms Area, Vadodara 390015',
    city: 'Vadodara',
    pincode: '390015',
    coords: { lat: 22.2925, lng: 73.1235 },
    popular: true,
  },
  {
    id: 'vad-akota',
    name: 'Akota Main Road & Garden',
    category: 'locality',
    subtitle: 'Near Akota Bridge / BPC Road, Vadodara 390020',
    city: 'Vadodara',
    pincode: '390020',
    coords: { lat: 22.2985, lng: 73.1702 },
    popular: true,
  },
  {
    id: 'vad-gotri',
    name: 'Gotri Road / GMERS Medical College / Yash Complex',
    category: 'locality',
    subtitle: 'Gotri Hospital / Yash Complex, Vadodara 390021',
    city: 'Vadodara',
    pincode: '390021',
    coords: { lat: 22.3168, lng: 73.1417 },
    popular: true,
  },
  {
    id: 'vad-manjalpur',
    name: 'Manjalpur / Darbar Chokdi / Shreyas',
    category: 'locality',
    subtitle: 'Shreyas School / Sports Complex, Vadodara 390011',
    city: 'Vadodara',
    pincode: '390011',
    coords: { lat: 22.2635, lng: 73.1932 },
    popular: true,
  },
  {
    id: 'vad-airport',
    name: 'Vadodara Airport (BDQ Terminal)',
    category: 'airport',
    subtitle: 'Civil Aerodrome, Harni Road, Vadodara 390022',
    city: 'Vadodara',
    pincode: '390022',
    coords: { lat: 22.3325, lng: 73.2263 },
    popular: true,
  },
  {
    id: 'vad-railway',
    name: 'Vadodara Junction Railway Station',
    category: 'station',
    subtitle: 'Platform 1 / Platform 6 (Sayajigunj Entrance), Vadodara 390002',
    city: 'Vadodara',
    pincode: '390002',
    coords: { lat: 22.3106, lng: 73.1812 },
    popular: true,
  },
  {
    id: 'vad-fatehgunj',
    name: 'Fatehgunj / MS University Main Campus',
    category: 'locality',
    subtitle: 'Head Post Office / Narhari Hospital, Vadodara 390002',
    city: 'Vadodara',
    pincode: '390002',
    coords: { lat: 22.3214, lng: 73.1895 },
    popular: true,
  },
  {
    id: 'vad-karelibaug',
    name: 'Karelibaug / Bahucharaji Road / Amrapali',
    category: 'locality',
    subtitle: 'Amrapali Complex / Swaminarayan Mandir, Vadodara 390018',
    city: 'Vadodara',
    pincode: '390018',
    coords: { lat: 22.3275, lng: 73.2031 },
  },
  {
    id: 'vad-atladara',
    name: 'Atladara / BAPS Swaminarayan Mandir Road',
    category: 'locality',
    subtitle: 'Bill - Atladara Road, Vadodara 390012',
    city: 'Vadodara',
    pincode: '390012',
    coords: { lat: 22.2741, lng: 73.1512 },
  },
  {
    id: 'vad-subhanpura',
    name: 'Subhanpura / High Tension Road / Ellora Park',
    category: 'locality',
    subtitle: 'Samta Ground / Subhanpura Post Office, Vadodara 390023',
    city: 'Vadodara',
    pincode: '390023',
    coords: { lat: 22.3255, lng: 73.1582 },
  },
  {
    id: 'vad-sama-savli',
    name: 'Sama - Savli Road / L&T Circle',
    category: 'locality',
    subtitle: 'Navrachana University / EME Temple Area, Vadodara 390024',
    city: 'Vadodara',
    pincode: '390024',
    coords: { lat: 22.3481, lng: 73.2085 },
  },
  {
    id: 'vad-makarpura',
    name: 'Makarpura GIDC / Bus Terminal',
    category: 'industrial',
    subtitle: 'National Highway 48 Bypass, Vadodara 390010',
    city: 'Vadodara',
    pincode: '390010',
    coords: { lat: 22.2465, lng: 73.1978 },
  },
  {
    id: 'vad-sayajigunj',
    name: 'Sayajigunj / Kala Ghoda Circle',
    category: 'locality',
    subtitle: 'Sayaji Baug Zoo & Museum, Vadodara 390005',
    city: 'Vadodara',
    pincode: '390005',
    coords: { lat: 22.3115, lng: 73.1852 },
  },
  {
    id: 'vad-waghodia',
    name: 'Waghodia Road / Parul University Gate',
    category: 'locality',
    subtitle: 'Khatamba / Waghodia Chokdi, Vadodara 390019',
    city: 'Vadodara',
    pincode: '390019',
    coords: { lat: 22.2854, lng: 73.2541 },
  },
  {
    id: 'vad-gorwa',
    name: 'Gorwa / BIDC / Refinery Road',
    category: 'locality',
    subtitle: 'Panchvati / Gorwa Workshop, Vadodara 390016',
    city: 'Vadodara',
    pincode: '390016',
    coords: { lat: 22.3352, lng: 73.1510 },
  },
  {
    id: 'vad-bus-station',
    name: 'Central Bus Station (GSRTC Baroda Central)',
    category: 'station',
    subtitle: 'Opposite Railway Station, Sayajigunj, Vadodara 390002',
    city: 'Vadodara',
    pincode: '390002',
    coords: { lat: 22.3125, lng: 73.1825 },
  },
];

// Comprehensive Drop Destinations across Gujarat & Neighboring hubs
export const GUJARAT_DROP_DESTINATIONS: LocationItem[] = [
  {
    id: 'dest-vadodara-city',
    name: 'Vadodara',
    category: 'city',
    subtitle: 'Alkapuri, Gotri, Manjalpur, Karelibaug, Sayajigunj, Tandalja',
    city: 'Vadodara',
    coords: { lat: 22.3072, lng: 73.1812 },
    popular: true,
  },
  {
    id: 'dest-vadodara-airport',
    name: 'Vadodara Airport (BDQ)',
    category: 'airport',
    subtitle: 'Harni Road, Civil Aerodrome, Vadodara',
    city: 'Vadodara',
    coords: { lat: 22.3352, lng: 73.2263 },
    popular: true,
  },
  {
    id: 'dest-vadodara-station',
    name: 'Vadodara Railway Station (BRC)',
    category: 'station',
    subtitle: 'Sayajigunj, Platform 1 & Platform 6, Vadodara',
    city: 'Vadodara',
    coords: { lat: 22.3108, lng: 73.1810 },
    popular: true,
  },
  {
    id: 'dest-sou',
    name: 'Statue of Unity (Kevadia)',
    category: 'tourist',
    subtitle: 'Sardar Sarovar Dam, Valley of Flowers, Narmada (90 Km)',
    city: 'Kevadia',
    coords: { lat: 21.8380, lng: 73.7191 },
    popular: true,
  },
  {
    id: 'dest-amd-airport',
    name: 'Ahmedabad Airport (SVP Int’l - AMD)',
    category: 'airport',
    subtitle: 'Terminal 1 & Terminal 2, Hansol, Ahmedabad (115 Km)',
    city: 'Ahmedabad',
    coords: { lat: 23.0772, lng: 72.6347 },
    popular: true,
  },
  {
    id: 'dest-amd-city',
    name: 'Ahmedabad City',
    category: 'city',
    subtitle: 'SG Highway, Paldi, Ashram Road, Prahlad Nagar (110 Km)',
    city: 'Ahmedabad',
    coords: { lat: 23.0225, lng: 72.5714 },
    popular: true,
  },
  {
    id: 'dest-surat',
    name: 'Surat Diamond & Textile City',
    category: 'city',
    subtitle: 'Varachha, Ring Road, Dumas, Adajan, Surat (155 Km)',
    city: 'Surat',
    coords: { lat: 21.1702, lng: 72.8311 },
    popular: true,
  },
  {
    id: 'dest-pavagadh',
    name: 'Pavagadh / Halol (Mahakali Mandir)',
    category: 'pilgrimage',
    subtitle: 'Machi Ropeway, Champaner UNESCO Site, Panchmahal (48 Km)',
    city: 'Pavagadh',
    coords: { lat: 22.4635, lng: 73.5325 },
    popular: true,
  },
  {
    id: 'dest-poicha',
    name: 'Poicha (Nilkanthdham Swaminarayan Temple)',
    category: 'pilgrimage',
    subtitle: 'Narmada River Bank, Sahajanand Universe (65 Km)',
    city: 'Poicha',
    coords: { lat: 21.8952, lng: 73.4985 },
    popular: true,
  },
  {
    id: 'dest-gandhinagar',
    name: 'Gandhinagar (GIFT City & Capital)',
    category: 'city',
    subtitle: 'Akshardham Temple, Infocity, Sector 1-30 (135 Km)',
    city: 'Gandhinagar',
    coords: { lat: 23.2156, lng: 72.6369 },
    popular: true,
  },
  {
    id: 'dest-bharuch',
    name: 'Bharuch & Ankleshwar GIDC',
    category: 'industrial',
    subtitle: 'Narmada Maiya Bridge, Golden Bridge, GNFC Area (75 Km)',
    city: 'Bharuch',
    coords: { lat: 21.7051, lng: 72.9959 },
    popular: true,
  },
  {
    id: 'dest-dahej',
    name: 'Dahej Port & PCPIR SEZ',
    category: 'industrial',
    subtitle: 'Petrochemical SEZ, Adani Port, Reliance Dahej (120 Km)',
    city: 'Dahej',
    coords: { lat: 21.7125, lng: 72.5852 },
    popular: true,
  },
  {
    id: 'dest-anand',
    name: 'Anand (Milk City & Amul Dairy)',
    category: 'city',
    subtitle: 'Amul Plant, Vallabh Vidyanagar Educational Hub (45 Km)',
    city: 'Anand',
    coords: { lat: 22.5645, lng: 72.9289 },
    popular: true,
  },
  {
    id: 'dest-nadiad',
    name: 'Nadiad (Santram Mandir)',
    category: 'pilgrimage',
    subtitle: 'Expressway exit, Muljibhai Patel Hospital (60 Km)',
    city: 'Nadiad',
    coords: { lat: 22.6916, lng: 72.8634 },
  },
  {
    id: 'dest-dakor',
    name: 'Dakor (Ranchhodraiji Temple)',
    category: 'pilgrimage',
    subtitle: 'Gomti Lake, Krishna Mandir, Kheda District (70 Km)',
    city: 'Dakor',
    coords: { lat: 22.7562, lng: 73.1502 },
  },
  {
    id: 'dest-rajkot',
    name: 'Rajkot (Saurashtra Hub)',
    category: 'city',
    subtitle: 'Kalawad Road, Yagnik Road, Hirasar Airport (275 Km)',
    city: 'Rajkot',
    coords: { lat: 22.3039, lng: 70.8022 },
    popular: true,
  },
  {
    id: 'dest-somnath',
    name: 'Somnath Jyotirlinga (Veraval)',
    category: 'pilgrimage',
    subtitle: 'First 12 Jyotirlinga, Triveni Sangam, Gir Somnath (430 Km)',
    city: 'Somnath',
    coords: { lat: 20.8880, lng: 70.4010 },
    popular: true,
  },
  {
    id: 'dest-dwarka',
    name: 'Dwarka (Jagat Mandir)',
    category: 'pilgrimage',
    subtitle: 'Dwarkadhish Temple, Bet Dwarka, Gomti Ghat (500 Km)',
    city: 'Dwarka',
    coords: { lat: 22.2442, lng: 68.9685 },
    popular: true,
  },
  {
    id: 'dest-sasangir',
    name: 'Sasan Gir (National Park & Lion Safari)',
    category: 'tourist',
    subtitle: 'Sinh Sadan, Asiatic Lion Sanctuary, Junagadh (410 Km)',
    city: 'Sasan Gir',
    coords: { lat: 21.1642, lng: 70.5824 },
  },
  {
    id: 'dest-mumbai-airport',
    name: 'Mumbai Airport (CSMIA - BOM T1/T2)',
    category: 'airport',
    subtitle: 'Sahar / Domestic Vile Parle, Mumbai (440 Km)',
    city: 'Mumbai',
    coords: { lat: 19.0896, lng: 72.8656 },
    popular: true,
  },
  {
    id: 'dest-mumbai-city',
    name: 'Mumbai City (Bandra / Borivali / Andheri)',
    category: 'city',
    subtitle: 'Western Express Highway / South Mumbai (430 Km)',
    city: 'Mumbai',
    coords: { lat: 19.0760, lng: 72.8777 },
    popular: true,
  },
  {
    id: 'dest-vapi',
    name: 'Vapi & Daman Beach',
    category: 'industrial',
    subtitle: 'Vapi GIDC, Devka Beach, Nani Daman (260 Km)',
    city: 'Vapi',
    coords: { lat: 20.3712, lng: 72.9048 },
  },
  {
    id: 'dest-valsad',
    name: 'Valsad & Tithal Beach',
    category: 'city',
    subtitle: 'Swaminarayan Mandir, Tithal Beach, NH-48 (235 Km)',
    city: 'Valsad',
    coords: { lat: 20.5992, lng: 72.9342 },
  },
  {
    id: 'dest-udaipur',
    name: 'Udaipur (City of Lakes - Rajasthan)',
    category: 'tourist',
    subtitle: 'Lake Pichola, Fatehsagar, City Palace (340 Km)',
    city: 'Udaipur',
    coords: { lat: 24.5854, lng: 73.7125 },
    popular: true,
  },
  {
    id: 'dest-mountabu',
    name: 'Mount Abu (Hill Station - Rajasthan)',
    category: 'tourist',
    subtitle: 'Nakki Lake, Dilwara Jain Temples, Sunset Point (320 Km)',
    city: 'Mount Abu',
    coords: { lat: 24.5926, lng: 72.7156 },
  },
  {
    id: 'dest-sarangpur',
    name: 'Sarangpur (Kashtbhanjan Hanuman Mandir)',
    category: 'pilgrimage',
    subtitle: 'Botad District, King of Salangpur Mandir (175 Km)',
    city: 'Sarangpur',
    coords: { lat: 22.1485, lng: 71.8965 },
  },
  {
    id: 'dest-bhavnagar',
    name: 'Bhavnagar & Palitana',
    category: 'city',
    subtitle: 'Takhteshwar Temple, Dholera Expressway Route (205 Km)',
    city: 'Bhavnagar',
    coords: { lat: 21.7645, lng: 72.1519 },
  },
  {
    id: 'dest-bhuj',
    name: 'Bhuj & Rann of Kutch (White Desert)',
    category: 'tourist',
    subtitle: 'Aina Mahal, Dhordo Tent City, Kutch (450 Km)',
    city: 'Bhuj',
    coords: { lat: 23.2420, lng: 69.6669 },
  },
];

// Combined Pickup suggestions spanning Vadodara localities and ALL Gujarat cities, talukas & villages
export const ALL_GUJARAT_PICKUP_POINTS: LocationItem[] = [
  ...VADODARA_PICKUP_POINTS,
  ...GUJARAT_LOCATIONS.map((loc) => ({
    id: `guj-loc-${loc.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: loc.name,
    category: (loc.type === 'airport' ? 'airport' : loc.type === 'attraction' ? 'tourist' : 'city') as LocationItem['category'],
    subtitle: `${loc.district} District, Gujarat`,
    city: loc.district,
    coords: loc.coords,
    popular: loc.popular,
  })),
];

// Combined Drop destinations spanning Major Tourist/Hub destinations AND ALL Gujarat cities, talukas & villages
export const ALL_GUJARAT_DROP_DESTINATIONS: LocationItem[] = [
  ...GUJARAT_DROP_DESTINATIONS,
  ...GUJARAT_LOCATIONS.filter(
    (loc) => !GUJARAT_DROP_DESTINATIONS.some((d) => d.name.toLowerCase().includes(loc.name.toLowerCase()))
  ).map((loc) => ({
    id: `dest-all-${loc.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: loc.name,
    category: (loc.type === 'airport' ? 'airport' : loc.type === 'attraction' ? 'tourist' : 'city') as LocationItem['category'],
    subtitle: `${loc.district} District, Gujarat`,
    city: loc.district,
    coords: loc.coords,
    popular: loc.popular,
  })),
];

/**
 * Calculates the exact calibrated road route and km distance between any pickup and drop
 */
export function getDetailedRoute(
  pickupStr: string,
  dropStr: string
): RouteDetail {
  const normPickup = (pickupStr || '').toLowerCase().trim();
  const normDrop = (dropStr || '').toLowerCase().trim();

  // Find exact pickup point or match from Gujarat locations
  let pickupPoint = ALL_GUJARAT_PICKUP_POINTS.find(
    (p) => normPickup.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(normPickup)
  );
  let pickupCoords = pickupPoint ? pickupPoint.coords : { lat: 22.3072, lng: 73.1812 };

  if (!pickupPoint) {
    const matchedFrom = findMatchedGujaratLocation(pickupStr);
    if (matchedFrom) {
      pickupCoords = matchedFrom.coords;
      pickupPoint = {
        id: `loc-${matchedFrom.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: matchedFrom.name,
        category: matchedFrom.type === 'airport' ? 'airport' : 'city',
        subtitle: `${matchedFrom.district} District, Gujarat`,
        city: matchedFrom.district,
        coords: matchedFrom.coords,
      };
    } else {
      pickupPoint = VADODARA_PICKUP_POINTS[0];
    }
  }

  // Find drop destination
  let dropDest = GUJARAT_DROP_DESTINATIONS.find(
    (d) => normDrop.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(normDrop)
  );
  let dropCoords = dropDest ? dropDest.coords : { lat: 23.0225, lng: 72.5714 };

  if (!dropDest) {
    const matchedTo = findMatchedGujaratLocation(dropStr);
    if (matchedTo) {
      dropCoords = matchedTo.coords;
      dropDest = {
        id: `dest-${matchedTo.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: matchedTo.name,
        category: matchedTo.type === 'attraction' ? 'tourist' : matchedTo.type === 'airport' ? 'airport' : 'city',
        subtitle: `${matchedTo.district} District, Gujarat`,
        city: matchedTo.district,
        coords: matchedTo.coords,
      };
    }
  }

  // Exact point-to-point highway distance
  const distanceKm = getGujaratRouteDistance(pickupStr, dropStr);

  // Compute realistic road duration based on Gujarat highway speed
  let durationText = '';
  if (distanceKm <= 35) {
    durationText = `${Math.max(20, Math.round(distanceKm * 1.6))} min`;
  } else {
    const totalMin = Math.round((distanceKm / 58) * 60);
    const hrs = Math.floor(totalMin / 60);
    const mins = totalMin % 60;
    durationText = hrs > 0 ? `${hrs} hr ${mins > 0 ? `${mins} min` : ''}`.trim() : `${mins} min`;
  }

  // Highway corridor details & estimated toll
  let viaHighway = 'via Gujarat State Highway';
  let isExpressway = false;
  let tollEstimate = 0;

  if (normDrop.includes('ahmedabad') || (normPickup.includes('ahmedabad') && normDrop.includes('vadodara'))) {
    viaHighway = 'via NE-1 (National Expressway 1)';
    isExpressway = true;
    tollEstimate = 145;
  } else if (normDrop.includes('statue') || normDrop.includes('kevadia')) {
    viaHighway = 'via Vadodara - Dabhoi - Tilakwada SH-11';
    isExpressway = true;
    tollEstimate = 85;
  } else if (normDrop.includes('surat') || normDrop.includes('mumbai') || normDrop.includes('bharuch')) {
    viaHighway = 'via NH-48 (Golden Quadrilateral Corridor)';
    isExpressway = true;
    tollEstimate = Math.round(distanceKm * 1.25);
  } else if (normDrop.includes('rajkot') || normDrop.includes('somnath') || normDrop.includes('dwarka')) {
    viaHighway = 'via NH-47 (Bagodara - Limbdi - Chotila Expressway)';
    isExpressway = true;
    tollEstimate = Math.round(distanceKm * 0.95);
  } else {
    tollEstimate = Math.max(0, Math.round(distanceKm * 0.75));
  }

  return {
    pickup: pickupPoint.name,
    drop: dropDest ? dropDest.name : dropStr,
    distanceKm,
    durationText,
    viaHighway,
    pickupCoords,
    dropCoords,
    tollEstimate,
    isExpressway,
  };
}
