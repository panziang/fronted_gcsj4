import { defineStore } from "pinia";
import hyRequest from "@/service/request/index"
import { getHomeHotSuggests, getHomeCategories, getHomeHouseList } from "@/service"
import {getProductList} from '../../request/home'
const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    currentPage:1,
    houselist:[]
  }),
  actions: {
    async fetchHotSuggestsData () {
      //经过封装的发送网络请求接口
      const res = await getHomeHotSuggests()
      this.hotSuggests=res.data
    },
    async fetchHomeCategories () {
      const res = await getHomeCategories()
      this.categories=res.data
    },
    async fetchHouseList () {
      //获取当前房屋列表信息，分页显示
      const res = await getHomeHouseList(this.currentPage)
      //将请求来的数据追加到数组后
      this.houselist.push(...res.data)
      this.currentPage++ 
    }
  }
})

export default useHomeStore