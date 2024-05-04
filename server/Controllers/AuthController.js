import { User as UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import errorHandler from "../utils/customError.js";

/**  ======= Register/Sign up a new user ======= */
export const SignUpController = async (req,res,next) => {
  // console.log("req.cookies - ", req.cookies)
  try {
    const { userName, email, password } = req.body;
    const userEmail = await UserModel.findOne({ email });
    const userNaam = await UserModel.findOne({ userName });
    if (userEmail) {
      return next(errorHandler(409,false,"User with this Email already exists!")) ;
      // ====== OR ======
      // return res.status(400).json({
      //   status: false,
      //   msg: "User with this Email already exists",
      // });
    }

    if(userNaam)
      return next(errorHandler(409,false,"This User Name already exists!")) ;

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      userName,
      email,
      password: hashPass,
    });

    await newUser.save();

    return res.status(200).json({
      status: true,
      msg: "User Registered",
      newUser,
    });
  } 
  catch(err){
    next(err);
  }
  
  // catch (err) {
  //   // console.log(`Error in signup user router - ${err}`);
  //   return res.status(500).json({
  //     status: false,
  //     msg: "Error in signing up ROUTE -",
  //     err
  //   });
  // }

}

/** ======= Login/SignIn an existing user with JWT token ======= */
export const LoginController = async (req,res,next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return next(errorHandler(404,false,"User NOT FOUND!"));
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return next(errorHandler(401,false,"Email or password is incorrect"));

    const token = jwt.sign(
      { userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // httpOnly:true - prevent the token from being accessed by client-side scripts
    // res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    res.cookie("accessToken", token, {  maxAge: 360000 });
    return res.json({
      success: true,
      msg: "Login successfully",
      user,
    });
  } catch (error) {
    console.log(`Error in login user route → ${error}}`);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
}


// ===== testing a protected rout 
export const doNothing = async (req,res) =>{
  res.status(200).json({
    success:true,
    msg:"verified"
  })
}