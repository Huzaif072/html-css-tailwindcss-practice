import { Router, Request, Response } from "express";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { sendError } from "../utils/errorHandler";

const countFile = path.join(__dirname, "..", "..", "files", "count.txt");
export const handleCounterRoutes = Router();

handleCounterRoutes.get("/count", async (req: Request, res: Response) => {
    try {
        let count = 0;
        try {
            const data = await readFile(countFile, "utf-8");
            count = parseInt(data) || 0;
        } catch { count = 0; }

        count++;
        await writeFile(countFile, count.toString());
        res.json({ count });
    } catch {
        sendError(res, 500, "Could not read/write count");
    }
});