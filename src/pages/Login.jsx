import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    jobTitle: '',
    department: '',
    experienceYears: '',
    teamSize: ''
  })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Mock authentication - in real app, this would call an API
    const userData = {
      id: Date.now().toString(),
      email: formData.email,
      fullName: formData.fullName || 'Demo User',
      jobTitle: formData.jobTitle || 'Manager',
      department: formData.department || 'General',
      experienceYears: parseInt(formData.experienceYears) || 5,
      teamSize: parseInt(formData.teamSize) || 5,
      createdAt: new Date().toISOString()
    }
    
    login(userData)
    navigate('/assessment')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-page" data-source-file="src/pages/Login.jsx" data-source-line="40">
      <div className="login-container">
        <div className="login-form">
          <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title</label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experienceYears">Years of Experience</label>
                    <input
                      type="number"
                      id="experienceYears"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      min="0"
                      max="50"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="teamSize">Team Size</label>
                    <input
                      type="number"
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </>
            )}
            
            <button type="submit" className="submit-button">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
          
          <p className="toggle-form">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="link-button"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
