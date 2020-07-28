<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar"/>
      <scroll class="content" ref="scroll">
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :param-info="paramInfo"/>
      </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail.js'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
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
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
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
    height: calc(100% - 44px);
  }
</style>
