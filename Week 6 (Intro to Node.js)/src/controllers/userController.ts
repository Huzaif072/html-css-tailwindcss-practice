import { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { sendError } from "../utils/errorHandler";
import { readJsonFile, writeJsonFile } from "../utils/fileHelpers";

const usersPath = path.join(__dirname, "..", "..", "files", "users.json");

export async function createUser(req: IncomingMessage, res: ServerResponse) {
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
        }
    });
}

export async function getUsers(res: ServerResponse) {
    const users = await readJsonFile(usersPath, []);
    res.writeHead(200, { "content-type": "application/json" })
    res.end(JSON.stringify(users));
}

export async function getUser(res: ServerResponse, name: string) {
    const users = await readJsonFile(usersPath, []);
    const user = users.find((u: any) => u.name === name);

    if (!user) {
        sendError(res, 404, "User not found");
        return;
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(user));
}

export async function deleteUser(res: ServerResponse, name: String) {
    let users = await readJsonFile(usersPath, []);
    const filtered = users.filter((u: any) => u.name !== name);

    if (filtered.length === users.length) {
        sendError(res, 404, "User not found");
        return;
    }

    await writeJsonFile(usersPath, filtered);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: `User ${name} deleted` }));
}

export async function updateUser(req: IncomingMessage, res: ServerResponse, name: string) {
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", async () => {
        try {
            const updatedUser = JSON.parse(body);

            let users = await readJsonFile(usersPath, []);
            const index = users.findIndex((u: any) => u.name === name);

            if (index === -1) {
                sendError(res, 404, "User not found");
                return;
            }

            users[index] = { ...users[index], ...updatedUser };
            await writeJsonFile(usersPath, users);

            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: `User ${name} updated`, user: users[index] }));
        } catch {
            sendError(res, 400, "Invalid JSON");
        }
    });
}