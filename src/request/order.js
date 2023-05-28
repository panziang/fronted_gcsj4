/**
 * 订单数据请求api
 */
import { requestPost, requestGet } from './request'

// const apiBaseURL = import.meta.env.VITE_API_BASE_URL || null
// const apiBaseURL = 'http://localhost:9000/user-server/api'
const apiBaseURL = '/order-server'

/**
 * 查询xxxx数据
 * @param {*} param
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 */
// export function getInfoList(param, successResponse, errorResponse) {
//   requestGet('/home/info_list/xxxxxx', param, apiBaseURL, successResponse, errorResponse)
// }

//获取订单
export function getOrderInfo (param, successResponse, errorResponse) {
  requestGet('/api/order/v1/page', param, apiBaseURL, successResponse, errorResponse)
}
//获取订单防重令牌
export function getOrderToken (param, successResponse, errorResponse) {
  requestGet('/api/order/v1/get_token', param, apiBaseURL, successResponse, errorResponse)
}

//提交订单
export function getOrderConfirm (param, successResponse, errorResponse) {
  requestPost('/api/order/v1/confirm', param, apiBaseURL, successResponse, errorResponse)
}













