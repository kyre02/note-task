import {motion} from 'framer-motion';
import {useState} from 'react';
import {LoaderCircle, Mail, Lock} from "lucide-react";
import {Link, useNavigate} from 'react-router-dom';
import Input from '../components/inputs/Input';
import { userStore } from '../store/userStore';
import PasswordInput from "../components/inputs/PasswordInput"
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, isLoading, error, message} = userStore();
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    
    try {
      const response = await login(email, password);
      if (response.success) {
        (response.message); // Log success message
        navigate("/"); 
      } else {
        (response.error); // Log failure message
      }
    } catch (error) {
      console.log(error)
    }
    
  };


  return (
    <>
    <Navbar/>
    <div className='flex justify-center pt-40'>
      
    <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className='motion-div'
  >

      <div className='p-8'>
        <h2 className="h2-text">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
        <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <div className='flex mb-6'>
            {error && <p className='fixed left-8 text-red-500 text-sm '>{error}</p>}

          <div className='fixed right-8 '>
            <Link to='/forgot-password' className="text-sm lg:text-base text-bluecyan hover:underline">Forgot Password?</Link>
          </div>
          
          </div>
          <motion.button
            className='main-btn transition-duration-200 px-2'
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            type='submit'
            disabled={isLoading}

          > 
          {isLoading ? <LoaderCircle className='size-6 animate-spin mx-auto text-blue-200' />: "Log-in" }
            </motion.button>
          </form>
          
        </div>
        <div className='pb-4 flex justify-center'>
        <p className='text-text '>
          Don't have an account?
          <Link to='/signup' className='text-bluecyan ml-2 hover:underline'>Sign-up</Link>
        </p>

      </div>
    </motion.div>
    </div>
    </>
  )
}

export default Login