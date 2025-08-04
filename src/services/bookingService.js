import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export const BOOKING_COLLECTION = 'bookings';
export const USERS_COLLECTION = 'users';
export const PACKAGES_COLLECTION = 'packages';

// Time slots
export const TIME_SLOTS = [
  { id: '09:00', time: '09:00', maxCapacity: 20 },
  { id: '11:00', time: '11:00', maxCapacity: 20 }
];

// Get bookings for a specific date
export const getBookingsForDate = async (date) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, BOOKING_COLLECTION),
      where('date', '>=', Timestamp.fromDate(startOfDay)),
      where('date', '<=', Timestamp.fromDate(endOfDay)),
      orderBy('date')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate()
    }));
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, BOOKING_COLLECTION), {
      ...bookingData,
      date: Timestamp.fromDate(bookingData.date),
      createdAt: Timestamp.now(),
      status: 'confirmed'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, BOOKING_COLLECTION, bookingId);
    await updateDoc(bookingRef, {
      status: 'cancelled',
      cancelledAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

// Get available slots for a date
export const getAvailableSlotsForDate = async (date) => {
  try {
    const bookings = await getBookingsForDate(date);
    
    const slotCounts = {};
    bookings.forEach(booking => {
      if (booking.status === 'confirmed') {
        const timeSlot = booking.timeSlot;
        slotCounts[timeSlot] = (slotCounts[timeSlot] || 0) + 1;
      }
    });

    return TIME_SLOTS.map(slot => ({
      ...slot,
      currentBookings: slotCounts[slot.id] || 0,
      available: (slotCounts[slot.id] || 0) < slot.maxCapacity
    }));
  } catch (error) {
    console.error('Error getting available slots:', error);
    throw error;
  }
};

// User management
export const createUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), {
      ...userData,
      createdAt: Timestamp.now(),
      packages: []
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Package management
export const getPackages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PACKAGES_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting packages:', error);
    throw error;
  }
};

export const createPackage = async (packageData) => {
  try {
    const docRef = await addDoc(collection(db, PACKAGES_COLLECTION), {
      ...packageData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};

// Admin functions
export const getAllBookings = async () => {
  try {
    const q = query(
      collection(db, BOOKING_COLLECTION),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate(),
      createdAt: doc.data().createdAt.toDate()
    }));
  } catch (error) {
    console.error('Error getting all bookings:', error);
    throw error;
  }
};

export const getBookingStats = async () => {
  try {
    const bookings = await getAllBookings();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayBookings = bookings.filter(booking => 
      booking.date >= today && 
      booking.date < new Date(today.getTime() + 24 * 60 * 60 * 1000) &&
      booking.status === 'confirmed'
    );

    const thisMonth = bookings.filter(booking => 
      booking.date.getMonth() === today.getMonth() &&
      booking.date.getFullYear() === today.getFullYear() &&
      booking.status === 'confirmed'
    );

    return {
      totalBookings: bookings.filter(b => b.status === 'confirmed').length,
      todayBookings: todayBookings.length,
      monthlyBookings: thisMonth.length,
      totalRevenue: bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, booking) => sum + (booking.amount || 0), 0)
    };
  } catch (error) {
    console.error('Error getting booking stats:', error);
    throw error;
  }
};
