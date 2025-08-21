import { Request, Response } from "express";
import path from "path";
import { promises as fs } from "fs";
import { sendError } from "../utils/errorHandler";

const messageFile = path.join(__dirname, "..", "files", "message.txt");
const logFile = path.join(__dirname, "..", "files", "log.txt");

export async function readFileMessage(req: Request, res: Response) {
    try {
        const data = await fs.readFile(messageFile, "utf-8");
        res.type("text/plain").send(data);
    } catch {
        sendError(res, 400, "Could not read file");
    }
}

export async function writeFileMessage(req: Request, res: Response) {
    const message = req.query.msg as string;
    if(!message) {
        return sendError(res, 400, "Please provide ?msg=yourText");
    }

    try {
        await fs.appendFile(logFile, message + "\n");
        res.json({ message: `Message saved: ${message}` });
    } catch {
        sendError(res, 500, "Could not write to file");
    }
}