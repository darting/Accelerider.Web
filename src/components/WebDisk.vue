<template lang="pug">
.disk
  el-row
    el-col(v-bind:span='8')
      el-breadcrumb(separator=">",v-bind:replace='true')
        el-breadcrumb-item(v-for='p in _getBreadCrumb()',v-bind:to="{path:'/disk',query:{path:p.path}}",key = 'p')
          | {{p.name}}
    el-col(v-bind:span='4')
      span Total: {{filescount}}
  el-row
    el-button(type='text',@click='backFileList',icon='arrow-left') BACK
  el-row
    el-col.flist(v-loading="isLoading")
      file-list(pre_='')
</template>

<script>
export default {
  name: 'webdisk',
  data () {
    return {
      filescount:0,
      isLoading:true
    }
  },
  methods:{
    _getBreadCrumb:function(){
      let path = this.utils.pathmanager().pathSegmtt();
      return path;
    },
    goFileList:function(){
      const path = this.utils.pathmanager().getPath()
      this.downlinks = [];
      this.isLoading = true;
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
	    this.$restAPI.filelist(token,uk,path)
      .then(list=>{
        this.filescount = list.length;
        this.Bus.$emit('showfilelist', list);
        this.isLoading = false;
      })
      .catch((e)=>{
        this.isLoading = false;
        if(e.message.indexOf('代码 -9') > 0)
            {this.$router.push({path:"/disk",query:{path:'/'}})}
        else{this.$message.error(e.message)}
        });
    },
    downfiles:function(file){
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
      this.isLoading = true;
	    this.$restAPI.downfiles(token,uk,[file])
      .then(data=>{
        if(data.links){this.$restAPI.vertifyco(data.cookies,true);
          return data.links
        }else{throw new Error(data.message)}
      })
      .then(linksObj=>{
        this.isLoading = false;
        this.Bus.$emit('showdownlinks', linksObj);
      })
      .catch((e)=>{
        this.isLoading = false;
        this.$message.error(e.message)});
    },
    backFileList:function(){
      const pm = this.utils.pathmanager()
      let cur = pm.getBackPath();
      this.$router.push({path:"/disk",query:{path:cur}});
    },
  },
  created(){
    this.Bus.$on('changepath',file=>{
      this.$router.push({path:"/disk",query:{path:file.path}});
    });
    this.Bus.$on('downfiles',files=>{
      this.downfiles(files);
    });
  },
  mounted:function(){
    this.goFileList();
  },
  watch: {
     "$route": "goFileList"
  }
}
</script>

<style scoped>
.flist{
  height:100%;
  overflow: auto;
}
</style>
