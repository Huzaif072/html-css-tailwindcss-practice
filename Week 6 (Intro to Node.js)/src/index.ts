import http, { createServer } from "http";
import dotenv from "dotenv";
import { handleRoutes } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "Node App";

const server = createServer((req, res) => {
    handleRoutes(req, res);
});

server.listen(PORT, () => {
    console.log(`${APP_NAME} running at http://localhost:${PORT}`);
});