<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swpierData" :key="item.id">
          <img :src="item.img" alt="">
        </van-swipe-item>

      </van-swipe>
    </div>
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
  import homeNavBar from './cpns/home-nav-bar.vue';
  import homeContent from './cpns/home-content.vue';
  import { computed, ref, watch, onActivated } from 'vue';
  import useScroll from "@/hooks/useScroll"
  import searchBar from '@/components/search-bar/search-bar.vue';
  import { getSwiperList } from '@/request/home'
  import { onMounted } from 'vue';


  const homeRef = ref()
  const { isReachBottom, scrollTop } = useScroll(homeRef)

  const swpierData = ref([])
  const getSwiper = () => {
    getSwiperList(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)
        // const imgurl = URL.createObjectURL(data)
        swpierData.value = data.data
        console.log("swpierData", swpierData.value);

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取失败");
      }
    )
  }

  onMounted(() => {
    getSwiper()
  })

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
  .my-swipe {
    .van-swipe-item {
      img {
        height: 180px;
        width: 100%;
      }
    }
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