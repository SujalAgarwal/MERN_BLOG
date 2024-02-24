const User = require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const errorhandler = require("../utils/error");

const signup=async(req,res,next)=>{
  const {username,email,password}=req.body;
  if(!username || !email || !password || username==="" || email==="" || password=="")
  {
     next(errorhandler(400,"all fields are required"))
  }
   
   const hashed_password=bcrypt.hashSync(password,10);
  const newuser=User({
    username,
    email,
    password:hashed_password
  })
  
  try {
    await newuser.save();
    res.status(200).json({
      message:"SignUp Successfull"
    })
  } catch (error) {
   next(error);
  }
}
const signin=async(req,res,next)=>{
   const {email,password}=req.body;
   if(!email || !password || email=="" || password=="")
   {
    return next(errorhandler(400,"All fields are required"));
   }

   try {
    const validuser=await User.findOne({email});
    if(!validuser)
    {
      return next(errorhandler(404,"User not found"));
    }
    const validPassword=bcrypt.compareSync(password,validuser.password);
    if(!validPassword)
    {
      return next(errorhandler(400,"Invalid Password"));
    }
    const token=jwt.sign({
      id:validuser._id
    },process.env.JWT_SECRET)

    const {password:pass,...rest}=validuser._doc;
    res.status(200).cookie('access token',token,{
      httpOnly:true}).json(rest)
    
   } catch (error) {
      next(error);
   }
}
module.exports={signup,signin}