import queryString from 'query-string'

class PathManager {
  constructor(){
    //let c = window.location.hash
    //c = c.split('?')[1]
    let c = window.location.search
    this.path = queryString.parse(c).path || '/'
  }
  getPath(){ return this.path }

  getBackPath(){
    const sq = this.path.split('/');sq.pop()
    let back = '/';if(sq.length>1)back = sq.join('/')
    return back
  }

  isRoot(){ return this.path === '/' }

  pathSegmtt(){
    let rlt = [];
    const paths = this.path == '/' ? [''] : this.path.split('/');
    let cur = paths.join('/')
    while(cur != ''){
      let name = paths.pop()
      rlt.push( {name:name, path:cur} )
      cur = paths.join('/')
    }
    rlt.push({name:'全部文件',path:'/'})
    rlt.reverse()
    return rlt
  }
}

export default PathManager;