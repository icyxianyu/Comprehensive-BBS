import React ,{useEffect,useState}from 'react'
import PersonMsg from "./personMsg"
import {Outlet} from "react-router-dom"

import {personMsg} from "#/utils/axios/index.js"
import { useNavigate ,useParams} from 'react-router-dom'
export default function PersonPage() {
  
  const [msg,setMsg]=useState([]);
  const navigate=useNavigate();
  const {PersonID} =useParams();
  useEffect(()=>{
    personMsg(PersonID).then((item)=>{
      if(item.code===404){
        navigate('/loginPage')
      }
      else if(item.code===200){
        setMsg(item.data);
      }
    })
  },[PersonID])
  return (
    <div >      
      <PersonMsg msg={msg}></PersonMsg>
      <br></br>
      <Outlet/>
    </div>

  )
}
