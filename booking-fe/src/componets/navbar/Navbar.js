import React from 'react';
import './navbar.css'
import Account from '../header/headerAccount/headerAccount'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const isSignIn = localStorage.getItem('isSignIn');
  const navigate = useNavigate()
  return (
    <div className='navbar'>
   <div className='navContainer'>
        <a href='/'>
          <span className='logo' >Booking.com</span>
        </a>
        {
          isSignIn ? <Account/> : (
            <div className='navItems'>
            <button className='navButton' onClick={() => navigate('/signup')}>Resgiter</button>
            <button className='navButton' onClick={() => navigate('/login')}>Login</button>
          </div>
          )
        }
      </div>
    </div>
    
  );
}

export default Navbar;