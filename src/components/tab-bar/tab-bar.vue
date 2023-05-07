<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imgActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
  //获取数据
  import tabbarData from "@/assets/data/tabbar"
  //动态加载图片路径方法
  import { getAssetURL } from "@/utils/load_assets"
  import { ref, watch } from "vue"
  import { useRoute } from "vue-router";

  const currentIndex = ref(0)

  //监听路由改变时，找到对应的索引，设置currentIndex
  const route = useRoute()
  watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if (index === -1) return
    currentIndex.value = index
  })

</script>

<style lang="less" scoped>
.tab-bar {
  //局部修改，局部定义一个变量，只针对于tab-bar下的变量才生效
  // --van-tabbar-item-icon-size: 30px !important; 

  // :deep(.van-tabbar-item__icon) {
  //     font-size: 50px;
  // }

  img {
    height: 30px;
  }

}
</style>