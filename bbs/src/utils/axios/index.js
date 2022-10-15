import request from "./request";

export const registerAPI=(value)=>{ //注册
    return request({
        method:"post",
        url:"/user/register",
        data:value,
    })

}
export const loginAPI=(value)=>{//登陆
    return request({
        method:"post",
        url:"/user/login",
        data:value,
    })
    
}
export const personMsg=()=>{//获取用户信息
    return request({
        method:'get',
        url:'/user/person',
    })
}
export const changePersonInfo=(value)=>{//修改用户信息
    return request({
        method:"post",
        url:"/user/change",
        data:value
    })
}
export const sendtextAPI=(value)=>{//发送文章
    return request({
        method:"post",
        url:'/text/sendtext',
        data:value,
    })
}
export const searchtextSelfAPI=()=>{//搜索文章 个人用
    return request({
        method:'get',
        url:'/text/getTextBySelfPersonID'
    })
}
export const searchTextInfoAPI=(value)=>{//获取文章
    return request({
        method:"get",
        url:`/text/searchTextInfo?BBSID=${value}`,
    })
}
export const searchLike=(value)=>{ //获取喜欢
    return request({
        method:"get",
        url:`/text/searchLike?BBSID=${value}`,
    })
}

export const changeLike=(BBSID,action)=>{ //修改是否喜欢
    return request({
        method: 'put',
        url:`/text/changeLike`,
        data:{
            BBSID,
            action
        }
    })
}

export const sendComment=(value)=>{ //发送评论
    return request({
        method: 'post',
        url:"/text/sendComment",
        data:{
            message: value
        }
    })
}
export const searchRank=(state,page)=>{//排行
    return request({
        method:'get',
        url:`/text/RankPage?state=${state}&page=${page}`
    })
}
export const searchLive=()=>{//搜索直播
    return request({
        method:'get'
    })
}