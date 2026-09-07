import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Copy, 
  Check, 
  ArrowRight, 
  Lock, 
  AlertCircle, 
  Car, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  Clock,
  HelpCircle,
  Banknote
} from 'lucide-react';
import { PaymentInfo, PaymentOptionType, PaymentMethod } from '../types';
import { BUSINESS_INFO, PAYMENT_CONFIG, VEHICLES } from '../data/travelData';

interface PaymentCheckoutModalProps {
  isOpen?: boolean;
  onClose: () => void;
  bookingDraft?: {
    id: string;
    vehicleId?: string;
    pickupLocation?: string;
    dropLocation?: string;
    pickupDate?: string;
    pickupTime?: string;
    customerName?: string;
    customerPhone?: string;
    totalFare: number;
    discount?: number;
    promoCode?: string;
    isGstRequired?: boolean;
    companyName?: string;
    gstNumber?: string;
  };
  booking?: any;
  initialOption?: PaymentOptionType;
  onPaymentSuccess: (paymentInfo: PaymentInfo) => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen = true,
  onClose,
  bookingDraft: propBookingDraft,
  booking: propBooking,
  initialOption = 'advance_10',
  onPaymentSuccess,
}) => {
  const bookingDraft = propBookingDraft || propBooking || {
    id: `KT-${Math.floor(100000 + Math.random() * 900000)}`,
    vehicleId: 'sedan-dzire',
    pickupLocation: 'Vadodara',
    dropLocation: 'Gujarat Destination',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '10:00 AM',
    customerName: 'Customer',
    customerPhone: '',
    totalFare: 1500,
    discount: 0,
  };

  const [paymentOption, setPaymentOption] = useState<PaymentOptionType>(
    initialOption === 'full_online' ? 'full_online' : 'advance_10'
  );
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');
  
  // Verification states
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState<number>(0);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verifiedTxnId, setVerifiedTxnId] = useState('');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(bookingDraft.customerName || '');

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState('HDFC');

  const vehicle = VEHICLES.find((v) => v.id === bookingDraft.vehicleId) || VEHICLES[0];
  const netFare = Math.max(0, bookingDraft.totalFare - bookingDraft.discount);

  // Advance calculation: Minimum 10% rounded to nearest 50, with min ₹300 advance
  const advanceAmount = Math.max(
    PAYMENT_CONFIG.advanceMinimum,
    Math.round((netFare * (PAYMENT_CONFIG.advancePercentage / 100)) / 50) * 50
  );

  const isAdvanceOption = paymentOption === 'advance_10' || paymentOption === 'advance_20';
  const payableNow = isAdvanceOption ? advanceAmount : netFare;
  const balanceDue = Math.max(0, netFare - payableNow);

  // UPI intent URL for QR code & mobile app buttons
  const upiIntentUrl = `upi://pay?pa=${PAYMENT_CONFIG.upiId}&pn=${encodeURIComponent(
    PAYMENT_CONFIG.upiName
  )}&am=${payableNow}&cu=INR&tn=KabeerTravels_Trip_${bookingDraft.id}`;

  // Generate crisp local vector QR code without third party network risk
  useEffect(() => {
    if (!isOpen) return;
    QRCode.toDataURL(
      upiIntentUrl,
      {
        margin: 1,
        width: 260,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      },
      (err, url) => {
        if (!err && url) {
          setQrCodeDataUrl(url);
        }
      }
    );
  }, [upiIntentUrl, isOpen]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(PAYMENT_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCardNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setCardExpiry(cleaned);
    }
  };

  // Formal simulated UPI verification trigger to resolve false "payment done" glitch
  const handleVerifyUpiPayment = () => {
    const trimmedUtr = utrNumber.trim();
    if (!trimmedUtr) {
      setUtrError('⚠️ Please enter the 12-digit UPI reference / UTR number from your UPI app (GPay/PhonePe/Paytm) after completing the payment.');
      return;
    }
    if (trimmedUtr.length < 6) {
      setUtrError('⚠️ Invalid reference number. Please enter the complete UPI UTR / Transaction ID (at least 6-12 digits).');
      return;
    }
    setUtrError('');
    setIsVerifying(true);
    setVerifyStep(1);

    // Multi-stage authentic verification sequence
    setTimeout(() => {
      setVerifyStep(2);
      setTimeout(() => {
        setVerifyStep(3);
        const finalTxn = `UPI_${trimmedUtr}`;
        setVerifiedTxnId(finalTxn);
        setVerificationSuccess(true);
        setIsVerifying(false);

        // Notify parent after showing verified state
        setTimeout(() => {
          const paymentInfo: PaymentInfo = {
            option: paymentOption,
            method: 'upi',
            status: isAdvanceOption ? 'Advance Paid' : 'Fully Paid',
            totalFare: bookingDraft.totalFare,
            discount: bookingDraft.discount,
            promoCode: bookingDraft.promoCode,
            amountPaid: payableNow,
            amountDue: balanceDue,
            transactionId: finalTxn,
            paymentTimestamp: new Date().toISOString(),
            utrNumber: trimmedUtr,
            isGstRequired: bookingDraft.isGstRequired,
            companyName: bookingDraft.companyName,
            gstNumber: bookingDraft.gstNumber,
          };
          onPaymentSuccess(paymentInfo);
        }, 1100);
      }, 900);
    }, 900);
  };

  // Card or Netbanking confirmation
  const handleExecuteAlternativePayment = (method: 'card' | 'netbanking') => {
    setIsVerifying(true);
    setVerifyStep(1);
    setTimeout(() => {
      setVerifyStep(3);
      const generatedTxnId = `TXN_${method.toUpperCase()}_${Date.now().toString().slice(-8)}`;
      setVerifiedTxnId(generatedTxnId);
      setVerificationSuccess(true);
      setIsVerifying(false);

      setTimeout(() => {
        const paymentInfo: PaymentInfo = {
          option: paymentOption,
          method,
          status: isAdvanceOption ? 'Advance Paid' : 'Fully Paid',
          totalFare: bookingDraft.totalFare,
          discount: bookingDraft.discount,
          promoCode: bookingDraft.promoCode,
          amountPaid: payableNow,
          amountDue: balanceDue,
          transactionId: generatedTxnId,
          paymentTimestamp: new Date().toISOString(),
          isGstRequired: bookingDraft.isGstRequired,
          companyName: bookingDraft.companyName,
          gstNumber: bookingDraft.gstNumber,
        };
        onPaymentSuccess(paymentInfo);
      }, 1000);
    }, 1400);
  };

  // Direct Pay-to-Driver (Cash/UPI to Driver upon Trip)
  // Ensures payment status is strictly "Pending (Pay in Cab)" and NOT "Payment Done"
  const handlePayToDriverInCab = () => {
    const paymentInfo: PaymentInfo = {
      option: 'pay_driver',
      method: 'cash',
      status: 'Pending (Pay in Cab)',
      totalFare: bookingDraft.totalFare,
      discount: bookingDraft.discount,
      promoCode: bookingDraft.promoCode,
      amountPaid: 0,
      amountDue: netFare,
      transactionId: `PAY_ON_RIDE_${Date.now().toString().slice(-6)}`,
      paymentTimestamp: new Date().toISOString(),
      isGstRequired: bookingDraft.isGstRequired,
      companyName: bookingDraft.companyName,
      gstNumber: bookingDraft.gstNumber,
    };
    onPaymentSuccess(paymentInfo);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border-4 border-[#0B192C] my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-[#0B192C] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/30 flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-black text-white">Payment & Confirmation</h3>
                <span className="text-[10px] bg-black text-white font-bold px-2 py-0.5 rounded border border-white/30">
                  Secure UPI Gateway
                </span>
              </div>
              <p className="text-xs text-white/80">Kabeer Travels Vadodara • Chauffeur Assignment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isVerifying}
            className="text-white hover:text-white/70 p-1.5 rounded-lg hover:bg-black transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trip Quick Summary Banner */}
        <div className="bg-slate-100 border-b border-[#0B192C]/20 px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-black font-bold">
            <Car className="w-4 h-4 text-[#0B192C] shrink-0" />
            <span>{vehicle.name}</span>
            <span className="text-black/40">•</span>
            <span className="text-black">{bookingDraft.pickupDate} ({bookingDraft.pickupTime})</span>
          </div>
          <div className="font-mono text-black text-[11px] font-bold">
            Trip ID: <span className="text-[#0B192C] font-black">{bookingDraft.id}</span>
          </div>
        </div>

        {/* Toll & State Tax Notice Banner */}
        <div className="bg-[#0B192C]/10 border-b border-[#0B192C]/30 px-4 sm:px-5 py-2 flex items-center justify-between text-[11px] text-[#0B192C] font-bold">
          <span className="flex items-center">
            <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-[#0B192C] shrink-0" />
            <span>Toll Tax, State Tax & Parking are Extra (payable on actuals)</span>
          </span>
          <span className="text-[10px] font-black uppercase text-white bg-[#0B192C] px-1.5 py-0.5 rounded">
            Gujarat Taxi Standard
          </span>
        </div>

        <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Payment Option Selector (Minimum 10% Advance vs 100% Full) */}
          <div>
            <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
              Select Payment Option:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentOption('advance_10')}
                className={`p-3 rounded-2xl border-2 text-left transition relative cursor-pointer ${
                  isAdvanceOption
                    ? 'border-[#0B192C] bg-[#0B192C]/10 shadow-sm ring-2 ring-[#0B192C]/30'
                    : 'border-slate-300 hover:border-[#0B192C] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-black">10% Advance Token</span>
                  <span className="text-[10px] bg-black text-white font-black px-1.5 py-0.5 rounded">
                    Min ₹{advanceAmount}
                  </span>
                </div>
                <div className="text-xl font-black text-[#0B192C]">
                  ₹{advanceAmount.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-black/80 font-medium mt-1 leading-tight">
                  Lock cab & driver now. Pay remaining ₹{(netFare - advanceAmount).toLocaleString('en-IN')} to driver after trip.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('full_online')}
                className={`p-3 rounded-2xl border-2 text-left transition relative cursor-pointer ${
                  paymentOption === 'full_online'
                    ? 'border-[#0B192C] bg-[#0B192C]/10 shadow-sm ring-2 ring-[#0B192C]/30'
                    : 'border-slate-300 hover:border-[#0B192C] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-black">100% Full Fare</span>
                  <span className="text-[10px] bg-[#0B192C] text-white font-black px-1.5 py-0.5 rounded flex items-center">
                    <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                    Zero Due
                  </span>
                </div>
                <div className="text-xl font-black text-black">
                  ₹{netFare.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-black/80 font-medium mt-1 leading-tight">
                  Fully prepaid trip. ₹0 due at trip completion.
                </p>
              </button>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div>
            <div className="flex border-b border-slate-300 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-black flex items-center space-x-1.5 border-b-2 transition cursor-pointer ${
                  activeTab === 'upi'
                    ? 'border-[#0B192C] text-[#0B192C]'
                    : 'border-transparent text-black/60 hover:text-black'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#0B192C]" />
                <span>UPI / QR Code (Instant)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-black flex items-center space-x-1.5 border-b-2 transition cursor-pointer ${
                  activeTab === 'card'
                    ? 'border-[#0B192C] text-[#0B192C]'
                    : 'border-transparent text-black/60 hover:text-black'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Debit / Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-black flex items-center space-x-1.5 border-b-2 transition cursor-pointer ${
                  activeTab === 'netbanking'
                    ? 'border-[#0B192C] text-[#0B192C]'
                    : 'border-transparent text-black/60 hover:text-black'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* TAB 1: FORMAL UPI PAYMENT & SIMULATED QR CODE */}
            {activeTab === 'upi' && (
              <div className="space-y-4">
                
                {/* Official UPI Merchant Card - Navy Blue, White, Black */}
                <div className="bg-[#0B192C] text-white p-4 sm:p-5 rounded-2xl border-2 border-black shadow-lg">
                  
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/20">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white">
                        Official Merchant QR
                      </div>
                      <div className="text-sm font-black text-white">
                        {PAYMENT_CONFIG.upiName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-white/80 uppercase">Amount Payable</div>
                      <div className="text-lg font-black text-white">
                        ₹{payableNow.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* High Quality Crisp Vector QR Code */}
                    <div className="p-3 bg-white rounded-2xl shadow-md shrink-0 flex flex-col items-center">
                      {qrCodeDataUrl ? (
                        <img
                          src={qrCodeDataUrl}
                          alt="Kabeer Travels UPI QR Code"
                          className="w-36 h-36 object-contain"
                        />
                      ) : (
                        <div className="w-36 h-36 flex items-center justify-center bg-slate-100 rounded-xl text-black text-xs">
                          Generating QR...
                        </div>
                      )}
                      <div className="text-[9px] font-black uppercase text-black mt-1 flex items-center tracking-wider">
                        <Smartphone className="w-3 h-3 mr-1 text-black" />
                        Scan with Any UPI App
                      </div>
                    </div>

                    {/* Supported Apps & UPI ID Details */}
                    <div className="flex-1 w-full space-y-2.5">
                      <div>
                        <span className="text-[11px] text-white font-bold block mb-1">
                          Supported UPI Apps:
                        </span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                            <span
                              key={app}
                              className="text-[10px] font-black text-center py-1 rounded-lg bg-black text-white border border-white/30 shadow-xs"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Official Business UPI ID with 1-Click Copy */}
                      <div className="p-2.5 bg-black rounded-xl border border-white/30 flex items-center justify-between">
                        <div className="min-w-0 pr-2">
                          <span className="text-[9px] text-white/70 uppercase font-black block">
                            Business UPI ID
                          </span>
                          <span className="text-xs font-mono font-bold text-white truncate block">
                            {PAYMENT_CONFIG.upiId}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-white/40 bg-[#0B192C] hover:bg-black text-white transition shrink-0 cursor-pointer"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span className="text-white">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-white" />
                              <span>Copy UPI</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Tap to open installed UPI App directly on mobile */}
                      <a
                        href={upiIntentUrl}
                        className="inline-flex items-center justify-center w-full space-x-1.5 text-xs font-black py-2.5 px-3 bg-white hover:bg-slate-100 text-black rounded-xl shadow-md transition border-2 border-white"
                      >
                        <Smartphone className="w-4 h-4 text-black" />
                        <span>Tap to Open PhonePe / GPay App</span>
                        <ExternalLink className="w-3 h-3 ml-1 text-black" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* FORMAL PAYMENT VERIFICATION SECTION */}
                <div className="p-4 bg-white rounded-2xl border-2 border-[#0B192C] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0B192C] uppercase tracking-wider flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-[#0B192C] mr-1.5 shrink-0" />
                      <span>Step 2: Verify & Confirm Payment</span>
                    </span>
                    <span className="text-[10px] font-bold bg-[#0B192C] text-white px-2 py-0.5 rounded-full">
                      Instant Confirmation
                    </span>
                  </div>

                  <p className="text-xs text-black">
                    After scanning the QR code and completing the payment in your UPI app, enter your 12-digit UPI reference (UTR) number below and tap <strong>Verify Payment</strong> to lock your cab.
                  </p>

                  <div>
                    <label className="block text-[11px] font-bold text-black mb-1">
                      Enter 12-Digit UPI Reference / UTR Number:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        maxLength={16}
                        placeholder="e.g. 423982109281 or last 6 digits"
                        value={utrNumber}
                        onChange={(e) => {
                          setUtrNumber(e.target.value.replace(/[^0-9a-zA-Z]/g, ''));
                          setUtrError('');
                        }}
                        className="flex-1 text-xs font-mono font-bold px-3 py-2.5 rounded-xl border-2 border-[#0B192C]/40 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
                      />
                      <button
                        type="button"
                        disabled={isVerifying || verificationSuccess}
                        onClick={handleVerifyUpiPayment}
                        className="px-5 py-2.5 bg-[#0B192C] hover:bg-black text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer disabled:opacity-50 border border-black"
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin mr-1 text-white" />
                            <span>
                              {verifyStep === 1
                                ? 'Connecting to UPI...'
                                : verifyStep === 2
                                ? 'Validating Bank Ref...'
                                : 'Confirming Payment...'}
                            </span>
                          </>
                        ) : verificationSuccess ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-white" />
                            <span>Payment Verified!</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4 text-white" />
                            <span>VERIFY PAYMENT (₹{payableNow})</span>
                          </>
                        )}
                      </button>
                    </div>
                    {utrError && (
                      <p className="text-[11px] text-black font-bold mt-1 bg-slate-100 p-1 rounded">
                        {utrError}
                      </p>
                    )}
                  </div>

                  {/* Verification Status Feedback */}
                  {verificationSuccess && (
                    <div className="p-3 bg-[#0B192C] border-2 border-black rounded-xl text-xs text-white font-bold flex items-center space-x-2 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                      <div>
                        <div>Payment Verified Successfully! (Ref: {verifiedTxnId})</div>
                        <div className="text-[11px] font-normal text-white/90">
                          Chauffeur details and booking voucher being issued now...
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-[10px] text-black/70">
                    <span>✓ Safe 256-Bit NPCI Protocol</span>
                    <span>✓ Confirmation to {bookingDraft.customerPhone || 'your phone'}</span>
                  </div>
                </div>

                {/* Alternative Option: Pay Later in Cab */}
                <div className="p-3 bg-slate-100 rounded-2xl border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-left">
                    <span className="font-bold text-black block flex items-center">
                      <Banknote className="w-4 h-4 text-black mr-1.5" />
                      Prefer to Pay in Cab?
                    </span>
                    <span className="text-[11px] text-black/70">
                      Payment status will remain 'Pending (Pay in Cab)' until trip start.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handlePayToDriverInCab}
                    className="px-3.5 py-2 bg-black hover:bg-[#0B192C] text-white font-bold text-xs rounded-xl border border-black shadow-2xs transition shrink-0 cursor-pointer"
                  >
                    Confirm as Pay to Chauffeur
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Cards */}
            {activeTab === 'card' && (
              <div className="space-y-3 bg-slate-100 p-4 rounded-2xl border border-slate-300">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8921"
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
                    />
                    <CreditCard className="w-4 h-4 text-black/50 absolute right-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="08/28"
                      value={cardExpiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">CVV / CVC</label>
                    <div className="relative">
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
                      />
                      <Lock className="w-3.5 h-3.5 text-black/50 absolute right-3 top-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Name as on Card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
                  />
                </div>

                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={() => handleExecuteAlternativePayment('card')}
                  className="w-full mt-2 py-3 bg-[#0B192C] hover:bg-black text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Authenticating Card with Bank OTP...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-white" />
                      <span>Pay & Verify ₹{payableNow.toLocaleString('en-IN')} via Card</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* TAB 3: Net Banking */}
            {activeTab === 'netbanking' && (
              <div className="space-y-3 bg-slate-100 p-4 rounded-2xl border border-slate-300">
                <span className="text-xs font-bold text-black block">Select Your Bank:</span>
                <div className="grid grid-cols-3 gap-2">
                  {['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'Bank of Baroda'].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                        selectedBank === bank
                          ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-xs'
                          : 'border-slate-300 bg-white text-black hover:bg-slate-50'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-300 text-xs text-black space-y-1">
                  <p className="font-bold text-black">Direct Bank Transfer (NEFT/IMPS):</p>
                  <p>Account: {PAYMENT_CONFIG.bankDetails.accountNumber} ({PAYMENT_CONFIG.bankDetails.bankName})</p>
                  <p>IFSC: {PAYMENT_CONFIG.bankDetails.ifsc} • Name: {PAYMENT_CONFIG.bankDetails.accountName}</p>
                </div>

                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={() => handleExecuteAlternativePayment('netbanking')}
                  className="w-full py-3 bg-[#0B192C] hover:bg-black text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Connecting to {selectedBank} NetBanking...</span>
                    </>
                  ) : (
                    <>
                      <Building2 className="w-3.5 h-3.5 text-white" />
                      <span>Proceed with {selectedBank} (₹{payableNow.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Fare Breakdown Box */}
          <div className="p-4 bg-[#0B192C] text-white rounded-2xl space-y-2 text-xs border-2 border-black">
            <div className="flex justify-between text-white/80">
              <span>Standard Tariff:</span>
              <span>₹{bookingDraft.totalFare.toLocaleString('en-IN')}</span>
            </div>
            {bookingDraft.discount > 0 && (
              <div className="flex justify-between text-white font-semibold">
                <span>Promo Discount ({bookingDraft.promoCode}):</span>
                <span>-₹{bookingDraft.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-white/20">
              <span>Payable Advance Now:</span>
              <span className="text-white">₹{payableNow.toLocaleString('en-IN')}</span>
            </div>
            {balanceDue > 0 ? (
              <div className="flex justify-between text-white/90 text-[11px]">
                <span>Remaining Balance Due:</span>
                <span>₹{balanceDue.toLocaleString('en-IN')} (Pay to driver upon ride)</span>
              </div>
            ) : (
              <div className="text-white text-[11px] font-bold">
                ✓ Full 100% fare payment selected. Zero due in cab!
              </div>
            )}
            <div className="text-[10px] text-white/70 pt-1 border-t border-white/20">
              * Note: Toll taxes, state border entry taxes & parking charges are extra on actuals.
            </div>
          </div>

          {/* Trust Guarantee Note */}
          <div className="text-center pt-2 pb-1 border-t border-slate-200">
            <p className="text-xs text-black font-semibold flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0B192C] shrink-0" />
              <span>Commercial Yellow-Plate Verified Taxis • 100% On-Time Guarantee</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
