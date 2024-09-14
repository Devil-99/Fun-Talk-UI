import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ChatPages from './pages/ChatPages'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Welcome from './components/Welcome'
import Contacts from './components/Contacts'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/' element={<ChatPages/>} />
            <Route path='/welcome' element={<Welcome/>} />
            <Route path='/contacts' element={<Contacts/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;