<template>
  <div class="cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list
      v-for="(item, index) in $store.state.cartList"
      :product="item"
      :key="index"
      @cartListCheck="cartListCheck"></cart-list>
    </scroll>
    <cart-bottom-bar :allPrice="allPrice" @allCheckClick="allCheckClick" ref="bottom"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  data() {
    return {
      allPrice: 0
    }
  },
  components: {
    Scroll,
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    allCheckClick(isCheck) {
      if (isCheck) {
        let cartList = this.$store.state.cartList
          console.log(cartList.length > 0)
          if (cartList.length > 0) {
            cartList.forEach((item) => {
              this.allPrice += Number(item.price)
            })
        }
      } else {
        this.allPrice = 0
      }
      },
  cartListCheck(product) {
    if (product.select) {
      this.allPrice += Number(product.price)
    } else {
      this.allPrice -= Number(product.price)
      this.$refs.bottom.allCheck = false
    }
  }
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }

  .cart-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>
