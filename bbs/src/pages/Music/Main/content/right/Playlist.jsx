import React ,{useEffect,useState} from 'react'
import {userPlaylist} from "#/utils/music"
import PubSub from "pubsub-js"
import { Collapse} from "antd"
import { useNavigate} from 'react-router-dom'
const { Panel } = Collapse;
export default function Playlist() {
  const [self,setlist] =useState([]);
  const [sub,setsub] =useState([]);

  useEffect(()=>{
      PubSub.subscribe("ID",(_,value)=>{
          userPlaylist(value).then((item)=>{
              if(item.code===200){
                let temp1=[];
                let temp2=[];
                item.playlist.forEach((item)=>{
                  if(item.subscribed) temp2.push(item);
                  else temp1.push(item)
                })
                setlist(temp1);
                setsub(temp2);
              }
          })
      })
      return function(){
        PubSub.unsubscribe("ID")
      }
  })
  return (
    <div>
      <Collapse defaultActiveKey={['1']}  className="Playlist" >
        <Panel header="创建的歌单" key="1" className="listbox" >
        <Listbox items={self}/>
        </Panel>
 
        <Panel header="收藏的歌单" key="2" className="listbox">
          <Listbox items={sub}/>
        </Panel>
        
      </Collapse>
    </div>
  )
}

function Listbox(props){
  const navigate=useNavigate();
  const changeInfo=(value)=>{
    navigate(`Playlist/${value}`)
  }
return (<>
        {
          props.items.map((item)=>{
              return (
                <div key={item.id} className="describe" 
                onClick={()=>changeInfo(item.id)}
                >
                  <img src={item.coverImgUrl} 
                  className="coverimg" loading="lazy">
                  </img>
                  <div className="describe-text">
                    <div className="top">
                      {item.name}
                      </div>
                    <div className="bottom">{item.trackCount}首 播放{item.playCount}次</div>
                    </div>
                  </div>
              )
            })
          }
</>)
}