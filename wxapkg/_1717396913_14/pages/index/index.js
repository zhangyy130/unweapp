var e = getApp();

Page({
    data: {
        list: [],
        index_time: 0,
        showBox: !1,
        hidden: !0
    },
    bindViewTap: function() {},
    onLoad: function(t) {
        var n = this;
        this.setData({
            from: t.from || "aniu"
        }), this.fetchList(), e.globalData.userInfo ? this.setData({
            userInfo: e.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? e.userInfoReadyCallback = function(e) {
            n.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(t) {
                e.globalData.userInfo = t.userInfo, n.setData({
                    userInfo: t.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    filterList: function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var o = e[n], a = {
                aniu_fundname: o.fund.aniu_fundname,
                petext: o.petext,
                stock_name: o.index_info[0],
                pe: Number(o.index_info[1]).toFixed(2),
                rank: o.index_info[2],
                color: o.color,
                indexno_id: o.indexno_id
            };
            t.push(a);
        }
        return t;
    },
    fetchList: function() {
        var e = this;
        wx.request({
            url: "https://m.aniu.com.cn/fof_pe_share/",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e.setData({
                    index_time: t.data.index_time,
                    list: e.filterList(t.data.slist)
                });
            }
        });
    },
    getUserInfo: function(t) {
        console.log(t), e.globalData.userInfo = t.detail.userInfo, this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        });
    },
    onShareAppMessage: function(e) {
        return "button" == e.from && console.log(e.target), {
            title: "指数估值定投管家",
            path: "pages/index/index"
        };
    },
    canShow: function(e) {
        3 == e.touches.length && this.setData({
            showBox: !0
        }), 2 == e.touches.length && this.setData({
            showBox: !1
        });
    },
    gotoKefu: function() {
        wx.navigateTo({
            url: "/pages/guide-help/guide-help"
        });
    }
});