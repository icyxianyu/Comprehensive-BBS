const express = require('express')
const cors = require('cors')
const app = express();
const routing = require("./routes")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const NodeMediaServer = require('node-media-server');
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};
var nms = new NodeMediaServer(config)
nms.run();

require("./socket") 
//正常论坛功能
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '10mb'}))
app.use(express.json())
app.use(cors());
app.use(cookieParser());
routing(app)
app.listen(3333
    ,()=>{
    console.log('listening on localhost 3333')
})
//发送信息

//直播
