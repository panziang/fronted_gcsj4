<template>
  <div class="coupon">
    <van-nav-bar title="优惠券" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 优惠券列表 -->
    <van-coupon-list :coupons=couponList close-button-text="不使用优惠券" enabled-title="可领取" disabled-title="不可领取" />

  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import useCouponStore from '@/store/modules/coupon'
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';


  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  //优惠券模块
  const couponStore = useCouponStore()
  const { couponList } = storeToRefs(couponStore)

  const coupons = ref([]);
  coupons.value = couponList.value
  const showList = ref(false);
  const chosenCoupon = ref(-1);

  // const disabledCoupons = ref([coupon]);
  const onChange = (index) => {
    showList.value = false;
    chosenCoupon.value = index;
  };
  const onExchange = (code) => {
    coupons.value.push(coupon);
  };

  onMounted(() => {
    if (couponList.value.length == 0) {
      couponStore.getCoupon()
    } else {
      couponStore.$reset()
      couponStore.getCoupon()
    }
  })
</script>

<style lang="less" scoped>
.coupon {
  height: calc(100vh - 100px);
}
</style>