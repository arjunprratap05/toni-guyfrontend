import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to close the menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-brand-black/90 backdrop-blur-md border-b border-brand-white/10">
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
            
            <Link 
              to="/booking" 
              className="px-6 py-3 bg-brand-gold text-brand-black font-sans text-sm uppercase tracking-widest font-semibold hover:bg-brand-white transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-white hover:text-brand-gold transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-black border-b border-brand-white/10">
          <div className="px-2 pt-2 pb-6 space-y-1 flex flex-col">
            <Link 
              to="/" 
              onClick={closeMobileMenu} 
              className="block px-3 py-4 text-center text-sm font-sans uppercase tracking-widest border-b border-brand-white/5 hover:text-brand-gold"
            >
              Home
            </Link>
            <Link 
              to="/services" 
              onClick={closeMobileMenu} 
              className="block px-3 py-4 text-center text-sm font-sans uppercase tracking-widest border-b border-brand-white/5 hover:text-brand-gold"
            >
              Services
            </Link>
            
            <div className="px-4 mt-6">
              <Link 
                to="/booking" 
                onClick={closeMobileMenu} 
                className="block w-full text-center px-6 py-4 bg-brand-gold text-brand-black text-sm uppercase tracking-widest font-semibold"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;