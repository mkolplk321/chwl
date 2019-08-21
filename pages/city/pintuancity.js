var t = getApp(), e = require("../../utils/pintuancity.js");

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
        var i = e.searchLetter, a = e.cityList(), n = wx.getSystemInfoSync();
        console.log(n);
        for (var o = n.windowHeight, s = o / i.length, r = [], c = 0; c < i.length; c++) {
            var h = {};
            h.name = i[c], h.tHeight = c * s, h.bHeight = (c + 1) * s, r.push(h);
        }
        this.setData({
            winHeight: o,
            itemH: s,
            searchLetter: r,
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
        t.globalData.pintuancity.id = i.id, t.globalData.pintuancity.name = i.name, wx.setStorage({
            key: "city_id",
            data: i.id
        }), wx.setStorage({
            key: "city_name",
            data: i.name
        });
        var a = wx.getStorageSync("city_id");
        wx.getStorageSync("city_name");
        "" != a && wx.navigateTo({
            url: "../pintuan/index"
        });
    },
    nowLetter: function(t, e) {
        for (var i = this.data.searchLetter, a = 0, n = 0, o = "", s = 0; s < i.length; s++) if (i[s].tHeight <= t && t <= i[s].bHeight) {
            a = i[s].bHeight, n = i[s].tHeight, o = i[s].name;
            break;
        }
        this.setScrollTop(e, o), e.setData({
            bHeight: a,
            tHeight: n,
            showLetter: o,
            startPageY: t
        });
    },
    bindScroll: function(t) {
        console.log(t.detail);
    },
    setScrollTop: function(t, e) {
        for (var i = 0, a = t.data.cityList, n = 0, o = 0, s = 0; s < a.length; s++) {
            if (e == a[s].initial) {
                i = 30 * o + 41 * n;
                break;
            }
            o++, n += a[s].cityInfo.length;
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