import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, ChevronRight, ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { servicesMenu } from './Services'; 

export default function Booking() {
  const [searchParams] = useSearchParams();
  
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Hair Cut & Styling');
  
  // NEW: Store an array of selected services instead of just one ID
  const [selectedServices, setSelectedServices] = useState([]);
  
  const [selectedArtist, setSelectedArtist] = useState('Any Available Artist');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Form Inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [isLoadingTimeslots, setIsLoadingTimeslots] = useState(false);

  // ==========================================
  // INITIALIZATION
  // ==========================================
  // Pre-select a service if coming from a "Book Now" link with a URL parameter
  useEffect(() => {
    const initialServiceId = searchParams.get('service');
    if (initialServiceId) {
      const serviceToPreSelect = servicesMenu.find(s => s.id === initialServiceId);
      if (serviceToPreSelect) {
        setSelectedServices([serviceToPreSelect]);
      }
    }
  }, [searchParams]);

  // ==========================================
  // AUTOMATED CALCULATIONS
  // ==========================================
  // NEW: Reduce the array to get the total base price of all selected services
  const basePrice = selectedServices.reduce((total, service) => total + service.price, 0);
  const gstAmount = basePrice * 0.05;
  const finalTotal = basePrice + gstAmount;
  
  const categories = [...new Set(servicesMenu.map(item => item.category))];
  const todayString = new Date().toISOString().split('T')[0];

  // ==========================================
  // TOGGLE SERVICE SELECTION
  // ==========================================
  const toggleService = (service) => {
    setSelectedServices(prev => {
      const isAlreadySelected = prev.some(s => s.id === service.id);
      if (isAlreadySelected) {
        // Remove it if already selected
        return prev.filter(s => s.id !== service.id);
      } else {
        // Add it to the array
        return [...prev, service];
      }
    });
  };

  // ==========================================
  // EFFECTS & LOGIC
  // ==========================================
  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimeslots([]);
      return;
    }

    const fetchTimeslots = async () => {
      setIsLoadingTimeslots(true);
      setSelectedTime(''); 

      try {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        
        const rawStartTimes = [
          "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
          "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", 
          "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
          "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", 
          "06:00 PM", "06:30 PM", "07:00 PM"
        ];
        
        const filterPastTimes = (slots) => {
          const now = new Date();
          const selected = new Date(selectedDate);
          
          const isToday = 
            selected.getDate() === now.getDate() &&
            selected.getMonth() === now.getMonth() &&
            selected.getFullYear() === now.getFullYear();

          if (!isToday) return slots; 

          return slots.filter(slot => {
            const [time, modifier] = slot.split(' ');
            let [hours, minutes] = time.split(':');
            hours = parseInt(hours, 10);
            
            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            
            const slotTime = new Date();
            slotTime.setHours(hours, parseInt(minutes, 10), 0, 0);
            
            return slotTime > now;
          });
        };

        const generateTimeBlock = (startTime) => {
          const durationMinutes = 60; 
          const [time, modifier] = startTime.split(' ');
          let [hours, minutes] = time.split(':');
          hours = parseInt(hours, 10);
          
          if (modifier === 'PM' && hours !== 12) hours += 12;
          if (modifier === 'AM' && hours === 12) hours = 0;
          
          const d = new Date();
          d.setHours(hours, parseInt(minutes, 10) + durationMinutes, 0, 0);
          
          let endHours = d.getHours();
          let endMins = d.getMinutes();
          const endModifier = endHours >= 12 ? 'PM' : 'AM';
          
          if (endHours > 12) endHours -= 12;
          if (endHours === 0) endHours = 12;
          
          const formattedEnd = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')} ${endModifier}`;
          return `${startTime} - ${formattedEnd}`;
        };

        const validStartTimes = filterPastTimes(rawStartTimes);
        const formattedTimeBlocks = validStartTimes.map(generateTimeBlock);

        setAvailableTimeslots(formattedTimeBlocks);

      } catch (error) {
        console.error("Failed to fetch timeslots:", error);
        setAvailableTimeslots([]);
      } finally {
        setIsLoadingTimeslots(false);
      }
    };

    fetchTimeslots();
  }, [selectedDate, selectedArtist]);

  // ==========================================
  // BACKEND INTEGRATION HANDLER
  // ==========================================
  const handleConfirmReservation = async () => {
    if (!customerName || !customerPhone) {
      alert("Please enter both your name and phone number to complete the booking.");
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      userId: customerPhone, 
      clientName: customerName,
      stylistId: selectedArtist === 'Any Available Artist' ? 'any' : selectedArtist, 
      date: selectedDate,
      timeSlot: selectedTime,
      // Map the array to the format your backend expects
      services: selectedServices.map(s => ({
        serviceId: s.id,
        name: s.name,
        price: s.price 
      })),
      totalAmount: finalTotal
    };

    try {
      const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert(`Booking Failed: ${data.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Could not connect to the server. Please ensure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // RENDER UI
  // ==========================================
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] w-full flex items-center justify-center p-6 text-white font-sans">
        <div className="bg-[#111] border border-[#D4AF37]/30 p-10 rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.15)] text-center max-w-md w-full">
          <CheckCircle2 size={64} className="text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-[#D4AF37] mb-4">Booking Confirmed!</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Thank you, {customerName}. Your appointment for <span className="text-white font-semibold">{selectedServices.map(s => s.name).join(', ')}</span> on {selectedDate} has been secured. You will receive a WhatsApp confirmation shortly.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all rounded-sm"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] w-full pb-24 font-sans text-white pt-24 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif tracking-wide mb-3">
            Reserve Your <span className="text-[#D4AF37] italic">Chair</span>
          </h1>
          <p className="text-gray-500 text-xs tracking-widest uppercase">Toni & Guy Patna</p>
        </div>

        {/* STEPPER INDICATOR */}
        <div className="flex justify-center items-center gap-2 md:gap-4 mb-12">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center gap-2 md:gap-4">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-colors ${
                step >= num ? 'bg-[#D4AF37] text-black' : 'bg-[#222] text-gray-500'
              }`}>
                {step > num ? <Check size={16} /> : num}
              </div>
              {num < 4 && <div className={`w-4 md:w-8 h-[2px] ${step > num ? 'bg-[#D4AF37]' : 'bg-[#222]'}`} />}
            </div>
          ))}
        </div>

        {/* WIZARD CONTAINER */}
        <div className="bg-[#111] border border-white/5 p-6 md:p-10 rounded-lg shadow-2xl relative min-h-[400px]">
          
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="absolute top-6 left-6 text-gray-500 hover:text-[#D4AF37] flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}

          {/* ================= STEP 1: SELECT MULTIPLE SERVICES ================= */}
          {step === 1 && (
            <div>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl font-serif text-[#D4AF37]">1. Select Services</h2>
                <span className="text-xs text-gray-500 uppercase tracking-widest">{selectedServices.length} Selected</span>
              </div>
              
              <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-2 border-b border-white/10">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest whitespace-nowrap transition-colors ${
                      selectedCategory === cat ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar mb-6">
                {servicesMenu.filter(s => s.category === selectedCategory).map(service => {
                  const isSelected = selectedServices.some(s => s.id === service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service)}
                      className={`w-full text-left p-4 border transition-all flex justify-between items-center group rounded-sm ${
                        isSelected 
                          ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
                          : 'border-white/5 bg-black/40 hover:bg-black hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div>
                        <h3 className={`font-serif text-lg transition-colors ${isSelected ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]'}`}>
                          {service.name}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1 font-sans">{service.duration} • ₹{service.price} Base</p>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="text-[#D4AF37]" size={20} />
                      ) : (
                        <Circle className="text-gray-600 group-hover:text-[#D4AF37]" size={20} />
                      )}
                    </button>
                  );
                })}
              </div>

              <button 
                disabled={selectedServices.length === 0}
                onClick={() => setStep(2)}
                className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              >
                Continue to Artists
              </button>
            </div>
          )}

          {/* ================= STEP 2: SELECT ARTIST ================= */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-serif text-[#D4AF37] mb-6">2. Select Your Artist</h2>
              <div className="space-y-3">
                {['Any Available Artist', 'Creative Director (+₹500)', 'Senior Stylist (+₹200)'].map(artist => (
                  <button
                    key={artist}
                    onClick={() => {
                      setSelectedArtist(artist);
                      setStep(3);
                    }}
                    className={`w-full text-left p-5 border transition-all rounded-sm ${
                      selectedArtist === artist 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' 
                        : 'border-white/5 bg-black/40 text-white hover:border-gray-500'
                    }`}
                  >
                    <span className="font-serif tracking-wide">{artist}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= STEP 3: DATE & TIME ================= */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-serif text-[#D4AF37] mb-6">3. Select Schedule</h2>
              
              <div className="mb-8 space-y-6">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Select Date</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={todayString} 
                    className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#D4AF37] outline-none transition-colors [color-scheme:dark] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-3">Available Timeslots</label>
                  
                  {!selectedDate ? (
                    <div className="p-6 bg-black/40 border border-white/5 rounded-sm text-center">
                      <p className="text-gray-500 text-xs tracking-wider">Please select a date to view available times.</p>
                    </div>
                  ) : isLoadingTimeslots ? (
                    <div className="p-8 bg-black/40 border border-white/5 rounded-sm flex flex-col items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Checking availability...</p>
                    </div>
                  ) : availableTimeslots.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {availableTimeslots.map((timeBlock) => (
                        <button
                          key={timeBlock}
                          onClick={() => setSelectedTime(timeBlock)}
                          className={`py-3 px-2 text-[11px] uppercase tracking-widest transition-all rounded-sm border ${
                            selectedTime === timeBlock
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                              : 'bg-black/40 text-gray-400 border-white/10 hover:border-[#D4AF37]/50 hover:text-white'
                          }`}
                        >
                          {timeBlock}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 bg-red-950/20 border border-red-900/30 rounded-sm text-center">
                      <p className="text-red-400/80 text-xs tracking-wider">
                        No timeslots left for this date. Please select another day.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(4)}
                className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              >
                Continue to Details
              </button>
            </div>
          )}

          {/* ================= STEP 4: FINAL DETAILS & MATH ================= */}
          {step === 4 && selectedServices.length > 0 && (
            <div>
              <h2 className="text-xl font-serif text-[#D4AF37] mb-6">4. Final Details</h2>
              
              <div className="border border-white/10 bg-black/40 p-6 rounded-sm mb-8">
                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                  <div className="text-white text-sm font-sans">
                    <span className="text-gray-500 block mb-2">Selected Services:</span> 
                    <div className="space-y-1">
                      {selectedServices.map(s => (
                        <div key={s.id} className="flex justify-between pl-2 border-l-2 border-[#D4AF37]/30">
                          <span>{s.name}</span>
                          <span className="text-gray-400">₹{s.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-white text-sm flex justify-between font-sans">
                    <span className="text-gray-500">Artist:</span> {selectedArtist}
                  </p>
                  <p className="text-white text-sm flex justify-between font-sans">
                    <span className="text-gray-500">Time:</span> <span>{selectedDate} • {selectedTime}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-400 font-sans">
                    <span>Combined Base Price</span>
                    <span>₹{basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 font-sans">
                    <span>Taxes (5% GST)</span>
                    <span>+ ₹{gstAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 mt-2">
                    <div className="flex justify-between items-center text-lg text-[#D4AF37] font-bold font-sans">
                      <span>Total Amount</span>
                      <span>₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name" 
                  className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#D4AF37] outline-none text-sm placeholder:text-gray-600 rounded-sm" 
                />
                <input 
                  type="tel" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone Number (e.g. 91xxxxxxxxxx)" 
                  className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#D4AF37] outline-none text-sm placeholder:text-gray-600 rounded-sm" 
                />
              </div>

              <button 
                onClick={handleConfirmReservation}
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing Booking...' : 'Confirm Reservation'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}