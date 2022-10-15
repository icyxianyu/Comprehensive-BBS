import React,{useRef,useState,useEffect} from 'react'
import {CaretDownOutlined,CaretUpOutlined} from "@ant-design/icons"
import Playing from './playing'
import Comments from "./comment"
import PubSub from 'pubsub-js'

export default function Left() {
  const [isplay,setplay]=useState(false);
  const [isclick,setclick]=useState(true)
  const [isFirst,setisFirst]=useState(false)
  useEffect(()=>{
    PubSub.subscribe("isPlaying",(_,value)=>{
      setplay(value);
      if(!isFirst){
        setclick(false);
        setisFirst(true);
      }
    })
    return function(){
      PubSub.unsubscribe("isPlaying");
    }
  })
  const changeLength=()=>{
    setclick(!isclick)
  }
  return (
    <div>
    <div className="fold" onClick={changeLength} title={isclick?"点击展开":"点击收起"}  
      style={{display: isplay ? 'block' : 'none'}}>
      <hr></hr>
      { isclick ?
        <CaretDownOutlined/>:
          <CaretUpOutlined />
        }
    </div>
    <div className="container" 
    style={{height:isclick?'0px':'100vh'}}>
              <Playing></Playing>
              <Comments></Comments>
    </div>
    </div>
  )
}
