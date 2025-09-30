import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../services/sessionService'

export default function Auth({ initialMode = 'login', onAuth }) {
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') {
        const data = await login({ email, password })
        onAuth?.(data)
      } else {
        await register({ email, password })
        const data = await login({ email, password })
        onAuth?.(data)
      }
      navigate('/files')
    } catch (err) {
      setError(err.message || 'Auth failed')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white/5 border border-white/10 rounded-lg shadow p-6">
        <h3 className="text-white font-semibold mb-4">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input className="border border-white/10 rounded px-3 py-2 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="border border-white/10 rounded px-3 py-2 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-sm text-red-400">{error}</div>}
          <button className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 text-white font-semibold" type="submit">{mode === 'login' ? 'Sign in' : 'Sign up'}</button>
        </form>
        <button className="mt-3 text-sm text-indigo-300 hover:text-indigo-200" onClick={() => setMode(mode==='login'?'register':'login')}>
          {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}

