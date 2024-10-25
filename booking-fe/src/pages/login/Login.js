import React,{useState} from 'react';
import './login.css'
import HeaderLogin from '../../componets/header/HeaderLogin';
import { signIn } from '../../api/userAPI';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed in user:', user);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  }
  const initialInputData = {
    email: '',
    password: '',
    userName: '',
    birthday: '',
    number: '',
    address: {
      province: '',
      district: '',
      ward: '',
    },
  };

  const [inputData,setInputData] = useState({

    email: '',
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

  const [errorSignUp, setErrorSignUp] = useState('');

  const [loginPopUp, setLogInPopUp] = useState(false);

  const [enter, setEnter] = useState(false);

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


  const handleClickSignUp = () => {

  }


  function handleLogin(inputData){
    return true;
    
  } 

function handleSignUp(inputData){
  let strength = 0;

    // Độ dài mật khẩu
    if (inputData.password.length <= 8) {
      setErrorSignUp(prev => 'Mat khau phai lon hon 8');
      return false;
    }
    


    // // Có chữ thường
    // if (/[a-z]/.test(password)) strength += 1;

    // // Có chữ hoa
    // if (/[A-Z]/.test(password)) strength += 1;

    // // Có số
    // if (/\d/.test(password)) strength += 1;

    // // Có ký tự đặc biệt
    // if (/[\W_]/.test(password)) strength += 1;

    // // Đánh giá dựa trên tổng điểm
    // if (strength === 5) {
        
    // } else if (strength >= 3) {
        
    // } else {
        
    // }
    return true;
}

async function handleSubmit(event, inputData){
  event.preventDefault();
  const action = event.nativeEvent.submitter.name;
  const respone = await signIn(inputData)
    console.log(respone);
  if(action === 'login') {
    if(!handleLogin(inputData)) return;
  }
  if(action === 'signup') {
    if(!handleSignUp(inputData)) return;
  }
}

function handleCheckEmail(email){
    setEnter(true);
    //checkEmail(email) ? setLogInPopUp(true) : setLogInPopUp(false);
  
}

function handleGoBackToEmail(){
  setErrorSignUp('');
  setInputData({
    ...initialInputData,
    email: inputData.email
  });
  setEnter(false);
  setLogInPopUp(prev => !prev);
}

function checkEmail(email){
  return false;
  
}



  return (
    <div>
      <HeaderLogin/>
    <div className='loginContainer'>
      {enter && (<button className='backBtn' onClick={(e) => {handleGoBackToEmail()}}>
            ← Back
      </button>)}
      <div className='loginPanel'>
        <div className='getOutBtn'>
          <a href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30" fill="currentColor" class="bi bi-x"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path></svg>
          </a>
        </div>

        <h2>Log In</h2>
        <div className='signUpText'>Don't have an account ?
          <span onClick={handleClickSignUp} className='signUpLink'>SignUp</span>
        </div>

        <div className='socialButton'>
          <button className='googleLoginButton' onClick={signInWithGoogle}>
            <div className='googleLoginText'>Google</div>
          </button>
        </div>

        <p> OR </p>
        <div className='formLoginContainer'>

          <form className='formLogin' onSubmit={(e) => {
                                                        handleSubmit(e, inputData)}}>
            <input type='email' name='userName' placeholder='userName' onChange={handleInputChange} />
            {enter && (
                          loginPopUp ? (
                            <input 
                              type='password' 
                              name='password' 
                              placeholder='password' 
                              onChange={handleInputChange} 
                            />
                          ) : (
                            <div>
                              <input 
                                type='text' 
                                name='username' 
                                placeholder='Tên đăng nhập' 
                                onChange={handleInputChange} 
                              />
                              <input 
                                type='date' 
                                name='birthday' 
                                placeholder='ngày sinh' 
                                onChange={handleInputChange} 
                              />
                              <input 
                                type='number' 
                                name='number' 
                                placeholder='Số điện thoại' 
                                onChange={handleInputChange} 
                              />
                              <input
                                type='password'
                                name='password'
                                placeholder='Mật khẩu'
                                onChange={handleInputChange}
                              />
                              <label>Địa chỉ:</label>
                              <div class="address-group">
                              <select id="province" name="province" onChange={handleInputChange} required>
                                <option value="">Tỉnh/Thành phố</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                              </select>


                              <select id="district" name="district" onChange={handleInputChange}>
                                <option value="">Quận/Huyện</option>
                                
                              </select>

                              <select id="ward" name="ward" onChange={handleInputChange}>
                                <option value="">Phường/Xã</option>
                                
                              </select>
                              </div>
                              
                            </div>
                            
                          )
                        )
            }
            <p>{errorSignUp}</p>
            <div className='buttonGroup'>

            {(enter && loginPopUp) && <button type='button'>Forgot Password ?</button>}
            {!enter && <button type='button' onClick={(e) => handleCheckEmail(inputData.email)}>Enter</button>}
            {enter && (loginPopUp ? <button type='submit' name='login'>Login</button> : 
                                    <button type='submit' name='signup'>Sign Up</button>)}
            
            

            </div>
          </form>
        </div>

      </div>

    </div>
    </div>
  );
}



export default Login;