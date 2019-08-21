getApp();

var o = require("../../utils/api.js");

require("../../utils/util.js"), wx.getLogManager();

Page({
    data: {
        categoryList: []
    },
    onLoad: function(t) {
        var n = this;
        o.ticket.groupList(function(o, t) {
            if ("success" == o) {
                console.log(t);
                for (var a = t.data.data, i = 0; i < a.length; i++) a[i].iconImg = a[i].icon ? "http://assets.huayupiaowu.com" + a[i].icon : "/images/default.png";
                n.setData({
                    categoryList: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});