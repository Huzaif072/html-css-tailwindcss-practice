import { Note } from '../models/Note.js';
import mongoose from 'mongoose';

export const noteController = {
  // GET /api/notes
  getAllNotes: async (req, res) => {
    try {
      const notes = await Note.find();

      res.status(200).json({
        success: true,
        data: notes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching notes',
        error: error.message
      });
    }
  },

  // GET /api/notes/:id
  getNoteById: async (req, res) => {
    try {
      const { id } = req.params;

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid note ID'
        });
      }

      const note = await Note.findById(id);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.status(200).json({
        success: true,
        data: note
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching note',
        error: error.message
      });
    }
  },

  // POST /api/notes
  createNote: async (req, res) => {
    try {
      const { title, content, tags } = req.body;

      const note = new Note({
        title,
        content,
        tags
      });

      const savedNote = await note.save();

      res.status(201).json({
        success: true,
        message: 'Note created successfully',
        data: savedNote
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error creating note',
        error: error.message
      });
    }
  },

  // PUT /api/notes/:id
  updateNote: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, tags } = req.body;

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid note ID'
        });
      }

      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, content, tags },
        { new: true, runValidators: true }
      );

      if (!updatedNote) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Note updated successfully',
        data: updatedNote
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error updating note',
        error: error.message
      });
    }
  },

  // DELETE /api/notes
  deleteAllNotes: async (req, res) => {
    try {
      const result = await Note.deleteMany({});

      res.status(200).json({
        success: true,
        message: 'All notes deleted successfully',
        deletedCount: result.deletedCount
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting all notes',
        error: error.message
      });
    }
  },

  // DELETE /api/notes/:id
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid note ID'
        });
      }

      const deletedNote = await Note.findByIdAndDelete(id);

      if (!deletedNote) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Note deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting note',
        error: error.message
      });
    }
  }
};