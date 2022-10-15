
import '@toast-ui/editor/dist/toastui-editor.css';
import  "@toast-ui/editor/dist/i18n/zh-cn";
import React,{useEffect, useRef, useState} from 'react'
import { PageHeader ,Button,Input, message, Tag,Spin} from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { Editor} from '@toast-ui/react-editor';
import {useNavigate} from "react-router-dom"
import { PlusOutlined } from '@ant-design/icons';
import {sendtextAPI} from "#/utils/axios/index.js"
export default function CreatePage() {
    const navigate=useNavigate();
    const [tags,setTags]=useState([])
    const Ref=useRef();
    const inputRef=useRef();
    const [spinning,setsping]=useState(false)
    const handleChange=()=>{
      setsping(true)
        const  title=inputRef.current.input.value.replaceAll(" ","");
        if(title.length===0){
            message.error('请输入标题');
            inputRef.current.focus();
            setsping(false)
            return;
        }
        const text=Ref.current.getInstance().getMarkdown();
        
        if(text.length===0){
          message.error('请输入正文');
          setsping(false);
          Ref.current.focus();
          return;
        }
        const values={
            title,
            text,
            textmini:text.slice(0,50)+"...",
            tags
        }
        sendtextAPI(values).then((response)=>{
          if(response.code===200){
            message.success(response.message+"，两秒钟后转跳回主页");
            setTimeout(()=>{
              navigate("/PersonPage")
            },2000)
          }
          else{
            message.error("发生未知错误，请稍后再试")
            setsping(false)
          }
         
        })
    }
    const getTag=(values)=>{
      setTags(values)
    }
    return (
      <Spin spinning={spinning}>
          <div>
              <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title="标题"
                subTitle={
                <Input 
                    ref={inputRef}
                    showCount maxLength={30}
                    placeholder="请输入你的标题"
                    bordered={false}></Input>
                }
                >
                <Editor
                    initialValue="文章采用markdown格式"
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    language='zh-CN'
                    useCommandShortcut={true}
                        ref={Ref}
                />
                <Tags getTag={getTag}/>
                <br></br>  
                <Button onClick={handleChange}>
                    发表
                </Button>
              

            </PageHeader>
                
      
        </div>
    </Spin>
  )
  
}

const Tags=(prop)=>{
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
      if (inputVisible) {
        inputRef.current?.focus();
      }
      prop.getTag(tags)
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags]);
  
    const handleClose = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      console.log(newTags);
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
  
    const forMap = (tag) => {
      const tagElem = (
        <Tag
          closable
          onClose={(e) => {
            e.preventDefault();
            handleClose(tag);
          }}
        >
          {tag}
        </Tag>
      );
      return (
        <span
          key={tag}
          style={{
            display: 'inline-block',
          }}
        >
          {tagElem}
        </span>
      );
    };
  
    const tagChild = tags.map(forMap);

    return (
      <>
        <div
          style={{
            marginBottom: 16,
          }}
        >
        标签:{tags.length===0?'无':""}
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
            }}
            onEnd={(e) => {
              if (e.type === 'appear' || e.type === 'enter') {
                e.target.style = 'display: inline-block';
              }
            }}
            leave={{
              opacity: 0,
              width: 0,
              scale: 0,
              duration: 200,
            }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{
              width: 78,
            }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={showInput} className="site-tag-plus">
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    );
}
