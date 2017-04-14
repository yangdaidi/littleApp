// pages/list/list.js
var app = getApp()//获取应用实例

Page({
  data: {
    nav:{},
    tagList:{
      list:[],
      tag:{},
      count:0,
      more:true,
      firstFlag:true,
      pullFlag: false,
    },
    query:{
      id:1,//菜单编号
      limit:12,//数量,数量不能太少，必须撑满一屏，否则会导致无法下拉
      offset:0,//偏移量
    },
    load:{
      status:false,//下拉加载状态
      err:false//下拉加载时断网
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("onLoad")
    console.log(options)
    let that = this
    setTimeout(function(){
      that.getTags()
    })
    that.setData({
      'query.id':options.menuId||1
    })
    that.getTagList()
  },
  onReady:function(){
    // 页面渲染完成
    // console.log("onReady")
    // 对界面的设置如wx.setNavigationBarTitle请在onReady之后设置
  },
  onShow:function(){
    // 页面显示
    // console.log("onShow")
  },
  onHide:function(){
    // 页面隐藏
    // console.log("onHide")
  },
  onUnload:function(){
    // 页面关闭
    // console.log("onUnload")
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    if(this.data.tagList.more){
      this.getTagList()
    }else{
      console.log("no more data")
    }
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123'
    }
  },

  /* ------------------------------自定义方法--------------------------------------- */
  getTags: function(argument) {
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
  // 获取摄像机数据
  getTagList: function(){
    let that = this
    wx.pro.request({
      api: app.serverAPI.squareIndexList,
      data: that.data.query
    })
    .then(data => {
      if(that.data.tagList.firstFlag){
        that.data.tagList.list = data.result
        that.data.tagList.count = data.result.count
        that.data.tagList.firstFlag = false
      }else{
        that.data.tagList.list.resultList = that.data.tagList.list.resultList.concat(data.result.resultList)
      }
      // 是否loading完
      if( that.data.tagList.list.resultList.length >= data.result.count) {
        that.data.tagList.more = false;
      }
      // 重置偏移量
      that.data.query.offset = Number(that.data.query.offset) + that.data.query.limit;
      that.updata()
      
      console.log("after data:",that.data)
    })
    .catch(err => {
        console.log('fail',err)
    })
  },
  // 方法封装：数据脏检查，触发视图更新
  updata: function() {
    // body...
    this.setData({
      'tagList': this.data.tagList,
      'query':this.data.query,
      'nav':this.data.nav,
      'load':this.data.load
    })
  }
})