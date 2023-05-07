<template>
  <div class="user-info">
    <!-- <h2>user-info</h2> -->
    <div class="header">
      <van-image round width="4rem" height="4rem" fit="cover"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      <div class="info-content">
        <h2>duck不必</h2>
        <span>
          <p>个性签名：一给我哩giaogiao</p>
        </span>
      </div>
      <div class="edit">
        <van-icon name="edit" />
        编辑
      </div>
    </div>
    <div class="content">
      <div class="card">
        <div class="card-box">
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
        <div class="card-box">
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
          <van-cell title="单元格" icon="location-o" is-link />
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