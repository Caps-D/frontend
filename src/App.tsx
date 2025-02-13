import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './login/login'
import Main from './main/main'

function App() {
  return (
    <div className="w-full h-full flex-col flex max-w-[500px] bg-white">
    <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/main" element={<Main />}/>

        </Routes>
    </Router>
    </div>
  )
}

export default App
