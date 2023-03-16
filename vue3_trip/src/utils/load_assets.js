export const getAssetURL = (image) => {
    //动态加载图片路径方法
    //参数一：相对路径(不能写@),参数二：当前路径的URL
    return new URL(`../assets/img/${image}`, import.meta.url).href
}