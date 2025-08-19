import { Router, Request, Response } from "express";
import path from "path";
import { promises as fs, readFile } from "fs";
import { sendError } from "../utils/errorHandler";

const messageFile = path.join(__dirname, "..", "..", "files", "message.txt");
const logFile = path.join(__dirname, "..", "..", "files", "log.txt");

export const handleFileRoutes = Router();

handleFileRoutes.get("/file", async (req: Request, res: Response) => {
    try {
        const data = await fs.readFile(messageFile, "utf-8");
        res.send(data);
    } catch {
        sendError(res, 400, "Could not read file");
    }
});

handleFileRoutes.get("/write", async (req: Request, res: Response) => {
    const message = req.query.msg as string;
    if(!message) return sendError(res, 400, "Please provide ?msg=yourText");

    try {
        await fs.appendFile(logFile, message + "\n");
        res.json({ message: `Message saved: ${message}` });
    } catch {
        sendError(res, 500, "Could not write to file");
    }
});