<template>
  <div class="order" ref="orderRef">
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="order-list" v-if="isLogin">
      <van-tabs v-model:active="active">
        <van-tab title="已支付订单">
          <van-swipe-cell v-for="item in orderData" :key="item.id">
            <van-card num="1" :price=item?.pay_price :title=item?.order_item_list[0]?.product_name class="goods-card"
              :thumb=item?.order_item_list[0]?.product_img @click="orderClick(item)" />
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delOrderClick(item)" />
            </template>
          </van-swipe-cell>
          <van-empty description="暂无订单" v-if="orderData.length == 0">
          </van-empty>
        </van-tab>
        <van-tab title="未支付订单">
          <van-swipe-cell v-for="item in orderNewData" :key="item.id">
            <van-card num="1" :price=item?.pay_price :title=item?.order_item_list[0]?.product_name class="goods-card"
              :thumb=item?.order_item_list[0]?.product_img @click="orderClick(item)" />
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
          <van-empty description="暂无订单" v-if="orderNewData.length == 0">
          </van-empty>
        </van-tab>
        <van-tab title="已失效订单">
          <van-swipe-cell v-for="item in orderCancelData" :key="item.id">
            <van-card num="1" :price=item?.pay_price :title=item?.order_item_list[0]?.product_name class="goods-card"
              :thumb=item?.order_item_list[0]?.product_img @click="orderClick(item)" />
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delOrderClick(item)" />
            </template>
          </van-swipe-cell>
          <van-empty description="暂无订单" v-if="orderCancelData.length == 0">
          </van-empty>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="test">
      <template v-for="item in 100" :key="item">
        <p>{{ item }}</p>
      </template>
    </div> -->
    <div class="empty">
      <van-empty description="暂未登录" v-if="!isLogin">
        <van-button round type="danger" class="bottom-button" @click="signInClick">登录</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script>
  //给APP.vue里的keepalive使用，定义路由name
  export default { name: "order" }
</script>
<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getOrderInfo } from '@/request/order'
  import { ref, watch } from 'vue'
  import { Toast } from 'vant';
  import useScroll from "@/hooks/useScroll"

  const orderRef = ref()
  const { isReachBottom, scrollTop } = useScroll(orderRef)

  const active = ref(0);
  const router = useRouter()
  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  const delOrderClick = (item) => {
    console.log("item", item.id);
  }
  //判断是否登录
  const isLogin = ref(false)
  //未登录时按钮跳转至登录
  const signInClick = () => {
    router.push('/sign-in')
  }

  const orderClick = (item) => {
    router.push('/order-detail/' + item.id)
  }


  const orderData = ref([])
  const current_page1 = ref(1)
  const getOrder = (state) => {
    getOrderInfo(
      {
        page: current_page1.value,
        size: 10,
        state: state
      },
      (status, res, data) => {
        // console.log('status: ', status)
        // console.log('res: ', res)
        // console.log('data: ', data)

        if (data.code == '0') {
          // console.log("获取订单信息成功");
          orderData.value = [...orderData.value, ...data.data.current_data]
          isReachBottom.value = false
          // console.log("orderData", orderData.value);

        } else {
          Toast.fail("获取订单信息失败 " + data.msg)
          console.log("获取订单信息失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取订单信息失败");
      }
    )
  }

  const current_page2 = ref(1)
  const orderCancelData = ref([])
  const getCancelOrder = (state) => {
    getOrderInfo(
      {
        page: current_page2.value,
        size: 10,
        state: state
      },
      (status, res, data) => {
        // console.log('status: ', status)
        // console.log('res: ', res)
        // console.log('data: ', data)

        if (data.code == '0') {
          // console.log("获取订单信息成功");
          orderCancelData.value = [...orderCancelData.value, ...data.data.current_data]
          isReachBottom.value = false
          // console.log("orderData", orderData.value);

        } else {
          Toast.fail("获取订单信息失败 " + data.msg)
          console.log("获取订单信息失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取订单信息失败");
      }
    )
  }

  const orderNewData = ref([])
  const getNewOrder = (state) => {
    getOrderInfo(
      {
        page: 1,
        size: 10,
        state: state
      },
      (status, res, data) => {
        // console.log('status: ', status)
        // console.log('res: ', res)
        // console.log('data: ', data)

        if (data.code == '0') {
          // console.log("获取订单信息成功");
          orderNewData.value = data.data.current_data
          // console.log("orderData", orderData.value);

        } else {
          Toast.fail("获取订单信息失败 " + data.msg)
          console.log("获取订单信息失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取订单信息失败");
      }
    )
  }

  onMounted(() => {
    if (localStorage.getItem('1024token')) {
      isLogin.value = true
    }
    getOrder('PAY')
    getCancelOrder('CANCEL')
    getNewOrder('NEW')
  })

  //从useScroll中取值isReachBottom，判断是否到达底部，然后发送网络请求
  watch(isReachBottom, (newValue) => {
    if (newValue) {
      console.log("newValue", newValue);
      //在数据请求完之后将isReachBottom改为false
      console.log("已到底部");
      current_page1.value++
      current_page2.value++
      getOrder()
      getCancelOrder()
    }
  })
</script>

<style lang="less" scoped>
.order {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;

  .order-list {
    margin-top: 30px;
    // margin-bottom: 60px;

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

  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>