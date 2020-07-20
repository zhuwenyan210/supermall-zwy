<template>
  <div class="recommend">
    <div v-for="(item, index) in recommend" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt=""/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecomendView",
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 10px 0px 15px;
    border-bottom: 8px solid #F6F6F6;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 90%;
    margin-bottom: 10px;
  }
</style>
