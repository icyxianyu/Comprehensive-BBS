const constant= require("../constant/user.js")
const jwt = require('jsonwebtoken');
const {v4:uuid4} = require('uuid')
const action=require('../models/chat.js');
const useraction=require('../models/user.js')
function midtoken(JWT) {
    const token=JWT;
    let decoded;
      try {
        decoded = jwt.verify(token, 
            constant.private.secret);
      } catch(err) {
            decoded ={};
      }finally{
            return decoded.PersonID;
      }
}
module.exports ={
    login(obj,socket){
        const PersonID=midtoken(JSON.parse(obj).PersonID);
        socket.join(PersonID);
    },
    getMessage(obj,socket){
            let message=JSON.parse(obj);
            let GetID=midtoken(message.GetID);
            let FindID=message.FindID
            action.getMessageByPersonID(GetID, FindID).then((item)=>{
        
                if(item.length!==0){
                    socket.join(item[0].MessageID);
                }
                socket.emit("chatmsg",item);
            })
    },
    sendMessage(obj,socket,io){
        let message=JSON.parse(obj);
        let sendID=midtoken(message.sendID);
        if(message.MessageID===""){
            let MessageID=uuid4();
                let insert={
                    MessageID:MessageID,
                    MainMessage:JSON.stringify([
                        {
                            PersonID:sendID,
                            text:message.text,
                            time:new Date().getTime(),
                        }
                    ]),
                    UserID1:sendID,
                    UserID2:message.toPersonID,
            }
            action.createtext(insert);
            socket.join(MessageID);
            io.to(MessageID).emit("chatmsg",[insert])
            io.to(message.toPersonID).emit("chatmsg",[insert])
        }else{
            action.getMessageByMessageID(message.MessageID).then((item)=>{
                let mainMsg=JSON.parse(item[0].MainMessage);
                let temp={
                    PersonID:sendID,
                    text:message.text,
                    time:new Date().getTime(),
                }
                mainMsg.push(temp);
                action.updatetext(JSON.stringify(mainMsg,message.MessageID),
                message.MessageID).then((item)=>{
                   if(item.changedRows===1){
                    io.to(message.MessageID).
                    emit("addtext",temp)
                   }
                })
            })
            
        }
    }
}