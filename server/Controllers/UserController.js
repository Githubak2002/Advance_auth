import { User } from "../models/userModel.js";
import errorHandler from "../utils/customError.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import randomstring from "randomstring";

// ===== Update user =====
export const UpdateController = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, false, "You can UPDATE only your account"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const UpdatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    // const {password, ...rest} = UpdatedUser;

    res.status(200).json("User Updated");
  } catch (error) {
    next(error);
  }
  // res.json({msg:"ok"}).send( hello)
};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "appylohar@gmail.com",
    pass: "aqml kqzt bsmu jnnh"
    ,
    // user: process.env.EMAILID,
    // pass: process.env.EMAILPASS,
  },
});

// Function to generate a 6-digit random OTP
function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

// Endpoint to send email with OTP to user on login
export const VerifyUserEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();

    const mailOptions = {
      from: process.env.EMAILID,
      to: email,
      subject: "Email Verification OTP",
      text: `Your 6-digit OTP for email verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          success:false,
          msg:"Error sending OTP"
        });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          success:false,
          msg:"OTP sent successfully"
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
