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
  const Ref =useRef();
  const scrollToBottom=()=> {
        const scrollHeight = Ref.current.scrollHeight;//里面div的实际高度  2000px
        const height = Ref.current.clientHeight;  //网页可见高度  200px
        const maxScrollTop = scrollHeight - height; 
        Ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      // 如果实际高度大于可见高度，说明是有滚动条的，则直接把网页被卷去的高度设置为两个div的高度差，实际效果就是滚动到底部了。
  }

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
    if(text.length===0) return ;
    socket.getInstance().emit("sendMessage",JSON.stringify({
      sendID:cookie.JWT,
      toPersonID:props.PersonID,
      MessageID:MessageID??"",
      text,
    }))
    settext("")
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
  [changeState]);
  
  useEffect(()=>{
    if(chatMsg.length!==0)
    scrollToBottom();
  },[chatMsg])
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
      <div  className="chatbox" ref={Ref}>
        {
          chatMsg.map((item,index)=>{
            return<div key={item.time} className={(item.PersonID===localStorage.getItem("PersonID")
            ?"right":'left')+" single"}>
              <Avatar className="avatar"/>
              <div className="MainMessage">
                  <div className="MainText"> {item?.text}</div>
               </div>
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
      placeholder="输入文本,不能为空"
      onPressEnter={sendMessage}
      value={text}
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
