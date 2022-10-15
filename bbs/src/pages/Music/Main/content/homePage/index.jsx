import React ,{useEffect,useState} from 'react'
import {recommendResource,homepageDragonBall,banner} from "#/utils/music";
import {useNavigate } from "react-router-dom";
import Banner from "./banner"
export default function HomePage() {
    const navigate=useNavigate();
    const [msg,setmsg]=useState([]);
    const [musicdaily,setdaily]=useState([]);
    const [daily,setmusicdaily]=useState();
    const [bannerList,setBanner]=useState([]);
    useEffect(()=>{
        homepageDragonBall().then((item)=>{
            const temp=item.data.filter((item)=>{
                return item.id<0;
            })
            temp.forEach((item)=>{
                if(item.id===-1){
                    setmusicdaily(item)
                    recommendResource().then((item)=>{
                        if(item.code===200)
                        setdaily(item.recommend)
                    })
                }
            })
        })
    },[])
    useEffect(()=>{
        banner().then((item)=>{
            if(item.code===200){
                setBanner(item.banners);
            }
        })
    },[])
  return (
    <div className="homePage">
            <Banner List={bannerList}></Banner>
            <h1 style={{fontWeight:'bold'}}>歌单推荐</h1>
            <div className="recomend">
                <div className="recomend-one" onClick={()=>{navigate(`/musicPage/Main/Playlist/daily`)}}>
                    <div className="imgbox">
                        <img className="img daily" src={daily?.iconUrl}></img>
                        <div className="coverBox"></div>
                    </div>
                    <div>{daily?.name}</div>
                </div>
            {
                musicdaily.map((item)=>{
                    return (
                    <div className="recomend-one" key={item.id} onClick={()=>{navigate(`/musicPage/Main/Playlist/${item.id}`)}}>
                        <div className="imgbox">
                                <img src={item.picUrl} className="img"></img>
                        </div>
                            <div>{item.name}</div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
