<template>
  <div class="product-detail">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="info">
      <div class="show-img">
        <img :src="productData.coverImg" alt="">
      </div>
      <div class="show-content">
        <div class="line">
          <div class="price">
            <div class="new">￥ {{ productData.price }}</div>
            <div class="old">￥ {{ productData.oldPrice }}</div>
          </div>
          <div class="stock">已售{{ productData.stock }}</div>
        </div>
        <div class="title">
          <h2>{{ productData.title }}</h2>
        </div>
        <div class="detail-img">
          <img :src="productData.detail" alt="">
        </div>
      </div>
    </div>
    <van-action-bar placeholder>
      <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickCart" />
      <van-action-bar-button type="warning" text="加入购物车" @click="addProduct()" />
      <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
    </van-action-bar>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { getProductDetail, getAddToCart } from '@/request/product'
  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Toast } from 'vant';

  const route = useRoute()
  const router = useRouter()
  const productId = route.params.id;
  const onClickLeft = () => {
    history.back();
  }
  const onClickIcon = () => Toast('点击图标');
  const onClickButton = () => Toast('点击按钮');
  const onClickCart = () => {
    router.push('/cart')
  }

  const productData = ref({})
  const getProductDetailData = () => {
    getProductDetail(
      {
        id: productId,
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("获取商品信息成功");
          productData.value = data.data

        } else {
          // PromptMessage.messageBoxError('登录失败', data.msg)
          console.log("获取商品信息失败");
        }

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取商品信息失败");
      }
    )
  }
  //添加商品到购物车
  const addProduct = () => {
    getAddToCart(
      {
        product_id: productId,
        buy_num: 1
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          console.log("添加成功");
          Toast.success('添加成功');
        } else {
          console.log("添加失败");
        }
      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("添加失败");
      }
    )
  }
  onMounted(() => {
    getProductDetailData()
  })
</script>

<style lang="less" scoped>
.product-detail {
  .info {
    .show-img {
      img {
        width: 100%;
        height: 240px;
      }
    }

    .show-content {
      .line {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .price {
          display: flex;
          align-items: baseline;

          margin-top: 30px;

          .new {
            color: red;
            font-size: 40px;
            font-weight: 800;
          }

          .old {
            margin: 0 3px;
            color: #999;
            font-size: 20px;
            text-decoration: line-through;
            margin-left: 10px;
          }
        }

        .stock {
          color: gray;
          font-size: 16px;
          font-weight: 500;
          margin-right: 10px;
        }
      }

      .title {
        background-color: rgb(245, 245, 245);
        height: 30px;
        margin-top: 20px;
      }

      .detail-img {
        margin-top: 30px;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>