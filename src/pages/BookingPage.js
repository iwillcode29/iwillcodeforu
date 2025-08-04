import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../contexts/BookingContext';
import DatePicker from '../components/DatePicker';
import TimeSlotSelector from '../components/TimeSlotSelector';
import PaymentForm from '../components/PaymentForm';

const BookingPage = () => {
  const { t } = useTranslation();
  const { 
    selectedTimeSlot, 
    bookClass, 
    resetBooking, 
    error 
  } = useBooking();
  
  const [showPayment, setShowPayment] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const handleBookNow = () => {
    if (selectedTimeSlot) {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const id = await bookClass(paymentData);
      console.log('Booking successful:', id);
      setBookingId(id);
      setBookingSuccess(true);
      setShowPayment(false);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const handleNewBooking = () => {
    setBookingSuccess(false);
    setBookingId(null);
    resetBooking();
  };

  if (bookingSuccess) {
    return (
      <div className="container">
        <div className="booking-card" style={{ textAlign: 'center' }}>
          <div className="success">
            <h2>{t('bookingConfirmed')}</h2>
            <p>Booking ID: {bookingId}</p>
            <p>Thank you for your booking!</p>
            <button 
              onClick={handleNewBooking}
              className="btn btn-primary"
              style={{ marginTop: '20px' }}
            >
              {t('bookNow')} (New)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="container">
        <PaymentForm 
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </div>
    );
  }

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      
      <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <DatePicker />
        <TimeSlotSelector />
      </div>

      {selectedTimeSlot && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={handleBookNow}
            className="btn btn-primary"
            style={{ 
              fontSize: '18px', 
              padding: '15px 40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {t('bookNow')}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
