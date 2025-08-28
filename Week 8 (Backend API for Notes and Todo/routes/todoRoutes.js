import express from 'express';
import { todoController } from '../controllers/todoController.js';

const router = express.Router();

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/', todoController.deleteAllTodos);
router.delete('/:id', todoController.deleteTodo);

export default router;