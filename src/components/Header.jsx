import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { User, LogOut, BarChart3 } from 'lucide-react'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header" data-source-file="src/components/Header.jsx" data-source-line="12">
      <div className="header-content">
        <Link to="/" className="logo">
          <BarChart3 size={24} />
          <span>Leadership Assessment</span>
        </Link>
        
        <nav className="nav">
          {user ? (
            <>
              <Link to="/assessment" className="nav-link">Take Assessment</Link>
              <Link to="/results" className="nav-link">My Results</Link>
              <Link to="/profile" className="nav-link">
                <User size={18} />
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-button">
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-button">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
