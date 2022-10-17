import React ,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import {Row,Col,message,BackTop} from "antd"
import LeftInfo from "./LeftPersonInfo"
import MainText from "./MainText"
import {searchTextInfoAPI} from "#/utils/axios"
export default function ReadPage() {
    const {BBSID} = useParams();
    const [text,setTextInfo]=useState({});
    const [personInfo,setPerson]=useState({});
    useEffect(()=>{
        searchTextInfoAPI(BBSID).then((response)=>{
          if(response.code===200){
            console.log(response)
            response=response.message
            setPerson({
              Username: response.Username,
              BBSID: response.BBSID,
              avatar: response.avatar
            })
            setTextInfo({
              Username: response.Username,
              BBSID: response.BBSID,
              Title: response.Title,
              Main:  response.Main,
              Tags:  response.tags,
              TIME:   response.TIME,
              comments:  response.comments,
            })
          }else{
            message.error("发生未知错误")
          }
        })
    },[BBSID])
  return (
    <div>
       <BackTop />
       <Row style={{marginTop:"10px"}}>
           <Col span={5} offset={1}>
                <LeftInfo Person={personInfo}></LeftInfo>
               </Col>
            <Col span={16} >
                <MainText TextInfo={text}></MainText>  
           </Col>
       </Row>
    </div>
  )
}
