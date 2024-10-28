import React,{useState} from 'react';
import './Signup-page.css'
import HeaderLogin from '../../componets/header/HeaderLogin';
import { checkEmail, signIn, signUp } from '../../api/userAPI';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const provider = new GoogleAuthProvider();
function SignUp_page() {
  const navigate = useNavigate(); 

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


  const handleClickLogIn = () => {
    console.log('fun');
  }

function checkSignUp(inputData){
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
  const respone = await signUp(inputData)
  if(typeof respone === 'string'){
    setErrorSignUp(respone)
  }
  else {
    navigate('/login')
    alert("Verify email has been sent!")
  }
  
}

 async function handleCheckEmail(){
      
      const respone =  await checkEmail(inputData.email)
      console.log(respone);
      
      if(respone === true){
        setErrorSignUp('')
        setEnter(true)

      }else {
        setErrorSignUp(respone)
      }
  
}

function handleGoBackToEmail(){
  setErrorSignUp('');
  setInputData({
    ...initialInputData,
    email: inputData.email
  });
  setEnter(false);
}



  return (
    <div>
      <HeaderLogin/>
    <div className='signUpContainer'>
      
      <div className='signUpPanel'>
        {enter && 
        (<button className='backBtn' onClick={(e) => {handleGoBackToEmail()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M5.854 4.146a.5.5 0 0 1 0 .708L2.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0z"/>
              <path fillRule="evenodd" d="M10 8a.5.5 0 0 1-.5.5H2.707a.5.5 0 0 1 0-1H9.5A.5.5 0 0 1 10 8z"/>
            </svg>
        </button>)}
        <div className='getOutBtn'>
          <a href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30" fill="currentColor" className="bi bi-x"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path></svg>
          </a>
        </div>

        <h2>Sign Up</h2>
        <div className='logInText'>Do u have an account ?
            <a href='/login'>
                <span onClick={handleClickLogIn} className='logInLink'>Log In</span>
            </a>
          
        </div>

        
        <div className='formSignUpContainer'>

          <form className='formSignUp' onSubmit={(e) => {
                                                        handleSubmit(e, inputData)}}>
            <input type='email' name='email' placeholder='Email' onChange={handleInputChange} />
            
            {enter && (
                            <div className='formSignUp'>
                              <input 
                                type='text' 
                                name='userName' 
                                placeholder='Tên đăng nhập' 
                                onChange={handleInputChange} 
                              />
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
                        
            }
            {
              errorSignUp && <p className='errorMessage' >{errorSignUp}</p>
            }
            <div className='signUp-buttonGroup'>
            {!enter && <button type='button' onClick={(e) => handleCheckEmail()}>Enter</button>}
            {enter && (<button type='submit' name='signup' >Sign Up</button>)}
            
            </div>
          </form>
        </div>

      </div>

    </div>
    </div>
  );
}



export default SignUp_page;