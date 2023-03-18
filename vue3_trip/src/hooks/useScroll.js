import { ref, onMounted, onUnmounted } from "vue"

import {throttle} from "underscore"

export default function useScroll () {
  //定义一个变量,判断是否达到底部
  const isReachBottom = ref(false)

  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)

  //监听window窗口的滚动
  //利用throttle实现节流
  const scrollListenerHandler = throttle(() => {
    // console.log(document.documentElement.scrollTop);
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // homeStore.fetchHouseList()
      //将isReachBottom这个变量的值改为true，可以让调用者知道已经到达底部
      isReachBottom.value = true
    }
  }, 100)
  
  //添加监听
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })
  
  //离开页面，移除监听
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, scrollTop, clientHeight, scrollHeight }
}