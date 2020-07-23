<template>
  <goods-list-item />
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'

  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Object,
        
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style>
</style>
