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
        scroll_Top: 320,
        nav_left: 0,
        nav: [],
        current: 0,
        hidden: !1
    },
    choicenav: function(t) {
        var a = this, e = t.currentTarget.dataset.id, i = a.data.windowWidth / 5, o = a.data.current * i;
        a.setData({
            current: e,
            page: 1,
            inputVal: "",
            inputShowed: !1,
            teams: []
        }), a.setData({
            scroll_pos: o
        }), a.loadMore();
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
            scroll_Top: 166
        });
    },
    scroll: function(t) {
        600 < t.detail.scrollTop ? this.setData({
            goTopId: "bottom: 15%; opacity: 1;"
        }) : this.setData({
            goTopId: "bottom: -15%; opacity: 0;"
        });
    },
    onLoad: function() {
        var t = this;
        wx.getLocation({}), a.pintuan.getcollage_type(function(a, e) {
            "success" === a && t.setData({
                nav: e.data
            });
        });
    },
    onShow: function() {
        var a = this, e = wx.getStorageSync("city_id"), i = wx.getStorageSync("city_name");
        if ("" != e ? (t.globalData.city.id = e, t.globalData.city.name = i, a.setData({
            page: 1,
            teams: [],
            city: t.globalData.city,
            inputVal: ""
        })) : a.setData({
            page: 1,
            teams: [],
            city: t.globalData.city,
            inputVal: ""
        }), "全国" == a.data.city.name) {
            var o = Date.parse(new Date()), n = wx.getStorageSync("pintuanallcity_time");
            o - (n = n || 0) > 3e5 ? (wx.setStorage({
                key: "pintuanallcity_time",
                data: o
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
    getlocationinfo: function(e) {
        var i = this, o = t.globalData.userId;
        "" != o && wx.getLocation({
            type: "wgs84",
            success: function(e) {
                var n = e.latitude, c = e.longitude;
                a.user.getCityInfo(2, n, c, o, function(a, e) {
                    console.log(e), "success" === a ? (2 == e.data.code && (wx.showToast({
                        title: "该地区没有暂没产品上线，已切换为全部",
                        icon: "none"
                    }), setTimeout(function() {
                        wx.hideLoading();
                    }, 2e3)), 3 == e.data.code && (wx.showToast({
                        title: "该地区没有暂没产品上线，已切换为全部,敬请期待",
                        icon: "none"
                    }), setTimeout(function() {
                        wx.hideLoading();
                    }, 2e3)), i.setData({
                        page: 1,
                        teams: [],
                        city: {
                            id: e.data.city_id,
                            name: e.data.city_name
                        }
                    }), t.globalData.city.id = e.data.city_id, t.globalData.city.name = e.data.city_name, 
                    wx.setStorage({
                        key: "city_id",
                        data: e.data.city_id
                    }), wx.setStorage({
                        key: "city_name",
                        data: e.data.city_name
                    }), i.loadMore()) : "fail" == a && (i.setData({
                        page: 1,
                        teams: [],
                        city: t.globalData.city
                    }), i.loadMore());
                });
            }
        });
    },
    loadMore: function(t, e) {
        var i = this, o = i.data.loading, n = {
            page: i.data.page,
            cityid: i.data.city.id,
            inputVal: i.data.inputVal,
            current: i.data.current
        };
        i.data.inputVal;
        o || (i.setData({
            loading: !0
        }), a.pintuan.teamlist(n, function(t, a) {
            if ("success" === t) {
                var o = a.data;
                e ? wx.stopPullDownRefresh() : o = i.data.teams.concat(o);
                var n = i.data.page + 1;
                i.setData({
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
            url: "../pintuanteam/team?id=" + a.id
        });
    },
    gotoCityList: function(t) {
        wx.reLaunch({
            url: "../city/pintuancity"
        });
    },
    gotoUser: function(t) {
        wx.switchTab({
            url: "../user/user"
        });
    },
    bindscroll: function(t) {}
});