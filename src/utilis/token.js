
function saveToken(name,val){
    window.localStorage.setItem(name,val);
  }
function getToken(name){
    window.localStorage.getItem(name);
}
function removeToken(name){
    window.localStorage.removeItem(name);
}

export{saveToken,getToken,removeToken};