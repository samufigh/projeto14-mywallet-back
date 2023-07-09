import { Router } from "express";
import { showTransactions, transaction } from "../controllers/transaction.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validadeSchema } from "../middlewares/validateSchema.js";
import { schemaTransaction } from "../schemas/transaction.schemas.js";

const transactionRouter = Router();

transactionRouter.post("/nova-transacao/:tipo", validateAuth, validadeSchema(schemaTransaction), transaction);
transactionRouter.get("/home", validateAuth, showTransactions);

export default transactionRouter;