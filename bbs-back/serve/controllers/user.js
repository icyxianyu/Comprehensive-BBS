const action =require('../models/user.js')
const constant= require("../constant/user.js")
const midtoken=require("./midtoken")
const {v4:uuid4} = require('uuid')
const jwt = require('jsonwebtoken');
const base = require('./base64toimage.js')
const fs= require('fs');
const path = require('path')
module.exports ={
    register(req,res){
        const userInfo=req.body;
        let avatar=req.body.avatar;
        base(avatar).then((item)=>{
            action.search(userInfo).then((results)=>{
                if(results.length===0){
                    const user={
                        PersonID:uuid4()+'',
                        Username:userInfo.username??Math.random()+'',
                        Password:userInfo.password??'123456',
                        EMAIL:userInfo.email+'',
                        Phone:userInfo.phone+'',
                        Sex:userInfo.sex+'',
                        usertags:"",
                        note:"",
                        avatar:item,
                    }
                    action.insert(user).then(()=>{
                        
                      res.send(JSON.stringify({
                            code:200,
                            message:constant.info200
                        }))
                    })
                }else{
                    res.send(JSON.stringify({
                        code:400,
                        message:constant.info400
                    }));
                }
              });
        })
        },
    login(req,res){
        const userInfo=req.body;
        const searchInfo={
            username:userInfo.usernameLogin
        }
        action.search(searchInfo).then((result)=>{
            if(result.length!==0){
                if(result[0].Password!==userInfo.passwordLogin){
                    res.send(JSON.stringify({
                        code:400,
                        message:constant.private.info400
                    }))
                    return;
                }
                const token=jwt.sign(
                    {PersonID:result[0].PersonID,
                        username:result[0].Username
                    },
                        constant.private.secret
                        ,   { expiresIn:constant.private.timeout}
                );
                res.send(JSON.stringify({
                    code:200,
                    token,
                    message:constant.private.info200,
                    PersonID:result[0].PersonID,
                    avatar:result[0].avatar
                }))
            }else{
                res.send(JSON.stringify({
                    code:401,
                    message:constant.info401
                }))
            }
        })
    },
    person(req,res){
        midtoken(req,res,(decoded)=>{
            action.searchPerson(decoded.PersonID).
            then((response) => {
                if(response.length===0){
                    res.send(JSON.stringify({
                        code:404,
                        message:constant.info404,
                                }))
                }
                else{
                    const msg={
                        Username:response[0].Username,
                        Phone:response[0].Phone,
                        Sex:response[0].Sex,
                        Email:response[0].EMAIL,
                        usertags:response[0].usertags,
                        note:response[0].note,
                        avatar:response[0].avatar,
                    }
                    res.send(JSON.stringify({
                        code:200,
                        data:msg
                    }))
                }
            })
        })

          
    },
    change(req, res) {
        midtoken(req,res,(decoded)=>{
            let person=req.body;
            let Id=decoded.PersonID;
            let inner={
                username:person.Username
            }
            action.searchPerson(Id).then((item)=>{
                if(item.length>0){
                    action.search(inner).then((item)=>{
                        if(item.length===0||item[0].Username===person.Username){
                            let temp=[
                                person.Username,
                                person.Email,
                                person.Phone,
                                person.Sex,
                                person.usertags??"",
                                person.note]
                            action.updatePerson(temp,Id).then((item)=>{
                                if(item.protocol41){
                                    res.send(JSON.stringify({
                                        code:200,
                                        message:constant.info200
                                    }))
                                }
                            })
                        }else{
                            res.send(JSON.stringify({
                                code:400,
                                message:constant.info400,
                            }));
                        }
                    })
                 }
                 else{
                    res.send(JSON.stringify({
                        code:401,
                        message:constant.info401,
                    }))
                 }
            })

        })
    },
    getavatar(req, res) {
        let title=req.params.avatar;
        let filePath = path.resolve(__dirname, `../image/${title}`);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) filePath = path.resolve(__dirname,"../image/404.png");
            const cs = fs.createReadStream(filePath);

            cs.on("data", chunk => {
                res.write(chunk);
            })
    
            cs.on("end", () => {
                res.status(200);
                res.end();
            })
          });


    }
}