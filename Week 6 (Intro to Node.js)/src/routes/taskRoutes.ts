import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import { createTask, getTasks } from "../controllers/tasksController";


export async function handleTaskRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname } = parsedUrl;

    if (pathname === "/add-task" && req.method === "POST") {
        await createTask(req, res);
        return true;
    }

    if (pathname === "/tasks" && req.method === "GET") {
        await getTasks(res);
        return true;
    }

    return false;
}