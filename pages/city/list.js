var t = require("../../WxNotificationCenter/WxNotificationCenter.js"), a = getApp();

Page({
    data: {
        city: []
    },
    onLoad: function(t) {
        var i = this;
        a.loadCityData().then(function(t) {
            i.setData({
                city: t
            });
        });
    },
    bindtap: function(a) {
        console.log(a.detail), wx.setStorageSync("current-city", a.detail), t.postNotificationName("curCityChanged"), 
        wx.switchTab({
            url: "/pages/dashboard/index"
        });
    },
    input: function(t) {
        this.value = t.detail.value;
    },
    searchMt: function() {
        this.value || (this.value = ""), this.setData({
            value: this.value
        });
    },
    loadCityList: function() {
        var t = this;
        wx.request({
            url: "https://www.huayupiaowu.com/qianggou/api.php?do=citys",
            success: function(a) {
                t.setData({
                    city: a.data
                }), wx.setStorage({
                    key: "city-list-data",
                    data: a.data
                });
            }
        });
    }
});