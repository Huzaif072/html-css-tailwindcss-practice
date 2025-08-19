import http from "http";
import dotenv from "dotenv";
import { handleRoutes } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    handleRoutes(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});