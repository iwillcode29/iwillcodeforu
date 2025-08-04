import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Sample packages data
const samplePackages = [
  {
    name: 'Single Class / คลาสเดี่ยว',
    classes: 1,
    price: 500,
    description: 'Perfect for trying out our yoga classes / เหมาะสำหรับการทดลองเรียน'
  },
  {
    name: '5-Class Package / แพ็คเกจ 5 คลาส',
    classes: 5,
    price: 2200,
    description: 'Save 300 THB with this package / ประหยัด 300 บาท'
  },
  {
    name: '10-Class Package / แพ็คเกจ 10 คลาส',
    classes: 10,
    price: 4000,
    description: 'Most popular package, save 1000 THB / แพ็คเกจยอดนิยม ประหยัด 1000 บาท'
  },
  {
    name: 'Monthly Unlimited / ไม่จำกัดรายเดือน',
    classes: 999,
    price: 3500,
    description: 'Unlimited classes for 30 days / เรียนไม่จำกัดเป็นเวลา 30 วัน'
  }
];

// Function to seed packages data
export const seedPackages = async () => {
  try {
    console.log('Seeding packages data...');
    
    for (const packageData of samplePackages) {
      await addDoc(collection(db, 'packages'), {
        ...packageData,
        createdAt: Timestamp.now(),
        active: true
      });
    }
    
    console.log('Packages data seeded successfully!');
  } catch (error) {
    console.error('Error seeding packages:', error);
  }
};

// Sample users data for testing
export const sampleUsers = [
  {
    email: 'admin@yoga.com',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    email: 'user@yoga.com', 
    password: 'user123',
    role: 'user',
    firstName: 'John',
    lastName: 'Doe'
  }
];

// Firebase Collections Reference
export const COLLECTIONS = {
  BOOKINGS: 'bookings',
  USERS: 'users', 
  PACKAGES: 'packages'
};

// Time slots configuration
export const TIME_SLOTS_CONFIG = [
  {
    id: '09:00',
    time: '09:00',
    displayName: {
      en: 'Morning Class (9:00 AM)',
      th: 'คลาสเช้า (9:00 น.)'
    },
    maxCapacity: 20
  },
  {
    id: '11:00', 
    time: '11:00',
    displayName: {
      en: 'Late Morning Class (11:00 AM)',
      th: 'คลาสสาย (11:00 น.)'
    },
    maxCapacity: 20
  }
];

// Booking status options
export const BOOKING_STATUS = {
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled', 
  PENDING: 'pending'
};

// Payment methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  PACKAGE: 'package'
};
