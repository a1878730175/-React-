import axios from "axios";
function apiGet(url,data,callback){
    const token = localStorage.getItem('X-Token');
    if(data){
        axios.get(url,data,{ headers: { 'X-Token': `${token}` } })
        .then(resp => {
          callback(resp)
        })
    }else{
        axios.get(url,{ headers: { 'X-Token': `${token}` } })
        .then(resp => {
          callback(resp)
        })
    }
}

function apiPost(url,data,callback){
    const token = localStorage.getItem('X-Token');
    if(data){
        axios.post(url,data,{ headers: { 'X-Token': `${token}` } })
        .then(resp => {
          callback(resp)
        })
    }else{
        axios.post(url,{ headers: { 'X-Token': `${token}` } })
        .then(resp => {
          callback(resp)
        })
    }
}
export {apiGet,apiPost}