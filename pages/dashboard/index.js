var t = require("../../WxNotificationCenter/WxNotificationCenter.js"), app = getApp();

Page({
    data: {
        page: 1,
        size: 20,
        hasMore: !0,
        hotList: [],
        teamList: [],
        city: app.globalData.curCity,
     
    },
    onLoad: function(a) {
      console.log("123", wx.getStorageSync("isAuthorize"))
      this.data.isAuthorize = wx.getStorageSync("isAuthorize")
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), t.addNotification("curCityChanged", e.curCityChanged, e), e.curCityChanged();
    },
    onReady: function() {
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            hasMore: !0
        }), this.loadTeamList();
    },
    onReachBottom: function() {
        this.data.hasMore && (this.setData({
            page: this.data.page + 1
        }), this.loadTeamList());
    },
    onShareAppMessage: function() {},
  /**
* 授权回调
*/
  onLoadFun: function () {
    this.loadTeamList();
  },
  close: function () {
    if (this.data.isAuto) return;
    this.setData({ iShidden: true });
  },
    loadTeamList: function() {
        var t = this, a = t.data.page, e = t.data.size, i = this.data.city.id;
        wx.request({
          // url: "https://122.152.209.5:8080/qianggou/teams?cityid=" + i + "&page=" + a + "&size=" + e,
          url: "https://localhost:8080/qianggou/teams?cityid=" + i + "&page=" + a + "&size=" + e,
            success: function(e) {
                if (wx.stopPullDownRefresh(), 1 == a) {
                    t.data.hotList.length = 0, t.data.teamList.length = 0;
                    for (i = 0; i < e.data.length; i++) i < 5 ? t.data.hotList.push(e.data[i]) : t.data.teamList.push(e.data[i]);
                    t.setData({
                        hotList: t.data.hotList,
                        teamList: t.data.teamList
                    });
                } else {
                    for (var i = 0; i < e.data.length; i++) t.data.teamList.push(e.data[i]);
                    t.setData({
                        teamList: t.data.teamList
                    });
                }
                e.data.length < t.data.size ? t.setData({
                    hasMore: !1
                }) : t.setData({
                    hasMore: !0
                });
            },
        });
    },
    selectCity: function() {
        wx.redirectTo({
            url: "/pages/city/list"
        });
    },
    saveFormId: function(t) {
        "the formId is a mock one" != t.detail.formId && util.request(api.UserFormIdCreate, {
            formId: t.detail.formId
        });
    },
    curCityChanged: function() {
        var t = wx.getStorageSync("current-city");
        t ? (this.setData({
            page: 1,
            hasMore: !0,
            city: t
        }), this.loadTeamList()) : wx.redirectTo({
            url: "/pages/city/list"
        });
    }
});