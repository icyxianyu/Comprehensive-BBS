const connc= require("./index.js");
const db=connc();
module.exports={
    getMessageByPersonID(PersonID1,PersonID2){
        return new Promise((resolve, reject)=>{
            db.query(
            `select * from chat where 
                (UserID1=? AND UserID2=?) OR (UserID2=? AND UserID1=?)`,
                [PersonID1,PersonID2,PersonID1,PersonID2],
                (err,result)=>{
                    if(err) reject(err);
                    else resolve(result);
                })
        })
    },
    getMessageByMessageID(MessageID){
        return new Promise((resolve, reject)=>{
            db.query(
            `select * from chat where MessageID=?`,[MessageID],(err,result)=>{
                if(err) reject(err);
                else resolve(result);
            })
        })
    },
    sendtext(MessageIDList,PersonID){
        console.log(MessageIDList,PersonID)
        return new Promise((resolve, reject)=>{
            db.query(`update chatmsg set notSeen=notSeen+1,MessageIDList=? where PersonID=?`,
            [MessageIDList,PersonID],(err,result)=>{
                if(err) reject(err);
                else resolve(result);
            })
        })
    },
    changeText(number,MessageIDList,PersonID){
        return new Promise((resolve, reject)=>{
            db.query(`update chatmsg set notSeen=notSeen-?,MessageIDList=? where PersonID=?`,
            [number,MessageIDList,PersonID],(err,result)=>{
                if(err) reject(err);
                else resolve(result);
            })
        })
    }
    ,
    getMsg(PersonID){
        return new Promise((resolve, reject)=>{
            db.query(`select * from chatmsg where PersonID=?`,[PersonID],(err,result)=>{
                if(err) reject(err);
                else resolve(result);
            })
        })
    },
    createtext(message){
        return new Promise((resolve, reject)=>{
            db.query(`insert into chat values (?,?,?,?)`,
            [message.MessageID,
             message.MainMessage,
             message.UserID1,
             message.UserID2
            ],
            (err,result)=>{
                if(err) reject(err);
                else resolve(result);
            })
        })
    },
    updatetext(text,MessageID){
        return new Promise((resolve, reject)=>{
            db.query(`update chat set MainMessage=? where MessageID=?`,
            [text,MessageID],
            (err,result)=>{
                if(err) reject(err);
                else resolve(result);
            })
        })
    }
}