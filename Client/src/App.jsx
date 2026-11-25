import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";

function App() {

  return (
  <BrowserRouter>
      <ToastContainer position="top-center" autoClose={5000} />

<Routes>




<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/" element={<Home/>}/>

</Routes>

</BrowserRouter>
  )
}

export default App
