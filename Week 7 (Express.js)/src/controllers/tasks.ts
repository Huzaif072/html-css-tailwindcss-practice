import { Router, Request, Response } from "express";
import path from "path";
import { readJsonFile, writeJsonFile } from "../utils/fileHelpers";
import { sendError } from "../utils/errorHandler";

const tasksFile = path.join(__dirname, "..", "..", "files", "tasks.json");
export const handleTaskRoutes = Router();

// Add task
handleTaskRoutes.post("/add-task", async (req: Request, res: Response) => {
    try {
        const task = req.body;
        const tasks = await readJsonFile(tasksFile, []);
        tasks.push(task);
        await writeJsonFile(tasksFile, tasks);
        res.status(201).json({ message: "Task added", task });
    } catch {
        sendError(res, 400, "Invalid JSON");
    }
});

// Get all tasks
handleTaskRoutes.get("/tasks", async (req: Request, res: Response) => {
    let tasks = await readJsonFile(tasksFile, []);
    res.json(tasks);
});
