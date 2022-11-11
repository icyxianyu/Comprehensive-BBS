const constant= require("../constant/user.js")
const jwt = require('jsonwebtoken');
const {v4:uuid4} = require('uuid')
const action=require('../models/chat.js');
function midtoken(JWT) {
    const token=JWT;
    let decoded;
      try {
        decoded = jwt.verify(token, 
            constant.private.secret);
      } catch(err) {
            decoded ={};
      }finally{
            return decoded;
      }
}
const map=new Map();
const MessageIDList=new Map();
module.exports ={
    login(obj,socket,io){
        const PersonID=midtoken(JSON.parse(obj).PersonID)?.PersonID;
        socket.join(PersonID);
        io.of("/").in(PersonID).allSockets().then((item)=>{
            map.set(PersonID,item.entries().next().value[0])
        });
        
        action.getMsg(PersonID).then((item)=>{
            socket.emit("MessageNumber",item[0].notSeen);
         })
    },
    getMessage(obj,socket){
            let message=JSON.parse(obj);
            let GetID=midtoken(message.GetID).PersonID;
            let FindID=message.FindID
            action.getMessageByPersonID(GetID, FindID).then((item)=>{
            Promise.all([action.getavatar(GetID),action.getavatar(FindID)]).then((items)=>{
                    let GetAvatar=items[0][0].avatar;
                    let FindAvatar=items[1][0].avatar;
                    item[0].GetAvatar=GetAvatar;
                    item[0].FindAvatar=FindAvatar;
                    if(item.length!==0){
                        socket.join(item[0].MessageID);
                        let message=MessageIDList.get(item[0].MessageID)??new Set();
                        message.add(GetID);
                        MessageIDList.set(item[0].MessageID,message);
                    }
                    socket.emit("chatmsg",item);  
                })
            })
    },
    getMessageAll(obj,socket){
        let PersonID=midtoken(obj.Person).PersonID;
        action.getMessageSelf(PersonID).then((item)=>{
            socket.emit("messageIdList",item)
        })
    },
    sendMessage(obj,socket,io){
        let message=JSON.parse(obj);
        let sendID=midtoken(message.sendID).PersonID;
        let toPersonID=message.toPersonID;
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
            action.createtext(insert).then(()=>{
                action.sendtext(JSON.stringify({
                    sendID,
                    message,
                }),MessageID)
            });
            socket.join(MessageID);
            io.to(MessageID).emit("chatmsg",[insert])
            io.to(toPersonID).emit("chatmsg",[insert])
            send(io,toPersonID,{
                sendID,
                message,
            })
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
                    io.to(message.MessageID).emit("addtext",temp);
                    if(!MessageIDList?.get(message.MessageID)?.has(toPersonID)){

                        action.getMsg(toPersonID).then((item)=>{
                            let getmessage=item[0].MessageIDList===""?{}:JSON.parse(item[0].MessageIDList);
                            let number=getmessage[sendID]?.number??0
                            getmessage[sendID]={
                                number:++number,
                                first:message.text,
                            }
                            action.sendtext(JSON.stringify(getmessage),toPersonID)
                        })
                        send(io,message.toPersonID,{
                            sendID,
                            message:message.text,
                        })
                    }
                    
                   }
                })
            })
            
        }

    },
    leaveRoom(obj,socket){
        socket.leave(obj);
    },
    joinLiveRoom(obj,socket,io){
        let RoomID=obj.RoomID;
        let PersonInfo=midtoken(obj.PersonID).username;
        socket.join(RoomID);
        io.to(RoomID).emit("joinRoomName",
        {   type:"join",
            name:PersonInfo,
            id:uuid4(),
        });
    },
    talkToRoom(obj,socket,io){
        let RoomID=obj.RoomID;
        let message=obj.message
        let PersonInfo=midtoken(obj.PersonID).username;
        io.to(RoomID).emit("addTalk",
        {   type:"word",
            name:PersonInfo,
            message,
            id:uuid4()
        });
    },
    leaveRoom(obj,socket){
        socket.leave(obj.RoomID);
    }
}
function send(io,PersonID,obj){
    io.to(PersonID).emit("addMsg",obj)
}