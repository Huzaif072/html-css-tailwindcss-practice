import { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { sendError } from "../utils/errorHandler";
import { readJsonFile, writeJsonFile } from "../utils/fileHelpers";
import { UrlWithParsedQuery } from "url";

const usersPath = path.join(__dirname, "..", "..", "files", "users.json");

export async function handleUserRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname, query } = parsedUrl;

    if (pathname === "/write-user" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => (body += chunk.toString()));
        req.on("end", async () => {
            try {
                const user = JSON.parse(body);

                if (!user.name || !user.email) {
                    sendError(res, 400, "Missing required fields: name, email");
                    return;
                }

                const users = await readJsonFile(usersPath, []);
                users.push(user);
                await writeJsonFile(usersPath, users);

                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "User saved!", user }));
            } catch {
                sendError(res, 400, "Invalid JSON");
                return true;
            }
        });

        return true;
    }

    if (pathname === "/users" && req.method === "GET") {
        const users = await readJsonFile(usersPath, []);
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify(users));
        return true;
    }

    if (pathname === "/user" && req.method === "GET") {
        const name = query.name as string;
        if (!name) {
            sendError(res, 400, "Please provide ?name=Ali");
            return true;
        }

        const users = await readJsonFile(usersPath, []);
        const user = users.find((u: any) => u.name === name);

        if (!user) {
            sendError(res, 404, "User not found");
            return true;
        }

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(user));
        return true;
    }

    if (pathname === "/user" && req.method === "DELETE") {
        const name = query.name as string;

        if (!name) {
            sendError(res, 400, "Please provide ?name=Ali");
            return true;
        }

        let users = await readJsonFile(usersPath, []);
        const filtered = users.filter((u: any) => u.name !== name);

        if (filtered.length === users.length) {
            sendError(res, 404, "User not found");
            return true;
        }

        await writeJsonFile(usersPath, filtered);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: `User ${name} deleted` }));
        return true;
    }

    return false;
}