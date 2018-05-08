Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return "button" == res.from && console.log(res.target), {
            title: "逢低买入 逢高卖出",
            path: "pages/index/index"
        };
    }
});