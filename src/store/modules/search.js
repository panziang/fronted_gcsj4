import { defineStore } from "pinia";
import { searchProduct } from '@/request/product'

const useSearchStore = defineStore("search", {
  state: () => ({
    searchList: [],
    searchCount: 0
  }),
  actions: {
    getSearch (val) {
      searchProduct(
        {
          keyword: val,
          page: 1,
          size: 10
        },
        (status, res, data) => {
          // console.log('status: ', status)
          // console.log('res: ', res)
          // console.log('data: ', data)
          if (data.code == '0') {
            console.log("data", data.data);
            this.searchList = data.data.current_data
            this.searchCount = data.data.total_record
          } else {
            console.log("搜索失败");
          }

        },
        (status, error, msg) => {
          console.log('status: ', status)
          console.log('error: ', error)
          console.log('msg: ', msg)
          console.log("搜索失败");
        }
      )
    }
  }
})

export default useSearchStore