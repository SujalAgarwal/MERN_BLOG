const express=require("express");
const { signup, signin, google } = require("../controllers/authController");
const router=express.Router();
//signup request
router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google)

module.exports=router;

