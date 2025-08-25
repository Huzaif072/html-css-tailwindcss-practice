import { Request, Response, NextFunction } from "express";
import path from "path";
import { promises as fs } from "fs";

const messageFile = path.join(__dirname, "..", "..", "files", "message.txt");
const logFile = path.join(__dirname, "..", "..", "files", "log.txt");

export const readFileMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await fs.readFile(messageFile, "utf-8");
        res.type("text/plain").send(data);
    } catch (err) {
        next(err)
    }
}

export const writeFileMessage = async (req: Request, res: Response, next: NextFunction) => {
    const message = req.query.msg as string;
    if(!message) {
        return res.status(400).json({ error: "Please provide ?msg=yourText" });
    }

    try {
        await fs.appendFile(logFile, message + "\n");
        res.json({ message: `Message saved: ${message}` });
    } catch (err) {
        next(err);
    }
}