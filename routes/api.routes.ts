import { Router } from "express";
import * as auth from "../controllers/auth.controller";
import * as admin from "../controllers/admin.controller";
import * as account from "../controllers/account.controller";
import * as mail from "../controllers/mail.controller";
/**
 * Router
 * Using Passport
 */
const router = Router();

// Authentication

router.post("/auth/signup", auth.signUp);
router.post("/auth/signin", auth.signIn);
router.post("/auth/resendVeriEmail", auth.resendVeriEmail);
router.post("/auth/checkEmailVerified", auth.checkEmailVerified);
// Admin Action

router.post("/admin/getAllUser", admin.getAllUser);
router.post("/admin/removeUser", admin.removeUser);
router.post("/admin/editUser", admin.editUser);

// Account Activate / Stripe

router.post("/charge", account.activateAccount);

// Sending Mail Action

router.post("/sendEmail", mail.sendEmail);

export default router;
