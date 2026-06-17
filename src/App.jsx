import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Stylists from './pages/Stylists';
import Booking from './pages/Booking';
import Services from './pages/Services';

function App() {
  return (
    <Router>
      {/* min-h-screen ensures the page takes up the full height, pushing the footer to the bottom */}
      <div className="min-h-screen flex flex-col font-sans bg-brand-black">
        <Navbar />
        
        {/* flex-grow ensures the main content expands to push the footer down if the page is short */}
        <main className="flex-grow pt-20"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
           
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>

        <Footer /> {/* <-- 2. Render Footer below main */}
      </div>
    </Router>
  );
}

export default App;