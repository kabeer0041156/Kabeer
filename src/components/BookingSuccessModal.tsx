import React, { useState } from 'react';
import { 
  CheckCircle, 
  X, 
  Phone, 
  MessageSquare, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  Car, 
  FileText, 
  CreditCard,
  QrCode,
  ShieldCheck,
  Navigation,
  Radio
} from 'lucide-react';
import { BookingRecord } from '../types';
import { BUSINESS_INFO, VEHICLES } from '../data/travelData';
import { buildOwnerWhatsAppBookingMessage } from '../data/whatsappUtils';

interface BookingSuccessModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
  onViewReceipt: (booking: BookingRecord) => void;
  onPayBalance?: (booking: BookingRecord) => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ 
  booking, 
  onClose,
  onViewReceipt,
  onPayBalance,
}) => {
  const [copied, setCopied] = useState(false);
  const [whatsAppSent, setWhatsAppSent] = useState(false);

  if (!booking) return null;

  const vehicle = VEHICLES.find((v) => v.id === booking.vehicleId) || VEHICLES[0];
  const payment = booking.payment || {
    option: 'pay_driver',
    status: 'Pending (Pay in Cab)',
    totalFare: booking.estimatedFare,
    discount: 0,
    amountPaid: 0,
    amountDue: booking.estimatedFare,
  };

  const isPaymentDone = payment.status === 'Fully Paid' || payment.status === 'Advance Paid';

  const handleCopyId = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToWhatsApp = () => {
    const text = buildOwnerWhatsAppBookingMessage(booking);
    setWhatsAppSent(true);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-[#0B192C] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between border-b border-black">
          <div className="flex items-center space-x-2.5">
            <CheckCircle className="w-7 h-7 text-white shrink-0" />
            <div>
              <h3 className="text-base font-black">
                {isPaymentDone
                  ? 'Booking & Payment Confirmed!'
                  : 'Cab Booking Confirmed (Payment Pending)'}
              </h3>
              <p className="text-xs text-slate-300">
                {isPaymentDone
                  ? 'Advance received. Guaranteed chauffeur dispatch for Kabeer Travels'
                  : 'Pay fare directly in cab to chauffeur during your journey.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-black/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Reference code box */}
          <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-300 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-600 uppercase font-bold block">Booking Reference ID</span>
              <span className="text-base font-mono font-black text-black">{booking.id}</span>
            </div>
            <button
              onClick={handleCopyId}
              className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-400 bg-white hover:bg-slate-100 text-black transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Payment Status Card */}
          <div className="p-3.5 bg-slate-100 border border-slate-300 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black flex items-center">
                <CreditCard className="w-4 h-4 mr-1.5 text-black" />
                Payment & Billing Status:
              </span>
              <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                payment.status === 'Fully Paid'
                  ? 'bg-black text-white border border-black'
                  : payment.status === 'Advance Paid'
                  ? 'bg-[#0B192C] text-white border border-black'
                  : 'bg-white text-black border border-slate-400'
              }`}>
                {payment.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center border-t border-slate-300 text-xs">
              <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-600 font-bold block">Total Fare</span>
                <span className="font-black text-black">₹{(payment.totalFare - payment.discount).toLocaleString('en-IN')}</span>
              </div>
              <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-600 font-bold block">Paid Now</span>
                <span className="font-black text-black">₹{payment.amountPaid.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-600 font-bold block">Due to Driver</span>
                <span className="font-black text-black">₹{payment.amountDue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {payment.transactionId && isPaymentDone && (
              <div className="text-[11px] text-slate-700 flex items-center justify-between pt-1">
                <span>Payment Reference / UTR:</span>
                <span className="font-mono font-bold text-black">{payment.utrNumber || payment.transactionId}</span>
              </div>
            )}
            {!isPaymentDone && (
              <div className="text-[11px] text-black bg-slate-100 p-2 rounded-lg border border-slate-300 mt-1">
                ℹ️ <strong>Pay in Cab Booking:</strong> ₹0 paid online. Please pay total fare <strong>₹{payment.amountDue.toLocaleString('en-IN')}</strong> directly to your chauffeur during or at the end of your trip.
              </div>
            )}
          </div>

          {/* Trip Summary */}
          <div className="space-y-2 text-xs text-black border border-slate-300 rounded-xl p-3.5 bg-white">
            <div className="flex items-start justify-between">
              <span className="text-slate-600 flex items-center font-bold">
                <MapPin className="w-3.5 h-3.5 mr-1 text-black" />
                Pickup:
              </span>
              <span className="font-bold text-black text-right max-w-[240px]">{booking.pickupLocation}</span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-slate-600 flex items-center font-bold">
                <MapPin className="w-3.5 h-3.5 mr-1 text-black" />
                Drop:
              </span>
              <span className="font-bold text-black text-right max-w-[240px]">{booking.dropLocation}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center font-bold">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-600" />
                Schedule:
              </span>
              <span className="font-bold text-black">{booking.pickupDate} at {booking.pickupTime}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center font-bold">
                <Car className="w-3.5 h-3.5 mr-1 text-slate-600" />
                Vehicle:
              </span>
              <span className="font-bold text-black">{vehicle.name}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 text-[11px] text-slate-700 leading-relaxed flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <p>
              Driver details (Name, Car Reg. Number & Mobile) will be dispatched via SMS & WhatsApp within 5 to 10 minutes prior to pickup.
            </p>
          </div>

          {/* WhatsApp Direct Notification to Owner */}
          <div className="p-3.5 bg-white border-2 border-[#0B192C] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black flex items-center">
                <MessageSquare className="w-4 h-4 mr-1.5 text-black" />
                WhatsApp Alert to {BUSINESS_INFO.name}
              </span>
              <span className="text-[10px] font-black bg-[#0B192C] text-white px-2 py-0.5 rounded-full">
                {isPaymentDone ? 'Payment Verified' : 'Booking Confirmed'}
              </span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Trip confirmation with fare and payment receipt is ready for WhatsApp (+91 88664 78812).
            </p>
            <button
              type="button"
              onClick={handleSendToWhatsApp}
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#0B192C] hover:bg-black text-white font-black text-xs py-2.5 px-3 rounded-xl transition shadow-xs cursor-pointer border border-white/20"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>{whatsAppSent ? '✓ Sent to WhatsApp (Click to re-open)' : 'Send to WhatsApp (+91 88664 78812)'}</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onViewReceipt(booking)}
                className="inline-flex items-center justify-center space-x-1.5 bg-[#0B192C] hover:bg-black text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs cursor-pointer border border-white/20"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>View / Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="inline-flex items-center justify-center space-x-1.5 bg-black hover:bg-[#0B192C] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition cursor-pointer border border-white/20"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-xs text-black hover:underline font-bold inline-flex items-center space-x-1"
            >
              <Phone className="w-3 h-3 text-black" />
              <span>Need instant emergency dispatch? Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
