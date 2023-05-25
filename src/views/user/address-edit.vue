<template>
  <div class="address-list">
    <van-nav-bar title="地址编辑" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
      :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import { useRouter } from 'vue-router';
  import { areaList } from '@vant/area-data';
  import { getNewAddress } from '@/request/user'


  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }
  // const info = reactive({
  //   name: '',
  //   tel: '',
  //   addressDetail: '',
  //   areaCode: '',
  //   postalCode: '',
  //   isDefault: '',
  // })

  const searchResult = ref([]);
  const saveAddress = () => {
    getNewAddress(
      {
        default_status: 1,
        receive_name: "鲁庆宇",
        phone: "19102605563",
        province: "安徽",
        city: "芜湖",
        region: "鸠江区",
        detail_address: "芜湖市鸠江区沈巷镇八角快速"
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("获取订单信息成功");
          orderData.value = data.data.current_data
          console.log("orderData", orderData.value);

        } else {
          console.log("获取订单信息失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取购物车信息失败");
      }
    )
  }

  const onSave = (content) => {
    console.log("content", content);
    console.log("123");
    getNewAddress(
      {
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
          console.log("添加地址成功");
          Toast.success('添加成功');

        } else {
          console.log("添加地址失败");
          Toast.fail('添加失败');
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("添加地址失败");
      }
    )
  };
  const onDelete = () => Toast('delete');
                  // const onChangeDetail = (val) => {
                  //   if (val) {
                  //     searchResult.value = [
                  //       {
                  //         name: '黄龙万科中心',
                  //         address: '杭州市西湖区',
                  //       },
                  //     ];
                  //   } else {
                  //     searchResult.value = [];
                  //   }
                  // };
</script>

<style lang="less" scoped></style>