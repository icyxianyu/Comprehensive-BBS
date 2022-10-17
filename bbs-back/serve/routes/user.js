const express=require("express");
const router=express.Router();
const user= require("../controllers/user.js")

router.post("/user/register",user.register)
router.post("/user/login",user.login)
router.get("/user/person",user.person)
router.post("/user/change",user.change);
router.get("/user/avatar/:avatar",user.getavatar)
module.exports=router