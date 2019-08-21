var a = getApp(), t = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        num: 2,
        nonet: !0
    },
    onTap: function(a) {},
    onLoad: function(e) {
        var n = this, o = e.query;
        if (o && "schaibao" == o) {
            var i = a.globalData.userId;
            i ? t.user.makesub(i, function(a, t) {}) : wx.login({
                success: function(e) {
                    if (e.code) {
                        var o = e.code;
                        wx.getUserInfo({
                            success: function(t) {
                                console.log(t), a.globalData.userInfo = t.userInfo;
                                encodeURIComponent(t.encryptedData), t.iv;
                            }
                        });
                        t.user.getUserId(o, null, null, function(e, o) {
                            if ("success" === e) {
                                var i = o.data.user_id;
                                t.user.makesub(i, function(a, t) {}), n.uploadavatar(a.globalData.userInfo.avatarUrl, a.globalData.userInfo.nickName, i);
                            }
                        });
                    }
                }
            });
        }
        var r = wx.getStorageSync("city_id"), c = wx.getStorageSync("city_name");
        r && (a.globalData.city.id = r, a.globalData.city.name = c, wx.switchTab({
            url: "../index/index"
        }));
    },
    uploadavatar: function(a, e, n) {
        "" != a && "" != n && t.user.uploadavatarUrl(a, e, n, function(a, t) {
            "success" === a && (console.log("头像上传成功"), console.log(n));
        });
    },
    onShow: function() {
        var a = this, t = setInterval(function() {
            var e = a.data.num;
            e > 5 && clearInterval(t), 0 == e ? (clearInterval(t), wx.getStorageSync("city_id") || wx.redirectTo({
                url: "../city/city"
            })) : (e--, a.setData({
                num: e
            }));
        }, 1e3);
    },
    begin: function() {
        this.setData({
            num: 10
        }), wx.redirectTo({
            url: "../city/city"
        });
    }
});