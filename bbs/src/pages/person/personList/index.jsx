import { LikeOutlined,
   MessageOutlined,
    StarOutlined,
    EyeOutlined,
    CheckOutlined,
    BookOutlined,
    ContactsOutlined} from '@ant-design/icons';
import { Avatar,Tag,
   List, message,
    Space,Col,Row ,
    Card,Statistic,
    Segmented,Skeleton,
  Modal} from 'antd';
import {useEffect,useState} from "react"
import React from 'react';
import {useNavigate,useParams} from "react-router-dom"
import {searchtext,textGetData,searchcollection,followMsg} from '#/utils/axios'
import {Color,imageurl} from "#/constant"
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Info=["文章","收藏"];
const PersonList = () =>{
  const {PersonID} =useParams();
const [list,setlist]=useState([]);
const [data,setdata]=useState({});
const navigate=useNavigate();
const [isloading,setloading]=useState(false);
const [followarr,setfollow]=useState([]);
const [follownum,setfollnum]=useState();
const [visible,setvisible]=useState(false);
const getdata= (response)=>{
  if(response.code===200)
  setlist(response.message)
  else{
    message.error("获取文章失败")
  }
  setTimeout(()=>
  setloading(false)
  ,100)
}
  useEffect(()=>{
    setloading(true)
    searchtext(PersonID).
    then((response)=>{getdata(response)});
  },[PersonID])
  useEffect(()=>{
    textGetData(PersonID).then((response)=>{
        if(response.code===200){
          setdata(response.data)
        }
        else{
          message.error("")
        }
    })
  },[PersonID])
  useEffect(()=>{
    followMsg(PersonID).then((response)=>{
      if(response.code===200){
        setfollnum(response.number);
        setfollow(response.msg)
      }
    })
  },[PersonID])
const changeToReadPage=(item)=>{
    navigate(`/ReadPage/${item.BBSID}`)
  }
const changetips=(e)=>{
  setloading(true)
if(e==="文章"){
  searchtext(PersonID).
  then((response)=>{getdata(response)});
}else{
  searchcollection(PersonID).
  then((response)=>{getdata(response)});
}
}
const handleCancel=()=>{
  setvisible(false)
}
const changeModal=()=>{
  if(follownum===0){
    message.info("还没有关注")
    return ;
    }
  setvisible(true)
}
  return (
    <Row>
      <Col span={6} offset={2}>
      <Card title="个人数据" 
      style={{width:'90%',borderRadius:"10px"}}
      >
          <Row style={{userSelect:'none'}}>
          <Col span={12} style={{cursor: "pointer"}} onClick={changeModal}>
              <Statistic title="关注" value={follownum} prefix={<ContactsOutlined />}  />
          </Col>
          <Col span={12}>
            <Statistic title="粉丝" value={200} prefix={<CheckOutlined />} />
            </Col>
          <Col span={12}>
            <Statistic title="点赞数" value={data.Likes} prefix={<LikeOutlined />} />
            </Col>
            <Col span={12}>
              <Statistic title="文章查看数" value={data.haveSeen} prefix={ <EyeOutlined />} />
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
         <Skeleton active avatar={true} loading={isloading}>
       <List
        itemLayout="vertical"
        size="large"
        style={{cursor: "pointer" ,backgroundColor:"#ffffff"}}
        pagination={{
          pageSize: 5,
        }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            onClick={()=>changeToReadPage(item)}
            className="list-item-person"
            actions={[
              <IconText icon={StarOutlined} text={item.collection} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={item.Likes} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
            ]}
            extra={
              <Message item={item}/>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={`${imageurl}${item.avatar}`} />}
              title={<b>{item.Title}</b>}
              description={item.Username}
            />
            {item.Mainmini}
          </List.Item>
        )}
      />
      </Skeleton>
      </Col>
      <Modal 
        opentitle="关注列表" 
        visible={visible}
        onCancel={handleCancel}
        maskClosable={true}
        footer={null}>
          <div style={{border: '1px solid #ccc',marginTop: '10px'}}>
              {
                followarr.map(item=>(
                  <div key={item.PersonID}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                  onClick={()=>{
                    navigate(`/personPage/${item.PersonID}`);
                    setvisible(false) }}><Avatar src={`${imageurl}${item.avatar}`} /> {item.Username}</div>
                  ))}
              </div>
        </Modal>
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
          <div style={{margin:"auto",textTransform:"capitalize",}}>
          {title}
          </div>
        </Tag>
  )
}
