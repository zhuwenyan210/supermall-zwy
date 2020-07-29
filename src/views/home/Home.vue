<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
      />
    <scroll
    class="content"
    ref="scroll"
    :probe-type="3"
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
      <home-swiper class="home-swiper"
      :banners="banner"
      @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommend="recommend"/>
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {debounce} from 'common/util.js'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
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
      currenType: 'pop',
      isShowBackTop: false,
      tabOffestTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)

    this.itemImgListener = () => {
       if (this.$refs.scroll) {
          // this.$refs.scroll.refresh()
          // console.log('---------')
          refresh()
          }
       }
    this.$bus.$on('itemImageLoad',
       this.itemImgListener
       )
  },
  destroyed() {
    console.log('home destroyed')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  computed: {
    showGoods () {
      return this.goods[this.currenType].list
    }
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      //判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      //决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffestTop
    },

    loadMore() {
      console.log('上拉加载更多')
      this.getHomeGoods(this.currenType)

      this.$refs.scroll.refresh()
    },
    swiperImageLoad() {
      this.tabOffestTop = this.$refs.tabControl2.$el.offsetTop
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
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;

    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;

 /*   position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .home-swiper {

  }

/*  .nav-bar {
    display: flex;
    z-index: 19;
  }
 */
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
