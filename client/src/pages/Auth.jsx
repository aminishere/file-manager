import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { login } from '../../../frontend/src/services/sessionService'
//import {login,register} from '../services/sessionService'

const Auth = ({initialMode='login', onAuth}) => {
  const [name, setName] = useState('')
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    try{
      if(mode==='login'){
        const data =await login({email,password})
        onAuth?.(data)
      }else{
        await register({email, password, name})
        const data = await login({email, password})
        onAuth?.(data)
      
      }navigate('/files')
    }catch(err){
      setError(err.message || 'auth failed')
    }
  }
  
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-lg shadow p-6">
        
        <h3 className="text-white font-semibold mb-4 text-center">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {mode === 'register' && (
            <input 
              className="border border-white/10 rounded px-3 py-2 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={e=>setName(e.target.value)} 
            />
          )}
          <input 
            className="border border-white/10 rounded px-3 py-2 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
          />
          <input 
            className="border border-white/10 rounded px-3 py-2 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
          />
          {error && (
            <div className="text-sm text-red-400 text-center">
              {error}
            </div>
          )}
          <button 
            className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 text-white font-semibold justify-self-center w-full max-w-[200px]" 
            type="submit"
          >
            {mode === 'login' ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <div className="grid place-items-center mt-4">
          <button 
            className="text-sm text-indigo-300 hover:text-indigo-200" 
            onClick={() => setMode(mode==='login'?'register':'login')}
          >
            {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Auth
