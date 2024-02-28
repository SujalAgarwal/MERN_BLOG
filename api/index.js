const express=require("express");
const dotenv=require('dotenv');
const mongoose=require("mongoose");
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoute")
const postRoutes=require("./routes/postRoutes")
const morgan=require("morgan")
//dotenv configuration
dotenv.config();
const cookieParser=require('cookie-parser');

//database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("database connected")
})
.catch((err)=>{
 console.log(err.message)
})

//server listening on port.
const app=express();


//routes 
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

app.listen(3000, () => {
  console.log("server started on port 3000");
});
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