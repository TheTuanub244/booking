import React,{useState} from 'react';
import './login.css'
import HeaderLogin from '../../componets/header/HeaderLogin';
import { signIn } from '../../api/userAPI';

function Login() {

  const [inputData,setInputData] = useState({
    userName:'',
    password: ''
  });

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    
    setInputData({
      ...inputData,
      [name] : value
    })
  }

  const handleClickSignUp = () => {

  }
  const handleSignIn = async (e) => {
    const respone = await signIn(inputData)
    console.log(respone);
    
  }
  return (
    <div>
      <HeaderLogin/>
    <div className='loginContainer'>
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
          <button className='googleLoginButton'>
            <div className='googleLoginText'>Google</div>
          </button>
        </div>

        <p> OR </p>
        <div className='formLoginContainer'>
          <form className='formLogin'>
            <input type='email' name='userName' placeholder='email' onChange={handleInputChange} />
            <input type='password' name='password' placeholder='password' onChange={handleInputChange} />

            <div className='buttonGroup'>
            <button type='button'>Forgot Password ?</button>
            <button type='submit' name='submit' onClick={handleSignIn}>Login</button>
            </div>
          </form>
        </div>

      </div>

    </div>
    </div>
  );
}

export default Login;