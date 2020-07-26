<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar"/>
       <router-view></router-view>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
   @import url("assets/css/base.css");

   .main-tab-bar {
     position: sticky;
     z-index: 10;
   }
</style>
