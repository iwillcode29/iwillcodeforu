import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../contexts/BookingContext';
import DatePicker from '../components/DatePicker';
import TimeSlotSelector from '../components/TimeSlotSelector';
import PaymentForm from '../components/PaymentForm';
import { StyledButton } from '../utils/sharedStyles';

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
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="booking-card">
            <div className="success">
              <h2 className="text-2xl font-bold mb-4">{t('bookingConfirmed')}</h2>
              <p className="text-lg mb-2">Booking ID: {bookingId}</p>
              <p className="mb-6">Thank you for your booking!</p>
              <StyledButton onClick={handleNewBooking}>
                {t('bookNow')} (New)
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
          <PaymentForm 
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {error && <div className="error mb-6">{error}</div>}
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="booking-card">
            <DatePicker />
          </div>
          <div className="booking-card">
            <TimeSlotSelector />
          </div>
        </div>

        {selectedTimeSlot && (
          <div className="booking-card text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to book your class?</h3>
            <StyledButton onClick={handleBookNow}>
              {t('bookNow')}
            </StyledButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
