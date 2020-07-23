<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper class="home-swiper" :banners="banner"/>
    <recommend-view :recommend="recommend"/>
    <feature-view />
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"/>
    <goods-list :goods="goods[currenType]"/>
    <div>
      <ul>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
        <li>444</li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data () {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page:0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []}
      },
      currenType: 'pop'
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    //子组件传递事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currenType = 'pop'
          break
         case 1:
          this.currenType = 'new'
          break
         case 2:
          this.currenType = 'sell'
          break
      }
    },

    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
        // console.log(this.recommend)
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
      })
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .home-swiper {

  }

  .nav-bar {
    display: flex;
    z-index: 8;
  }
</style>
