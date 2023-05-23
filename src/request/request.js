import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'

// axios请求携带cookie
axios.defaults.withCredentials = false

/**
 * 参数过滤函数
 * @param o
 */
const filterNull = (o) => {
  const obj = o
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i]
    if (_.isString(obj[k])) {
      obj[k] = obj[k].trim()
    }
    if (_.isEmpty(obj[k])) {
      delete obj[k]
      continue
    }
    if (_.isObject(obj[k])) {
      if (Object.keys(obj[k]).length > 0) {
        obj[k] = filterNull(obj[k])
      } else {
        delete obj[k]
      }
    }
  }
  return obj
}

/**
 * 请求响应处理
 * @param {*} res
 * @param {*} successResponse function(status, res, data)
 * @param {*} failureResponse function(status, res, msg)
 */
const axiosResponse = (res, successResponse, failureResponse) => {
  if (res.status === 200) {
    if (successResponse) {
      successResponse(res.status, res, res.data)
    }
  } else {
    const msg = `Status: ${res.status}; Msg: ${res.statusText}`
    if (failureResponse) {
      failureResponse(res.status, res, msg)
    } else {
      console.error(msg)
    }
  }
}

/**
 * 请求异常处理
 * @param {*} error
 * @param {*} errorResponse function(status, error, msg)
 */
const axiosResponseCatch = (error, errorResponse) => {
  const res = error.response
  let errorMsg = null
  if (res) {
    errorMsg = `Status: ${res.status}; Msg: ${res.statusText}; Data: ${res.data}`
  } else {
    errorMsg = `Axios Error: ${error}`
  }
  if (errorResponse) {
    errorResponse(res ? res.status : -1, error, errorMsg)
  } else {
    console.error(errorMsg)
  }
}

/**
 * 添加请求拦截器
 */
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

/**
 * 添加响应拦截器
 */
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });

/**
 * 发送请求
 * @param {*} url // 请求url
 * @param {*} method // GET DELETE POST PUT
 * @param {*} param // 请求参数
 * @param {*} config // 请求参数
 * {
 *   baseURL: null,           
     isFilterNull: false,     // 是否参数过滤空值。
     isQSStringify: false,    // 是否POST参数转换。
     responseType: 'json',    // 响应格式。 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
     withCredentials: false,  // 是否携带cookie信息; 跨域请求时是否需要使用凭证;
     headers: {},             // 请求头设置。
    }
 * 
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 */
const sendRequest = (url, method, param, config, successResponse, errorResponse) => {
  // console.log("param3",param);
  let params = param
  // console.log("config",config);
  if (config) {
    // console.log("params27",params);
    if (params) {
      // console.log("params37",params);
      if (config.isFilterNull) {
        params = filterNull(params)
      }
      if (config.isQSStringify) {
        params = qs.stringify(params)

        // console.log("params57",params);
      }
    }
  }

  // 初始化配置
  const axiosConfig = {
    baseURL: config.baseURL || null,
    // baseURL: '/api',
    url,
    method,
    // 请求体数据, 只有当请求方法为"PUT", "POST",和"PATCH"时可用
    data: method === 'POST' || method === 'PUT' ? params : null,
    // URL参数，必须是一个纯对象或者 URL参数对象。用于GET请求
    params: method === 'GET' || method === 'DELETE' ? params : null,
    // 请求超时时间（毫秒）
    timeout: 1000 * 60,
    // 是否携带cookie信息; 跨域请求时是否需要使用凭证
    withCredentials: axios.defaults.withCredentials,
    // 响应格式,默认值是json
    // 可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json',
    // 设置http响应内容的最大长度
    maxContentLength: 1000 * 5,
    'token': localStorage.getItem("1024token") || "",
  }

  // 扩展配置
  if (config) {
    if (config.responseType) {
      axiosConfig.responseType = config.responseType
    }
    if (config.headers) {
      // console.log("123a");
      axiosConfig.headers = config.headers
      // console.log("axiosConfig.headers",axiosConfig.headers);
    }
    if (config.withCredentials !== undefined && config.withCredentials !== null) {
      axiosConfig.withCredentials = !!config.withCredentials
    }
  }

  // 发送请求
  const axiosRes = axios(axiosConfig)
  if (successResponse) {
    axiosRes
      .then((res) => {
        axiosResponse(res, successResponse, errorResponse)
      })
      .catch((error) => {
        axiosResponseCatch(error, errorResponse)
      })
  }
  return axiosRes
}

/**
 * GET请求
 * @param {*} url
 * @param {*} param
 * @param {*} baseURL
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 * @returns
 */
const requestGet = (url, param, baseURL, successResponse, errorResponse) => {
  const config = {
    baseURL: baseURL,
    responseType: url == '/api/notify/v1/get_kaptcha' ? 'blob' : 'json',
    headers: {
      'token': localStorage.getItem("1024token") || "",
    },

  }
  // console.log("config",config);
  return sendRequest(url, 'GET', param, config, successResponse, errorResponse)
}

/**
 * POST请求
 * @param {*} url
 * @param {*} param
 * @param {*} baseURL
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 * @returns
 */
const requestPost = (url, param, baseURL, successResponse, errorResponse) => {
  const config = {
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'text/plain'
      'token': localStorage.getItem("1024token") || "",
    },
    isQSStringify: false
  }
  // console.log("config",config);
  return sendRequest(url, 'POST', param, config, successResponse, errorResponse)
}

/**
 * PUT请求
 * @param {*} url
 * @param {*} param
 * @param {*} baseURL
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 * @returns
 */
const requestPut = (url, param, baseURL, successResponse, errorResponse) => {
  const config = {
    baseURL: baseURL
  }
  return sendRequest(url, 'PUT', param, config, successResponse, errorResponse)
}

/**
 * DELETE请求
 * @param {*} url
 * @param {*} param
 * @param {*} baseURL
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 * @returns
 */
const requestDelete = (url, param, baseURL, successResponse, errorResponse) => {
  const config = {
    baseURL: baseURL
  }
  return sendRequest(url, 'DELETE', param, config, successResponse, errorResponse)
}

/**
 * Upload请求
 * @param {*} url
 * @param {*} param
 * @param {*} baseURL
 * @param {*} successResponse function(status, res, data)
 * @param {*} errorResponse function(status, error, msg)
 * @returns
 */
const requestUpload = (url, param, baseURL, successResponse, errorResponse) => {
  const config = {
    baseURL: baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'no-cache'
    }
  }

  const formData = new FormData()
  if (param) {
    console.log("param", param);
    Object.keys(param).forEach((k) => {
      formData.append(k, param[k])
    })
  }
  console.log("formData", formData);
  return sendRequest(url, 'POST', formData, config, successResponse, errorResponse)
}

export {
  filterNull,
  axiosResponse,
  axiosResponseCatch,
  sendRequest,
  requestGet,
  requestPost,
  requestPut,
  requestDelete,
  requestUpload
}
