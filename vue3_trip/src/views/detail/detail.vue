<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control :titles="names" v-if="showTabControl" class="tabs" @tabItemClick="tabClick" />
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
  import { computed, ref } from "vue";
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
    const name = value.$el.getAttribute("name")
    // console.log(name);
    sectioEls.value[name] = value.$el
  }
  const tabClick = (index) => {
    const key = Object.keys(sectioEls.value)[index]
    const el = sectioEls.value[key]
    let instance = el.offsetTop
    if (index !== 0) {
      instance = instance - 44
    }

    detailRef.value.scrollTo({
      top: instance,
      behavior: "smooth"
    })
  }

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