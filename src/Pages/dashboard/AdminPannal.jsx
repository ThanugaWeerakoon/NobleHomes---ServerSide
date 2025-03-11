import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import Dashboard from '../../Components/Dashboard'
import MainContent from '../../Components/MainContent';

const AdminPannal = () => {

    const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className='flex'>
      <Sidebar sidebarToggle={sidebarToggle}/>
      <Dashboard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
     
    </div>
  )
}

export default AdminPannal