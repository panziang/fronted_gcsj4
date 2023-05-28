import { defineStore } from "pinia";
import { getCart } from '@/request/product'

const useCartStore = defineStore("cart", {
  state: () => ({
    cartList: [],
    cartNum: 0
  }),
  actions: {
    getCartList () {
      getCart(
        {},
        (status, res, data) => {
          // console.log('status: ', status)
          // console.log('res: ', res)
          // console.log('data: ', data)

          if (data.code == '0') {
            // console.log("获取购物车信息成功");
            this.cartList = data.data.cart_items
            this.cartList.forEach(item => {
              item.isCheck = 0
              // item.price *= 100
              // console.log("item.total_price", item.total_price);
              // cartPrice.value += item.total_price
            })
            this.cartNum = this.cartList.length
            console.log("cartList", this.cartList);
          } else {
            console.log("获取购物车信息失败");
          }

        },
        (status, error, msg) => {
          console.log('status: ', status)
          console.log('error: ', error)
          console.log('msg: ', msg)
          console.log("获取购物车信息失败");
        }
      )
    }
  }
})

export default useCartStore