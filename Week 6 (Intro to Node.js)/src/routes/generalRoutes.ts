import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import { home, greeting, favicon } from "../controllers/generalController";

export async function handleGeneralRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname } = parsedUrl;

    // Home route
    if (pathname === "/" && req.method === "GET") {
        home(res);
        return true;
    }

    // Greeting with environment variables
    if (pathname === "/greeting" && req.method === "GET") {
        greeting(res);
        return true;
    }

    // Ignore favicon
    if (pathname === "/favicon.ico") {
        favicon(res);
        return true;
    }

    return false;
}