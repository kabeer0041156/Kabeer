import { BookingRecord } from '../types';
import { BUSINESS_INFO, VEHICLES } from './travelData';

/**
 * Generates formatted WhatsApp message containing complete booking and payment confirmation details
 * for the business owner (+91 88664 78812 / Kabeer Travels).
 */
export function buildOwnerWhatsAppBookingMessage(booking: BookingRecord): string {
  const vehicle = VEHICLES.find((v) => v.id === booking.vehicleId);
  const vehicleName = vehicle?.name || booking.vehicleId;
  const payment = booking.payment;
  const isPaid = payment && (payment.status === 'Fully Paid' || payment.status === 'Advance Paid');
  const isOneWay = booking.tripType === 'oneway';

  const lines = [
    `🚕 *NEW BOOKING CONFIRMED & ${isPaid ? 'PAYMENT DONE ✅' : 'CAB BOOKING'}*`,
    '━━━━━━━━━━━━━━━━━━━━',
    `🆔 *Booking ID:* ${booking.id}`,
    `👤 *Customer:* ${booking.customerName}`,
    `📞 *Mobile:* ${booking.customerPhone}`,
    booking.customerEmail ? `📧 *Email:* ${booking.customerEmail}` : '',
    `📍 *Pickup:* ${booking.pickupLocation}`,
    `🏁 *Drop:* ${booking.dropLocation}`,
    `📅 *Date & Time:* ${booking.pickupDate} at ${booking.pickupTime}`,
    booking.returnDate ? `🔄 *Return Date:* ${booking.returnDate}` : '',
    `🚗 *Vehicle:* ${vehicleName}`,
    `🛣️ *Trip Type:* ${isOneWay ? 'One-Way Drop (✓ Toll Tax Included in Fare)' : 'Round-Trip Outstation (Toll & Parking Extra)'}`,
    '',
    '💰 *FARE BREAKDOWN:*',
    `• Total Fare: ₹${payment ? payment.totalFare.toLocaleString('en-IN') : booking.estimatedFare.toLocaleString('en-IN')}`,
    payment && payment.discount > 0 ? `• Promo Discount: -₹${payment.discount.toLocaleString('en-IN')}` : '',
    '',
    '💳 *PAYMENT VERIFICATION:*',
    `• Status: *${payment?.status ? payment.status.toUpperCase() : 'PENDING'}*`,
    `• Amount Paid: *₹${payment ? payment.amountPaid.toLocaleString('en-IN') : 0}*`,
    `• Balance Due to Driver: *₹${payment ? payment.amountDue.toLocaleString('en-IN') : booking.estimatedFare.toLocaleString('en-IN')}*`,
    payment?.method ? `• Payment Mode: ${payment.method.toUpperCase()}` : '',
    payment?.transactionId ? `• Transaction ID: ${payment.transactionId}` : '',
    payment?.utrNumber ? `• Bank UTR / Ref: ${payment.utrNumber}` : '',
    payment?.paymentTimestamp ? `• Paid At: ${new Date(payment.paymentTimestamp).toLocaleString('en-IN')}` : '',
    payment?.gstNumber ? `• GST: ${payment.gstNumber} (${payment.companyName || ''})` : '',
    '━━━━━━━━━━━━━━━━━━━━',
    'Please assign driver & vehicle for this trip.',
    '- Kabeer Travels Automated System',
  ];

  return lines.filter(Boolean).join('\n');
}

/**
 * Triggers opening WhatsApp directly to Kabeer Travels business number (+91 88664 78812)
 * with the pre-filled booking confirmation message.
 */
export function openOwnerWhatsAppNotification(booking: BookingRecord): void {
  const message = buildOwnerWhatsAppBookingMessage(booking);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`;
  try {
    window.open(url, '_blank');
  } catch (e) {
    console.error('Could not open WhatsApp window', e);
  }
}
