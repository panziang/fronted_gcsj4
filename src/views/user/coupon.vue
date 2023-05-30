<template>
  <div class="coupon">
    <van-nav-bar title="优惠券" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList1 = true" value="" title="可领取优惠券" />
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList2 = true" value="" title="我的优惠券" />
    <!-- 优惠券列表 -->
    <van-popup v-model:show="showList1" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list :coupons=couponList :show-close-button=false :show-exchange-bar=false enabled-title="可领取"
        disabled-title="不可领取" @change="onChange1" :chosen-coupon=chosenCoupon>
        <template #list-footer>
          <div class="getCouponBtn">
            <van-button type="danger" @click="getCoupon">领取优惠券</van-button>
          </div>

        </template>
      </van-coupon-list>
    </van-popup>
    <!-- 我的优惠券列表 -->
    <van-popup v-model:show="showList2" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list :coupons=myCouponList :show-close-button=false :show-exchange-bar=false enabled-title="可用"
        disabled-title="不可用" @change="onChange2" :chosen-coupon=chosenCoupon>
      </van-coupon-list>
    </van-popup>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import useCouponStore from '@/store/modules/coupon'
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';
  import { addCoupon } from '@/request/coupon'
  import { Toast } from 'vant';


  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  //优惠券模块
  const couponStore = useCouponStore()
  const { couponList, myCouponList } = storeToRefs(couponStore)

  const coupons = ref([]);
  const myCoupons = ref([]);
  // coupons.value = couponList.value
  // myCoupons.value = myCouponList.value
  const showList1 = ref(false);
  const showList2 = ref(false);
  const chosenCoupon = ref(-1);

  // const disabledCoupons = ref([coupon]);
  const onChange1 = (index) => {
    // showList.value = false;
    chosenCoupon.value = index;
    console.log("chosenCoupon", chosenCoupon.value);
    console.log("coupons.value[chosenCoupon.value]", coupons.value[chosenCoupon.value].id);
  };
  const onChange2 = (index) => {
    // showList.value = false;
    chosenCoupon.value = index;
    console.log("myCoupons.value[chosenCoupon.value]", myCoupons.value[chosenCoupon.value].id);
  };

  const getCoupon = () => {
    addCoupon(
      {
        id: coupons.value[chosenCoupon.value].id
      },
      (status, res, data) => {
        // console.log('status: ', status)
        // console.log('res: ', res)
        // console.log('data: ', data)

        if (data.code == '0') {
          Toast.success('领取成功');
          // console.log("获取订单信息成功");
          // orderCancelData.value = data.data.current_data
          // console.log("orderData", orderData.value);

        } else {
          Toast.fail('领取失败');
          console.log("领取优惠券失败");
          // console.log("获取订单信息失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("领取优惠券失败");
        Toast.fail('领取失败');
      }
    )
  }

  onMounted(() => {
    couponStore.$reset()
    couponStore.getCoupon()
    couponStore.getMyCouponList()
    coupons.value = couponList.value
    myCoupons.value = myCouponList.value
  })
</script>

<style lang="less" scoped>
.coupon {
  height: calc(100vh - 100px);

  .getCouponBtn {
    display: flex;
    justify-content: center;

    .van-button {
      margin-top: 30px;
    }
  }
}
</style>