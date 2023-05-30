<template>
  <div class="product-search">
    <van-search v-model="searchVal" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>

    <van-swipe-cell v-for="item in searchList" :key="item.id">
      <van-card :price=item.price :title=item.title class="goods-card" :thumb=item.cover_img @click="productClick(item)">

      </van-card>
    </van-swipe-cell>
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
  const { searchList, searchCount } = storeToRefs(searchStore)

  const productClick = (item) => {
    router.push('/product-detail/' + item.id)
  }

  const onSearch = (val) => {
    if (val) {
      console.log("val", val);
      searchStore.getSearch(val)
      router.push('/product-search/' + val)
    } else {
      console.log("123");
    }

  }
  const onClickButton = () => {
    if (searchVal.value) {
      console.log("searchVal", searchVal.value);
      searchStore.getSearch(searchVal.value)
      router.push('/product-search/' + searchVal.value)
    } else {
      console.log("123");
    }
  }

  onMounted(() => {
    searchVal.value = route.params.keyword
  })
</script>

<style lang="less" scoped>
.product-search {
  .van-swipe-cell {
    margin-top: 30px;

  }
}
</style>