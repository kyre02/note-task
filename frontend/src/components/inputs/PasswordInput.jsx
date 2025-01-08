import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'


const PasswordInput = ({icon: Icon,value, onChange}) => {
    const [isShowPassword, setIsshowPassword] = useState(false);

    const handleShowPassword = () => {
        setIsshowPassword(!isShowPassword);
    }
  return (
    <div className='relative flex items-center input-box mb-4'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className="size-5 text-bluecyan"/>
        </div>
        <input 
        className='w-full bg-transparent mr-3 rounded-lg outline-none text-lg'
        type={isShowPassword ? "text" : "password"} 
        placeholder='Password'
        value={value}
        onChange={onChange}
        name='password'
        />
    {isShowPassword ? <Eye
        size={22}
        className="cursor-pointer text-blue-500"
        onClick={() => handleShowPassword()}
    /> : <EyeOff
            size={22}
            onClick={() => handleShowPassword()}
        /> }
    </div>
  )
}

export default PasswordInput