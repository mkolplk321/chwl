var a = getApp(), t = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        windowWidth: a.systemInfo.windowWidth,
        windowHeight: a.systemInfo.windowHeight,
        userid: a.globalData.userId,
        y_withdraw: "0.00",
        k_withdraw: "0.00",
        z_withdraw: 0,
        flag: !0,
        bannav: 1,
        withdraw_log: [],
        loading: !1,
        hidden: !1
    },
    onLoad: function(a) {},
    loadMore: function(o, n) {
        var i = this, e = i.data.loading, d = {
            page: i.data.page,
            userid: a.globalData.userId
        };
        e || (i.setData({
            loading: !0
        }), t.user.withdrawlog(d, function(a, t) {
            if ("success" === a) {
                var o = t.data;
                console.log(t.data), n ? wx.stopPullDownRefresh() : o = i.data.withdraw_log.concat(o);
                var e = i.data.page + 1;
                i.setData({
                    withdraw_log: o,
                    page: e,
                    loading: !1,
                    hidden: !0
                });
            }
        }));
    },
    onReady: function() {},
    onShow: function() {
        var o = this, n = this, i = a.globalData.userId;
        t.user.withdrawals(i, function(a, t) {
            if ("success" === a) {
                var i = t.data;
                1 == i.code && n.setData({
                    y_withdraw: i.y_withdraw,
                    k_withdraw: i.k_withdraw,
                    z_withdraw: i.z_withdraw
                });
            }
            n.setData({
                page: 1,
                withdraw_log: []
            }), o.loadMore();
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    channelRendered: function(a) {
        var t = a.currentTarget.dataset.id;
        this.setData({
            bannav: t
        });
    },
    withdraw: function() {
        var o = this, n = o.data.k_withdraw, i = a.globalData.userId;
        "0.00" == n || n < 1 ? wx.showToast({
            title: "可提现金额为0或者小于1元",
            icon: "none",
            duration: 2e3
        }) : o.data.flag && (o.setData({
            flag: !1
        }), wx.showModal({
            title: "提示",
            content: "确认提现全部金额吗",
            success: function(a) {
                a.confirm ? t.user.withdraw(i, function(a, t) {
                    if ("success" === a) {
                        var n = t.data;
                        console.log(n), 1 == n.code && (wx.showToast({
                            title: "提现成功",
                            icon: "none",
                            duration: 2e3
                        }), o.onShow());
                    }
                }) : a.cancel;
            }
        }));
    }
});