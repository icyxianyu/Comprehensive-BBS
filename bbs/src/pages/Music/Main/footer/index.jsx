import React,{useState,useRef,useEffect} from 'react'
import PubSub from 'pubsub-js'
import {Slider,message} from "antd"
import {
  StepBackwardOutlined,
  CaretRightOutlined,
  PauseOutlined,
  StepForwardOutlined} from "@ant-design/icons"
export default function FooterInfo() {
  const [musicInfo,setInfo]=useState([]);//歌曲信息
  const Ref=useRef();//播放器Ref
  const [isplay,setplaystate]=useState(false);//是否播放
  const [musicUrl,seturl]=useState(null)//链接
  const [begintime,setbegin]=useState("")//播放时长
  const [endtime,setend]=useState("")//总时长
  const [timevalue,setvalue]=useState(0) //range标签的value值
  useEffect(()=>{
    PubSub.subscribe("songUrl",(_,value)=>{ //订阅歌曲url
        console.log("footer",value)
          setplaystate(false)//设置播放状态
          seturl(value.url) //设置url
          setInfo(value); //设置歌曲信息
    })
    return function(){
      PubSub.unsubscribe("songUrl")
    }
  })
  useEffect(()=>{
    if(musicUrl)
      playmusic(); //保证url改变后后自动播放
  },[musicUrl])
  const playmusic=()=>{ //点击播放键
    if(musicUrl){
        if(!isplay)
        {
          Ref.current.play();
      }
        else{
          Ref.current.pause();
        }
        PubSub.publish("playstate",!isplay);
        setplaystate(!isplay);
    }else{
      message.info("请选择一首歌")
    }
  }
  const changeMusicList=(index)=>{
    PubSub.publish("changeMusicList",index) //跳歌曲
  }
  const getTimebegin=()=>{
    if(!Ref.current.currentTime){
      return}
    else {
      let time=Ref.current.currentTime;
      let minutes=Math.floor(time/60);
      let second=parseInt(time%60);
      setbegin((minutes>=10?minutes:("0"+minutes))+":"+
      (second>=10?second:("0"+second)))
    }
  }
  const getTimeend=()=>{
    if(!Ref.current.duration)
    return
    else {
      let time=Ref.current.duration;
      let minutes=Math.floor(time/60);
      let second=parseInt(time%60);
      setend((minutes>=10?minutes:("0"+minutes))+":"+
      (second>=10?second:("0"+second)))
    }
  }
  const update=()=>{
    if(Ref.current.currentTime===Ref.current.duration)
    PubSub.publish("changeMusicList",1)
        getTimebegin();
        getTimeend();
      setvalue((Ref.current.currentTime/Ref.current.duration)*100);
    PubSub.publish("musicTime",Ref.current.currentTime)
  }
  const changeRange=(e)=>{
    Ref.current.currentTime=(e*0.01)*Ref.current.duration;
    setvalue(e)
  }
  return (
    <div className="playList">

      <div className="musicInfo" >
        <div className="InfoContainer">
          <img src={musicInfo.picUrl} className="musicbox"></img>
          <div className="songInfo">
            <div className="musicName">{musicInfo.name}</div>
            <div className="singerName">{musicInfo.singer}</div>
          </div>
        </div>
      </div>
      <div className="playList_controller">
        <audio controls="controls" style={{display:"none"}}
        type="audio/mp3" src={musicUrl} ref={Ref} onTimeUpdate={update}> 
        </audio>
        <div className="play">
          <div className="play_player">
            <span>
            <StepBackwardOutlined onClick={()=>changeMusicList(-1)}/>
            </span>
            <span onClick={playmusic}>
              { isplay?<PauseOutlined />:
                <CaretRightOutlined />
               }
            </span>
            <span>
                <StepForwardOutlined onClick={()=>changeMusicList(1)}/>
            </span>
            </div>
        </div>
        <div className="range">
          <span className="currenttime">{begintime}</span>
          <div className="range_Slider">
            <Slider  value={timevalue} onChange={(e)=>{changeRange(e)}}
            tooltip={{
              open:false
            }} />
          </div>
          <span className="totaltime">{endtime}</span>   
        </div>
      </div>
      <div className="set"></div>
    </div>
  )
}
