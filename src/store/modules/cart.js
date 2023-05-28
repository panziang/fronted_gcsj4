import { defineStore } from "pinia";

const useCartStore = defineStore("cart", {
  state: () => ({
    cartList: []
  }),
  actions: {

  }
})

export default useCartStore