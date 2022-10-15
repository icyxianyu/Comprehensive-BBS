import React ,{useEffect} from 'react'
import Tip from "./tip"
import {Outlet,useNavigate} from "react-router-dom"
import {loginStatus} from "#/utils/music"
export default function MusicPage() {
  const navigate=useNavigate();
  useEffect(()=>{
    loginStatus().then((item)=>{
      if(item.data.code!==200||!item.data.profile)
        navigate('/musicPage/MusicLogin')
    })
  },[])
  return (
    <div>
          <Tip></Tip>
          <Outlet></Outlet>
    </div>
  )
}

