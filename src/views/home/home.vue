<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swpierData" :key="item.id">
          <img :src="item.img" alt="">
        </van-swipe-item>

      </van-swipe>
    </div>
    <div class="product-content">
      <h2 class="title">热门精选</h2>
      <div class="list">
        <!-- <template v-for="item in houselist" :key="item.data.houseId">
        <house-item-v3 :item-data="item.data" @click="itemClick(item.data)" />
      </template> -->
        <template v-for="item in productList" :key="item.id">
          <div class="product-item" @click="productClick(item)">
            <div class="item-inner">
              <div class="cover">
                <img :src="item?.cover_img" alt="" height="120" />
              </div>
              <div class="info">
                <div class="name">{{ item.title }}</div>
                <div class="price">
                  <div class="new">￥ {{ item.price }}</div>
                  <div class="old">￥ {{ item.old_price }}</div>
                  <!-- <div class="tip" v-if="itemData.priceTipBadge">
                  {{ itemData.priceTipBadge.text }}
                </div> -->
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  //给APP.vue里的keepalive使用，定义路由name
  export default { name: "home" }
</script>
<script setup>
  import homeNavBar from './cpns/home-nav-bar.vue';
  import { computed, ref, watch, onActivated } from 'vue';
  import useScroll from "@/hooks/useScroll"
  import { getSwiperList, getProductList } from '@/request/home'
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';


  const homeRef = ref()
  const { isReachBottom, scrollTop } = useScroll(homeRef)

  const swpierData = ref([])
  const router = useRouter()
  const getSwiper = () => {
    getSwiperList(
      {},
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)
        // const imgurl = URL.createObjectURL(data)
        swpierData.value = data.data
        console.log("swpierData", swpierData.value);

      },
      (status, error, msg) => {
        console.log('status: ', status)
        console.log('error: ', error)
        console.log('msg: ', msg)
        console.log("获取失败");
      }
    )
  }
  const productClick = (item) => {
    // console.log(item.houseId);
    router.push("/product-detail/" + item.id)
  }

  const productList = ref([])
  const current_page = ref(1)
  const page_size = ref(10)
  const getProduct = () => {
    getProductList(
      {
        page: current_page.value,
        size: page_size.value,
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("获取商品信息成功");
          productList.value = [...productList.value, ...data.data.current_data]
          isReachBottom.value = false

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

  onMounted(() => {
    getSwiper()
    getProduct()
  })

  //从useScroll中取值isReachBottom，判断是否到达底部，然后发送网络请求
  watch(isReachBottom, (newValue) => {
    if (newValue) {
      //在数据请求完之后将isReachBottom改为false
      console.log("已到底部");
      current_page.value++
      getProduct()
    }
  })

                                                    //监听滚动距离的变化，控制显示搜索框
                                                    //方法一：watch
                                                    // const isShowSearchBar = ref(false)
                                                    // watch(scrollTop, (newTop) => {
                                                    //   isShowSearchBar.value = newTop > 100
                                                    // })

                                                    //方法二：computed
                                                    // const isShowSearchBar = computed(() => {
                                                    //   return scrollTop.value >= 360
                                                    // })

                                                    //跳转回home时，保留原来的位置
                                                    // onActivated(() => {
                                                    //   homeRef.value?.scrollTo({
                                                    //     top: scrollTop.value
                                                    //   })
                                                    // })
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  .my-swipe {
    .van-swipe-item {
      img {
        height: 180px;
        width: 100%;
      }
    }
  }

}

.product-content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .product-item {
      width: 50%;

      .item-inner {
        margin: 5px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;

        .cover {
          img {
            width: 100%;
          }
        }

        .info {
          padding: 8px 10px;
          color: #666;
          font-size: 12px;
        }


        .name {
          margin: 5px 0;
          font-size: 14px;
          color: #333;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price {
          display: flex;
          align-items: flex-start;

          margin: 8px 0;

          .new {
            color: #ff9645;
            font-size: 14px;
          }

          .old {
            margin: 0 3px;
            color: #999;
            font-size: 12px;
            text-decoration: line-through;
          }


        }
      }
    }
  }
}
</style>