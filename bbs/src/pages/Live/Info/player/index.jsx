import React ,{useRef,useEffect,useState}from 'react'
import {PlayCircleFilled,PauseCircleOutlined ,CustomerServiceOutlined,FullscreenOutlined,FullscreenExitOutlined } from "@ant-design/icons"
import flvJs from 'flv.js'
import socket from "#/utils/socket.js"
let bar=null;
let style={
  color:"white",fontSize:'25px',cursor:'pointer'
}
export default function Player(prop) {
    const speed=0.2
    const videoRef=useRef();
    const barRef=useRef();
    const leave=useRef();
    const [live,setLive]=useState(null);
    const [volume,setVolume]=useState(0);
    const [barrage,setbarrage]=useState([]);
    const [changeState,setState]=useState(null);
    const [isplay,setplaystate]=useState(false);
    const [isFull,setFull]=useState(false);
    const [show,setshow]=useState('none');
    const changeVloume=(e)=>{
        setVolume(e.target.value);
      if(videoRef.current.muted)
        videoRef.current.muted = false;
      if(volume<5)
        live.volume =0;
      else
        live.volume=volume/100;
    }
    const begin=()=>{
      
      live.volume=volume/100;
      live.play();
      setplaystate(true)

    }
    const end=()=>{
      live.pause();
      setplaystate(false)
    }
    const showVolume=()=>{
      if(show==="none") setshow('block')
      else setshow('none');
    }
    const leaveMouse=()=>{
      leave.current=setTimeout(()=>{
        setshow('none')
      },1000)
    }
    const enterMouse=()=>{
      clearTimeout(leave.current)
    }
    const changeFull=()=>{
      full(videoRef.current)
    }
    function full(ele) {
      if (ele.requestFullscreen) {
          ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullscreen) {
          ele.webkitRequestFullscreen();
      } else if (ele.msRequestFullscreen) {
          ele.msRequestFullscreen();
      }
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
              flvPlayer.play();
              setplaystate(true)
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
        setState(value)
      })
    },[])
    useEffect(()=>{
      if(changeState!==null){
        let top=(videoRef.current.clientHeight)*Math.random()*0.25
        let tempval={
          id:changeState.id,
          value:changeState.message,
          height:top,
          color:"white",
          left:"100%"
        }
        setbarrage([...barrage,tempval]);
        clearInterval(bar);
        bar=setInterval(()=>{
          for(const p of barRef.current.children){
            p.style.left=parseFloat(p.style.left)-speed+"%";
          }
        },50)
      }
      return ()=>{
        clearInterval(bar);
      }
    },[changeState])
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
              <div className="right">
                  <div className="playbox-pause-play">
                  {
                  isplay?<PauseCircleOutlined onClick={end} style={style}>点击暂停</PauseCircleOutlined>
                  
                      :<PlayCircleFilled  onClick={begin} style={style}>点击开始</PlayCircleFilled>
                      }
                  </div>
                </div>
                <div className="left">
                    <div className="playbox-main-edit-volume" >
                      <CustomerServiceOutlined style={style} className="volume-icon"
                      onClick={showVolume}/>

                        <input type="range" 
                        onChange={changeVloume}
                        onMouseEnter={enterMouse}
                        onMouseLeave={leaveMouse}
                        style={{display:show}} 
                        value={volume} className="volume"
                        ></input>
                    </div>
                    <div className="playbox-main-edit-full" onClick={changeFull}>
                        {isFull?<FullscreenExitOutlined style={style}/>:<FullscreenOutlined style={style}/>}
                    </div>
                </div>
            </div>
          </div>
      </div>
  )
}

