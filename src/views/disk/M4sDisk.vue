<template lang="pug">
.m4sdisk
  el-row(type="flex")
    el-col
      h3 施工重地，闲人免进。
  el-row
    el-col
      el-table(v-bind:data='filelist', empty-text='文件夹是空的哟', style='width:100%')
        el-table-column(label='文件名', prop='fileName')
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'webdisk',
  data () {
    return {
      token: '',
    }
  },
  computed:{
    ...mapGetters({
      isLoading:'isLoading',
      filelist:'m4sfilelist',
    })
  },
  methods:{
    goM4sFileList:function(){
      const path = this.utils.pathmanager().getPath()
      this.token = sessionStorage.getItem('accessToken');
      this.$m4sAPI.filelist(this.token,path)
      .then(list=>{
        this.$store.dispatch('m4sfilelist',list);
      })
      .catch((e)=>{
        this.$message.error(e.message);
      });
    }
  },
  mounted(){
    this.goM4sFileList();
  },
}
</script>