import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Rides from './pages/Rides';
import CreateRide from './pages/CreateRide';
import RideDetail from './pages/RideDetail';
import Bikes from './pages/Bikes';
import Profile from './pages/Profile';
import About from './pages/About';
import BikeDetail from './pages/BikeDetail';
import Inbox from './pages/Inbox';
import PublicProfile from './pages/PublicProfile';
import MyActivity from './pages/MyActivity';
import './App.css';

function App() {
  const { isAuthenticated, loading } = useApp();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading EcoRide Share...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/rides" element={isAuthenticated ? <Rides /> : <Navigate to="/login" />} />
          <Route path="/rides/create" element={isAuthenticated ? <CreateRide /> : <Navigate to="/login" />} />
          <Route path="/rides/:rideId" element={<RideDetail />} />
          <Route path="/bikes" element={isAuthenticated ? <Bikes /> : <Navigate to="/login" />} />
          <Route path="/bikes/:bikeId" element={isAuthenticated ? <BikeDetail /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/activity" element={isAuthenticated ? <MyActivity /> : <Navigate to="/login" />} />
          <Route path="/messages" element={isAuthenticated ? <Inbox /> : <Navigate to="/login" />} />
          <Route path="/commuters/:userId" element={<PublicProfile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
