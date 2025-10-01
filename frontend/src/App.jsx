import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Auth from './pages/Auth'
import Files from './pages/Files'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem('token'))

  return (
    <BrowserRouter>
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Auth initialMode="login" onAuth={() => setIsAuthed(true)} />} />
          <Route path="/login" element={<Auth initialMode="login" onAuth={() => setIsAuthed(true)} />} />
          <Route path="/signup" element={<Auth initialMode="register" onAuth={() => setIsAuthed(true)} />} />
          <Route path="/files" element={<PrivateRoute><Files /></PrivateRoute>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
