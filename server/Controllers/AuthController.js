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

/** ======= Login/SignIn an existing user JWT ======= */
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
      { expiresIn: "2d" }
      // { expiresIn: "1m" }
    );
    // httpOnly:true - prevent the token from being accessed by client-side scripts
    // res.cookie("accessToken", token, {  maxAge: 60000 });   // 1 min
    res.cookie("accessToken", token, { httpOnly: true, maxAge: 172800000 });  // 2days
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

// (expiresIn) should be shorter than or equal to the expiration time set for the cookie (maxAge)

/** ======= LogOut user ======= */
export const LogoutController = async (req, res,next) => {
  try {
    res.clearCookie("accessToken");
    return res.status(202).json({
      success: true,
      msg: "Logged Out successfully!",
    });
  } catch (err) {
    console.log("Error from Logout route → ", err);
    return next(errorHandler(400,false,"LogOut ERROR"));
  }
};


export const TokenExistsController = async (req,res,next) => {
  const token = req.cookies.accessToken || req.headers.authorization;

  console.log("Token - ", token);

  if (!token) {
    return next(errorHandler(401,false,'Unauthorized - Session expired. Please log in again to continue.'))
    // return res.status(401).json({ message: 'Unauthorized - Session expired. Please log in again to continue.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(errorHandler(401,false,'Unauthorized - Invalid token'));
      // return res.status(401).json({ message: 'Unauthorized - Invalid token'});
    }
    // req.user = decoded;
    return res.status(200).json({ 
      success:true,
      message: 'Token exits.' 
    })    
  });
}












// ===== testing a protected rout 
export const doNothing = async (req,res) =>{
  res.status(200).json({
    success:true,
    msg:"verified"
  })
}