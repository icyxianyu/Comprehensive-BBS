import React,{useEffect,useState} from 'react'
import PubSub from "pubsub-js"
import {message} from 'antd'
import {userAccount,likelist} from "#/utils/music";
import { Layout } from 'antd';
import HeaderInfo from "./header"
import FooterInfo from "./footer"
import MainMusic from "./content"
import {useLocation} from "react-router-dom"
const { Header,Content } = Layout;
export default function MusicMain() {
const path=useLocation();
  useEffect(()=>{
    userAccount().then((item)=>{ //获取用户信息
      if(item.code===200){
        PubSub.publish("PersonInfo",item.profile); //全部信息
        PubSub.publish("ID",item?.profile?.userId) //用户ID;
        likelist(item?.profile?.userId).then((item)=>{
          if(item.code===200){
              let like=new Set(item.ids);
              PubSub.publish("likelist",like)
          }
        })
      }
        else 
        message.info("网络有问题或登录信息过期，请稍后再试")
    });
  },[path])

  return (
    <>
    <Layout style={{marginBottom:"50px"}}>
      <Header style={{backgroundColor:"#242424",height:"40px",display:"flex"}}>
        <HeaderInfo></HeaderInfo>
      </Header>
      <Content>
        <MainMusic></MainMusic>
      </Content>
    </Layout>
      <FooterInfo></FooterInfo>
      </>
  )
}
