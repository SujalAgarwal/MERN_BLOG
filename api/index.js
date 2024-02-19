const express=require("express");
const dotenv=require('dotenv');
const mongoose=require("mongoose");
//dotenv configuration
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("database connected")
})
.catch((err)=>{
 console.log(err.message)
})

//server listening on port.
const app=express();
app.listen(3000,()=>{
  console.log("server started on port 3000");
})