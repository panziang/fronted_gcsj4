<template>
  <div class="address-list">
    <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-list v-model="chosenAddressId" :list="addressPiniaList" default-tag-text="默认" @add="onAdd" @edit="onEdit"
      @select="onSelect">
    </van-address-list>
    <div class="box">
      <van-button type="danger" round class="delete-button" @click="delClick">删除</van-button>
    </div>
    <van-empty description="暂无地址信息" v-if="addressPiniaList.length == 0">
    </van-empty>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import { useRouter } from 'vue-router';
  import { delAddressById } from '@/request/user'
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
    router.push('/address-new')
  }
  const onEdit = (item, index) => {
    // console.log("item, index", item.id, index);
    router.push('/address-edit/' + item.id)
  }
  const onSelect = (item, index) => {
    console.log("item, index", item.id, index);
    delId.value = item.id
  }
  const delId = ref(-1)
  const delClick = () => {
    console.log("delId", delId.value);
    if (delId.value !== -1) {
      delAddress(delId.value)
    } else {
      Toast.fail("请选择要删除的地址")
    }
  }

  const delAddress = (aid) => {
    delAddressById(
      {
        id: aid
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("删除地址成功");
          Toast.success("删除地址成功")
          location.reload()

        } else {
          console.log("删除地址失败");
          Toast.fail("删除地址失败")
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("删除地址失败");
      }
    )
  }

  onMounted(() => {
    if (addressPiniaList.value.length == 0) {
      addressStore.getAddress()
    } else {
      addressStore.$reset()
      addressStore.getAddress()
    }
  })
</script>

<style lang="less" scoped>
.address-list {
  .van-address-list {
    // border: 1px solid blue;
    height: calc(100vh - 160px);
  }

  .box {
    // border: 1px solid blue;
    // display: flex;
    // justify-content: flex-end;
    // align-items: flex-end;
    width: 90%;
    padding: 0 20px;


    .delete-button {
      // margin-right: 20px;
      width: 100%;
    }
  }

}
</style>