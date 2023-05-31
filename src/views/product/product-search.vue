<template>
  <div class="product-search">
    <van-search v-model="searchVal" placeholder="请输入搜索关键词" show-action @search="onSearch">
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
    <div class="search-content">
      <van-swipe-cell v-for="item in searchList" :key="item.id" v-if="!isEmpty">
        <van-card :price=item.price :title=item.title class="goods-card" :thumb=item.cover_img
          @click="productClick(item)">

        </van-card>
      </van-swipe-cell>

      <van-empty description="查询为空" v-if="isEmpty" />
    </div>

  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import useSearchStore from '@/store/modules/search'
  import { storeToRefs } from 'pinia';

  const route = useRoute()
  const router = useRouter()
  const searchVal = ref('')
  const searchStore = useSearchStore()
  const { searchList, searchCount, isEmpty } = storeToRefs(searchStore)

  const productClick = (item) => {
    router.push('/product-detail/' + item.id)
  }

  const onSearch = (val) => {
    if (val) {
      console.log("val", val);
      searchStore.getSearch(val)
      router.push('/product-search/' + val)
      console.log("searchCount", searchCount.value);
    } else {
      console.log("123");
      isEmpty.value = true
    }

  }
  const onClickButton = () => {
    if (searchVal.value) {
      console.log("searchVal", searchVal.value);
      searchStore.getSearch(searchVal.value)
      router.push('/product-search/' + searchVal.value)
    } else {
      console.log("123");
      isEmpty.value = true
    }
  }

  onMounted(() => {
    searchVal.value = route.params.keyword
    searchStore.getSearch(searchVal.value)
  })
</script>

<style lang="less" scoped>
.product-search {
  .van-swipe-cell {
    margin-top: 30px;

  }
}
</style>