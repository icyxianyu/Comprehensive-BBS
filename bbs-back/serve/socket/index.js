const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{ cors: true });

const get= require('./get.js');
io.on('connection', socket => {
    socket.on('login',(value)=>get.login(value,socket));
    socket.on('getMessage',(value)=>get.getMessage(value,socket));
    socket.on("sendMessage",(value)=>get.sendMessage(value,socket,io));
  });
server.listen(4000,()=>{console.log('websocket listening on port 3000')});