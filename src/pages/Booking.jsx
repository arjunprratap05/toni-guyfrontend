import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Calendar, Clock, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

// Import the master services menu from Services.jsx
import { servicesMenu } from './Services';

// --- NEW HELPER FUNCTION ---
// Compares the selected date and time slot against the current real-world time
const isSlotInPast = (selectedDateStr, timeStr) => {
  if (!selectedDateStr) return false;
  
  const now = new Date();
  const [year, month, day] = selectedDateStr.split('-');
  // Create a local date object
  const slotDate = new Date(year, month - 1, day);
  
  // Parse the "10:00 AM" format
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);
  
  // Convert to 24-hour time format
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  
  slotDate.setHours(hours, parseInt(minutes, 10), 0, 0);
  
  // Return true if the slot's exact timestamp is older than right now
  return slotDate < now;
};

const Booking = () => {
  // State Management
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  
  const [formData, setFormData] = useState({
    service: null,
    stylist: null,
    date: '',
    timeSlot: '',
    clientName: '',
    clientPhone: ''
  });

  // Master Data
  const stylists = [
    { id: 'any', name: 'Any Available Artist', role: 'Next Available' }
  ];

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Navigation Handlers
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const updateForm = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const groupedServices = servicesMenu.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  // Live Availability Checker
  useEffect(() => {
    const fetchAvailability = async () => {
      if (formData.stylist && formData.date) {
        setIsFetchingSlots(true);
        updateForm('timeSlot', ''); 
        
        try {
          const response = await axios.get(`${API_BASE_URL}/api/appointments/booked-slots/${formData.stylist.id}/${formData.date}`);
          
          if (response.data.success) {
            setBookedSlots(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch availability:", error);
          setBookedSlots([]); 
        } finally {
          setIsFetchingSlots(false);
        }
      }
    };

    fetchAvailability();
  }, [formData.date, formData.stylist]);

  // API Integration Handler
  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        userId: formData.clientPhone, 
        clientName: formData.clientName,
        stylistId: formData.stylist.id,
        services: [{
          serviceId: formData.service.id,
          name: formData.service.name,
          price: formData.service.price
        }],
        date: formData.date,
        timeSlot: formData.timeSlot
      };

      const response = await axios.post(`${API_BASE_URL}/api/appointments/book`, payload);

      if (response.data.success) {
        setStep(5);
      }
    } catch (error) {
      console.error("Booking failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong. Please check your backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-brand-black w-full flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-3xl">
        
        {step < 5 && (
          <div className="mb-12">
            <h2 className="text-3xl font-serif text-brand-white text-center mb-6">
              Reserve Your <span className="text-brand-gold italic">Chair</span>
            </h2>
            <div className="flex justify-between items-center max-w-sm mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-white/10 -z-10 transform -translate-y-1/2"></div>
              {[1, 2, 3, 4].map((num) => (
                <div 
                  key={num} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                    step >= num ? 'bg-brand-gold text-brand-black' : 'bg-brand-black border border-brand-white/20 text-brand-white/50'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-brand-charcoal border border-brand-white/10 p-6 md:p-10 relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Select Service */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-xl font-serif text-brand-white mb-6">1. Choose a Service</h3>
                <div className="space-y-8">
                  {Object.entries(groupedServices).map(([category, services]) => (
                    <div key={category} className="space-y-4">
                      <h4 className="text-brand-gold font-sans text-sm uppercase tracking-widest border-b border-brand-white/10 pb-2">
                        {category}
                      </h4>
                      {services.map((svc) => (
                        <div 
                          key={svc.id}
                          onClick={() => updateForm('service', svc)}
                          className={`p-4 border cursor-pointer transition-all duration-300 flex justify-between items-center ${
                            formData.service?.id === svc.id ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-white/10 hover:border-brand-white/30'
                          }`}
                        >
                          <div>
                            <h4 className="text-brand-white font-sans text-lg">{svc.name}</h4>
                            <p className="text-brand-white/50 text-sm">{svc.duration} • {svc.description}</p>
                          </div>
                          <span className="text-brand-gold font-semibold whitespace-nowrap ml-4">₹{svc.price}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Select Stylist */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-xl font-serif text-brand-white mb-6 text-center">2. Select Your Artist</h3>
                <div className="max-w-md mx-auto">
                  {stylists.map((st) => (
                    <div 
                      key={st.id}
                      onClick={() => updateForm('stylist', st)}
                      className={`p-6 border text-center cursor-pointer transition-all duration-300 ${
                        formData.stylist?.id === st.id ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-white/10 hover:border-brand-white/30'
                      }`}
                    >
                      <h4 className="text-brand-white font-sans text-lg mb-1">{st.name}</h4>
                      <p className="text-brand-gold text-xs uppercase tracking-widest">{st.role}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Date & Time */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-xl font-serif text-brand-white mb-6">3. Date & Time</h3>
                
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-brand-white/70 text-sm uppercase tracking-widest mb-3">
                    <Calendar size={16} /> Select Date
                  </label>
                  <input 
                    type="date" 
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]} 
                    onChange={(e) => updateForm('date', e.target.value)}
                    onKeyDown={(e) => e.preventDefault()} 
                    onClick={(e) => e.target.showPicker && e.target.showPicker()} 
                    className="w-full bg-brand-black border border-brand-white/20 text-brand-white p-3 outline-none focus:border-brand-gold transition-colors color-scheme-dark cursor-pointer"
                  />
                </div>

                {formData.date && (
                  <div>
                    <label className="flex items-center gap-2 text-brand-white/70 text-sm uppercase tracking-widest mb-3">
                      <Clock size={16} /> Available Slots
                    </label>
                    
                    {isFetchingSlots ? (
                      <div className="flex items-center gap-2 text-brand-gold/70 text-sm font-sans mt-4">
                        <Loader2 size={16} className="animate-spin" /> Checking live availability...
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {timeSlots.map((time) => {
                          // --- NEW LOGIC INTEGRATION ---
                          const isBookedInDB = bookedSlots.includes(time);
                          const isPastTime = isSlotInPast(formData.date, time);
                          const isDisabled = isBookedInDB || isPastTime;

                          return (
                            <button
                              key={time}
                              disabled={isDisabled}
                              onClick={() => updateForm('timeSlot', time)}
                              className={`px-5 py-3 border text-sm font-sans transition-all duration-300 ${
                                isDisabled 
                                  ? 'border-brand-white/10 text-brand-white/20 cursor-not-allowed bg-brand-black line-through'
                                  : formData.timeSlot === time 
                                    ? 'border-brand-gold bg-brand-gold text-brand-black font-bold' 
                                    : 'border-brand-white/20 text-brand-white hover:border-brand-gold'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 4: Client Details & Confirm */}
            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-xl font-serif text-brand-white mb-6">4. Final Details</h3>
                
                <div className="bg-brand-black border border-brand-gold/30 p-5 mb-8 flex flex-col gap-2">
                  <p className="text-brand-white text-sm"><span className="text-brand-white/50">Service:</span> {formData.service?.name}</p>
                  <p className="text-brand-white text-sm"><span className="text-brand-white/50">Artist:</span> {formData.stylist?.name}</p>
                  <p className="text-brand-white text-sm"><span className="text-brand-white/50">Time:</span> {formData.date} at {formData.timeSlot}</p>
                  <p className="text-brand-gold font-bold mt-2 pt-2 border-t border-brand-white/10">Total: ₹{formData.service?.price}</p>
                </div>

                <form onSubmit={handleCheckout} className="space-y-5">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      required
                      value={formData.clientName}
                      onChange={(e) => updateForm('clientName', e.target.value)}
                      className="w-full bg-brand-black border border-brand-white/20 text-brand-white p-4 outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      required
                      value={formData.clientPhone}
                      onChange={(e) => updateForm('clientPhone', e.target.value)}
                      className="w-full bg-brand-black border border-brand-white/20 text-brand-white p-4 outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-brand-gold text-brand-black font-sans uppercase tracking-widest font-bold hover:bg-brand-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 5: SUCCESS SCREEN */}
            {step === 5 && (
              <motion.div key="step5" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                <CheckCircle size={64} className="text-brand-gold mx-auto mb-6" strokeWidth={1} />
                <h3 className="text-3xl font-serif text-brand-white mb-4">You're Booked.</h3>
                <p className="text-brand-white/70 font-sans font-light">
                  Your appointment with {formData.stylist?.name} on {formData.date} at {formData.timeSlot} is confirmed. We will send a WhatsApp reminder shortly.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Wizard Navigation Controls */}
        {step < 4 && step > 0 && (
          <div className="flex justify-between mt-8">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
              className={`flex items-center gap-2 text-sm uppercase tracking-widest font-sans transition-colors ${step === 1 ? 'text-transparent' : 'text-brand-white hover:text-brand-gold'}`}
            >
              <ChevronLeft size={16} /> Back
            </button>

            <button 
              onClick={nextStep} 
              disabled={
                (step === 1 && !formData.service) || 
                (step === 2 && !formData.stylist) || 
                (step === 3 && (!formData.date || !formData.timeSlot))
              }
              className={`flex items-center gap-2 text-sm uppercase tracking-widest font-sans transition-colors ${
                (step === 1 && !formData.service) || (step === 2 && !formData.stylist) || (step === 3 && (!formData.date || !formData.timeSlot)) 
                ? 'text-brand-white/20 cursor-not-allowed' 
                : 'text-brand-gold hover:text-brand-white'
              }`}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;