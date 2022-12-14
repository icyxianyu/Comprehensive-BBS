import React from 'react'
import {useState,useEffect} from "react"
import {loginInfo} from "#/constant/index.jsx"
import {useNavigate} from "react-router-dom"
import {LockOutlined, UserOutlined ,MailOutlined,PhoneOutlined} from '@ant-design/icons';
import {Menu,Row,Col, Button, Checkbox, Form, Input,Radio, message,Spin} from "antd"
import {registerAPI,loginAPI} from "#/utils/axios"
import { useCookies } from 'react-cookie';
import HeaderInfo from './header';
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [action,setAction] =useState('login');
  const items=loginInfo.map((item)=>{
    return{
      label:item.name,
      key:item.id,
    }
  })
  const changeAction=(e)=>{
    setAction(`${e.key}`)
  }
  const changeLoding=(e)=>{
    setLoading(e)
  }
  return (
    <div>
      <Spin spinning={loading}>
        <Row>
            <Col span={12} offset={6}>
              <Menu items={items} mode="horizontal"
              defaultSelectedKeys={['login']} 
              onClick={changeAction} ></Menu>
              <FromList action={action} 
              changeLoding={changeLoding}
              changeAction={changeAction}></FromList>
            </Col>
        </Row>
        </Spin>
    </div>
  )
}

function FromList(prop){
  const [action,setAction]=useState(prop.action);
  const [,setCookie] = useCookies(['JWT']);
  const [file,setfile]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    setAction(prop.action);
  },[prop.action])

  const doLogin = (values) => {
      
      loginAPI(values).then((response) => {
          if(response.code===401
            ||
            response.code===400) 
            message.error(response.message)
          else if(response.code===200){
            message.success(response.message);
            localStorage.setItem("PersonID",response.PersonID);
            localStorage.setItem("avatar",response.avatar);
            setCookie("JWT",response.token,{maxAge:864000})
            navigate(`/personPage/${response.PersonID}`)     
          }
          else{
              message.error("??????????????????")
          }
      })
      
  };
  const getfile=(e)=>{
    setfile(e);
  }
  const doRegist = (values) => {
    if(file.length===0){
      message.info("???????????????")
      return;
    }else {
      values.avatar=file[0];
    }
    prop.changeLoding(true);
    if(values.confirmpassword!==values.password){
      message.error("???????????????")
      prop.changeLoding(false);
      return;
    }
    delete values.confirmpassword

    registerAPI(values)
    .then((response) => {
      const ans=response;
      if(ans.code===200){
        message.success(ans.message);
        setAction('login')
      }else if(ans.code===400){
        message.error(ans.message);
      }
      else{
        message.error("??????????????????")
      }
      prop.changeLoding(false);
      
    })
  };
    if(action==="login")
        return  (
          <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={doLogin}
            >
              <Form.Item
                name="usernameLogin"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="passwordLogin"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>

                  </Form.Item>
                    Forgot password
                </Form.Item>
              
              <Form.Item>
                <Button type="primary" 
                htmlType="submit" 
                className="login-form-button" 
                >
                ??????
                </Button>
              </Form.Item>
              
            </Form>
          )
    else if(action==="register")
      return(
        <>
        <HeaderInfo getfile={getfile}/>
        <Form
        name="normal_regist"
              className="regist-form"
              initialValues={{
                remember: true,
                sex:"male"
              }}
              onFinish={doRegist}>
            <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '??????????????????',
              },
            ]}
         
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="?????????" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '???????????????',
              },
            ]}
          
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="??????"
            />
          </Form.Item>
          <Form.Item
            name="confirmpassword"
            rules={[
              {
                required: true,
                message: '???????????????',

              },
            ]}
          
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="????????????"
            />
          </Form.Item>
          <Form.Item
            name="email"        
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="????????????"
            />
          </Form.Item>
          <Form.Item
            name="phone">
          <Input
              prefix={<PhoneOutlined />}
              type="phone"
              placeholder="????????????"
            />
          </Form.Item>
          <Form.Item 
            name="sex"
            label="??????"
            >
            <Radio.Group  >
              <Radio.Button value="male">???</Radio.Button>
              <Radio.Button value="female">???</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item>
                <Button type="primary" 
                htmlType="submit" 
                className="login-form-button" 
                >
                  ??????
                </Button>
        </Form.Item>
      </Form>
      </>
      )
}