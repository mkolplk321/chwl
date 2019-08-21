getApp(), require("../../utils/api.js");

Page({
    data: {
        flag: !1,
        orderid: null,
        team_id: null,
        hidden: !0,
        recommendList: null
    },
    onLoad: function(t) {
        this.setData({
            orderid: t.orderId,
            team_id: t.team_id
        }), this.loadRecommendList(this.data.team_id);
    },
    confirm: function() {
        this.setData({
            hidden: !0
        });
    },
    gotoOrderDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.redirectTo({
            url: "../order/detail?orderId=" + e
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
    },
    loadRecommendList: function(t) {
        var e = this;
        wx.request({
            url: "https://www.huayupiaowu.com/qianggou/api.php?do=getrecommendteams&id=" + t,
            success: function(t) {
                t.data.recommendteams && t.data.recommendteams.length > 0 && e.setData({
                    recommendList: t.data.recommendteams
                });
            }
        });
    }
});