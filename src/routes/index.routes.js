import { Router } from "express";
import userRouter from "./users.routes.js";
import transactionRouter from "./transaction.routes.js";

const router = Router();

router.use(userRouter);
router.use(transactionRouter);

export default router;