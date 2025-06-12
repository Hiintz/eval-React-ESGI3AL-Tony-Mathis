import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signin from './page/Signin/Signin'
import Login from './page/Login/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
