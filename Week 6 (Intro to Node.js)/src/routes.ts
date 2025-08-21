import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { sendError } from "./utils/errorHandler";

import { handleGeneralRoutes } from "./routes/generalRoutes";
import { handleUserRoutes } from "./routes/userRoutes";
import { handleTaskRoutes } from "./routes/taskRoutes";
import { handleFileRoutes } from "./routes/fileRoutes";
import { handleCounterRoutes } from "./routes/counterRoutes";

import { logRequest } from "./utils/logger";

export async function handleRoutes(req: IncomingMessage, res: ServerResponse) {
    const parsedUrl = parse(req.url || "", true);

    await logRequest(req.method, req.url);

    if (await handleGeneralRoutes(req, res, parsedUrl)) return;

    if (await handleFileRoutes(req, res, parsedUrl)) return;

    if (await handleCounterRoutes(req, res, parsedUrl)) return;

    if (await handleUserRoutes(req, res, parsedUrl)) return;

    if (await handleTaskRoutes(req, res, parsedUrl)) return;

    sendError(res, 404, "Route not found");
}