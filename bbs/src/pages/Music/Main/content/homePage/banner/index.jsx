import React,{useEffect,useState,useRef} from 'react'
import {LeftOutlined,RightOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom";
import {PubSub} from "pubsub-js"
import {album} from "#/utils/music"
export default function Banner(props) {
    const navigate=useNavigate();
    const [list,setList]=useState([]);
    const [center,setcenter]=useState(0);
    const ref=useRef({});
    const count=useRef();
    useEffect(()=>{
        setList(props.List);
    },[props])
    const change=(item)=>{
        let current =ref.current[center];

        let bef=(center-1)<0 ? list.length-1 : (center-1);
        let aft=(center+1)>list.length-1 ? 0 : (center+1);
        let currentBefore = ref.current[bef];
        let currentAfter = ref.current[aft];
        let change;
        if(!current||!currentBefore||!currentAfter){
            return;
        };
        if(item===1){
            change=ref.current[(aft+1)>list.length-1?0:(aft+1)];
            current.style.left="25%";
            current.style.height="75%";
            current.style.top="12.5%";
            current.style.zIndex=-1;

            currentBefore.style.left='50%'
            currentBefore.style.zIndex=-2;

            currentAfter.style.left="50%"
            currentAfter.style.height="100%"
            currentAfter.style.top=0;
            currentAfter.style.zIndex=1;
            
            change.style.left="75%";
            change.style.height="75%"
            change.style.top='12.5%'
            setcenter(aft)
        }else{
            change=ref.current[(bef-1)<0?list.length-1:(bef-1)];

            current.style.left="75%";
            current.style.height="75%";
            current.style.zIndex=-1;
            current.style.top="12.5%";

            currentBefore.style.left='50%'
            currentBefore.style.height='100%'
            currentBefore.style.top=0;
            currentBefore.style.zIndex=1;

            currentAfter.style.left="50%"
            currentAfter.style.zIndex=-2;
            
            change.style.left="25%";
            change.style.height="75%"
            change.style.top='12.5%'
            
            setcenter(bef)

        }
    }
    useEffect(()=>{
        change(1);
    },[list])
    useEffect(()=>{
        count.current=
        setInterval(()=>{
            change(1);
        },3000)
        return function(){
            clearInterval(count.current);
        }
    })
    const setload=(item)=>{
        if(item.targetType===1000)
        navigate(`/musicPage/Main/Playlist/${item.targetId}`)
        else if(item.targetType===3000){
            window.open(item.url)
        }
        else if(item.targetType===1){
            PubSub.publish('playmusic',item.targetId)
        }
        else if(item.targetType===10){
            navigate(`/musicPage/Main/Playlist/${item.targetId}?type=10`)
        }
    }
  return (
    <div className="banner">
        <div className="banner-container">
            <div className="banner-before button" onClick={()=>change(-1)}>
            <LeftOutlined />
            </div>
            <div className="banner-after button" onClick={()=>change(1)}>
            <RightOutlined />
            </div>
        {
            list.map((item,key)=>{
                return (
                    <div key={item.scm} className="imageBox" ref={r=>ref.current[key]=r}
                    style={{height:key===0?'100%':'0%'}}
                    onClick={()=>setload(item)}>
                        <img src={item.imageUrl} className="image"></img>
                        <div style={{backgroundColor:item.titleColor}} className="title">
                            {item.typeTitle}</div>
                    </div>
                )
            }).reverse()
        }
        </div>
    </div>
  )
}
