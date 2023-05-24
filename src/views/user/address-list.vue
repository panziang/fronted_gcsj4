<template>
  <div class="address-list">
    <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList" disabled-text="以下地址超出配送范围"
      default-tag-text="默认" @add="onAdd" @edit="onEdit" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import { useRouter } from 'vue-router';
  import { getAddressList } from '@/request/userApi'
  import { onMounted } from 'vue';


  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }
  const addressList = ref([])
  const getAddress = () => {
    getAddressList(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("获取地址成功");
          // data.data.forEach(item => {
          //   console.log(item);
          //   addressList.value.push(item)
          //   addressList.value.id = item.id;
          //   addressList.value.name = item.receiveName;
          //   addressList.value.tel = item.phone;
          //   addressList.value.address = item.province + item.city + item.region + item.detailAddress;
          //   addressList.value.isDefault = item.defaultStatus ? true : false;
          // })
          console.log("data1", data.data);
          console.log("id", addressList.value[0].id);
          for (let i = 0; i < data.data.length; i++) {
            // addressList.value[i].id = data.data[i].id;
            // addressList.value[i].name = data.data[i].receiveName;
            // addressList.value[i].tel = data.data[i].phone;
            // addressList.value[i].address = data.data[i].province + data.data[i].city + data.data[i].region + data.data[i].detailAddress;
            // addressList.value[i].isDefault = data.data[i].defaultStatus ? true : false;
          }
          console.log("addressList", addressList.value);
        } else {
          console.log("获取地址失败1");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取地址失败2");
      }
    )
  }

  const chosenAddressId = ref('1');

  // const list = [
  //   {
  //     id: '1',
  //     name: '张三',
  //     tel: '13000000000',
  //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
  //     isDefault: true,
  //   },
  //   {
  //     id: '2',
  //     name: '李四',
  //     tel: '1310000000',
  //     address: '浙江省杭州市拱墅区莫干山路 50 号',
  //   },
  // ];
  const disabledList = [
    {
      id: '3',
      name: '王五',
      tel: '1320000000',
      address: '浙江省杭州市滨江区江南大道 15 号',
    },
  ];

  const onAdd = () => {
    router.push('/address-edit')
  }
  const onEdit = (item, index) => Toast('编辑地址:' + index);

  onMounted(() => {
    getAddress()
  })
</script>

<style lang="less" scoped></style>