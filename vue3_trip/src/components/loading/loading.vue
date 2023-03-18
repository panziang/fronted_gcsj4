<template>
  <div class="loading" v-if="isLoading">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="">
    </div>
  </div>
</template>

<script setup>
  import useMainStore from "@/store/modules/main";
  import { storeToRefs } from "pinia";

  const mainStore = useMainStore()
  const { isLoading } = storeToRefs(mainStore)
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);

  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 104px;
    background-image: url(@/assets/img/home/loading-bg.png);
    background-position: 0 0;
    background-size: 100% 100%;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>