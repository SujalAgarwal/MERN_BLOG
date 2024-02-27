const express=require("express");
const { updateUser, deleteUser } = require("../controllers/userController");
const { verifytoken } = require("../utils/verifyUser");
const router=express.Router();

//route to update the information of teh user
router.put('/update/:userid',verifytoken,updateUser);
router.delete('/delete/:userid',verifytoken,deleteUser)
module.exports=router;