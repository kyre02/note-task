import {Search, X} from 'lucide-react'


const SearchBar = ({user, value, onChange, handleSearch, onClearSearch}) => {
  if (!user) return null 
  return (
    <div className='w-80 flex items-center px-4 dark:bg-slate-700/40 bg-slate-200 rounded-md place-self-center'>
        <input 
            type='text'
            placeholder='Search notes'
            value={value}
            onChange={onChange}
            className='w-full text-lg bg-transparent py-[11px] focus-within:outline-none dark:text-text dark:placeholder-slate-400'
        />
        {value && (
        <X className=' text-slate-400 cursor-pointer dark:hover:text-white hover:text-bluecyan mr-3' onClick={onClearSearch} 
        />  
        )}
        <Search className='text-slate-400 cursor-pointer dark:hover:text-white hover:text-bluecyan' onClick={handleSearch} />

    </div>
  )
}

export default SearchBar