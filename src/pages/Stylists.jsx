import { Star } from 'lucide-react';

// 1. IMPORT YOUR LOCAL IMAGES HERE
// Make sure the filenames match exactly what you uploaded
//import stylist1 from '../assets/images/stylist-1.jpg';
//import stylist2 from '../assets/images/stylist-2.jpg';
//import stylist3 from '../assets/images/stylist-3.jpg';

const Stylists = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Vikram Singh',
      role: 'Art Director',
      specialty: 'Precision Cuts & Editorial Styling',
      // 2. USE THE IMPORTED VARIABLE (No quotes around it)
      //image: stylist1, 
    },
    {
      id: 2,
      name: 'Aisha Sharma',
      role: 'Senior Colourist',
      specialty: 'Balayage & Color Correction',
     // image: stylist2,
    },
    {
      id: 3,
      name: 'Rohan Desai',
      role: 'Top Stylist',
      specialty: 'Men’s Grooming & Texture',
     // image: stylist3,
    }
  ];

  // ... rest of your JSX remains exactly the same

  return (
    <div className="min-h-screen bg-brand-black w-full pb-20">
      
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif text-brand-white mb-6">
          Meet The <span className="text-brand-gold italic">Masters</span>
        </h1>
        <p className="text-brand-white/70 font-sans text-lg font-light leading-relaxed">
          Our Patna team is rigorously trained in the global TONI&GUY academy. 
          Discover the artists behind the transformations.
        </p>
      </section>

      {/* Team Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {teamMembers.map((stylist) => (
            <div key={stylist.id} className="group relative flex flex-col items-center">
              
              {/* Image Container with Grayscale Hover Effect */}
              <div className="w-full aspect-[4/5] overflow-hidden mb-6 relative border border-brand-white/10 group-hover:border-brand-gold transition-colors duration-500">
                <img 
                  src={stylist.image} 
                  alt={stylist.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                
                {/* Overlay for social icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
</svg>
              </div>

              {/* Text Content */}
              <div className="text-center w-full">
                <h3 className="text-2xl font-serif text-brand-white tracking-wide mb-1">
                  {stylist.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star size={14} className="text-brand-gold fill-brand-gold" />
                  <span className="text-brand-gold font-sans text-xs tracking-widest uppercase font-semibold">
                    {stylist.role}
                  </span>
                  <Star size={14} className="text-brand-gold fill-brand-gold" />
                </div>
                <p className="text-brand-white/60 font-sans text-sm font-light">
                  {stylist.specialty}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
};

export default Stylists;