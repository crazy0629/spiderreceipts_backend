import { Router } from "express";
import * as auth from "../controllers/auth.controller";
import * as account from "../controllers/account.controller";

/**
 * Router
 * Using Passport
 */
const router = Router();

// Authentication
router.post("/auth/signup", auth.signUp);
router.post("/auth/signin", auth.signIn);
router.post("/charge", account.purchaseLicese);

export default router;
