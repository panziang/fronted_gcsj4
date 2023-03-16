import { defineStore } from "pinia";
import hyRequest from "@/service/request/index"
import {getHomeHotSuggests} from "@/service"
const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories:[]
  }),
  actions: {
    async fetchHotSuggestsData () {
      const res = await getHomeHotSuggests()
      this.hotSuggests=res.data
    }
  }
})

export default useHomeStore