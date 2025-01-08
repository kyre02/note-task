import React from 'react';
import { getInitials } from '../../utilities/helper.js';

const ProfileInfo = ({onLogout, user}) => {

  if (!user) return null 
  return (
    <div className='flex items-center gap-3 '>
      <div className='dark:bg-slate-400/30 text-text w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200'>
        {getInitials(user.name)}
      </div>
      <div>
      <p className='font-medium dark:text-slate-400 text-slate-200'>{user.name}</p>
      <button	
					onClick={onLogout}
					className=' dark:text-slate-400 underline text-slate-200'
				>
					Logout
				</button>
        
      
      </div>
      
    </div>
  )
}

export default ProfileInfo