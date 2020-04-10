
function saveToken(name,val){
    window.localStorage.setItem(name,val);
  }
function getToken(name){
  return  window.localStorage.getItem(name);
}
function removeToken(name){
    window.localStorage.removeItem(name);
}

export{saveToken};
export{getToken};
export{removeToken};