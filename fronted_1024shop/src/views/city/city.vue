<template>
  <!-- top-page样式隐藏底部的导航栏 -->
  <div class="city top-page">
    <div class="top ">
      <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick()" />

      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>

        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- <cityGroup :group-data="currentGroup" /> -->
      <template v-for="(value, key) in allCities">
        <cityGroup v-show="tabActive == key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useCityStore from "@/store/modules/city"
  import { storeToRefs } from 'pinia';

  import cityGroup from './cpns/city-group.vue';

  const router = useRouter()
  //搜索框功能
  const searchValue = ref("")
  const cancelClick = () => {
    router.back()
  }

  //tab切换
  const tabActive = ref()

  //网络请求,请求城市的数据
  // const allCity = ref({})
  // getCityAll().then(res => {
  //   allCity.value = res.data
  // })

  //从store中获取数据
  const cityStore = useCityStore()
  //actions发起网络请求
  cityStore.fetchAllCitiesData()
  // const { allCities } = cityStore 直接获取的数据不是响应式的
  const { allCities } = storeToRefs(cityStore)


  //获取选中标签后的数据,利用computed将数据变成响应式 
  const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
.city {
  // top固定定位 
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }

  // .content {
  //   margin-top: 98px;
  // }
  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>