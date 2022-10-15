import request from "./request.js"

export const getLivegroup=() =>{
    return request({
        method: 'GET',
        url:"/api/streams"
    })
}