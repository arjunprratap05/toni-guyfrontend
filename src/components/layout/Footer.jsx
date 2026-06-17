import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal border-t border-brand-white/10 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="flex flex-col">
            <Link to="/" className="font-serif text-2xl tracking-widest text-brand-white mb-4 inline-block">
              TONI&GUY <span className="text-sm tracking-normal text-brand-gold ml-1">PATNA</span>
            </Link>
            <p className="text-brand-white/60 font-sans text-sm font-light leading-relaxed max-w-sm">
              Elevating the standard of hairdressing in Bihar. Experience world-class styling, bespoke color, and unparalleled luxury.
            </p>
          </div>

          {/* Location & Directions */}
          <div className="flex flex-col">
            <h4 className="text-brand-white font-sans text-sm uppercase tracking-widest mb-6 font-semibold">Location</h4>
            <div className="flex items-start gap-3 text-brand-white/70 mb-4">
              <MapPin size={20} className="text-brand-gold shrink-0 mt-0.5" />
              <p className="font-sans text-sm font-light leading-relaxed">
                2nd floor, Faizal Imam Complex,<br />
                Fraser Rd, beside Central Mall,<br />
                Old Jakkanpur, Lodipur,<br />
                Patna, Bihar 800001
              </p>
            </div>
            <a 
              href="https://www.google.com/maps?sca_esv=aa74034db299556c&biw=1536&bih=730&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiG3RvbmkgJmd1eSBmcmF6ZXIgcm9hZCBwYXRuYTIGEAAYFhgeMgUQABjvBTIIEAAYgAQYogQyBRAAGO8FMgUQABjvBUjwEFCGAljED3ABeAGQAQCYAdoBoAHCCKoBBTAuMy4zuAEDyAEA-AEBmAIHoAKeCcICChAAGEcY1gQYsAPCAg0QABhHGNYEGMkDGLADwgIOEAAYgAQYigUYkgMYsAOYAwDiAwUSATEgQIgGAZAGCJIHBTEuMy4zoAe4HrIHBTAuMy4zuAeICcIHBzItMy4zLjHIB0KACAE&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KdfHrURbWO05MUADXvPMty7i&daddr=2nd+floor,+Faizal+Imam+Complex,+Fraser+Rd,+beside+Central+Mall,+Old+Jakkanpur,+Lodipur,+Patna,+Bihar+800001" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-brand-gold font-sans text-xs uppercase tracking-widest hover:text-brand-white transition-colors border-b border-brand-gold/30 pb-0.5 w-max"
            >
              Get Directions
            </a>
          </div>

          {/* Contact & Hours */}
          <div className="flex flex-col">
            <h4 className="text-brand-white font-sans text-sm uppercase tracking-widest mb-6 font-semibold">Connect</h4>
            <div className="flex items-center gap-3 text-brand-white/70 mb-3 hover:text-brand-gold transition-colors w-max cursor-pointer">
              <Phone size={16} className="text-brand-gold" />
              <span className="font-sans text-sm font-light">9771455363 / 6206232151</span>
            </div>
            <div className="flex items-center gap-3 text-brand-white/70 mb-6 hover:text-brand-gold transition-colors w-max cursor-pointer">
              <Mail size={16} className="text-brand-gold" />
              <span className="font-sans text-sm font-light">toniandguypatna18@gmail.com</span>
            </div>
            
            <div className="flex gap-4 mt-2">
              <a href="https://www.instagram.com/toniandguyunisex?utm_source=qr&igsh=MWR2NmdmZ3dpYzJjeg%3D%3D" className="w-10 h-10 rounded-full border border-brand-white/20 flex items-center justify-center text-brand-white hover:border-brand-gold hover:text-brand-gold transition-colors">
                {/* Raw Instagram SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1HbkS5xhtC/" className="w-10 h-10 rounded-full border border-brand-white/20 flex items-center justify-center text-brand-white hover:border-brand-gold hover:text-brand-gold transition-colors">
                {/* Raw Facebook SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-brand-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-white/40 font-sans text-xs tracking-wider">
            &copy; {new Date().getFullYear()} TONI&GUY Patna. All rights reserved.
          </p>
          <div className="flex gap-6 text-brand-white/40 font-sans text-xs tracking-wider">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;