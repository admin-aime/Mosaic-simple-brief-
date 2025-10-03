import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { User, Mail, Briefcase, Users, Calendar, Save } from 'lucide-react'

function Profile() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    jobTitle: user.jobTitle || '',
    department: user.department || '',
    experienceYears: user.experienceYears || '',
    teamSize: user.teamSize || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="profile" data-source-file="src/pages/Profile.jsx" data-source-line="28">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h1>{user.fullName}</h1>
            <p>{user.jobTitle} • {user.department}</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="edit-button"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-content">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">
                      <User size={18} />
                      Full Name
                    </label>
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
                    <label htmlFor="email">
                      <Mail size={18} />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Professional Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="jobTitle">
                      <Briefcase size={18} />
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="department">
                      <Users size={18} />
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experienceYears">
                      <Calendar size={18} />
                      Years of Experience
                    </label>
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
                    <label htmlFor="teamSize">
                      <Users size={18} />
                      Team Size
                    </label>
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
              </div>

              <button type="submit" className="save-button">
                <Save size={18} />
                Save Changes
              </button>
            </form>
          ) : (
            <div className="profile-display">
              <div className="info-section">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <User size={18} />
                    <div>
                      <label>Full Name</label>
                      <span>{user.fullName}</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <Mail size={18} />
                    <div>
                      <label>Email</label>
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Professional Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Briefcase size={18} />
                    <div>
                      <label>Job Title</label>
                      <span>{user.jobTitle || 'Not specified'}</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <Users size={18} />
                    <div>
                      <label>Department</label>
                      <span>{user.department || 'Not specified'}</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <Calendar size={18} />
                    <div>
                      <label>Years of Experience</label>
                      <span>{user.experienceYears || 'Not specified'}</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <Users size={18} />
                    <div>
                      <label>Team Size</label>
                      <span>{user.teamSize || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Account Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Calendar size={18} />
                    <div>
                      <label>Member Since</label>
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
