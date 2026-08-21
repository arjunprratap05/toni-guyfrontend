import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sparkles, Droplets, Flower2, Smile, Star, X, Play, ArrowRight } from 'lucide-react';

const fallbackServices = [
  { id: 1, category: 'Hair Cut & Styling', name: 'Artistic Haircut', price: '1,800', description: 'Bespoke structural precision tailored to your bone structure.' },
  { id: 2, category: 'Hair Color', name: 'Signature Balayage', price: '7,500', description: 'Hand-painted, seamless multi-tonal dimension.' },
  { id: 3, category: 'Hair Treatment', name: 'Keratin Infusion', price: '6,500', description: 'Deep structural alignment to eliminate frizz.' },
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

const salonGallery = [
  { id: 1, url: "/video-1.mp4", type: "video", title: "Dermalogica Zone", span: "col-span-12 md:col-span-8 row-span-2" },
  { id: 2, url: "/hero-image1.jpeg", type: "image", title: "Main Floor", span: "col-span-12 md:col-span-4 row-span-1" },
  { id: 3, url: "/hero-image2.jpeg", type: "image", title: "Treatment Room", span: "col-span-12 md:col-span-4 row-span-1" }
];

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
};

export default function HomeFabulous() {
  const [activeMedia, setActiveMedia] = useState(null);
  const dailySignatureServices = useMemo(() => fallbackServices, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-rose-50 font-sans overflow-hidden">
      
      {/* 1. GLASSMORPHISM HERO */}
      <section className="relative min-h-screen flex items-center justify-center w-full overflow-hidden">
        
        {/* Full Screen Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            src="/video-1.mp4" 
            autoPlay loop muted playsInline
            className="w-full h-full object-cover scale-105"
          />
          {/* Vibrant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-rose-900/60 mix-blend-multiply" />
        </div>

        {/* Floating Frosted Glass Content Card */}
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="relative z-10 w-[90%] max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-10 md:p-16 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] text-center mt-20"
        >
          <motion.span variants={fadeUp} className="text-pink-300 uppercase tracking-[0.4em] text-[11px] font-bold mb-6 block drop-shadow-md">
            Toni & Guy , Frazer Road Patna
          </motion.span>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-none tracking-tight drop-shadow-lg">
            Elevate <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-200">Your Style.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-white/90 font-light text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg mx-auto">
            Experience global hairdressing standards and absolute luxury in a vibrant architectural space designed exclusively for your transformation.
          </motion.p>
          
          <motion.div variants={fadeUp}>
            <Link to="/booking" className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[12px] uppercase tracking-[0.2em] font-bold rounded-full hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-105 transition-all duration-500">
              Reserve Your Chair
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. THE ETHOS */}
      <section className="py-32 md:py-48 px-6 bg-indigo-950 text-center flex flex-col items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white max-w-5xl leading-tight">
            "Beauty is not a metric. It is a <span className="italic text-pink-400">feeling of absolute confidence</span> cultivated through expert craftsmanship."
          </h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-pink-500 to-amber-300 mx-auto mt-16 rounded-full"></div>
        </motion.div>
      </section>

      {/* 3. VIBRANT SIGNATURE SERVICES */}
      <section className="py-24 px-6 lg:px-20 bg-rose-50">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <motion.div variants={fadeUp}>
              <span className="text-pink-500 text-[11px] tracking-[0.3em] uppercase font-bold block mb-4">Today's Recommendations</span>
              <h2 className="text-4xl md:text-6xl font-serif text-indigo-950">Curated Treatments</h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/services" className="text-[12px] font-bold uppercase tracking-[0.2em] text-indigo-900 border-b-2 border-indigo-900 pb-1 hover:text-pink-500 hover:border-pink-500 transition-colors duration-300">
                Explore Full Menu
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dailySignatureServices.map((service, index) => {
              const IconComponent = getCategoryIcon(service.category);
              return (
                <motion.div 
                  key={index} variants={fadeUp}
                  className="group relative bg-white p-12 hover:-translate-y-4 transition-all duration-500 cursor-pointer flex flex-col h-full rounded-3xl shadow-xl hover:shadow-[0_40px_80px_rgba(236,72,153,0.15)] overflow-hidden border border-rose-100"
                >
                  {/* Vibrant hover background fill */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  
                  <IconComponent className="text-pink-500 mb-8 group-hover:scale-125 group-hover:text-amber-300 transition-transform duration-700 z-10" size={36} strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif text-indigo-950 group-hover:text-white mb-4 transition-colors duration-500 z-10">{service.name}</h3>
                  <p className="text-slate-500 group-hover:text-pink-100 font-light text-sm leading-relaxed mb-12 flex-grow transition-colors duration-500 z-10">
                    {service.description}
                  </p>
                  <span className="text-indigo-900 group-hover:text-amber-300 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 z-10">
                    From ₹{service.price}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 4. FULL COLOR IMMERSIVE GALLERY */}
      <section className="py-32 px-6 lg:px-20 bg-white">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
          <span className="text-pink-500 text-[11px] tracking-[0.3em] uppercase font-bold block mb-4">Visual Journal</span>
          <h2 className="text-4xl md:text-6xl font-serif text-indigo-950">The Ambiance</h2>
        </motion.div>
        
        <div className="grid grid-cols-12 gap-6 auto-rows-[350px]">
          {salonGallery.map((media) => (
            <motion.div 
              key={media.id}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              onClick={() => setActiveMedia(media)}
              className={`relative group cursor-pointer overflow-hidden rounded-3xl shadow-lg ${media.span}`}
            >
              {media.type === 'video' ? (
                <video src={media.url} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" autoPlay loop muted playsInline />
              ) : (
                <img src={media.url} alt={media.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
              )}
              
              {/* Vibrant Tint Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform duration-700 shadow-2xl">
                  <Play fill="currentColor" size={24} className="ml-1 text-pink-400" />
                </div>
              </div>

              <div className="absolute bottom-10 left-10 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                <h3 className="text-white font-serif text-3xl drop-shadow-md">{media.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SMOOTH LIGHTBOX */}
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
              <X size={32} strokeWidth={2} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ duration: 0.5, type: "spring" }}
              className="w-full max-w-6xl"
            >
              {activeMedia.type === 'video' ? (
                <video src={activeMedia.url} className="w-full max-h-[75vh] object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10" autoPlay controls playsInline />
              ) : (
                <img src={activeMedia.url} alt={activeMedia.title} className="w-full max-h-[75vh] object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10" />
              )}
              <div className="text-center mt-10">
                <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-200 text-4xl font-serif">{activeMedia.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}