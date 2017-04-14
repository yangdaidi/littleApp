//index.js
var app = getApp()//获取应用实例
var util = require('../../utils/util.js')
import { tool } from "../../utils/tool.js"    //var tool = require('../../utils/tool.js').tool
import { Promise } from '../../libs/es6-promise';

Page({
  data: {
    userInfo: {},
    nav:{},
    swiper:{
      img:[],
      indicatorDots: true,//是否显示小点
      autoplay: false,
      interval: 3000,
      duration: 500
    },
    tagList:{
      // list1:[],
      list1:{},
      list2:{},
      list3:{},
      list:[],
      pullFlag: false,
    }
  },
  /* ------------------------------理解小程序生命周期------------------------------
  *
  * 进入页面执行
  *     1.onLoad    // 页面初始化 参数options为页面跳转所带来的参数（仅仅执行一次）
  *     2.onShow    // 页面显示
  *     3.onReady   // 页面渲染完成
  * 离开页面执行
  *     4.onHide    // 页面隐藏
  *     5.onUnload: // 页面关闭
  *
  ******
  *
  * 在小程序的中，维护着一个路径堆栈:堆栈内的所页面都是只是隐藏，并不会销毁
  *
  * 入栈: 
  *      栈顶页面（离开页面）：仅执行onHide，保存现场环境（数据），下次进入时不会触发onLoad
  *      入栈页面（新开页面）：执行onLoad onShow onReady
  * 出栈:
  *      出栈页面（离开页面）：仅执行onHide，onUnload，销毁页面，再进入需要重新入栈
  *      栈顶页面（新开页面）：执行onShow onReady，不会执行onLoad，恢复现场环境（数据）
  *
  ******
  *
  * 小程序打开页面方式
  *
  * navigate：相当于一次入栈（栈顶页面onHide，新页面入栈）
  * redirect：先出栈，后入栈（栈顶页面销毁，新页面入栈，其它页面不影响）
  * navigateBack：相当一次出栈（栈顶页面销毁，新栈顶页面onShow
  *
  * reLaunch
  * switchTab
  *
  *---------------------------------------------------------------------------- */
  onLoad: function () {
    // console.log(getCurrentPages())//onLoad加载好之后才可以调用
    console.log("index onLoad")
    let that = this
    setTimeout(function(){
      that.getTags()
    })
    this.bannerList()
    this.getTagList()
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onReachBottom: function(){
    // 滑动到底部，下拉加载（不需要类似原生js中的函数截流）
    if(!this.data.tagList.pullFlag){
      this.getTagList2()
    }
  },

  /* ------------------------------自定义方法--------------------------------------- */
  /**
   * 获取标签tag list
   * @return {[type]}
   */
  getTags: function() {
    this.setData({
      // 1.使用方法：开发->框架->逻辑层->注册页面->setData()
      // 2.app.nav虽然是在app onLauch发生，但是由于是异步请求，所以此处可能拿不到list
      'nav': app.nav
    })
    // this.data.nav = {}           //setData 应该是解构赋值，不会影响到app.nav
    // app.nav = this.data.nav    //如果需要将this.data.nav同步给app，可以用引用赋值
    if(this.data.nav.list.length<=0){
      let  that = this
        wx.pro.request({
        api: app.serverAPI.tagList,
        data:{},
      })
      .then(data => {
        that.setData({
            // 使用方法：开发->框架->逻辑层->注册页面->setData()
            'nav.list': data.result.list
          })
      }).catch(err => {
        console.log('fail',res.data) // 网络错误、或服务器返回 4XX、5XX
      })
    }
  },
  // 请求banner列表(与其他请求没有依赖关系，不需要用promise)
  // 非promise写法
  // bannerList: function(){
  //   let that = this
  //   wx.request({
  //     url:app.serverAPI.bannerList.url,
  //     method:app.serverAPI.bannerList.method,
  //     data:{},
  //     success: function(res) {
  //       that.setData({
  //         'swiper.img': res.data.result
  //       })
  //     },
  //     fail: function(err){
  //       console.log('fail',err)
  //     }
  //   })
  // }
  // promise写法
  bannerList: function(){
    // (链式写法)
    // return wx.pro.request({
    //   api: app.serverAPI.bannerList,
    //   data:{},
    // })
    // (非链式写法)
    let that = this
    wx.pro.request({
      api:app.serverAPI.bannerList,
      data:{},
    })
    .then(data => {
      that.setData({
        'swiper.img': data.result // 使用方法：开发->框架->逻辑层->注册页面->setData()
      })
    })
    .catch(err => {
        console.log('fail',err)
    })
  },

  // 请求静态taglist，tag[1,2,3]
  getTagList: function(){
    let that = this
    let promiseArray = [1,2,3].map(function(id){
      return wx.pro.request({
        api: app.serverAPI.squareIndexList,
        data: {id:id,limit:4,offset:0}
      })
    })
    Promise.all(promiseArray).then(function(dataArray){
      that.setData({
        // 'tagList.list1':dataArray,
        'tagList.list1':dataArray[0].result,
        'tagList.list2':dataArray[1].result,
        'tagList.list3':dataArray[2].result
      })
    }).catch(function(reason){

    })
  },

  // 请求动态taglist，tag[tagType>=0]
  getTagList2: function(){
    let that = this
    let promiseArray = that.data.nav.list.map(function(item){
      if(item.tagType>=0){
        return wx.pro.request({
          api: app.serverAPI.squareIndexList,
          data: {id:item.id,limit:4,offset:0}
        })
      }else{
        return false
      }
    })
    Promise.all(promiseArray).then(function(dataArray){
      that.setData({
        'tagList.list':dataArray,
        'tagList.pullFlag':true
      })
      console.log("list",that.data.tagList.list)
    }).catch(function(reason){

    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../list/list?id=4'
    })
  },

  listenSwiper:function(e) {
    //打印信息
    // console.log(e)
  },
})
