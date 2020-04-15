import instance from '@/utilis/request.js';
function userSeach(params){
    return  instance({
          url:'/user/list',
          method:"get",
          params,
        })
  }
function switchStatus(data){
    return  instance({
          url:'/user/status',
          method:"post",
          data,
        })
  }
function removeUser(data){
    return  instance({
          url:'/user/remove',
          method:"post",
          data,
        })
  }
  export {userSeach,switchStatus,removeUser};