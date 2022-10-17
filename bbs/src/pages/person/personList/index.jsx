import { LikeOutlined,
   MessageOutlined,
    StarOutlined,
    EyeOutlined,
    CheckOutlined,
    BookOutlined} from '@ant-design/icons';
import { Avatar,Tag, List, message, Space,Col,Row ,Card,Statistic,Segmented} from 'antd';
import {useEffect,useState} from "react"
import React from 'react';
import {useNavigate} from "react-router-dom"
import {searchtext,textGetData,searchcollection} from '#/utils/axios'
import {Color} from "#/constant"
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const Info=["文章","收藏"];
const InfoMesage={
  "文章":'message',
  "收藏":"collection"
}
const PersonList = () =>{
const [list,setlist]=useState([]);
const [data,setdata]=useState({});
const navigate=useNavigate();
const getdata= (response)=>{
  if(response.code===200)
  setlist(response.message)
  else{
    message.error("获取文章失败")
  }
}
  useEffect(()=>{
    searchtext(localStorage.getItem('PersonID')).
    then((response)=>{getdata(response)});
  },[])
  useEffect(()=>{
    textGetData(localStorage.getItem('PersonID')).then((response)=>{
        if(response.code===200){
          setdata(response.data)
        }
        else{
          message.error("")
        }
    })
  },[])
const changeToReadPage=(item)=>{
    navigate(`/ReadPage/${item.BBSID}`)
  }
const changetips=(e)=>{
if(e==="文章"){
  searchtext(localStorage.getItem('PersonID')).
  then((response)=>{getdata(response)});
}else{
  searchcollection(localStorage.getItem('PersonID')).
  then((response)=>{getdata(response)});
}
}
  return (
    <Row>
      <Col span={6} offset={2}>
      <Card title="个人数据" 
      style={{width:'90%',borderRadius:"10px"}}
      >
          <Row>
          <Col span={12}>
            <Statistic title="点赞数" value={data.Likes} prefix={<LikeOutlined />} />
            </Col>
            <Col span={12}>
              <Statistic title="文章查看数" value={data.haveSeen} prefix={ <EyeOutlined />} />
          </Col>
          </Row>
          <br/>      
          <Row>
          <Col span={12}>
            <Statistic title="关注者" value={200} prefix={<CheckOutlined />} />
            </Col>
            <Col span={12}>
              <Statistic title="文章被收藏数" value={data.collection} prefix={<BookOutlined />} />
          </Col>
          </Row>


        </Card>
        </Col>     
       <Col span={14} style={{borderRadius:"10px"}}>
         <div style={{backgroundColor:"white",padding:"2px" ,borderBottom:"1px solid #CCC"}}>
            <Segmented options={Info} size={'large'} onChange={changetips}/>
         </div>
       <List
        itemLayout="vertical"
        size="large"
        style={{cursor: "pointer" ,backgroundColor:"#ffffff"}}
        pagination={{
          pageSize: 5,
        }}
        dataSource={list}
        footer={
          <div>
            <b>powered by</b> fish
          </div>
        }
        renderItem={(item) => (
          <List.Item
            onClick={()=>changeToReadPage(item)}
            className="list-item-person"
            actions={[
              <IconText icon={StarOutlined} text={item.collection} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={item.Likes} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <Message item={item}/>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={"https://joeschmoe.io/api/v1/random"} />}
              title={<b>{item.Title}</b>}
              description={item.Username}
            />
            {item.Mainmini}
          </List.Item>
        )}
      />
      </Col>
  </Row>
)};

export default PersonList;

function Message(props){
  const [title,settitle]=useState("");
  useEffect(()=>{
    let temp=props.item.Title.slice(0,5);
    settitle(temp);
  },[props.item])
  return(
      <Tag style=
        {{margin:"auto",
        fontFamily:"fantasy",
        fontSize:"40px",
        height:"100%",
        textAlign:"center",
        width:"200px",
        display:"flex",
        overflow:"hidden",
        }}
        color={Color[Math.floor(Math.random()*Color.length)]}
        >
          <div style={{margin:"auto"}}>
          {title}
          </div>
        </Tag>
  )
}
