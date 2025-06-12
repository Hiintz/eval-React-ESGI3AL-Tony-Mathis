import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Page/Home/Home.jsx";
import Signin from './page/Signin/Signin'
import Login from './page/Login/Login'

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Home />}/>
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
