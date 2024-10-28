import React from 'react';
import './headerAccount.css';
import { signOut } from '../../../api/userAPI';

function headerAccount(){
    const isSignIn = localStorage.getItem('isSignIn');
    const userName = localStorage.getItem('userDisplayName');
    const userId = localStorage.getItem('userId')
    const handleSignOut = async () =>{
        
        localStorage.removeItem('userName');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userDisplayName');
        localStorage.removeItem('isSignIn');
        await signOut(userId)
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