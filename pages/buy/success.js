getApp(), require("../../utils/api.js");

Page({
    data: {
        flag: !0,
        orderid: null,
        team_id: null
    },
    onLoad: function(t) {
        console.log("successdetail",t)
        this.setData({
            orderid: t.orderid,
            team_id: t.team_id
        }), this.loadRecommendList(this.data.team_id);
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
    loadRecommendList: function(t) {
        var e = this;
        // wx.request({
        //     url: "https://www.huayupiaowu.com/qianggou/api.php?do=getrecommendteams&id=" + t,
        //     success: function(t) {
        //         t.data.recommendteams && t.data.recommendteams.length > 0 && e.setData({
        //             recommendList: t.data.recommendteams
        //         });
        //     }
        // });
    }
});