import axios from 'axios';
import {getToken,removeToken} from '@/utilis/token.js';
import {Message} from 'element-ui';
import Router from '@/router/router.js'
let instance=axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials: true
})
//拦截器
instance.interceptors.request.use(function (config) {
    // console.log('请求拦截器')
    // console.log(config)
    // config.headers.info="i have a secret"
    // config.headers.message="not tell you"
    // 在发送之前 干一些事情
    if (getToken('token')) {
        config.headers.token = getToken('token');
    }
    return config;
}, function (error) {
    // 如果请求出错了 干一些事情
    return Promise.reject(error);
});

// 注册一个相应拦截器
// 调用接口时.then方法执行之前会触发的回调函数
// 统一的进行一些处理，比如异常的错误提示
// 如果不想要额外的.data 可以在return的时候 把.data拿掉
instance.interceptors.response.use(function (response) {
    // console.log('响应拦截器')
    // console.log(response)
    // 可以对响应的值进行一些处理
    // return response;
    if(response.data.code==200){
        return response;
    }else if(response.data.code==206){
        // Message.error('token参数错误');
        Router.push('/login');
        removeToken('token');
        return Promise.reject('error');
    }
    
    
    else{
        Message.error(response.data.message);
        return Promise.reject('error');
    }
}, function (error) {
    // 可以在这里对错误进行一些处理
    return Promise.reject(error);
});

export default instance;