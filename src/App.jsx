import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Assessment from './pages/Assessment.jsx'
import Results from './pages/Results.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import './App.css'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <div className="app" data-source-file="src/App.jsx" data-source-line="12">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/assessment" 
            element={user ? <Assessment /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/results" 
            element={user ? <Results /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
