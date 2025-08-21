import { Request, Response } from "express";
import path from "path";
import { promises as fs, read } from "fs";
import { sendError } from "../utils/errorHandler";

const countFile = path.join(__dirname, "..", "files", "count.txt");

export async function incrementCounter(req: Request, res: Response) {
    try {
        let count = 0;
        try {
            const data = await fs.readFile(countFile, "utf-8");
            count = parseInt(data) || 0;
        } catch {
            count = 0;
        }

        count++;
        await fs.writeFile(countFile, count.toString());

        res.json({ count });
    } catch {
        sendError(res, 500, "Could not read/write count");
    }
}