import instance from '@/utilis/request.js';


function getPhoneCode(data){
  return  instance({
        url:'/sendsms',
        method:"post",
        data:data,
      })
}

function userRegister(data){
    return instance({
        url:"/register",
        method: "post",
        data,
    })
}




export {userRegister};

export {getPhoneCode};