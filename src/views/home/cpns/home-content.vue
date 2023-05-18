<template>
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
              <img :src="item?.coverImg" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ item.title }}</div>
              <div class="price">
                <div class="new">￥ {{ item.price }}</div>
                <div class="old">￥ {{ item.oldPrice }}</div>
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
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { getProductList } from '../../../request/home'
  import { ref, onMounted } from "vue";



  const router = useRouter()
  const productClick = (item) => {
    // console.log(item.houseId);
    router.push("/product-detail/" + item.id)
  }

  const productList = ref([])
  const getProduct = () => {
    getProductList(
      {
        page: 1,
        size: 10,
      },
      (status, res, data) => {
        console.log('status: ', status)
        console.log('res: ', res)
        console.log('data: ', data)

        if (data.code == '0') {
          // PromptMessage.messageSuccess('登录成功')
          console.log("获取商品信息成功");
          productList.value = data.data.current_data

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
    getProduct()
  })
</script>

<style lang="less" scoped>
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