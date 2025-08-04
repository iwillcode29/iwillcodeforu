import React from 'react';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../contexts/BookingContext';

const TimeSlotSelector = () => {
  const { t } = useTranslation();
  const { 
    availableSlots, 
    selectedTimeSlot, 
    setSelectedTimeSlot, 
    loading 
  } = useBooking();

  if (loading) {
    return (
      <div className="booking-card">
        <div className="loading">{t('loading')}</div>
      </div>
    );
  }

  const getTimeSlotText = (slot) => {
    if (slot.id === '09:00') return t('morning');
    if (slot.id === '11:00') return t('afternoon');
    return `${slot.time} Class`;
  };

  const getSlotStatus = (slot) => {
    if (!slot.available) return t('fullyBooked');
    return t('slotsAvailable', { count: slot.maxCapacity - slot.currentBookings });
  };

  return (
    <div className="booking-card">
      <h3>{t('selectTime')}</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        {t('availableSlots')}
      </p>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {availableSlots.map((slot) => (
          <div
            key={slot.id}
            className={`time-slot ${selectedTimeSlot === slot.id ? 'selected' : ''} ${!slot.available ? 'full' : ''}`}
            onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
            style={{ 
              cursor: slot.available ? 'pointer' : 'not-allowed',
              opacity: slot.available ? 1 : 0.6
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>
              {getTimeSlotText(slot)}
            </div>
            <div style={{ fontSize: '14px' }}>
              {getSlotStatus(slot)}
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
              {slot.currentBookings}/{slot.maxCapacity} {t('booking', { count: slot.currentBookings })}
            </div>
          </div>
        ))}
      </div>

      {availableSlots.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          {t('noBookings')}
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
