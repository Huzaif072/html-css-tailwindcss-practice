import { Router } from "express";
import { incrementCounter } from "../controllers/counterController";

const router = Router();

router.get("/count", incrementCounter);

export default router;