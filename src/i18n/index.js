import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      booking: 'Book Class',
      admin: 'Admin',
      logout: 'Logout',
      login: 'Login',
      
      // Booking
      selectDate: 'Select Date',
      selectTime: 'Select Time Slot',
      availableSlots: 'Available Slots',
      bookNow: 'Book Now',
      bookingConfirmed: 'Booking Confirmed!',
      bookingFailed: 'Booking Failed',
      cancelBooking: 'Cancel Booking',
      
      // Time slots
      morning: 'Morning Class (9:00 AM)',
      afternoon: 'Afternoon Class (11:00 AM)',
      slotsAvailable: '{{count}} slots available',
      fullyBooked: 'Fully Booked',
      
      // Payment
      paymentMethod: 'Payment Method',
      creditCard: 'Credit Card',
      package: 'Package',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      cardholderName: 'Cardholder Name',
      payNow: 'Pay Now',
      processing: 'Processing...',
      
      // Packages
      packages: 'Packages',
      classPackage: 'Class Package',
      singleClass: 'Single Class',
      price: 'Price',
      classes: 'Classes',
      buyPackage: 'Buy Package',
      
      // Admin
      dashboard: 'Dashboard',
      totalBookings: 'Total Bookings',
      todayBookings: "Today's Bookings",
      monthlyBookings: 'Monthly Bookings',
      totalRevenue: 'Total Revenue',
      bookingManagement: 'Booking Management',
      userManagement: 'User Management',
      packageManagement: 'Package Management',
      date: 'Date',
      time: 'Time',
      user: 'User',
      status: 'Status',
      actions: 'Actions',
      
      // Forms
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      
      // Status
      confirmed: 'Confirmed',
      cancelled: 'Cancelled',
      pending: 'Pending',
      
      // Messages
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      noBookings: 'No bookings found',
      
      // Yoga App
      yogaBooking: 'Yoga Booking',
      welcomeMessage: 'Book your yoga class today!',
      classDetails: 'Class Details',
      duration: 'Duration: 60 minutes',
      instructor: 'Instructor: Professional Yoga Teacher',
      level: 'Level: All Levels Welcome'
    }
  },
  th: {
    translation: {
      // Navigation
      home: 'หน้าหลัก',
      booking: 'จองคลาส',
      admin: 'แอดมิน',
      logout: 'ออกจากระบบ',
      login: 'เข้าสู่ระบบ',
      
      // Booking
      selectDate: 'เลือกวันที่',
      selectTime: 'เลือกเวลา',
      availableSlots: 'ช่วงเวลาที่ว่าง',
      bookNow: 'จองตอนนี้',
      bookingConfirmed: 'จองสำเร็จแล้ว!',
      bookingFailed: 'การจองไม่สำเร็จ',
      cancelBooking: 'ยกเลิกการจอง',
      
      // Time slots
      morning: 'คลาสเช้า (9:00 น.)',
      afternoon: 'คลาสสาย (11:00 น.)',
      slotsAvailable: 'เหลือที่ว่าง {{count}} ที่',
      fullyBooked: 'เต็มแล้ว',
      
      // Payment
      paymentMethod: 'วิธีการชำระเงิน',
      creditCard: 'บัตรเครดิต',
      package: 'แพ็คเกจ',
      cardNumber: 'หมายเลขบัตร',
      expiryDate: 'วันหมดอายุ',
      cvv: 'รหัส CVV',
      cardholderName: 'ชื่อผู้ถือบัตร',
      payNow: 'ชำระเงิน',
      processing: 'กำลังดำเนินการ...',
      
      // Packages
      packages: 'แพ็คเกจ',
      classPackage: 'แพ็คเกจคลาส',
      singleClass: 'คลาสเดี่ยว',
      price: 'ราคา',
      classes: 'คลาส',
      buyPackage: 'ซื้อแพ็คเกจ',
      
      // Admin
      dashboard: 'แดชบอร์ด',
      totalBookings: 'การจองทั้งหมด',
      todayBookings: 'การจองวันนี้',
      monthlyBookings: 'การจองประจำเดือน',
      totalRevenue: 'รายได้รวม',
      bookingManagement: 'จัดการการจอง',
      userManagement: 'จัดการผู้ใช้',
      packageManagement: 'จัดการแพ็คเกจ',
      date: 'วันที่',
      time: 'เวลา',
      user: 'ผู้ใช้',
      status: 'สถานะ',
      actions: 'การดำเนินการ',
      
      // Forms
      firstName: 'ชื่อ',
      lastName: 'นามสกุล',
      email: 'อีเมล',
      phone: 'เบอร์โทร',
      submit: 'ส่ง',
      cancel: 'ยกเลิก',
      save: 'บันทึก',
      delete: 'ลบ',
      edit: 'แก้ไข',
      
      // Status
      confirmed: 'ยืนยันแล้ว',
      cancelled: 'ยกเลิกแล้ว',
      pending: 'รอดำเนินการ',
      
      // Messages
      loading: 'กำลังโหลด...',
      error: 'เกิดข้อผิดพลาด',
      success: 'สำเร็จ',
      noBookings: 'ไม่พบการจอง',
      
      // Yoga App
      yogaBooking: 'จองโยคะ',
      welcomeMessage: 'จองคลาสโยคะของคุณวันนี้!',
      classDetails: 'รายละเอียดคลาส',
      duration: 'ระยะเวลา: 60 นาที',
      instructor: 'ครูผู้สอน: ครูโยคะมืออาชีพ',
      level: 'ระดับ: เหมาะสำหรับทุกระดับ'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'th', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
