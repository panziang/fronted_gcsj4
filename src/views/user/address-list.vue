<template>
  <div class="address-list">
    <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-list v-model="chosenAddressId" :list="addressPiniaList" default-tag-text="默认" @add="onAdd"
      @edit="onEdit" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import { useRouter } from 'vue-router';
  import { getAddressList } from '@/request/user'
  import { onMounted } from 'vue';
  import useAddressStore from '@/store/modules/address';
  import { storeToRefs } from 'pinia';


  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }
  //pinia
  const addressStore = useAddressStore()
  const { addressPiniaList } = storeToRefs(addressStore)

  // const addressList = ref([])

  const chosenAddressId = ref('');


  const onAdd = () => {
    router.push('/address-edit')
  }
  const onEdit = (item, index) => Toast('编辑地址:' + index);

  onMounted(() => {
    if (addressPiniaList.value.length == 0) {
      addressStore.getAddress()
    } else {
      addressStore.$reset()
      addressStore.getAddress()
    }
  })
</script>

<style lang="less" scoped></style>