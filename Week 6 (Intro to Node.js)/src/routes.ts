import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { sendError } from "./utils/errorHandler";

import { handleGeneralRoutes } from "./controllers/general";
import { handleUserRoutes } from "./controllers/users";
import { handleTaskRoutes } from "./controllers/tasks";
import { handleFileRoutes } from "./controllers/file";
import { handleCounterRoutes } from "./controllers/counter";
import { logRequest } from "./utils/logger";

export async function handleRoutes(req: IncomingMessage, res: ServerResponse) {
    const parsedUrl = parse(req.url || "", true);

    await logRequest(req.method, req.url);

    // 1. General Routes
    const generalHandled = await handleGeneralRoutes(req, res, parsedUrl);
    if (generalHandled) return;

    // 2. File Routes
    const fileHandled = await handleFileRoutes(req, res, parsedUrl);
    if (fileHandled) return;

    // 3. Counter Routes
    const counterHandled = await handleCounterRoutes(req, res, parsedUrl);
    if (counterHandled) return;

    // 4. User Routes
    const userHandled = await handleUserRoutes(req, res, parsedUrl);
    if (userHandled) return;

    // 5. Task Routes
    const taskHandled = await handleTaskRoutes(req, res, parsedUrl);
    if (taskHandled)  return;

    sendError(res, 404, "Route not found");
}