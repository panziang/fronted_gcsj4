<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick()">{{ currentCity.cityName }}</div>
      <div class="position">
        <span class="text" @click="positionClick()">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" type="range" @confirm="onConfirm" color="#ff9854" :round="false" />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="search-btn section">
      <div class="btn" @click="searchBtnClick()">开始搜索</div>

    </div>
  </div>
</template>

<script setup>
  import useCityStore from '@/store/modules/city';
  import { storeToRefs } from 'pinia';
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { formatMonthDay, getDiffDays } from '@/utils/format_date';
  import useHomeStore from "@/store/modules/home"
  import useMainStore from '@/store/modules/main';

  const router = useRouter()

  //定义props  不需要从父组件拿数据了，直接从store中获取
  // defineProps({
  //   hotSuggests: {
  //     type: Array,
  //     default: () => []
  //   }
  // })

  // 位置/城市

  //获取我的位置
  const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
      console.log("获取位置成功", res);
    }, err => {
      console.log("获取位置失败", err);
    })
  }
  //点击城市跳转至city路由
  const cityClick = () => {
    router.push("/city")
  }

  //当前城市
  const cityStore = useCityStore()
  //获取store里的选取的城市
  const { currentCity } = storeToRefs(cityStore)

  //日期范围的处理
  const mainStore = useMainStore()
  const { startDate, endDate } = storeToRefs(mainStore)

  //3.获取相差时间
  const stayCount = computed(() => getDiffDays(startDate.value, endDate.value))
  //4.格式化日期
  const startDateStr = computed(() => formatMonthDay(startDate.value))
  const endDateStr = computed(() => formatMonthDay(endDate.value))

  const showCalendar = ref(false)
  const onConfirm = (value) => {
    // console.log(value);  
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    //将选择的日期显示到页面上
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    //关闭日历组件
    showCalendar.value = false
  }

  //获取热门建议
  const homeStore = useHomeStore()
  const { hotSuggests } = storeToRefs(homeStore)

  //开始搜索
  const searchBtnClick = () => {
    router.push({
      path: "/search",
      //路由跳转传递的参数
      query: {
        startDate: startDate.value,
        endDate: endDate.value,
        currentCity: currentCity.value.cityName
      }
    })
  }
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  display: flex;
  align-items: center;
  height: 44px;

  .city {
    flex: 1;
    font-size: 15px;
    color: #333;
  }

  .position {
    width: 80px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      font-size: 12px;
      color: #666;
    }

    img {
      margin-left: 6px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;

  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>