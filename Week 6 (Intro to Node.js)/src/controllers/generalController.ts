import { ServerResponse } from "http";

export function home(res: ServerResponse) {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hello Node!");
}

export function greeting(res: ServerResponse) {
    const name = process.env.NAME || "Guest";
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ greeting: `Hello, ${name}` }));
}

export function favicon(res: ServerResponse) {
    res.writeHead(204);
    res.end();
}