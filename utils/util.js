function e(e) {
    var t = e.toString();
    return t[1] ? t : "0" + t;
}

require("./api.js"), getApp();

module.exports = {
    formatNumber: e,
    formatTime: function(t, o) {
        var r = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate(), i = t.getHours(), s = t.getMinutes(), u = t.getSeconds(), c = "";
        switch (o) {
          case 1:
            c = "" + [ r, n, a ].map(e).join(".");
            break;

          case 2:
            c = [ r, n, a ].map(e).join(".") + " " + [ i, s ].map(e).join(":");
            break;

          default:
            c = [ r, n, a ].map(e).join(".") + " " + [ i, s, u ].map(e).join(":");
        }
        return c;
    },
    request: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "GET";
        return new Promise(function(r, n) {
            wx.request({
                url: e,
                data: t,
                method: o,
                header: {
                    "Content-Type": "application/json",
                    "X-Litemall-Token": wx.getStorageSync("token")
                },
                success: function(e) {
                    if (200 == e.statusCode) if (501 == e.data.errno) {
                        try {
                            wx.removeStorageSync("userInfo"), wx.removeStorageSync("token");
                        } catch (e) {}
                        wx.navigateTo({
                            url: "/pages/auth/login/login"
                        });
                    } else r(e.data); else n(e.errMsg);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    },
    redirect: function(e) {
        wx.redirectTo({
            url: e
        });
    },
    showErrorToast: function(e) {
        wx.showToast({
            title: e,
            image: "/static/images/icon_error.png"
        });
    }
};