import React from 'react'

const EmptyCard = ({imgSrc, message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20 transform -translate-x-10 '>
        <img src={imgSrc} alt='no notes' className='w-[400px]' />
        <p className='w-1/2 text-3xl font-montserrat text-text text-center leading-7 mt-10'>
            {message}
        </p>
    </div>
  )
}

export default EmptyCard