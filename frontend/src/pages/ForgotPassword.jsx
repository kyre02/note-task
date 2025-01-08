import {motion} from "framer-motion"
import { useState } from "react"
import { Link } from 'react-router-dom'

import {Mail, LoaderCircle, ArrowLeft} from 'lucide-react'
import { userStore } from '../store/userStore'
import Input from "../components/inputs/Input"
import Navbar from "../components/Navbar"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {isLoading, forgotPassword, error} = userStore();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
    <Navbar />
    
    <div className='flex justify-center pt-40'>
    <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className='motion-div'
  >
    <div className='p-8'>
        <h2 className="h2-text">
          Forgot Password
        </h2>

        { !isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <p className='text-text text-sm text-center mb-6'>Enter your email address and we'll send you a link to reset your password. </p>
        <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <error className='text-red-500 text-sm'>{error}</error>
          <motion.button
            className='main-btn transition-duration-200 px-2'
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            type='submit'
            disabled={isLoading}

          > 
          {isLoading ? <LoaderCircle className='size-6 animate-spin mx-auto text-blue-200' />: "Send reset link" }
            </motion.button>

          </form>
            
            
          ): (
            <div className='text-center'>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{type: "spring", stiffness:500, damping:30}}
              className='size-16 bg-blue-500/50 rounded-full flex items-center justify-center mx-auto mb-4'
              >
            <Mail className='size-8 text-white' />
            </motion.div>
            <p>
              We have sent a reset password link to your email address. Please check your email and follow the instructions to reset your password.
            </p>

            </div>
          )}
              <Link to ='/login' className='text-base text-bluecyan hover:text-slate-200'>
              <div className='flex justify-center dark:bg-gray-900/50 bg-gray-300 rounded-lg py-3 mt-6 hover:bg-bluecyan'>
            <ArrowLeft className='size-6 inline-block mr-2' />
            Back to login
            </div>
            </Link>

          </div>
    </motion.div>
    </div>
    </>
  )
}

export default ForgotPassword