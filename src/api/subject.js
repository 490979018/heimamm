import instance from '@/utilis/request.js';
function subjectSeach(params){
    return  instance({
          url:'/subject/list',
          method:"get",
          params,
        })
  }
function switchStatus(data){
    return  instance({
          url:'/subject/status',
          method:"post",
          data,
        })
  }
function removeSubject(data){
    return  instance({
          url:'/subject/remove',
          method:"post",
          data,
        })
  }
  export {subjectSeach,switchStatus,removeSubject};