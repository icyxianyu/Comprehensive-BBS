import React ,{useEffect,useState} from 'react'
import {message, Empty,Button, Layout,Spin,Row,Col,Modal,Form, Input ,Divider, Avatar} from "antd"
import {getLivegroup} from "#/utils/bank"
import {TeamOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom"
import {mockInfo,url} from "#/constant/index.jsx"

const {Content} = Layout;
// const url="http://localhost:8000/live";

export default function LiveMain() {
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmpty,setIsEmpty]= useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [live,setlive]=useState({});
  const begin=()=>{
    getLivegroup().then((item)=>{
      if(!item.live){
        message.info("抱歉，当前并无直播");
        setIsEmpty(true);
      }
      else{      
        setlive(item.live);
      }
      setLoading(false); 
    })
  }
  useEffect(()=>{
    begin();
  },[])
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    setLoading2(true);

    const temp=setInterval(()=>{
      getLivegroup().then((item)=>{
          if(item.live){
            if(item.live[e.name]){
              message.info("连接直播间成功");
              setTimeout(()=>{
                setIsEmpty(false)
              setIsModalOpen(false);
                clearInterval(temp);
              },2000)
            }
          }
      })
    },2000)
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout style={{marginTop:"20px"}}>
      <Spin tip="加载中..."  spinning={loading}>
      
      <Content>
      {isEmpty?<Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
           当前无人开播</span>
        }
        >
           <>
            <Button type="primary" onClick={showModal}>点击开播</Button>
          </>
        </Empty>
          :
          <>
          <h2 style={{textAlign:"center"}}>
            当前服务器直播间数量为 {Object.keys(live).length
            }
            <Button onClick={showModal} type="primary">点击开播</Button></h2>
          <Row className="RowLive" >
          {
              Object.keys(live).map((item)=>{
                return (
                  <Col key={Math.random()}  className="LiveInfoBox"
                    onClick={()=>navigate(`LiveInfo/${item}`)}>
                    <div>
                      <div className="imagebox"></div>
                    <Divider orientation="left">{live[item].publisher.stream}直播间</Divider>
                        <div>
                        <TeamOutlined />{live[item].subscribers.length}</div>
                      </div>
                    </Col>
                )
              })
          }
          {/* 以下为假数据 */}
          {/* {
              mockInfo.map((item)=>{
                return <Col key={Math.random()}  className="LiveInfoBox">
                    <div>
                      <div className="imagebox"></div>
                    <Divider orientation="left">{}直播间</Divider>
                    <div className="LiveInfo"> 
                    <Avatar/>                      
                      <div className='Person'>
                          <TeamOutlined />{0}
                        </div>
                      </div>
                      </div>
                    </Col>
              })
          } */}
        </Row>
        </>
          }
          </Content>
          </Spin>
          <Modal title="开播配置" 
              destroyOnClose={true}
                    visible={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}>
                       <Spin spinning={loading2}>
                    <Form
                    
                     name="basic"
                     onFinish={handleOk}
                     initialValues={{address:url}}>
                        <Form.Item
                          label="服务器地址：" name="address">
                          <Input disabled />
                        </Form.Item>
                        <Form.Item
                          label="您的开播房间" name="name"
                          rules={[{ required: true, message: '请输入房间号'},{
                            pattern: new RegExp(/^[A-Za-z0-9]+$/),message:"请输入数值或英文字母组合"
                          },{
                            max:10,message:"最长长度为10"
                          },{
                            min:4,message:"最短长度为4"
                          }]}>

                          <Input/>
                        </Form.Item>
                        <Form.Item
                        >
                          <small>请在OBS推流设置中填写服务器地址,并在密码处填写你的房间号</small>
                          <br></br>
                          <Button type="primary" htmlType="submit">
                              提交
                            </Button>
                          </Form.Item>
                    </Form>
                    </Spin>
                </Modal>
      </Layout>
      
  )
}