import { appendFile } from "fs/promises";
import path from "path";

const logFile = path.join(__dirname, "..", "..", "files", "requests.log");

export async function logRequest(method: string | undefined, url: string | undefined) {
    const timeStamp = new Date().toISOString();
    const logLine = `[${timeStamp}] ${method} ${url}\n`;

    console.log(logLine.trim());

    try {
        await appendFile(logFile, logLine);
    } catch (err) {
        console.error("Failed to log request to file:", err);
    }
}