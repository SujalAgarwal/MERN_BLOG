const express=require("express");
const router=express.Router();
const { verifytoken } = require("../utils/verifyUser");
const {create} = require("../controllers/postController");
const {getposts} = require("../controllers/postController");
router.post('/create',verifytoken,create);
router.get('/getposts',getposts);

module.exports=router;
