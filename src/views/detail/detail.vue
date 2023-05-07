<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control :titles="names" v-if="showTabControl" class="tabs" @tabItemClick="tabClick" ref="tabControlRef" />
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <!-- 详情页 -->
      <infos :top-infos="mainPart.topModule" :ref="getSectionRef" name="描述" />
      <facility :house-facility="mainPart?.dynamicModule.facilityModule.houseFacility" :ref="getSectionRef" name="设施" />
      <landlord :landlord="mainPart?.dynamicModule.landlordModule" :ref="getSectionRef" name="房东" />
      <comment :comment="mainPart?.dynamicModule.commentModule" :ref="getSectionRef" name="评论" />
      <notice :order-rules="mainPart?.dynamicModule.rulesModule.orderRules" :ref="getSectionRef" name="须知" />
      <detail-map :position="mainPart?.dynamicModule.positionModule" :ref="getSectionRef" name="周边" />
      <intro :price-intro="mainPart?.introductionModule"></intro>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">我的旅途，永无止境！</div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from "vue-router";
  import { getDetailInfos } from "@/service"
  import { computed, ref, watch } from "vue";
  import detailSwipe from "./cpns/detail_01-swipe.vue";
  import infos from "./cpns/detail_02-infos.vue";
  import facility from "./cpns/detail_03-facility.vue";
  import landlord from "./cpns/detail_04-landlord.vue";
  import comment from "./cpns/detail_05-comment.vue";
  import notice from "./cpns/detail_06-notice.vue";
  import detailMap from "./cpns/detail_07-map.vue";
  import intro from "./cpns/detail_08-intro.vue";
  import TabControl from "@/components/tab-control/tab-control.vue";
  import useScroll from "@/hooks/useScroll";

  const route = useRoute()
  const router = useRouter()
  const houseId = route.params.id

  //发送网络请求获取数据
  const detailInfos = ref({})
  const mainPart = computed(() => detailInfos.value.mainPart)
  getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
  })

  //监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  //tabControl相关操作
  const detailRef = ref()
  const { scrollTop } = useScroll(detailRef)
  const showTabControl = computed(() => {
    return scrollTop.value >= 300
  })

  // const sectioEls = []
  // const getSectionRef = (value) => {
  //   sectioEls.push(value.$el)
  // }

  const sectioEls = ref({})
  const names = computed(() => {
    return Object.keys(sectioEls.value)
  })
  const getSectionRef = (value) => {
    if (!value) return
    const name = value.$el.getAttribute("name")
    // console.log(name);
    sectioEls.value[name] = value.$el
  }

  let isClick = false
  let currentDistance=-1
  
  const tabClick = (index) => {
    const key = Object.keys(sectioEls.value)[index]
    const el = sectioEls.value[key]
    let distance = el.offsetTop
    if (index !== 0) {
      distance = distance - 44
    }

      isClick = true
    currentDistance=distance

    detailRef.value.scrollTo({
      top: distance,
      behavior: "smooth"
    })
  }

  //页面滚动,滚动时匹配tabs栏里的index
  const tabControlRef=ref()
  watch(scrollTop, (newValue) => {
      if (newValue === currentDistance) {
      isClick=false
    }
    //如果是点击事件，不需要匹配
    if(isClick) return
    //获取所有区域的offsetTop
    const els = Object.values(sectioEls.value)
    const values = els.map(el => el.offsetTop)
    // console.log(values);

    //根据newValue去匹配想要的索引
    let index = values.length - 1
    for (let i = 0; i < values.length; i++) {
      if (values[i] > newValue + 44) {
        index = i - 1
        break
      }
    }
    // console.log(index);
    tabControlRef.value?.setCurrentIndex(index)
  })

</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>