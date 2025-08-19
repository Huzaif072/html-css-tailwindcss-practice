import { ServerResponse } from "http";

export function sendError(res: ServerResponse, status: number, message: string) {
    res.writeHead(status, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: message}));
}