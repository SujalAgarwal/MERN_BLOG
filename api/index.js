const express=require("express");
const dotenv=require('dotenv');
const mongoose=require("mongoose");
const authRoutes=require("./routes/authRoutes")
const morgan=require("morgan")
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

//routes 
app.use(morgan("dev"));
app.use(express.json())
app.use('/api/auth',authRoutes)

//errror middleware
app.use((error,req,res,next)=>{
  const statuscode=error.statuscode||500;
  const message=error.message||"internal server error";
  res.status(statuscode).json({
    success:false,
    statuscode,
    message
  })


})