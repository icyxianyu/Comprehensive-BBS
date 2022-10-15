import React from 'react'
import Player from './player'
import Barrage from './barrage'
import {useParams,useNavigate} from "react-router-dom"
import {PageHeader} from "antd"
export default function LiveInfo() {
const navigate=useNavigate()

  const {RoomID} = useParams();
  return (
    <div>
      <PageHeader
      className="site-page-header"
      onBack={() =>{navigate(-1)}}
      title={RoomID+"的房间"}
      />
          <div className="playbox" style={{marginTop:"10px"}}>
        <Player RoomID={RoomID}/>
        <Barrage RoomID={RoomID}/>
      </div> 
      </div>
  )
}
