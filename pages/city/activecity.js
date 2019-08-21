var t = getApp(), e = require("../../utils/activecity.js");

require("../../utils/api.js"), require("../../utils/util.js");

Page({
    data: {
        searchLetter: [],
        showLetter: "",
        winHeight: 0,
        tHeight: 0,
        bHeight: 0,
        startPageY: 0,
        cityList: [],
        isShowLetter: !1,
        scrollTop: 0,
        city: ""
    },
    onLoad: function(t) {
        for (var i = e.searchLetter, a = e.cityList(), n = wx.getSystemInfoSync().windowHeight, s = n / i.length, o = [], r = 0; r < i.length; r++) {
            var h = {};
            h.name = i[r], h.tHeight = r * s, h.bHeight = (r + 1) * s, o.push(h);
        }
        this.setData({
            winHeight: n,
            itemH: s,
            searchLetter: o,
            cityList: a
        }), console.log(this.data.cityInfo);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "title",
            desc: "desc",
            path: "path"
        };
    },
    searchStart: function(t) {
        var e = t.currentTarget.dataset.letter, i = t.touches[0].pageY;
        this.setScrollTop(this, e), this.nowLetter(i, this), this.setData({
            showLetter: e,
            startPageY: i,
            isShowLetter: !0
        });
    },
    searchMove: function(t) {
        var e = t.touches[0].pageY, i = this.data.startPageY, a = this.data.tHeight, n = this.data.bHeight;
        console.log(e), i - e > 0 ? e < a && this.nowLetter(e, this) : e > n && this.nowLetter(e, this);
    },
    searchEnd: function(t) {
        var e = this;
        setTimeout(function() {
            e.setData({
                isShowLetter: !1
            });
        }, 1e3);
    },
    selectCity: function(e) {
        var i = e.currentTarget.dataset;
        t.globalData.city.id = i.id, t.globalData.city.name = i.name, wx.setStorage({
            key: "city_id",
            data: i.id
        }), wx.setStorage({
            key: "city_name",
            data: i.name
        }), wx.switchTab({
            url: "../active/index"
        });
    },
    nowLetter: function(t, e) {
        for (var i = this.data.searchLetter, a = 0, n = 0, s = "", o = 0; o < i.length; o++) if (i[o].tHeight <= t && t <= i[o].bHeight) {
            a = i[o].bHeight, n = i[o].tHeight, s = i[o].name;
            break;
        }
        this.setScrollTop(e, s), e.setData({
            bHeight: a,
            tHeight: n,
            showLetter: s,
            startPageY: t
        });
    },
    bindScroll: function(t) {},
    setScrollTop: function(t, e) {
        for (var i = 0, a = t.data.cityList, n = 0, s = 0, o = 0; o < a.length; o++) {
            if (e == a[o].initial) {
                i = 30 * s + 41 * n;
                break;
            }
            s++, n += a[o].cityInfo.length;
        }
        t.setData({
            scrollTop: i
        });
    },
    bindCity: function(t) {
        var e = t.currentTarget.dataset.city;
        this.setData({
            city: e
        });
    }
});