import instance from '@/utilis/request.js';
function addBus(data){
    return instance({
        url:"/enterprise/add",
        method:"post",
        data,
    })
}
function editBus(data){
    return instance({
        url:"/enterprise/edit",
        method:"post",
        data,
    })
}

export {addBus,editBus,};