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
            var i = Date.parse(new Date()), e = wx.getStorageSync("activecity_time");
            i - (e = e || 0) > 3e5 ? (wx.setStorage({
                key: "activecity_time",
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
        var e = this, o = t.globalData.userId;
        "" != o && wx.getLocation({
            type: "wgs84",
            success: function(i) {
                var n = i.latitude, c = i.longitude;
                a.user.getCityInfo(3, n, c, o, function(a, i) {
                    "success" === a ? (2 == i.data.code && (wx.showToast({
                        title: "该地区没有暂没产品上线，已切换为全部",
                        icon: "none"
                    }), setTimeout(function() {
                        wx.hideLoading();
                    }, 2e3)), 3 == i.data.code && (wx.showToast({
                        title: "该地区没有暂没产品上线，已切换为全部,敬请期待",
                        icon: "none"
                    }), setTimeout(function() {
                        wx.hideLoading();
                    }, 2e3)), e.setData({
                        page: 1,
                        teams: [],
                        city: {
                            id: i.data.city_id,
                            name: i.data.city_name
                        }
                    }), t.globalData.city.id = i.data.city_id, t.globalData.city.name = i.data.city_name, 
                    e.loadMore()) : "fail" == a && (e.setData({
                        page: 1,
                        teams: [],
                        city: t.globalData.city
                    }), e.loadMore());
                });
            }
        });
    },
    loadMore: function(t, i) {
        var e = this, o = e.data.loading, n = {
            page: e.data.page,
            cityid: e.data.city.id,
            inputVal: e.data.inputVal
        };
        e.data.inputVal;
        o || (e.setData({
            loading: !0
        }), a.ticket.activelist(n, function(t, a) {
            if ("success" === t) {
                var o = a.data;
                i ? wx.stopPullDownRefresh() : o = e.data.teams.concat(o);
                var n = e.data.page + 1;
                e.setData({
                    teams: o,
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
            url: "../activeteam/team?id=" + a.id
        });
    },
    gotoCityList: function(t) {
        wx.navigateTo({
            url: "../city/activecity"
        });
    }
});