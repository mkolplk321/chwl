function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = getApp(), n = require("../../utils/api.js");

require("../../utils/util.js");

Page((t = {
    data: {
        windowWidth: a.systemInfo.windowWidth,
        windowHeight: a.systemInfo.windowHeight,
        teams: [],
        loading: !1,
        hidden: !1
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            teams: []
        }), this.loadMore();
    },
    loadMore: function(e, t) {
        var o = this, i = o.data.loading, s = {
            page: o.data.page,
            userid: a.globalData.userId
        };
        i || (o.setData({
            loading: !0
        }), n.ticket.myfxcoupon(s, function(e, a) {
            if ("success" === e) {
                var n = a.data;
                t ? wx.stopPullDownRefresh() : (console.log(n), n = o.data.teams.concat(n));
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
    onLoad: function(e) {},
    onReady: function() {
        this.setData({
            page: 1,
            teams: []
        }), this.loadMore();
    },
  getYongjinHb: function (a) {
    console.log("aaaaaaaa",a);
    var t = a.currentTarget.dataset.hbUrl, e = a.currentTarget.dataset.hbStatus;
    if (e==="going"){  
      console.log("hburl",t);
      // wx.request({
      //   url: t,
      //   success: function (o) {
      //     console.log(o);
      //     wx.request({
      //       url: 'https://www.dydtech.cn/getHongBao?hburl=' + t,
      //     })
      //   }
      // })
      wx.navigateTo({
        url: '../user/yaoyaola?hburl=' +encodeURIComponent(t), //
        success: function () {
          console.log("红包已经领取")
          wx.request({
            url: 'https://www.dydtech.cn/getHongBao?hburl=' + t,
          })
        },       //成功后的回调；
        fail: function () { },         //失败后的回调；
        complete: function () { }      //结束后的回调(成功，失败都会执行)
      })
    } else{

      wx.showModal({
        title: "红包已经领取",
        content: "红包已经领取",
        showCancel: true,
        confirmText: "确定",
        confirmColor: "#0f0"

    })
  }
  },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
}, e(t, "onPullDownRefresh", function() {}), e(t, "onReachBottom", function() {}), 
e(t, "onShareAppMessage", function() {}), t));