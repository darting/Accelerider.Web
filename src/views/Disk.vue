<template lang="pug">
#disk
  transition
    router-view
</template>

<script>
export default {
  name: 'disk',
  data () {
    return {
      discrimination: 'every web disk is here!',
    }
  }
}
</script>