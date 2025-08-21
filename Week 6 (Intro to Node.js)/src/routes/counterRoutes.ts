import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import { incrementCounter } from "../controllers/counterController";

export async function handleCounterRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname } = parsedUrl;

    if (pathname === "/count" && req.method === "GET") {
        await incrementCounter(res);
        return true;
    }

    return false;
}