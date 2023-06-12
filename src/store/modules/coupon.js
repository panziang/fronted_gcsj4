import { defineStore } from "pinia";
import { getCouponList, getMyCoupon } from '@/request/coupon'
import { ref } from "vue";
import { getResTime } from '@/utils/format_date'

const useCouponStore = defineStore("coupon", {
  state: () => ({
    couponList: [],
    myCouponList: [],
    couponNum: 0
  }),
  actions: {
    getCoupon () {
      getCouponList(
        {
          page: 1,
          size: 10
        },
        (status, res, data) => {
          console.log('status: ', status)
          console.log('res: ', res)
          console.log('data: ', data)

          if (data.code == '0') {
            // PromptMessage.messageSuccess('登录成功')
            console.log("获取优惠券成功");
            data.data.current_data.forEach(item => {
              let obj = ref({})
              obj.value.id = item.id
              obj.value.condition = item.condition_price == 0 ? '无门槛' : `满${item.condition_price}-${item.price}`
              obj.value.description = item.coupon_title
              obj.value.value = item.price * 100
              obj.value.startAt = getResTime(item.start_time)
              obj.value.endAt = getResTime(item.end_time)
              obj.value.valueDesc = item.price
              obj.value.unitDesc = '元'
              this.couponList.push(obj.value)
            })
            // this.couponList = data.data.current_data
            // this.couponNum = this.couponList.length
            console.log("couponList", this.couponList);
          } else {
            // PromptMessage.messageBoxError('登录失败', data.msg)
            console.log("获取优惠券失败");
          }

        },
        (status, error, msg) => {
          console.log('status: ', status)
          console.log('error: ', error)
          console.log('msg: ', msg)
          console.log("获取优惠券失败");
        }
      )
    },
    getMyCouponList () {
      getMyCoupon(
        {
          page: 1,
          size: 10,
          use_state: 'NEW'
        },
        (status, res, data) => {
          console.log('status: ', status)
          console.log('res: ', res)
          console.log('data: ', data)

          if (data.code == '0') {
            // PromptMessage.messageSuccess('登录成功')
            console.log("获取我的优惠券成功");
            data.data.current_data.forEach(item => {
              let obj = ref({})
              obj.value.id = item.id
              obj.value.condition = item.condition_price == 0 ? '无门槛' : `满${item.condition_price}-${item.price}`
              obj.value.description = item.coupon_title
              obj.value.value = item.price * 100
              obj.value.startAt = getResTime(item.start_time)
              obj.value.endAt = getResTime(item.end_time)
              obj.value.valueDesc = item.price
              obj.value.unitDesc = '元'
              this.myCouponList.push(obj.value)
            })
            // this.couponList = data.data.current_data
            this.couponNum = this.myCouponList.length
            console.log("myCouponList", this.myCouponList);
          } else {
            // PromptMessage.messageBoxError('登录失败', data.msg)
            console.log("获取我的优惠券失败");
          }

        },
        (status, error, msg) => {
          console.log('status: ', status)
          console.log('error: ', error)
          console.log('msg: ', msg)
          console.log("获取我的优惠券失败");
        }
      )
    }

  }
})

export default useCouponStore