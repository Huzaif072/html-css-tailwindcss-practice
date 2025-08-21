import { Router } from "express";
import { createUser, getUsers, getUser, deleteUser, updateUser } from "../controllers/userController";

const router = Router();

router.post("/write-user", createUser);
router.get("/users", getUsers);
router.get("/user", getUser);
router.delete("/user", deleteUser);
router.put("/user", updateUser);

export default router;