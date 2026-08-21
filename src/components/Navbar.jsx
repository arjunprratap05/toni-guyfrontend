import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50">
      {/* Optional Micro-Bar for Immediate Contact / Trust */}
      <div className="bg-brand-charcoal border-b border-brand-white/5 text-brand-white/70 text-xs py-1.5 px-4 sm:px-6 lg:px-8 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-light tracking-wide">Frazer Road, Patna • Open Daily until 9:00 PM</span>
          </div>
          <a href="tel:9771455363" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors font-light">
            <Phone size={12} className="text-brand-gold" />
            <span>9771455363</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-brand-black/90 backdrop-blur-md border-b border-brand-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Link to="/" onClick={closeMobileMenu} className="font-serif text-2xl tracking-widest text-brand-white">
                TONI&GUY <span className="text-sm tracking-normal text-brand-gold ml-1">PATNA</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-sans uppercase tracking-widest text-brand-white hover:text-brand-gold transition-colors duration-300">
                Home
              </Link>
              <Link to="/services" className="text-sm font-sans uppercase tracking-widest text-brand-white hover:text-brand-gold transition-colors duration-300">
                Services
              </Link>
              <Link to="/about" className="text-sm font-sans uppercase tracking-widest text-brand-white hover:text-brand-gold transition-colors duration-300">
                About
              </Link>
              
              <Link 
                to="/booking" 
                className="px-6 py-3 bg-brand-gold text-brand-black font-sans text-sm uppercase tracking-widest font-semibold hover:bg-brand-white transition-all duration-300 shadow-lg shadow-brand-gold/10"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-white hover:text-brand-gold transition-colors p-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-black/95 backdrop-blur-lg border-b border-brand-white/10 animate-fadeIn">
            <div className="px-4 py-6 space-y-3 flex flex-col">
              <Link 
                to="/" 
                onClick={closeMobileMenu} 
                className="block px-3 py-3 text-center text-sm font-sans uppercase tracking-widest border-b border-brand-white/5 hover:text-brand-gold transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/services" 
                onClick={closeMobileMenu} 
                className="block px-3 py-3 text-center text-sm font-sans uppercase tracking-widest border-b border-brand-white/5 hover:text-brand-gold transition-colors"
              >
                Services
              </Link>
              <Link 
                to="/about" 
                onClick={closeMobileMenu} 
                className="block px-3 py-3 text-center text-sm font-sans uppercase tracking-widest border-b border-brand-white/5 hover:text-brand-gold transition-colors"
              >
                About
              </Link>
              
              <div className="pt-4">
                <Link 
                  to="/booking" 
                  onClick={closeMobileMenu} 
                  className="block w-full text-center px-6 py-3.5 bg-brand-gold text-brand-black text-sm uppercase tracking-widest font-semibold shadow-md"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;