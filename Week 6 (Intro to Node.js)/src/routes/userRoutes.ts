import { get, IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import { sendError } from "../utils/errorHandler";
import { createUser, getUsers, getUser, deleteUser, updateUser } from "../controllers/userController";

export async function handleUserRoutes(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) {
    const { pathname, query } = parsedUrl;

    if (pathname === "/write-user" && req.method === "POST") {
        await createUser(req, res);
        return true;
    }

    if (pathname === "/users" && req.method === "GET") {
        await getUsers(res);
        return true;
    }

    if (pathname === "/user" && req.method === "GET") {
        const name = query.name as string;
        if (!name) {
            sendError(res, 400, "Please provide ?name=Ali");
            return true;
        }
        await getUser(res, name);
        return true;
    }

    if (pathname === "/user" && req.method === "DELETE") {
        const name = query.name as string;
        if (!name) {
            sendError(res, 400, "Please provide ?name=Ali");
            return true;
        }
        await deleteUser(res, name);
        return true;
    }

    if (pathname === "/user" && req.method === "PUT") {
        const name = query.name as string;
        if (!name) {
            sendError(res, 400, "Please provide ?name=ExistingName to update");
            return true;
        }
        await updateUser(req, res, name);
        return true;
    }

    return false;
}