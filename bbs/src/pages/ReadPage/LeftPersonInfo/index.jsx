import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {Affix,Card ,Avatar,Space,message} from "antd"
import {HeartTwoTone,SnippetsOutlined} from '@ant-design/icons';
import {searchLike,changeLike,addCollection} from "#/utils/axios"
import {imageurl} from "#/constant" 
export default function LeftInfo(prop) {
const [Like,setLike]= useState()
const [collection,setCollection]= useState();
const [isLike]= useState(false);
const [isCollection]= useState(false);
const colors={
  false:'black',
  true:"red"
};

const [top] = useState(74);
const {BBSID} = useParams();
useEffect(() =>{
  searchLike(BBSID).then((response)=>{
    if(response.code===200){
      const message = response.message;
        setLike(message.Likes);
        setCollection(message.collection);
    }
    else{
        message.error("发生未知错误")
    }
  })
},[])
const changeAction=(name,methods)=>{
  if(name==="Likes")
  changeLike(BBSID,methods).then((response)=>{
    if(response.code===200){
      setLike(Like+1)
    }
  })
  else if(name==="collection"){
    addCollection(BBSID).then((response)=>{
      if(response.code===403){
        message.info(response.message)
      }
      else if(response.code===200){
        setCollection(collection+1)
        message.success(response.message)
      }
    })
  }
}
  return (
    <Affix offsetTop={top} style={{align: 'right'}}>
      <div>
        <Card title={
        <div>
            <Avatar 
            src={`${imageurl}${prop.Person.avatar}`} 
            size={64}
            />
            <span span={10}> 
            {prop.Person.Username}</span>
        </div>}
            style={{ width: '90%'}
            }>
        <p>占位，我也不晓得以后会干嘛</p>
        <p>占位，我也不晓得以后会干嘛</p>
        <p>占位，我也不晓得以后会干嘛</p>
        </Card> 
        <Space>
          <div  >
            <HeartTwoTone 
              twoToneColor={colors[isLike]}
                style={{fontSize:"30px"}}
                onClick={()=>changeAction("Likes","add")}/>
              <span style={{fontSize:"20px",userSelect:'none'}}>{Like}</span>
            </div>

            <div  onClick={()=>changeAction("collection")}
              style={{cursor: "pointer"}}
            >
                <SnippetsOutlined  
                style={{fontSize:"30px",color:colors[isCollection]
                }}/>
              <span style={{fontSize:"20px",userSelect:'none'}}>{collection}</span>
            </div>
        </Space>
        </div>
     </Affix>
  )
}
