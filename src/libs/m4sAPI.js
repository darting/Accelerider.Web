import axios from 'axios';
import qs from 'qs';

class M4sAPI{
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.usmusic.cn/cloud',
      headers: {}
    });
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
    .then(response =>response.data.list)
    .then(data => data.message);
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
}

export default SquareAPI;