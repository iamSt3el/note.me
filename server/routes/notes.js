const express = require('express');
const Note = require('../models/Note');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add-note', authenticateToken, async (req, res) => {
  const {title, content, noteColor} = req.body;
  const note = await Note.create({
    title,
    content,
    color:noteColor,
    author: req.userInfo.id,
  });
  res.json(note);
});

router.get('/get-notes', authenticateToken, async (req, res) => {
  const notes = await Note.find({author: req.userInfo.id}).sort({createdAt: -1});
  res.json(notes);
});

router.put('/update-note:id', authenticateToken, async (req, res) => {
  const {id} = req.params;
  const {title, content, noteColor} = req.body;
  const note = await Note.findById(id);
  if (!note) return res.status(404).json({error: 'Note not found'});
  if (note.author.toString() !== req.userInfo.id) return res.status(403).json({error: 'Not authorized'});
  await Note.findByIdAndUpdate(id, {title, content, color:noteColor});
  res.json({message: 'Note updated successfully'});
});

router.delete('/delete-note:id', authenticateToken, async (req, res) => {
  const {id} = req.params;
  const note = await Note.findById(id);
  if (!note) return res.status(404).json({error: 'Note not found'});
  if (note.author.toString() !== req.userInfo.id) return res.status(403).json({error: 'Not authorized'});
  await Note.findByIdAndDelete(id);
  res.json({message: 'Note deleted successfully'});
});

module.exports = router;