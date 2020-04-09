import instance from '@/utilis/request.js';
function userLogin(data){
    return  instance({
          url:'/login',
          method:"post",
          data:data,
        })
  }
  export {userLogin};