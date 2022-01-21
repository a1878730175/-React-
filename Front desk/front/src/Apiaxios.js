import axios from "axios";
function apiGet(url, callback) {
  const token = localStorage.getItem('X-Token');
  axios.get(url, { headers: { 'X-Token': `${token}` } })
    .then(resp => {
      callback(resp)
    })
}
function apiPost(url, data, callback) {
  const token = localStorage.getItem('X-Token');
  axios.post(url, data, { headers: { 'X-Token': `${token}` } })
    .then(resp => {
      callback(resp)
    })
}
export { apiGet, apiPost }