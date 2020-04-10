import instance from '@/utilis/request.js';
function getUserInfo(params){
    return  instance({
          url:'/info',
          method:"get",
          params,
        })
  }
function exitLogin(params){
    return  instance({
          url:'/logout',
          method:"get",
          params,
        })
  }
  export {getUserInfo,exitLogin};