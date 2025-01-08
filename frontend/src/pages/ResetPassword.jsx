import {motion} from 'framer-motion'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {Lock} from 'lucide-react'

import { userStore } from '../store/userStore'
import Input from '../components/inputs/Input'
import PasswordStrength from '../components/users/PasswordStrength'
import InvalidToken from '../components/users/InvalidToken'
import Navbar from '../components/Navbar'


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(true)

  const {resetPassword, isLoading, message, validateResetToken} = userStore();
  const {token} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(token);
      if (!response.success) {
        setError(response.error);
         setIsTokenValid(false)
      }
    };
    validateToken();
  }, [token, validateResetToken, navigate]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const response = await resetPassword(token, password);
    if (response.success) {
      navigate('/login');
    } else {
      setError(response.error);
    }
  };
  
  if (!isTokenValid) {
    return <InvalidToken />
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
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>

        <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <PasswordStrength password={password} />

          <motion.button
            className='main-btn '
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              type='submit'
              disabled={isLoading}

          >

            {isLoading ? "Resetting..." : "Set New Password"}
            </motion.button>
        </form>
      </div>
      
    </motion.div>
    </div>
    </>
  )
}

export default ResetPassword