import { Request, Response, NextFunction } from "express";

export const home = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.type("text/plain").send("Hello Node!");
    } catch (err) {
        next(err);
    }
}

export const greeting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = process.env.NAME || "Guest";
        res.json({ greeting: `Hello, ${name} `});
    } catch (err) {
        next(err);
    }
}