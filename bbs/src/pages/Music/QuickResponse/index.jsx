import React ,{useEffect,useState,useRef} from 'react'
import {qrKey,qrCreate,qrCheck} from "#/utils/music"
import {message} from "antd"
import {useNavigate} from "react-router-dom"
let time
export default function Quick() {
    const navigate=useNavigate();
    const [imgurl,setimgurl]=useState("");
    const ready=useRef(false)
    const [readyItem,setItem]=useState(null);
    const [isready,setready]=useState(false)
    useEffect(()=>{
        if(isready)
        ready.current=true;
    },[readyItem])
    useEffect(()=>{
            qrKey()
        .then((item)=>{
            if(item.code===200){
            qrCreate(item.data.unikey)
        .then((response)=>{
            if(response.code===200){
                setimgurl(response.data.qrimg);
                time=setInterval(()=>{
                    let temp=item.data.unikey;
                    qrCheck(temp)
        .then((item)=>{ 
                        if(item.code===802&&ready.current===false){
                                setItem(item);
                                setready(true)
                        }else if(item.code===803){
                                message.info("登陆成功");
                                navigate("/musicPage")
                                clearInterval(time);
                                return;
                        }
                    })
                },2000)
            }
        })        
        }
        })
        return function(){
            clearInterval(time)
        }
    },[])

    
  return (
    <div className="loginbox">
        <div className="loginbox-container">
                {
                   isready?
                   (
                    <>
                        <div className="isread">
                            <img src={readyItem.avatarUrl} style={{width: '100%'}}></img>
                            <h2 style={{textAlign: 'center'}}>{readyItem.nickname}</h2>
                        </div>
                    </>):
                   (
                    <>
                    <img src={imgurl}></img>
                    <br></br>
                    <h2>扫码登陆网易云</h2>
                    </>)
                }
        </div>
    </div>
  )
}
