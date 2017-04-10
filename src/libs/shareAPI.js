import axios from 'axios';

class ShareAPI{
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.pescn.top/',
      headers: {}
    });
  }
  getsharelist(token,path,callback) {
    const url = '/sharefiles';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        "token": token,
        "path": path
      }
    })
    .then(response => response.data)
    .catch(err=>{
      if(err.response){
        callback(err.response.data);
      }else{
        console.log('Error',err.message)
      }
    });
  }
  getshare(shareUrl,password,callback) {
    const url="/sharefiles";
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { "shareurl": shareUrl, "pass": password}
    })
    .then(response => response.data.token)
    .catch(err=>{
      if(err.response){
        callback(err.response.data);
      }else{
        console.log('Error',err.message)
      }
    });
  }
}

export default ShareAPI;