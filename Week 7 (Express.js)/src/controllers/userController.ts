import { Request, Response, NextFunction } from "express";
import path from "path";
import { readJsonFile, writeJsonFile } from "../utils/fileHelper";

const usersPath = path.join(__dirname, "..", "..", "files", "users.json");

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;

        if (!user.name || !user.email) {
            return res.status(400).json({ error: "Missing required fields: name, email" });
        }

        const users = await readJsonFile(usersPath, []);
        
        const existingUser = users.find((u: any) => u.name === user.name);
        if(existingUser) {
            return res.status(409).json({ error: "User with this name already exists" });
        }

        users.push(user);
        await writeJsonFile(usersPath, users);

        res.status(201).json({ message: "User saved!", user });
    } catch (err) {
        next(err);
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await readJsonFile(usersPath, []);
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.query.name as string;
        if (!name) return res.status(400).json({ error: "Please provide ?name=userName" });

        const users = await readJsonFile(usersPath, []);
        const user = users.find((u: any) => u.name === name);

        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.query.name as string;
        if (!name) return res.status(400).json({ error: "Please provide ?name=userName" });

        let users = await readJsonFile(usersPath, []);
        const filtered = users.filter((u: any) => u.name !== name);

        if (filtered.length === users.length) {
            return res.status(404).json({ error: "User not found" });
        }

        await writeJsonFile(usersPath, filtered);
        res.json({ message: `User ${name} deleted` });
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.query.name as string;
        const updatedUser = req.body;

        if (!name) return res.status(400).json({ error: "Please provide ?name=ExistingName to update" });

        let users = await readJsonFile(usersPath, []);
        const index = users.findIndex((u: any) => u.name === name);

        if (index === -1) return res.status(404).json({ error: "User not found" });

        users[index] = { ...users[index], ...updatedUser };
        await writeJsonFile(usersPath, users);
        res.json({ message: `User ${name} updated`, user: users[index] });
    } catch (err) {
        next(err);
    }
}
