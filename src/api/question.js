import instance from '@/utilis/request.js';
function getQuestion(params){
    return instance({
        url:"/question/list",
        method:"get",
        params,
    })
}
function switchStatus(data){
    return  instance({
          url:'/question/status',
          method:"post",
          data,
        })
  }
function removeQuestion(data){
    return  instance({
          url:'/question/remove',
          method:"post",
          data,
        })
  }
export {getQuestion,switchStatus,removeQuestion};