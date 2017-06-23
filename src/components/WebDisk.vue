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
      file-list
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'webdisk',
  data () {
    return {
      filescount:0,
      isLoading:false
    }
  },
  computed:{
    ...mapGetters ({
      uk:'uk',
      downloadfiles:'downfiles'
    })
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
	    this.$restAPI.filelist(token,this.uk,path)
      .then(list=>{
        this.filescount = list.length;
        this.$store.dispatch('filelist',list);
        this.isLoading = false;
      })
      .catch((e)=>{
        this.isLoading = false;
        if(e.message.indexOf('代码 -9') > 0)
            {this.$router.push({path:"/disk",query:{path:'/'}})}
        else{this.$message.error(e.message)}
        });
    },
    downfiles:function(){
      this.isLoading = true;
      const token = sessionStorage.getItem('accessToken');
	    this.$restAPI.downfiles(token,this.uk,[this.downloadfiles])
      .then(data=>{
        if(data.links){this.$restAPI.vertifyco(data.cookies,true);
          return data.links
        }else{throw new Error(data.message)}
      })
      .then(linksObj=>{
        this.isLoading = false;
        this.$store.dispatch('showdownlinks',linksObj);
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
  watch: {
    uk(){
      this.goFileList();
    },
    downloadfiles(){
      this.downfiles();
    },
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
