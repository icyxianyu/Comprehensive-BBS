import React ,{useEffect,useState,useRef} from 'react'
import {commentmusic,commentLike,commentHot,commentNew} from "#/utils/music"
import PubSub from "pubsub-js"
import {message,Avatar, Image ,Button,Modal,Spin} from "antd"
import {LikeFilled, LikeOutlined } from '@ant-design/icons';
export default function Comments() {
    const Ref=useRef();
    const [commentsNew,setcommentnew]=useState([]);
    const [hot,sethot]=useState([]);
    const [musicId,setid]=useState();
    const [total,settotal]=useState();
    const [visible,setvisible]=useState(false);
    const [loading,setloading]=useState(false);
    const [loadingmore,setloadmore]=useState(false);
    const [length,setlength]=useState(0);
    const [commentall,setall]=useState([]);
    const [hasmore,sethasmore]=useState(true);
    const [ishot,setishot]=useState(false);
    const getMoreHot=()=>{
        setvisible(true);
        setloading(true);
        setishot(true);
        commentHot(musicId,0,20,length).then((item)=>{
            setall(item.hotComments);
            setloading(false);
        })
    }
    const getMore=()=>{
        setvisible(true);
        setloading(true);
        setishot(false);
        commentNew(musicId,0,20,length).then((item)=>{
            setall(item.comments);
            setloading(false);
        })
    }
    const handleCancel=()=>{
        setvisible(false);
        setlength(0);
        setall([]);
        sethasmore(true);
        setloadmore(true);
    }
    useEffect(()=>{
        PubSub.subscribe("musicID",(_,value)=>{
            setid(value);
            commentmusic(value,20).then((item)=>{
                if(item.code===200){
                    setcommentnew(item.comments);
                    sethot(item.hotComments);
                    settotal(item.total);
                }
                else{
                    message.error("发生未知错误")
                }
            })
        })
        return function(){
            PubSub.unsubscribe("musicID");
          }
    })
    const changeWheel=()=>{
        if(Ref.current&&hasmore){
            const clientHeight = Ref.current.clientHeight;
            const scrollTop = Ref.current.scrollTop;
            const scrollHeight = Ref.current.scrollHeight;
            if (clientHeight + scrollTop === scrollHeight&&!loadingmore) {
                    setloadmore(true);
                    if(ishot)
            	commentHot(musicId,0,20,(length+1)*20).then((item)=>{
                    if(item.hasMore){
                        setlength(length+1);
                        setall([...commentall,...item.hotComments]);
                        setloading(false);
                        setloadmore(false);
                    }else{
                        sethasmore(false);
                    }
                })
                    else
                commentNew(musicId,0,20,(length+1)*20).then((item)=>{
                        if(item.more){
                            setlength(length+1);
                            setall([...commentall,...item.comments]);
                            setloading(false);
                            setloadmore(false);
                        }else{
                            sethasmore(false);
                        }
                    })

            }
    }
    }
  return (
    <div className="comment-container">
        <h1 className="title-all">全部评论{total}</h1>
        <div className="comment-all hot">
            <CommentList item={hot} musicId={musicId}></CommentList>
        </div>
        <div className="bottom-hot">
             <Button onClick={getMoreHot} type="primary" className="bottom">点击查看更多热评</Button>
        </div>
        <div className="comment-all new ">
            <CommentList item={commentsNew} musicId={musicId}></CommentList>
        </div>
        <div className="bottom-hot">
             <Button onClick={getMore} type="primary" className="bottom">点击查看更多评论</Button>
        </div>
        <Modal 
            title="评论" 
                    visible={visible}
                    onCancel={handleCancel}
                    maskClosable={false}
                    footer={null}
                    >
                       <Spin spinning={loading}>
                    <div ref={Ref} style={{height:'80vh',overflow:'auto'}}
                        onWheel={changeWheel}
                        >
                       <CommentList item={commentall} musicId={musicId} 
                       ></CommentList>
                       </div>

                    </Spin>
        </Modal>

    </div>

  )
}
function Liked(props){
    const [liked,setlike]=useState(false);
    const [likecount,setcount]=useState();
    useEffect(()=>{
        setlike(props.item.liked);
        setcount(props.item.likedCount);
    },[props])
    const sendLike=(id,like,status)=>{
        like=like?0:1
        commentLike(props.musicId,id,like,status).then((item)=>{
            if(item.code===200){
                setlike(!liked)
                setcount(likecount+(like==0?-1:1))
            }
        })
    }
    return(
        <div className="like" onClick={
            ()=>sendLike(props.item.commentId,liked,props.item.status)}>
            <span>
            {liked?<LikeFilled/>:<LikeOutlined/>}
            {likecount}</span>
        </div>
    )
}
function CommentList(props){
    const [comments,setcomments]=useState([]);
    useEffect(()=>{
        setcomments(props.item);
    },[props])
return (
    comments.map((item)=>{
        return (
            <div className="commentbox" key={item.commentId}>
                <div className="commentAvatar">
                    <Avatar 
                        size="large"
                        src={<Image src={item.user.avatarUrl}/>}
                    />
                </div>
                <div className="comment">
                    <span className="nickname">{item.user.nickname}:</span>
                    <span className="comment-main">{item.content}</span>
                    <div className="time-like">
                        <div className="time">{item.timeStr}</div>
                        <Liked item={item} musicId={props.musicId}></Liked>
                    </div>
                </div>
            </div>
        )
    })
)
}
