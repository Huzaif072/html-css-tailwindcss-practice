import { ServerResponse } from "http";
import { promises as fs } from "fs";
import path from "path";
import { sendError } from "../utils/errorHandler";

const messageFile = path.join(__dirname, "..", "..", "files", "message.txt");
const logFile = path.join(__dirname, "..", "..", "files", "log.txt");

export async function readFile(res: ServerResponse) {
    try {
        const data = await fs.readFile(messageFile, "utf-8");
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(data);
    } catch {
        sendError(res, 400, "Could not read file");
        return true;
    }
}

export async function writeFile(res: ServerResponse, message: string) {
    try {
        await fs.appendFile(logFile, message + "\n");
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: `Message saved: ${message}` }));
    } catch {
        sendError(res, 500, "Could not write to file");
    }
}