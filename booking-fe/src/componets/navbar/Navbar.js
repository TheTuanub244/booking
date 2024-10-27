import React from 'react';
import './navbar.css'
import Account from '../header/headerAccount/headerAccount'

function Navbar() {
  const isSignIn = localStorage.getItem('isSignIn');
  return (
    <div className='navbar'>
      {isSignIn ?  (<Account />) : (<div className='navContainer'>
        <span className='logo'>Booking.com</span>
        <div className='navItems'>
          <button className='navButton'>Resgiter</button>
          <button className='navButton'>Login</button>
        </div>
      </div>)}
    </div>
    
  );
}

export default Navbar;