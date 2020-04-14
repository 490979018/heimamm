import instance from '@/utilis/request.js';
function addSub(data){
    return instance({
        url:"/subject/add",
        method:"post",
        data,
    })
}
function editSub(data){
    return instance({
        url:"/subject/edit",
        method:"post",
        data,
    })
}
export {addSub,editSub};