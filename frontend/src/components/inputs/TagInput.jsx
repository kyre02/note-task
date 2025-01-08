import {Plus, X} from 'lucide-react'
import { useState } from 'react'

const TagInput = ({tags, setTags}) => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTag()
        }
    }

    const handleRemoteTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }


  return (
    <div>
      {tags?.length > 0 && (
            <div className='flex items-center gap-2 flex-wrap mt-2'>
            {tags.map((tag, index) => (
                <span key={index} 
                    className='flex items-center gap-2 text-md text-text px-3 py-1 rounded'>
                    #{tag}
                <button className=''
                    onClick={() => {
                        handleRemoteTag(tag)
                    }} >
                    <X />
                    </button>
                </span>
            ))}
        </div>
    )}
        <div className='flex items-center gap-4 mt-3'>
            <input type='text'
                className='dark:bg-slate-600/20 text-text border px-3 py-2 dark:border-slate-700 outline-none rounded '                
                placeholder='Add tags'
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} 
                value={inputValue}
                />

            <button className='w-8 h-8 flex items-center justify-center rounded border border-bluecyan hover:bg-bluecyan'
                onClick={() => addNewTag()}>
                <Plus className='text-2xl text-bluecyan hover:text-white'/>
            </button>

        </div>
    </div>
  )
}

export default TagInput