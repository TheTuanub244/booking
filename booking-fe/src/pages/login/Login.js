import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import HeaderLogin from '../../componets/header/HeaderLogin';
import { checkEmail, signIn, signInWithGoogle } from '../../api/userAPI';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createSessionForLoginWithGoogle } from '../../api/sessionAPI';
import Error from '../../componets/404/404Page';
const provider = new GoogleAuthProvider();

function Login() {
  const firebaseConfig = {
    apiKey: "AIzaSyDCraTEdoU1uNk8xAeftbYSfEs-eiCsD3U",
    authDomain: "booking-app-1edf4.firebaseapp.com",
    projectId: "booking-app-1edf4",
    storageBucket: "booking-app-1edf4.appspot.com",
    messagingSenderId: "319720545675",
    appId: "1:319720545675:web:0643aa0a2da6034082e38e",
    measurementId: "G-FK4KH759ZB"
};
  const [userId, setUserId] = useState()
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    setUserId(userId)
  }, [])
// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigate = useNavigate(); 
  async function handleSignInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      const respone = await signInWithGoogle(user)
      
      console.log('Signed in user:', user);
      const {userName, accessToken, uid, displayName} = user;
      const userData = {
        userName: userName,
        accessToken: accessToken,
        id: respone._id ,
        displayName: displayName
      };
      SaveUserDataToLocal(userData);
      navigate("/");
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorLogIn(error.toString());
    }
  }

  function SaveUserDataToLocal(userData){
    localStorage.setItem('userName', userData.userName);
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('userId', userData.id);
    localStorage.setItem('userDisplayName', userData.displayName);
    localStorage.setItem('isSignIn', true);
  }

  const [inputData,setInputData] = useState({
    password: '',
    userName: '',
    birthday: '',
    number: '',
    address: {
      province: '',
      district: '',
      ward: '',
    }
  });

  const [errorLogIn, setErrorLogIn] = useState('');

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    // Update address fields separately
    if (name === 'province' || name === 'district' || name === 'ward') {
      setInputData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setInputData({
        ...inputData,
        [name]: value,
      });
    }
  };


  


async function handleSubmit(event, inputData){
  event.preventDefault();
  const action = event.nativeEvent.submitter.name;
  try {
    const respone = await signIn(inputData);
    console.log(respone);
    
    const {userName, accessToken, uid, displayName, _id} = respone;
    const userData = {
      userName: userName,
      accessToken: accessToken,
      uid: uid,
      id: _id,
      displayName: displayName
    };
    SaveUserDataToLocal(userData);
    navigate("/");
  } catch (e) {
    console.error('Error during sign-in:', e);
    setErrorLogIn(e.toString());
  }
  
}
async function forgotPassword (){
  
  if(!inputData.userName){
    setErrorLogIn('Invalid email')
  }else {
    localStorage.setItem('email', inputData.userName)
    const respone = await checkEmail(inputData.userName)
 
    
    if(respone){
      setErrorLogIn('Invalid email')
    }else {
      sendPasswordResetEmail(auth, inputData.userName)
      alert('Reset password email has sent')
      setErrorLogIn('')
    }
  }
}
  return (
    <div>
      {
        !userId ? (
          <>
             <HeaderLogin/>
    <div className='loginContainer'>
      
      <div className='loginPanel'>
        <div className='getOutBtn'>
          <a href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30" fill="currentColor" className="bi bi-x"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path></svg>
          </a>
        </div>

        <h2>Log In</h2>
        <div className='signUpText'>Don't have an account ?
          <a href='/signup'>
            <span className='signUpLink'>Sign Up</span>
          </a>
          
        </div>

        <div className='socialButton'>
          <button className='googleLoginButton' onClick={handleSignInWithGoogle}>
            <div className='googleLoginText'>Google</div>
          </button>
        </div>

        <p> OR </p>
        <div className='formLoginContainer'>

          <form className='formLogin' onSubmit={(e) => {
                                                        handleSubmit(e, inputData)}}>
            <div className='loginInput'>
              <input type='string' name='userName' placeholder='userName' onChange={handleInputChange} required/>
              <input 
                                type='password' 
                                name='password' 
                                placeholder='password' 
                                onChange={handleInputChange} 
                                required
                              />
              
              {errorLogIn && <p className='errorMessage'>{errorLogIn}</p>}
            </div>
            
            <div className='buttonGroup'>

            <button type='button' onClick={forgotPassword} >Forgot Password ?</button>
            <button type='submit' name='login'>Login</button> 
                                    
            </div>
          </form>
        </div>

      </div>

    </div>
          </>
        ): (
          <Error/>
        )
      }
    </div>
  );
}



export default Login;