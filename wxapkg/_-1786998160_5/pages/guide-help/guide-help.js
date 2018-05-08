require("../../utils/util.js");

Page({
    data: {},
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    copyName: function(o) {
        var t = o.currentTarget.dataset.name, n = this;
        wx.setClipboardData({
            data: t,
            success: function(o) {
                n.showToast("复制成功", "none");
            }
        });
    },
    savePic: function(o) {
        var t = o.currentTarget.dataset.url, n = this;
        wx.getSetting({
            success: function(o) {
                o.authSetting["scope.writePhotosAlbum"] ? n.writeToPhoto(t) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        n.writeToPhoto(t);
                    }
                });
            }
        });
    },
    writeToPhoto: function(o) {
        console.log(o);
        var t = this;
        wx.saveImageToPhotosAlbum({
            filePath: o,
            success: function(o) {
                t.showToast("保存图片成功");
            },
            fail: function(o) {
                console.log(o), console.log("fail");
            }
        });
    },
    showToast: function(o, t) {
        console.log(t), wx.showToast({
            title: o,
            icon: t || "success",
            duration: 2e3
        });
    }
});