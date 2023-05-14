<template>
  <div class="address-list">
    <van-nav-bar title="地址编辑" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
      :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
      @change-detail="onChangeDetail" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import { useRouter } from 'vue-router';


  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  const searchResult = ref([]);

  const onSave = () => Toast('save');
  const onDelete = () => Toast('delete');
  const onChangeDetail = (val) => {
    if (val) {
      searchResult.value = [
        {
          name: '黄龙万科中心',
          address: '杭州市西湖区',
        },
      ];
    } else {
      searchResult.value = [];
    }
  };
</script>

<style lang="less" scoped></style>