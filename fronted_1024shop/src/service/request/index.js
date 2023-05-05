import axios from 'axios'

import { BASE_URL, TIMEOUT } from './config'
import useMainStore from '@/store/modules/main'

const mainStore = useMainStore();


class HYRequest {
    constructor(baseURL, timeout = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })
      //设置拦截器
      //请求拦截器
      this.instance.interceptors.request.use(config => {
        //请求成功的拦截
        mainStore.isLoading = true;
        return config
      }, err => {
        return err
      })
      //响应拦截器
      this.instance.interceptors.response.use(res => {
        //响应成功的拦截
        mainStore.isLoading = false;
        return res
      }, err => {
        mainStore.isLoading = false;
        return err
      })
    }

    request(config) {
        // mainStore.isLoading = true;
        return new Promise(async (resolve, reject) => {
            this.instance.request(config).then(res => {
                // mainStore.isLoading = false;
                resolve(res.data)
            }).catch(err => {
                // mainStore.isLoading = false;
                reject(err)
            })
        })
    }

    get(config) {
        return this.request({ ...config, method: 'get' })
    }

    post(config) {
        return this.request({ ...config, method: 'post' })
    }
}

export default new HYRequest(BASE_URL, TIMEOUT);