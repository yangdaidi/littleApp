import { Promise } from '../libs/es6-promise';

function promisify() {
	wx.pro = {}

	// 普通的要转换的函数
  	// const Fnames = ['login','getUserInfo','navigateTo','checkSession','getStorageInfo','removeStorage','clearStorage','getNetworkType','getSystemInfo']
  	// Fnames.forEach(fnName => {
	  //   wx.pro[fnName] = (obj = {}) => {
	  //     	return new Promise((resolve, reject) => {
		 //        obj.success = function (res) {
		 //          console.log(`wx.${fnName} success`, res)
		 //          resolve(res)
		 //        }
		 //        obj.fail = function (err) {
		 //          console.error(`wx.${fnName} fail`, err)
		 //          reject(err)
		 //        }
		 //        wx[fnName](obj)
	  //     	})
	  //   }
   //  })

  	// 特殊改造的函数

  // 	wx.pro.getStorage = key => {
  //   	return new Promise((resolve, reject) => {
  //     wx.getStorage({
  //       key: key,
  //       success: res => {
  //         resolve(res.data) // unwrap data
  //       },
  //       fail: err => {
  //         resolve() // not reject, resolve undefined
  //       }
  //     })
  //   })
  // }
	 // wx.pro.setStorage = (key, value) => {
  //   return new Promise((resolve, reject) => {
  //     wx.setStorage({
  //       key: key,
  //       data: value,
  //       success: res => {
  //         resolve(value) // 将数据返回
  //       },
  //       fail: err => {
  //         reject(err)
  //       }
  //     })
  //   })
  // }

  	wx.pro.request = options => {
	    if (options.toast) {
	      wx.showToast({
	        title: options.toast.title || '加载中',
	        icon: 'loading'
	      })
	    }

	    return new Promise((resolve, reject) => {
	      wx.request({
	        url: options.api.url,
	        method: options.api.method || 'GET',
	        data: options.data || {},
      		header: {'content-type': 'application/json'},
	        success: res => {
	          if (res.statusCode >= 400) {
	            console.error('wx.request fail [business]', options, res.statusCode, res.data)
	            reject(res)
	          }else {
	            console.log('wx.request success', options, res.data)
	            resolve(res.data) // unwrap data
	          }
	        },
	        fail: err => {
	          console.error('wx.request fail [network]', options, err)
	          reject(err)
	        }
	      })
	    })

  	}
}

promisify()
export { Promise }
