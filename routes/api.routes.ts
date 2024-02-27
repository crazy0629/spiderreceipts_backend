import { Router } from "express";
import * as auth from "../controllers/auth.controller";
import * as admin from "../controllers/admin.controller";
import * as account from "../controllers/account.controller";
import * as mail from "../controllers/mail.controller";
import * as payment from "../controllers/payment.controller";

/**
 * Router
 * Using Passport
 */
const router = Router();

// Authentication

router.post("/auth/signup", auth.signUp);
router.post("/auth/signin", auth.signIn);
router.post("/auth/forgotPassword", auth.forgotPassword);
router.post("/auth/resetPassword", auth.resetPassword);

// Admin Action

router.post("/admin/getAllUser", admin.getAllUser);
router.post("/admin/removeUser", admin.removeUser);
router.post("/admin/editUser", admin.editUser);

// Account
router.post("/activate", account.activateAccount);
router.post("/single", account.addOrder);
router.get("/single", account.getAllOrder);

router.get("/addmember/:email", auth.addMember);

// Update a listing by ID
router.put('/single/:id', account.updateOrder);

// Sending Mail Action

router.post("/sendEmail", mail.sendEmail);

// Payment
router.post("/payment", payment.sendMoney);

export default router;
