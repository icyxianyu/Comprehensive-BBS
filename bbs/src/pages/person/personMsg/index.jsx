import React ,{useState,useEffect,useRef} from 'react'
import {Link,useNavigate ,useParams} from "react-router-dom"
import {message, Descriptions,Tag,Col,
        Switch,Row ,Button,Modal,Form,
        Input,Radio,Tooltip,Spin} from 'antd';
import {BarsOutlined,PlusOutlined,FileAddOutlined,
      ExclamationCircleOutlined} from  '@ant-design/icons'
import {Color} from "#/constant/index.jsx"
import {changePersonInfo,isFocused,changeFocus} from "#/utils/axios"
import {nanoid} from "nanoid"
import { useCookies} from 'react-cookie';
import Chat from "./chat.jsx"
const user={
  name:"姓名",
  phone:"电话",
  sex:"性别",
  msg:"备注",
  email:"邮箱",
  tags:"个人标签"
}
export default function PersonMsg(prop) {
  const {PersonID} = useParams()
  const { confirm } = Modal;
  const [,setCookie] = useCookies(['JWT']);
  const navigate=useNavigate();
  const {msg}=prop;
  const [changtags,setTags]=useState([]);
  const [usermsg,setmsg]=useState({});
  const [tags,settags]=useState([]);
  const [visible,setvis]=useState(false);
  const handleCancel=()=>{
    setvis(false);
  }
  const setok=()=>{
    setvis(true);
  }
  const onFinish=(e)=>{
    e.usertags=changtags.join(" ");
    changePersonInfo(e).then((item)=>{
     if(item.code===200){
      message.info(item.message);
      setvis(false);
      setmsg(e);
      settags(changtags)
     }else{
       message.error(item.message);
     }
    })
  }
  const validateMessages = {
    required: '${label}是必须的',
    types: {
      number: '${label}不是一个有效数值!',
    },
  };
  const getTags =(value)=>{
    setTags(value);
  }
  const exit=()=>{
    confirm({
      title: '确定要退出吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setCookie("JWT","",{maxAge:0});
        localStorage.removeItem("PersonID");
        navigate('/loginPage');
      },
      cancelText:"取消",
      okText:"确定",
    });

  }
  useEffect(()=>{
    setmsg(msg);
    let tag=msg?.usertags?.split(" ").filter((item)=>{return item!==""})??[];
     settags(tag);
  },[prop])
  return (
    <>
    <Row>
      <Col offset={2} span={20}>
      <Row style={{backgroundColor:"#ffffff",marginTop:"10px",borderRadius:"10px"}}>
            <Col span={16} >
                <Descriptions title="个人信息" 
                style={{marginTop:10,padding:"10px"}}>
                    <Descriptions.Item label={user.name}><h4 style={{fontWeight:"bold"}}>{usermsg.Username}</h4></Descriptions.Item>
                    <Descriptions.Item label={user.phone}><h4 style={{fontWeight:"bold"}}>{usermsg.Phone}</h4></Descriptions.Item>
                    <Descriptions.Item label={user.sex}><h4 style={{fontWeight:"bold"}}>
                      {usermsg.Sex==="femail"?"女":"男"}
                    </h4></Descriptions.Item>
                    <Descriptions.Item label={user.msg}><h4 style={{fontWeight:"bold"}}>{usermsg.note}</h4></Descriptions.Item>
                    <Descriptions.Item label={user.email}><h4 style={{fontWeight:"bold"}}>{usermsg.Email}</h4></Descriptions.Item>
                    <Descriptions.Item label={user.tags}>
                    <div>
                        {
                        tags.length>0?tags.map((item)=>{
                          
                            return (<Tag key={nanoid()}
                              color={Color[Math.floor(Math.random()*Color.length)]}>
                                {item}</Tag>)
                          }):<span >无</span>
                      }
                    </div>
                    </Descriptions.Item>
                  
                </Descriptions>
            </Col>
            {localStorage.getItem("PersonID")===PersonID?
            <Col span={4} offset={4}>
              <Button style={{marginTop:'10%'}}
                onClick={setok}
                >
                <BarsOutlined />修改信息
                </Button>
                  <br/>
                  <br/>
                <Link to="/createPage">
                  <Button style={{borderRadius:"30%"}} type="primary">
                          <FileAddOutlined />创作
                  </Button>
                </Link>
                <br/><br/>
                <Button style={{borderRadius:"30%"}}danger onClick={exit}>
                      退出
                  </Button>
                          <Modal 
                  title="修改信息" 
                      visible={visible}
                      onCancel={handleCancel}
                      maskClosable={false}
                      footer={null}        
                      >
                        <Form validateMessages={validateMessages} 
                        initialValues={usermsg}
                        onFinish={onFinish}>
                            <Form.Item name={['Username']} label={user.name} rules={[{ required: true }]}>
                              <Input />
                            </Form.Item>
                            <Form.Item name={['Email']} label={user.email} rules={[{required: true  }]}>
                              <Input />
                            </Form.Item>                  
                            <Form.Item name={['Phone']} label={user.phone} rules={[{required: true  }]}>
                              <Input />
                            </Form.Item>
                            <Form.Item name={['Sex']} label={user.sex} rules={[{ type: 'sex',required: true  }]}>
                                <Radio.Group>
                                <Radio value='mail'>男</Radio>
                                <Radio value='femail'>女</Radio>
                              </Radio.Group>
                            </Form.Item>
                            <Form.Item name={['note']} label={user.msg} rules={[{ type: 'msg' }]}>
                              <Input />
                            </Form.Item>
                            标签: <Tags getTags={getTags} tags={tags}></Tags>
                            <hr></hr>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                提交
                              </Button>
                            </Form.Item>
                        </Form>
              </Modal>
          </Col>:
            <div style={{flex:1,display: 'flex',flexDirection: 'column'}}>
              <IsFocus/>
            <Chat usermsg={usermsg} PersonID={PersonID}/>
            </div>
          }
        </Row>
        </Col>
      </Row>

      </>
  )
}
const Tags = (props) => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  useEffect(() => {
    setTags(props.tags);
    console.log("sss")
  },[props.tags])
  useEffect(() => {
    props.getTags(tags);
  },[tags])
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };
  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={true}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> 新标签
        </Tag>
      )}
    </>
  );
};
const IsFocus=()=>{
  const {PersonID} = useParams()
  const [loading, setLoading]=useState(false);
  const [isFocus,setFocus] = useState(false);
  const changeFocused=()=>{
    setLoading(true)
      changeFocus(PersonID,!isFocus).then((item)=>{
        if(item.code===200){
          setFocus(item.action);
          setLoading(false);
        }
      })
  }
  useEffect(() => {
    isFocused(PersonID).then((item)=>{
      setFocus(item.isfocus);
    })
  },[])
return (         
<Col span={8} offset={8} >
  <div  style={{marginTop:"10px"}}>
    <Spin spinning={loading}>
      <Switch checkedChildren="点击取关" unCheckedChildren="点击关注" style={{width:"100%"}}
      checked={isFocus}
      onClick={changeFocused}/>
      </Spin>
    </div>
</Col>)
}
