import { Router } from "express";
import { loginUser } from "../controllers/login.controller.js";

export const loginRouter = Router();

loginRouter.post('/api/login', loginUser);

