import React ,{useEffect,useState,useRef}from 'react'
import {Button,Modal, Input, Avatar} from "antd"
import socket from "#/utils/socket.js"
import {useCookies} from "react-cookie"
const { TextArea } = Input;
export default function Chat(props) {
  const [visible,setvisible]=useState(false);
  const [MessageID,setMessageID]=useState(null)
  const [chatMsg,setChat]=useState([]);
  const [text,settext]=useState("");
  const [cookie]=useCookies();
  const [changeState,setchange]=useState({});
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
  const sendMessage=()=>{
    socket.getInstance().emit("sendMessage",JSON.stringify({
      sendID:cookie.JWT,
      toPersonID:props.PersonID,
      MessageID:MessageID??"",
      text,
    }))
  }
  useEffect(()=>{
    socket.getInstance().on("chatmsg",(obj)=>{
      if(obj.length===0)setChat([]);
      else{
        let temp=JSON.parse(obj[0].MainMessage);
        setMessageID(obj[0].MessageID);
        setChat(temp);
      }
    })
  },[])
  useEffect(() => {
    socket.getInstance().on("addtext",(obj)=>{
      setchange(obj);
    })
  },[]);
  useEffect(() =>{
    if(JSON.stringify(changeState) !== "{}"){
    let temp=chatMsg.concat([changeState])
    setChat(temp);
    }
  },
  [changeState])
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
      <div style={{height:"50vh"}}>
        {
          chatMsg.map((item,index)=>{
            return<div key={item.time}>
              <Avatar />
              <span style={{marginLeft:"5px"}}>{item?.text}</span>
            </div>
          })
        }
      </div>
    <TextArea
      showCount
      allowClear
      maxLength={150}
      autoSize={{
        minRows: 3,
        maxRows: 3,
      }}
      placeholder="输入文本"
      onPressEnter={sendMessage}
      onChange={(e)=>{
        settext(e.target.value)
      }}
    />
    <Button type="primary" block onClick={sendMessage}>
      发送
    </Button>
    </Modal>
    </>
  )
}
