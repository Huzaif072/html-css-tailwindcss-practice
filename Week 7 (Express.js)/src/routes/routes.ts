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
router.post("/add-task", taskController.addTask);
router.get("/tasks", taskController.getTasks);

// USER ROUTES
router.post("/write-user", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/user", userController.getUser);
router.delete("/user", userController.deleteUser);
router.put("/user", userController.updateUser);

export default router;