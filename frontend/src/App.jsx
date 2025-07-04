import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./page/Home/Home.jsx";
import Signin from './page/Signin/Signin'
import Login from './page/Login/Login'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <div >
                <p>Page not found</p>
                <p>Go to <a href="/">Home</a></p>
              </div>
            } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
