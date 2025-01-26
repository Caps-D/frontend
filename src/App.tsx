import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './login/login'


function App() {
  return (
    <div className="w-full h-full flex-col flex">
    <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
    </Router>
    </div>
  )
}

export default App
