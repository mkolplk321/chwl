var e = getApp(), t = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        phone: e.globalData.mobile,
        xs_coupon_list: [],
        xs_coupon_id: null,
        xs_coupon_value: "请选择"
    },
    orderbuy: function() {
        var a = this, o = a.data.phone, i = a.data.number, n = a.data.team_id, s = (a.data.agentid, 
        a.data.code), u = a.data.xs_coupon_id;
        if (console.log(u), !/^1\d{10}$/.test(o)) return wx.showToast({
            title: "手机号有误！"
        }), !1;
        if ("" == i) return wx.showToast({
            title: "数量有误！"
        }), !1;
        if ("" == s) return wx.showToast({
            title: "获取用户信息失败！ "
        }), !1;
        var c = {
            user_id: e.globalData.userId,
            mobile: o,
            team_id: n,
            quantity: i,
            xs_coupon_id: u,
            agent_id: this.data.agentid
        };
        t.order.activesubmit(c, function(t, a) {
            if ("success" === t) if (1 == a.data.code) {
                if (e.globalData.debug) return void wx.redirectTo({
                    url: "../buy/success?orderid=" + a.data.orderid + "&team_id=" + n
                });
                wx.requestPayment({
                    timeStamp: a.data.timeStamp,
                    nonceStr: a.data.nonceStr,
                    package: a.data.package,
                    signType: a.data.signType,
                    paySign: a.data.paySign,
                    success: function(e) {
                        console.log("###success"), console.log(e), wx.redirectTo({
                            url: "../buy/success?orderId=" + a.data.orderid + "&team_id=" + n
                        });
                    },
                    fail: function(e) {
                        console.log("###fail"), console.log(e);
                    },
                    complete: function(e) {
                        console.log("###complete"), console.log(e);
                    }
                });
            } else wx.showToast({
                title: a.data.msg
            }); else "fail" == t && console.log("网络超时");
        });
    },
    phoneinput: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    jian: function() {
        var e = this.data.number, t = (this.data.youhui, this.data.referprice);
        (e -= 1) <= 1 && (e = 1), t = parseFloat(100 * t) * parseInt(e) / 100 - 0, this.setData({
            number: e,
            summoney: t
        });
    },
    jia: function() {
        var e = this.data.number, t = (this.data.youhui, this.data.referprice);
        e += 1, t = parseFloat(100 * t) * parseInt(e) / 100 - 0, this.setData({
            number: e,
            summoney: t
        });
    },
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        var t = this.data.xs_coupon_list;
        this.setData({
            xs_coupon_id: t[e.detail.value].id,
            xs_coupon_value: t[e.detail.value].money
        });
    },
    onLoad: function(a) {
        var o = this;
        wx.login({
            success: function(e) {
                e.code && o.setData({
                    code: e.code
                });
            }
        }), t.user.getuserxs_coupon(e.globalData.userId, function(e, t) {
            "success" === e ? (console.log(t.data), o.setData({
                xs_coupon_list: t.data
            })) : "fail" == e && console.log("获取优惠券失败");
        }), o.setData({
            team_id: a.team_id,
            team_name: a.team_name,
            agentid: a.agentid,
            start_time: a.start_time,
            end_time: a.end_time,
            referprice: a.referprice,
            number: 1,
            youhui: "满五张立减5元",
            summoney: a.referprice
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            phone: e.globalData.mobile
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});