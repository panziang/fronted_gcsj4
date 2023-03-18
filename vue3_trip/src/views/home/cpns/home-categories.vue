<template>
  <div class="home-categories">
    <template v-for="item in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text ">{{ item.title }}</div>

      </div>
    </template>
  </div>
</template>

<script setup>
  import useHomeStore from "@/store/modules/home";
  import { storeToRefs } from "pinia";

  const homeStore = useHomeStore()
  const { categories } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.home-categories {
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  margin-top: 8px;

  //隐藏底部滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    flex-shrink: 0;
    text-align: center;

    img {
      width: 32px;
      height: 32px;
    }
  }

  .text {
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>