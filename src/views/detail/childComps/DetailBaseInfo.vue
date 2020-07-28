<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span
        v-if="goods.discount"
        class="discount"
        :style="{backgroundColor: goods.discountBgColor}"
      >{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object ,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 2px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222;
    margin-bottom: 10px;
  }

  .info-price, .info-other {
    margin-bottom: 20px;
  }

  .info-other {
    line-height: 30px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-other, .info-service {
    display:flex;
    display:-webkit-flex;/*Safari*/
    justify-content:space-between;/*水平排布方式*/
  }

  .o-price, .info-other, .info-service-item {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .info-service-item img {
    width: 12px;
  }

  .o-price {
    text-decoration: line-through;
  }

  .n-price {
    color: var(--color-high-text);
    font-weight: 700;
  }

  .discount {
    font-size: 12px;
    padding: 2px 5px;  /* 上右 内边距 */
    border-radius: 8px;
    background-color: var(--color-high-text);
    color: #FFFFFF;

    /* 让元素上浮一点，使用相对定位 */
    position: relative;
    top: -8px;
  }
</style>
