getApp(), require("../../utils/api.js");

Page({
    data: {
        flag: !1,
        orderid: null,
        team_id: null,
        hidden: !0
    },
    onLoad: function(t) {
        this.setData({
            orderid: t.orderId,
            team_id: t.team_id
        });
    },
    confirm: function() {
        this.setData({
            hidden: !0
        });
    },
    gotoOrderDetail: function(t) {
        var n = t.currentTarget.dataset.id;
        wx.redirectTo({
            url: "../order/detail?orderId=" + n
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    hide: function() {
        this.setData({
            flag: !0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        "button" === t.from && console.log(t.target);
    }
});