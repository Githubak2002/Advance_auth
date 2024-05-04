import express from "express";
import { SignUpController,LoginController } from "../Controllers/AuthController.js";


const router = express.Router();

// ===== register a new user =========
router.post("/signup", SignUpController);
router.post("/login", LoginController);

// ===== login an existing user ========= JWT
// router.post("/login", LoginController);

// ====== Forgot Password =========
// router.post("/forgotPass", ForgotPassController);

// ====== reset Password =========
// router.post("/resetPass/:token", ResetPassController);


// router.get("/logout",LogoutController);

// router.get("/logout", async (req, res) => {
  
// });

export { router as AuthRoute };
