import axios from 'axios';
import qs from 'qs';

class M4sAPI{
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.usmusic.cn/cloud',
      headers: {}
    });
    this.$ajax.interceptors.response.use(
      (config)=>{return config},
      (err)=>{
        let msg = '';
        if(err.response){msg = err.response.data.message}
          else{msg=err.message}
        throw new Error(msg);
        }
      );
  }
  filelist(token, path){
    const url = '/filelist';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
    .then(response =>response.data.list);
  }
  createFolder(token, path) {
    const url = '/cFolder';
    return this.$ajax({
      method:'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
    .then(response => response.data);
  }
  deletefile(token, path) {
    const url = '/delete';
    return this.$ajax({
      method:'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
    .then(response => response.data);
  }
  downfiles(token, file) {
    const url = 'filelink';
    return this.$ajax({
      method:'POST',
      url: url,
      params: {
        token: token,
        path: file.path,
      },
    })
    .then(response => response.data);
  }
}

export default M4sAPI;