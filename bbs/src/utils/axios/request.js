import axios from 'axios';
const request =axios.create({
    // baseURL: 'http://124.221.178.123:3333/',
    baseURL:'/api',
    timeout: 5000
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use((res)=>{
    return res.data;
},(error)=>{
    console.log(error);
})


export default request