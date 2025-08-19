import { Router, Request, Response } from "express";

export const handleGeneralRoutes = Router();

handleGeneralRoutes.get("/", (req: Request, res: Response) => {
    res.send("Hello Node!");
});

handleGeneralRoutes.get("/greeting", (req: Request, res: Response) => {
    const name = process.env.NAME || "Guest";
    res.json({ greeting: `Hello, ${name}`});
});