import { Request, Response } from "express";
import path from "path";
import { sendError } from "../utils/errorHandler";
import { readJsonFile, writeJsonFile } from "../utils/fileHelper";

const usersPath = path.join(__dirname, "..", "files", "users.json");

export async function createUser(req: Request, res: Response) {
    const user = req.body;

    if (!user.name || !user.email) {
        return sendError(res, 400, "Missing required fields: name, email");
    }

    const users = await readJsonFile(usersPath, []);
    users.push(user);
    await writeJsonFile(usersPath, user);

    res.status(201).json({ message: "User saved!", user });
}

export async function getUsers(req: Request, res: Response) {
    const users = await readJsonFile(usersPath, []);
    res.json(users);
}

export async function getUser(req: Request, res: Response) {
    const name = req.query.name as string;
    if (!name) return sendError(res, 400, "Please provide ?name=Ali");

    const users = await readJsonFile(usersPath, []);
    const user = users.find((u: any) => u.name === name);

    if (!user) return sendError(res, 404, "User not found");
    res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
    const name = req.query.name as string;
    if(!name) return sendError(res, 400, "Please provide ?name=Ali");

    let users = await readJsonFile(usersPath, []);
    const filtered = users.filter((u: any) => u.name !== name);

    if(filtered.length === users.length) {
        return sendError(res, 404, "User not found");
    }

    await writeJsonFile(usersPath, filtered);
    res.json({ message: `User ${name} deleted` });
}

export async function updateUser(req: Request, res: Response) {
    const name = req.query.name as string;
    const updatedUser = req.body;

    if(!name) return sendError(res, 400, "Please provide ?name=ExistingName to update");

    let users = await readJsonFile(usersPath, []);
    const index = users.findIndex((u: any) => u.name === name);

    if (index === -1) return sendError(res, 404, "User not found");

    users[index] = { ...users[index], ...updatedUser };
    await writeJsonFile(usersPath, users);
    res.json({ message: `User ${name} updated`, user: users[index] });
}
