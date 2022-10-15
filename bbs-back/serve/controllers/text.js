const action =require('../models/text.js')
const consttext=require("../constant/text.js")
const midtoken=require("./midtoken")
const {v4:uuid4} = require('uuid')

module.exports ={
    sendtext(req, res) {
        midtoken(req,res,(decoded)=>{
            const textinfo={
                BBSID:uuid4()+"",
                PersonID:decoded.PersonID,
                Title:req.body.title,
                Main:req.body.text,
                Mainmini:req.body.textmini,
                tags:req.body.tags.join(" "),
                TIME:new Date().getTime()+'',
            }
            action.insertText(textinfo).then(()=>{
                res.send(JSON.stringify({
                    code:200,
                    message:consttext.sendtext.info200
                }));
            })
        })
    },
    changetext(req, res){
        midtoken(req,res,(decoded)=>{

        })
    },
    searchtextPerson(req, res){
        midtoken(req,res,(decoded)=>{
            let PersonID=decoded.PersonID;
            action.searchBypersonID(PersonID).then((item)=>{
                res.send(JSON.stringify(
                    {code:200,
                    message:item}))
            })
        })
    },
    searchTextInfo(req,res){
        const BBSID=req.query.BBSID
        action.searchTextInfo(BBSID).then((item)=>{
           res.send(JSON.stringify({code:200,message:item[0]
        }))
        })
    },
    searchLike(req,res){
        const BBSID=req.query.BBSID;
        action.searchLike(BBSID).then((item)=>{
            res.send(JSON.stringify({code:200,message:item[0]
                }))
         })
    },
    changeLike(req, res){
        const BBSID=req.body.BBSID;
        const actions=req.body.action;
        action.changeLike(BBSID, actions).then(()=>{
            res.send(JSON.stringify({
                code:200
            }));
        })
    },
    sendComment(req,res){
        midtoken(req,res,(decoded)=>{      
            const commentsInfo=JSON.parse(req.body.message).message;
            const BBSID=JSON.parse(req.body.message).BBSID;
            const len=commentsInfo.length-1;
            commentsInfo[len].author=decoded.username;
            commentsInfo[len].PersonID=decoded.PersonID;
            action.sendComment(
                BBSID,
                JSON.stringify(commentsInfo)).then(()=>{
                    res.send({
                        code:200,
                        message:consttext.sendcomment.info200,
                        data:commentsInfo,
                    })
                })
        })
    },
    rankPage(req, res){
        const states=req.query.state??"Likes";
        const page=isNaN(parseInt(req.query.page))?0:parseInt(req.query.page);
        action.searchRank(states,page).then((response)=>{
            res.send({
                code:200,
                response:response
            })
        })
    }
}