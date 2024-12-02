import { Router } from "express";
import { login, logout, register } from "../controllers/authController";
const authRouter = Router();
authRouter.post("/register", register as any);
authRouter.post("/login", login as any);
authRouter.post("/logout", logout as any);
export default authRouter;
