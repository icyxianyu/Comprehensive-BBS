import {message,Avatar, Button, Comment, Form, Input, List ,Space} from 'antd';
import {sendComment} from "#/utils/axios"
import React, { useState ,useEffect} from 'react';
const { TextArea} = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} 评论`}
    itemLayout="horizontal"

    renderItem={(props) =>{
      const temp={
        avatar:props.avatar,
        content:props.content,
        author:props.author,
        datetime:new Date(props.datetime).toLocaleString(),
      }
  return <Comment {...temp} personid={props.personID}/>}
}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item
    >
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        发表评论
      </Button>
    </Form.Item>
  </>
);

const Comments = (prop) => {
  const [comments, setComments] = useState(prop.commentsInfo??[]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  useEffect(()=>{
    if(prop.commentsInfo){
      setComments(JSON.parse(prop.commentsInfo));
    }
  },[prop.commentsInfo])


  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setValue('');
    sendComment(
      JSON.stringify({
        BBSID:prop.BBSID,
        message:[...comments,{
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: value,
          datetime: new Date().getTime(),
        }]
      })

    ).then((response)=>{
      if(response.code===200){
        setComments(response.data)
        message.success(response.message)
        setSubmitting(false);
      }
    })
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    < >
    <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    <hr/>

      {
        comments.length > 0 && 
        <CommentList comments={comments} />
      }

    </>
  );
};

export default  Comments