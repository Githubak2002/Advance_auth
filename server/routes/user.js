import express from "express";
import ForgotPassController from "../Controllers/ForgotPass.js";
import ResetPassController from "../Controllers/ResetPass.js";
import {
  OTPVerifyUserEmailController,
  UpdateController,
} from "../Controllers/UserController.js";
import { verifyingToken } from "../Middlewares/verifyToken.js";

const router = express.Router();

// ========= Updating a user =========
router.post("/update/:id", verifyingToken, UpdateController);

// ========= Verifing User Email =========
router.post("/verifiy", verifyingToken, OTPVerifyUserEmailController);

// ========= Forgot Password =========
router.post("/forgotPass", ForgotPassController);

// ========= reset Password =========
router.post("/resetPass/:token", ResetPassController);

// router.get("/logout", async (req, res) => {

// });

export { router as UserRoute };
