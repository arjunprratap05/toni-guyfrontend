import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, LogOut, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1. Check Authentication on Load
  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuth');
    if (!isAuth) {
      navigate('/admin/login'); 
    } else {
      fetchBookings();
    }
  }, [navigate]);

  // 2. Fetch Data from Backend
  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/appointments/bookings`);
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        setError("Failed to load bookings");
      }
    } catch (err) {
      setError("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  // 3. Mark Booking as Completed
// 3. Mark Booking as Completed
const handleMarkCompleted = async (id) => {
  setError(''); // <-- ADD THIS LINE to clear old errors

  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${API_URL}/api/appointments/bookings/${id}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      setBookings(bookings.map(booking => 
        booking._id === id ? { ...booking, status: 'completed' } : booking
      ));
    } else {
      setError("Failed to update status. Please try again.");
    }
  } catch (err) {
    setError("Server connection error when updating status.");
  }
};

  // 4. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <span className="text-pink-500 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">Live Portal</span>
            <h1 className="text-3xl md:text-5xl font-serif text-indigo-950">Booking Overview</h1>
            <p className="text-slate-500 mt-2 text-sm">Manage all incoming appointments for TONI&GUY Patna.</p>
          </div>
          
          {/* Action Buttons Container */}
          <div className="flex gap-3">
            <button onClick={fetchBookings} className="text-xs uppercase tracking-widest font-bold bg-white border border-slate-200 px-5 py-3 rounded-xl hover:bg-slate-100 transition shadow-sm">
              Refresh Data
            </button>
            <button onClick={handleLogout} className="text-xs uppercase tracking-widest font-bold bg-rose-100 text-rose-600 px-5 py-3 rounded-xl hover:bg-rose-200 transition flex items-center gap-2">
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-100 text-rose-700 rounded-xl text-sm font-semibold border border-rose-200">
            {error}
          </div>
        )}

        {/* Data Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
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
                  {bookings.map((booking) => (
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
                        <span className="inline-block bg-rose-50 border border-rose-100 text-pink-700 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">
                          {booking.serviceName || 'General Booking'}
                        </span>
                        {booking.notes && <p className="text-xs text-slate-500 mt-3 italic max-w-xs bg-slate-50 p-2 rounded-md">{booking.notes}</p>}
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
                            booking.status === 'completed' 
                              ? 'text-indigo-600 bg-indigo-50 border border-indigo-100' 
                              : 'text-emerald-600 bg-emerald-50'
                          }`}>
                            {booking.status === 'completed' ? (
                              <CheckCircle size={12} className="text-indigo-500" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            )}
                            {booking.status || 'Confirmed'}
                          </span>
                          
                          {/* Complete Button only shows if it isn't completed yet */}
                          {booking.status !== 'completed' && (
                            <button 
                              onClick={() => handleMarkCompleted(booking._id)}
                              className="text-[10px] text-slate-500 hover:text-indigo-600 underline underline-offset-2 transition-colors mt-1"
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-16 text-center text-slate-500">
                        <Calendar className="mx-auto mb-3 text-slate-300" size={32} />
                        No incoming bookings found yet.
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