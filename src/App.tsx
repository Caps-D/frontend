import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './login/login'
import Closet from './closet/closet'
import Shop from './shop/shop'

function App() {
  return (
    <div className="w-full h-full flex-col flex">
    <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/closet" element={<Closet />}/>
          <Route path="/shop" element={<Shop />}/>
        </Routes>
    </Router>
    </div>
  )
}

export default App
