<template>
  <div class="address-list">
    <van-nav-bar title="编辑地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit :area-list="areaList" :show-postal=false :show-delete=false show-set-default show-search-result
      :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
      :address-info=addressInfo />
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { Toast } from 'vant';
  import { useRouter, useRoute } from 'vue-router';
  import { areaList } from '@vant/area-data';
  import { getNewAddress, editAddressInfo } from '@/request/user'
  import { onMounted } from 'vue';
  import useAddressStore from '@/store/modules/address';
  import { storeToRefs } from 'pinia';


  const router = useRouter()
  const route = useRoute()


  //pinia
  const addressStore = useAddressStore()
  const { addressPiniaList, addressInfo } = storeToRefs(addressStore)

  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }
  // const info = reactive({
  //   name: '',
  //   tel: '',
  //   province: '',
  //   city: '',
  //   county: '',
  //   addressDetail: '',
  //   areaCode: '',
  //   postalCode: '',
  //   isDefault: '',
  // })

  const onSave = (content) => {
    console.log("content", content);
    console.log("123");
    editAddressInfo(
      {
        address_id: content.id,
        default_status: content.isDefault ? 1 : 0,
        receive_name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        region: content.county,
        detail_address: content.addressDetail
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("修改地址成功");
          Toast.success('修改成功');
          setTimeout(() => {
            router.push('/address-list')
          }, 1500)

        } else {
          console.log("修改地址失败");
          Toast.fail('修改失败');
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("修改地址失败");
        Toast.fail('修改失败');
      }
    )
  };
  // const onDelete = () => Toast('delete');

  onMounted(() => {
    const addressId = route.params.aid
    if (addressPiniaList.value.length == 0) {
      addressStore.getAddress()
      addressStore.getAddressById(addressId)
      // console.log("addressPiniaList1", addressPiniaList.value);

    } else {
      addressStore.$reset()
      addressStore.getAddress()
      // console.log("addressPiniaList2", addressPiniaList.value);
      addressStore.getAddressById(addressId)
    }
  })
</script>

<style lang="less" scoped></style>