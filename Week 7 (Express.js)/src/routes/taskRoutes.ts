import { Router } from "express";
import { addTask, getTasks } from "../controllers/taskController";

const router = Router();

router.post("/add-task", addTask);
router.get("/tasks", getTasks);

export default router;