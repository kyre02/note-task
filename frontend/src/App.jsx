import {Navigate, Routes, Route} from "react-router-dom"
import { useEffect } from "react"
import { userStore } from "./store/userStore" 
import { ThemeProvider } from "./theme/themeContext"
import Modal from 'react-modal';

import LoadingSpinner from "./components/users/LoadingSpinner"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail"
import Navbar from "./components/Navbar"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"


Modal.setAppElement('#root');

//protect routes that require authentication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = userStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // if (!user.isVerified) {
  //   return <Navigate to="/verify-email" replace />;
  // }
  return children;
}

//redirect authenticated users to home page
const RedirectAuthUser = ({children}) => {
  const {isAuthenticated, user} = userStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
}


function App () {
  const {isCheckingAuth, checkAuth} = userStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


 if (isCheckingAuth) {return <LoadingSpinner />
 }
  return (
    <ThemeProvider>
     
    <div className="flex flex-col min-h-screen text-text dark:bg-gradient-to-br from-[#0A112A] via-[#091a53] to-[#1b337e]">
        <Routes>

          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path="/login" element={<RedirectAuthUser><Login /></RedirectAuthUser>} />
          <Route path="/signup" element={<RedirectAuthUser><Signup /></RedirectAuthUser>} />
          <Route path = "/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<RedirectAuthUser><ForgotPassword /></RedirectAuthUser>} />
          <Route path='/reset-password/:token' element={<RedirectAuthUser><ResetPassword /> </RedirectAuthUser> }/>
          <Route path='*' element={<Navigate to ='/' />}/>
        </Routes>
        </div>

      
      </ThemeProvider>
  )
}

export default App