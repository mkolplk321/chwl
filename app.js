var a = require("utils/api.js");

require("WxNotificationCenter/WxNotificationCenter.js");

App({
  globalData: {
    debug: !1,
    userInfo: null,
    userId: null,
    mobile: null,
    userSns: null,
    fa_userid: null,
    fa_orderid: null,
    isAuthorize: false,
    tuiguang_flag:true,
    city: {
      id: "0",
      name: "全国"
    },
    pintuancity: {
      id: "0",
      name: "全国"
    },
    activecity: {
      id: "0",
      name: "全国"
    },
    cityData: null
  },
  systemInfo: null,
  onLaunch: function(a) {
    var t = this;
    if (console.log("@!@!", a), 1007 == a.scene || 1008 == a.scene || 1044 == a.scene) {
      var o = a.query.fa_userid,
        e = a.query.fa_orderid;
      "" != o ? (t.globalData.fa_userid = o, t.globalData.fa_orderid = e) : t.globalData.fa_userid = null;
    };
    wx.getSystemInfo({
      success: function(a) {
        t.systemInfo = a;
      }
    });
  },
  onShow: function() {
    wx.checkSession({
      success: function(a) {
        console.log("%%%%%%%%%%%%%%%%%%%%%",a)
      },
      fail: function(a) {
        wx.login();
      }
    }), this.doLogin();
  },
  doLogin: function() {
    console.log("login function invoked");
    var t = this;
    return new Promise(function(o, e) {

      // t.globalData.userId ? o() : 
      wx.login({
        success: function(e) {
          if (e.code) {
            var l = e.code;
            wx.getSetting({
              success: function(a) {
                console.log("authsettings:", a);
                if (!a.authSetting['scope.userInfo']) {
                  wx.setStorageSync("isAuthorize", false);
                  t.globalData.isAuthorize = false;
                } else {
                  wx.setStorageSync("isAuthorize", true);
                  t.globalData.isAuthorize = true;
                }
                console.log(t.globalData.isAuthorize)
              }
            })
            wx.getUserInfo({
              success: function(useinfoRes) {
                console.log(useinfoRes), t.globalData.userInfo = useinfoRes.userInfo;
                console.log("@@@@@@@", encodeURIComponent(useinfoRes.encryptedData)), useinfoRes.iv;
                var n = t.globalData.fa_userid,
                  s = t.globalData.fa_orderid;
                var avtarUrl = t.globalData.userInfo ? t.globalData.userInfo.avatarUrl : "";
                var nickName = t.globalData.userInfo ? t.globalData.userInfo.nickName : "老朋友";
                var encryptedData = useinfoRes ? encodeURIComponent(useinfoRes.encryptedData) : "";
                var iv = useinfoRes ? useinfoRes.iv : "";
                a.user.getUserId(l, n, s, avtarUrl, nickName, encryptedData, iv, function (res, e) {
                  if ("success" == res) {
                    var l = e.data.user_id,
                      n = e.data.mobile,
                      s = e.data.sns,
                      flag = e.data.tuiguang_flag == null ? false : e.data.tuiguang_flag ;


                    t.globalData.userId = l, t.globalData.mobile = n, t.globalData.userSns = s,
                    t.globalData.tuiguang_flag = flag,
                      console.log("&&&&&&&&&&", l, n, s, avtarUrl, nickName, flag)
                    // t.uploadavatar(t.globalData.userInfo.avatarUrl, t.globalData.userInfo.nickName, l),
                    // t.uploadavatar("aa", "aa", "aa")
                    t.globalData.userId = l;

                  } else "complete" == res && console.log(e);
                  o();
                });
              },
              fail: function(e) {
                console.log("##############################", e);
                a.user.getUserId(l, "", "", "", "", "", "", function (res, e) {
                  if ("success" == res) {
                    var l = e.data.user_id,
                      n = e.data.mobile,
                      s = e.data.sns;

                    t.globalData.userId = l, t.globalData.mobile = n, t.globalData.userSns = s,
                      console.log("&&&&&&&&&&", l)
                    // t.uploadavatar(t.globalData.userInfo.avatarUrl, t.globalData.userInfo.nickName, l),
                    // t.uploadavatar("aa", "aa", "aa")
                    t.globalData.userId = l;

                  } else "complete" == res && console.log(e);
                  o();
                });
                o();
              }
            });
            
          } else console.log("获取用户登录态失败！" + e.errMsg);
        }
      });
    });
  },
  uploadavatar: function(t, o, e) {
    "" != t && "" != e && a.user.uploadavatarUrl(t, o, e, function(a, t) {
      "success" === a && (console.log("头像上传成功"), console.log(e));
    });
  },
  addListener: function(a) {
    this.callback = a;
  },
  setCity: function(a) {
    this.globalData.city = a, null != this.callback && this.callback(a);
  },
  loadCityData: function() {
    var a = this;
    return new Promise(function(t, o) {
      a.globalData.cityData ? t(a.globalData.cityData) : wx.request({
        // url: "https://www.huayupiaowu.com/qianggou/api.php?do=citys",
        // url: "https://122.152.209.5:8080/districts",
        url: "https://localhost:8080/districts",
        success: function(o) {
          a.globalData.cityData = o.data, wx.setStorage({
            key: "city-list-data",
            data: o.data
          }), t(a.globalData.cityData);
        }
      });
    });
  }
});