import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { assessmentQuestions } from '../data/questions.js'

function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})
  const [isComplete, setIsComplete] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  const handleResponse = (value) => {
    setResponses({
      ...responses,
      [currentQuestion]: {
        questionId: assessmentQuestions[currentQuestion].id,
        value: value,
        dimension: assessmentQuestions[currentQuestion].dimension
      }
    })
  }

  const nextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeAssessment()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const completeAssessment = () => {
    // Calculate scores for each leadership dimension
    const scores = calculateScores(responses)
    
    // Save assessment results
    const assessment = {
      id: Date.now().toString(),
      userId: user.id,
      responses: responses,
      scores: scores,
      completedAt: new Date().toISOString()
    }
    
    // Save to localStorage (in real app, this would be an API call)
    const existingAssessments = JSON.parse(localStorage.getItem('assessments') || '[]')
    existingAssessments.push(assessment)
    localStorage.setItem('assessments', JSON.stringify(existingAssessments))
    
    setIsComplete(true)
    setTimeout(() => navigate('/results'), 2000)
  }

  const calculateScores = (responses) => {
    const dimensionScores = {
      transformational: [],
      transactional: [],
      servant: [],
      authentic: [],
      situational: []
    }

    // Group responses by dimension
    Object.values(responses).forEach(response => {
      if (dimensionScores[response.dimension]) {
        dimensionScores[response.dimension].push(response.value)
      }
    })

    // Calculate average scores for each dimension
    const scores = {}
    Object.keys(dimensionScores).forEach(dimension => {
      const values = dimensionScores[dimension]
      scores[dimension] = values.length > 0 
        ? Math.round((values.reduce((sum, val) => sum + val, 0) / values.length) * 20) // Convert to 0-100 scale
        : 0
    })

    // Determine primary and secondary styles
    const sortedScores = Object.entries(scores).sort(([,a], [,b]) => b - a)
    scores.primaryStyle = sortedScores[0][0]
    scores.secondaryStyle = sortedScores[1][0]
    scores.overallEffectiveness = Math.round(Object.values(scores).reduce((sum, score) => sum + score, 0) / 5)

    return scores
  }

  if (isComplete) {
    return (
      <div className="assessment-complete" data-source-file="src/pages/Assessment.jsx" data-source-line="85">
        <div className="complete-content">
          <CheckCircle size={64} className="complete-icon" />
          <h2>Assessment Complete!</h2>
          <p>Thank you for completing the leadership assessment. Your results are being processed...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  const question = assessmentQuestions[currentQuestion]
  const currentResponse = responses[currentQuestion]?.value

  return (
    <div className="assessment" data-source-file="src/pages/Assessment.jsx" data-source-line="98">
      <div className="assessment-container">
        <div className="assessment-header">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Question {currentQuestion + 1} of {assessmentQuestions.length}
          </div>
        </div>

        <div className="question-card">
          <div className="question-content">
            <h3>{question.text}</h3>
            {question.scenario && (
              <div className="scenario">
                <p><strong>Scenario:</strong> {question.scenario}</p>
              </div>
            )}
          </div>

          <div className="response-options">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                className={`response-button ${currentResponse === value ? 'selected' : ''}`}
                onClick={() => handleResponse(value)}
              >
                <span className="response-number">{value}</span>
                <span className="response-label">
                  {value === 1 && 'Strongly Disagree'}
                  {value === 2 && 'Disagree'}
                  {value === 3 && 'Neutral'}
                  {value === 4 && 'Agree'}
                  {value === 5 && 'Strongly Agree'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="assessment-navigation">
          <button 
            onClick={prevQuestion} 
            disabled={currentQuestion === 0}
            className="nav-button prev"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <button 
            onClick={nextQuestion}
            disabled={!currentResponse}
            className="nav-button next"
          >
            {currentQuestion === assessmentQuestions.length - 1 ? 'Complete' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Assessment
