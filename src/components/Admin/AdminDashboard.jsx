import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, LogOut, CheckCircle, Search, Scissors, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuth');
    if (!isAuth) {
      navigate('/admin/login'); 
    } else {
      fetchBookings(true);
      const intervalId = setInterval(() => {
        fetchBookings(false); 
      }, 15000); 
      return () => clearInterval(intervalId);
    }
  }, [navigate]);

  const fetchBookings = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError('');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/appointments/bookings`);
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else if (showLoader) {
        setError("Failed to load bookings");
      }
    } catch (err) {
      if (showLoader) setError("Server connection error");
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/appointments/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setBookings(bookings.map(booking => 
          booking._id === id ? { ...booking, status: newStatus } : booking
        ));
      } else {
        setError("Failed to update status. Please try again.");
      }
    } catch (err) {
      setError("Server connection error when updating status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    navigate('/admin/login');
  };

  const pendingCount = bookings.filter(b => b.status !== 'completed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.phone?.includes(searchTerm);
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && booking.status === 'completed') ||
                         (filter === 'confirmed' && booking.status !== 'completed');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <span className="text-pink-500 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">Live Portal</span>
            <h1 className="text-3xl md:text-5xl font-serif text-indigo-950">Booking Overview</h1>
            <p className="text-slate-500 mt-2 text-sm">Manage all incoming appointments for TONI&GUY Patna.</p>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => fetchBookings(true)} className="text-xs uppercase tracking-widest font-bold bg-white border border-slate-200 px-5 py-3 rounded-xl hover:bg-slate-100 transition shadow-sm">
              Refresh Data
            </button>
            <button onClick={handleLogout} className="text-xs uppercase tracking-widest font-bold bg-rose-100 text-rose-600 px-5 py-3 rounded-xl hover:bg-rose-200 transition flex items-center gap-2">
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Bookings</p>
              <h3 className="text-3xl font-serif text-indigo-950">{bookings.length}</h3>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500"><TrendingUp size={20} /></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Action Required</p>
              <h3 className="text-3xl font-serif text-amber-600">{pendingCount}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500"><Calendar size={20} /></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Completed</p>
              <h3 className="text-3xl font-serif text-emerald-600">{completedCount}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500"><CheckCircle size={20} /></div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-100 text-rose-700 rounded-xl text-sm font-semibold border border-rose-200">
            {error}
          </div>
        )}

        <div className="bg-white p-4 rounded-t-3xl border-t border-l border-r border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search client name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
          
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200 w-full md:w-auto">
            {['all', 'confirmed', 'completed'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-indigo-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-b-3xl border border-slate-200 shadow-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-b-3xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 text-indigo-950 text-xs uppercase tracking-wider font-bold">
                    <th className="p-6 border-b border-slate-200">Client Info</th>
                    <th className="p-6 border-b border-slate-200">Service</th>
                    <th className="p-6 border-b border-slate-200">Date & Time</th>
                    <th className="p-6 border-b border-slate-200">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className={`transition-colors ${booking.status === 'completed' ? 'bg-slate-50/50 opacity-75' : 'hover:bg-slate-50'}`}>
                      <td className="p-6">
                        <div className="font-semibold text-indigo-950 flex items-center gap-2 text-sm">
                          <User size={14} className="text-slate-400" /> {booking.name}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1.5">
                          <Phone size={12} /> {booking.phone}
                        </div>
                        {booking.email && booking.email !== 'N/A' && (
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                            <Mail size={12} /> {booking.email}
                          </div>
                        )}
                      </td>
                      <td className="p-6">
                        <span className="inline-block bg-rose-50 border border-rose-100 text-pink-700 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
                          <Scissors size={10} /> {booking.serviceName || 'General Booking'}
                        </span>
                        {booking.notes && <p className="text-xs text-slate-500 mt-3 italic max-w-xs bg-slate-50 p-2 rounded-md border border-slate-100">{booking.notes}</p>}
                      </td>
                      <td className="p-6">
                        <div className="font-medium text-slate-800 flex items-center gap-2 text-sm">
                          <Calendar size={14} className={booking.status === 'completed' ? 'text-slate-400' : 'text-pink-500'} /> 
                          {new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-sm text-slate-500 flex items-center gap-2 mt-1.5">
                          <Clock size={14} className={booking.status === 'completed' ? 'text-slate-400' : 'text-amber-500'} /> {booking.timeSlot}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-2 items-start">
                          <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-3 py-1.5 rounded-full w-fit ${
                            booking.status === 'completed' ? 'text-indigo-600 bg-indigo-50 border border-indigo-100' : 
                            booking.status === 'in-progress' ? 'text-amber-600 bg-amber-50 border border-amber-100' : 
                            'text-emerald-600 bg-emerald-50'
                          }`}>
                            {booking.status === 'completed' && <CheckCircle size={12} className="text-indigo-500" />}
                            {booking.status === 'in-progress' && <Clock size={12} className="text-amber-500 animate-spin-slow" />}
                            {(!booking.status || booking.status === 'confirmed') && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>}
                            {booking.status || 'Confirmed'}
                          </span>
                          
                          {booking.status !== 'completed' && (
                            <div className="flex gap-3 mt-1">
                              {booking.status !== 'in-progress' && (
                                <button 
                                  onClick={() => handleUpdateStatus(booking._id, 'in-progress')}
                                  className="text-[10px] text-slate-500 hover:text-amber-600 underline underline-offset-2 transition-colors font-semibold"
                                >
                                  Start Service
                                </button>
                              )}
                              
                              <button 
                                onClick={() => handleUpdateStatus(booking._id, 'completed')}
                                className="text-[10px] text-slate-500 hover:text-indigo-600 underline underline-offset-2 transition-colors font-semibold"
                              >
                                Mark Completed
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-16 text-center text-slate-500">
                        <Search className="mx-auto mb-3 text-slate-300" size={32} />
                        No bookings match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}