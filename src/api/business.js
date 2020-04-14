import instance from '@/utilis/request.js';
function busList(params){
    return instance({
        url:"/enterprise/list",
        method:"get",
        params,
    })
}
function switchStatus(data){
    return instance({
        url:"/enterprise/status",
        method:"post",
        data,
    })
}
function remove(data){
    return instance({
        url:"/enterprise/remove",
        method:"post",
        data,
    })
}
export {busList,switchStatus,remove};