import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import Header from './components/Header';
import AdminButton from './components/AdminButton';
import Login from './components/Login';
import Homepage from './pages/Homepage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import BubblePage from './pages/BubblePage';
import ExcuseGenerator from './pages/ExcuseGenerator';
import CountdownPage from './pages/CountdownPage';
import './i18n';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  if (adminOnly && !isAdmin()) {
    return <Redirect to="/" />;
  }
  
  return children;
};

// Main App Content
const AppContent = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Header />
          <Login />
        </Route>
        <Route exact path="/booking">
          <ProtectedRoute>
            <BookingProvider>
              <Header />
              <BookingPage />
            </BookingProvider>
          </ProtectedRoute>
        </Route>
        <Route path="/admin">
          <ProtectedRoute adminOnly={true}>
            <BookingProvider>
              <Header />
              <AdminDashboard />
              <AdminButton />
            </BookingProvider>
          </ProtectedRoute>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
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
            <Route exact path="/countdown">
              <CountdownPage />
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
