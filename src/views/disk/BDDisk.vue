<template lang="pug">
.disk
  el-row(type="flex")
    el-col(v-bind:span='2', v-if='utils.pathmanager().getPath() != "/"')
      el-button(type='text',@click='backFileList',icon='arrow-left') BACK
    el-col.breadcrumb
      el-breadcrumb(separator=">",v-bind:replace='true')
        el-breadcrumb-item(v-for='p in utils.pathmanager().pathSegmtt()',v-bind:to="{query:{path:p.path}}",key = 'p')
          | {{p.name}}
  el-row(type="flex")
    //- el-upload(action='', v-bind:show-file-list='false')
    //-   el-button(type="primary") 上传
    el-col
      el-button(@click='createFolder', icon='document') 新建文件夹
      el-button-group(v-if='selectedFiles.length>0')
        el-button(@click='downloadFiles(selectedFiles)') 下载
        el-button(@click='doNothing', icon='delete', v-bind:disabled='selectedFiles.length>6') 删除
    el-col(v-bind:span='4')
      span Total: {{filelist.length}}
  el-row.frame-main
    el-col(v-loading='isLoading')
      el-table.filelist(v-bind:data='filelist', empty-text='文件夹是空的哟', @select='(s,r)=>{selectedFiles=s}',@select-all='(s)=>{selectedFiles=s}', style='width:100%')
        el-table-column(type='selection')
        el-table-column(label='文件名',show-overflow-tooltip,min-width='200')
          template(scope="scope")
            el-col(v-bind:span='19').file-name
              img.fileicon(v-bind:src='_fileTypeUri(scope.row)',height=30)
              span(v-bind:class="scope.row.isdir == 1? 'open-enable': 'normal'", @click='changefilepath(scope.row)')
                  | {{scope.row.filename}}
        el-table-column(label='-',show-overflow-tooltip,width='100')
          template(scope="scope")
            el-dropdown(trigger="click")
              el-button(type='text')
                i(class='el-icon-more')
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(@click.native.prevent='downloadFiles([scope.row])') 直链下载
                el-dropdown-item(@click.native.prevent='downloadFromM4s(scope.row)') 坐骑下载
                el-dropdown-item(divided, @click.native.prevent='upload2m4s(scope.row)') 转移到四酱云
                el-dropdown-item(@click.native.prevent='add2plaza($squareAPI,scope.row)') 添加到广场
                el-dropdown-item(divided, @click.native.prevent='((f)=>{curFile=f;dialogProP=true;})(scope.row)') 属性
                el-dropdown-item(@click.native.prevent='deleteFile(scope.row)') 删除
        el-table-column(label='大小',width='120')
          template(scope="scope")
            | {{utils.transeSize(scope.row.size)}}
        el-table-column(label='修改日期',show-overflow-tooltip,width='160')
          template(scope="scope")
            | {{utils.transeTime(scope.row.server_mtime)}}
  .dialog
    el-dialog(v-model='dialogDL',title='下载链接')
      div(v-for='item in downlinks',key = 'item')
        p {{item.name}}
        ul
          li(v-for='url in item.urls',key = 'url')
            a(v-bind:href='url',target='_blank',rel="noreferrer") 链接
    el-dialog(v-model='dialogProP',title='文件属性')
      p 文件名： {{curFile.filename}}
      p 文件大小： {{utils.transeSize(curFile)}}
      p(v-if='curFile.isdir==1') 是否有子目录： {{curFile.dir_empty==0}}
      p 修改时间： {{utils.transeTime(curFile.server_mtime)}}
      p(v-if='curFile.isdir==0') 文件MD5： {{curFile.md5}}
</template>

<script>
import {loginmixin} from '@/components/mixins/loginmixin'
import {diskmixin} from '@/components/mixins/diskmixin'
export default {
  name: 'webdisk',
  mixins: [diskmixin, loginmixin],
  data () {
    return {
      dialogProP:false,
      selectedFiles:[],
    }
  },
  methods:{
    goFileList:function() {
      const path = this.utils.pathmanager().getPath();
      this.selectedFiles = [];
      this.token = this.getToken();
      if(this.uk.length<1)return;
      this.$store.commit('viewloading', true);
	    this.$restAPI.filelist(this.token,this.uk,path)
      .then(list=>{
        this.$store.commit('viewloading', false);
        this.$store.dispatch('filelist',{list:list});
      })
      .catch((e)=>{
        this.$store.commit('viewloading', false);
        if(e.message.indexOf('代码 -9') > 0){
          this.$router.push({query:{path:'/'}});
        }else{this.$message.error(e.message)}
        });
    },
    fileProperty:function(file) {
      this.curFile = file;this.dialogProP = true;
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
    downloadFiles:function(files) {
      this.$store.commit('viewloading', true);
      this.$restAPI.downfiles(this.token, this.uk, files)
      .then(links=>{
        this.$store.commit('viewloading', false);
        this.parseDownLinks(links)
      })
      .catch((e)=>{
        this.$store.commit('viewloading', false);
        this.$message.error(e.message)});
    },
    downloadFromM4s:function(file) {
      this.$restAPI.zqdownfiles(file)
       .then((data)=>{
         if(data!='error'){
           this.$message.success('恭喜！发送成功~快去看看吧！');
         }else{
           this.$message.error('阿哦，发送失败。。大侠请重新来过。');
         }
       })
       .catch((e)=>{
        this.$message.error('阿哦，出错了诶？是不是没有打开坐骑呢?')});
    },
    createfolderapi:function(value){
      const path = this.utils.pathmanager().getPath() +'/' + value;
      this.$restAPI.createFolder(this.token,this.uk,path)
      .then(data=>{
        this.$message.success('创建成功!');
        this.goFileList();
      });
    },
    deleteFileapi:function(filepath){
      this.$restAPI.deletefile(this.token,this.uk,filepath)
      .then((data)=>{
        this.$message.success('删除成功!');
        this.goFileList();
      })
      .catch((e)=>{this.$message.error('删除失败。')});
    },
    upload2m4s:function(file){
      const filename = '/' + file.server_filename
      this.$m4sAPI.upload2m4s(this.token,filename,file.md5, file.size)
      .then(data=>{
        this.$message.success('转移成功!');
      }).catch((e) => {this.$message.error(e.message)});
    }
  },
  watch: {
    uk(){
      this.goFileList();
    },
    "$route": "goFileList"
  },
  mounted(){
    this.goFileList();
  },
}
</script>

<style scoped lang="scss">
.breadcrumb{
  margin: 10px
}
.file-name{ 
  line-height: 40px;
  .fileicon{
    vertical-align:middle;
    margin-right: 5px;
  }
  .open-enable{
    cursor: pointer;
  }
  .normal{
    cursor: default;
  }
}
</style>