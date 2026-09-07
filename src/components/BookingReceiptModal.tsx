import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Car, 
  User, 
  Phone, 
  ShieldCheck, 
  FileText, 
  Share2,
  MessageSquare
} from 'lucide-react';
import { BookingRecord } from '../types';
import { BUSINESS_INFO, VEHICLES } from '../data/travelData';

interface BookingReceiptModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
}

export const BookingReceiptModal: React.FC<BookingReceiptModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const vehicle = VEHICLES.find((v) => v.id === booking.vehicleId) || VEHICLES[0];
  const payment = booking.payment;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const receiptText = `📄 *KABEER TRAVELS - OFFICIAL E-RECEIPT*
Booking ID: ${booking.id}
Chauffeur Dispatch Status: Confirmed
Passenger: ${booking.customerName} (${booking.customerPhone})
Car: ${vehicle.name}
Pickup: ${booking.pickupLocation}
Drop: ${booking.dropLocation}
Schedule: ${booking.pickupDate} at ${booking.pickupTime}
Total Tariff: ₹${payment.totalFare}
${payment.discount > 0 ? `Discount Applied: -₹${payment.discount}\n` : ''}Amount Paid: ₹${payment.amountPaid} (${payment.status})
Balance Due: ₹${payment.amountDue}
${payment.transactionId ? `Txn ID: ${payment.transactionId}\n` : ''}24x7 Support: +91 88664 78812`;

    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(receiptText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border-2 border-[#0B192C] my-auto animate-in fade-in zoom-in-95 duration-200 print:border-none print:shadow-none print:max-w-full">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-[#0B192C] text-white p-4 flex items-center justify-between border-b border-black print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-white" />
            <h3 className="text-sm font-black text-white">Official Booking Receipt</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-black hover:bg-[#0B192C] text-white border border-white/20 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-black/50 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-5">
            <div>
              <h2 className="text-xl font-black text-black tracking-tight">KABEER TRAVELS</h2>
              <p className="text-xs text-slate-600 font-medium">Vadodara Cab & Airport Taxi Service</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Tandalja, Vadodara, Gujarat 390020</p>
              <p className="text-[11px] text-slate-500">24/7 Helpline: {BUSINESS_INFO.phoneDisplay}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded text-xs font-black bg-black text-white mb-1">
                E-RECEIPT
              </span>
              <div className="text-xs font-mono font-bold text-black">
                #{booking.id}
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-600 uppercase font-bold block">Payment Status</span>
              <span className={`text-sm font-black ${
                payment.status === 'Fully Paid' 
                  ? 'text-black' 
                  : payment.status === 'Advance Paid'
                  ? 'text-[#0B192C]'
                  : 'text-black'
              }`}>
                ● {payment.status}
              </span>
            </div>
            {payment.transactionId && (
              <div className="text-right">
                <span className="text-[10px] text-slate-600 uppercase font-bold block">Transaction Ref</span>
                <span className="text-xs font-mono font-bold text-black">{payment.transactionId}</span>
              </div>
            )}
          </div>

          {/* Passenger & Vehicle Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 font-bold block uppercase text-[10px]">Passenger</span>
              <p className="font-bold text-black mt-0.5">{booking.customerName}</p>
              <p className="text-slate-600">{booking.customerPhone}</p>
              {booking.customerEmail && <p className="text-slate-500">{booking.customerEmail}</p>}
            </div>
            <div>
              <span className="text-slate-500 font-bold block uppercase text-[10px]">Allocated Car Class</span>
              <p className="font-bold text-black mt-0.5">{vehicle.name}</p>
              <p className="text-slate-600">Capacity: {vehicle.passengers} Passengers, AC</p>
            </div>
          </div>

          {/* Route Details */}
          <div className="border border-slate-300 rounded-xl p-3.5 space-y-2 text-xs bg-white">
            <div className="flex items-start justify-between">
              <span className="text-slate-600 flex items-center font-bold">
                <MapPin className="w-3.5 h-3.5 mr-1 text-black" />
                Pickup Location:
              </span>
              <span className="font-bold text-black text-right max-w-[260px]">{booking.pickupLocation}</span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-slate-600 flex items-center font-bold">
                <MapPin className="w-3.5 h-3.5 mr-1 text-black" />
                Drop Location:
              </span>
              <span className="font-bold text-black text-right max-w-[260px]">{booking.dropLocation}</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200">
              <span className="text-slate-600 flex items-center font-bold">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-600" />
                Pickup Schedule:
              </span>
              <span className="font-bold text-black">{booking.pickupDate} at {booking.pickupTime}</span>
            </div>
          </div>

          {/* GST Invoicing if requested */}
          {payment.isGstRequired && (
            <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-[#0B192C]">GST Invoicing Registered</span>
              <p className="font-bold text-black">{payment.companyName || 'Corporate Client'}</p>
              <p className="font-mono text-slate-700">GSTIN: {payment.gstNumber || 'Provided during ride'}</p>
            </div>
          )}

          {/* Tariff Breakdown Table */}
          <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>Standard Ride Tariff (Fuel + Chauffeur + Vehicle):</span>
              <span className="font-bold text-black">₹{payment.totalFare.toLocaleString('en-IN')}</span>
            </div>

            {payment.discount > 0 && (
              <div className="flex justify-between text-black font-semibold">
                <span>Discount / Promo Applied ({payment.promoCode || 'PROMO'}):</span>
                <span>-₹{payment.discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-black pt-2 border-t border-slate-300 text-sm">
              <span>Net Tariff:</span>
              <span className="font-black">₹{(payment.totalFare - payment.discount).toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-black font-bold">
              <span>Amount Paid:</span>
              <span>₹{payment.amountPaid.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-black font-black pt-1 border-t border-slate-200 text-sm">
              <span>Balance Due (to Chauffeur):</span>
              <span className="font-black text-black">₹{payment.amountDue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Chauffeur Dispatch SLA footer */}
          <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-[11px] text-slate-700 space-y-1">
            <p className="font-bold text-black flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-black" />
              Chauffeur Dispatch Guarantee:
            </p>
            <p>
              Your chauffeur's Name, Contact Number, and Vehicle Registration plate will be shared via SMS & WhatsApp 
              prior to pickup. Toll tax, state border permit (if outstation), and parking are at actuals.
            </p>
          </div>

          {/* Action buttons (Hidden on print) */}
          <div className="flex gap-3 pt-2 print:hidden">
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-[#0B192C] hover:bg-black text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs cursor-pointer border border-white/20"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Share Receipt to WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-black hover:bg-[#0B192C] text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer border border-white/20"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
