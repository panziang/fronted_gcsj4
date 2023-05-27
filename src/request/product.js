/**
 * 商品数据请求api
 */
import { requestPost, requestGet } from './request'

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

//获取商品详情
export function getProductDetail (param, successResponse, errorResponse) {
  requestGet(`/api/product/v1/detail/${param.id}`, param, apiBaseURL, successResponse, errorResponse)
}

//查看我的购物车
export function getCart (param, successResponse, errorResponse) {
  requestGet('/api/cart/v1/my_cart', param, apiBaseURL, successResponse, errorResponse)
}

//添加商品到购物车
export function getAddToCart (param, successResponse, errorResponse) {
  requestPost('/api/cart/v1/add', param, apiBaseURL, successResponse, errorResponse)
}

//删除购物项
export function delCartById (param, successResponse, errorResponse) {
  requestGet(`/api/cart/v1/delete/${param.id}`, param, apiBaseURL, successResponse, errorResponse)
}

//清空购物车
export function clearCart (param, successResponse, errorResponse) {
  requestGet('/api/cart/v1/clear', param, apiBaseURL, successResponse, errorResponse)
}











