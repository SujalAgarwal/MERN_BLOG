const express=require("express");
const router=express.Router();
const { verifytoken } = require("../utils/verifyUser");
const {create, deletepost} = require("../controllers/postController");
const {getposts} = require("../controllers/postController");
router.post('/create',verifytoken,create);
router.get('/getposts',getposts);
router.delete('/deletepost/:postId/:userId',verifytoken,deletepost)
module.exports=router;
