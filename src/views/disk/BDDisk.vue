<template lang="pug">
el-col
  file-list
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'webdisk',
  data () {
    return {
    }
  },
  computed:{
    ...mapGetters ({
      uk:'uk',
    })
  },
  methods:{
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
</style>