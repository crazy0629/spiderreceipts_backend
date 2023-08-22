import { Router } from "express";
import * as auth from "../controllers/auth.controller";

/**
 * Router
 * Using Passport
 */
const router = Router();

// Authentication
router.post("/auth/signup", auth.SignUp);

export default router;
