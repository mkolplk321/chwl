var e = getApp(), t = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        phone: e.globalData.mobile,
        tuan_id: 0
    },
    orderbuy: function() {
        var a = this, n = (a.data.agentid, a.data.phone), o = a.data.number, i = a.data.team_id, s = a.data.code, c = a.data.type, l = a.data.tuan_id;
        if (!/^1\d{10}$/.test(n)) return wx.showToast({
            title: "手机号有误！"
        }), !1;
        if ("" == o) return wx.showToast({
            title: "数量有误！"
        }), !1;
        if ("" == s) return wx.showToast({
            title: "获取用户信息失败！ "
        }), !1;
        if ("" == c) return wx.showToast({
            title: "参数有误请重新购买!"
        }), !1;
        var r = {
            user_id: e.globalData.userId,
            mobile: n,
            team_id: i,
            quantity: o,
            types: c,
            tuan_id: l,
            agent_id: this.data.agentid
        };
        console.log(r), t.order.pintuansubmit(r, function(e, t) {
            "success" === e ? (console.log(2), console.log(t), console.log(1), 1 == t.data.code ? wx.requestPayment({
                timeStamp: t.data.timeStamp,
                nonceStr: t.data.nonceStr,
                package: t.data.package,
                signType: t.data.signType,
                paySign: t.data.paySign,
                success: function(e) {
                    console.log("###success"), console.log(e), wx.redirectTo({
                        url: "../pintuanbuy/success?orderId=" + t.data.orderid + "&team_id=" + i
                    });
                },
                fail: function(e) {
                    console.log("###fail"), console.log(e);
                },
                complete: function(e) {
                    console.log("###complete"), console.log(e);
                }
            }) : 2 == t.data.code ? wx.requestPayment({
                timeStamp: t.data.timeStamp,
                nonceStr: t.data.nonceStr,
                package: t.data.package,
                signType: t.data.signType,
                paySign: t.data.paySign,
                success: function(e) {
                    console.log("###success"), console.log(e), wx.redirectTo({
                        url: "../pintuan/tuandetail?tuan_id=" + t.data.tuan_id
                    });
                },
                fail: function(e) {
                    console.log("###fail"), console.log(e);
                },
                complete: function(e) {
                    console.log("###complete"), console.log(e);
                }
            }) : wx.showToast({
                title: t.data.msg
            })) : "fail" == e && console.log("网络超时");
        });
    },
    phoneinput: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    jian: function() {
        var e = this.data.number, t = this.data.referprice;
        (e -= 1) <= 1 && (e = 1), t = parseFloat(100 * t) * parseInt(e) / 100 - 0, this.setData({
            number: e,
            summoney: t
        });
    },
    jia: function() {
        var e = this.data.number, t = this.data.referprice;
        e += 1, t = parseFloat(100 * t) * parseInt(e) / 100 - 0, this.setData({
            number: e,
            summoney: t
        });
    },
    onLoad: function(e) {
        var t = this;
        wx.login({
            success: function(e) {
                e.code && t.setData({
                    code: e.code
                });
            }
        });
        var a = e.types;
        1 == a ? t.setData({
            team_id: e.team_id,
            team_name: e.team_name,
            start_time: e.start_time,
            end_time: e.end_time,
            referprice: e.sellprice,
            number: 1,
            summoney: e.sellprice,
            num_is_show: !1,
            agentid: e.agentid,
            type: a
        }) : t.setData({
            team_id: e.team_id,
            team_name: e.team_name,
            start_time: e.start_time,
            end_time: e.end_time,
            referprice: e.referprice,
            number: 1,
            summoney: e.referprice,
            num_is_show: !0,
            type: a,
            agentid: e.agentid,
            tuan_id: e.tuan_id
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            phone: e.globalData.mobile
        });
    },
    getuserphone: function(e) {
        console.log(e);
        var t = encodeURIComponent(e.detail.encryptedData);
        console.log(t);
        var a = encodeURIComponent(e.detail.iv);
        console.log(a);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});