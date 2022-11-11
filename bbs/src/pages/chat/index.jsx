import React,{useEffect,useState} from 'react'
import socket from "#/utils/socket.js"
import { useCookies} from 'react-cookie';
import {Avatar,Empty,Input} from "antd"
import {imageurl} from "#/constant/index.jsx"
import Chatbox from './chat'
const {Search} =Input;
export default function ChatIndex() {
const [cookie]=useCookies();
const [chatMsg,setchatMsg] = useState([]);
const [choice,setchoice]=useState("");
const [choicePerson,setchoicePerson] =useState("");
useEffect(() =>{
    socket.getInstance().emit('getMessageAll',{
        Person:cookie.JWT
    })
},[])
useEffect(() =>{
  socket.getInstance().on('messageIdList',(obj)=>{
    setchatMsg(obj);
  })
},[])
const changePerson=(PersonID,PersonName)=>{
  if(PersonID==choice) return;
  setchoice(PersonID);
  setchoicePerson(PersonName);
  socket.getInstance().emit("getMessage",JSON.stringify(
    {
        GetID:cookie.JWT,
        FindID:PersonID
    }
  ))
}
  return (
    <div className="chatbox-main">
      <div className="leftList">
          <Search/>
          <hr></hr>
              <div style={{overflow:'auto'}}>
            {
              chatMsg.map((item)=>{
                return <div key={item.MessageID} className={
                  (item.PersonID===choice?"checked":"notcheck")+" listitem"
                } 
                  onClick={()=>changePerson(item.PersonID,item.Username)}>
                  <Avatar src={imageurl+item.avatar}></Avatar>
                  <h4>{item.Username}</h4>
                </div>
              })
            }
            </div>
        </div>
        <div className="listRight">
          {
            choice===""
            ?
              <Empty
              description={"选择聊天对象"}></Empty>
            :
            <div>
              <h3>{choicePerson}</h3>
              <Chatbox  PersonID={choice}/>
              </div>
          }
       
        </div>
    </div>
  )
}
