import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {Plus } from 'lucide-react'
import Modal from 'react-modal'

import { noteStore } from "../store/noteStore"
import { userStore } from "../store/userStore"
import EmptyCard from '../components/cards/Emptycard'
import Navbar from "../components/Navbar"

import NoteCard from '../components/cards/NoteCard'
import emptyNote from '../assets/emptyNote.svg'
import addNote1 from '../assets/addNote1.svg'
import NotesModal from "../components/notes/NotesModal"

const Home = () => {
  const [openNotesModal, setOpenNotesModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });
	const {notes, showNotes, deleteNote, pinNote, searchNotes} = noteStore();
	const {getUserInfo, user} = userStore();
	const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(navigate);
    showNotes();
  }, [getUserInfo, showNotes, navigate]);


  const onClose = () => {
    setOpenNotesModal({
      isShown: false,
      type: "add",
      data: null
    })
  }

  const handleEdit = (note) => {
    setOpenNotesModal({isShown: true, type: "edit", data: note})
  };

  //delete note
  const onDelete = async(note) => {
    const result = await deleteNote(note)
    if (result.success) {
      console.log(result.message)
    }else {
      console.error(result.error);
    }
  };

  //pin note
  const updateIsPinned = async(note) => {
    const result = await pinNote(note)
    if (result.success) {
      console.log(result.message)
    }else {
      console.error(result.error);
    }
  }

  //search bar handle clear search
  const handleClearSearch = () => {
    setIsSearch(false);
    showNotes();
  };

  //search bar handle search
  const onSearchNote = async(query) => {
    const result = await searchNotes(query)
    if (result.success) {
      setIsSearch(true);
    }else {
      console.error(result.error);
    }
    
  }
  


  return (
		<>
    <Navbar handleClearSearch={handleClearSearch} onSearchNote={onSearchNote}  />
		<div className='w-full px-16 py-4'>
		{notes.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-8">
        {notes.map((note) => (
        
           <NoteCard
					 key={note._id}
           note={note}
           onEdit={() => handleEdit(note)}
           onDelete={() => onDelete(note)}
           onPinNote={() => updateIsPinned(note)}
          />
        ))}
        </div>) : 
        (
					
				<EmptyCard
          imgSrc={isSearch ? emptyNote : addNote1}
          message={isSearch ? "No notes found in your search" : "No notes available. Click on the 'Add' button to add a new note"}
        />
				) }  
      <button 
      className="w-20 h-20 flex items-center justify-center rounded-2xl bg-bluecyan hover:bg-[#2f79aa] absolute right-10 bottom-10" 
      onClick={() => {
        setOpenNotesModal({
          isShown: true,
          type: "add",
          data: null
        })
      }}
      >
        <Plus className="size-10 text-white" />
      </button>

      <Modal
        isOpen={openNotesModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)'
          }
        }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-h-3/4 bg-white dark:bg-slate-800 rounded-md mx-auto mt-[115px] p-6 pb-12 overall-scroll "
        >
          <NotesModal
            isOpen={openNotesModal.isShown}
            type={openNotesModal.type}
            notes={openNotesModal.data}
            onClose={onClose}
            />
        </Modal>
    
				</div>
			
				</>
  )
}

export default Home