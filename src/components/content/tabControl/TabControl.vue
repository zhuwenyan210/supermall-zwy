<template>
  <div class="tab-control">
    <div class="tab-control-item"
          v-for="(item, index) in titles"
          :key="index">
     <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #FFFFFF;
  }

  .tab-bar-item {
    flex: 1;
  }

  .tab-bar-item span {
    padding: 5px;
  }
</style>
