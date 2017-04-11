import axios from 'axios';

class ShareAPI{
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.pescn.top/',
      headers: {}
    });
  }
  getsharelist(token,path) {
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
    .then(data=>{
      if(data.errno!=0) {throw new Error(data.message)}
      return data.list;
    })
    .catch(err=>{let msg = '';
      if(err.response){msg = err.response.data.message}
        else{msg=err.message}
      throw msg;
    });
  }
  getshare(shareUrl,password) {
    const url="/sharefiles";
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { "shareurl": shareUrl, "pass": password}
    })
    .then(response => response.data.token)
    .catch(err=>{let msg = '';
      if(err.response){msg = err.response.data.message}
        else{msg=err.message}
      throw msg;
    });
  }
}

export default ShareAPI;