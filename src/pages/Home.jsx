import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sparkles, Droplets, Flower2, Smile, Star, X, Play, ArrowRight, ShieldCheck, Clock, Award, ChevronLeft, ChevronRight, MessageSquareHeart, CheckCircle2 } from 'lucide-react';

const fallbackServices = [
  { id: 1, category: 'Hair Cut & Styling', name: 'Artistic Haircut', price: '1,800', description: 'Bespoke structural precision tailored to your bone structure.', tag: 'Signature' },
  { id: 2, category: 'Hair Color', name: 'Signature Balayage', price: '7,500', description: 'Hand-painted, seamless multi-tonal dimension.', tag: 'Master Class' },
  { id: 'h6', category: 'Hair Treatment', name: 'Keratin Infusion', price: '6,500', description: 'Deep structural alignment to eliminate frizz.', tag: 'Luxury Care' },
];

const salonGallery = [
  { id: 1, url: "/video-1.mp4", type: "video", title: "Global Hair Styling Suite", category: "Styling", span: "col-span-12 lg:col-span-8 row-span-2" },
  { id: 2, url: "/reception.jpeg", type: "image", title: "Luxury Waiting Lounge", category: "Ambiance", span: "col-span-12 lg:col-span-4 row-span-1" },
  { id: 3, url: "/viproomskin.jpeg", type: "image", title: "VIP Skin Suite", category: "Wellness", span: "col-span-12 lg:col-span-4 row-span-1" },
  
  { id: 4, url: "/colorjone.jpeg", type: "image", title: "L'Oréal Color Zone", category: "Color Bar", span: "col-span-12 md:col-span-4 row-span-1" },
  { id: 5, url: "/labelm.jpeg", type: "image", title: "Premium Retail Collection", category: "Skincare", span: "col-span-12 md:col-span-4 row-span-1" },
  { id: 6, url: "/zone.jpeg", type: "image", title: "Authentic Haircare", category: "Retail", span: "col-span-12 md:col-span-4 row-span-1" },
  
  { id: 7, url: "/VIPRoomweightloss.jpeg", type: "image", title: "Private Treatment Room", category: "Exclusivity", span: "col-span-12 md:col-span-4 row-span-1" },
  { id: 8, url: "/Viproomhair.mp4", type: "video", title: "VIP Hair Wash Station", category: "Comfort", span: "col-span-12 md:col-span-4 row-span-1" },
  { id: 9, url: "/vip.mp4", type: "video", title: "Zen Ambiance", category: "Relaxation", span: "col-span-12 md:col-span-4 row-span-1" }
];

const clientReviews = [
  { id: 1, name: "Priya Sharma", comment: "The absolute best luxury salon experience in Patna. The balayage work is world-class!", rating: 5, service: "Signature Balayage" },
  { id: 2, name: "Dr. Alok Sinha", comment: "Immaculate hygiene, professional staff, and exceptional attention to detail. Highly recommend.", rating: 5, service: "Artistic Haircut & Beard Grooming" },
  { id: 3, name: "Neha Singh", comment: "Got a Keratin treatment done. My hair has never felt this smooth and vibrant. Truly premium!", rating: 5, service: "Keratin Infusion" }
];

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const partnerImages = [
  "/colorjone.jpeg",
  "/labelm.jpeg",
  "/zone.jpeg"
];

