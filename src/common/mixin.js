import {debounce} from 'util.js'

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
