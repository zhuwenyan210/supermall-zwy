import {debounce} from './util.js'

export const itemListenerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)

    this.itemImgListener = () => {
        refresh ()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是混入内容')
  }
}

export const backTopMinxin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
