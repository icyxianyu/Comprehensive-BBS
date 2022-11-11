import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar ,Badge,Popover,Modal} from 'antd';
import { useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import { useCookies} from 'react-cookie';
import {imageurl} from "#/constant"
import socket from "#/utils/socket.js"
import ChatIndex from "#/pages/chat/index.jsx"
export default function Person() {
const [islogin,setlogin] = useState(false);
const [visible,setvisible] = useState(false);
const [cookie]=useCookies();
const [notSeen,setnotSeen] = useState(0);
const [Ref,setRef]=useState(0);
const data=[
    {
        name:"我的私信",
        key:"message",
        action:"",
        Icon:<Badge count={notSeen}></Badge>,
        render:()=>{
            setvisible(true)
        }
    },{
        name:"temp",
        key:"temp1",
        action:""
    },{
        name:"temp",
        key:"temp2",
        action:""
    },{
        name:"temp",
        key:"temp3",
        action:""
    }
]
const handleCancel=()=>{
    setvisible(false)
}
useEffect(()=>{
    if(cookie.JWT){
        setlogin(true);
    }
},[]);
useEffect(()=>{
socket.getInstance().on("MessageNumber",(value)=>{
    setnotSeen(value)
})
},[])
useEffect(()=>{
    socket.getInstance().on("addMsg",()=>{
        setRef(Math.random());
    })
},[])
useEffect(()=>{
    if(Ref!==0){
        setnotSeen(notSeen+1)
    };
},[Ref]) 
const navigate=useNavigate();
const changetoPerson=()=>{
    console.log("XXXX")
    if(cookie.JWT){
        navigate(`/personPage/${localStorage.getItem("PersonID")}`)
    }
    else{
        navigate("/loginPage")
    }
}
return (
    <div>
      <div>    
     {
       islogin?
    <Popover 
        content={
        data.map((item)=>{
            return <div 
                key={item.key}
                style={{cursor: 'pointer',
                        borderBottom: '1px solid #ccc',
                        padding: '5px',
                        userSelect: 'none'
                        }}
                onClick={item.render}
            >{item.Icon}
            <span style={{padding:'0 5px'}}>{item.name}</span></div>
        })
        }>
        <Badge count={notSeen} onClick={()=>changetoPerson()}>
            <Avatar src={`${imageurl}${localStorage.getItem('avatar')}`} 
                style={{border: '1px solid #ccc'}}>
            </Avatar>
        </Badge>
        </Popover>:
        <Avatar icon={<UserOutlined />} onClick={()=>changetoPerson()}/>
                }
            </div>
            <Modal
                title={""} 
                visible={visible}
                onCancel={handleCancel}
                maskClosable={false}
                footer={null}
                width={600}
            >
                <ChatIndex></ChatIndex>
            </Modal>
    </div>
)
}