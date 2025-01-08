
const Input = ({icon:Icon, ...props}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className="size-5 text-bluecyan"/>
        </div>
        <input
            {...props}
            className='input-box'
        />
    </div>
  )
}

export default Input