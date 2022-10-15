import { LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import { Avatar, List, message, Space } from 'antd';
import {useEffect,useState} from "react"
import React from 'react';
import {useNavigate} from "react-router-dom"
import {searchtextSelfAPI} from '#/utils/axios'
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PersonList = () =>{
  const [list,setlist]=useState([])
  const navigate=useNavigate();
  useEffect(()=>{
    searchtextSelfAPI().then((response)=>{
      if(response.code===200)
      setlist(response.message)
      else{
        message.error("获取文章失败")
      }
    })
  },[])
  const changeToReadPage=(item)=>{
    navigate(`/ReadPage/${item.BBSID}`)
  }
  return (
  <List
    itemLayout="vertical"
    size="large"
    style={{cursor: "pointer" ,backgroundColor:"#ffffff"}}
    pagination={{
      onChange: (page) => {

      },
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
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
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
)};

export default PersonList;