import { Award, Users, Sparkles, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-brand-black text-brand-white min-h-screen pt-32 pb-20">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <span className="text-brand-gold text-xs uppercase tracking-widest font-semibold block mb-3">
          Our Heritage & Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl tracking-wide mb-6">
          The Art of British Hairdressing in Patna
        </h1>
        <p className="font-sans text-brand-white/70 max-w-2xl mx-auto font-light text-base leading-relaxed">
          Located at Faizal Imam Complex on Fraser Road, TONI&GUY Patna brings world-class global styling standards, bespoke hair artistry, and unmatched luxury to Bihar.
        </p>
      </div>

      {/* Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl tracking-wide">
              Redefining Luxury Styling & Hair Care
            </h2>
            <p className="font-sans text-brand-white/70 font-light leading-relaxed">
              We believe your hair is your ultimate accessory. Our salon combines international cutting and coloring techniques with a deep understanding of individual hair textures and personal styles.
            </p>
            <p className="font-sans text-brand-white/70 font-light leading-relaxed">
              Every stylist on our floor is rigorously trained to deliver precision, elegance, and trendsetting look transformations, ensuring you step out feeling confident and radiant.
            </p>
            <div className="pt-4">
              <Link
                to="/booking"
                className="inline-block px-8 py-4 bg-brand-gold text-brand-black font-sans text-sm uppercase tracking-widest font-semibold hover:bg-brand-white transition-all duration-300"
              >
                Book Your Experience
              </Link>
            </div>
          </div>
          
          <div className="bg-brand-charcoal border border-brand-white/10 p-8 sm:p-12 relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-brand-gold"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-brand-gold"></div>
            <blockquote className="font-serif text-xl sm:text-2xl text-brand-white/90 italic leading-relaxed mb-6">
              &ldquo;Our mission is not just to style hair, but to craft an atmosphere of absolute luxury where every client feels uniquely valued.&rdquo;
            </blockquote>
            <p className="font-sans text-brand-gold text-xs uppercase tracking-widest font-semibold">
              — TONI&GUY Patna Team
            </p>
          </div>
        </div>
      </section>

      {/* Core Values / Why Choose Us */}
      <section className="bg-brand-charcoal/50 border-y border-brand-white/10 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl tracking-wide mb-3">The TONI&GUY Promise</h2>
            <p className="font-sans text-brand-white/60 text-sm font-light">Excellence in every detail</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-brand-charcoal p-8 border border-brand-white/5">
              <Award className="text-brand-gold mb-4" size={32} strokeWidth={1.5} />
              <h3 className="font-serif text-lg mb-2 text-brand-white">Expert Stylists</h3>
              <p className="font-sans text-xs text-brand-white/60 font-light leading-relaxed">
                Professionally trained artists skilled in cutting-edge global trends and bespoke coloring techniques.
              </p>
            </div>

            <div className="bg-brand-charcoal p-8 border border-brand-white/5">
              <Sparkles className="text-brand-gold mb-4" size={32} strokeWidth={1.5} />
              <h3 className="font-serif text-lg mb-2 text-brand-white">Premium Products</h3>
              <p className="font-sans text-xs text-brand-white/60 font-light leading-relaxed">
                Exclusive use of top-tier international hair care and styling products to protect and nourish your hair.
              </p>
            </div>

            <div className="bg-brand-charcoal p-8 border border-brand-white/5">
              <Users className="text-brand-gold mb-4" size={32} strokeWidth={1.5} />
              <h3 className="font-serif text-lg mb-2 text-brand-white">Personalized Care</h3>
              <p className="font-sans text-xs text-brand-white/60 font-light leading-relaxed">
                Tailored consultations before every service to match your face shape, lifestyle, and unique preference.
              </p>
            </div>

            <div className="bg-brand-charcoal p-8 border border-brand-white/5">
              <HeartHandshake className="text-brand-gold mb-4" size={32} strokeWidth={1.5} />
              <h3 className="font-serif text-lg mb-2 text-brand-white">Hygiene & Comfort</h3>
              <p className="font-sans text-xs text-brand-white/60 font-light leading-relaxed">
                Impeccably maintained luxury environment ensuring a relaxing and safe salon experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Callout */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl mb-4">Visit Our Flagship Salon</h2>
        <p className="font-sans text-brand-white/70 font-light text-sm mb-8 leading-relaxed">
          2nd floor, Faizal Imam Complex, Fraser Rd, beside Central Mall, Old Jakkanpur, Lodipur, Patna, Bihar 800001
        </p>
        <a 
          href="https://www.google.com/maps?..." 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
        >
          Get Directions on Google Maps
        </a>
      </section>
    </div>
  );
};

export default About;