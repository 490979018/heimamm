import instance from '@/utilis/request.js';
function addUser(data){
    return instance({
        url:"/user/add",
        method:"post",
        data,
    })
}
function editUser(data){
    return instance({
        url:"/user/edit",
        method:"post",
        data,
    })
}

export {addUser,editUser,};