import { Router } from "express";
import { transaction } from "../controllers/transaction.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const transactionRouter = Router();
transactionRouter.use(validateAuth);

transactionRouter.post("/nova-transacao/:tipo", transaction);

export default transactionRouter;