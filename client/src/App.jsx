import React, { useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from './pages/Auth';

const App = () => {
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem('token'))
  return (
    <>
    <BrowserRouter>
    <main >
      <Routes>
        <Route path='/'      element = {<Auth initialMode='login' onAuth={() => setIsAuthed(true)} />}/>
        <Route path='/login' element = {<Auth initialMode='login' onAuth={() => setIsAuthed(true)} />}/>
      </Routes>
    </main>
    </BrowserRouter>
    </>
  )
}

export default App
