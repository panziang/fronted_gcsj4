<template>
  <div class="app">
    <!-- 新写法 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar" />
    <loading />
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import tabBar from './components/tab-bar/tab-bar.vue';
  import loading from './components/loading/loading.vue';
  import { ref } from 'vue';

  const route = useRoute()
  const active = ref(0)
</script>

<style scoped></style>
