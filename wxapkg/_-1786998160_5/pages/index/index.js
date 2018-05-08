function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

getApp();

var e, a, n = require("../../utils/wcharts.js"), i = [], o = [], s = [], r = [], d = 0;

Page((e = {
    data: {
        array: [ "年线(250日均线)", "半年线(120日均线)", "季度线(60日均线)" ],
        dateArray: [ "250", "120", "60" ],
        value: 0,
        updateTime: 0,
        indexInfo: null,
        indexesList: null,
        chosenClass: "",
        indexNum: 0,
        scrollTop: 0,
        itemHeight: 0,
        hidden: !0
    },
    onLoad: function(t) {
        this.setData({
            from: t.from || "aniu"
        }), wx.createCanvasContext ? this.fetchList() : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    canvasIdErrorCallback: function(t) {
        console.error(t.detail.errMsg);
    },
    touchHandler: function(t) {
        n.showToolTip(t);
    },
    onReady: function(t) {},
    onShow: function() {},
    getSystemSize: function() {
        try {
            var t = wx.getSystemInfoSync();
            return {
                w: t.windowWidth,
                h: t.windowHeight
            };
        } catch (t) {
            console.log(t);
        }
    },
    bindPickerChange: function(t) {
        var e = this, a = t.detail.value, n = [];
        switch (+a) {
          case 0:
            r = s;
            break;

          case 1:
            r = o;
            break;

          case 2:
            r = i;
        }
        n = e.processListData(r), e.setData({
            value: a,
            indexesList: n
        }), this.setCharts(), this.navToFund();
    },
    processListData: function(t) {
        return t.map(function(t) {
            return {
                diff_250: t.diff_250,
                diff_120: t.diff_120,
                diff_60: t.diff_60,
                indexfullname: t.indexfullname
            };
        });
    },
    setCharts: function() {
        var t = this, e = t.data.indexInfo, i = +t.data.value, o = wx.createCanvasContext("charts"), s = e.alldates, r = e.allindex, d = e.max_index, u = e.min_index, f = e.indexfullname, l = "", c = "", h = [], m = {
            width: 68,
            height: 20,
            fontColor: "#ffffff"
        }, x = {
            height: 20
        }, p = "";
        switch (i) {
          case 0:
            var g = e.ma_max_250, v = e.ma_min_250, _ = e.allma_250, w = e.diff_250, C = e.action_250, b = "250日均线";
            break;

          case 1:
            var g = e.ma_max_120, v = e.ma_min_120, _ = e.allma_120, w = e.diff_120, C = e.action_120, b = "120日均线";
            break;

          case 2:
            var g = e.ma_max_60, v = e.ma_min_60, _ = e.allma_60, w = e.diff_60, C = e.action_60, b = "60日均线";
        }
        w <= 20 ? (l = "#63C091", c = "#e1f2ea") : (l = "#E45E6C", c = "#f9dfe2"), p = w > 0 ? "+" + w : w, 
        m.backgroundColor = l, m.tipsContent = "偏移" + p + "%", x.backgroundColor = c, x.tipsContent = C, 
        x.width = t.countWidth(x.tipsContent), x.fontColor = l, h.push(m), 0 == i && h.push(x);
        var D = 1.2 * Math.max(g, d), L = Math.min(v, u);
        n.init(o, {
            series: [ {
                xArisData: {
                    data: function() {
                        for (var t = [], e = s.length - 1; e >= 0; e--) t.push({
                            value: s[e]
                        });
                        return t;
                    }()
                },
                yArisData: {
                    data: function() {
                        for (var t = [], e = _.length - 1; e >= 0; e--) _[e] || (_[e] = _[e + 1]), t.push({
                            value: _[e]
                        });
                        return t;
                    }()
                },
                type: "lineDash",
                color: "#999999",
                name: b
            }, {
                xArisData: {
                    data: function() {
                        for (var t = [], e = s.length - 1; e >= 0; e--) t.push({
                            value: s[e]
                        });
                        return t;
                    }()
                },
                yArisData: {
                    data: function() {
                        for (var t = [], e = r.length - 1; e >= 0; e--) r[e] || (r[e] = r[e + 1]), t.push({
                            value: r[e]
                        });
                        return t;
                    }()
                },
                type: "line",
                color: "#999999",
                name: f,
                drawPoint: {
                    point: function() {
                        var t = [];
                        return t.push(249), t;
                    }(),
                    pointColor: l
                },
                tipsBoxes: h
            } ],
            minYArisData: L,
            maxYArisData: D,
            width: .9 * a.w,
            height: .4 * a.w
        });
    },
    countWidth: function(t) {
        return 12 * t.length > 60 ? 60 : 12 * t.length;
    },
    fetchList: function() {
        var t = this;
        wx.request({
            url: "https://m.aniu.com.cn/superfund/ma_share/",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                a = t.getSystemSize(), d = .14 * a.w, r = e.data.sorted_250;
                var n = t.processListData(r);
                t.setData({
                    updateTime: e.data.updatetime,
                    indexesList: n,
                    indexInfo: e.data.start_data
                }), t.setCharts(), t.navToFund(), t.setOtherList(e.data);
            }
        });
    },
    setOtherList: function(t) {
        i = t.sorted_60, o = t.sorted_120, s = t.sorted_250;
    },
    setNowIndexInfo: function() {
        for (var t = this, e = t.data.indexesList.length, a = 0; a < e; a++) {
            var n = a > 0 ? a - 1 : a;
            if ("上证综合指数" == t.data.indexesList[a].indexfullname) {
                t.setData({
                    indexInfo: t.data.indexesList[a],
                    scrollTop: t.data.itemHeight * n
                });
                break;
            }
        }
    },
    choseIndex: function(t) {
        var e = t.target.dataset.fund, a = this;
        this.setData({
            indexInfo: r[e]
        }), a.setCharts();
    },
    navToFund: function() {
        for (var t = this, e = t.data.indexInfo, a = t.data.indexesList, n = 0, i = a.length, o = 0; o < i; o++) if (a[o].indexfullname == e.indexfullname) {
            n = o > 0 ? o - 1 : o;
            break;
        }
        var s = d * n;
        t.setData({
            scrollTop: s
        });
    },
    bindNavToIndex: function() {
        this.navToFund();
    },
    onShareAppMessage: function(t) {
        return "button" == t.from && console.log(t.target), {
            title: "均线小程序",
            path: "pages/index/index"
        };
    },
    bindtouch: function() {}
}, t(e, "onShareAppMessage", function(t) {
    return "button" == t.from && console.log(t.target), {
        title: "逢低买入 逢高卖出",
        path: "pages/index/index"
    };
}), t(e, "gotoKefu", function() {
    wx.navigateTo({
        url: "/pages/guide-help/guide-help"
    });
}), t(e, "hideKefu", function() {
    this.setData({
        hidden: !0
    });
}), e));