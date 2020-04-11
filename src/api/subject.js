import instance from '@/utilis/request.js';
function sujectSeach(params){
    return  instance({
          url:'/subject/list',
          method:"get",
          params,
        })
  }
  export {sujectSeach};