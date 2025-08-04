import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminButton = () => {
  const { isAdmin } = useAuth();
  const history = useHistory();

  if (!isAdmin()) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50"
    >
      <button
        onClick={() => history.push('/admin')}
        className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
      >
        Admin Panel
      </button>
    </div>
  );
};

export default AdminButton; 