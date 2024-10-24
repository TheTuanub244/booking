import {
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Hotel from './pages/hotel/Hotel'
import SignupPage from './pages/signup/Signup-page'
import Login from './pages/login/Login'
import Login_test from './pages/login/Login_test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route> 
        <Route path='/login-test' element={<Login/>}></Route> 
        <Route path="/" element={<Home/>}></Route>
        <Route path="/hotels" element={<List/>}></Route>
        <Route path="/hotels/:id" element={<Hotel/>}></Route>
        <Route path="/signup" element={<SignupPage/>}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App