import axios from 'axios';
import qs from 'qs';
import MD5 from './cryptos.js';

class M4API{
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.pescn.top/',
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
  signup(username,password) {
    const url = "/signup";
    let data = {name:username,password:MD5(password).toString()}
    try { data.code = code}catch(e){}
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { security: "md5" },
      data: qs.stringify(data)
    })
    .then(response =>response.data)
    .then(data=>data.message);
  }
  vertifyco(cookies,json) { 
    const url = 'http://localhost/api/checo'
    let cookie  = cookies
    if (json) { cookie = '';
      let c = JSON.parse(cookies)
      for (let it in c) { cookie += `${it}=${c[it]};`}
    }
    return this.$ajax({
      method: 'POST',
      url: url,
      data: {cookie:cookie}
    })
    .then(response =>response.data)
  }
  binding(token, cookies) {
    const url="/binding";
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token },
      data: qs.stringify({ cookies:cookies })
    })
    .then(response =>response.data)
    .then(data=>{
      if(data.errno!=0) {throw new Error(data.message)}
      return data.errno;
    });
  }
  login(username,password) {
    const url="/login";
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { security: "md5" },
      data: qs.stringify({name:username,password:MD5(password).toString()})
    })
    .then(response =>response.data)
    .then(data=>{
      if(data.errno!=0) {throw new Error(data.message)}
      return data.token;
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
  userlist(token) {
    const url='/userlist';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { token: token }
    })
    .then(response =>response.data)
    .then(data => {
      data.userlist.map(item => {
        item.Name = unescape(item.Name.replace(/\\u/g, "%u"));
        item.Token = token;
        })
      return data.userlist;
    })
    .then(list => list.map(item => this._userinfo(token,item.Uk)))
    .catch(err => {let msg = '';
      if(err.response){msg = err.response.data.message}
        else{msg=err.message;}
      throw msg;
    });
  }
  filelist(token, uk, path) {
    const url='/filelist';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        uk: uk,
        path: path
      }
    })
    .then(response =>response.data.list);
  }
  downfiles(token, uk, files) {
    const url = '/filelinks';
    let file =files
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        uk: uk
      },
      transformRequest: [function (data) {
        let ret = '';
        for (let it in data) { ret += `${it}=${encodeURIComponent(data[it])}&` }
        return ret;
      }],
      data: {"files": JSON.stringify(file)}
    })
    .then(response => response.data);
  }
}

export default M4API;