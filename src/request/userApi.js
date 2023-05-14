/**
 * 首页数据请求api
 */
import {requestPost,requestGet } from './request'

// const apiBaseURL = import.meta.env.VITE_API_BASE_URL || null
// const apiBaseURL = 'http://localhost:9000/user-server/api'
const apiBaseURL = '/user-server'

/**
 * 查询xxxx数据
 * @param {*} param
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 */
// export function getInfoList(param, successResponse, errorResponse) {
//   requestGet('/home/info_list/xxxxxx', param, apiBaseURL, successResponse, errorResponse)
// }

//获取图形验证码
export function sendKaptcha(param, successResponse, errorResponse) {
  requestGet('/api/notify/v1/get_kaptcha', param, apiBaseURL, successResponse, errorResponse)
}


//密码登录
export function getSignInByPwd(param, successResponse, errorResponse) {
  requestPost('/api/user/v1/login_by_password', param, apiBaseURL, successResponse, errorResponse)
}

//注册
// export function getSignUp(param, successResponse, errorResponse) {
//   requestPost('/register', param, apiBaseURL, successResponse, errorResponse)
// }

//发送手机验证码
// export function sendCode(param, successResponse, errorResponse) {
//   requestGet('/sendCode', param, apiBaseURL, successResponse, errorResponse)
// }

//手机号登录
// export function getSignInByPhone(param, successResponse, errorResponse) {
//   requestPost('/loginByPhone', param, apiBaseURL, successResponse, errorResponse)
// }



