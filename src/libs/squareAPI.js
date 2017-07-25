import axios from 'axios';
import qs from 'qs';

class SquareAPI{
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.usmusic.cn/square',
      headers: {}
    });
  }
  filelist(number, page){
    const url = '/list';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { n: number, p:page },
    })
    .then(response => response.data.items)
    .then(data => data.message);
  }
  add2square(token, file, msg){
    const url = '/add';
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token },
      data: qs.stringify({
        md5: file.md5,
        size: file.size,
        filename: file.server_filename,
        message: msg
      })
    })
    .then(response => response.data)
    .then(data => data.message);
  }
  downfiles(md5){
    const url = '/link';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: { md5: md5 },
    })
    .then(response => response.data.links)
    .then(data => data.message);
  }
}

export default SquareAPI;