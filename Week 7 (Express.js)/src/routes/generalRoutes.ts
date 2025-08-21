import { Router } from "express";
import { home, greeting } from "../controllers/generalController";

const router = Router();

router.get("/", home);
router.get("/greeting", greeting);

export default router;