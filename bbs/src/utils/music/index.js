import request from "./request"

//登良二维码
export const qrKey=()=>{
    return request({
        method: "GET",
        url:`/login/qr/key?timerstamp=${new Date().getTime()}`
    })
}

export const qrCreate=(value)=>{
    return request({
        method: "GET",
        url:`/login/qr/create?key=${value}&qrimg=true&timerstamp=${new Date().getTime()}`
    })
}
export const qrCheck=(value)=>{
    return request({
        method: "GET",
        url:`/login/qr/check?key=${value}&timerstamp=${new Date().getTime()}`
    })
}
export const loginStatus=()=>{ //判断登录状态
    return request({
        method: "GET",
        url:`/login/status`
    })
}
export const logout=()=>{
    return request({
        method: "GET",
        url:"/logout"
    })
}
export const registerAnonimous=()=>{
    return request({
        method: "GET",
        url:'/register/anonimous'
    })
}

//获取用户信息,很全，用于个人查询
export const userAccount=()=>{
    return request({
        method: "GET",
        url:'/user/account',
    })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const userSubcount=()=>{
    return request({
        method:"GET",
        url:"/user/subcount"
    })
}

//获取用户信息 使用id
export const userDetail=(value)=>{
    return request({
        method:"GET",
        url:`/user/detail?uid=${value}`
    })
}

export const userPlaylist=(value)=>{
    return request({
        method:"GET",
        url:`/user/playlist?uid=${value}&timerstamp=${new Date().getTime()}`
    })
}

export const playlistDetail=(value)=>{
    return request({
        method:"GET",
        url:`/playlist/detail?id=${value}&timerstamp=${new Date().getTime()}`
    })
}
export  const songUrl=(value)=>{
    return request({
        method: "GET",
        url:`/song/url?id=${value}`
    })
}
export const songDetail=(value)=>{
    return request({
        method: "GET",
        url:`/song/detail?ids=${value}`
    })
}
export const likelist=(value)=>{
    return request({
        method:"GET",
        url:`/likelist?uid=${value}&timerstamp=${new Date().getTime()}`
    })
}
export const Like=(id,like)=>{
    return request({
        method:"GET",
        url:`/like?id=${id}&like=${like}`
    })
}
export const lyric=(value)=>{//获取歌词
    return request({
        method:"GET",
        url:`/lyric?id=${value}`
    })
}
export const commentmusic=(value,limit)=>{//获取评论                                    
    return request({
        method:"GET",
        url:`/comment/music?id=${value}&limit=${limit}`
    })
}
export const commentHot=(value,type,limit,offset)=>{ //单独获取hot评论
    return request({
        method:"GET",
        url:`/comment/hot?id=${value}&type=${type}&limit=${limit}&offset=${offset}`
    })
}
export const commentNew=(value,type,limit,offset)=>{ //单独获取hot评论
    return request({
        method:"GET",
        url:`/comment/music?id=${value}&type=${type}&limit=${limit}&offset=${offset}`
    })
}

export const commentLike=(value,cid,t,type)=>{
    return request({
        method:"GET",
        url:`/comment/like?id=${value}&cid=${cid}&t=${t}&type=${type}`
    })
}

export const recommendResource=()=>{ //获取推荐歌单
    return request({
        method:'GET',
        url:"/recommend/resource"
    })
}
export const recommendSongs=()=>{ //获取每日歌单
    return request({
        method:'GET',
        url:"/recommend/songs"
    })
}
export const album=(value)=>{
    return request({
        method:'GET',
        url:`/album?id=${value}`
    })
}
export const homepageDragonBall=()=>{ //获取
    return request({
        method:"GET",
        url:"/homepage/dragon/ball"
    })
}
export const banner=()=>{
    return request({
        method:"GET",
        url:'/banner'
    })
}
