<template lang="pug">
.m4sdisk
  el-row(type="flex")
    el-col(v-bind:span='2', v-if='utils.pathmanager().getPath() != "/"')
      el-button(type='text',@click='backFileList',icon='arrow-left') BACK
    el-col.breadcrumb
      el-breadcrumb(separator=">",v-bind:replace='true')
        el-breadcrumb-item(v-for='p in utils.pathmanager().pathSegmtt()',v-bind:to="{query:{path:p.path}}",key = 'p')
          | {{p.name}}
  el-row(type="flex")
    el-col
      el-button(@click='createFolder', icon='document') 新建文件夹
      el-button(@click='pasteHere', icon='paste', v-if='clipboard!=null') 粘贴
    el-col(v-bind:span='4')
      span Total: {{m4sfilelist.length}}
  el-row
    el-col(v-loading='isLoading')
      el-table.filelist(v-bind:data='m4sfilelist', empty-text='文件夹是空的哟', style='width:100%')
        el-table-column(label='文件名',show-overflow-tooltip,min-width='200')
          template(scope="scope")
            el-col(v-bind:span='19').file-name
              img.fileicon(v-bind:src='_fileTypeUri(scope.row)',height=30)
              span(v-bind:class="scope.row.dir == 1 ? 'open-enable': 'normal'", @click='changefilepath(scope.row)')
                  | {{scope.row.filename}}
        el-table-column(label='-',show-overflow-tooltip,width='100')
          template(scope="scope")
            el-dropdown(trigger="click")
              el-button(type='text')
                i(class='el-icon-more')
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(@click.native.prevent='downloadFile(scope.row)') 下载
                el-dropdown-item(divided, @click.native.prevent='copy2clipboard(scope.row.path)') 复制
                el-dropdown-item(divided, @click.native.prevent='doNothing(scope.row)') 分享
                el-dropdown-item(@click.native.prevent='add2plaza($squareAPI,scope.row)') 添加到广场
                el-dropdown-item(divided, @click.native.prevent='deleteFile(scope.row)') 删除
        el-table-column(label='大小',width='120')
          template(scope='scope')
            span {{utils.transeSize(scope.row.size)}}
        el-table-column(label='创建时间',show-overflow-tooltip,width='160')
          template(scope='scope')
            span {{utils.transeTime(scope.row.ctime)}}
  .dialog
    el-dialog(v-model='dialogDL',title='下载链接')
      div
        p {{curFile.fileName}}
        ul
          li(v-for='url in downlinks',key = 'url')
            a(v-bind:href='url',target='_blank',rel="noreferrer") 链接
</template>

<script>
import {diskmixin} from '@/components/mixins/diskmixin'
export default {
  name: 'webdisk',
  mixins: [diskmixin],
  data () {
    return {
      clipboard:null
    }
  },
  methods:{
    goFileList:function(){
      const path = this.utils.pathmanager().getPath();
      this.token = sessionStorage.getItem('accessToken');
      this.$store.commit('viewloading',true);
      this.$m4sAPI.filelist(this.token,path)
      .then(list=>{
        this.$store.commit('viewloading',false);
        this.$store.dispatch('filelist',{list:list,ism4s:true});
      })
      .catch((e)=>{
        this.$store.commit('viewloading',false);
        this.$message.error(e.message);
      });
    },
    downloadFile:function(file){
      this.$store.commit('viewloading',true);
      this.curFile = file;
	    this.$m4sAPI.downfiles(this.token,file.path)
      .then(links=>{
        if(links.length>0){
          this.$store.commit('viewloading',false);
          this.dialogDL = true;
          this.downlinks = links;
        }else{throw new Error(data.message)}
      })
      .catch((e)=>{
        this.$store.commit('viewloading',false);
        this.$message.error(e.message)});
    },
    createfolderapi:function(value){
      const path = this.utils.pathmanager().getPath() +'/' + value;
      this.$m4sAPI.createFolder(this.token,path)
      .then(data=>{
        this.$message.success('创建成功!');
        this.goFileList();
      });
    },
    copy2clipboard:function(filepath){
      this.clipboard = filepath;
    },
    pasteHere:function(){
      let topath = this.utils.pathmanager().getPath();
      topath += '/' + this.clipboard.fileName;
      this.$m4sAPI.copyFile(this.token,this.clipboard,topath)
      .then(a=>{this.$message.success('复制成功!');this.goFileList()})
      .catch(e=>this.$message.error(e.message));
    },
    deleteFileapi:function(filepath){
      this.$m4sAPI.deletefile(this.token, filepath)
      .then((data)=>{
        this.$message.success('删除成功!');
        this.goFileList();
      })
      .catch((e)=>{this.$message.error('删除失败。')});
    },
  },
  watch: {
    "$route": "goFileList"
  },
  mounted(){
    this.goFileList();
  },
}
</script>