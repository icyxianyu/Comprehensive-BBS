const connc= require("./index.js");
const db=connc();


module.exports={
search(userinfo){
    return new Promise((resolve) =>{
        db.query(
             `SElECT * FROM usermsg where Username= ? `,[userinfo.username],
             (err,result)=>{
                if (err)    throw err;
                else    resolve(result); 
            }
            )
        })
    },
insert(userinfo){
    return new Promise(
        (resolve) =>{
        db.query(
            `insert into usermsg SET ?`,userinfo,
            (err,result)=>{
                if (err)    throw err;
                else    resolve(result); 
            }
        )
    }
    )
},
searchPerson(useinfo){
    return new Promise((resolve) =>{

        db.query(
             `SElECT * FROM usermsg where PersonID= ? `,[useinfo],
             (err,result)=>{
                if (err)  throw err;
                else    resolve(result); 
            }
            )
        })
},
updatePerson(useinfo,id){
    return new Promise((resolve) =>{
        db.query(
            `UPDATE usermsg 
                set Username=?,Email=?,
                Phone=?,Sex=?,usertags=?,
                note=? where PersonID=?`,
                [...useinfo,id],
                    (err,result)=>{
                        if(err) throw err;
                        resolve(result)
                })
    })
},
Focus(PersonID){
return new Promise((resolve,reject)=>{
    db.query(`SELECT focus from usermsg where PersonID=?`,[PersonID],(err,result)=>{
        if(err) reject(err);
        else resolve(result);
    })
})
},
SelectFocus(PersonID){
return new Promise((resolve,reject)=>{
    db.query(`SELECT PersonID,avatar,Username from usermsg
     where PersonID in (?)`,[PersonID],(err,result)=>{
        if(err) reject(err);
        else resolve(result);
    })
})
},
insertFocus(focusID,PersonID){
    return new Promise((resolve,reject)=>{
        db.query(`update usermsg set focus =? where PersonID=?`,
        [focusID,PersonID],(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        })
    })
},

}
