import { Avatar, Button, List, Skeleton,Space,Tag,Descriptions, message,} from 'antd';
import {LikeOutlined} from "@ant-design/icons"
import React, { useEffect, useState } from 'react';
import {Color} from "#/constant"
import {searchRank} from "#/utils/axios"
import {useNavigate} from "react-router-dom"
const count = 5;
const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const App = (props) => {
  const navigate=useNavigate();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [page,setPage]= useState(0);
  const [isall,setisall]=useState(false);
  useEffect(() => {
    setInitLoading(false);
    setList(props.main);
    setData(props.main);
    setisall(false);
    setPage(0);
  },[props.main])
  const onLoadMore = () => {
    setLoading(true)
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          tags:""
        })),
      ),
    );
    searchRank(props.state,page+1)
    .then((response)=>{
      if(response.code===200){
          
        let temp=response.response;
        if(temp.length!=count){
          setisall(true)
        }
        temp=[...data,...temp]
          setData(temp);
          setList(temp)
          setLoading(false);
          setPage(page+1);
          window.dispatchEvent(new Event('resize'));
          }
      else{
          message.error("发生未知错误，请稍后再试")
      }
    })
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
       {isall?<h3>没有更多了</h3>:<Button onClick={onLoadMore}>加载更多</Button>}
      </div>
    ) : null;
      const changeToRead=(e)=>{
        navigate(`/readPage/${e}`)
      }
  return (
    <List
      header={<h3 style={{fontWeight: 'bold'}}>{props.header}</h3>}
      style={{padding:"20px",width:"45%",display:"inline-block" }}
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      split={true}
      renderItem={(item) => (

        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta onClick={()=>changeToRead(item.BBSID)}
            className="rank-list"
              style={{borderBottom: "1px solid #ccc"}}
              avatar={<Avatar src={item.picture} />}
              title={
                <>
                  <span>{item.TiTle}</span>
                  <Descriptions>
                  <Descriptions.Item>
                      {item.tags.split(" ").map((tag,index)=>
                          <Tag key={index}
                          color={Color[Math.floor(Math.random()*(Color.length-1))]}
                          >{tag}</Tag>,
                      )}
                </Descriptions.Item>
                  </Descriptions>
                  </>
                }
              description={(<>
                <div style={{display: "flex",flexDirection: "column"}}>
                    <small>{item.Mainmini}</small>
                    <IconText icon={LikeOutlined} text={item.Likes} key="list-vertical-like-o" />
                </div>
              </>)}
            />
          </Skeleton>
        </List.Item>

      )}
    />

  );
};


  
export default App;