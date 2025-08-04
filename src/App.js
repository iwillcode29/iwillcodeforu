import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import Header from './components/Header';
import Login from './components/Login';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import BubblePage from './pages/BubblePage';
import ExcuseGenerator from './pages/ExcuseGenerator';
import './i18n';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return <Login />;
  }
  
  if (adminOnly && !isAdmin()) {
    return <Redirect to="/" />;
  }
  
  return children;
};

// Admin Button Component
const AdminButton = () => {
  const { isAdmin } = useAuth();
  const history = useHistory();

  if (!isAdmin()) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button
        onClick={() => history.push('/admin')}
        className="btn btn-primary"
        style={{
          borderRadius: '50px',
          padding: '15px 20px',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
      >
        Admin Panel
      </button>
    </div>
  );
};

// Main App Content
const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <Header />
        <Login />
      </div>
    );
  }

  return (
    <BookingProvider>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          </Route>
          <Route path="/admin">
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <AdminButton />
      </div>
    </BookingProvider>
  );
};

// Root App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/bubbles">
              <BubblePage />
            </Route>
            <Route exact path="/excuse">
              <ExcuseGenerator />
            </Route>
            <Route path="*">
              <AppContent />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
