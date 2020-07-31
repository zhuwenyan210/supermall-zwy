<template>
  <div class="cart-list">
      <div class="check-button"><check-button :value="product.select" @click.native="checkBtnClick"/></div>
     <div class="info info-left">
       <img :src="product.image" alt="商品图片"/>
     </div>
     <div class="info info-right">
       <p class="product-title">{{product.title}}</p>
       <p class="product-desc">{{product.desc}}<p>
       <div class="info-other">
         <div class="product-price">{{product.price | showPrice}}</div>
         <div class="count">
           <div class="count-1" v-if="isOperateCount">
           <button>-</button>
           {{product.count}}
           <button>+</button>
           </div>
           <div
           class="count-2"
           v-else
           @click="countClick">x{{product.count}}</div>
           </div>
       </div>
       <div></div>
     </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'

  export default {
    name: 'CartList',
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    data() {
      return {
        isOperateCount: false
      }
    },
    filters: {
      showPrice(price) {
        return "￥" + price
      }
    },
    methods:{
      countClick() {
        this.isOperateCount = true
      },
      checkBtnClick() {
        this.product.select = !this.product.select
        
      }
    }
  }
</script>

<style scoped>
  .cart-list {
    /*上 右 下 左*/
    padding: 8px 10px 8px 10px;
    height: 110px;
    display: flex;
    border-bottom: solid 4px #F6F6F6 ;
  }

  .check-button {
    padding: 38px 0 0 0;
   }

  .info-left {
   width: 60px;
   margin-right: 15px;
  }

  .info-left img {
    width: 100%;
    border-radius: 5px;
  }

 .info-right {
  width: 200px;
  }

  .product-title {
    font-size: 14px;

    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }

  .product-desc {
    margin-top: 15px;

    font-size: 11px;
    color: #5f6f8f;

    white-space: nowrap;
     overflow: hidden;
    text-overflow: ellipsis;
  }

  .info-other {
    display: flex;
    justify-content: space-between;

    margin-top: 20px;
  }

  .info-other .product-price {
    color: var(--color-high-text);
    font-size: 16px;
    font-weight: 550;
  }

  .info-other .count {
    font-size: 14px;
  }

  .count button {
    background-color: #e7e7e7;
    color: #666666;
    border: none;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  .count-1 {
    padding: 0px 15px;
    border: solid 1px #5F6F8F;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  .count-1 button{
    background-color: #FFFFFF;
  }

  .count-2 {
    border: solid 1px #5F6F8F;
    padding: 5px 5px;
    border-radius: 5px;
  }
</style>
