import React ,{useEffect,useState} from 'react'
import Pubsub from "pubsub-js"
import {Avatar,Image, Input} from "antd"
const { Search } = Input;
export default function HeaderInfo() {
    const [PersonInfo,setPerson] =useState({})
    useEffect(()=>{
        Pubsub.subscribe("PersonInfo",(_,item)=>{
            setPerson(item)
        })
    })
  return (
    <>
        <div className="Headerbox">
            <div className="avatar">
             <Avatar src={<Image src={PersonInfo?.avatarUrl} style={{ width: 32 }} />} />     
                    <span className="avatername">{PersonInfo?.nickname}</span>
            </div>
            <div className="search">
                <Search className="searchgroup" placeholder={"摆着好看，功能没实现"}></Search>
            </div>
        </div>
    </>
  )
}
