import { Router } from "express";
import { signup, signin } from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.post("/cadastro", signup);
userRouter.post("/login", signin);

export default userRouter;