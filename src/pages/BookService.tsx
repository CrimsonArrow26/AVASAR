import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  Calendar, 
  Clock, 
  Star, 
  MapPin, 
  User, 
  Phone,
  IndianRupee,
  AlertCircle 
} from 'lucide-react';

interface ServiceProvider {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  photo_url: string | null;
  experience_years: number;
  hourly_rate: number;
  available_days: string[];
  available_hours: string;
  categories: {
    name: string;
    icon: string;
  };
}

const BookService: React.FC = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [bookingData, setBookingData] = useState({
    serviceDate: '',
    serviceTime: '',
    durationHours: 2,
    specialRequests: ''
  });

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM'
  ];

  useEffect(() => {
    if (providerId) {
      fetchProvider();
    }
  }, [providerId]);

  const fetchProvider = async () => {
    try {
      const { data, error } = await supabase
        .from('service_providers')
        .select(`
          *,
          categories (
            name,
            icon
          )
        `)
        .eq('id', providerId)
        .single();

      if (error) throw error;
      setProvider(data);
    } catch (error) {
      console.error('Error fetching provider:', error);
      setError('Provider not found');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isDateAvailable = (date: string): boolean => {
    if (!provider) return false;
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    return provider.available_days.includes(dayOfWeek);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const calculateTotal = () => {
    return provider ? provider.hourly_rate * bookingData.durationHours : 0;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!provider) return;

    setError('');
    setBookingLoading(true);

    try {
      // Validate booking data
      if (!bookingData.serviceDate || !bookingData.serviceTime) {
        throw new Error('Please select date and time');
      }

      if (!isDateAvailable(bookingData.serviceDate)) {
        throw new Error('Selected date is not available');
      }

      const totalAmount = calculateTotal();

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_id: user.id,
          provider_id: provider.id,
          service_date: bookingData.serviceDate,
          service_time: bookingData.serviceTime,
          duration_hours: bookingData.durationHours,
          total_amount: totalAmount,
          special_requests: bookingData.specialRequests || null,
          status: 'pending'
        });

      if (bookingError) throw bookingError;

      setSuccess('Booking request submitted successfully! You will receive a confirmation shortly.');
      
      // Reset form
      setBookingData({
        serviceDate: '',
        serviceTime: '',
        durationHours: 2,
        specialRequests: ''
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error: any) {
      setError(error.message || 'Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Provider Not Found</h2>
          <p className="text-gray-600">The service provider you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Provider Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                {provider.photo_url ? (
                  <img
                    src={provider.photo_url}
                    alt={provider.full_name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-900">{provider.full_name}</h2>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-2xl mr-2">{provider.categories.icon}</span>
                  <span className="text-gray-600">{provider.categories.name}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{provider.experience_years} years</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rate</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{provider.hourly_rate}/hr
                  </span>
                </div>

                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-gray-600 ml-1">4.8 (24 reviews)</span>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <span className="text-sm text-gray-600 ml-2">{provider.address}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Available Days</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.available_days.map((day) => (
                      <span
                        key={day}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                      >
                        {day.substring(0, 3)}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Hours: {provider.available_hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Service</h3>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Service Date
                    </label>
                    <input
                      type="date"
                      name="serviceDate"
                      value={bookingData.serviceDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                    {bookingData.serviceDate && !isDateAvailable(bookingData.serviceDate) && (
                      <p className="text-red-500 text-sm mt-1">
                        Provider is not available on this day
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Service Time
                    </label>
                    <select
                      name="serviceTime"
                      value={bookingData.serviceTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (Hours)
                  </label>
                  <select
                    name="durationHours"
                    value={bookingData.durationHours}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
                      <option key={hours} value={hours}>
                        {hours} {hours === 1 ? 'hour' : 'hours'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    placeholder="Any special requests or instructions..."
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service Rate:</span>
                      <span>₹{provider.hourly_rate}/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{bookingData.durationHours} hours</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                      <span>Total Amount:</span>
                      <span className="text-green-600">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading || !bookingData.serviceDate || !isDateAvailable(bookingData.serviceDate)}
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {bookingLoading ? 'Processing...' : `Book Service - ₹${calculateTotal()}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;