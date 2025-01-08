import {motion} from "framer-motion"
import { useState, useRef, useEffect } from "react";
import { userStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const VerifyEmail = () => {
  const [code, setCode] = useState(['','','','','','']);
  const inputRefs = useRef([]);

  const {error, isLoading, message, verifyEmail} = userStore();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    try {
      const response = await verifyEmail(verificationCode)
      if (response.success) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (index, value) => {
    const newCode = [...code];

    //handle pasted values
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      for (let i = 0; i < 6; i++){
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      //Focus on the last non-empty input or the first empty input
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 :5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      //Move focus to the next input field if value is entered
      if (value && index < 5){
        inputRefs.current[index + 1].focus();
      }
    }
  } 

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0){
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData('Text');
    handleChange(index, pastedValue);
  };

useEffect(() => {
    if(code.every((digit) => digit !== '')){
      handleSubmit(new Event('submit'));
    }
  }, [code])


  return (
    <>
    <Navbar />
    <div className='flex justify-center pt-40'>
      
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className='motion-div'>

      <div className='p-8'>
        <h2 className="h2-text">
          Verify Email
        </h2>
        <p className='text-center text-text mb-4'>Enter the 6-digit code sent to your email address</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center items-center space-x-4">
            {code.map((digit, index) => (
              <input 
              key={index}
              ref={(el) => inputRefs.current[index] = el}
              type="text"
              value={digit}
              maxLength={1}
              className='sm:size-12 lg:size-14 text-center sm:text-xl lg:text-2xl font-bold
                      bg-gray-800/40 text-text border-2 lg:border-[3px] border-gray-300 rounded-lg
                      focus:border-blue-500 focus:outline-none my-2'
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              />

            ))}

          </div>
          {error && <div className="error-message">{error}</div>}
         {message && <div className="success-message">{message}</div>}

         <motion.button
            className='main-btn px-2'
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            type='submit'
            disabled={isLoading || code.some((digit) => !digit)}


          > 
          {isLoading ? "Verifying...": "Verify Email" }
            </motion.button>
        </form>
      </div>
    </motion.div>
    </div>
    </>
  )
}

export default VerifyEmail