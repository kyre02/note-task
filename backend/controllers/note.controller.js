import Note from "../models/note.db.js";

//add note
export const addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!title) {
      return res.status(400).json({ error: "Title is required" });
  }
  if (!content) {
      return res.status(400).json({ error: "Content is required" });
  }
  try {
      const note = new Note({
          title,
          content,
          tags: tags || [],
          userId: user._id 
      });

      await note.save();
      res.status(200).json({ success: true, note: note, message: "Note added successfully" });
      
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};


//edit note
export const editNote = (async (req, res) => {
  const noteId = req.params.noteId;
  const {title, content, tags, isPinned} = req.body;
  const user = req.user;

  if (!title && !content && !tags) {
   return res.status(400).json({message: "No changes provided"});   
  }
  try {
      const note = await Note.findOne({_id: noteId, userId: user._id});

      if (!note) {
          return res.status(404).json({message: "Note not found"});
      }

      if (title) note.title = title;
      if (content) note.content = content;
      if (tags) note.tags = tags;
      if (isPinned) note.isPinned = isPinned;

      await note.save();

      res.status(200).json({success: true, note: note, message: "Note updated successfully"});
      
  } catch (error) {
      res.status(500).json({success: false, message: "Server error"});
  }
});

//show notes
export const showNotes = (async (req, res) => {
  const user = req.user;

  try {
      const notes = await Note.find({userId: user._id}).sort({isPinned: -1});
      return res.status(200).json({success: true, notes: notes, message: "Notes retrieved successfully"});

  } catch (error) {
      res.status(500).json({success: false, error: "Server error"});
  }

});


//delete note
export const deleteNote = (async(req, res) => {
  const noteId = req.params.noteId;
  const user = req.user;

  try {
    const note = await Note.findOne({_id: noteId, userId: user._id});

    if (!note) {
      return res.status(400).json({success: false, message: "Note not found"})
    }

    await Note.deleteOne({_id: noteId, userId: user._id});
    res.status(200).json({success: true, message: "Note deleted successfully"})

  }catch (error) {
    res.status(500).json({success: false, message: "Server Error"})
  }
}); 

//pin note
export const pinNote = (async (req, res) => {
  const noteId = req.params.noteId;
  const {isPinned} = req.body;
  const user = req.user;

  if (typeof isPinned !== 'boolean') {
    return res.status(400).json({ error: 'isPinned must be a boolean' });
  }

  
  try {
      const note = await Note.findOne({_id: noteId, userId: user._id});

      if (!note) {
          return res.status(404).json({message: "Note not found"});
      }

      note.isPinned = isPinned;
      await note.save();
      res.status(200).json({success: true, note: note, message: "Note updated successfully"});
      
  } catch (error) {
      res.status(500).json({success: false, message: "Server error"});
  }
});


//search note
export const searchNotes = (async (req, res) => {
  const user = req.user;
  const {query} = req.query;

  if (!query) {
      return res.status(400).json({error:true, message: "Search query is required"});
  }
  try {
      const matchingNotes = await Note.find({
          userId: user._id, 
          $or : [
              {title: {$regex: new RegExp(query, "i")}},
              {content: {$regex: new RegExp(query, "i")}},
          ]
      });
      return res.status(200).json({error: false, notes: matchingNotes, message: "Notes retrieved successfully"});

  }catch (error) {
      return res.status(500).json({error:true, message: "Server error"});
  }

})
