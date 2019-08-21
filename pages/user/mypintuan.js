function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), n = require("../../utils/api.js");

require("../../utils/util.js");

Page((e = {
    data: {
        windowWidth: a.systemInfo.windowWidth,
        windowHeight: a.systemInfo.windowHeight,
        teams: [],
        loading: !1,
        hidden: !1,
        refundhidden: !0,
        inputVal: 0,
        order_id: null
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            teams: []
        }), this.loadMore();
    },
    loadMore: function(t, e) {
        var o = this, i = o.data.loading, d = {
            page: o.data.page,
            userid: a.globalData.userId
        };
        i || (o.setData({
            loading: !0
        }), n.pintuan.mypintuan(d, function(t, a) {
            if (console.log(a), "success" === t) {
                console.log(a);
                var n = a.data;
                e ? wx.stopPullDownRefresh() : n = o.data.teams.concat(n);
                var i = o.data.page + 1;
                o.setData({
                    teams: n,
                    page: i,
                    loading: !1,
                    hidden: !0
                });
            }
        }));
    },
    gotobuy: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../pintuanteam/team?id=" + e.id
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.setData({
            page: 1,
            teams: []
        }), this.loadMore();
    },
    onHide: function() {},
    onUnload: function() {}
}, t(e, "onPullDownRefresh", function() {}), t(e, "onReachBottom", function() {}), 
t(e, "orderdetail", function(t) {
    var e = t.currentTarget.dataset;
    wx.navigateTo({
        url: "../order/detail?orderId=" + e.id
    });
}), t(e, "gotopintuandetail", function(t) {
    var e = t.currentTarget.dataset;
    wx.navigateTo({
        url: "../pintuan/tuandetail?tuan_id=" + e.id
    });
}), t(e, "onShareAppMessage", function() {}), t(e, "refund", function(t) {
    var e = t.currentTarget.dataset;
    this.setData({
        order_id: e.id,
        refundhidden: !1
    });
}), t(e, "refundcancel", function() {
    this.setData({
        refundhidden: !0
    });
}), t(e, "refundconfirm", function() {
    var t = this, e = t.data.inputVal, a = t.data.order_id;
    return console.log(a), e <= 0 ? (wx.showToast({
        title: "输入有误请重新输入"
    }), !1) : "" == a ? (wx.showToast({
        title: "参数有误"
    }), !1) : void n.pintuan.refund(a, e, function(e, a) {
        "success" === e ? (console.log(a), 1 == a.data.code ? (wx.showToast({
            title: "成功",
            icon: "success",
            duration: 2e3
        }), t.setData({
            page: 1,
            teams: [],
            hidden: !1,
            refundhidden: !0
        }), t.loadMore()) : (wx.showToast({
            title: a.data.message,
            icon: "success",
            duration: 2e3
        }), t.setData({
            page: 1,
            teams: [],
            hidden: !1,
            refundhidden: !0
        }), t.loadMore())) : "fail" == e && console.log("退款失败");
    });
}), t(e, "bindKeyInput", function(t) {
    this.setData({
        inputVal: t.detail.value
    });
}), e));