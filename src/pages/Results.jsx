import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Download, TrendingUp, Award, Target } from 'lucide-react'

function Results() {
  const [assessments, setAssessments] = useState([])
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    // Load user's assessments from localStorage
    const allAssessments = JSON.parse(localStorage.getItem('assessments') || '[]')
    const userAssessments = allAssessments.filter(assessment => assessment.userId === user.id)
    setAssessments(userAssessments)
    
    if (userAssessments.length > 0) {
      setSelectedAssessment(userAssessments[userAssessments.length - 1]) // Most recent
    }
  }, [user.id])

  if (!selectedAssessment) {
    return (
      <div className="no-results" data-source-file="src/pages/Results.jsx" data-source-line="22">
        <div className="no-results-content">
          <Target size={64} className="no-results-icon" />
          <h2>No Assessment Results</h2>
          <p>You haven't completed any leadership assessments yet.</p>
          <a href="/assessment" className="cta-button">Take Assessment</a>
        </div>
      </div>
    )
  }

  const scores = selectedAssessment.scores
  
  // Prepare data for charts
  const barData = [
    { name: 'Transformational', score: scores.transformational, color: '#8884d8' },
    { name: 'Transactional', score: scores.transactional, color: '#82ca9d' },
    { name: 'Servant', score: scores.servant, color: '#ffc658' },
    { name: 'Authentic', score: scores.authentic, color: '#ff7c7c' },
    { name: 'Situational', score: scores.situational, color: '#8dd1e1' }
  ]

  const radarData = barData.map(item => ({
    dimension: item.name,
    score: item.score
  }))

  const getStyleDescription = (style) => {
    const descriptions = {
      transformational: "You inspire and motivate others through vision, charisma, and intellectual stimulation. You focus on developing followers and creating positive change.",
      transactional: "You excel at managing through clear structures, rewards, and performance expectations. You ensure tasks are completed efficiently and goals are met.",
      servant: "You prioritize serving others and empowering your team members. You focus on the growth and well-being of people and communities.",
      authentic: "You lead with genuine self-awareness, moral perspective, and authentic relationships. You stay true to your values and beliefs.",
      situational: "You adapt your leadership approach based on the context, task, and team readiness. You're flexible and responsive to changing situations."
    }
    return descriptions[style] || "Leadership style description not available."
  }

  const getDevelopmentRecommendations = (scores) => {
    const recommendations = []
    
    if (scores.transformational < 70) {
      recommendations.push({
        area: "Vision & Inspiration",
        suggestion: "Develop your ability to create and communicate compelling visions. Practice storytelling and inspirational communication."
      })
    }
    
    if (scores.transactional < 70) {
      recommendations.push({
        area: "Goal Setting & Performance",
        suggestion: "Strengthen your skills in setting clear expectations, monitoring progress, and providing constructive feedback."
      })
    }
    
    if (scores.servant < 70) {
      recommendations.push({
        area: "Empathy & Team Development",
        suggestion: "Focus on developing deeper empathy and investing more time in your team members' growth and development."
      })
    }
    
    if (scores.authentic < 70) {
      recommendations.push({
        area: "Self-Awareness & Values",
        suggestion: "Engage in self-reflection practices and ensure your actions consistently align with your stated values."
      })
    }
    
    if (scores.situational < 70) {
      recommendations.push({
        area: "Adaptive Leadership",
        suggestion: "Practice assessing situations and team readiness, then adjusting your leadership approach accordingly."
      })
    }

    return recommendations
  }

  const recommendations = getDevelopmentRecommendations(scores)

  return (
    <div className="results" data-source-file="src/pages/Results.jsx" data-source-line="95">
      <div className="results-container">
        <div className="results-header">
          <h1>Your Leadership Assessment Results</h1>
          <div className="results-meta">
            <span>Completed: {new Date(selectedAssessment.completedAt).toLocaleDateString()}</span>
            <button className="download-button">
              <Download size={18} />
              Download Report
            </button>
          </div>
        </div>

        <div className="results-overview">
          <div className="overview-card primary-style">
            <Award className="overview-icon" />
            <div className="overview-content">
              <h3>Primary Leadership Style</h3>
              <h2>{scores.primaryStyle.charAt(0).toUpperCase() + scores.primaryStyle.slice(1)}</h2>
              <p>{getStyleDescription(scores.primaryStyle)}</p>
            </div>
          </div>

          <div className="overview-card effectiveness">
            <TrendingUp className="overview-icon" />
            <div className="overview-content">
              <h3>Overall Effectiveness</h3>
              <h2>{scores.overallEffectiveness}%</h2>
              <p>
                {scores.overallEffectiveness >= 80 && "Excellent leadership effectiveness across all dimensions."}
                {scores.overallEffectiveness >= 60 && scores.overallEffectiveness < 80 && "Good leadership effectiveness with room for growth."}
                {scores.overallEffectiveness < 60 && "Developing leadership effectiveness. Focus on key growth areas."}
              </p>
            </div>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-container">
            <h3>Leadership Dimension Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Leadership Profile</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="detailed-scores">
          <h3>Detailed Analysis</h3>
          <div className="scores-grid">
            {barData.map(item => (
              <div key={item.name} className="score-card">
                <div className="score-header">
                  <h4>{item.name}</h4>
                  <span className="score-value">{item.score}%</span>
                </div>
                <div className="score-bar">
                  <div 
                    className="score-fill" 
                    style={{ width: `${item.score}%`, backgroundColor: item.color }}
                  ></div>
                </div>
                <p className="score-description">
                  {getStyleDescription(item.name.toLowerCase())}
                </p>
              </div>
            ))}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="recommendations">
            <h3>Development Recommendations</h3>
            <div className="recommendations-grid">
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <h4>{rec.area}</h4>
                  <p>{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {assessments.length > 1 && (
          <div className="assessment-history">
            <h3>Assessment History</h3>
            <div className="history-list">
              {assessments.map(assessment => (
                <div 
                  key={assessment.id} 
                  className={`history-item ${selectedAssessment.id === assessment.id ? 'active' : ''}`}
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <div className="history-date">
                    {new Date(assessment.completedAt).toLocaleDateString()}
                  </div>
                  <div className="history-score">
                    Overall: {assessment.scores.overallEffectiveness}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Results
