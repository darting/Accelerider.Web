<template lang="pug">
.disk
  el-row.path-status
    el-breadcrumb(separator=">",v-bind:replace='true')
      el-breadcrumb-item(v-for='p in parseBreadCrumb(curPath)',key = 'p')
        | {{p}}
      | Total: {{fileList.length}}
    el-button(@click='goMainForm',icon='menu') MAIN
    el-button(@click='backFileList',icon='arrow-left') BACK
  .disk-table
    el-table(v-bind:data='fileList',v-loading="isLoading")
      el-table-column(label='文件名')
        template(scope="scope")
          div(style="float: left",v-if='scope.row.isdir == 0',v-bind:style={cursor:'default'})
            span {{scope.row.server_filename}}
          div(style="float: left",v-if='scope.row.isdir == 1')
            el-button(type='text',@click='goFileList(scope.row.path)',v-bind:style={cursor:'pointer'})
              | {{scope.row.server_filename}}
          div(style="float: right")
            el-button(type='text',icon='arrow-down',@click='openDownLinks(scope.row)')
            el-button(type='text',icon='more',@click='fileProperty(scope.row)')
      el-table-column(label='大小')
        template(scope="scope")
          | {{transeSize(scope.row)}}
      el-table-column(label='修改日期')
        template(scope="scope")
          | {{transeTime(scope.row.server_mtime)}}
  .dialog
    el-dialog(v-model='dialogDL',title='下载链接')
      div(v-for='item in downlinks')
       p {{curFile.server_filename}}
       ul
         li(v-for='url in item.urls')
           a(v-bind:href='url',target='_blank') 链接
    el-dialog(v-model='dialogProP',title='文件属性')
      p 文件名： {{curFile.server_filename}}
      p 文件大小： {{transeSize(curFile)}}
      p(v-if='curFile.isdir==1') 是否有子目录： {{curFile.dir_empty==0}}
      p 修改时间： {{transeTime(curFile.server_mtime)}}
      p(v-if='curFile.isdir==0') 文件MD5： {{curFile.md5}}
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'webdisk',
  data () {
    return {
      isLoading:true,
      curPath:[],
      fileList:[],
      dialogDL:false,
      dialogProP:false,
      downlinks:[],
      curFile:{},
    }
  },
  methods:{
    parseBreadCrumb:function(pathStack){
      let path = '全部文件';
      if(pathStack.length > 1){
        path = pathStack[pathStack.length-1];
      }
      path=path.split('/');
      path[0] = '全部文件';
      return path;
    },
    parseDownLinks:function(data){
      if(data.errno == 0){
        let links = data.links;
        for(let key in links){
          let obj ={
            "name":decodeURIComponent(key),
            "urls":links[key]
          };
          this.downlinks.push(obj);
        }
      }else{
        console.log('errno',data.errno);
      }
    },
    goFileList:function(path){
      let curTitle = `网盘 ${path}`;
      this.downlinks = [];
      this.isLoading = true;
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
      const url='/filelist';
      this.$ajax({
        method:'GET',
        url:url,
        params:{
          token:token,
          uk:uk,
          path:encodeURIComponent(path)
        }
      })
      .then(response=>response.data)
      .then(data=>data.list)
      .then(list=>{
        this.title = curTitle;
        this.curPath.push(path);
        this.isLoading = false;
        this.fileList = list;
      })
      .catch(error=>{
        let edata = error.response.data;
        let errno = edata.errno;
        console.log(edata.message);
      });
    },
    goMainForm:function(){
      Bus.$emit('gomain','back');
    },
    backFileList:function(){
      let pathStack = this.curPath;
      let cur = '/';
      if(pathStack.length > 1){
        pathStack.pop();
      }
      cur = pathStack.pop();
      this.goFileList(cur);
    },
    transeSize:function(file){
      if(file.isdir == 1){
        return '--';
      }else{
        let k = 1024;
        let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let size = file.size;
        let i = Math.floor(Math.log(size) / Math.log(k));
        return `${(size / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
        //return `${(size / Math.pow(k, i)).toPrecision(5)} ${sizes[i]}`;
      }
    },
    transeTime:function(mtime){
      let newDate = new Date();
      newDate.setTime(mtime * 1000); 
      return newDate.toLocaleString();
    },
    fileProperty:function(file){
      this.curFile = file;
      this.dialogProP = true;
    },
    openDownLinks:function(file){
      this.curFile = file;
      this.downlinks = [];
      this.dialogDL = true;
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
      const url = '/filelinks';
      const FILESIZE_30M = 30*1024*1024;
      const method = "APPID";// file.size>FILESIZE_30M ? "DEFAULT" : "APPID";
      let f = {
        "path":encodeURIComponent(file.path),
        "id": file.fs_id
      };
      this.$ajax({method:'POST',
        url:url,
        params:{
          token:token,
          uk:uk,
          method:method
        },
        transformRequest:[function(data){
          let ret = '';
          for (let it in data) {ret += `${it}=${data[it]}`}
          return ret;
        }],
        data:{
          "files":`[${JSON.stringify(f)}]`
        }
      })
      .then(response=>response.data)
      .then(data=>{
        this.parseDownLinks(data);
      })
      .catch(err=>{
        if(err.response){
          let edata = err.response.data;
          console.log(edata.message);
        }else{console.log(err)}
      });
    }
  },
  mounted(){
    this.goFileList('/');
  }
}
</script>