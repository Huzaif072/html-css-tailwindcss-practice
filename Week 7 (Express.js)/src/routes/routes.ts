import express from 'express';
import * as generalController from '../controllers/generalController';
import * as counterController from "../controllers/counterController";
import * as fileController from "../controllers/fileController";
import * as taskController from "../controllers/taskController";
import * as userController from "../controllers/userController";

const router = express.Router();

// GENERAL ROUTES
router.get("/", generalController.home);
router.get("/greeting", generalController.greeting);

// COUNTER ROUTES
router.get("/count", counterController.incrementCounter);

// FILE ROUTES
router.get("/file", fileController.readFileMessage);``
router.get("/write", fileController.writeFileMessage);

// TASK ROUTES
router.get("/tasks", taskController.getTasks);
router.post("/tasks", taskController.addTask);
router.get("/tasks/:id", taskController.getTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

// USER ROUTES
router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id", userController.updateUser);

export default router;