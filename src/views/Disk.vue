<template lang="pug">
#disk
  transition
    router-view
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'disk',
  data () {
    return {
      discrimination: 'every web disk is here!',
      token: '',
    }
  },
  computed: {
    ...mapGetters({
      plazafile:'plazafile',
    })
  },
  methods:{
    add2square:function(file){
      this.$prompt('请输入留言', '添加到文件广场', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$squareAPI.add2square(this.token, file, value)
          .then(msg=>{
            this.$message.success(msg);
          })
          .catch(e=>this.$message.error(e.message));
        }).catch((e)=>{});
    },
  },
  watch: {
    plazafile(){this.add2square(this.plazafile)}
  },
  mounted(){
    this.token = sessionStorage.getItem('accessToken');
  },
}
</script>