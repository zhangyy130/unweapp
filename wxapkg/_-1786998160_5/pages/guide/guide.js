Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(n) {
        return "button" == n.from && console.log(n.target), {
            title: "逢低买入 逢高卖出",
            path: "pages/index/index"
        };
    }
});