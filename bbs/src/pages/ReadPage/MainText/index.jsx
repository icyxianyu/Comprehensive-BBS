import React from 'react'
import {Layout,Skeleton,Tag,Descriptions } from "antd"
import {Viewer} from '@toast-ui/react-editor'
import Comments from "./comments.jsx"
import {Color} from "#/constant"
const { Header,Content,Footer} = Layout;
export default function MainText(prop) {
  return (
    <Layout style={{backgroundColor:"white",}}>
            <Header style={{backgroundColor:"white" ,paddingLeft:"20px",fontWeight:"bold"}}>
                <span style={{fontSize:"30px"}}>{prop.TextInfo.Title+" "}
                </span> 
                <small>{new Date(parseInt(prop.TextInfo.TIME)).toLocaleString()}</small>
                <RandomTags tags={prop.TextInfo.Tags}/>
            </Header>
            <Content style={{padding:"20px"}}>
            <ToastViewer main={prop.TextInfo.Main}/>     

            </Content>
                <Footer
                 style={{backgroundColor:"white"}}>
                    <Comments 
                        commentsInfo={prop.TextInfo.comments}
                        BBSID={prop.TextInfo.BBSID}
                    ></Comments>
                </Footer>
    </Layout>
  )
}
function ToastViewer(viewer) {

    const {main}=viewer
    if(main!==undefined) {
        return(
            <Viewer
            initialValue={main}>    
        </Viewer>)
    }else{
        return(
            <Skeleton active/>
        )
    }

}
function RandomTags(prop){
let tags=(prop.tags??"").split(' ')
const len=Color.length;

return (
    <Descriptions >
        <Descriptions.Item>

        {tags.map((tag,index)=>
            <Tag key={index}
            color={Color[Math.floor(Math.random()*len)]}
            
            >{tag}</Tag>,
        )}
        
        </Descriptions.Item>
    </Descriptions> 
)
}