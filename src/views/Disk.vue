<template lang="pug">
.container
  .content
    web-disk
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'disk',
  data () {
    return {
      title:'网盘',
    }
  }
}
</script>