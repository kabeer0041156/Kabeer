/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BookingCalculator } from './components/BookingCalculator';
import { PopularRoutesSection } from './components/PopularRoutesSection';
import { StatueOfUnitySpotlight } from './components/StatueOfUnitySpotlight';
import { FleetSection } from './components/FleetSection';
import { LocationMapSection } from './components/LocationMapSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { BookingReceiptModal } from './components/BookingReceiptModal';
import { PaymentCheckoutModal } from './components/PaymentCheckoutModal';
import { CsvFareLookupSection } from './components/CsvFareLookupSection';
import { BookingFormData, BookingRecord, RoutePackage, PaymentInfo } from './types';
import { BUSINESS_INFO } from './data/travelData';
import { openOwnerWhatsAppNotification } from './data/whatsappUtils';

export default function App() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('sedan-dzire');
  const [initialRoute, setInitialRoute] = useState<{
    pickup?: string;
    drop?: string;
    vehicleId?: string;
    tripType?: 'oneway' | 'roundtrip';
    category?: 'airport' | 'outstation' | 'local';
    hours?: number;
    autoOpenBooking?: boolean;
    timestamp?: number;
  } | null>(null);
  const [savedBookings, setSavedBookings] = useState<BookingRecord[]>(() => {
    try {
      const stored = localStorage.getItem('kabeer_travels_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeSuccessBooking, setActiveSuccessBooking] = useState<BookingRecord | null>(null);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [receiptBooking, setReceiptBooking] = useState<BookingRecord | null>(null);
  const [checkoutBooking, setCheckoutBooking] = useState<BookingRecord | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kabeer_travels_bookings', JSON.stringify(savedBookings));
    } catch (e) {
      console.error('Could not save bookings to localStorage', e);
    }
  }, [savedBookings]);

  const handleBookingConfirmed = (
    bookingData: BookingFormData & { estimatedFare: number; id: string; payment?: PaymentInfo }
  ) => {
    const payment = bookingData.payment || {
      option: 'pay_driver',
      status: 'Pending (Pay in Cab)',
      totalFare: bookingData.estimatedFare,
      discount: 0,
      amountPaid: 0,
      amountDue: bookingData.estimatedFare,
    };

    const newRecord: BookingRecord = {
      ...bookingData,
      payment,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    setSavedBookings((prev) => [newRecord, ...prev]);
    setActiveSuccessBooking(newRecord);

    // Trigger WhatsApp notification to owner (+91 88664 78812) with booking and payment status
    setTimeout(() => {
      openOwnerWhatsAppNotification(newRecord);
    }, 500);
  };

  const handleUpdatePayment = (bookingId: string, updatedPayment: PaymentInfo) => {
    setSavedBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, payment: updatedPayment } : b))
    );
    if (activeSuccessBooking?.id === bookingId) {
      setActiveSuccessBooking((prev) => (prev ? { ...prev, payment: updatedPayment } : null));
    }
    if (receiptBooking?.id === bookingId) {
      setReceiptBooking((prev) => (prev ? { ...prev, payment: updatedPayment } : null));
    }
    setCheckoutBooking(null);

    // Notify owner on WhatsApp when payment is made
    if (updatedPayment.status === 'Fully Paid' || updatedPayment.status === 'Advance Paid') {
      const target = checkoutBooking || activeSuccessBooking || savedBookings.find((b) => b.id === bookingId);
      if (target) {
        setTimeout(() => {
          openOwnerWhatsAppNotification({ ...target, id: bookingId, payment: updatedPayment });
        }, 500);
      }
    }
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSelectRoute = (route: RoutePackage) => {
    setSelectedVehicleId('sedan-dzire');
    setInitialRoute({
      pickup: route.from || 'Vadodara',
      drop: route.to,
      vehicleId: 'sedan-dzire',
      tripType: 'oneway',
      category: 'outstation',
    });
    handleScrollToCalculator();
  };

  const handleBookSOU = () => {
    setSelectedVehicleId('suv-ertiga');
    setInitialRoute({
      pickup: 'Vadodara',
      drop: 'Statue of Unity',
      vehicleId: 'suv-ertiga',
      tripType: 'roundtrip',
      category: 'outstation',
    });
    handleScrollToCalculator();
  };

  const handleSelectCsvFare = (
    source: string,
    destination: string,
    vehicleId: string,
    tripType: 'oneway' | 'roundtrip',
    category?: 'outstation' | 'local' | 'airport',
    hours?: number
  ) => {
    setSelectedVehicleId(vehicleId);
    setInitialRoute({
      pickup: source,
      drop: destination,
      vehicleId,
      tripType,
      category: category || 'outstation',
      hours,
      autoOpenBooking: true,
      timestamp: Date.now(),
    });
    handleScrollToCalculator();
  };

  const handleClearHistory = () => {
    setSavedBookings([]);
    localStorage.removeItem('kabeer_travels_bookings');
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-white flex flex-col antialiased selection:bg-white selection:text-black font-sans">
      {/* Top sticky navigation */}
      <Header
        onBookClick={handleScrollToCalculator}
        onMyBookingsClick={() => setShowMyBookings(true)}
        savedBookingsCount={savedBookings.length}
      />

      <main className="flex-1">
        {/* Hero Banner with direct call & whatsapp links */}
        <HeroSection
          onExploreFleet={() => {
            const el = document.getElementById('fleet');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive Booking & Instant Fare Calculator (Placed prominently directly below Hero) */}
        <section className="relative -mt-10 z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <BookingCalculator
            selectedVehicleId={selectedVehicleId}
            initialRoute={initialRoute}
            onVehicleSelect={(id) => setSelectedVehicleId(id)}
            onBookingConfirmed={handleBookingConfirmed}
          />
        </section>

        {/* Why Choose Us trust factors */}
        <WhyChooseUsSection />

        {/* Popular Outstation Routes from Vadodara */}
        <PopularRoutesSection onSelectRoute={handleSelectRoute} />

        {/* Special Statue of Unity Kevadia Tour Spotlight */}
        <StatueOfUnitySpotlight onBookSOU={handleBookSOU} />

        {/* Fleet & Tariff Showcase */}
        <FleetSection onSelectVehicle={(id) => setSelectedVehicleId(id)} />

        {/* Official CSV Tariff & Fare Search Section */}
        <CsvFareLookupSection onSelectRouteFare={handleSelectCsvFare} />

        {/* Google Maps & Office Location in Tandalja, Vadodara */}
        <LocationMapSection />

        {/* Verified Customer Reviews */}
        <ReviewsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar */}
      <FloatingActionBar 
        onBookClick={handleScrollToCalculator} 
      />

      {/* Booking Confirmation Dialog */}
      <BookingSuccessModal
        booking={activeSuccessBooking}
        onClose={() => setActiveSuccessBooking(null)}
        onViewReceipt={(booking) => setReceiptBooking(booking)}
        onPayBalance={(booking) => setCheckoutBooking(booking)}
      />

      {/* My Saved Bookings Modal */}
      {showMyBookings && (
        <MyBookingsModal
          bookings={savedBookings}
          onClose={() => setShowMyBookings(false)}
          onClear={handleClearHistory}
          onViewReceipt={(booking) => setReceiptBooking(booking)}
        />
      )}

      {/* Official Tax E-Receipt & Voucher Modal */}
      {receiptBooking && (
        <BookingReceiptModal
          booking={receiptBooking}
          onClose={() => setReceiptBooking(null)}
        />
      )}

      {/* Standalone Checkout Modal (e.g. from history or success modal balance pay) */}
      {checkoutBooking && (
        <PaymentCheckoutModal
          isOpen={true}
          onClose={() => setCheckoutBooking(null)}
          bookingDraft={{
            id: checkoutBooking.id,
            serviceCategory: checkoutBooking.serviceCategory,
            tripType: checkoutBooking.tripType,
            pickupLocation: checkoutBooking.pickupLocation,
            dropLocation: checkoutBooking.dropLocation,
            pickupDate: checkoutBooking.pickupDate,
            pickupTime: checkoutBooking.pickupTime,
            vehicleId: checkoutBooking.vehicleId,
            customerName: checkoutBooking.customerName,
            customerPhone: checkoutBooking.customerPhone,
            totalFare: checkoutBooking.payment?.totalFare || checkoutBooking.estimatedFare,
            discount: checkoutBooking.payment?.discount || 0,
            promoCode: checkoutBooking.payment?.promoCode,
            isGstRequired: checkoutBooking.payment?.isGstRequired,
            companyName: checkoutBooking.payment?.companyName,
            gstNumber: checkoutBooking.payment?.gstNumber,
          }}
          initialOption={checkoutBooking.payment?.option || 'advance_20'}
          onPaymentSuccess={(updatedPayment) => {
            handleUpdatePayment(checkoutBooking.id, updatedPayment);
          }}
        />
      )}
    </div>
  );
}
