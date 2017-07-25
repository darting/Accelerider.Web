<template lang="pug">
.fileList
  el-table.disk-table(v-bind:data='fileList', style='width:100%')
    el-table-column(type='selection')
    el-table-column(label='文件名',show-overflow-tooltip,min-width='200')
      template(scope="scope")
        el-col(v-bind:span='19').file-name
          img.fileicon(v-bind:src='fileTypeUri(scope.row)',height=20)
          span(v-bind:class="scope.row.isdir == 1? 'open-enable': 'normal'", @click='changefilepath(scope.row)')
              | {{scope.row.server_filename}}
    el-table-column(label='操作',show-overflow-tooltip,width='100')
      template(scope="scope")
        el-dropdown(type='text',split-button,@click='openDownLinks(scope.row)', trigger="click") 下载
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(@click.native.prevent='downloadFromM4s(scope.row)') 发送到坐骑下载
            el-dropdown-item(@click.native.prevent='add2square(scope.row)') 添加到文件广场
            el-dropdown-item(@click.native.prevent='fileProperty(scope.row)') 属性
            el-dropdown-item(@click.native.prevent='deleteFile(scope.row)') 删除
    el-table-column(label='大小',show-overflow-tooltip,width='130')
      template(scope="scope")
        | {{transeSize(scope.row)}}
    el-table-column(label='修改日期',show-overflow-tooltip,width='160')
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
      downlinksObj:'downlinks',
      videopath:'videopath',
    })
  },
  methods:{
    changefilepath:function(file){
      if(file.isdir==0)return;
      this.$router.push({path:"/disk",query:{path:file.path}});
      this.$store.dispatch('changepath',file.path);
    },
    fileProperty:function(file){
      this.curFile = file;
      this.dialogProP = true;
    },
    fileTypeUri:function(file){
      const avalibleType = this.utils.getAvalibleType();
      const movie = ['rmvb','mkv']
      const filename=file.server_filename;
      let type = this.utils.fileType(filename);
      type =  this.utils.ArrContains(avalibleType, type) ? type : 'default';
      type =  this.utils.ArrContains(movie, type) ? 'movie' : type;
      const filetype = file.isdir==0 ? type : 'folder_win10';
      const typeUri = `./static/icons/${filetype}.png`;
      return typeUri;
    },
    mediable:function(filename){
      const a = ['mp4','rmvb','mkv']
      return this.utils.ArrContains(a,this.utils.fileType(filename));
    },
    playmovie:function(file){
      this.$confirm('确定要播放当前视频吗?如确认播放请自行修改浏览器UA标识', '提示', {
          confirmButtonText: '播放',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$store.dispatch('playmovie',{});
          this.$store.dispatch('playmovie',file);
        }).catch(()=>{});
    },
    deleteFile:function(file){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deletefile',file.path);
        }).catch(() => {
          this.$message.warning('删除操作已取消');
        });
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
    downloadFromM4s:function(file){
      this.$store.dispatch('downfilesM4s',{});
      this.$store.dispatch('downfilesM4s',file);
    },
    add2square:function(file){
      this.$prompt('请输入留言', '分享到文件广场', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$store.dispatch('share2square',{
            'file':file,
            'msg':value});
        }).catch((e)=>{});
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
    },
    videopath(){
      console.log(this.videopath);
    },
  }

}
</script>

<style scoped lang="scss">
.fileList{
    height:100%;
    // overflow-y: scroll;
}
.file-name{ 
  line-height: 40px;
  .fileicon{
    vertical-align:middle;
  }
  .open-enable{
    cursor: pointer;
  }
  .normal{
    cursor: default;
  }
}
</style>
