import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { login } from '../../../frontend/src/services/sessionService'
//import {login,register} from '../services/sessionService'

const Auth = ({initialMode='login', onAuth}) => {
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [error, setError] = useStatae('')
  const navigate = useNavigate()

  async function handleSumit(e){
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
    <div>
      
    </div>
  )
}

export default Auth
