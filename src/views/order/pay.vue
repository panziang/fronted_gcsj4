<template>
  <div class="pay">
    <van-nav-bar title="下单页面" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-card num="2" price="2.00" desc="描述信息" title="商品标题"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
    <div class="address">
      <van-cell title="地址" is-link value="内容" />
    </div>
    <div class="coupon">
      <!-- 优惠券单元格 -->
      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showCouponList = true" />
      <!-- 优惠券列表 -->
      <van-popup v-model:show="showCouponList" round position="bottom" style="height: 90%; padding-top: 4px;">
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons"
          @change="onChange" @exchange="onExchange" />
      </van-popup>
    </div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';


  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  //优惠券模块
  const coupon = {
    available: 1,
    condition: '无门槛\n最多优惠12元',
    reason: '',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1.5',
    unitDesc: '元',
  };
  const coupon2 = {
    available: 1,
    condition: '无门槛\n最多优惠12元',
    reason: '',
    value: 180,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1.8',
    unitDesc: '元',
  };

  const coupons = ref([coupon, coupon2]);
  const showCouponList = ref(false);
  const chosenCoupon = ref(-1);

  const disabledCoupons = ref([coupon]);
  const onChange = (index) => {
    showCouponList.value = false;
    chosenCoupon.value = index;
  };
  const onExchange = (code) => {
    coupons.value.push(coupon);
  };
</script>

<style lang="less" scoped>
.pay {
  .van-submit-bar {
    margin-bottom: 60px;
  }
}
</style>