import { defineStore } from "pinia";

const useOrderStore = defineStore("order", {
  state: () => ({
    orderList: []
  }),
  actions: {

  }
})

export default useOrderStore