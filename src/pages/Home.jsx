import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Target, Users, TrendingUp, Award } from 'lucide-react'

function Home() {
  const { user } = useAuth()

  return (
    <div className="home" data-source-file="src/pages/Home.jsx" data-source-line="8">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Leadership Style</h1>
          <p>
            Take our comprehensive assessment to understand your leadership approach 
            and unlock your potential as an effective leader.
          </p>
          {user ? (
            <Link to="/assessment" className="cta-button">
              Start Assessment
            </Link>
          ) : (
            <Link to="/login" className="cta-button">
              Get Started
            </Link>
          )}
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <Target className="feature-icon" />
            <h3>Multi-Dimensional Analysis</h3>
            <p>Evaluate your leadership across 5 key dimensions: Transformational, Transactional, Servant, Authentic, and Situational leadership styles.</p>
          </div>
          
          <div className="feature-card">
            <Users className="feature-icon" />
            <h3>Personalized Insights</h3>
            <p>Receive detailed analysis of your leadership strengths and areas for development with actionable recommendations.</p>
          </div>
          
          <div className="feature-card">
            <TrendingUp className="feature-icon" />
            <h3>Progress Tracking</h3>
            <p>Monitor your leadership development over time with historical assessments and progress visualization.</p>
          </div>
          
          <div className="feature-card">
            <Award className="feature-icon" />
            <h3>Professional Development</h3>
            <p>Get customized development plans and resources to enhance your leadership effectiveness.</p>
          </div>
        </div>
      </section>

      <section className="leadership-styles">
        <h2>Leadership Styles We Assess</h2>
        <div className="styles-grid">
          <div className="style-card">
            <h4>Transformational</h4>
            <p>Inspires and motivates through vision and charisma</p>
          </div>
          <div className="style-card">
            <h4>Transactional</h4>
            <p>Focuses on structure, rewards, and performance management</p>
          </div>
          <div className="style-card">
            <h4>Servant</h4>
            <p>Prioritizes serving others and empowering team members</p>
          </div>
          <div className="style-card">
            <h4>Authentic</h4>
            <p>Leads with genuine self-awareness and moral perspective</p>
          </div>
          <div className="style-card">
            <h4>Situational</h4>
            <p>Adapts leadership approach based on context and team needs</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
