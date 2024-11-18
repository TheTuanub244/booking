import React, { useState } from 'react'
import './SideBar.css'
import Logo from '../../imgs/logo.png'
import { SidebarData } from '../../data/DashboardData'
import { Link } from 'react-router-dom'
const SideBar = ({ setSelectedComponent }) => {
    const [selected,setSelected] = useState(0)
  return (
    <div className = "sidebar">
        <div className='logo'>
            <img src ={Logo} alt='' ></img>
            <span>
                booking.com
            </span>
        </div>
       <div className='menu'>
           {
            SidebarData.map((item,index) => {
                return(
                    <Link to={item.path}>
                    <div className={selected===index? 'menuItem active ': 'menuItem'}
                    key = {index}
                     onClick={() => {
                    setSelected(index);
                     }}
                    >
                        <item.icon/>
                        <span>
                            {item.heading}
                        </span>
                    </div>
                    </Link>
                )
            })
           }

       </div>
    </div>
  )
}

export default SideBar
