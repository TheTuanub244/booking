import React from 'react';
import './headerAccount.css';

function headerAccount(){
    const isSignIn = localStorage.getItem('isSignIn');
    const userName = localStorage.getItem('userDisplayName');

    const handleSignOut = () =>{
        localStorage.removeItem('userName');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userDisplayName');
        localStorage.removeItem('isSignIn');

        window.location.reload(); // Refresh the page after sign-out
    }

    return(
        
            <div className='headerAccountContainer'>
                    <span className='userName-account'>{'Hello, ' + userName}</span>
                    <button onClick={handleSignOut} className='signOutButton'>Sign Out</button>
            </div>
            
        
            
    )
}

export default headerAccount;