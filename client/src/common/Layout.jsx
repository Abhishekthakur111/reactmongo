import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
   <>
          <Navbar />
          <Sidebar />
          <div className='main-Content'>
            <Outlet/>
          </div>
          <Footer/>
          
          </>
  )
}

export default Layout