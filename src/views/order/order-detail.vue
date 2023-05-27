<template>
  <div class="order-detail">
    <div class="header">
      <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft" />
      <template v-for="item in orderData.order_item_list" :key="item.id">
        <van-card :num=item.buy_num :price=item.total_price :title=item.product_name :thumb=item.product_img />
      </template>
    </div>
    <van-cell-group inset>
      <van-cell title="商品总价" :value=orderData.total_price size="large" />
      <van-cell title="实付款" :value=orderData.pay_price size="large" />
      <van-cell title="付款方式" :value=orderData.pay_type size="large" />
      <van-cell title="收货人信息" :value=addressData.receiveName size="large" />
      <van-cell title="收货地址" size="large" :value=addressInfo />
      <van-cell title="创建时间" size="large" :value=orderData.create_time />
    </van-cell-group>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { getOrderInfo } from '@/request/order'
  import { onMounted, ref } from 'vue';

  const route = useRoute()
  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }
  const orderId = route.params.id;
  //获取订单信息
  const addressData = ref({})
  const addressInfo = ref('')
  const orderData = ref({})
  const getOrder = () => {
    getOrderInfo(
      {
        page: 1,
        size: 10,
        // state: 'Pay'
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("获取订单信息成功");
          // orderData.value = data.data.current_data
          // console.log("data.data.current_data", data.data.current_data);
          data.data.current_data.forEach(item => {
            // console.log(item);
            if (item.id == orderId) {
              orderData.value = item
            }
          })
          addressData.value = JSON.parse(orderData.value.receiver_address)
          addressInfo.value = `${addressData.value
            .province} ${addressData.value.city} ${addressData.value.region} ${addressData.value.detailAddress}`
          // console.log("addressData", addressData.value);
          // console.log("orderData", orderData.value);

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
.order-detail {
  // border: 1px solid red;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;

}
</style>