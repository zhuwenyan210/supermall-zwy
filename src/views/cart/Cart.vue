<template>
  <div class="cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list
      v-for="(item, index) in $store.state.cartList"
      :product="item"
      :key="index"></cart-list>
    </scroll>
    <cart-bottom-bar />
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
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px - 30px);
    overflow: hidden;
  }

  .cart-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>
