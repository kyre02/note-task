import {motion} from "framer-motion"
import {X} from 'lucide-react'
import { useState } from 'react'
import {noteStore} from "../../store/noteStore"
import TagInput from '../inputs/TagInput'

const NotesModal = ({notes, type, onClose}) => {
  const [title, setTitle] = useState(notes?.title || '');
  const [content, setContent] = useState(notes?.content || '');
  const [tags, setTags] = useState(notes?.tags || []);

  const {addNote, editNote} = noteStore();

  //add note
  const addNewNote = async(e) => {
    e.preventDefault();
    try {
      const result = await addNote(title, content, tags)
      if (result.success) {
        onClose();
      }
    } catch (error) {
      console.log(error)
    }
  }

  //update note
  const updateNote = async(e) => {
    e.preventDefault();
    try {
      const result = await editNote(notes._id, title, content, tags);
      if (result.success) {
        onClose();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddNote = (e) => {
    e.preventDefault();
    if (type === 'edit') {
      updateNote(e)
    }else {
      addNewNote(e)
    }
  }

  return (
    <motion.div 
  
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 "
        onClick={onClose}
        >
        <X className="text-xl text-text hover:text-slate-50"/>
      </button>
     
      <div className='flex flex-col gap-2 '>
        <label className='input-label'>Title</label>
        <input
            text='text'
            className='text-2xl text-slate-950 outline-none dark:text-text dark:bg-slate-600/25 dark:border-slate-700 border'
            placeholder='Go to Gym at 5:00 am'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>Content</label>
        <textarea
          type='text'
          className='text-text outline-none bg-background dark:bg-slate-600/25 rounded dark:border-slate-700 border'
          placeholder='Type here...'
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          />
      </div>
      <div className='mt-3'>
        <label className='input-label'>Tags</label>
        <TagInput 
          tags={tags}
          setTags={setTags} 
          />
        </div>
        {/* {error && <p className='text-red-500 text-sm mt-2'>{error}</p>} */}
    <button 
      className='main-btn'
      onClick={handleAddNote}>
      {type === "edit" ? "UPDATE": "ADD"}
    </button>
    
    </motion.div>

  )
}

export default NotesModal