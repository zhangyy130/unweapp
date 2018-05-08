var t = function() {
    function t(t) {
        return {
            xArisData: t.xArisData.data,
            yArisData: t.yArisData.data,
            type: t.type,
            color: t.color,
            name: t.name,
            drawPoint: t.drawPoint && t.drawPoint.point || [],
            pointColor: t.drawPoint && t.drawPoint.pointColor,
            tipsBoxes: t.tipsBoxes || [ {
                width: 100,
                height: 40,
                backgroundColor: "blue",
                fontColor: "#ffffff"
            } ]
        };
    }
    function e(e) {
        e && "drawToolTip" == e.type && (f.save(), n(e.seriesData, e.index * g), f.restore()), 
        d.forEach(function(e, i) {
            var n = t(e), r = 15 * (i + 1);
            if (n.type) switch (n.type) {
              case "line":
                f.setLineDash([ 5, 0 ]), a(n), o(r, n.name);
                break;

              case "lineDash":
                f.setLineDash([ 2, 2 ]), a(n), o(r, n.name);
                break;

              default:
                console.log("没有传入类型");
            }
            n.drawPoint.length > 0 && n.drawPoint.forEach(function(t) {
                var e = x[t], o = v - P - ((n.yArisData[t].value - A) * D).toFixed(4), i = {
                    x: e,
                    y: n.yArisData[t].value
                };
                l(e, o, n.pointColor), s(e, o, i, n.tipsBoxes);
            });
        }), f.setLineJoin("round"), f.draw();
    }
    function o(t, e) {
        f.beginPath(), f.setFillStyle("#999999"), f.moveTo(0, t), f.lineTo(20, t), f.setFontSize(10), 
        f.fillText(e, 25, t), f.stroke();
    }
    function i(t) {
        f.setStrokeStyle(t.color), f.setLineWidth(T);
    }
    function a(t) {
        i(t), f.beginPath(), f.moveTo(0, v - P - (t.yArisData[0].value - A) * D);
        for (var e = 1; e < w; e++) {
            var o = (g * e).toFixed(4), a = ((t.yArisData[e].value - A) * D).toFixed(4);
            x.length < w && x.push(o), f.lineTo(o, v - P - a);
        }
        f.stroke();
    }
    function n(t, e) {
        r(e);
    }
    function r(t) {
        f.setStrokeStyle("#999999"), f.setLineWidth(T), f.setLineDash([ 5, 0 ]), f.moveTo(t, 0), 
        f.lineTo(t, v), f.stroke();
    }
    function l(t, e, o) {
        f.beginPath(), f.moveTo(t, e), f.setFillStyle(o), f.arc(t, e, 3, 0, 2 * Math.PI), 
        f.fill();
    }
    function s(t, e, o, i) {
        var a = 0;
        i.forEach(function(o, i) {
            0 == i && h(t, e, o.backgroundColor);
            var n = t - 12 - o.width - a, r = e - 10;
            a = o.width + a, f.beginPath(), f.setFillStyle(o.backgroundColor), f.setGlobalAlpha(.9), 
            f.fillRect(n, r, o.width, o.height), f.beginPath(), f.setFontSize(10), f.setGlobalAlpha(1), 
            f.setFillStyle(o.fontColor), f.fillText(o.tipsContent, n + 4, r + 13);
        });
    }
    function h(t, e, o) {
        f.beginPath(), f.setFillStyle(o), f.setGlobalAlpha(.9), f.moveTo(t - 6, e), f.lineTo(t - 13, e - 5), 
        f.lineTo(t - 13, e + 5), f.closePath(), f.fill();
    }
    function c(t, e) {
        var o = -1, i = (g / 2).toFixed(4);
        e.forEach(function(e, a) {
            o < 0 && t.x <= e && (o = e - t.x > i ? a - 1 : a);
        });
        return o;
    }
    function u(t, e) {
        var o = [];
        return t.length > 0 && -1 != e && t.forEach(function(t) {
            var i = t.xArisData.data, a = t.yArisData.data;
            o.push({
                x: i[e].value,
                y: a[e].value,
                type: t.type
            });
        }), o;
    }
    var f = void 0, d = [], y = 0, v = 0, p = 0, x = [ 0 ], g = 0, D = 0, T = 1, w = 0, A = 0, b = 0, P = 0;
    return {
        init: function(t, o) {
            f = t, p = o.maxYArisData, A = o.minYArisData, d = o.series, y = o.width, v = o.height, 
            b = o.yInterval, P = 15 * d.length, w = o.series[0].xArisData.data.length, g = (y / (w - 1)).toFixed(4), 
            D = (v / (p - A)).toFixed(4), e();
        },
        showToolTip: function(t) {
            var o = t.touches && t.touches.length ? t.touches : t.changedTouches, i = c({
                x: o[0].x,
                y: o[0].y
            }, x);
            e({
                type: "drawToolTip",
                index: i,
                seriesData: u(d, i)
            });
        }
    };
}();

module.exports = t;