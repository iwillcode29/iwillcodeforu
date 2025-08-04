import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getBookingsForDate, 
  getAvailableSlotsForDate, 
  createBooking,
  cancelBooking as cancelBookingService,
  getPackages
} from '../services/bookingService';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load available slots when date changes
  useEffect(() => {
    loadAvailableSlots();
  }, [selectedDate]);

  // Load packages on component mount
  useEffect(() => {
    loadPackages();
  }, []);

  const loadAvailableSlots = async () => {
    try {
      setLoading(true);
      setError(null);
      const slots = await getAvailableSlotsForDate(selectedDate);
      setAvailableSlots(slots);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadBookingsForDate = async (date = selectedDate) => {
    try {
      setLoading(true);
      setError(null);
      const dateBookings = await getBookingsForDate(date);
      setBookings(dateBookings);
      return dateBookings;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadPackages = async () => {
    try {
      const packagesList = await getPackages();
      setPackages(packagesList);
    } catch (err) {
      console.error('Error loading packages:', err);
    }
  };

  const bookClass = async (bookingData) => {
    try {
      setLoading(true);
      setError(null);
      
      const bookingId = await createBooking({
        ...bookingData,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      });

      // Refresh available slots
      await loadAvailableSlots();
      
      return bookingId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      setError(null);
      
      await cancelBookingService(bookingId);
      
      // Refresh available slots and bookings
      await loadAvailableSlots();
      await loadBookingsForDate();
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setSelectedTimeSlot(null);
    setError(null);
  };

  const value = {
    // State
    selectedDate,
    selectedTimeSlot,
    availableSlots,
    bookings,
    packages,
    loading,
    error,
    
    // Actions
    setSelectedDate,
    setSelectedTimeSlot,
    loadAvailableSlots,
    loadBookingsForDate,
    bookClass,
    cancelBooking,
    resetBooking,
    setError
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
