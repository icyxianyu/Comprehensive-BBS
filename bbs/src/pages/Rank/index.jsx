import React ,{useEffect,useState} from 'react'
import {searchRank} from "#/utils/axios"
import {message,Typography,Layout} from "antd"
import MainRank from "./main/inedx.jsx"
const { Title } = Typography;
const { Header, Content  } = Layout;
export default function RankPage() {
    const Rank={
      Likes:"Likes",
      TIME:"TIME",
      LikesTitle:"按点赞排名",
      TIMETitle:"最新博客"
    }
    const [Likes,setmain]=useState([]);
    const [TIME,setTIME]=useState([]);
    useEffect(()=>{
      searchRank(Rank.Likes,0)
      .then((response)=>{
        if(response.code===200) {
          setmain(response.response);
        }
         else message.error("抱歉，发生未知错误，无法获取文章列表")
      })
      searchRank(Rank.TIME,0)
      .then((response)=>{
        if(response.code===200) {
          setTIME(response.response);
        }
         else message.error("抱歉，发生未知错误，无法获取文章列表")
      })
    },[])
  return (
        <div>
          <Layout>
              <Header style={{backgroundColor:"white",marginTop:"10px"}}>
                <Time/>
                </Header>
                <Content>
                  <div className="rank-page-main">
                      <MainRank main={Likes} header={Rank.LikesTitle}
                            state={"Likes"}></MainRank>
                      <MainRank main={TIME} header={Rank.TIMETitle}
                            state={"TIME"}></MainRank>
                        </div>
                </Content> 
            </Layout>
        </div>
  )
}
function Time(){
  const [time,setTime]=useState(new Date().getTime());
  useEffect(()=>{
    const temp=setInterval(()=>{
     setTime(new Date().getTime())
   },1000)
    return function clean(){
     clearInterval(temp)
    }
 },[]);
  return (
      <Title>{new Date(time).getFullYear()}年 
      {new Date(time).getMonth()+1}月
      {new Date(time).getDate()}日
      <small>{new Date(time).getHours()}:
      {new Date(time).getMinutes()>=10?new Date(time).getMinutes():"0"+new Date(time).getMinutes()}:
      {new Date(time).getSeconds()>=10?
      new Date(time).getSeconds():
      "0"+new Date(time).getSeconds()}</small> 排行
    </Title>
)
}