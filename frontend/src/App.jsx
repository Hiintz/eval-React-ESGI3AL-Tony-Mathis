import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./Page/Home/Home.jsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Home />}/>
            </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App
