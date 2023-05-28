<template>
  <van-nav-bar title="个人中心" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="user-info" v-if="isLogin">
    <!-- <h2>user-info</h2> -->
    <div class="header">
      <van-image round width="4rem" height="4rem" fit="cover" :src=userInfo.head_img />
      <div class="info-content">
        <h2>{{ userInfo.name }}</h2>
        <span>
          <p>个性签名：{{ userInfo.slogan }}</p>
        </span>
      </div>
      <div class="edit">
        <van-icon name="edit" />
        编辑
      </div>
    </div>
    <div class="content">
      <div class="card">
        <div class="card-box" @click="cartClick">
          <div class="num">
            <span>
              <p>{{ cartNum }}</p>
              购物车
            </span>
          </div>
          <div class="icon">
            <van-icon name="cart" />
          </div>
        </div>
        <div class="card-box" @click="couponClick">
          <div class="num">
            <span>
              <p>{{ couponNum }}</p>
              我的优惠券
            </span>
          </div>
          <div class="icon">
            <van-icon name="coupon" />
          </div>
        </div>
      </div>
      <div class="list">
        <van-cell-group>
          <van-cell title="地址信息" icon="location-o" is-link @click="addressClick" />
          <van-cell title="订单信息" icon="orders-o" is-link @click="orderClick" />
        </van-cell-group>
      </div>
      <div class="exit-btn">
        <van-button type="danger" @click="getOutClick">退出登录</van-button>
      </div>
    </div>
  </div>
  <van-empty description="暂未登录" v-if="!isLogin">
    <van-button round type="danger" class="bottom-button" @click="signInClick">登录</van-button>
  </van-empty>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { getUserDetail, getSignOut } from '@/request/user'
  import { onMounted } from 'vue';
  import { reactive } from 'vue';
  import useCouponStore from '@/store/modules/coupon'
  import useCartStore from '@/store/modules/cart';
  import { storeToRefs } from 'pinia';

  const router = useRouter()

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

  const orderClick = () => {
    router.push('/order')
  }

  const userInfo = reactive({
    head_img: '',
    name: '',
    slogan: ''
  })
  const cartClick = () => {
    router.push('/cart');
  }

  const couponClick = () => {
    router.push('/coupon')
  }
  //优惠券模块
  const couponStore = useCouponStore()
  const { couponList, couponNum } = storeToRefs(couponStore)

  const cartStore = useCartStore()
  const { cartNum } = storeToRefs(cartStore)


  const addressClick = () => {
    router.push('/address-list')
  }

  const getUserInfo = () => {
    getUserDetail(
      {

      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("获取用户信息成功");
          userInfo.head_img = data.data.head_img
          userInfo.name = data.data.name
          userInfo.slogan = data.data.slogan

        } else {
          // PromptMessage.messageBoxError('登录失败', data.msg)
          console.log("获取用户信息失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("登录失败");
      }
    )
  }
  const getOutClick = () => {
    getSignOut(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("成功登出");
          localStorage.removeItem('1024token')
          router.push('/sign-in')

        } else {
          // PromptMessage.messageBoxError('登录失败', data.msg)
          console.log("登出失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("登出失败");
      }
    )
  }

  onMounted(() => {
    if (localStorage.getItem('1024token')) {
      isLogin.value = true
    }

    if (couponList.value.length == 0) {
      couponStore.getCoupon()

    } else {
      couponStore.$reset()
      couponStore.getCoupon()
    }
    cartStore.getCartList()

    getUserInfo()
  })


</script>

<style lang="less" scoped>
.user-info {
  background-color: rgb(242, 242, 242);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--line-color);
    padding: 30px 10px;
  }

  .content {
    height: calc(100vh - 130px);
    padding-left: 10px;
    padding-right: 10px;
    // background-color: rgb(242, 242, 242);

    .card {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;

      .card-box {
        width: 48%;
        height: 80px;
        background-color: #fff;
        border-radius: 10%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .num {
          p {
            font-size: 16px;
            line-height: 0;
          }

        }

        .icon {
          font-size: 30px;
        }
      }
    }

    .list {
      margin-top: 40px;
    }

    .exit-btn {
      display: flex;
      justify-content: center;
      margin-top: 100px;

      .van-button {
        width: 200px;
      }
    }
  }
}

.bottom-button {
  width: 160px;
  height: 40px;
}
</style>