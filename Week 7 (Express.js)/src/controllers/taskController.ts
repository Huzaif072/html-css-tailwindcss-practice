import { Request, Response } from "express";
import path from "path";
import { sendError } from "../utils/errorHandler";
import { readJsonFile, writeJsonFile } from "../utils/fileHelper";

const taskFile = path.join(__dirname, "..", "files", "tasks.json");

export async function addTask(req: Request, res: Response) {
    const task = req.body;

    if(!task.title || !task.status || !task.priority) {
        return sendError(res, 400, "Missing required fields: title, status, priority");
    }

    const tasks = await readJsonFile(taskFile, []);
    tasks.push(task);
    await readJsonFile(taskFile, tasks);

    res.status(201).json({ message: "Task added", task });
}

export async function getTasks(req: Request, res: Response) {
    const tasks = await readJsonFile(taskFile, []);
    res.json(tasks);
}
