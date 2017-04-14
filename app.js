//app.js
// import "utils/rem.js"                   //require('../../utils/rem.js')
import { api } from 'config/request.js'
import { Promise } from 'utils/pro.js'
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 版本校验
    // wx.showModal({
    //   title: '提示',
    //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
    //   success: function(data){
    //     // data: {cancel:false confirm:true errMsg:""}
    //     console.log("certain",data)
    //   },
    // })

    // 请求taglist列表(全局使用)
    var that = this
    wx.pro.request({
      api: that.serverAPI.tagList,
      data:{},
    })
    .then(data => {
      // 2XX, 3XX
      // 在pages页面中需要使用setData才能进行视图更新，app中可以直接复制
      // that.setData({
      //     // 使用方法：开发->框架->逻辑层->注册页面->setData()
      //     'nav.list': data.result.list
      //   })
      that.nav.list = data.result.list;
      console.log("11111",that.nav.list)
      // return that.bannerList(). //(promise链式调用，返回promise对象)
    }).catch(err => {
      console.log('fail',res.data) // 网络错误、或服务器返回 4XX、5XX
    })

    //调用应用实例的方法获取全局数据
    // this.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    //   that.globalData.userInfo = userInfo
    // })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
  },
  serverAPI:api,
  nav:{
    list:[],
    homepage:true,
    specialpage: false,
    mycollectionpage:false,
    talentpage:false,
    //标记菜单栏的展开与收起,默认收起
    status:false,
    //标记快捷导航栏topbar
    quickMenu:true,
    //标记是否显示底栏
    footer:true,
    //标记导航栏样式(通用导航，在搜索页面需要隐藏)
    mainNav:true,
    //标记选中tab的id和name
    tab:{
        id:1,
        name:"",
        msg:"",
        tagType:0,
    }
  },

})