import React from 'react'
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css'
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Resetpwd from './pages/resetpwd';



const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Index>
            <Home></Home>
          </Index>
        }/>       
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/resetpwd' element={<Resetpwd/>}/>
        <Route path='/*' element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App