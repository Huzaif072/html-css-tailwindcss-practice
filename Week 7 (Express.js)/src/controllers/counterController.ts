import { Request, Response, NextFunction } from "express";
import path from "path";
import { promises as fs } from "fs";

const countFile = path.join(__dirname, "..", "files", "count.txt");

export const incrementCounter = async (req: Request, res: Response, next: NextFunction) => {
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
    } catch(err) {
        next(err);
    }
}