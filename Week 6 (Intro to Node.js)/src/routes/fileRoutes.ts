import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import { readFile, writeFile } from "../controllers/fileController";
import { sendError } from "../utils/errorHandler";

export async function handleFileRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname, query } = parsedUrl;

    // Read File
    if (pathname === "/file" && req.method === "GET") {
        await readFile(res);
        return true;
    }

    // Write File (append)
    if (pathname === "/write" && req.method === "GET") {
        const message = query.msg as string;
        if (!message) {
            sendError(res, 400, "Please provide ?msg=yourText");
            return true;
        }
        await writeFile(res, message);
        return true;
    }

    return false;
}