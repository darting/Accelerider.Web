<template lang="pug">
.fileList
  el-table.disk-table(v-bind:data='fileList',height='600')
    el-table-column(label='文件名',min-width='100')
      template(scope="scope")
        div.filename(v-if='scope.row.isdir == 0')
          span {{scope.row.server_filename}}
        div.foldername(v-if='scope.row.isdir == 1')
          el-button(type='text',@click='changefilepath(scope.row)')
            | {{scope.row.server_filename}}
        div.option-buttons
          el-button(type='text',icon='arrow-down',@click='openDownLinks(scope.row)')
          el-button(type='text',icon='more',@click='fileProperty(scope.row)')
    el-table-column(label='大小',min-width='30')
      template(scope="scope")
        | {{transeSize(scope.row)}}
    el-table-column(label='修改日期',min-width='50')
      template(scope="scope")
        | {{transeTime(scope.row.server_mtime)}}
  .dialog
    el-dialog(v-model='dialogDL',title='下载链接')
      div(v-for='item in downlinks')
       p {{item.name}}
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
import Utils from '../libs/utils.js';
let utils = new Utils();
export default {
  name: 'filelist',
  props:{
    pre_:''
  },
  data () {
    return {
      fileList:[],
      dialogDL:false,
      dialogProP:false,
      downlinks:[],
      curFile:{},
    }
  },
  methods:{
    changefilepath:function(file){
      this.Bus.$emit(`${this.pre_}changepath`, file);
    },
    fileProperty:function(file){
      this.curFile = file;
      this.dialogProP = true;
    },
    parseDownLinks:function(links){
      this.dialogDL = true;
      this.downlinks = [];
      for(let key in links){
        let obj ={
          "name":decodeURIComponent(key),
          "urls":links[key]
        };
        this.downlinks.push(obj);
      }
    },
    openDownLinks:function(file){
      this.Bus.$emit(`${this.pre_}downfiles`, file);
    },
    transeSize:function(file){
      if (file.isdir == 1) {
        return '--';
      }else{
        return utils.transeSize(file.size);
      }
    },
    transeTime:function(mtime){
      return utils.transeTime(mtime);
    }
  },
  created(){
    this.Bus.$on(`${this.pre_}showdownlinks`,links=>{
      this.parseDownLinks(links);
    });
    this.Bus.$on(`${this.pre_}showfilelist`,fl=>{
      this.fileList = fl;
    });
  }
}
</script>

<style scoped>
@import './css/filelist.css';
</style>