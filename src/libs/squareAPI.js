import axios from 'axios';
import qs from 'qs';

class SquareAPI{
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.usmusic.cn/',
      headers: {}
    });
  }
  add2square(token, file, msg){
    const url = '/square/add';
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
}

export default SquareAPI;