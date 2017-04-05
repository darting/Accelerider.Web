<template lang="pug">
.container
  mu-appbar.header(v-bind:title="title")
    mu-flat-button.ret-path(href='#/main',slot='left')
      | RETURN MAIN
    mu-flat-button.go-back(v-on:click='backFileList()',slot="right")
      | Back
  mu-linear-progress(v-if='isLoading')
  .content
      mu-table(v-bind:showCheckbox='false')
        mu-thead
          mu-tr
            mu-th 文件名
            mu-th 大小
            mu-th 修改日期
            mu-th 操作
        mu-tbody
          mu-tr(v-for="file in fileList" key='file.fs_id')
            mu-td
             div(v-if='file.isdir == 1')
               a(href='#/disk',v-on:click='goFileList(file.path)')
                 span {{file.server_filename}}
             div(v-if='file.isdir == 0')
               span {{file.server_filename}}
            mu-td {{transeSize(file)}}
            mu-td {{transeTime(file.server_mtime)}}
            mu-flat-button.demo-menu
              mu-icon-menu(icon='...')
                mu-menu-item(v-on:click='openDownLinks(file)',title='下载')
                mu-menu-item(v-on:click='fileProperty(file)',title='属性')
  //mu-float-button(icon='↑',v-on:click='')
  mu-dialog(v-bind:open='dialogDL',title='下载链接',@close='closeDownLinks' scrollable)
    div(v-for='item in downlinks')
     p {{item.name}}
     ul
       li(v-for='url in item.urls')
         a(v-bind:href='url') {{url}}
  mu-dialog(v-bind:open='dialogProP',title='文件属性',@close='closePropertyDia')
    p 文件名： {{curFile.server_filename}}
    p 文件大小： {{transeSize(curFile)}}
    p(v-if='curFile.isdir==1') 是否有子目录： {{curFile.dir_empty==0}}
    p 修改时间： {{transeTime(curFile.server_mtime)}}
    p(v-if='curFile.isdir==0') 文件MD5： {{curFile.md5}}
</template>

<script>
export default {
  name: 'userinfo',
  data () {
    return {
      title:'网盘',
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
    parseDownLinks:function(data){
      if(data.errno == 0){
        this.dialogDL = true;
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
      let curTitle = `网盘 ${path}`
      this.isLoading = true;
      let token = sessionStorage.getItem('accessToken');
      let uk = sessionStorage.getItem('accessUk');
      let url=`http://api.pescn.top/filelist`;
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
    backFileList:function(){
      let pathStack = this.curPath;
      let cur = '/';
      if(pathStack.length != 1){
        pathStack.pop();
        cur = pathStack.pop();
      }
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
    closePropertyDia:function(){
      this.dialogProP = false;
    },
    openDownLinks:function(file){
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
      const url = 'http://api.pescn.top/filelinks';
      let method = file.size>31457280 ? "JUMP" : "APPID";
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
          for (let it in data) {ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`}
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
    },
    closeDownLinks:function(){
      this.dialogDL = false;
    }
  },
  mounted(){
    this.goFileList('/');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  //position:fixed; top:0;
}
.demo-menu {
  display: inline-block;
  margin: 16px;
}
.ret-path.go-back{
  margin:10px;
}
</style>