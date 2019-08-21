var e = getApp(), a = require("../../utils/api.js"), n = (require("../../utils/util.js"), 
require("../../WxNotificationCenter/WxNotificationCenter.js"));

Page({
    data: {
        userInfo: e.globalData.userInfo,
        userSns: e.globalData.userSns,
        orderInfo: {},
        loadingText: "加载中...",
        loadingHidden: !1
    },
    onLoad: function() {
        var a = this;
        e.doLogin().then(function(n) {
            a.setData({
                userInfo: e.globalData.userInfo,
                userSns: e.globalData.userSns,
                loadingHidden: !0
            });
        }), n.addNotification("RegisterMasterSuccess", a.onRegisterMasterSuccess, a);
    },
    onShow: function() {},
    refreshLogin: function() {
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] && (wx.showLoading({
                    title: "重新登录中"
                }), e.doLogin());
            }
        });
    },
    doLogin: function() {
        var n = this;
        wx.login({
            success: function(o) {
                if (o.code) {
                    var s = o.code;
                    wx.getUserInfo({
                        success: function(a) {
                            e.globalData.userInfo = a.userInfo;
                            encodeURIComponent(a.encryptedData), a.iv;
                        }
                    });
                    a.user.getUserId(s, null, null, function(a, o) {
                        if ("success" === a) {
                            var s = o.data.user_id, t = o.data.mobile;
                            e.globalData.userId = s, e.globalData.mobile = t, n.setData({
                                userInfo: e.globalData.userInfo
                            }), wx.showLoading({
                                title: "登录成功"
                            }), setTimeout(function() {
                                wx.hideLoading();
                            }, 1e3), n.uploadavatar(e.globalData.userInfo.avatarUrl, e.globalData.userInfo.nickName, s);
                        } else "complete" == a && console.log(o);
                    });
                } else console.log("获取用户登录态失败！" + o.errMsg);
            }
        });
    },
    uploadavatar: function(e, n, o) {
        "" != e && "" != o && a.user.uploadavatarUrl(e, n, o, function(e, a) {
            "success" === e && (console.log("头像上传成功"), console.log(o));
        });
    },
    mypintuan: function() {
        wx.navigateTo({
            url: "/pages/user/mypintuan"
        });
    },
    myorder: function() {
        wx.navigateTo({
            url: "/pages/user/orders"
        });
    },
    xscoupon: function() {
        wx.navigateTo({
            url: "/pages/user/xs_coupon"
        });
    },
    mymember: function() {
        wx.navigateTo({
            url: "/pages/mymember/mymember"
        });
    },
    withdraw: function() {
        wx.navigateTo({
            url: "/pages/user/withdrawals2"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "吃喝玩乐限时抢购",
            path: "/pages/index/index",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    applyQunzhu: function() {
        wx.navigateTo({
            url: "/pages/user/register-master"
        });
    },
    onRegisterMasterSuccess: function() {
        this.setData({
            userInfo: e.globalData.userInfo,
            userSns: e.globalData.userSns
        });
    }
});