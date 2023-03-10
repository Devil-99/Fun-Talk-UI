import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ChatPages from './pages/ChatPages'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/' element={<ChatPages/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;