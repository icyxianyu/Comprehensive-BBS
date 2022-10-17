import React ,{useEffect,useState}from 'react'
import PersonMsg from "./personMsg"
import {Outlet} from "react-router-dom"

import {personMsg} from "#/utils/axios/index.js"
import { useNavigate } from 'react-router-dom'
export default function PersonPage() {
  const [msg,setMsg]=useState([])
  const navigate=useNavigate();
  useEffect(()=>{
    personMsg().then((item)=>{
      if(item.code===404){
        navigate('/loginPage')
      }
      else if(item.code===200){
        setMsg(item.data);
      }
    })
  },[])
  return (
    <div >      
      <PersonMsg msg={msg}></PersonMsg>
      <br></br>
      <Outlet/>
    </div>

  )
}
