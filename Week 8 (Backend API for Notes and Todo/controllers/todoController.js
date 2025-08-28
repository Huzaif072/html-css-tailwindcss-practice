import { Todo } from '../models/Todo.js';
import mongoose from 'mongoose';

export const todoController = {
    // GET /api/todos
    getAllTodos: async (req, res) => {
        try {
            const todos = await Todo.find();

            res.status(200).json({
                success: true,
                data: todos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching todos',
                error: error.message
            });
        }
    },

    // GET /api/todos/:id
    getTodoById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid todo ID'
                });
            }

            const todo = await Todo.findById(id);

            if (!todo) {
                return res.status(404).json({
                    success: false,
                    message: 'Todo not found'
                });
            }

            res.status(200).json({
                success: true,
                data: todo
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching todo',
                error: error.message
            });
        }
    },

    // POST /api/todos
    createTodo: async (req, res) => {
        try {
            const { title, description, priority, dueDate, category } = req.body;

            const todo = new Todo({
                title,
                description,
                priority,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                category
            });

            const savedTodo = await todo.save();

            res.status(201).json({
                success: true,
                message: 'Todo created successfully',
                data: savedTodo
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
                message: 'Error creating todo',
                error: error.message
            });
        }
    },

    // PUT /api/todos/:id
    updateTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, priority, dueDate, completed, category } = req.body;

            // Validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid todo ID'
                });
            }

            const updateData = { title, description, priority, category };

            if (dueDate) {
                updateData.dueDate = new Date(dueDate);
            }

            if (completed !== undefined) {
                updateData.completed = Boolean(completed);
                updateData.completedAt = Boolean(completed) ? new Date() : null;
            }

            const updatedTodo = await Todo.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedTodo) {
                return res.status(404).json({
                    success: false,
                    message: 'Todo not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Todo updated successfully',
                data: updatedTodo
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
                message: 'Error updating todo',
                error: error.message
            });
        }
    },

    // DELETE /api/todos
    deleteAllTodos: async (req, res) => {
        try {
            const result = await Todo.deleteMany({});

            res.status(200).json({
                success: true,
                message: 'All todos deleted successfully',
                deletedCount: result.deletedCount
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting all todos',
                error: error.message
            });
        }
    },

    // DELETE /api/todos/:id
    deleteTodo: async (req, res) => {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid todo ID'
                });
            }

            const deletedTodo = await Todo.findByIdAndDelete(id);

            if (!deletedTodo) {
                return res.status(404).json({
                    success: false,
                    message: 'Todo not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Todo deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting todo',
                error: error.message
            });
        }
    }
};