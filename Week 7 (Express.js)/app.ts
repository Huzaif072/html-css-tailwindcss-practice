import express from "express";

import { handleGeneralRoutes } from "./src/controllers/general";
import { handleUserRoutes } from "./src/controllers/users";
import { handleTaskRoutes } from "./src/controllers/tasks";
import { handleFileRoutes } from "./src/controllers/file";
import { handleCounterRoutes } from "./src/controllers/counter";

const app = express();
app.use(express.json());

app.use(handleGeneralRoutes);
app.use(handleFileRoutes);
app.use(handleUserRoutes);
app.use(handleTaskRoutes);
app.use(handleCounterRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));