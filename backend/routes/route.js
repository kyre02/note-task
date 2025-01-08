import express from 'express';
import { signup, verifyEmail, login, logout, forgotPassword, resetPassword, checkAuth, validateResetToken, getUser } from '../controllers/user.controller.js';
import {verifyToken} from "../utilities/verifyToken.js";
import {addNote, editNote, showNotes, deleteNote, pinNote, searchNotes} from "../controllers/note.controller.js";

const router = express.Router();

//user
router.post("/signup", signup);
router.post("/login", login)
router.post("/logout", logout)
router.get('/get-user', verifyToken, getUser)

router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token" , resetPassword)

router.get("/check-auth", verifyToken, checkAuth)
router.get('/validate-reset-token/:token', validateResetToken);

//Note
router.post("/add-note", verifyToken, addNote);
router.put("/edit-note/:noteId", verifyToken, editNote);
router.get('/show-notes', verifyToken, showNotes);
router.delete("/delete-note/:noteId", verifyToken, deleteNote )
router.put("/pin-note/:noteId", verifyToken, pinNote)
router.get("/search-note", verifyToken, searchNotes)

export default router; 