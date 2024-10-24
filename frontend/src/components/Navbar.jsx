import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">MyApp</h1>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
