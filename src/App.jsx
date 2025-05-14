import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login-page'
import DashboardPage from './pages/dashboard-page'
import LeaveSubmissionPage from './pages/leave-submission-page'
import SignupPage from './pages/signup-page'
import LeaveApplicationsPage from './pages/LeaveApplicationsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leave-submission" element={<LeaveSubmissionPage />} />
        <Route path="/leave-applications" element={<LeaveApplicationsPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
