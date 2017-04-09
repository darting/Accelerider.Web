import axios from 'axios';
import MD5 from './cryptos.js';

class M4API{
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.pescn.top/',
      headers: {}
    });
  }
  signup(username,password,callback) {
    const url="/signup";
    this.$ajax({
      method: 'POST',
      url: url,
      params: { "security": "md5" },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
        }
        return ret
      }],
      data: {
        "name": encodeURIComponent(username),
        "password": MD5(password).toString()
      }
    })
    .then(response =>callback(response.data))
    .catch(err=>{
      if(err.response){
        callback(err.response.data);
      }else{
        console.log('Error',err.message)
      }
    });
  }
  login(username,password,callback) {
    const url="/login";
    this.$ajax({
      method: 'POST',
      url: url,
      params: { "security": "md5" },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
        }
        return ret
      }],
      data: {
        "name": encodeURIComponent(username),
        "password": MD5(password).toString()
      }
    })
    .then(response =>callback(response.data))
    .catch(err=>{
      if(err.response){
        callback(err.response.data);
      }else{
        console.log('Error',err.message)
      }
    });
  }
  _userinfo(token,uk) {
    const url='/userinfo';
    return this.$ajax({
      method:'GET',url:url,
      params:{token:token, uk:uk} 
    })
    .then(data => {
      data = data.data;
      let info = {}
      info.uk = uk;
      info.Name = data.username;
      info.nick_name = data.nick_name;
      info.total = data.total;
      info.free = data.free;
      info.used = data.used;
      return info;
    })
  }
  userlist(token,callback) {
    const url='/userlist';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { token: token }
    })
    .then(response => {
      let data = response.data;
      callback(data);
      if (data.userlist.length != 0) {
        data.userlist.map(item => {
        item.Name = unescape(item.Name.replace(/\\u/g, "%u"));
        item.Token = token;
        });
      }
      return data.userlist;
    })
    .then(data => data.map(item => this._userinfo(token,item.Uk)))
    .catch(err => {
      if (err.response) {
        callback(err.response.data);
      } else {
        console.log('Error', err.message)
      }
    });
  }
  filelist(token,uk,path,callback) {
    const url='/filelist';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        uk: uk,
        path: encodeURIComponent(path)
      }
    })
    .then(response => response.data.list)
    .catch(err => {
      if (err.response) {
        callback(err.response.data);
      }else{
        console.log('Error',err.message)
      }
    });
  }
  downfiles(token, uk, files) {
    const url = '/filelinks';
    const FILESIZE_30M = 30*1024*1024;
    const method = "APPID";// file.size>FILESIZE_30M ? "DEFAULT" : "APPID";
    let file = {
      "path":encodeURIComponent(files.path),
      "id": files.fs_id
    };
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        uk: uk,
        method: method
      },
      transformRequest: [function (data) {
        let ret = '';
        for (let it in data) { ret += `${it}=${data[it]}` }
        return ret;
      }],
      data: {
        "files": `[${JSON.stringify(file)}]`
      }
    })
    .then(response => response.data)
    .catch(err => {
      if (err.response) {
        let data = err.response.data;
        callback(data.errno,data);
      }else{
        console.log('Error',err.message)
      }
    });
  }
}

export default M4API;