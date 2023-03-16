<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner1.png" alt="">
    </div>
    <home-search-box />
  </div>
</template>

<script setup>
  import useHomeStore from '@/store/modules/home';
  import homeNavBar from './cpns/home-nav-bar.vue';
  import homeSearchBox from './cpns/home-search-box.vue';

  //发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestsData()


</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
    height: 200px;
  }
}
</style>