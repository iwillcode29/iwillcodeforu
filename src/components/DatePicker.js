import React from 'react';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../contexts/BookingContext';

const DatePicker = () => {
  const { t } = useTranslation();
  const { selectedDate, setSelectedDate } = useBooking();

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30); // Allow booking up to 30 days in advance

  return (
    <div className="booking-card">
      <h3>{t('selectDate')}</h3>
      <div className="form-group">
        <input
          type="date"
          value={formatDate(selectedDate)}
          onChange={handleDateChange}
          min={formatDate(today)}
          max={formatDate(maxDate)}
          style={{
            padding: '15px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            width: '100%'
          }}
        />
      </div>
      
      <div style={{ marginTop: '15px', color: '#666' }}>
        <p>{t('classDetails')}</p>
        <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
          <li>{t('duration')}</li>
          <li>{t('instructor')}</li>
          <li>{t('level')}</li>
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;
