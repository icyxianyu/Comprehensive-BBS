
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
                            Likes:0,
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
                textmsg.BBSID,Mainmini,usermsg.Username,Title,tags,
                textdata.Likes,
                textdata.collection,haveSeen,
                usermsg.avatar
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
                textmsg.BBSID,
                usermsg.Username,
                Title,Main,tags,
                TIME,textdata.Likes,
                textdata.collection,textdata.comments,
                usermsg.avatar,
                usermsg.PersonID
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
    changeLike(BBSID){
        return new Promise((resolve,reject)=>{
        db.query(
            `update textdata set Likes=Likes+1 where BBSID=?`,
            [BBSID],
            (err,result)=>{
            if(err) throw err;
            else resolve(result)
            })
        })   
    },
    search(PersonID){
        return new Promise((resolve)=>{
            db.query(`select collection
             from usermsg 
             where PersonID = ?`,[PersonID],(err,result)=>{
                if(err) throw err;
                else resolve(result);
            })
        })
    },
    searchcollection(BBSID){
        return new Promise((resolve)=>{
            try{
            db.query(`SElECT 
            textmsg.BBSID,Mainmini,usermsg.Username,Title,tags,
            textdata.Likes,
            textdata.collection,haveSeen
            ,usermsg.avatar
            FROM textmsg  
                JOIN usermsg 
            on textmsg.PersonID =usermsg.PersonID 
                LEFT JOIN textdata 
            on textmsg.BBSID=textdata.BBSID
            where textmsg.BBSID in (?)`,[BBSID],(err, result)=>{
                if(err) resolve([]);
                else resolve(result);
            })}
            catch(err) {
                resolve([]);
            }
        })
    },
    addCollectionPerson(BBSID,PersonID){
        return new Promise((resolve)=>{
            db.query(`update usermsg set collection =? 
            where PersonID=?`,
            [BBSID,PersonID],(err,result)=>{
                if(err) throw err;
                else {resolve(result)};
            })
        })
    },
    addCollection(BBSID){
        db.query(`update textdata set collection = collection + 1 where BBSID =?`,[BBSID])
    },
    deleteCollection(BBSID){
        db.query(`update textdata set collection = collection - 1 where BBSID =?`,[BBSID])
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

                `select textmsg.TIME,textdata.BBSID,Likes,textdata.collection 
                PersonID,TiTle,Mainmini,Time,tags ,avatar
                    from (textdata join textmsg on 
                    textmsg.BBSID=textdata.BBSID)  LEFT JOIN 
                    usermsg on 
                    usermsg.PersonID=textmsg.PersonID `+temp+
                    `limit ${(start)*limit},${start+1*limit}`,(err,result)=>{
                        if(err) throw err
                        else resolve(result)
                    }
                )
        })

    },
    addHaveSeen(BBSID){
        db.query(`update textdata set haveSeen = haveSeen + 1 where BBSID =?`,[BBSID])
    },
}