import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path, { parse } from "path";
import url from "url";

export function handleRoutes(req: IncomingMessage, res: ServerResponse) {
    if (!req.url) return;

    const parsedURL = url.parse(req.url, true);
    const pathname = parsedURL.pathname;
    const query = parsedURL.query;

    if(req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "plain/text" });
        res.end("Welcome to the home page");
    }

    else if (req.url === "/file" && req.method === "GET") {
        const filePath = path.join(__dirname, "files", "message.txt");
        try {
            const data = fs.readFileSync(filePath, "utf-8");
            res.writeHead(200, { "Content-Type": "plain/text" });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { "Content-Type": "plain/text" });
            res.end("Error reading file");
        }
    }

    else if (req.url === "/json" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Hello from JSON endpoint", success: true}));
    }

    else if (pathname === "/write" && req.method === "GET") {
        const message = query.msg as string;

        if(!message) {
            res.writeHead(400, { "Content-Type": "plain/text" });
            res.end("Please provide a message using ?msg=yourText");
            return;
        }

        const logPath = path.join(__dirname, "files", "log.txt");

        fs.appendFile(logPath, message + "\n", (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "plain/text" });
                res.end("Error writing to file");
            }
            else {
                res.writeHead(200, { "Content-Type": "plain/text" });
                res.end(`Message saved: "${message}"`);
            }
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "plain/text" });
        res.end("404 not found");
    }
}