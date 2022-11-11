import React ,{useState}from 'react'
import socket from "#/utils/socket.js"
import Chatbox from "#/pages/chat/chat.jsx"

import {Button,Modal} from "antd"

import {useCookies} from "react-cookie"
export default function Chat(props) {
  const [visible,setvisible]=useState(false);

  const [cookie]=useCookies();


  const Getmsg=()=>{
    setvisible(true);
    socket.getInstance().emit("getMessage",JSON.stringify(
      {
          GetID:cookie.JWT,
          FindID:props.PersonID
      }
    ))
  }
  const handleCancel=()=>{
    setvisible(false);
  }

  return (
    <>
    <div style={{textAlign: 'center'}}>
      <Button onClick={Getmsg}>私聊</Button>
    </div>
    <Modal
      title={props.usermsg.Username} 
      visible={visible}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
    >
      <Chatbox PersonID={props.PersonID}></Chatbox>

    </Modal>
    </>
  )
}
