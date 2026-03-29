import { useState } from 'react'
import Header from './components/Header.jsx'
import About from './pages/About.jsx'
import BikeShare from './pages/BikeShare.jsx'
import Community from './pages/Community.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import Rides from './pages/Rides.jsx'
import RoutePlanner from './pages/RoutePlanner.jsx'
import { loginUser, registerUser, submitContactMessage } from './api.js'
import './App.css'

const memberPages = new Set(['dashboard', 'rides', 'bikes', 'planner', 'community', 'profile'])

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem('ecoRideShareUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const isLoggedIn = Boolean(authUser)

  const openPage = (page) => {
    if (!isLoggedIn && memberPages.has(page)) {
      setCurrentPage('login')
      return
    }

    setCurrentPage(page)
  }

  const openAuth = (mode) => {
    setCurrentPage(mode)
  }

  const handleLogout = () => {
    localStorage.removeItem('ecoRideShareToken')
    localStorage.removeItem('ecoRideShareUser')
    setAuthUser(null)
    setCurrentPage('home')
  }

  const handleLogin = async (formValues) => {
    const response = await loginUser(formValues)

    if (response.token) {
      localStorage.setItem('ecoRideShareToken', response.token)
    }

    if (response.user) {
      localStorage.setItem('ecoRideShareUser', JSON.stringify(response.user))
    }

    setAuthUser(response.user || null)
    setCurrentPage('dashboard')
    return response
  }

  const handleRegister = async (formValues) => {
    const response = await registerUser(formValues)
    setCurrentPage('login')
    return response
  }

  const handleContactSubmit = async (formValues) => submitContactMessage(formValues)

  const renderPage = () => {
    if (currentPage === 'home') {
      return <Home onOpenAuth={openAuth} onOpenPage={openPage} />
    }

    if (currentPage === 'about') {
      return <About />
    }

    if (currentPage === 'contact') {
      return <Contact onSubmit={handleContactSubmit} />
    }

    if (currentPage === 'login') {
      return <Login onSubmit={handleLogin} onOpenRegister={() => openPage('register')} />
    }

    if (currentPage === 'register') {
      return <Register onSubmit={handleRegister} onOpenLogin={() => openPage('login')} />
    }

    if (!isLoggedIn) {
      return <Home onOpenAuth={openAuth} onOpenPage={openPage} />
    }

    if (currentPage === 'dashboard') {
      return <Dashboard onBackHome={() => openPage('home')} user={authUser} />
    }

    if (currentPage === 'rides') {
      return <Rides onOpenAuth={openAuth} />
    }

    if (currentPage === 'bikes') {
      return <BikeShare />
    }

    if (currentPage === 'planner') {
      return <RoutePlanner />
    }

    if (currentPage === 'community') {
      return <Community />
    }

    if (currentPage === 'profile') {
      return <Profile user={authUser} />
    }

    return <Dashboard onBackHome={() => openPage('home')} user={authUser} />
  }

  return (
    <div className="app-shell">
      <Header
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onNavigate={openPage}
        onOpenAuth={openAuth}
      />
      <main className="page-frame">{renderPage()}</main>
    </div>
  )
}

export default App
