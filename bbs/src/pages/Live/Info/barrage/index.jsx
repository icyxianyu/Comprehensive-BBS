import React,{useState,useRef} from 'react'
import {message} from "antd"
import {nanoid} from "nanoid"
import PubSub from 'pubsub-js'
export default function Barrage() {
  const [word,setword]=useState([]);
  const Ref=useRef();
  const Ref2=useRef();

  const sendtext=()=>{
    let value=Ref.current.value.replace(/^\s+/, '').replace(/\s+$/, '');;
    if(value.length===0){
        message.error("输入文字不能为空");
        return;
    }else{
        setword([...word,{value,id:nanoid()}]);
        Ref2.current.scrollTop = Ref2.current.scrollHeight;
        // 暂时
        PubSub.publish("barrageAdd",value);
        Ref.current.value="";
    }
  }
  return (
    <div className="playbox-barrage">
      <div className="playbox-barrage-text" ref={Ref2}>
          {word.map((item,key)=>{
            return <div key={item.id} className="text-page">
              <span>{key}:</span>
              {item.value}</div>
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
