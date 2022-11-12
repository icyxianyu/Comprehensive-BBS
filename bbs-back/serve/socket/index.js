const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{ cors: true });

const get= require('./get.js');
io.on('connection', socket => {
    socket.on('login',(value)=>get.login(value,socket,io));
    socket.on('getMessage',(value)=>get.getMessage(value,socket));
    socket.on('getMessageAll',(value)=>get.getMessageAll(value,socket))
    socket.on("sendMessage",(value)=>get.sendMessage(value,socket,io));

    socket.on("joinLiveRoom",(value)=>get.joinLiveRoom(value,socket,io));
    socket.on("talkToRoom",(value)=>get.talkToRoom(value,socket,io));
    socket.on("leaveRoom",(value)=>get.leaveRoom(value,socket,io));
  });
server.listen(3001,()=>{console.log('websocket listening on port 3001')});