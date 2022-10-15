
const connc= require("./index.js");
const db=connc();
module.exports={
    insertText(textinfo){
        return new Promise(
            (resolve) =>{
            db.query(
                `insert into textmsg SET ?`,textinfo,
                (err,result)=>{
                    if (err)    throw err;
                    else{  
                        const textData={
                            BBSID:textinfo.BBSID,
                            Like:0,
                            collection:0,
                        }
                        db.query(
                            `insert into textdata SET ?`,textData,
                            (err,result)=>{
                                if (err)    throw err;
                                else    resolve(result); 
                            }
                        )
                        resolve(result);
                    } 
                }
            )
 
            }
        )
    },
    searchBypersonID(personID){
        return new Promise((resolve) =>{
            db.query(
                `
                SElECT 
                textmsg.BBSID,Mainmini,usermsg.Username,Title,tags,textdata.Likes,textdata.collection
                FROM textmsg  
                    JOIN usermsg 
				on textmsg.PersonID =usermsg.PersonID 
                    LEFT JOIN textdata 
                on textmsg.BBSID=textdata.BBSID
				    where 
                textmsg.PersonID=?`,[personID],
                (err,result)=>{
                   if (err)    throw err;
                   else    resolve(result); 
               }
               )
        })
    },
    searchTextInfo(BBSID){
        return new Promise((resolve) =>{
            db.query(
                `SElECT
                textmsg.BBSID,usermsg.Username,Title,Main,tags,TIME,textdata.Likes,textdata.collection,textdata.comments
                FROM textmsg 
                    JOIN usermsg
                on textmsg.PersonID =usermsg.PersonID
                LEFT JOIN textdata 
                on textmsg.BBSID=textdata.BBSID
                where 
                textmsg.BBSID=? `,[BBSID],
                (err,result)=>{
                   if (err)    throw err;
                   else    resolve(result); 
               }
               )
        })
    },
    searchLike(BBSID){
        return new Promise((resolve,reject)=>{
            db.query("SElECT * FROM textdata WHERE BBSID=?",
            [BBSID],(err,result)=>{
                if(err) throw err;
                else {
                    
                    resolve(result)
                };
            })
        })
    },
    changeLike(BBSID, action){
        return new Promise((resolve,reject)=>{
            if(action==="add")
        db.query(
            `update textdata set Likes=Likes+1 where BBSID=?`,
            [BBSID],
            (err,result)=>{
            if(err) throw err;
            else resolve(result)
            })
        })   
    },
    sendComment(BBSID, action){
        
        return new Promise((resolve,reject)=>{
           db.query(`update textdata set comments=? where BBSID=?`,
            [action,BBSID],
            (err,result)=>{
                if(err) throw err;
                else resolve(result)
            })
            
        })
    },
    searchRank(name,Page){
        return new Promise((resolve,reject)=>{
            let temp=""
            const start=Page??0
            const limit=5
            if(name){
                temp=` ORDER BY ${name} DESC `
            }
            db.query(

                `select textdata.BBSID,Likes,collection 
                    PersonID,TiTle,Mainmini,Time,tags from textdata join textmsg on 
                    textmsg.BBSID=textdata.BBSID `+temp+
                    `limit ${(start)*limit},${start+1*limit}`,(err,result)=>{
                        if(err) throw err
                        else resolve(result)
                    }
                )
        })

    }
}