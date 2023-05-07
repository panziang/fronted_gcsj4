<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
    <div class="search-bar" v-show="isShowSearchBar">
      <search-bar />
    </div>
    <home-content />
  </div>
</template>

<script>
  //给APP.vue里的keepalive使用，定义路由name
  export default { name: "home" }
</script>
<script setup>
  import useHomeStore from '@/store/modules/home';
  import homeNavBar from './cpns/home-nav-bar.vue';
  import homeSearchBox from './cpns/home-search-box.vue';
  import homeCategories from './cpns/home-categories.vue';
  import homeContent from './cpns/home-content.vue';
  import { computed, ref, watch, onActivated } from 'vue';
  import useScroll from "@/hooks/useScroll"
  import searchBar from '@/components/search-bar/search-bar.vue';

  //发送网络请求
  const homeStore = useHomeStore()
  //获取热门建议
  homeStore.fetchHotSuggestsData()
  //获取房屋分类
  homeStore.fetchHomeCategories()
  //获取热门精选里的房屋信息
  homeStore.fetchHouseList()

  const homeRef = ref()
  const { isReachBottom, scrollTop } = useScroll(homeRef)
  //从useScroll中取值isReachBottom，判断是否到达底部，然后发送网络请求
  watch(isReachBottom, (newValue) => {
    if (newValue) {
      //在数据请求完之后将isReachBottom改为false
      homeStore.fetchHouseList().then(() => {
        isReachBottom.value = false
      })

    }
  })

  //监听滚动距离的变化，控制显示搜索框
  //方法一：watch
  // const isShowSearchBar = ref(false)
  // watch(scrollTop, (newTop) => {
  //   isShowSearchBar.value = newTop > 100
  // })

  //方法二：computed
  const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
  })

  //跳转回home时，保留原来的位置
  onActivated(() => {
    homeRef.value?.scrollTo({
      top: scrollTop.value
    })
  })
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
    // height: 100px;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>