var t = getApp(), a = require("../../utils/api.js");

require("../../utils/util.js").formatTime;

Page({
    data: {
        userId: t.globalData.userId,
        city: t.globalData.city,
        teams: [],
        page: 1,
        loading: !1,
        windowWidth: t.systemInfo.windowWidth,
        windowHeight: t.systemInfo.windowHeight,
        inputShowed: !1,
        inputVal: "",
        scroll_Top: -80,
        hidden: !1
    },
    showInput: function() {
        this.setData({
            inputShowed: !0
        });
    },
    hideInput: function() {
        this.setData({
            page: 1,
            inputShowed: !1,
            teams: []
        }), console.log(this.data.inputVal), this.loadMore();
    },
    clearInput: function() {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function(t) {
        this.setData({
            inputVal: t.detail.value
        });
    },
    goTop: function(t) {
        this.setData({
            scroll_Top: -80
        });
    },
    scroll: function(t) {
        console.log(this.data.windowHeight), 600 < t.detail.scrollTop ? this.setData({
            goTopId: "bottom: 15%; opacity: 1;"
        }) : this.setData({
            goTopId: "bottom: -15%; opacity: 0;"
        });
    },
    onLoad: function() {
        wx.getLocation({});
    },
    onShow: function() {
        var a = this;
        if (a.setData({
            page: 1,
            teams: [],
            city: t.globalData.city,
            inputVal: ""
        }), "全国" == a.data.city.name) {
            var i = Date.parse(new Date()), o = wx.getStorageSync("allcity_time");
            i - (o = o || 0) > 3e5 ? (wx.setStorage({
                key: "allcity_time",
                data: i
            }), wx.showModal({
                title: "提示",
                content: "是否切换为您当前所在城市",
                success: function(t) {
                    t.confirm ? wx.getSetting({
                        success: function(t) {
                            t.authSetting["scope.userLocation"] ? a.getlocationinfo() : wx.showModal({
                                title: "提示",
                                content: "允许授权地理位置以后才能定位当前城市",
                                success: function(t) {
                                    t.confirm ? wx.openSetting({
                                        success: function(t) {
                                            t.authSetting["scope.userLocation"] ? a.getlocationinfo() : (wx.showModal({
                                                title: "提示",
                                                content: "获取地理位置失败"
                                            }), a.loadMore());
                                        },
                                        fail: function(t) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "获取地理位置失败"
                                            }), a.loadMore();
                                        }
                                    }) : t.cancel && a.loadMore();
                                }
                            });
                        }
                    }) : t.cancel && a.loadMore();
                }
            })) : a.loadMore();
        } else a.loadMore();
    },
    getlocationinfo: function(i) {
        var o = this, e = t.globalData.userId;
        "" != e && wx.getLocation({
            type: "wgs84",
            success: function(i) {
                var n = i.latitude, s = i.longitude;
                a.user.getCityInfo(1, n, s, e, function(a, i) {
                    "success" === a ? (o.setData({
                        page: 1,
                        teams: [],
                        city: {
                            id: i.data.city_id,
                            name: i.data.city_name
                        }
                    }), t.globalData.city.id = i.data.city_id, t.globalData.city.name = i.data.city_name, 
                    o.loadMore()) : "fail" == a && (o.setData({
                        page: 1,
                        teams: [],
                        city: t.globalData.city
                    }), o.loadMore());
                });
            }
        });
    },
    loadMore: function(t, i) {
        var o = this, e = o.data.loading, n = {
            page: o.data.page,
            cityid: o.data.city.id,
            inputVal: o.data.inputVal
        };
        o.data.inputVal;
        e || (o.setData({
            loading: !0
        }), a.ticket.teamlist(n, function(t, a) {
            if ("success" === t) {
                var e = a.data;
                i ? wx.stopPullDownRefresh() : e = o.data.teams.concat(e);
                var n = o.data.page + 1;
                o.setData({
                    teams: e,
                    page: n,
                    loading: !1,
                    hidden: !0
                });
            }
        }));
    },
    viewTeam: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../team/team?id=" + a.id
        });
    },
    gotoCityList: function(t) {
        wx.navigateTo({
            url: "../city/city"
        });
    },
    gotoUser: function(t) {
        wx.switchTab({
            url: "../user/user"
        });
    }
});