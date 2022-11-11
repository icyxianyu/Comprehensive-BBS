import React,{useState,useRef,useEffect} from 'react'
import {message} from "antd"
import socket from "#/utils/socket.js"
import {useCookies} from "react-cookie"

export default function Barrage(props) {
  const [word,setword]=useState([]);
  const [changeState,setstate]=useState({})
  const Ref=useRef();
  const Ref2=useRef();
  const [cookie]=useCookies();
  useEffect(()=>{
    socket.getInstance().on("joinRoomName",(value)=>{
      setstate(value)
    })
    socket.getInstance().on("addTalk",(value)=>{
      setstate(value)
    })
  },[])
  useEffect(()=>{
    if(JSON.stringify(changeState)!=="{}"){
      console.log(changeState)
        setword([...word,changeState]);
        Ref2.current.scrollTop = Ref2.current.scrollHeight;
        }
  },[changeState])
  const sendtext=()=>{
    let value=Ref.current.value.replace(/^\s+/, '').replace(/\s+$/, '');;
    if(value.length===0){
        message.error("输入文字不能为空");
        return;
    }else{
        socket.getInstance().emit("talkToRoom",{
          RoomID:props.RoomID,
          message:Ref.current.value,
          PersonID:cookie.JWT
        })
        // 暂时
        Ref.current.value="";
    }
  }
  return (
    <div className="playbox-barrage">
      <div className="playbox-barrage-text" ref={Ref2}>
          {word.map((item)=>{
            return item.type==='join'?
            <div key={item.id} style={{textAlign: 'center'}}>
              {item.name+"加入直播间"}</div>

            :<div key={item.id} className="text-page">
              <span >{item.name}:</span>
              {item.message}</div>
          })}
      </div>
      
      <div className="play-barrage-textarea">
        <textarea className="barrage-textarea" placeholder="在这输入弹幕"
        ref={Ref}
        ></textarea>
        <button type="button" onClick={sendtext}>点击发送弹幕</button>
      </div>
    </div>
      
  )
}
