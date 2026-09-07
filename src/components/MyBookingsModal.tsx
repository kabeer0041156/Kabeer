import React from 'react';
import { X, Calendar, MapPin, Car, Phone, Trash2, CheckCircle2, FileText, CreditCard, Navigation } from 'lucide-react';
import { BookingRecord } from '../types';
import { VEHICLES, BUSINESS_INFO } from '../data/travelData';

interface MyBookingsModalProps {
  bookings: BookingRecord[];
  onClose: () => void;
  onClear: () => void;
  onViewReceipt: (booking: BookingRecord) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ 
  bookings, 
  onClose, 
  onClear,
  onViewReceipt,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-2 border-[#0B192C]">
        <div className="p-4 sm:p-5 border-b border-black flex items-center justify-between bg-[#0B192C] text-white">
          <div>
            <h3 className="text-base font-black text-white">Your Booking History</h3>
            <p className="text-xs text-slate-300">Saved bookings for Kabeer Travels</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-black/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {bookings.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs font-semibold">
              No saved bookings found. When you confirm a cab booking, it will appear here.
            </div>
          ) : (
            bookings.map((b) => {
              const vehicle = VEHICLES.find((v) => v.id === b.vehicleId) || VEHICLES[0];
              const payment = b.payment || {
                status: 'Pending (Pay in Cab)',
                amountPaid: 0,
                amountDue: b.estimatedFare,
              };

              return (
                <div key={b.id} className="border border-slate-300 rounded-xl p-4 bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-black bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                      {b.id}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        payment.status === 'Fully Paid'
                          ? 'bg-black text-white border-black'
                          : payment.status === 'Advance Paid'
                          ? 'bg-[#0B192C] text-white border-black'
                          : 'bg-white text-black border-slate-400'
                      }`}>
                        <CreditCard className="w-2.5 h-2.5 mr-1" />
                        {payment.status}
                      </span>
                      <span className="inline-flex items-center text-[10px] font-bold text-black bg-slate-100 px-2 py-0.5 rounded-full border border-slate-300">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {b.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-start">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-black shrink-0 mt-0.5" />
                      <span className="truncate"><strong className="text-black">From:</strong> {b.pickupLocation}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-black shrink-0 mt-0.5" />
                      <span className="truncate"><strong className="text-black">To:</strong> {b.dropLocation}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="flex items-center text-slate-600 font-medium">
                        <Calendar className="w-3 h-3 mr-1" />
                        {b.pickupDate} ({b.pickupTime})
                      </span>
                      <span className="flex items-center text-slate-600 font-medium">
                        <Car className="w-3 h-3 mr-1" />
                        {vehicle.name}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">
                        {payment.amountDue > 0 ? `Due: ₹${payment.amountDue}` : 'Paid in Full'}
                      </span>
                      <span className="text-base font-black text-black">₹{b.estimatedFare.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => onViewReceipt(b)}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-black bg-white hover:bg-slate-100 border border-slate-400 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-black" />
                        <span>Receipt</span>
                      </button>

                      <a
                        href={`tel:${BUSINESS_INFO.phoneRaw}`}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-[#0B192C] hover:bg-black px-3 py-1.5 rounded-lg transition border border-white/20"
                      >
                        <Phone className="w-3 h-3 text-white" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {bookings.length > 0 && (
          <div className="p-3 bg-slate-100 border-t border-slate-300 flex justify-between items-center">
            <button
              onClick={onClear}
              className="text-xs text-black hover:underline font-bold flex items-center cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1 text-black" />
              Clear History
            </button>

            <button
              onClick={onClose}
              className="text-xs bg-[#0B192C] hover:bg-black text-white font-bold px-4 py-1.5 rounded-lg transition border border-white/20 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
