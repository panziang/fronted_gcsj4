<template>
  <div class="pay">
    <van-nav-bar title="下单页面" left-text="返回" left-arrow @click-left="onClickLeft" />
    <template v-for="item in orderList" :key="item.product_id">
      <van-card :num=item.buy_num :price=item.price :title=item.product_title :thumb=item.product_image />
    </template>

    <div class="address">
      <van-cell title="地址" is-link value="内容" @click="addressClick" size="large">
        <template #value>
          {{ chosenAddressData }}
        </template></van-cell>

      <van-popup v-model:show="showAddressList" round position="bottom" style="height: 90%; padding-top: 4px;">
        <!-- <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" @change="onChange" @exchange="onExchange" /> -->
        <van-address-list v-model="chosenAddressId" :list=addressPiniaList default-tag-text="默认" @add="onAdd"
          @select="onSelect" />
      </van-popup>

    </div>

    <div class="coupon">
      <!-- 优惠券单元格 -->
      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="couponClick" size="large" />
      <!-- 优惠券列表 -->
      <van-popup v-model:show="showCouponList" round position="bottom" style="height: 90%; padding-top: 4px;">
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" @change="onChange" :show-exchange-bar=false />
      </van-popup>
    </div>
    <div class="pay-test" v-html=htmlData ref="payRef">
    </div>
    <van-submit-bar :price=totalPrice button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script >
  import { defineComponent } from 'vue';
  import { onMounted } from 'vue';
  export default defineComponent({
    // 离开下单页时将pinia中的状态重置
    beforeRouteLeave (to, from, next) {
      //需要处理的逻辑
      const orderStore = useOrderStore()
      const couponStore = useCouponStore()
      orderStore.$reset()
      couponStore.$reset()
      next()
    }
  });
</script>

<script setup>
  import { ref, nextTick } from 'vue'
  import { useRouter, useRoute } from 'vue-router';
  import { getOrderConfirm, getOrderToken } from '@/request/order'
  import { Toast } from 'vant';
  import useOrderStore from '@/store/modules/order'
  import useAddressStore from '@/store/modules/address';
  import useCouponStore from '@/store/modules/coupon'
  import { storeToRefs } from 'pinia';

  const router = useRouter()
  const route = useRoute()
  const orderWay = route.params.order_way
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }


  //pinia
  const orderStore = useOrderStore()
  const { orderList } = storeToRefs(orderStore)
  const productId = ref([])
  orderList.value.forEach(item => {
    productId.value.push(item.product_id)
  })
  console.log("productId", productId.value);

  const addressStore = useAddressStore()
  const { addressPiniaList, defaultAddress } = storeToRefs(addressStore)

  const couponStore = useCouponStore()
  const { myCouponList } = storeToRefs(couponStore)


  const totalPrice = ref(0)
  orderList.value.forEach(item => {
    totalPrice.value += item.total_price * 100
  })

  //地址模块
  const showAddressList = ref(false)
  // const chosenAddressId = ref(defaultAddress.value.id);
  const chosenAddressId = ref(null);
  const chosenAddressData = ref(null)
  //选中地址的回调
  // const chosenAddressData = ref(`${defaultAddress.value.name} ${defaultAddress.value.tel} ${defaultAddress.value.address}`)
  // chosenAddressData.value = `${defaultAddress.value.name} ${defaultAddress.value.tel} ${defaultAddress.value.address}`
  // chosenAddressId.value = defaultAddress.value.id

  const addressClick = () => {
    showAddressList.value = true

  }
  const onAdd = () => {
    router.push('/address-new')
  }

  const onSelect = (item, index) => {
    console.log("item", item, "index", index);
    showAddressList.value = false
    chosenAddressId.value = item.id
    // console.log("chosenAddressId", chosenAddressId.value);
    chosenAddressData.value = `${item.name} ${item.tel} ${item.address}`
  }

  //优惠券模块
  const couponClick = () => {
    showCouponList.value = true
  }

  const coupons = ref([]);
  coupons.value = myCouponList.value
  const showCouponList = ref(false);
  const chosenCoupon = ref(-1);
  const chosenCouponId = ref(null);
  let tmpPrice = totalPrice.value
  //优惠券index
  // const chosenIndex = ref(null)

  const onChange = (index) => {
    console.log("coupons.value[index]", coupons.value[index].menkan);
    console.log("tmpPrice", tmpPrice);
    if (coupons.value[index].menkan > tmpPrice / 100) {
      Toast.fail("未达到门槛价格")
    } else {
      // console.log("isCouponClick", isCouponClick.value);
      if (chosenCoupon.value === -1) {
        chosenCoupon.value = index;
        totalPrice.value = tmpPrice - coupons.value[index].value
        chosenCouponId.value = coupons.value[index].id
        // console.log(coupons.value[index].id);
        showCouponList.value = false;
      }
      else {
        if (index === chosenCoupon.value) {
          console.log("123");
          chosenCoupon.value = -1
          totalPrice.value = tmpPrice
          chosenCouponId.value = null
          showCouponList.value = false;
        } else {
          chosenCoupon.value = index;
          totalPrice.value = tmpPrice - coupons.value[index].value
          chosenCouponId.value = coupons.value[index].id
          console.log(coupons.value[index].id);
          showCouponList.value = false;
        }
      }
    }




  };

  //获取订单防重令牌
  const orderToken = ref('')
  const getToken = () => {
    getOrderToken(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          orderToken.value = data.data
          console.log("获取成功");
          confirmPay()
        } else {
          console.log("获取失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取失败");
      }
    )
  }
  //提交订单
  const htmlData = ref('')
  const payRef = ref()
  const confirmPay = () => {
    getOrderConfirm(
      {
        coupon_record_id: chosenCouponId.value,
        product_ids: productId.value,
        pay_type: "ALIPAY",
        client_type: "H5",
        address_id: chosenAddressId.value,
        total_price: tmpPrice / 100,
        real_price: totalPrice.value / 100,
        token: orderToken.value,
        order_way: orderWay,
        buy_num: orderList.value.length
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)
        if (!data.code) {
          htmlData.value = data
          // document.forms[0].submit();
          nextTick(() => {
            payRef.value?.children[0]?.submit();
          })
        } else {
          Toast.fail("提交订单失败 " + data.msg)
        }


      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("提交失败");
      }
    )
  }
  const onSubmit = () => {
    getToken()

  }

  onMounted(() => {
    if (myCouponList.value.length == 0) {
      couponStore.getMyCouponList()
      setTimeout(() => {
        chosenAddressData.value = `${defaultAddress.value.name} ${defaultAddress.value.tel} ${defaultAddress.value.address}`
        chosenAddressId.value = defaultAddress.value.id
      }, 500)

    } else {
      couponStore.$reset()
      couponStore.getMyCouponList()
      setTimeout(() => {
        chosenAddressData.value = `${defaultAddress.value.name} ${defaultAddress.value.tel} ${defaultAddress.value.address}`
        chosenAddressId.value = defaultAddress.value.id
      }, 500)

    }

    if (addressPiniaList.value.length == 0) {
      addressStore.getAddress()


    } else {
      addressStore.$reset()
      addressStore.getAddress()
    }
  })
</script>

<style lang="less" scoped>
.pay {
  .van-submit-bar {
    margin-bottom: 60px;
  }

  .pay-test {
    height: 100px;
    // border: 1px solid red;
  }
}
</style>