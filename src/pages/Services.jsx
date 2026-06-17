import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// 1. We export this array so the Booking engine can read it directly!
export const servicesMenu = [
  // Hair Cut & Styling
  { id: 'h1', category: 'Hair Cut & Styling', name: 'Hair Trimming', price: 850, duration: '30 Min', description: 'Basic trim to maintain hair health and shape.' },
  { id: 'h2', category: 'Hair Cut & Styling', name: 'Hair Cut', price: 700, duration: '45 Min', description: 'Classic haircut tailored to your preferences.' },
  { id: 'h3', category: 'Hair Cut & Styling', name: 'Styling Hair Cut', price: 700, duration: '60 Min', description: 'Bespoke cutting and styling by our expertly trained directors.' },
  { id: 'h_shave', category: 'Hair Cut & Styling', name: 'Shave', price: 300, duration: '30 Min', description: 'Classic smooth shave.' },
  { id: 'h_beard', category: 'Hair Cut & Styling', name: 'Beard Trim', price: 400, duration: '30 Min', description: 'Precision beard shaping and trim.' },
  { id: 'h_child', category: 'Hair Cut & Styling', name: 'Child Hair Cut', price: 500, duration: '30 Min', description: 'Gentle and stylish haircut for children.' },
  { id: 'h_blowdry', category: 'Hair Cut & Styling', name: 'Blow Dry', price: 350, duration: '30 Min', description: 'Professional blowout for volume and style.' },
  { id: 'h_styling', category: 'Hair Cut & Styling', name: 'Styling', price: 500, duration: '45 Min', description: 'Professional hair styling for any occasion.' },
  { id: 'h_mens_pack', category: 'Hair Cut & Styling', name: 'Mens Styling with Shampoo & Conditioner', price: 550, duration: '45 Min', description: 'Complete grooming package for men.' },
  { id: 'h4', category: 'Hair Cut & Styling', name: 'Ironing', price: 1000, duration: '45 Min', description: 'Professional flat ironing for a sleek, straight finish.' },
  { id: 'h5', category: 'Hair Cut & Styling', name: 'Curling Tongs / Styling', price: 1000, duration: '45 Min', description: 'Beautiful, long-lasting curls or waves.' },
  { id: 'h7', category: 'Hair Cut & Styling', name: 'Shampoo & Conditioner', price: 1500, duration: '30 Min', description: 'Premium wash and deep conditioning treatment.' },
  
  // Hair Treatments (NEW from Menu)
  { id: 'ht1', category: 'Hair Treatment', name: 'Hair Spa Loreal', price: 2000, duration: '60 Min', description: 'Nourishing Loreal hair spa for deep hydration.' },
  { id: 'ht2', category: 'Hair Treatment', name: 'Hair Damaged Treatment', price: 2500, duration: '60 Min', description: 'Intensive repair for damaged and brittle hair.' },
  { id: 'ht3', category: 'Hair Treatment', name: 'Dandruff Treatment', price: 2500, duration: '60 Min', description: 'Targeted scalp treatment to eliminate dandruff.' },
  { id: 'ht4', category: 'Hair Treatment', name: 'Hair Fall Treatment', price: 2500, duration: '60 Min', description: 'Strengthening treatment designed to reduce hair fall.' },
  { id: 'ht5', category: 'Hair Treatment', name: 'Ozone with Scalp Treatment', price: 2800, duration: '60 Min', description: 'Deep scalp rejuvenation using ozone therapy.' },
  { id: 'ht6', category: 'Hair Treatment', name: 'Keratin', price: 5000, duration: '120 Min', description: 'Frizz-reduction and smoothing keratin treatment.' },

  // Hair Chemical Services
  { id: 'c1', category: 'Chemical Services', name: 'Permanent Waving (Perming)', price: 7000, duration: '120 Min', description: 'Long-lasting curls and texture.' },
  { id: 'c2', category: 'Chemical Services', name: 'Smoothing', price: 4500, duration: '180 Min', description: 'Frizz-free, smooth, and manageable hair.' },
  { id: 'c3', category: 'Chemical Services', name: 'Straightening', price: 5000, duration: '180 Min', description: 'Permanent straightening for sleek results.' },
  { id: 'c4', category: 'Chemical Services', name: 'Rebonding', price: 5500, duration: '240 Min', description: 'Intensive chemical treatment for perfectly straight hair.' },

  // Hair Color
  { id: 'cl1', category: 'Hair Color', name: 'Global Hair Colour', price: 3000, duration: '90 Min', description: 'Full head color application.' },
  { id: 'cl2', category: 'Hair Color', name: 'Inoa Global', price: 2000, duration: '90 Min', description: 'Ammonia-free global color using L\'Oréal INOA.' },
  { id: 'cl3', category: 'Hair Color', name: 'Majirel Global', price: 1600, duration: '90 Min', description: 'Full head color using premium L\'Oréal Majirel.' },
  { id: 'cl4', category: 'Hair Color', name: 'Highlights Per Streak', price: 500, duration: '15 Min', description: 'Custom foil highlights priced per streak.' },
  { id: 'cl_m', category: 'Hair Color', name: 'Moustache Color', price: 350, duration: '30 Min', description: 'Professional moustache coloring.' },
  { id: 'cl_b', category: 'Hair Color', name: 'Beard Color', price: 600, duration: '30 Min', description: 'Professional beard coloring.' },
  { id: 'cl5', category: 'Hair Color', name: 'Root Touch Up - Majirel', price: 1800, duration: '60 Min', description: 'Flawless root coverage with Majirel.' },
  { id: 'cl6', category: 'Hair Color', name: 'Root Touch Up - Inoa', price: 2000, duration: '60 Min', description: 'Ammonia-free root coverage.' },

  // Nail Art
  { id: 'n1', category: 'Nail Art', name: 'Nail Extension', price: 3000, duration: '90 Min', description: 'Professional acrylic or gel extensions.' },
  { id: 'n2', category: 'Nail Art', name: 'Permanent Nail Paint', price: 1500, duration: '45 Min', description: 'Long-lasting, chip-resistant polish.' },
  { id: 'n3', category: 'Nail Art', name: 'Gel French Polish', price: 1500, duration: '45 Min', description: 'Classic French manicure using gel polish.' },
  
  // Facials & Skin
  { id: 'f1', category: 'Facials & Skin', name: 'Dermalogica Mini Facial', price: 4000, duration: '45 Min', description: 'Targeted skin treatment using premium Dermalogica.' },
  { id: 'f2', category: 'Facials & Skin', name: 'O3 Agelock', price: 4000, duration: '60 Min', description: 'Anti-aging facial treatment for a youthful glow.' },
  { id: 'f3', category: 'Facials & Skin', name: 'Detan', price: 800, duration: '30 Min', description: 'Effective removal of sun tan.' },
  { id: 'f4', category: 'Facials & Skin', name: 'Face Massage', price: 1000, duration: '30 Min', description: 'Relaxing and rejuvenating facial massage.' },

  // Laser & Waxing
  { id: 'w1', category: 'Laser & Waxing', name: 'Laser - Full Body', price: 125000, duration: 'Variable', description: 'Permanent hair reduction for the full body.' },
  { id: 'w2', category: 'Laser & Waxing', name: 'Laser - Full Face', price: 5000, duration: '45 Min', description: 'Permanent hair reduction for the face.' },
  { id: 'w3', category: 'Laser & Waxing', name: 'Waxing - Full Body', price: 5000, duration: '90 Min', description: 'Complete body waxing service.' },
  { id: 'w4', category: 'Laser & Waxing', name: 'Waxing - Full Legs & Arms', price: 1600, duration: '60 Min', description: 'Smooth finish for arms and legs.' },

  // Hand & Feet
  { id: 'hf1', category: 'Hand & Feet', name: 'Basic Manicure & Pedicure', price: 1800, duration: '60 Min', description: 'Standard nail shaping, cuticle care, and polish.' },
  { id: 'hf2', category: 'Hand & Feet', name: 'Crystal Spa Manicure & Pedicure', price: 2800, duration: '90 Min', description: 'Luxurious spa treatment for hands and feet.' },

  // Body Spa & Massage
  { id: 'm1', category: 'Massage & Spa', name: 'Body Spa', price: 7500, duration: '120 Min', description: 'Ultimate relaxation and skin hydration.' },
  { id: 'm2', category: 'Massage & Spa', name: 'Sports Massage', price: 5000, duration: '90 Min', description: 'Deep tissue therapy targeting muscle fatigue.' },
  { id: 'm3', category: 'Massage & Spa', name: 'Swedish Massage', price: 2500, duration: '60 Min', description: 'Classic relaxation massage.' },
  { id: 'm4', category: 'Massage & Spa', name: 'Body Wrap (Assorted Flavors)', price: 2000, duration: '60 Min', description: 'Nourishing wrap.' }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Auto-generate categories based on the data
  const categories = ['All', ...new Set(servicesMenu.map(item => item.category))];

  // Filter the services based on the active tab
  const filteredServices = activeTab === 'All' 
    ? servicesMenu 
    : servicesMenu.filter(service => service.category === activeTab);

  return (
    <div className="min-h-screen bg-brand-black w-full pb-20">
      
      {/* Header Section */}
      <section className="pt-24 pb-12 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif text-brand-white mb-6">
          Curated <span className="text-brand-gold italic">Services</span>
        </h1>
        <p className="text-brand-white/70 font-sans text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Explore our extensive menu of premium hairdressing, bespoke coloring, and rejuvenating treatments.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4 border-b border-brand-white/10 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 text-xs md:text-sm font-sans uppercase tracking-widest transition-all duration-300 ${
                activeTab === category 
                  ? 'text-brand-gold border-b-2 border-brand-gold' 
                  : 'text-brand-white/50 hover:text-brand-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-4">
          
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="group bg-brand-charcoal border border-brand-white/5 hover:border-brand-gold/50 p-6 transition-all duration-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              {/* Left Side: Text Info */}
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-serif text-brand-white tracking-wide">
                    {service.name}
                  </h3>
                  {service.duration !== 'Variable' && (
                    <span className="px-2 py-1 bg-brand-white/5 text-brand-gold text-[10px] md:text-xs uppercase tracking-widest font-sans whitespace-nowrap">
                      {service.duration}
                    </span>
                  )}
                </div>
                <p className="text-brand-white/60 font-sans text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right Side: Price & Action */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-2 md:mt-0 gap-4">
                <span className="text-lg md:text-xl font-sans text-brand-gold font-semibold tracking-wide whitespace-nowrap">
                  ₹{service.price} <span className="text-brand-white/40 text-xs font-light">Onwards</span>
                </span>
                
                <Link 
                  to="/booking" 
                  className="flex items-center gap-2 text-xs md:text-sm font-sans uppercase tracking-widest text-brand-white hover:text-brand-gold transition-colors group-hover:translate-x-1 duration-300 whitespace-nowrap"
                >
                  Book Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}

        </div>

        {/* Tax Note from physical menu */}
        <p className="text-brand-white/40 text-xs text-center font-sans tracking-wider mt-12 italic border-t border-brand-white/10 pt-6">
          NOTE: All rates are exclusive of taxes. 18% service tax will be extra payable.
        </p>
      </section>

    </div>
  );
};

export default Services;