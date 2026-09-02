import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Loader2, Mail, Key, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/appointments/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('isAdminAuth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError("Invalid email or password. Access denied.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/reception.jpeg')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/80 to-transparent"></div>

      {/* NEW: Back to Website Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-pink-200/70 hover:text-white transition-colors text-xs font-bold font-sans uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
      >
        <ArrowLeft size={16} /> Back to Website
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white/10 backdrop-blur-2xl p-10 rounded-[2rem] shadow-2xl max-w-md w-full border border-white/20 text-center relative z-10"
      >
        <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
          <Lock className="text-white" size={30} />
        </div>
        
        <h2 className="text-3xl font-serif text-white mb-2">Admin Portal</h2>
        <p className="text-sm text-pink-200 mb-8 font-light tracking-wide">Secure Access for TONI&GUY Staff</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          
          <div className="text-left relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="text-white/50" size={18} />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email" 
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="text-left relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Key className="text-white/50" size={18} />
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access Password" 
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          {error && <p className="text-rose-400 text-xs font-semibold bg-rose-500/10 py-2 rounded-lg">{error}</p>}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold tracking-widest uppercase text-xs py-4 rounded-xl hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 mt-2"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            {isLoading ? 'Verifying...' : 'Authenticate'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}