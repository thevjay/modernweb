import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Nav from './compenents/Nav'
import Home from './compenents/Home'
import Login from './compenents/Login'
import Signup from './compenents/Signup'
import Logout from './compenents/Logout'
import Cart from './compenents/Cart'
import AddProduct from './compenents/AddProduct'
import KnowMore from './compenents/KnowMore'
import Fpwd from './compenents/Fpwd'
import './App.css'
import Ct from './compenents/Ct'

const App = () => {
  let [usercon,setUsercon]=useState({"_id":"","name":"","token":"","role":""})
  let updcont=(obj)=>{
    setUsercon({...usercon,...obj})
  }
  let obj={"usercon":usercon,"updcon":updcont}
  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/cart/' element={<Cart/>}/>
            {/* <Route path='/upd' element={<UpdProd/>}/> */}
            <Route path='/addprod' element={<AddProduct/>}/>
             <Route path='/km' element={<KnowMore/>}/>
            <Route path='/fpwd' element={<Fpwd/>}/> 
        </Routes>    
      </Ct.Provider>
    </BrowserRouter>
  )
}

export default App