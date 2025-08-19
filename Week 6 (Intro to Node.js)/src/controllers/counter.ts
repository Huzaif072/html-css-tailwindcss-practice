import { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { UrlWithParsedQuery } from "url";
import { sendError } from "../utils/errorHandler";

const countFile = path.join(__dirname, "..", "..", "files", "count.txt");

export async function handleCounterRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname } = parsedUrl;
    
    if (pathname === "/count" && req.method === "GET") {
        try {
            let count = 0;
            try {
                const data = await readFile(countFile, "utf-8");
                count = parseInt(data) || 0;
            } catch {
                count = 0;
            }

            count++;
            await writeFile(countFile, count.toString());

            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ count }));
        } catch (err) {
            sendError(res, 500, "Could not read/write count");
        }

        return true;
    }

    return false;
}