import { ref, onMounted, onUnmounted } from "vue"

import { throttle } from "underscore"

//传入的ref是谁，就监听谁，否则只能监听window的滚动
export default function useScroll (elRef) {
  let el = window
  //定义一个变量,判断是否达到底部
  const isReachBottom = ref(false)

  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)

  //监听window窗口的滚动
  //利用throttle实现节流
  const scrollListenerHandler = throttle(() => {
    // console.log(document.documentElement.scrollTop);
    //判断el是不是window
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
      // console.log("clientHeight.value", clientHeight.value);
      // console.log("scrollTop.value", scrollTop.value);
      // console.log("scrollHeight.value", scrollHeight.value);
      // console.log("el", el);
      // console.log("=================================");

    }
    if (clientHeight.value + scrollTop.value + 100 >= scrollHeight.value) {
      // homeStore.fetchHouseList()
      //将isReachBottom这个变量的值改为true，可以让调用者知道已经到达底部
      isReachBottom.value = true
    }
  }, 100)

  //添加监听
  onMounted(() => {
    if (elRef) {
      el = elRef.value
    }
    el.addEventListener("scroll", scrollListenerHandler)
  })

  //离开页面，移除监听
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, scrollTop, clientHeight, scrollHeight }
}