import React , { useEffect,useState ,useRef}from 'react'
import PubSub from "pubsub-js"
import {commentmusic,lyric} from "#/utils/music"
import {throttle} from "lodash"
export default function Playing() {
    const Ref=useRef();
    const Ref2=useRef();
    const [playInfo, setplayInfo]=useState({});
    const [playState,setPlaystate]=useState(false);
    const [lyrics,setlyrics]=useState([]);
    const [playingTime,setplayTime]=useState(0);
    const [playIndex,setIndex]=useState(0);
      useEffect(()=>{
        PubSub.subscribe("word",(_,value)=>{
          setIndex(0)
          setplayInfo(value)
          lyric(value.id).then((item)=>{
              if(item.code===200){
                  let temp=item.lrc.lyric.split("\n");
                  let lyric=new Map();
                  temp.forEach((items)=>{
                    let result=getLrcObj(items);
                          if(!isNaN(result?.seconds)){
                            lyric.set(Math.floor(result.seconds),[result.words])
                          }
                  })
                  let temp2=item.tlyric?.lyric.split("\n");
                  temp2=temp2?.forEach((items)=>{
                    let result=getLrcObj(items);
                    if(!isNaN(result?.seconds)){
                          let ans=lyric.get(Math.floor(result.seconds))??[''];
                          ans.push(result.words);
                          lyric.set(Math.floor(result.seconds),ans);
                    }
                })
                setlyrics([...lyric]);
              }
          })
        })
        return function (){
          PubSub.unsubscribe("word")
        }
      })
    useEffect(()=>{
        PubSub.subscribe("playstate",(_,value)=>{
            setPlaystate(value);
        })
        return function (){
          PubSub.unsubscribe("playstate");
        }
    })
    useEffect(()=>{
      PubSub.subscribe("musicTime",
        throttle(function(_,value){
                  setplayTime(Math.floor(value));
                },
                  1500)
      )
      return function (){
        PubSub.unsubscribe("musicTime");
      }
    },[])
    useEffect(()=>{
      for(let i=0;i<lyrics.length;i++){
        if(lyrics?.[i]?.[0]<playingTime+0.5){
          setIndex(i+1);
        }
      }
    },[playingTime])
    useEffect(()=>{
      let height=Ref2.current.children[playIndex]?.offsetTop;
      Ref2.current.scrollTo({
        top:height-Ref2.current.offsetHeight/2-100,
        behavior: 'smooth'
      })
    },[playIndex])
    const getLrcObj=(content)=>{
        //把一句分割为俩部分
          var twoParts = content.split("]");
          
          var time = twoParts[0].substr(1);//将时间前的"["截掉
          var timeParts = time.split(":");//用秒处理比较翻版我们这里这里转换成秒
          var seconds = +timeParts[1];
          var min = +timeParts[0];
          seconds = min * 60 + seconds;
          //歌词获取
          var words = twoParts[1];
          return{//返回秒和歌词
              seconds: seconds,
              words: words,
          };
    }
  return (
   
    <div className="musicInfo">
        <div className="title">
          <div className="title-name">{playInfo.name}</div>
          <div>{playInfo.album}</div>
          <div>{playInfo.singer}</div>
        </div>
        <div className="record-lyrics">
          <div className="recordBox">
                  <div style={{backgroundColor:"#1b1c1f"}} 
                  className={(playState?'move':'stop')+" record"}>
                        <img src={playInfo.picUrl} className="img"></img>
                      </div>
                </div>
            <div className="lyrics" ref={Ref}>
              <ul  className="lyrics-ul"  ref={Ref2}>
                {
                  lyrics.map((item,key)=>{
                    return <li style={{listStyle:"none"}} key={item[0]} 
                    className={(key===playIndex-1?"playing ":" ")+'lyrics-li'}>
                    <div className="top">{item[1][0]}</div>
                    <div className="bottom">{item[1][1]}</div>

                    </li>
                  })
                }
                </ul>
            </div>
        </div>
    </div>
    
  )
}
