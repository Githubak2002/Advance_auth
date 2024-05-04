import express from "express";
import { SignUpController,LoginController,LogoutController } from "../Controllers/AuthController.js";

const router = express.Router();

// ===== register a new user =========
router.post("/signup", SignUpController);

// ===== login an existing user with JWT token ========= 
router.post("/login", LoginController);

// ====== LogOut user =========
router.get("/logout", LogoutController);


// ====== Forgot Password =========
// router.post("/forgotPass", ForgotPassController);

// ====== reset Password =========
// router.post("/resetPass/:token", ResetPassController);



export { router as AuthRoute };
