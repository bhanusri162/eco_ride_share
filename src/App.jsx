import { useState } from 'react'
import Header from './components/Header.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const openPage = (page) => {
    setCurrentPage(page)
  }

  const openAuth = (mode) => {
    setCurrentPage(mode)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    setCurrentPage('dashboard')
  }

  const handleRegister = (event) => {
    event.preventDefault()
    setCurrentPage('dashboard')
  }

  const renderPage = () => {
    if (currentPage === 'home') {
      return <Home onOpenAuth={openAuth} onOpenPage={openPage} />
    }

    if (currentPage === 'about') {
      return <About />
    }

    if (currentPage === 'contact') {
      return <Contact />
    }

    if (currentPage === 'login') {
      return (
        <Login
          onSubmit={handleLogin}
          onOpenRegister={() => openPage('register')}
        />
      )
    }

    if (currentPage === 'register') {
      return (
        <Register
          onSubmit={handleRegister}
          onOpenLogin={() => openPage('login')}
        />
      )
    }

    if (currentPage === 'dashboard') {
      return <Dashboard onBackHome={() => openPage('home')} />
    }

    return <Home onOpenAuth={openAuth} onOpenPage={openPage} />
  }

  return (
    <div className="app-shell">
      <Header
        currentPage={currentPage}
        onNavigate={openPage}
        onOpenAuth={openAuth}
      />
      <main className="page-frame">{renderPage()}</main>
    </div>
  )
}

export default App
