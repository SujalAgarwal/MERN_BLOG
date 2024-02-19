const express=require("express");
const { signup } = require("../controllers/authController");
const router=express.Router();
//signup request
router.post('/signup',signup);

module.exports=router;

