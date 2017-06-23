<template lang="pug">
.fileList
  el-table.disk-table(v-bind:data='fileList',height='500')
    el-table-column(label='文件名',min-width='120')
      template(scope="scope")
        div.filename(v-if='scope.row.isdir == 0')
          span {{scope.row.server_filename}}
        div.foldername(v-if='scope.row.isdir == 1')
          el-button(type='text',@click='changefilepath(scope.row)')
            | {{scope.row.server_filename}}
        div.option-buttons
          el-dropdown(type='text',split-button,@click='openDownLinks(scope.row)',@command="downloadCommand", trigger="click") 下载
            el-dropdown-menu(slot="dropdown")
              el-dropdown-item(command='m4s') 发送到坐骑
          el-button(type='text',icon='more',@click='fileProperty(scope.row)')
    el-table-column(label='大小',min-width='28')
      template(scope="scope")
        | {{transeSize(scope.row)}}
    el-table-column(label='修改日期',min-width='40')
      template(scope="scope")
        | {{transeTime(scope.row.server_mtime)}}
  .dialog
    el-dialog(v-model='dialogDL',title='下载链接')
      div(v-for='item in downlinks')
       p {{item.name}}
       ul
         li(v-for='url in item.urls')
           a(v-bind:href='url',target='_blank',rel="noreferrer") 链接
    el-dialog(v-model='dialogProP',title='文件属性')
      p 文件名： {{curFile.server_filename}}
      p 文件大小： {{transeSize(curFile)}}
      p(v-if='curFile.isdir==1') 是否有子目录： {{curFile.dir_empty==0}}
      p 修改时间： {{transeTime(curFile.server_mtime)}}
      p(v-if='curFile.isdir==0') 文件MD5： {{curFile.md5}}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'filelist',
  data () {
    return {
      dialogDL:false,
      dialogProP:false,
      downlinks:[],
      curFile:{},
    }
  },
  computed:{
    ...mapGetters ({
      fileList:'filelist',
      downlinksObj:'downlinks'
    })
  },
  methods:{
    changefilepath:function(file){
      this.$router.push({path:"/disk",query:{path:file.path}});
      this.$store.dispatch('changepath',file.path);
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
      this.$store.dispatch('downfiles',{});
      this.$store.dispatch('downfiles',file);
    },
    downloadCommand(cmd){
      this.$msgbox({message:'开发中。。。',confirmButtonText:'好吧..'});
    },
    transeSize:function(file){
      if (file.isdir == 1) {
        return '--';
      }else{
        return this.utils.transeSize(file.size);
      }
    },
    transeTime:function(mtime){
      return this.utils.transeTime(mtime);
    }
  },
  watch: {
    downlinksObj(){
      this.parseDownLinks(this.downlinksObj);
    }
  }

}
</script>

<style scoped>
@import './css/filelist.css';
</style>