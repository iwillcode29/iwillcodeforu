import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  getAllBookings, 
  getBookingStats, 
  cancelBooking as cancelBookingService 
} from '../services/bookingService';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    monthlyBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('dashboard');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bookingsData, statsData] = await Promise.all([
        getAllBookings(),
        getBookingStats()
      ]);
      setBookings(bookingsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBookingService(bookingId);
        await loadData(); // Refresh data
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="admin-panel">
        <h2>{t('admin')} {t('dashboard')}</h2>
        
        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px',
          borderBottom: '1px solid #ddd',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => setSelectedTab('dashboard')}
            className={`btn ${selectedTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('dashboard')}
          </button>
          <button
            onClick={() => setSelectedTab('bookings')}
            className={`btn ${selectedTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('bookingManagement')}
          </button>
        </div>

        {/* Dashboard Tab */}
        {selectedTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.totalBookings}</h3>
                <p>{t('totalBookings')}</p>
              </div>
              <div className="stat-card">
                <h3>{stats.todayBookings}</h3>
                <p>{t('todayBookings')}</p>
              </div>
              <div className="stat-card">
                <h3>{stats.monthlyBookings}</h3>
                <p>{t('monthlyBookings')}</p>
              </div>
              <div className="stat-card">
                <h3>{formatCurrency(stats.totalRevenue)}</h3>
                <p>{t('totalRevenue')}</p>
              </div>
            </div>

            {/* Recent Bookings */}
            <div style={{ marginTop: '30px' }}>
              <h3>Recent Bookings</h3>
              <div style={{ 
                background: 'white', 
                borderRadius: '8px', 
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '15px', textAlign: 'left' }}>{t('date')}</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>{t('time')}</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>{t('user')}</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>{t('status')}</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map(booking => (
                      <tr key={booking.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '15px' }}>{formatDate(booking.date)}</td>
                        <td style={{ padding: '15px' }}>{booking.timeSlot}</td>
                        <td style={{ padding: '15px' }}>
                          {booking.userInfo?.firstName} {booking.userInfo?.lastName}
                        </td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            background: booking.status === 'confirmed' ? '#d4edda' : '#f8d7da',
                            color: booking.status === 'confirmed' ? '#155724' : '#721c24'
                          }}>
                            {t(booking.status)}
                          </span>
                        </td>
                        <td style={{ padding: '15px' }}>{formatCurrency(booking.amount || 500)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Bookings Management Tab */}
        {selectedTab === 'bookings' && (
          <div>
            <h3>{t('bookingManagement')}</h3>
            <div style={{ 
              background: 'white', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>{t('date')}</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>{t('time')}</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>{t('user')}</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Contact</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>{t('status')}</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Amount</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px', fontSize: '12px' }}>
                        {booking.id.substring(0, 8)}...
                      </td>
                      <td style={{ padding: '15px' }}>{formatDate(booking.date)}</td>
                      <td style={{ padding: '15px' }}>{booking.timeSlot}</td>
                      <td style={{ padding: '15px' }}>
                        <div>
                          <div>{booking.userInfo?.firstName} {booking.userInfo?.lastName}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {booking.userInfo?.email}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '15px', fontSize: '12px' }}>
                        {booking.userInfo?.phone}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          background: booking.status === 'confirmed' ? '#d4edda' : '#f8d7da',
                          color: booking.status === 'confirmed' ? '#155724' : '#721c24'
                        }}>
                          {t(booking.status)}
                        </span>
                      </td>
                      <td style={{ padding: '15px' }}>{formatCurrency(booking.amount || 500)}</td>
                      <td style={{ padding: '15px' }}>
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="btn btn-secondary"
                            style={{ fontSize: '12px', padding: '5px 10px' }}
                          >
                            {t('cancel')}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
