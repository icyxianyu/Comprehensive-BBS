const constant= require("../constant/user.js")
const jwt = require('jsonwebtoken');

module.exports =function midtoken(req,res,callback) {
    const token=req.cookies.JWT;
    let decoded;
      try {
        decoded = jwt.verify(token, 
            constant.private.secret);

      } catch(err) {
        res.send(JSON.stringify({
            code:404,
            message:constant.info404,
                    }))
      }finally{
          callback(decoded)
      }
}