const User = require("../models/userModel");
const bcrypt=require("bcryptjs");

const signup=async(req,res)=>{
  const {username,email,password}=req.body;
  if(!username || !email || !password || username==="" || email==="" || password=="")
  {
    res.status(400).json({
        message:"All fields are required"
    })
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
    res.status(500).json({
      message:error.message
    })
  }
}

module.exports={signup}