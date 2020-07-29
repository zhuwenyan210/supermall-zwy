<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
       ref="navbar"/>
      <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
        <detail-param-info ref="params" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo" />
        <goods-list ref="recommend" :goods="recommends"/>
      </scroll>
      <detail-bottom-bar />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DeatailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  // import {itemListenerMixin} from 'common/util.js'
  import {debounce} from 'common/util.js'
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll
    },
    // mixins: [itemListenerMixin],
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [],
        getThemeTopY: null,
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 200)

      this.itemImgListener = () => {
          refresh ()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)
      // console.log('我是混入内容')
    },
    deactivated() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
      // console.log('dddd')
      //1, 保存传入的iid
      this.iid = this.$route.params.iid

      //2, 根据iid请求数据
      getDetail(this.iid).then(res => {
        console.log(res)
        const data = res.result
        //1 获取轮播图数据
        this.topImages = res.result.itemInfo.topImages

         //2 获取商品信息
         this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

         //3、获取店铺信息
         this.shop = new Shop(data.shopInfo)

         //4、保存商品详情数据
         this.detailInfo = data.detailInfo

         //5, 获取参数信息
         this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //6, 取出评论信息
         if (data.rate.cRate !== 0) {
           this.commentInfo = data.rate.list[0]
         }
      })

      //3,请求推荐数据
      getRecommend().then(res => {
        console.log(res)
        this.recommends = res.data.list
      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
      }, 100)
    },
    updated() {
      // this.$refs.scroll.
    },
    methods: {
      detailImageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
      },
      contentScroll(position) {
        this.themeTopYs.forEach((item, index) => {
          if (-position.y >= item) {
            this.$refs.navbar.currentIndex = index
          }
        })
        // const positionY = -position.y
        // for (let i in this.themeTopYs) {
        //   if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
        //     this.$refs.navbar.currentIndex =
        //   }
        // }
      }
    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #FFFFFF;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 2;
    background-color: #FFFFFF;
  }
  .content {
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>
