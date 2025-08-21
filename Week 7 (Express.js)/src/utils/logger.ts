import { appendFile } from "fs/promises";
import path from "path";
import { Request, Response, NextFunction } from "express";

const logFile = path.join(__dirname, "..", "..", "files", "requests.log");

export async function logRequest(method?: string, url?: string) {
    const timeStamp = new Date().toISOString();
    const logLine = `[${timeStamp}] ${method} ${url}\n`;

    console.log(logLine.trim());

    try {
        await appendFile(logFile, logLine);
    } catch (err) {
        console.error("Failed to log request to file:", err);
    }
}

export function requestLogger(req: Request, _res: Response, next: NextFunction) {
    logRequest(req.method, req.originalUrl);
    next();
}