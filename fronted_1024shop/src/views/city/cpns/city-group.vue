<template>
  <div class="city-group">
    <van-index-bar :index-list=indexList>
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities ">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(group, index) in groupData?.cities" :key="index">
        <div class="group-item">
          <van-index-anchor :index="group.group" />
          <template v-for="(city, indey) in group.cities" :key="indey">
            <van-cell :title="city.cityName" @click="cityClick(city)" />
          </template>
        </div>
      </template>
    </van-index-bar>


    <!-- <template v-for="(group, index) in groupData?.cities" :key="index">
        <div class="group-item">
          <h2 class="title">标题：{{ group.group }}</h2>
          <div class="list">
            <template v-for="(city, indey) in group.cities" :key="indey">
              <div class="city">
                {{ city.cityName }}
              </div>
            </template>
          </div>
        </div>
      </template> -->



  </div>
</template>

<script setup>
  import useCityStore from "@/store/modules/city"
  import { computed } from "vue"
  import { useRouter } from "vue-router"

  //定义props
  const props = defineProps({
    groupData: {
      type: Object,
      default: () => ({})
    }
  })
  //通过计算属性获取数据里的索引
  const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift("#")
    return list
  })

  //监听点击城市事件
  const router = useRouter()
  const cityStore = useCityStore()
  const cityClick = (city) => {
    // console.log(city);
    //选中当前城市，将数据传给store
    cityStore.currentCity = city
    //返回上一级
    router.back()
  }
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;
  flex-wrap: wrap;

  .city {
    width: 80px;
    height: 28px;
    border-radius: 14px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 10px 0;
  }
}
</style>