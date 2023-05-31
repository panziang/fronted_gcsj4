<template>
  <div class="nav-bar">
    <!-- <div class="title">1024shop</div> -->
    <van-search v-model="searchVal" placeholder="请输入搜索关键词" show-action @search="onSearch">
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import useSearchStore from '@/store/modules/search'
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';

  const searchVal = ref('')
  const searchStore = useSearchStore()
  const router = useRouter()
  const { searchList, searchCount } = storeToRefs(searchStore)

  const onSearch = (val) => {
    console.log("val", val);
    searchStore.getSearch(val)
    router.push('/product-search/' + val)
  }
  const onClickButton = () => {
    console.log("searchVal", searchVal.value);
    searchStore.getSearch(searchVal.value)
    router.push('/product-search/' + searchVal.value)
  }

</script>

<style lang="less" scoped>
.nav-bar {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  height: 46px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 10px;

  .van-search {
    // border: 1px solid red;
    padding-right: 20px;

    :deep(.van-search__action) {
      // border: 1px solid red;
      margin-left: 10px;
    }
  }

}
</style>