export default function HomeFabulous() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [closedText, setClosedText] = useState("Salon Closed — Opens Tomorrow at 11:00 AM");
  const [currentPartnerImg, setCurrentPartnerImg] = useState(0);
  const dailySignatureServices = useMemo(() => fallbackServices, []);
  
  const heroVideoRef = useRef(null);

  // VIDEO AUTOPLAY FIX
  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.defaultMuted = true;
      heroVideoRef.current.muted = true;
      heroVideoRef.current.play().catch(error => {
        console.log("Autoplay was prevented by browser:", error);
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartnerImg((prev) => (prev + 1) % partnerImages.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  // Live Salon Status Checker
  useEffect(() => {
    const checkSalonStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      
      if (hours >= 11 && hours < 21) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
        if (hours < 11) {
          setClosedText("Salon Closed — Opens Today at 11:00 AM");
        } 
        else {
          setClosedText("Salon Closed — Opens Tomorrow at 11:00 AM");
        }
      }
    };
    
    checkSalonStatus();
    const interval = setInterval(checkSalonStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % clientReviews.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + clientReviews.length) % clientReviews.length);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-rose-50 font-sans overflow-hidden text-slate-900">
      
      <section className="relative min-h-screen flex items-center justify-center w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* UPDATED HERO VIDEO */}
          <video 
            ref={heroVideoRef}
            src="/video-1.mp4" 
            autoPlay={true} 
            loop={true} 
            muted={true} 
            playsInline={true}
            preload="metadata"
            className="w-full h-full object-cover scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-900/30 to-rose-950/60 mix-blend-multiply" />
        </div>

        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="relative z-10 w-[92%] max-w-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-10 md:p-16 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.25)] text-center mt-16"
        >
          <motion.span variants={fadeUp} className="text-pink-200 uppercase tracking-[0.4em] text-[11px] font-bold mb-6 block drop-shadow">
            Toni & Guy, Frazer Road Patna
          </motion.span>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-none tracking-tight drop-shadow-md">
            Elevate <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200">Your Style.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-white/90 font-light text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg mx-auto">
            Experience global hairdressing standards and absolute luxury in a vibrant architectural space designed exclusively for your transformation.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[12px] uppercase tracking-[0.2em] font-bold rounded-full hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-105 transition-all duration-500">
              Reserve Your Chair
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 text-white border border-white/20 text-[12px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white hover:text-indigo-950 transition-all duration-500">
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-20 max-w-5xl mx-auto -mt-10 px-6 w-full">
        <div className="bg-white/90 backdrop-blur-xl border border-rose-200 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <span className={`w-4 h-4 rounded-full ${isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span className={`absolute w-7 h-7 rounded-full animate-ping opacity-75 ${isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            </div>
            <div>
              <h4 className="font-serif text-lg text-indigo-950 font-bold">
                {isOpenNow ? "We Are Open & Styling Now!" : closedText}
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                {isOpenNow 
                  ? "Master stylists are active on the floor. Walk-ins & instant bookings welcome!" 
                  : (closedText.includes("Today") 
                      ? "Secure your chair early for today's preferred slot." 
                      : "Secure your chair in advance for tomorrow's preferred slot.")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-rose-200 pt-4 md:pt-0 md:pl-6 text-indigo-950">
            <Clock className="text-pink-500 shrink-0" size={22} />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Timing</span>
              <span className="text-xs font-semibold">11:00 AM – 9:00 PM (Daily)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-rose-200 bg-white/80 backdrop-blur py-10 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Award className="text-rose-500 mb-2" size={26} strokeWidth={1.5} />
            <h4 className="font-serif text-lg text-indigo-950">Global Standards</h4>
            <p className="text-xs text-slate-500 font-light mt-1">International cutting & tech</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-rose-500 mb-2" size={26} strokeWidth={1.5} />
            <h4 className="font-serif text-lg text-indigo-950">Premium Products</h4>
            <p className="text-xs text-slate-500 font-light mt-1">L'Oréal, Inoa & Dermalogica</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="text-rose-500 mb-2" size={26} strokeWidth={1.5} />
            <h4 className="font-serif text-lg text-indigo-950">Open Daily</h4>
            <p className="text-xs text-slate-500 font-light mt-1">11:00 AM – 9:00 PM</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="text-rose-500 mb-2" size={26} strokeWidth={1.5} />
            <h4 className="font-serif text-lg text-indigo-950">Bespoke Care</h4>
            <p className="text-xs text-slate-500 font-light mt-1">Personalized style consultations</p>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-40 px-6 bg-indigo-950 text-center flex flex-col items-center text-white">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="max-w-4xl"
        >
          <span className="text-pink-400 text-[10px] tracking-[0.4em] uppercase font-bold block mb-6">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-tight uppercase tracking-wider">
            "The Ultimate <span className="italic text-pink-300">Fashion Accessory:</span> <br/> Your Hair."
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-pink-500 to-amber-300 mx-auto mt-12 rounded-full"></div>
        </motion.div>
      </section>

      <section className="py-28 px-6 lg:px-20 bg-rose-50">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div variants={fadeUp}>
              <span className="text-pink-500 text-[11px] tracking-[0.3em] uppercase font-bold block mb-3">Curated Selection</span>
              <h2 className="text-4xl md:text-6xl font-serif text-indigo-950">Signature Treatments</h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/services" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-indigo-900 border-b-2 border-indigo-900 pb-1 hover:text-pink-500 hover:border-pink-500 transition-colors">
                Explore Full Menu <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dailySignatureServices.map((service, index) => {
              const IconComponent = getCategoryIcon(service.category);
              return (
                <motion.div 
                  key={index} variants={fadeUp}
                  className="group relative bg-white p-10 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full rounded-3xl shadow-xl hover:shadow-[0_30px_60px_rgba(236,72,153,0.15)] border border-rose-100 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl font-semibold">
                    {service.tag}
                  </div>

                  <IconComponent className="text-pink-500 mb-6 group-hover:scale-110 transition-transform duration-500" size={32} strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif text-indigo-950 group-hover:text-pink-600 mb-3 transition-colors">{service.name}</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-10 flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-rose-100 mt-auto">
                    <span className="text-indigo-950 text-sm font-bold tracking-wider">
                      From ₹{service.price}
                    </span>
                    <Link to={`/booking?service=${service.id}`} className="text-xs uppercase tracking-widest text-pink-500 font-semibold flex items-center gap-1 hover:text-indigo-950 transition-colors">
                      Book <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6 lg:px-20 bg-indigo-950 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-pink-400 text-[11px] tracking-[0.3em] uppercase font-bold block mb-4">Official Partner</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              World-Class Brands. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 italic">Uncompromising Quality.</span>
            </h2>
            <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              As an authorized TONI&GUY flagship, we exclusively formulate and retail with the absolute best in global beauty science. Experience vibrant, lasting transformations powered by international luxury lines.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-white font-sans text-sm tracking-wide">
                <CheckCircle2 className="text-pink-500 shrink-0" size={20} /> L'Oréal Professionnel, INOA & XTENSO
              </li>
              <li className="flex items-center gap-3 text-white font-sans text-sm tracking-wide">
                <CheckCircle2 className="text-pink-500 shrink-0" size={20} /> Dermalogica, Lotus & Thalgo Skincare
              </li>
              <li className="flex items-center gap-3 text-white font-sans text-sm tracking-wide">
                <CheckCircle2 className="text-pink-500 shrink-0" size={20} /> label.m, GK Hair & MoroccanOil
              </li>
            </ul>

            <Link to="/services" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 text-[12px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white hover:text-indigo-950 transition-all duration-500">
              Discover Products
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-amber-500/20 blur-3xl transform scale-110"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 aspect-[4/3] md:aspect-[4/3] lg:aspect-[4/5] bg-black">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentPartnerImg}
                  src={partnerImages[currentPartnerImg]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  alt="Premium Retail Display at TONI&GUY Patna" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 z-10">
                <p className="text-white text-xs md:text-sm font-light tracking-wide mb-4">
                  Take the luxury salon experience home with our bespoke retail collection.
                </p>
                <div className="flex gap-2">
                  {partnerImages.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentPartnerImg ? 'w-8 bg-pink-500' : 'w-2 bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-20 bg-white">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
          <span className="text-pink-500 text-[11px] tracking-[0.3em] uppercase font-bold block mb-3">Visual Journal</span>
          <h2 className="text-4xl md:text-6xl font-serif text-indigo-950">The Salon Atmosphere</h2>
          <p className="text-slate-500 text-sm font-light mt-4">Click any frame to view our interactive high-definition media showcase.</p>
        </motion.div>
        
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[340px]">
          {salonGallery.map((media) => (
            <motion.div 
              key={media.id}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              onClick={() => setActiveMedia(media)}
              className={`relative group cursor-pointer overflow-hidden rounded-3xl shadow-lg border border-rose-100 ${media.span}`}
            >
              {media.type === 'video' ? (
                // UPDATED GALLERY VIDEO
                <video 
                  src={media.url} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  autoPlay={true} 
                  loop={true} 
                  muted={true} 
                  playsInline={true} 
                  preload="metadata"
                />
              ) : (
                <img src={media.url} alt={media.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                  {media.type === 'video' ? <Play fill="currentColor" size={20} className="ml-0.5 text-white" /> : <Flower2 size={24} className="text-white" />}
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-pink-300 text-[10px] uppercase tracking-widest font-semibold block mb-1">{media.category}</span>
                <h3 className="text-white font-serif text-xl md:text-2xl drop-shadow-md leading-tight">{media.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-28 px-6 bg-rose-100/50 border-t border-rose-200 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-pink-600 text-[11px] tracking-[0.3em] uppercase font-bold block mb-3">Client Experiences</span>
          <h2 className="text-3xl md:text-5xl font-serif text-indigo-950 mb-12">Words From Our Patrons</h2>

          <div className="relative min-h-[220px] bg-white border border-rose-200 p-8 md:p-12 rounded-3xl flex flex-col justify-between shadow-xl">
            <div className="flex justify-center gap-1 text-amber-400 mb-6">
              {[...Array(clientReviews[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            <p className="font-serif text-lg md:text-xl text-slate-700 italic mb-6 leading-relaxed">
              &ldquo;{clientReviews[activeTestimonial].comment}&rdquo;
            </p>

            <div>
              <h4 className="font-sans font-bold text-indigo-950 text-sm tracking-widest uppercase">{clientReviews[activeTestimonial].name}</h4>
              <span className="text-xs text-pink-600 font-light">Service: {clientReviews[activeTestimonial].service}</span>
            </div>

            <div className="absolute inset-y-0 -left-5 flex items-center">
              <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-white border border-rose-200 text-indigo-950 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors shadow-lg">
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute inset-y-0 -right-5 flex items-center">
              <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-white border border-rose-200 text-indigo-950 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors shadow-lg">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white text-center border-t border-rose-100">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-950 to-rose-950 p-10 md:p-16 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <span className="text-pink-300 text-[11px] tracking-[0.3em] uppercase font-bold block mb-4">Verified Reputation</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Loved Your Experience at TONI&GUY Patna?</h2>
          <p className="text-gray-300 font-light text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            We take pride in delivering world-class styling. Join our 700+ happy patrons by sharing your feedback directly on Google.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://www.google.com/maps/place/Toni%26Guy/@25.6124381,85.1364319,17z/data=!3m1!5s0x39ed5840ffbb2b59:0x2ef74a4a40d2fe!4m8!3m7!1s0x39ed585b44adc7d7:0xe22eb7ccf35e0340!8m2!3d25.6124381!4d85.1390068!9m1!1b1!16s%2Fg%2F11b7k0v2dz?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-indigo-950 text-[12px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-lg"
            >
              <MessageSquareHeart size={18} className="text-pink-500" />
              Leave a Google Review
            </a>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold px-4 py-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-white text-xs font-sans tracking-wider font-light">4.5 Rating (718+ Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeMedia && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-indigo-950/95 flex items-center justify-center p-4 lg:p-12 backdrop-blur-2xl"
          >
            <button 
              onClick={() => setActiveMedia(null)} 
              className="absolute top-6 right-6 lg:top-10 lg:right-10 text-pink-300 hover:text-white transition-colors z-50 bg-white/10 p-3 rounded-full hover:bg-pink-500"
            >
              <X size={28} strokeWidth={2} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="w-full max-w-5xl text-center"
            >
              {activeMedia.type === 'video' ? (
                // UPDATED POPUP VIDEO
                <video 
                  src={activeMedia.url} 
                  className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10 mx-auto" 
                  autoPlay={true} 
                  controls={true} 
                  playsInline={true}
                  muted={true} 
                />
              ) : (
                <img src={activeMedia.url} alt={activeMedia.title} className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10 mx-auto" />
              )}
              <div className="mt-6">
                <span className="text-pink-300 text-xs uppercase tracking-widest font-semibold">{activeMedia.category}</span>
                <h3 className="text-white text-3xl font-serif mt-1">{activeMedia.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}