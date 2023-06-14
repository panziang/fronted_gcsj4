import { defineStore } from "pinia";
import { getAddressList } from '@/request/user'
import { ref } from 'vue'

const useAddressStore = defineStore("address", {
  state: () => ({
    addressPiniaList: [],
    addressInfo: {},
    defaultAddress: {}
  }),
  actions: {
    getAddress () {
      getAddressList(
        {},
        (status, res, data) => {
          console.log('status: ', status)
          console.log('res: ', res)
          console.log('data: ', data)

          if (data.code == '0') {
            console.log("获取地址成功");
            data.data.forEach(item => {
              let obj = ref({})
              obj.value.id = item.id;
              obj.value.name = item.receiveName;
              obj.value.tel = item.phone;
              obj.value.address = item.province + item.city + item.region + item.detailAddress;
              obj.value.isDefault = (item.defaultStatus === 1) ? true : false;
              this.addressPiniaList.push(obj.value)
              if (obj.value.isDefault) {
                this.defaultAddress = obj.value
              }
            })
            console.log("addressPiniaList", this.addressPiniaList);
          } else {
            console.log("获取地址失败");
          }

        },
        (status, error, msg) => {
          console.log('status: ', status)
          console.log('error: ', error)
          console.log('msg: ', msg)
          console.log("获取地址失败2");
        }
      )
    },
    getAddressById (aid) {
      getAddressList(
        {},
        (status, res, data) => {
          console.log('status: ', status)
          console.log('res: ', res)
          console.log('data: ', data)

          if (data.code == '0') {
            console.log("获取地址成功");
            data.data.forEach(item => {
              if (item.id == aid) {
                this.addressInfo.id = item.id;
                this.addressInfo.name = item.receiveName;
                this.addressInfo.tel = item.phone;
                this.addressInfo.province = item.province;
                this.addressInfo.city = item.city;
                this.addressInfo.county = item.region;
                this.addressInfo.addressDetail = item.detailAddress;
                this.addressInfo.isDefault = (item.defaultStatus === 1) ? true : false;
              }

            })

          } else {
            console.log("获取地址失败");
          }

        },
        (status, error, msg) => {
          console.log('status: ', status)
          console.log('error: ', error)
          console.log('msg: ', msg)
          console.log("获取地址失败");
        }
      )
    }
  }
})

export default useAddressStore