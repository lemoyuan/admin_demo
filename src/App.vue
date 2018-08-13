<template>
  <div id="app">
    <div id="content">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>


<script>
export default {
  name: 'app',
  computed: {

  },
  components: {
  }
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
