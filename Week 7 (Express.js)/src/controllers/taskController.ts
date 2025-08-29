import { Request, Response, NextFunction } from "express";
import path from "path";
import { readJsonFile, writeJsonFile } from "../utils/fileHelper";

const taskFile = path.join(__dirname, "..", "files", "tasks.json");

export const addTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, status, priority } = req.body;

        if (!title || !status || !priority) {
            return res.status(400).json({ error: "Missing required fields: title, status, priority" });
        }

        const tasks = await readJsonFile(taskFile, []);

        // assign unique id
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            status,
            priority
        };

        tasks.push(newTask);
        await writeJsonFile(taskFile, tasks);

        res.status(201).json({ message: "Task added", task: newTask });
    } catch (err) {
        next(err);
    }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await readJsonFile(taskFile, []);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const tasks = await readJsonFile(taskFile, []);

        const task = tasks.find((t: any) => String(t.id) === id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        let tasks = await readJsonFile(taskFile, []);
        const index = tasks.findIndex((t: any) => String(t.id) === id);

        if (index === -1) return res.status(404).json({ error: "Task not found" });

        tasks[index] = { ...tasks[index], ...updates };
        await writeJsonFile(taskFile, tasks);

        res.json({ message: `Task ${id} updated`, task: tasks[index] });
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        let tasks = await readJsonFile(taskFile, []);

        const filtered = tasks.filter((t: any) => String(t.id) !== id);
        if (filtered.length === tasks.length) {
            return res.status(404).json({ error: "Task not found" });
        }

        await writeJsonFile(taskFile, filtered);
        res.json({ message: `Task ${id} deleted` });
    } catch (err) {
        next(err);
    }
};