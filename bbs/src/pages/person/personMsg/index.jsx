import React ,{useState,useEffect,useRef}from 'react'
import { Descriptions,Tag  ,Col, Row ,Button,Modal,Form,Input,Radio,Tooltip} from 'antd';
import {BarsOutlined,PlusOutlined} from  '@ant-design/icons'
import {Color} from "#/constant/index.jsx"
import {changePersonInfo} from "#/utils/axios"
const user={
  name:"姓名",
  phone:"电话",
  sex:"性别",
  msg:"备注",
  email:"邮箱",
  tags:"个人标签"
}
export default function PersonMsg(prop) {
  const {msg}=prop;
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
    changePersonInfo(e)
  }
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  useEffect(()=>{
    setmsg(msg);
    let tag=msg.usertags??[];
     settags(tag);
  },[prop])
  return (
    <>
    <Row style={{backgroundColor:"#ffffff",marginTop:"10px"}}>
      <Col span={16} >
          <Descriptions title="个人信息" 
          style={{marginTop:10,padding:"10px"}}>
              <Descriptions.Item label={user.name}><h4 style={{fontWeight:"bold"}}>{usermsg.Username}</h4></Descriptions.Item>
              <Descriptions.Item label={user.phone}><h4 style={{fontWeight:"bold"}}>{usermsg.Phone}</h4></Descriptions.Item>
              <Descriptions.Item label={user.sex}><h4 style={{fontWeight:"bold"}}>{usermsg.Sex}</h4></Descriptions.Item>
              <Descriptions.Item label={user.msg}><h4 style={{fontWeight:"bold"}}>{usermsg.note}</h4></Descriptions.Item>
              <Descriptions.Item label={user.email}><h4 style={{fontWeight:"bold"}}>{usermsg.Email}</h4></Descriptions.Item>
              <Descriptions.Item label={user.tags}>
              <div>
                  {
                  tags.length>0?tags.map((item)=>{
                      return (<Tag 
                        color={Color[Math.floor(Math.random()*Color.length)]}>
                          {item}</Tag>)
                    }):<span >还没有标签，点击添加吧</span>
                }
              </div>
              </Descriptions.Item>
            
          </Descriptions>
      </Col>
      <Col span={4} offset={4}>
      <Button style={{marginTop:'10%'}}
      onClick={setok}
        >
        <BarsOutlined />修改信息
        </Button>
      </Col>

    </Row>

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
                  标签: <Tags></Tags>
                  <hr></hr>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      提交
                    </Button>
                  </Form.Item>
              </Form>
              </Modal>
      </>
  )
}


const Tags = () => {
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
            closable={index !== 0}
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