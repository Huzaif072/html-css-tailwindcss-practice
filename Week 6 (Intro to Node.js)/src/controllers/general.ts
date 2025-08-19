import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";

export async function handleGeneralRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname } = parsedUrl;

    // Home route
    if (pathname === "/" && req.method === "GET") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Hello Node!");
        return true;
    }

    // Greeting with environment variables
    if (pathname === "/greeting" && req.method === "GET") {
        const name = process.env.NAME || "Guest";
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ greeting: `Hello, ${name}` }));
        return true;
    }

    // Ignore favicon
    if (pathname === "/favicon.ico") {
        res.writeHead(204);
        res.end();  
        return true;
    }

    return false;
}