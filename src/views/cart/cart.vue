<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="cart-list">
      <van-swipe-cell v-for="item in cartData" :key="item.product_id">
        <van-card :num=item.buy_num :price=item.price desc="描述信息" :title=item.product_title class="goods-card"
          :thumb=item.product_image @click="productClick(item)" />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar :price="3050" button-text="立即购买" @submit="onSubmit" />
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { getCart } from '@/request/product'
  import { onMounted } from 'vue'
  import { ref } from 'vue';

  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  const productClick = (item) => {
    // console.log(item.houseId);
    router.push("/product-detail/" + item.product_id)
  }

  //获取购物车信息
  const cartData = ref([])
  const getCartList = () => {
    getCart(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("获取购物车信息成功");
          cartData.value = data.data.cart_items
        } else {
          console.log("获取购物车信息失败");
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
    getCartList()
  })
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

  .van-submit-bar {
    margin-bottom: 50px;
    // background-color: pink;
  }
}
</style>