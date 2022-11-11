import React ,{useRef,useEffect,useState}from 'react'
import {PlayCircleOutlined,CustomerServiceOutlined } from "@ant-design/icons"
import flvJs from 'flv.js'
import socket from "#/utils/socket.js"
let bar=null;

export default function Player(prop) {
    const speed=0.2
    const videoRef=useRef();
    const barRef=useRef();
    const [live,setLive]=useState(null);
    const [volume,setVolume]=useState(0);
    const [barrage,setbarrage]=useState([]);
    const changeVloume=(e)=>{
        setVolume(e.target.value);
        live.volume=volume/100;
    }
    const begin=()=>{
      
      live.unload();
      live.volume=volume/100;
      live.load();
      live.play();
    }
    const end=()=>{
      live.pause();
    }
    useEffect(()=>{
      if (flvJs.isSupported()) {
            if(prop.RoomID){
            const flvPlayer= flvJs.createPlayer({
              url:`http://localhost:8000/live/${prop.RoomID}.flv`,
              type: 'flv',
              isLive: true,
              cors: true,
              hasVideo: true,
            })
            flvPlayer.attachMediaElement(videoRef.current);
            setLive(flvPlayer);
            
              flvPlayer.load();
          }
      }
    },[])
    useEffect(()=>{
      if(barrage.length>30){
        const temp=barrage.slice(-30,30);
        setbarrage(temp)
      }
    })
    useEffect(()=>{
      socket.getInstance().on("addTalk",(value)=>{
        let top=(videoRef.current.clientHeight)*Math.random()*0.25
        let tempval={
          id:value.id,
          value:value.message,
          height:top,
          color:"white",
          left:"100%"
        }
        console.log(tempval,barrage)
        setbarrage([...barrage,tempval]);
        clearInterval(bar);
        bar=setInterval(()=>{
          for(const p of barRef.current.children){
            p.style.left=parseFloat(p.style.left)-speed+"%";
          }
        },50)
      })
    })
    
  return (
      <div className="playbox-main">
          <div className="playbox-main-box">
            <div style={{position:"relative"}}>
                <video ref={videoRef} className='playbox-main-video' muted>
                </video>
                <div style={{position:"absolute",width:"100%",height:"100%",top:"0",overflow:"hidden",whiteSpace:"nowrap"}} ref={barRef}>
                {
                  barrage.map((item)=>(
                    <span key={item.id} className="ba-Word" style={{
                      zIndex:'1',
                      position:"absolute"
                      ,color:item.color,
                      top:item.height,
                      left:item.left,
                      fontSize:'20px',
                      fontWeight:"bold"
                      }}
                      >{item.value}</span>
                  ))
                }
                </div>
            </div>
            <div className="playbox-main-edit">
                <button onClick={begin}><PlayCircleOutlined />点击开始</button>
                <button onClick={end}>点击暂停</button>
                <div className="playbox-main-edit-volume">
                  <CustomerServiceOutlined style={{color:"white"}}/>
                    <input type="range" onChange={changeVloume} value={volume}
                    ></input>
                </div>

            </div>
          </div>
      </div>
  )
}

