import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Droplets, Flower2, Smile, Star, X, ChevronLeft, ChevronRight } from 'lucide-react'; 
import { servicesMenu } from './Services';

// Helper function to dynamically assign icons based on the service category
const getCategoryIcon = (category) => {
  switch (category) {
    case 'Hair Cut & Styling': return Scissors;
    case 'Hair Color': return Sparkles;
    case 'Chemical Services': return Droplets;
    case 'Hair Treatment':
    case 'Massage & Spa': return Flower2;
    case 'Facials & Skin': return Smile;
    default: return Star;
  }
};

// Curated high-end salon assets for the Ambiance Gallery
const salonGallery = [
  { id: 1, url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop", title: "The Styling Suite", tag: "Main Floor" },
  { id: 2, url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop", title: "Bespoke Color Bar", tag: "Technical Zone" },
  { id: 3, url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200&auto=format&fit=crop", title: "The Wash & Ritual Lounge", tag: "Spa Area" },
  { id: 4, url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop", title: "VIP Grooming Suite", tag: "Private Room" },
  { id: 5, url: "https://images.unsplash.com/photo-1633681926035-ec1ac984418a?q=80&w=1200&auto=format&fit=crop", title: "Premium Editorial Care", tag: "Products" },
  { id: 6, url: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=1200&auto=format&fit=crop", title: "The Welcome Atelier", tag: "Reception" }
];

// Hero Slider Data
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop",
    subtitle: "Experience world-class hairdressing and luxury care."
  },
  {
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2074&auto=format&fit=crop",
    subtitle: "Bespoke coloring crafted by master technicians."
  },
  {
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2074&auto=format&fit=crop",
    subtitle: "Premium grooming, now in the heart of Patna."
  }
];

const Home = () => {
  const [activeImage, setActiveImage] = useState(null);
  
  // --- Hero Slider State ---
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play logic for the hero slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  // Dynamic Signature Services logic
  const dailySignatureServices = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );

    const selectedServices = [];
    const totalServices = servicesMenu.length;

    for (let i = 0; i < 3; i++) {
      const selectedIndex = (dayOfYear * 7 + i * 13) % totalServices;
      selectedServices.push(servicesMenu[selectedIndex]);
    }

    return selectedServices;
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-brand-black">
      
      {/* =========================================
          UPDATED: HERO SLIDER SECTION
          ========================================= */}
      <section className="relative h-[85vh] flex items-center justify-center w-full overflow-hidden group">
        
        {/* Background Slider Container */}
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear"
              style={{ 
                backgroundImage: `url('${slide.image}')`,
                // Optional: Adds a very slow, subtle zoom effect to the background images
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)' 
              }}
            ></div>
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-brand-black/70"></div>
          </div>
        ))}

        {/* Static Text Content overlaying the slider */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-serif text-brand-white mb-6 tracking-wide leading-tight drop-shadow-lg">
            Elevate Your <span className="text-brand-gold italic">Style</span>
          </h1>
          
          {/* Dynamic subtitle based on current slide */}
          <div className="h-8 mb-10 overflow-hidden relative max-w-2xl mx-auto">
            {heroSlides.map((slide, index) => (
              <p 
                key={index}
                className={`absolute inset-0 text-lg md:text-xl font-sans text-brand-white/80 font-light tracking-wider leading-relaxed transition-all duration-700 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {slide.subtitle}
              </p>
            ))}
          </div>

          <Link 
            to="/booking" 
            className="inline-block pointer-events-auto px-10 py-4 bg-brand-gold text-brand-black font-sans text-sm uppercase tracking-widest font-bold hover:bg-brand-white hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Reserve Your Chair
          </Link>
        </div>

        {/* Manual Navigation Controls (Hidden by default, shown on hover on desktop) */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-brand-white/50 hover:text-brand-gold hover:bg-brand-black/50 transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-transparent hover:border-brand-gold/30 rounded-full"
        >
          <ChevronLeft size={32} strokeWidth={1} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-brand-white/50 hover:text-brand-gold hover:bg-brand-black/50 transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-transparent hover:border-brand-gold/30 rounded-full"
        >
          <ChevronRight size={32} strokeWidth={1} />
        </button>

        {/* Minimalist Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-8 h-1.5 bg-brand-gold' 
                  : 'w-2 h-1.5 bg-brand-white/30 hover:bg-brand-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* =========================================
          SIGNATURE SERVICES SECTION
          ========================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-white mb-4">
            Signature <span className="text-brand-gold italic">Treatments</span>
          </h2>
          <div className="h-0.5 w-24 bg-brand-gold mx-auto"></div>
          <p className="text-brand-white/50 text-sm mt-4 font-sans tracking-widest uppercase">
            Today's Hand-Picked Recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dailySignatureServices.map((service, index) => {
            const IconComponent = getCategoryIcon(service.category);
            return (
              <div 
                key={`${service.id}-${index}`} 
                className="group border border-brand-white/10 p-8 hover:border-brand-gold transition-colors duration-300 flex flex-col items-center text-center"
              >
                <IconComponent 
                  className="text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300" 
                  size={40} 
                  strokeWidth={1} 
                />
                <h3 className="text-xl font-serif text-brand-white mb-3 tracking-wide">
                  {service.name}
                </h3>
                <p className="text-brand-white/70 font-sans text-sm font-light leading-relaxed mb-6">
                  {service.description}
                </p>
                <span className="text-brand-gold font-sans text-sm tracking-widest uppercase mt-auto">
                  From ₹{service.price}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="text-brand-white hover:text-brand-gold font-sans text-sm uppercase tracking-widest border-b border-brand-gold pb-1 transition-colors">
            View Full Menu
          </Link>
        </div>
      </section>

      {/* =========================================
          THE SALON AMBIANCE GALLERY SECTION
          ========================================= */}
      <section className="py-24 border-t border-brand-white/5 bg-brand-charcoal/30 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-white mb-4">
              Our <span className="text-brand-gold italic">Ambiance</span>
            </h2>
            <div className="h-0.5 w-24 bg-brand-gold mx-auto"></div>
            <p className="text-brand-white/50 text-sm mt-4 font-sans tracking-widest uppercase">
              Step Into Elite Luxury Architectural Space
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {salonGallery.map((img) => (
              <div 
                key={img.id}
                onClick={() => setActiveImage(img)}
                className="group relative h-80 overflow-hidden border border-brand-white/10 cursor-zoom-in"
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-brand-gold font-sans text-xs uppercase tracking-widest block mb-1 opacity-70">
                    {img.tag}
                  </span>
                  <h3 className="text-brand-white font-serif text-xl tracking-wide">
                    {img.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL SCREEN EXPERIENTIAL LIGHTBOX */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-brand-black/95 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300">
          <button 
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-brand-white/70 hover:text-brand-gold transition-colors p-2"
          >
            <X size={32} strokeWidth={1.5} />
          </button>
          
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img 
              src={activeImage.url} 
              alt={activeImage.title} 
              className="max-w-full max-h-[75vh] object-contain border border-brand-white/10 shadow-2xl"
            />
            <div className="text-center mt-4 max-w-xl">
              <span className="text-brand-gold text-xs uppercase tracking-widest font-sans">{activeImage.tag}</span>
              <h4 className="text-brand-white text-2xl font-serif mt-1">{activeImage.title}</h4>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;