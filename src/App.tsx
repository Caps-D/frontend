import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './login/login'
import Main from './main/main'
import Closet from './closet/closet'
import Shop from './shop/shop'


function App() {
  return (
    <div className="w-full h-full flex-col flex max-w-[500px] bg-white">
    <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/main" element={<Main />}/>
          <Route path="/closet" element={<Closet />}/>
          <Route path="/shop" element={<Shop />}/>

        </Routes>
    </Router>
    </div>
  )
}

export default App
