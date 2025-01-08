import {create} from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000": "";
axios.defaults.withCredentials = true;

export const noteStore = create((set) => ({
  notes: [],
  error: null,
  setNotes: (notes) => set({notes}),
  
  //show all notes
  showNotes: async() => {
    try {
      const response = await axios.get(`${API_URL}/show-notes`);
      if (response.data && response.data.notes) {
      set({notes: response.data.notes})
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
    
  },
  
  //Add notes
  addNote: async(title, content, tags) => {
    if (!title) {
      set({error: "Title is required"})
      return {error: "Title is required"}
  }
  if (!content) {
    set({error: "Content is required"})
    return {error: "Content is required"}
  }
  try {
    const response = await axios.post(`${API_URL}/add-note`, {title, content, tags});
    set((state) => ({notes: [...state.notes, response.data.note]}))
    return {success: true, message: "Note successfully saved"}

  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error saving note";
    set({ error: errorMessage});
    return { success: false, error: errorMessage };
  }
  },

  //edit note
  editNote: async(noteId, title, content, tags) => {
    try {
      const response = await axios.put(`${API_URL}/edit-note/${noteId}`, {title, content, tags})
      if (response.data && response.data.note) {
        set((state) => ({notes: state.notes.map(note => note._id === noteId ? response.data.note: note)
      }))
      }
      return {success: true, message: "Note successfully updated"};
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error updating note";
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  //delete note
  deleteNote: async(note) => {
    try {
      const response = await axios.delete(`${API_URL}/delete-note/${note._id}`)
      if (response.data && response.data.note) {
        set((state) => ({notes: state.notes.filter((n) => n._id !== note._id ) }))
        return {success: true, message: "Note deleted successfully"}
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error deleting note";
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },


  // Pin note
  pinNote: async (note) => {
    try {
      const response = await axios.put(`${API_URL}/pin-note/${note._id}`, { isPinned: !note.isPinned });
      if (response.data && response.data.note) {
        set((state) => ({notes: state.notes.map((n) =>n._id === note._id ? response.data.note : n) }));
        return { success: true, message: "Pin successfully updated" };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error updating pin";
      set({ error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  searchNotes: async(query) => {
    try {
      const response = await axios.get(`${API_URL}/search-note/`, {params: {query} });
      if (response.data && response.data.notes) {
        set({notes: response.data.notes});
        return {success: true, message: "Notes successfully fetched"}
      }
    }
    catch (error) {
    const errorMessage = error.response?.data?.error || "Error searching notes";
    set({ error: errorMessage });
    return { success: false, error: errorMessage };
  }
  },


}))