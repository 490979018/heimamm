import instance from '@/utilis/request.js';
function addQues(data){
    return instance({
        url:"/question/add",
        method:"post",
        data,
    })
}
function editQues(data){
    return instance({
        url:"/question/edit",
        method:"post",
        data,
    })
}

export {addQues,editQues};