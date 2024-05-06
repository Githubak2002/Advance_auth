import { User } from "../models/userModel.js"
import errorHandler from "../utils/customError.js"
import bcrypt from "bcrypt"


// ===== Update user =====
export const UpdateController = async (req,res,next) => {
  if(req.user.id !== req.params.id)
    return next(errorHandler(401,false,"You can UPDATE only your account"))
  
  try {
    if(req.body.password){
      req.body.password = bcrypt.hashSync(req.body.password,10)
    }

    const UpdatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set:{
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
      }
    },{new:true}
  );
  // const {password, ...rest} = UpdatedUser;

  res.status(200).json("User Updated");
  } catch (error) {
    next(error);
  }
  // res.json({msg:"ok"}).send( hello)
}
