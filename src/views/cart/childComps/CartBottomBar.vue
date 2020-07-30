<template>
  <div class="bottom-bar">
    <div class="check-content">
      <div class="check-button"><check-button/></div>
      <span>全选</span>
      <span class="all-price">合计:{{allPrice | showAllPrice}}</span>
    </div>
    <div class="go-to-stat">去计算</div>

  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'

  export default {
    name: 'CartBottomBar',
    props: {
      allPrice: {
        type: Number,
        default: 15.15
      }
    },
    components: {
      CheckButton
    },
    filters: {
      showAllPrice(allPrice) {
        return "￥" + allPrice
      }
    },
    methods: {
      allCheckClick() {

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 30px;
    background-color: #9f9f9f;
  }

  .check-content {
    font-size: 12px;
    display: flex;
    padding: 12px 5px 5px 5px
  }

  .check-content .all-price {
    margin-left: 10px;
    font-weight: 600;
    font-size: 13px;
  }

  .go-to-stat {
/*    position: relative;
    top: 0;
    bottom: 0;
    right: 0; */
    margin-right: 0;
  }
</style>
