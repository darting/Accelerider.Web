import axios from 'axios';
import qs from 'qs';

class M4sAPI {
  constructor() {
    this.$ajax = axios.create({
      baseURL: 'http://api.usmusic.cn/cloud',
      headers: {}
    });
    this.$ajax.interceptors.response.use(
      (config) => { return config },
      (err) => {
        let msg = '';
        if (err.response) { msg = err.response.data.message }
        else { msg = err.message }
        throw new Error(msg);
      }
    );
  }
  filelist(token, path) {
    const url = '/filelist';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
      .then(response => response.data.list)
      .then(list => list.map(i => {
        i.filename = i.fileName;
        i.isdir = i.dir;
        return i; }));
  }
  upload2m4s(token, path, md5, size) {
    const url = '/upload';
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        path: path
      },
      data: qs.stringify({
        totalMd5: md5,
        silceMd5: md5,
        size: size
      })
    })
      .then(response => response.data);
  }
  createFolder(token, path) {
    const url = '/cFolder';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
      .then(response => response.data);
  }
  copyFile(token, from, to) {
    const url = '/copy';
    return this.$ajax({
      method: 'POST',
      url: url,
      params: { token: token },
      data: qs.stringify({
        from: from,
        to: to
      })
    })
      .then(response => response.data);
  }
  deletefile(token, path) {
    const url = '/delete';
    return this.$ajax({
      method: 'GET',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
      .then(response => response.data);
  }
  downfiles(token, path) {
    const url = 'filelink';
    return this.$ajax({
      method: 'POST',
      url: url,
      params: {
        token: token,
        path: path
      }
    })
      .then(response => response.data)
      .then(data => {
        if (data.links) {
          return data.links;
        } else {
          throw new Error(data.message);
        }
      });
  }
}

export default M4sAPI;