var t = getApp(), a = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        userId: t.globalData.userId,
        tuan_id: null,
        indicatorDots: !1,
        day_show: 0,
        hour_show: 0,
        minute_show: 0,
        second_show: 0,
        modalflag: !0,
        is_buy: !1,
        hidden: !1
    },
    onLoad: function(e) {
        var n = this, o = t.globalData.userId;
        if (o) {
            console.log(111);
            var i = e.tuan_id;
            a.pintuan.gettuandetail(i, o, function(t, a) {
                if ("success" === t) {
                    console.log(a), n.setData({
                        team: a.data.team,
                        tuan: a.data.tuan,
                        tuan_user: a.data.tuan_user,
                        user_list: a.data.user_list,
                        is_buy: a.data.is_buy,
                        my_order: a.data.my_order
                    });
                    var e = a.data.tuan.end_time, o = setInterval(function() {
                        var t = 0, a = 0, i = 0, u = 0;
                        e > 0 ? (t = Math.floor(e / 86400), a = Math.floor(e / 3600) - 24 * t, i = Math.floor(e / 60) - 24 * t * 60 - 60 * a, 
                        u = Math.floor(e) - 24 * t * 60 * 60 - 60 * a * 60 - 60 * i) : clearInterval(o), 
                        i <= 9 && (i = "0" + i), u <= 9 && (u = "0" + u), n.setData({
                            day_show: t,
                            hour_show: a,
                            minute_show: i,
                            second_show: u
                        }), e--;
                    }, 1e3);
                    n.setData({
                        hidden: !0
                    });
                }
            });
        } else wx.login({
            success: function(t) {
                if (t.code) {
                    var o = t.code;
                    a.user.getUserId(o, null, null, function(t, o) {
                        if ("success" === t) {
                            var i = o.data.user_id, u = e.tuan_id;
                            a.pintuan.gettuandetail(u, i, function(t, a) {
                                if (console.log(a), "success" === t) {
                                    n.setData({
                                        team: a.data.team,
                                        tuan: a.data.tuan,
                                        tuan_user: a.data.tuan_user,
                                        user_list: a.data.user_list,
                                        is_buy: a.data.is_buy,
                                        my_order: a.data.my_order
                                    });
                                    var e = a.data.tuan.end_time, o = setInterval(function() {
                                        var t = 0, a = 0, i = 0, u = 0;
                                        e > 0 ? (t = Math.floor(e / 86400), a = Math.floor(e / 3600) - 24 * t, i = Math.floor(e / 60) - 24 * t * 60 - 60 * a, 
                                        u = Math.floor(e) - 24 * t * 60 * 60 - 60 * a * 60 - 60 * i) : clearInterval(o), 
                                        i <= 9 && (i = "0" + i), u <= 9 && (u = "0" + u), n.setData({
                                            day_show: t,
                                            hour_show: a,
                                            minute_show: i,
                                            second_show: u
                                        }), e--;
                                    }, 1e3);
                                    n.setData({
                                        hidden: !0
                                    });
                                }
                            });
                        } else "complete" == t && console.log(o);
                    });
                } else console.log("获取用户登录态失败！" + t.errMsg);
            }
        });
    },
    gotocoupon: function() {
        var t = this.data.my_order.id;
        wx.navigateTo({
            url: "../order/detail?orderId=" + t
        });
    },
    onReady: function() {},
    gotobuy: function() {
        var t = this, a = t.data.team.id, e = t.data.team.title, n = t.data.team.expire_start_time, o = t.data.team.expire_time, i = t.data.team.referprice, u = t.data.tuan.id;
        wx.navigateTo({
            url: "/pages/pintuanbuy/buy?team_id=" + a + "&team_name=" + e + "&start_time=" + n + "&end_time=" + o + "&referprice=" + i + "&types=2&tuan_id=" + u
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    gotopintuan: function() {
        wx.switchTab({
            url: "../pintuan/index"
        });
    },
    gotoindex: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    moretuanlist: function() {
        this.setData({
            modalflag: !1
        });
    },
    modalOk: function() {
        this.setData({
            modalflag: !0
        });
    },
    gotodetail: function() {
        var t = this.data.team.id;
        wx.navigateTo({
            url: "../pintuanteam/team?id=" + t
        });
    },
    onShareAppMessage: function(a) {
        var e = this.data.tuan.id;
        "button" === a.from && console.log(a.target);
        var n;
        return n = "您的好友 " + t.globalData.userInfo.nickName + " 邀请您一起购买" + this.data.team.title, 
        console.log(t.globalData), {
            title: n,
            path: "/pages/pintuan/tuandetail?tuan_id=" + e,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});