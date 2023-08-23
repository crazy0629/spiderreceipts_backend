import { Router } from "express";
import * as auth from "../controllers/auth.controller";

/**
 * Router
 * Using Passport
 */
const router = Router();

// Authentication
router.post("/auth/signup", auth.SignUp);
router.post("/auth/signin", auth.SignIn);
export default router;
