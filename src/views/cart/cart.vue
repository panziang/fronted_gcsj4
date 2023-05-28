<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="cart-list" v-if="isLogin">
      <van-swipe-cell v-for="item in cartData" :key="item.product_id">
        <van-card :num=item.buy_num :price=item.price :title=item.product_title class="goods-card"
          :thumb=item.product_image>
          <!-- @click="productClick(item)" -->
          <template #footer>
            <van-checkbox v-model="item.isCheck" icon-size="24px" class="checkbox"
              @click="checkboxClick(item)">选择</van-checkbox>
            <!-- <van-radio name="1">单选框 1</van-radio> -->
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="delClick(item)" />
        </template>
      </van-swipe-cell>
      <van-submit-bar :price=cartPrice button-text="立即购买" @submit="onSubmit">
        <van-button round type="warning" class="clear-button" @click="clearClick">清空购物车</van-button>
      </van-submit-bar>
    </div>
    <van-empty description="购物车为空" v-if="cartData.length == 0">
    </van-empty>
    <van-empty description="暂未登录" v-if="!isLogin">
      <van-button round type="danger" class="bottom-button" @click="signInClick">登录</van-button>
    </van-empty>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { getCart, clearCart, delCartById } from '@/request/product'
  import { onMounted } from 'vue'
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import useOrderStore from '@/store/modules/order'
  import { storeToRefs } from 'pinia';

  const router = useRouter()
  //pinia
  const orderStore = useOrderStore()
  const { orderList } = storeToRefs(orderStore)
  //判断是否登录
  const isLogin = ref(false)
  //未登录时按钮跳转至登录
  const signInClick = () => {
    router.push('/sign-in')
  }
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  const productClick = (item) => {
    // console.log(item.houseId);
    router.push("/product-detail/" + item.product_id)
  }
  const onSubmit = () => {
    let haveCheck = ref(false)
    cartData.value.forEach(item => {
      if (item.isCheck) {
        orderList.value.push(item)
        haveCheck.value = true
      }
    })
    if (haveCheck.value) {
      router.push('/pay/' + "CART")
    } else {
      Toast.fail('请选择购买的商品！');
    }

  }

  //获取购物车信息
  const cartData = ref([])
  const cartPrice = ref(0)
  const checkboxClick = (item) => {
    if (item.isCheck) {
      cartPrice.value += item.total_price * 100
    } else {
      cartPrice.value -= item.total_price * 100
    }
  }
  const getCartList = () => {
    getCart(
      {},
      (status, res, data) => {
        // console.log('status: ', status)
        // console.log('res: ', res)
        // console.log('data: ', data)

        if (data.code == '0') {
          // console.log("获取购物车信息成功");
          cartData.value = data.data.cart_items
          cartData.value.forEach(item => {
            item.isCheck = 0
            // item.price *= 100
            // console.log("item.total_price", item.total_price);
            // cartPrice.value += item.total_price
          })
          console.log("cartData", cartData.value);
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

  //删除购物项
  const delClick = (item) => {
    delCartById(
      {
        id: item.product_id
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("删除成功");
          Toast.success('删除成功');
          getCartList()
        } else {
          console.log("删除失败");
          Toast.fail('删除失败');
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

  //清空购物车
  const clearClick = () => {
    clearCart(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("清空购物车成功");
          Toast.success('清空购物车成功');
          getCartList()
        } else {
          console.log("清空购物车失败");
          Toast.fail('清空购物车失败');
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
    if (localStorage.getItem('1024token')) {
      isLogin.value = true
    }
    getCartList()
  })
</script>

<style lang="less" scoped>
.cart {
  .cart-list {
    margin-top: 30px;

    .van-swipe-cell {
      margin-top: 30px;

      .checkbox {
        // border: 1px solid red;
        display: flex;
        justify-content: end;
      }
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

  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>