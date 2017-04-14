
// const host = 'https://qlive.x.163.com';
const host = 'https://qlivetest.x.163.com';

let api = {
    // 发送统计数据
    accessLog: {	
    	url : host + '/log/saveAccessLog',
    	method : 'POST'
    },
    /* ------------------------------首页------------------------------ */
    // 标签列表
    tagList: {
    	url : host + '/live/square/tagList',
    	method : 'GET'
    },
    // 首页banner
    bannerList: { 
    	url : host + '/live/square/headpic/list',
    	method : 'GET'
    },
    // 获取指定tag摄像机列表
    squareIndexList: { 
    	url : host + '/live/square/index',
    	method : 'GET'
    },

    /* ---------------------------摄像机播放页-------------------------- */
    // 播放器detail
    cameraDetail: {
    	url : host + '/live/square/cameraDetail',
    	method : 'GET'
    },
    // 播放器go
    cameraGo: {
    	url : host + '/live/square/vedio/go',
    	method : 'POST'
    },
    // 播放器play
    cameraPlay: {
    	url : host + '/live/square/camera/play',
    	method : 'POST'
    },
    // 播放器心跳
    cameraHead: {
    	url : host + '/live/square/camera/heart',
    	method : 'POST'
    },
    // 摄像机相关推荐
    relateCamera: {
    	url : host + '/live/square/liveActivity/relateCamera',
    	method : 'GET'
    },
    // 播放器广告
    getLiveAds: {
    	url : host + '/yiXinApp/system/getLiveAds',
    	method : 'POST'
    },
    // 摄像机viewCount统计
    cameraView: {
    	url : host + '/live/square/camera/view', 
    	method : 'POST'
    },
    // 评论列表
    chatList: {
    	url : host + '/live/webChat/chatList',
    	method : 'GET'
    },
    // 发送评论
    chatSend: {
    	url : host + '/live/webChat/chat',
    	method : 'POST'
    },

    /* ------------------------------搜索------------------------------ */
    // 热门搜索词
    hotsearchList: {
    	url : host + '/live/square/hotsearch/list',
    	method : 'GET'
    },
    // 联想搜索词
    relationSearch: {
    	url : host + '/live/square/relationSearch',
    	method : 'POST'
    },
    // 搜索结果
    searchList: {
    	url : host + '/live/square/search',  
    	method : 'POST'
    },

}

export { api, host };

