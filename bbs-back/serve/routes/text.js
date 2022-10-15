const express=require("express");
const router=express.Router();
const text= require("../controllers/text.js")

router.post("/text/sendtext",text.sendtext)
router.get("/text/getTextBySelfPersonID",text.searchtextPerson)
router.get("/text/searchTextInfo",text.searchTextInfo)
router.get("/text/searchLike",text.searchLike)
router.put("/text/changeLike",text.changeLike)
router.post("/text/sendComment",text.sendComment)
router.get("/text/RankPage",text.rankPage)
module.exports=router