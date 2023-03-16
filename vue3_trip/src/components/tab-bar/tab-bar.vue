<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            <template v-for="(item, index) in tabbarData" :key="index">
                <van-tabbar-item :to="item.path">
                    <template #default>
                        <span>{{ item.text }}</span>
                    </template>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imgActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>

<script setup>
    //获取数据
    import tabbarData from "@/assets/data/tabbar"
    //动态加载图片路径方法
    import { getAssetURL } from "@/utils/load_assets"
    import { ref } from "vue"

    const currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {
    //局部修改，局部定义一个变量，只针对于tab-bar下的变量才生效
    // --van-tabbar-item-icon-size: 30px !important; 

    // :deep(.van-tabbar-item__icon) {
    //     font-size: 50px;
    // }

    img {
        height: 30px;
    }

}
</style>