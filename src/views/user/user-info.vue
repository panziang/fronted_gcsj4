<template>
  <div class="user-info">
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
              <p>12</p>
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
              <p>3</p>
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
          <van-cell title="单元格" icon="location-o" is-link />
          <van-cell title="单元格" icon="location-o" is-link />
          <van-cell title="单元格" icon="location-o" is-link />
          <van-cell title="单元格" icon="location-o" is-link />
          <van-cell title="单元格" icon="location-o" is-link />
        </van-cell-group>
      </div>
      <div class="exit-btn">
        <van-button type="danger">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { getUserDetail } from '../../request/userApi'
  import { onMounted } from 'vue';
  import { reactive } from 'vue';

  const router = useRouter()

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

  onMounted(() => {
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
</style>