<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="cart-list">
      <van-swipe-cell>
        <van-card num="1" price="2.00" desc="描述信息" title="商品标题" class="goods-card"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>

      <van-swipe-cell>
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" class="goods-card"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>

      <van-swipe-cell>
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" class="goods-card"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>

      <van-swipe-cell>
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" class="goods-card"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>

      <van-swipe-cell>
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" class="goods-card"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>

    </div>
  </div>
  <van-submit-bar :price="3050" button-text="立即购买" @submit="onSubmit" />
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }
</script>

<style lang="less" scoped>
.cart {
  .cart-list {
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