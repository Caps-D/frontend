import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './page/login/login'
import Main from './page/main/main'
import Closet from './page/closet/closet'
import Shop from './page/shop/shop'
import Rank from './page/rank/rank'
import Number from './page/select/number'
import Mode from './page/select/mode'
import Exercise from './page/select/exercise'

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
          <Route path="/rank" element={<Rank />}/>
          <Route path="/select/mode" element={<Mode />}/>
          <Route path="/select/number" element={<Number />}/>
          <Route path="/select/exercise" element={<Exercise />}/>

        </Routes>
    </Router>
    </div>
  )
}

export default App
