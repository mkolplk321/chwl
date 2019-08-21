getApp(), require("../../utils/api.js");

Page({
    data: {
        fa_user_id: null,
        fa_team_id: null,
        fa_orderid: null
    },
    onLoad: function(a) {
        var n = this, i = a, o = i.fa_userid, t = i.fa_team_id, e = i.fa_orderid;
        n.setData({
            fa_user_id: o,
            fa_team_id: t,
            fa_orderid: e
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    gotoindex: function() {
        var a = this.data.fa_team_id;
        wx.navigateTo({
            url: "../team/team?id=" + a
        });
    }
});