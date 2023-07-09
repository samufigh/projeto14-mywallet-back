import { Router } from "express";
import { signup, signin } from "../controllers/users.controllers.js";
import { validadeSchema } from "../middlewares/validateSchema.js";
import { schemaSignin, schemaSignup } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/cadastro", validadeSchema(schemaSignup), signup);
userRouter.post("/", validadeSchema(schemaSignin), signin);

export default userRouter;