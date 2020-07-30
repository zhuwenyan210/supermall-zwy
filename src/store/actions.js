import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types.js'

export default {
  addCart(content, payload) {
    let oldProduct = content.state.cartList.find(item => item.iid === payload.iid)

    //2、判断oldProduct
    if (oldProduct) {
      content.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // content.state.cartList.push(payload)
      content.commit(ADD_TO_CART, payload)
    }
  }
}
