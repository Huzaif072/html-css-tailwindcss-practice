import { Request, Response, NextFunction } from "express";
import path from "path";
import { readJsonFile, writeJsonFile } from "../utils/fileHelper";

const taskFile = path.join(__dirname, "..", "..", "files", "tasks.json");

export const addTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = req.body;

        if (!task.title || !task.status || !task.priority) {
            return res.status(400).json({ error: "Missing required fields: title, status, priority" });
        }

        const tasks = await readJsonFile(taskFile, []);
        tasks.push(task);
        await writeJsonFile(taskFile, tasks);

        res.status(201).json({ message: "Task added", task });
    } catch (err) {
        next(err);
    }    
}

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await readJsonFile(taskFile, []);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
}
