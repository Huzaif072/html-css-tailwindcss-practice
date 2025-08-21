import { Request, Response } from "express";

export function home(req: Request, res: Response) {
    res.type("text/plain").send("Hello Node!");
}

export function greeting (req: Request, res: Response) {
    const name = process.env.NAME || "Guest";
    res.json({ greeting: `Hello, ${name} `});
}