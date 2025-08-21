import { Router } from "express";
import { readFileMessage, writeFileMessage } from "../controllers/fileController";

const router = Router();

router.get("/file", readFileMessage);
router.get("/write", writeFileMessage);

export default router;