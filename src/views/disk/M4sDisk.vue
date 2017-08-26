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
      //- el-button(@click='deleteFiles', icon='delete') 删除
    el-col(v-bind:span='4')
      span Total: {{filelist.length}}
  el-row
    el-col(v-loading='isLoading')
      el-table(v-bind:data='filelist', empty-text='文件夹是空的哟', style='width:100%')
        el-table-column(label='文件名',show-overflow-tooltip,min-width='200')
          template(scope="scope")
            el-col(v-bind:span='19').file-name
              img.fileicon(v-bind:src='_fileTypeUri(scope.row)',height=30)
              span(v-bind:class="scope.row.dir == 1 ? 'open-enable': 'normal'", @click='changefilepath(scope.row)')
                  | {{scope.row.fileName}}
        el-table-column(label='-',show-overflow-tooltip,width='100')
          template(scope="scope")
            el-dropdown(trigger="click")
              el-button(type='text')
                i(class='el-icon-more')
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(@click.native.prevent='downloadFile(scope.row)') 下载
                el-dropdown-item(divided, @click.native.prevent='doNothing(scope.row)') 分享
                el-dropdown-item(@click.native.prevent='add2plaza(scope.row)') 添加到文件广场
                el-dropdown-item(divided, @click.native.prevent='deleteFile(scope.row)') 删除
        el-table-column(label='创建时间',show-overflow-tooltip,width='180')
          template(scope='scope')
            span {{utils.transeTime(scope.row.ctime)}}
        el-table-column(label='大小',width='120')
          template(scope='scope')
            span {{utils.transeSize(scope.row.size)}}
  .dialog
    el-dialog(v-model='dialogDL',title='下载链接')
      div
        p {{curFile.fileName}}
        ul
          li(v-for='url in downlinks',key = 'url')
            a(v-bind:href='url',target='_blank',rel="noreferrer") 链接
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'webdisk',
  data () {
    return {
      token: '',
      dialogDL:false,
      downlinks:[],
      curFile:{},
    }
  },
  computed:{
    ...mapGetters({
      isLoading:'isLoading',
      filelist:'m4sfilelist',
    })
  },
  methods:{
    goFileList:function(){
      const path = this.utils.pathmanager().getPath();
      this.token = sessionStorage.getItem('accessToken');
      this.$store.commit('viewloading',true);
      this.$m4sAPI.filelist(this.token,path)
      .then(list=>{
        this.$store.commit('viewloading',false);
        this.$store.dispatch('m4sfilelist',list);
      })
      .catch((e)=>{
        this.$store.commit('viewloading',false);
        this.$message.error(e.message);
      });
    },
    changefilepath:function(file){
      if(file.dir==0)return;
      this.$router.push({query:{path:file.path}});
    },
    backFileList:function(){
      const cur = this.utils.pathmanager().getBackPath();
      this.$router.push({query:{path:cur}});
    },
    _fileTypeUri:function(file){
      const avalibleType = this.utils.getAvalibleType();
      const movie = ['rmvb','mkv']
      const filename=file.fileName;
      let type = this.utils.fileType(filename);
      type =  this.utils.ArrContains(avalibleType, type) ? type : 'default';
      type =  this.utils.ArrContains(movie, type) ? 'movie' : type;
      const filetype = file.dir==0 ? type : 'folder_win10';
      const typeUri = `./static/icons/${filetype}.png`;
      return typeUri;
    },
    downloadFile:function(file){
      this.$store.commit('viewloading',true);
      this.curFile = file;
	    this.$m4sAPI.downfiles(this.token,file.path)
      .then(data=>{
        if(data.links){
          this.$store.commit('viewloading',false);
          this.dialogDL = true;
          this.downlinks = data.links;
        }else{throw new Error(data.message)}
      })
      .catch((e)=>{
        this.$store.commit('viewloading',false);
        this.$message.error(e.message)});
    },
    createFolder:function(){
      this.$prompt('默认新建在当前目录，请输入文件夹名称：', '新建文件夹', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const path = this.utils.pathmanager().getPath() +'/' + value;
          this.$m4sAPI.createFolder(this.token,path)
          .then(data=>{
            this.$message.success('创建成功!');
            this.goFileList();
          });
        }).catch((e)=>{});
    },
    deleteFile:function(file){
      this.$confirm(`确认删除文件(夹)'${file.fileName}'吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$m4sAPI.deletefile(this.token, file.path)
          .then((data)=>{
            this.$message.success('删除成功!');
            this.goFileList();
          })
          .catch((e)=>{this.$message.error('删除失败。')});
        }).catch(() => {});
    },
    add2plaza:function(f){
      f.filename=f.fileName;this.$store.dispatch("add2FilePlaza",f)
    },
    doNothing:function(){
      this.$message.info('没有效果哟～');
    }
  },
  watch: {
    "$route": "goFileList"
  },
  mounted(){
    this.goFileList();
  },
}
</script>