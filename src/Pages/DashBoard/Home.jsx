import React from 'react'
import Navbar from '../../Component/NavBar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    
    </>
  )
}

export default Home
