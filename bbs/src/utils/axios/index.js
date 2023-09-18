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
export const personMsg=(value)=>{//获取用户信息
    return request({
        method:'get',
        url:`/user/person?PersonID=${value}`,
    })
}
export const isFocused=(value)=>{//是否关注
    return request({
        method:'get',
        url:`/user/isfollow?Search=${value}`
    })
}
export const changeFocus=(focus,action)=>{//修改关注
    return request({
        method:'get',
        url:`/user/changeFocus?focusID=${focus}&action=${action}`
    })
}
export const followMsg=(PersonID)=>{//关注信息
    return request({
        method:'get',
        url:`/user/followMsg?PersonID=${PersonID}`
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
export const searchtext=(value)=>{//搜索文章 根据personID的内容
    return request({
        method:'post',
        url:'/text/getTextByPersonID',
        data:{
            PersonID:value
        }
    })
}
export const searchcollection=(value)=>{//是否收藏
    return request({
        method:"post",
        url:'/text/getcollectionByPersonID',
        data:{
            PersonID:value
        }
    })
}
export const searchTextInfoAPI=(value)=>{//获取文章的内容
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
export const textGetData=(value)=>{ //获取用户的数据
    return request({
        method:"POST",
        url:"/text/getData",
        data:{
            PersonID:value}
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
export const addCollection=(BBSID)=>{ //添加收藏
    return request({
        method: 'post',
        url:`/text/addCollection`,
        data:{
            BBSID,
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