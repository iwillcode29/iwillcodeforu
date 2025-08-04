import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

const PaymentForm = ({ onPaymentSuccess, onCancel }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { packages } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const singleClassPrice = 500; // THB

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentData = {
        paymentMethod,
        amount: paymentMethod === 'package' ? 
          packages.find(p => p.id === selectedPackage)?.price : 
          singleClassPrice,
        userInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        packageId: paymentMethod === 'package' ? selectedPackage : null
      };

      onPaymentSuccess(paymentData);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="booking-card">
      <h3>{t('paymentMethod')}</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Payment Method Selection */}
        <div className="form-group">
          <label>{t('paymentMethod')}</label>
          <select 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">{t('creditCard')}</option>
            <option value="package">{t('package')}</option>
          </select>
        </div>

        {/* Package Selection */}
        {paymentMethod === 'package' && (
          <div className="form-group">
            <label>{t('packages')}</label>
            <select 
              value={selectedPackage} 
              onChange={(e) => setSelectedPackage(e.target.value)}
              required
            >
              <option value="">{t('selectPackage')}</option>
              {packages.map(pkg => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} - {pkg.classes} {t('classes')} - ฿{pkg.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* User Information */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="form-group">
            <label>{t('firstName')}</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('lastName')}</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>{t('email')}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('phone')}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Credit Card Information */}
        {paymentMethod === 'card' && (
          <>
            <div className="form-group">
              <label>{t('cardNumber')}</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label>{t('expiryDate')}</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('cvv')}</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('cardholderName')}</label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        {/* Price Summary */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>{t('price')}:</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#667eea' }}>
              ฿{paymentMethod === 'package' && selectedPackage ? 
                packages.find(p => p.id === selectedPackage)?.price : 
                singleClassPrice}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={loading || (paymentMethod === 'package' && !selectedPackage)}
          >
            {loading ? t('processing') : t('payNow')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
