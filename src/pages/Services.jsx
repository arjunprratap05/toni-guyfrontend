import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// 1. COMPLETE EXPORTABLE MENU DATA WITH REVISED RATES
export const servicesMenu = [
  // Hair Cut & Styling
  { id: 'h1', category: 'Hair Cut & Styling', name: 'Hair Trimming', price: 850, duration: '30 Min', description: 'Basic trim to maintain hair health and shape.' },
  { id: 'h2', category: 'Hair Cut & Styling', name: 'Hair Cut', price: 700, duration: '45 Min', description: 'Classic haircut tailored to your preferences.' },
  { id: 'h3', category: 'Hair Cut & Styling', name: 'Styling Hair Cut', price: 900, duration: '60 Min', description: 'Bespoke cutting and styling by our expertly trained directors.' },
  { id: 'h_shave', category: 'Hair Cut & Styling', name: 'Shave', price: 300, duration: '30 Min', description: 'Classic smooth shave.' },
  { id: 'h_beard', category: 'Hair Cut & Styling', name: 'Beard Trim', price: 400, duration: '30 Min', description: 'Precision beard shaping and trim.' },
  { id: 'h_child', category: 'Hair Cut & Styling', name: 'Child Hair Cut', price: 600, duration: '30 Min', description: 'Gentle and stylish haircut for children.' },
  { id: 'h_blowdry', category: 'Hair Cut & Styling', name: 'Blow Dry', price: 350, duration: '30 Min', description: 'Professional blowout for volume and style.' },
  { id: 'h_styling', category: 'Hair Cut & Styling', name: 'Styling', price: 500, duration: '45 Min', description: 'Professional hair styling for any occasion.' },
  { id: 'h_mens_pack', category: 'Hair Cut & Styling', name: 'Mens Styling Package', price: 500, duration: '45 Min', description: 'Complete grooming package with Shampoo & Conditioner.' },
  { id: 'h4', category: 'Hair Cut & Styling', name: 'Ironing (Depend on Length)', price: 1000, duration: '45 Min', description: 'Professional flat ironing for a sleek, straight finish.' },
  { id: 'h5', category: 'Hair Cut & Styling', name: 'Curling Tongs / Styling', price: 1000, duration: '45 Min', description: 'Beautiful, long-lasting curls or waves.' },
  { id: 'h7', category: 'Hair Cut & Styling', name: 'Shampoo & Conditioner', price: 1500, duration: '30 Min', description: 'Premium wash and deep conditioning treatment.' },
  
  // Hair Treatments
  { id: 'ht1', category: 'Hair Treatment', name: 'Hair Spa Loreal', price: 1500, duration: '60 Min', description: 'Nourishing Loreal hair spa for deep hydration.' },
  { id: 'ht2', category: 'Hair Treatment', name: 'Hair Damaged Treatment', price: 2500, duration: '60 Min', description: 'Intensive repair for damaged and brittle hair.' },
  { id: 'ht3', category: 'Hair Treatment', name: 'Dandruff Treatment', price: 2500, duration: '60 Min', description: 'Targeted scalp treatment to eliminate dandruff.' },
  { id: 'ht4', category: 'Hair Treatment', name: 'Hair Fall Treatment', price: 2500, duration: '60 Min', description: 'Strengthening treatment designed to reduce hair fall.' },
  { id: 'ht5', category: 'Hair Treatment', name: 'Ozone with Scalp Treatment', price: 2800, duration: '60 Min', description: 'Deep scalp rejuvenation using ozone therapy.' },
  { id: 'ht6', category: 'Hair Treatment', name: 'Keratin / Blow Out', price: 5000, duration: '120 Min', description: 'Frizz-reduction and smoothing keratin treatment.' },

  // Head Massage Services
  { id: 'hm1', category: 'Massage & Spa', name: 'Coconut Oil Head Massage', price: 600, duration: '30 Min', description: 'Traditional nourishing coconut oil massage.' },
  { id: 'hm2', category: 'Massage & Spa', name: 'Almond Oil Head Massage', price: 700, duration: '30 Min', description: 'Relaxing almond oil scalp treatment.' },
  { id: 'hm3', category: 'Massage & Spa', name: 'Olive Oil Head Massage', price: 750, duration: '30 Min', description: 'Deeply moisturizing olive oil massage.' },
  { id: 'hm4', category: 'Massage & Spa', name: 'Mythic Oil Head Massage', price: 900, duration: '30 Min', description: 'L\'Oréal Mythic oil luxury scalp therapy.' },
  { id: 'hm5', category: 'Massage & Spa', name: 'Moroccan Oil Head Massage', price: 1200, duration: '30 Min', description: 'Revitalizing Moroccan oil treatment.' },
  { id: 'hm6', category: 'Massage & Spa', name: 'Argan Oil Head Massage', price: 1200, duration: '30 Min', description: 'Pure argan oil intensive hair and scalp nourishment.' },

  // Hair Chemical Services
  { id: 'c1', category: 'Chemical Services', name: 'Permanent Waving (Perming)', price: 7000, duration: '120 Min', description: 'Long-lasting curls and texture.' },
  { id: 'c2', category: 'Chemical Services', name: 'Hair Smoothening', price: 4500, duration: '180 Min', description: 'Frizz-free, smooth, and manageable hair.' },
  { id: 'c3', category: 'Chemical Services', name: 'Straightening', price: 5000, duration: '180 Min', description: 'Permanent straightening for sleek results.' },
  { id: 'c4', category: 'Chemical Services', name: 'Rebonding', price: 5500, duration: '240 Min', description: 'Intensive chemical treatment for perfectly straight hair.' },

  // Hair Color
  { id: 'cl1', category: 'Hair Color', name: 'Global Hair Colour (Majirel)', price: 6000, duration: '90 Min', description: 'Full head color application.' },
  { id: 'cl2', category: 'Hair Color', name: 'Inoa Global', price: 5500, duration: '90 Min', description: 'Ammonia-free global color using L\'Oréal INOA.' },
  { id: 'cl3', category: 'Hair Color', name: 'Majirel Global', price: 1800, duration: '90 Min', description: 'Full head color using premium L\'Oréal Majirel.' },
  { id: 'cl4', category: 'Hair Color', name: 'Highlights Per Streak', price: 350, duration: '15 Min', description: 'Custom foil highlights priced per streak.' },
  { id: 'cl_m', category: 'Hair Color', name: 'Moustache Color', price: 350, duration: '30 Min', description: 'Professional moustache coloring.' },
  { id: 'cl_b', category: 'Hair Color', name: 'Beard Color', price: 600, duration: '30 Min', description: 'Professional beard coloring.' },
  { id: 'cl5', category: 'Hair Color', name: 'Root Touch Up - Majirel', price: 2000, duration: '60 Min', description: 'Flawless root coverage with Majirel.' },
  { id: 'cl6', category: 'Hair Color', name: 'Root Touch Up - Inoa', price: 2200, duration: '60 Min', description: 'Ammonia-free root coverage.' },
  { id: 'cl7', category: 'Hair Color', name: 'Root Touch Up - Godrej', price: 1800, duration: '60 Min', description: 'Standard root coverage.' },

  // Facials & Skin
  { id: 'f1', category: 'Facials & Skin', name: 'Dermalogica Mini Facial', price: 4000, duration: '45 Min', description: 'Targeted skin treatment using premium Dermalogica.' },
  { id: 'f2', category: 'Facials & Skin', name: 'O3 Agelock', price: 4000, duration: '60 Min', description: 'Anti-aging facial treatment for a youthful glow.' },
  { id: 'f3', category: 'Facials & Skin', name: 'Detan', price: 800, duration: '30 Min', description: 'Effective removal of sun tan.' },
  { id: 'f_bleach', category: 'Facials & Skin', name: 'Face Bleach', price: 1000, duration: '30 Min', description: 'Brightening facial bleach treatment.' },
  { id: 'f4', category: 'Facials & Skin', name: 'Face Massage', price: 1000, duration: '30 Min', description: 'Relaxing and rejuvenating facial massage.' },

  // Laser & Waxing
  { id: 'w_full_legs', category: 'Laser & Waxing', name: 'Waxing - Full Legs', price: 1000, duration: '45 Min', description: 'Smooth full leg waxing.' },
  { id: 'w_full_arms', category: 'Laser & Waxing', name: 'Waxing - Full Arms', price: 600, duration: '30 Min', description: 'Smooth full arm waxing.' },
  { id: 'w_half_legs', category: 'Laser & Waxing', name: 'Waxing - Half Legs', price: 500, duration: '30 Min', description: 'Half leg waxing.' },
  { id: 'w_side_locks', category: 'Laser & Waxing', name: 'Waxing - Side Locks', price: 300, duration: '20 Min', description: 'Side locks waxing.' },
  { id: 'w_under_arms', category: 'Laser & Waxing', name: 'Waxing - Under Arms', price: 250, duration: '15 Min', description: 'Under arms waxing.' },
  { id: 'w_back', category: 'Laser & Waxing', name: 'Waxing - Back', price: 1500, duration: '45 Min', description: 'Full back waxing.' },
  { id: 'w_front', category: 'Laser & Waxing', name: 'Waxing - Front', price: 1500, duration: '45 Min', description: 'Front torso waxing.' },
  { id: 'w_brazilian', category: 'Laser & Waxing', name: 'Waxing - Brazilian', price: 2500, duration: '45 Min', description: 'Brazilian intimate waxing.' },
  { id: 'w3', category: 'Laser & Waxing', name: 'Waxing - Full Body', price: 5000, duration: '90 Min', description: 'Complete body waxing service.' },
  { id: 'w2', category: 'Laser & Waxing', name: 'Laser - Full Face', price: 5000, duration: '45 Min', description: 'Permanent hair reduction for the face.' },
  { id: 'w1', category: 'Laser & Waxing', name: 'Laser - Full Body', price: 125000, duration: 'Variable', description: 'Permanent hair reduction for the full body.' },

  // Hand & Feet
  { id: 'hf_basic_m', category: 'Hand & Feet', name: 'Basic Manicure', price: 900, duration: '45 Min', description: 'Standard hand nail shaping and cuticle care.' },
  { id: 'hf_basic_p', category: 'Hand & Feet', name: 'Basic Pedicure', price: 1000, duration: '45 Min', description: 'Standard foot care and nail shaping.' },
  { id: 'hf_crystal_m', category: 'Hand & Feet', name: 'Crystal Spa Manicure', price: 1500, duration: '60 Min', description: 'Luxurious spa hand treatment.' },
  { id: 'hf_crystal_p', category: 'Hand & Feet', name: 'Crystal Spa Pedicure', price: 2000, duration: '60 Min', description: 'Luxurious spa foot treatment.' },
  { id: 'hf_paraffin', category: 'Hand & Feet', name: 'Paraffin Treatment', price: 500, duration: '30 Min', description: 'Deep hydrating paraffin wax treatment.' },
  { id: 'hf_heel_peel', category: 'Hand & Feet', name: 'Heel Peel (Manicure / Pedicure)', price: 500, duration: '30 Min', description: 'Intensive cracked heel smoothing peel.' },
  { id: 'hf_relax', category: 'Hand & Feet', name: 'Foot Relaxology', price: 2000, duration: '45 Min', description: 'Relieving foot reflexology massage.' },

  // Body Spa & Massage
  { id: 'm1', category: 'Massage & Spa', name: 'Body Spa', price: 7500, duration: '120 Min', description: 'Ultimate relaxation and skin hydration.' },
  { id: 'm2', category: 'Massage & Spa', name: 'Sports Massage', price: 5000, duration: '90 Min', description: 'Deep tissue therapy targeting muscle fatigue.' },
  { id: 'm3', category: 'Massage & Spa', name: 'Swedish Massage', price: 2500, duration: '60 Min', description: 'Classic relaxation massage.' },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('All');

  // Auto-extract unique categories from the array
  const categories = ['All', ...new Set(servicesMenu.map(item => item.category))];

  // Filter based on active tab
  const filteredServices = activeTab === 'All' 
    ? servicesMenu 
    : servicesMenu.filter(service => service.category === activeTab);

  return (
    <div className="min-h-screen bg-[#0a0a0a] w-full pb-24 font-sans text-white">
      
      {/* 2. HEADER SECTION */}
      <section className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
          Toni & Guy Patna
        </span>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-wide">
          Curated <span className="text-[#D4AF37] italic font-light">Services</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
          Explore our extensive menu of premium hairdressing, bespoke coloring, and rejuvenating spa treatments tailored precisely to you.
        </p>
      </section>

      {/* 3. CATEGORY SELECTION */}
      <section className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="md:hidden mb-6">
          <label htmlFor="category-select" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
            Select Category
          </label>
          <select
            id="category-select"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full bg-[#111111] border border-white/10 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-2 border-b border-white/10 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-sm border ${
                activeTab === category 
                  ? 'text-black bg-[#D4AF37] border-[#D4AF37]' 
                  : 'text-gray-400 bg-[#111111] border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 4. SERVICES LIST (Grid Layout) */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {filteredServices.map((service) => {
            const basePrice = service.price;
            const gstAmount = basePrice * 0.05;
            const finalTotal = basePrice + gstAmount;

            return (
              <div 
                key={service.id} 
                className="group bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 rounded-lg p-6 lg:p-8 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="mb-8">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">
                      {service.name}
                    </h3>
                    {service.duration !== 'Variable' && (
                      <span className="px-3 py-1 bg-white/5 text-gray-300 rounded text-[10px] uppercase tracking-widest whitespace-nowrap border border-white/5">
                        {service.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center border-t border-white/5 pt-6 mt-auto gap-6">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[11px] uppercase tracking-widest mb-1">
                      Final Price Breakdown
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#D4AF37] text-xl font-bold font-serif">
                        ₹{finalTotal.toFixed(0)}
                      </span>
                      <span className="text-gray-400 text-xs font-mono">
                        (₹{basePrice} + 5% GST)
                      </span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/booking?service=${service.id}`} 
                    className="w-full sm:w-auto text-center px-8 py-3 bg-[#D4AF37] text-black text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Book Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* 5. FOOTER NOTE */}
      <section className="max-w-[1200px] mx-auto px-6 mt-16 text-center">
        <p className="text-gray-500 text-xs tracking-widest uppercase pb-6 border-t border-white/10 pt-8">
          Note: All Final Prices displayed include applicable Goods and Services Tax (GST).
        </p>
      </section>

    </div>
  );
}

