import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./Page/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
