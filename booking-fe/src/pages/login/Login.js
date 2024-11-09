import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import HeaderLogin from '../../componets/header/HeaderLogin';
import { checkEmail, signIn, signInWithGoogle, updateInformationForGoogle } from '../../api/userAPI';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createSessionForLoginWithGoogle } from '../../api/sessionAPI';
import Error from '../../componets/404/404Page';
import { getProvince } from '../../api/addressAPI';
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
  const [addInfo, setAddInfo] = useState(false)
  const [address, setAddress] = useState()
const [district, setDistrict] = useState()
const [ward, setWard] = useState()
const handleGetAddress = async () => {
  const respone = await getProvince()
  setAddress(respone)
}
const getDistrict = async (code) => {
    
  const findDistrict = address.find(index => index.code === parseInt(code))
  console.log(findDistrict);
  
  setDistrict(findDistrict.districts)
  
}
const getWard = async(code) => {
  const findWard = district.find(index => index.code === parseInt(code))
  console.log(findWard);
  
  setWard(findWard?.wards)
}
useEffect(() => {
  handleGetAddress()
}, [])
const handleChangeOptions = async (e) => {
  const { name, value } = e.target;
    const selectedOptions = e.target.options[e.target.selectedIndex];
    const code = selectedOptions.getAttribute('data-code')
    
    if (name === 'province') {
        await getDistrict(code)
        setInputData((prev) => ({
          ...prev,
            address: {
              ...prev.address,
              [name]: value,
            }
        }));
      }else if(name === 'district'){
        await getWard(code)
        setInputData((prev) => ({
          ...prev,
            address: {
              ...prev.address,
              [name]: value,
            }
        }));
      }else if(name === 'ward'){
        setInputData((prev) => ({
          ...prev,
            address: {
              ...prev.address,
              [name]: value,
            }
        }));
}
}
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    setUserId(userId)
  }, [])
  const [displayName, setDisplayName] = useState()
// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigate = useNavigate(); 
  async function handleSignInWithGoogle() {
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      const respone = await signInWithGoogle(user)
      if(typeof respone === 'string'){
        setAddInfo(true)
        
        inputData.userName = user.email
        inputData.uid = user.uid
        inputData.email = user.email
        setDisplayName(user.displayName)
      }else {
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
    
    const {userName, accessToken, uid, displayName, _id} = respone;
    const userData = {
      userName: userName,
      accessToken: accessToken,
      uid: uid,
      id: _id,
      displayName: displayName
    };
    SaveUserDataToLocal(userData);
    const redirectPath = localStorage.getItem('redirectPath')
    if(redirectPath){
      navigate(redirectPath);
    }
    else {
      navigate("/");
    }
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
  const handleAddInforGoogle = async (e, inputData) => {
    e.preventDefault()
    const respone = await updateInformationForGoogle(inputData)   
    const {userName, accessToken, uid, _id} = respone;
    const userData = {
      userName: userName,
      accessToken: accessToken,
      uid: uid,
      id: _id,
      displayName: displayName
    };
    SaveUserDataToLocal(userData); 
  }
  return (
    <div>
      {
        !userId ? (
          !addInfo ? (
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
          ) : 
          (
            <>
              <HeaderLogin/>

<div className='signUpContainer'>

<div className='signUpPanel'>

  <div className='getOutBtn'>
    <a href='/'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30" fill="currentColor" className="bi bi-x"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path></svg>
    </a>
  </div>

  <h2>Sign In With Google</h2>
  <div className='logInText'>Please add more information to please sign in
  </div>

  
  <div className='formSignUpContainer'>

    <form className='formSignUp' onSubmit={(e) => {
                                                  handleAddInforGoogle(e, inputData)}}>
      
                      <div className='formSignUp'>

                        <input 
                          type='date' 
                          name='dob' 
                          placeholder='ngày sinh' 
                          onChange={handleInputChange} 
                        />
                        <input 
                          type='number' 
                          name='phoneNumber' 
                          placeholder='Số điện thoại' 
                          onChange={handleInputChange} 
                        />
                        <label>Địa chỉ:</label>
                        <div className="address-group">
                        <select id="province" name="province" onChange={handleChangeOptions} required>
                          <option value="">Tỉnh/Thành phố</option>
                          {
                            address.map((index) => (
                              <option value={index.name} data-code={index.code}>{index.name}</option>
                            ))
                          }
                        </select>


                        <select id="district" name="district" onChange={handleChangeOptions}>
                          <option value="">Quận/Huyện</option>
                          {
                            district?.map((index) => (
                              <option value={index.name} data-code={index.code}>{index.name}</option>
                            ))
                          }
                        </select>

                        <select id="ward" name="ward" onChange={handleChangeOptions}>
                          <option value="">Phường/Xã</option>
                          {
                            ward?.map((index) => (
                              <option value={index.name} data-code={index.code}>{index.name}</option>
                            ))
                          }
                        </select>
                        </div>
                        <div className='signUp-buttonGroup'>
                        <button type='submit' name='signup' >Sign Up</button>
                      </div>
                      </div>
    </form>
  </div>

</div>

</div>
            </>
  
          )
        ): (
          <Error/>
        )
      }
    </div>
  );
}



export default Login;