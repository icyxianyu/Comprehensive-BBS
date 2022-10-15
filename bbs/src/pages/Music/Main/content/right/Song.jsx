import React,{useEffect,useState} from 'react'
import {useNavigate,useParams ,useLocation,useSearchParams} from "react-router-dom"
import {PageHeader,Skeleton ,Table,message,Tag} from "antd"
import {playlistDetail,songUrl,recommendSongs,songDetail,album,Like} from "#/utils/music"
import {StepForwardOutlined,HomeOutlined,HeartFilled} from "@ant-design/icons"
import PubSub from "pubsub-js";
export default function Song() {
    const [loading,setloading]=useState(true)
    const { pathname } = useLocation();
    const navigate=useNavigate();
    const [params]=useSearchParams();
    const [tracks,settracks]=useState([])
    const [allmusicId,setAllID]=useState([])
    const [likelist,setlikelist]=useState(new Set())
    const {MusicID} =useParams();
    const [state,setstate]=useState({});
    const [playId,setplayId]=useState(null);
    const [playMusicId,setPlaying]=useState(null);
    const [tableParams, setTableParams] = useState({
      pagination: {
        current: 1,
        pageSize: 20,
      },
    });
    const columns = [
      {
          title: '编号',
          dataIndex: 'number',
          key: 'number',
          render:(item)=>{
            if(item.key==playMusicId)
              return(<StepForwardOutlined />)
          else
              return item.number},
        ellipsis: true,

        },{
          title:"操作",
          dataIndex:"method",
          key:"method",
          render:(item)=>{
            let color;
            let islike=likelist.has(item.id)
            if(islike){
              color ="red";
            }else{
              color="#ccc";
            }
            return (
                <HeartFilled style={{color}} title={"喜欢"} onClick={()=>{like(item.id,!islike)}}/>
                )
          }
        },
      {
        title: '标题',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
      },
      {
        title: '歌手',
        dataIndex: 'singer',
        key: 'singer',
        ellipsis: true,
      },
      {
        title: '专辑',
        dataIndex: 'album',
        key: 'album',
        ellipsis: true,
      },
      {
          title: '时长',
          dataIndex: 'time',
          key: 'time',
          ellipsis: true,
      }
    ];
    const like=(id,islike)=>{
      Like(id,islike).then((item)=>{
          if(item.code===200){
            let temp=new Set(likelist);
            if(islike){
                temp.add(id);
            }else{
              temp.delete(id);
            }
            setlikelist(temp);
          }
      })
    }
    // const [column,setclo]=useState(columns) 推荐理由，有问题会影响，暂时不做处理
    const sendmusicID=(record,value)=>{
      if(!record){ 
         record=tracks[playId+value-1];
      }
       if(record.noCopyrightRcmd){
        message.error("抱歉，无音源")
        return;
       }
        songUrl(record.key).then((item)=>{
        if(item?.code===200){
        setplayId(record.number.number);
        setPlaying(record.key)
          item.data[0]=Object.assign(record,item.data[0])
        PubSub.publish("songUrl",item.data[0]);
        PubSub.publish("word",item.data[0])
        PubSub.publish("musicID",record.key);
        PubSub.publish("isPlaying",true)
        }
      })
    }

      const getRowClassName = (el, index) => {
        let className = '';
        if(el.noCopyrightRcmd) className+='no-copyright ' 
        className+= index % 2 === 0 ? "oddRow" : "evenRow";
        return className
      }
    const setplay=(item)=>{
      if(item?.code===200){
        setstate(item);
        let index=1;
        const music=[];
        let songlists=item?.playlist?.tracks||item.songs
        settracks(songlists.map((item)=>{
            music.push(item.id)
            let time=parseInt(item.dt/1000);
            let min=Math.floor(time/60);
            let second=time%60;
            // 推荐理由，有问题会影响，暂时不做处理
            // if(item.reason){
            //   let temp=[...column];
            //   temp.splice(2,0,{
            //     title:'推荐理由',
            //     dataIndex: 'reason',
            //     key: 'reason',
            //     render:(item)=>{
            //       return <small>{item}</small>
            //     }
            //   })
            //   setclo(temp);
              
            // }
            return{
                number:{number:index++,key:item.id.toString()},
                key:item.id,
                reason:item.reason,
                method:{id:item.id},
                name:item.name,
                singer:item.ar.reduce((a,b)=>{
                    return (a+"/"+b['name'])},""),
                album:item.al.name,
                time:(min>=10?min:'0'+min)+":"+(second>=10?second:'0'+second),
                noCopyrightRcmd:item.noCopyrightRcmd,
                picUrl:item.al.picUrl

            }
        }))
        setAllID(music)
        setloading(false)
      }
    } 
    const handleTableChange=(pagination)=>{
      setTableParams({
        pagination
      });
    }
    const deal=(item)=>{
      console.log(item)
      if(item?.code===200)
      setplay(item)
      else {
        message.error("错误路径");
        navigate("/musicPage")
      }
    }
    useEffect(()=>{
      setloading(true);
      setplayId(null);
      // setclo(columns) 推荐理由，有问题会影响，暂时不做处理
      if(MusicID!=='daily'){
        if(params.get('type')==='10')
          album(MusicID).then((item)=>deal(item))
        else 
        playlistDetail(MusicID).then((item)=>deal(item))
      }
        else{
          recommendSongs().then((item)=>{
            let tracks=item?.data?.dailySongs;
            let temp={};
            let playlist={};
            temp.code=item?.code
            temp.playlist=playlist;
            temp.playlist.tracks=tracks;
            temp.playlist.name="每日推荐"
            setplay(temp);
          })
        }
    },[pathname])
    useEffect(()=>{
      PubSub.subscribe("changeMusicList",(_,value)=>{    
        sendmusicID(null,value);
      })
      return function(){
        PubSub.unsubscribe("changeMusicList")
     }
    })
    useEffect(()=>{
     PubSub.subscribe("playmusic",(_,value)=>{
      songUrl(value).then((item)=>{
        if(item?.code===200){
        songDetail(value).then((aft)=>{
         if(aft.code===200){
           aft=aft.songs[0];
          let temp={
            name:aft.name,
            singer:aft.ar.reduce((a,b)=>{
                return (a+"/"+b['name'])},""),
            album:aft.al.name,
            noCopyrightRcmd:aft.noCopyrightRcmd,
            picUrl:aft.al.picUrl
          }
          item.data[0]=Object.assign(temp,item.data[0])
                  PubSub.publish("songUrl",item.data[0]);
                  PubSub.publish("word",item.data[0])
                  PubSub.publish("musicID",value);
                  PubSub.publish("isPlaying",true)
         }
        })
        }
      })
     }) 

     return function(){
       PubSub.unsubscribe("playmusic")
     }
    })
    useEffect(()=>{
      PubSub.subscribe("likelist",(_,value)=>{
          setlikelist(value);
      })
      return function (){
        PubSub.unsubscribe("likelist")
      }
    })
  return (
    <div>
        <PageHeader
        onBack={() => navigate(-1)}
        title={state?.playlist?.name}
        subTitle=<HomeOutlined style={{cursor: "pointer"}} onClick={()=>{navigate('/musicPage/Main')}}/>>
             <Skeleton active loading={loading}>
             <Table columns={columns} dataSource={tracks} size="middle"
             style={{userSelect:'none'}}
            rowClassName={getRowClassName}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
            onRow={record => {
              return {
                onDoubleClick:()=>{sendmusicID(record);}
              };
            }}
/>
            </Skeleton>
        </PageHeader>
       
    </div>
  )
}
