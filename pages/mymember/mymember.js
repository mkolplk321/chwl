var a = getApp(), t = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        windowWidth: a.systemInfo.windowWidth,
        windowHeight: a.systemInfo.windowHeight,
        teams: [],
        hidden: !1,
        count: 0,
        hasMore: !0,
        page: 1,
        size: 10
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            hasMore: !0,
            teams: []
        }), this.loadMore();
    },
    onReachBottom: function() {
        this.loadMore();
    },
    calling: function(a) {},
    loadMore: function() {
        var e = this;
        if (e.data.hasMore) {
            var o = {
                page: e.data.page,
                size: e.data.size,
                userid: a.globalData.userId
            };
            t.user.mymember(o, function(a, t) {
                if (wx.stopPullDownRefresh(), "success" === a) {
                    var o = t.data.list;
                    (!o || o.length < e.data.size) && e.setData({
                        hasMore: !1
                    }), o && o.length > 0 && (o = e.data.teams.concat(o), e.setData({
                        count: t.data.count,
                        teams: e.data.teams.concat(o),
                        page: e.data.page + 1
                    }));
                }
            });
        }
    },
    onLoad: function(a) {
        this.setData({
            page: 1,
            teams: []
        }), wx.startPullDownRefresh();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});