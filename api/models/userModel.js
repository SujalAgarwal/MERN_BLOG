const mongoose=require("mongoose");
const user_schema=mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  }
})
const User=mongoose.model('User',user_schema);
module.exports=User;