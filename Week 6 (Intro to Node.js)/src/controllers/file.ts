import { IncomingMessage, ServerResponse } from "http";
import { promises as fs } from "fs";
import path from "path";
import { UrlWithParsedQuery } from "url";
import { sendError } from "../utils/errorHandler";

const messageFile = path.join(__dirname, "..", "..", "files", "message.txt");
const logFile = path.join(__dirname, "..", "..", "files", "log.txt");

export async function handleFileRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname, query } = parsedUrl;

    // Read File
    if (pathname === "/file" && req.method === "GET") {
        try {
            const data = await fs.readFile(messageFile, "utf-8");
            res.writeHead(200, { "content-type": "text/plain" });
            res.end(data);
        } catch {
            sendError(res, 400, "Could not read file");
            return true;
        }
        return true;
    }

    // Write File (append)
    if (pathname === "/write" && req.method === "GET") {
        const message = query.msg as string;
        if (!message) {
            sendError(res, 400, "Please provide ?msg=yourText");
            return true;
        }

        try {
            await fs.appendFile(logFile, message + "\n");
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: `Message saved: ${message}` }));
        } catch {
            sendError(res, 500, "Could not write to file");
        }
        return true;
    }

    return false;
}