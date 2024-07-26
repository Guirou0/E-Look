import { useState, useTransition } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

import Navbar from '../componentes/navbar'


function App() {

  return (
    <>  
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
