import { defineStore } from "pinia";

const startDate = new Date()
const endDate = new Date().setDate(startDate.getDate() + 1)

const useMainStore= defineStore("main", {
  state: () => ({
    //开始时间和结束时间
    startDate:startDate,
    endDate: endDate,
    
    //控制loading是否开启
    isLoading:true
  })
})
export default useMainStore