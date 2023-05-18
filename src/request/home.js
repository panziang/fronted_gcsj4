/**
 * 首页数据请求api
 */
import {requestPost,requestGet } from './request'

// const apiBaseURL = import.meta.env.VITE_API_BASE_URL || null
// const apiBaseURL = 'http://localhost:9000/user-server/api'
const apiBaseURL = '/product-server'

/**
 * 查询xxxx数据
 * @param {*} param
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 */
// export function getInfoList(param, successResponse, errorResponse) {
//   requestGet('/home/info_list/xxxxxx', param, apiBaseURL, successResponse, errorResponse)
// }

//获取商品列表
export function getProductList(param, successResponse, errorResponse) {
  requestGet('/api/product/v1/page_product_list', param, apiBaseURL, successResponse, errorResponse)
}

//获取轮播图
export function getSwiperList(param, successResponse, errorResponse) {
  requestGet('/api/banner/v1/list', param, apiBaseURL, successResponse, errorResponse)
}







