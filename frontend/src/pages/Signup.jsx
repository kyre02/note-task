import {motion} from 'framer-motion'
import { useState } from 'react'
import {User, Mail, Lock, LoaderCircle} from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'

import Input from '../components/inputs/Input'
import { userStore } from '../store/userStore'
import PasswordStrength from '../components/users/PasswordStrength'
import PasswordInput from '../components/inputs/PasswordInput'
import Navbar from '../components/Navbar'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading, signup, error, message} = userStore();
  const navigate = useNavigate();

  const handleSignup = async(e) => {
    e.preventDefault();
       
    try{
      const result = await signup(name, email, password);
        if (result.success) {
          navigate("/verify-email");
        }
      } catch (error) {
        console.log(error)
      }
  }


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
        <h2 className='h2-text'>
          Create an Account
        </h2>
        <form onSubmit={handleSignup}>
        <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
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
         {error && <div className="error-message">{error}</div>}
         
         {/* {message && <div className="success-message">{message}</div>} */}

         <PasswordStrength password={password} />

          <motion.button
            className='main-btn'
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <LoaderCircle className='size-8 animate-spin mx-auto text-blue-200' /> : "Sign Up"}
            
          </motion.button>
        </form>
         </div>
         <div className='pb-4 flex justify-center'>
        <p className='text-text '>
          Already have an account?
          <Link to='/login' className='text-bluecyan ml-2 hover:underline'>Login</Link>
        </p>

      </div>

    </motion.div>
    </div>
    </>
  )
}

export default Signup