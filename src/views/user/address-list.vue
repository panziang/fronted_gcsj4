<template>
  <div class="address-list">
    <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-list v-model="chosenAddressId" :list="addressList" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import { useRouter } from 'vue-router';
  import { getAddressList } from '@/request/user'
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
          data.data.forEach(item => {
            let obj = ref({})
            obj.value.id = item.id;
            obj.value.name = item.receiveName;
            obj.value.tel = item.phone;
            obj.value.address = item.province + item.city + item.region + item.detailAddress;
            obj.value.isDefault = (item.defaultStatus === 1) ? true : false;
            addressList.value.push(obj.value)

          })
          // console.log("addressList", addressList.value);
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

  const chosenAddressId = ref('');

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

  const onAdd = () => {
    router.push('/address-edit')
  }
  const onEdit = (item, index) => Toast('编辑地址:' + index);

  onMounted(() => {
    getAddress()
  })
</script>

<style lang="less" scoped></style>