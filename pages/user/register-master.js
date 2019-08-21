var t = getApp(), e = require("../../utils/api.js"), a = (require("../../utils/util.js"), 
require("../../WxNotificationCenter/WxNotificationCenter.js"));

Page({
    data: {
        isAgree: !0,
        masterInfo: {}
    },
    onLoad: function(e) {
        var a = this;
        t.doLogin().then(function(e) {
            a.setData({
                masterInfo: {
                    realname: t.globalData.userInfo.nickName,
                    mobile: t.globalData.mobile,
                    userid: t.globalData.userId,
                    code: ""
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    bindRealnameInput: function(t) {
        this.data.masterInfo.realname = t.detail.value;
    },
    bindMobileInput: function(t) {
        this.data.masterInfo.mobile = t.detail.value;
    },
    bindCodeInput: function(t) {
        this.data.masterInfo.code = t.detail.value;
    },
    registerMaster: function() {
        "" != this.data.masterInfo.realname ? "" != this.data.masterInfo.mobile ? "" != this.data.masterInfo.code ? (wx.showLoading({
            title: "注册中，请稍候..."
        }), e.user.registerMaster(this.data.masterInfo, function(e, o) {
            "success" == e && (console.log(o.data), 1 == o.data.code ? (t.globalData.userSns = "superagent", 
            a.postNotificationName("RegisterMasterSuccess"), wx.switchTab({
                url: "/pages/user/user"
            })) : wx.showToast({
                title: o.data.msg,
                icon: "none"
            })), "complete" == e && wx.hideLoading();
        })) : wx.showToast({
            title: "注册码不能为空",
            icon: "none"
        }) : wx.showToast({
            title: "手机号不能为空",
            icon: "none"
        }) : wx.showToast({
            title: "真实姓名不能为空",
            icon: "none"
        });
    }
});