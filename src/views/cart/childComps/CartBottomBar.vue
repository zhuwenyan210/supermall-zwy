<template>
  <div class="bottom-bar">
    <div class="check-content">
      <div class="check-button"><check-button ref="btn" :value="isSelectAll" @click.native="allCheckClick" /></div>
      <span>全选</span>
      <span class="all-price">合计:{{totalPrice}}</span>
    </div>
    <div class="go-to-stat">结算</div>

  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'

  export default {
    name: 'CartBottomBar',
    data() {
      return {
        allCheck: false
      }
    },
    props: {
      allPrice: {
        type: Number
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
        this.$store.commit('allCheckClick', this.isSelectAll)
        // if (this.$store.state.cartList.length !== 0) {
        //   this.isSelectAll = !this.isSelectAll
        // }
        // this.$emit('allCheckClick', this.allCheck)
        // this.$store.state.cartList.forEach(item => item.select = !this.isSelectAll)
        // if (this.isSelectAll) {}
      }
    },
    computed: {
      totalPrice() {
        return "￥" + this.$store.state.cartList.filter(item => {
          return item.select
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
          return !this.$store.state.cartList.find(item => !item.select)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    justify-content: space-between;
    height: 40px;
    border-top: solid 2px rgba(100,100,100,.1);
  }

  .check-content {
    font-size: 13px;
    display: flex;
    padding: 12px 0px 5px 12px
  }

  .check-content .all-price {
    margin-left: 80px;
    font-weight: 600;
  }

  .go-to-stat {
    margin: 2px;
    width: 90px;
    padding: 10px 0px 12px 30px;
    background-color: red;
    color: #FFFFFF;
    border-radius: 20px;
  }
</style>
