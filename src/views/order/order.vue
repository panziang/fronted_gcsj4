<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="order-list">
      <van-swipe-cell v-for="item in orderData" :key="item.id">
        <van-card num="1" :price=item.payPrice desc="描述信息" :title=item.orderItemVOList.product_name class="goods-card"
          :thumb=item.orderItemVOList.product_image />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>


    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getOrderInfo } from '@/request/order'
  import { ref } from 'vue'
  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }
  const orderData = ref([])
  const getOrder = () => {
    getOrderInfo(
      {
        page: 1,
        size: 10,
        state: 'Pay'
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

  onMounted(() => {
    getOrder()
  })
</script>

<style lang="less" scoped>
.order {
  .order-list {
    margin-top: 30px;

    .van-swipe-cell {
      margin-top: 30px;
    }

    .goods-card {
      margin: 0;
      background-color: #fff;
    }

    .delete-button {
      height: 100%;
    }
  }
}
</style>