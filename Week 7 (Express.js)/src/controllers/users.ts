import { Router, Request, Response } from "express";
import path from "path";
import { readJsonFile, writeJsonFile } from "../utils/fileHelpers";
import { sendError } from "../utils/errorHandler";

const usersPath = path.join(__dirname, "..", "..", "files", "users.json");
export const handleUserRoutes = Router();

// Add user
handleUserRoutes.post("/write-user", async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const users = await readJsonFile(usersPath, []);
        users.push(user);
        await writeJsonFile(usersPath, users);
        res.status(201).json({ message: "User saved!", user });
    } catch {
        sendError(res, 400, "Invalid JSON");
    }
});

// Get all users
handleUserRoutes.get("/users", async (req: Request, res: Response) => {
    const users = await readJsonFile(usersPath, []);
    res.json(users);
});

handleUserRoutes.get("/user", async (req: Request, res: Response) => {
    const name = req.query.name as string;
    if(!name) return sendError(res, 400, "Please provide ?name=Ali");

    const users = await readJsonFile(usersPath, []);
    const user = users.find((u: any) => u.name === name);
    if(!user) return sendError(res, 404, "User not found");

    res.json(user);
});

handleUserRoutes.delete("/user", async (req: Request, res: Response) => {
    const name = req.query.name as string;
    if(!name) return sendError(res, 400, "Please provide ?name=Ali");
    
    let users = await readJsonFile(usersPath, []);
    const filtered = users.filter((u: any) => u.name !== name);
    if(filtered.length === users.length) return sendError(res, 404, "User not found");

    await writeJsonFile(usersPath, filtered);
    res.json({ message: `User ${name} deleted` });
});