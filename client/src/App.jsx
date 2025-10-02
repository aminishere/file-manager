import React, { Children, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Auth from './pages/Auth';
import Files from './pages/Files';

const App = () => {
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem('token'))
  const PrivateRoute = ({children})=>{
    const token =localStorage.getItem('token');
    return token? children : <Navigate to='/login' replace /> 
  }

  return (
    <>
    <BrowserRouter>
    <main >
      <Routes>
        <Route path='/'      element = {<Auth initialMode='login' onAuth={() => setIsAuthed(true)} />}/>
        <Route path='/login' element = {<Auth initialMode='login' onAuth={() => setIsAuthed(true)} />}/>
        <Route path='/signup' element = {<Auth initialMode='register' onAuth={() =>setIsAuthed(true)}/>}/>
        <Route path='/files' element= {<PrivateRoute><Files /></PrivateRoute>}/>
      </Routes>
    </main>
    </BrowserRouter>
    </>
  )
}

export default App
