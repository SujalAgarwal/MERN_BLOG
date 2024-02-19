const User = require("../models/userModel");
const bcrypt=require("bcryptjs");
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

module.exports={signup}