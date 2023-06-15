<template>
  <div class="order-detail">
    <div class="header">
      <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft" />
      <template v-for="item in orderData.order_item_list" :key="item.id">
        <van-card :num=item.buy_num :price=item.total_price :title=item.product_name :thumb=item.product_img />
      </template>
    </div>
    <div class="pay-test" v-html=htmlData ref="payRef">
    </div>
    <van-cell-group inset>
      <van-button type="danger" round v-if="orderData.state == 'NEW'" @click="repayClick()">立即支付</van-button>
      <van-cell title="商品总价" :value=orderData.total_price size="large" />
      <van-cell title="优惠券" :value=orderData.coupon_record size="large" />
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
  import { getOrderInfo, getOrderRepay } from '@/request/order'
  import { onMounted, ref, nextTick } from 'vue';
  import { Toast } from 'vant';

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
        size: 50,
        // state: 'Pay'
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("获取订单信息成功");
          // orderData.value = data.data.current_data
          console.log("data.data.current_data", data.data.current_data);
          data.data.current_data.forEach(item => {
            // console.log(item);
            if (item.id == orderId) {
              orderData.value = item
            }
          })
          console.log("orderData.value", orderData.value);
          addressData.value = JSON.parse(orderData.value.receiver_address)
          addressInfo.value = `${addressData.value
            .province} ${addressData.value.city} ${addressData.value.region} ${addressData.value.detailAddress}`
          // console.log("addressData", addressData.value);
          // console.log("orderData", orderData.value);
          if (!orderData.value.coupon_record) {
            orderData.value.coupon_record = '未使用'
          } else {
            orderData.value.coupon_record = orderData.value.coupon_record.coupon_title
          }

        } else {
          Toast.fail("获取订单信息失败 " + data.msg)
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

  const htmlData = ref('')
  const payRef = ref()
  const repayClick = () => {
    getOrderRepay(
      {
        pay_type: "ALIPAY",
        client_type: "H5",
        out_trade_no: orderData.value.out_trade_no
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)
        console.log("二次支付成功");
        if (data.code) {
          Toast.fail("提交订单失败 " + data.msg)
        } else {
          htmlData.value = data
          nextTick(() => {
            console.log("payRef.value?.children[0]", payRef.value?.children[0]);
            payRef.value?.children[0]?.submit();
          })
        }


      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("二次支付失败2");
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