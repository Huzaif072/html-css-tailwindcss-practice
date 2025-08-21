import { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { sendError } from "../utils/errorHandler";
import { readJsonFile, writeJsonFile } from "../utils/fileHelpers";

const tasksFile = path.join(__dirname, "..", "..", "files", "tasks.json");

export async function createTask(req: IncomingMessage, res: ServerResponse) {
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", async () => {
        try {
            const task = JSON.parse(body);

            if (!task.title || !task.status || !task.priority) {
                sendError(res, 400, "Missing required fields: title, status, priority");
                return;
            }

            const tasks = await readJsonFile(tasksFile, []);
            tasks.push(task);
            await writeJsonFile(tasksFile, tasks);

            res.writeHead(201, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "Task added", task }));
        } catch {
            sendError(res, 400, "Invalid JSON");
            return true;
        }
    });
}

export async function getTasks(res: ServerResponse) {
    const tasks = await readJsonFile(tasksFile, []);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(tasks));
}