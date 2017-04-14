// pages/test/test.js
const SDKVersion = wx.getSystemInfoSync().SDKVersion || '1.0.0'
const [MAJOR, MINOR, PATCH] = SDKVersion.split('.').map(Number)

const canIUse = apiName => {
  if (apiName === 'showModal.cancel') {
    return MAJOR >= 1 && MINOR >= 1
  }
  return true
}
var app = getApp()//获取应用实例

Page({
  data: {
    nav:{},
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'},
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4],
    canIUse: canIUse('button.open-type.contact')
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("onLoad")
    console.log(options)

    let that = this
    setTimeout(function(){
      that.getTags()
    })
    
  },
  onReady:function(){
    // 页面渲染完成
    console.log("onReady")
    // 对界面的设置如wx.setNavigationBarTitle请在onReady之后设置
  },
  onShow:function(){
    // 页面显示
    console.log("onShow")
  },
  onHide:function(){
    // 页面隐藏
    console.log("onHide")
  },
  onUnload:function(){
    // 页面关闭
    console.log("onUnload")
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
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
  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },
  switch: function(e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function(e){
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },
   tapName: function(event) {
    console.log(event)
  }
})