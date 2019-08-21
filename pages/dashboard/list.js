require("../../utils/util.js");

var t = require("../../utils/api.js");

Page({
    data: {
        categoryList: [],
        teamList: [],
        id: 0,
        currentCategory: {},
        scrollLeft: 0,
        scrollTop: 0,
        scrollHeight: 0,
        page: 1,
        size: 100
    },
    onLoad: function(t) {
        var e = this;
        t.category_id && e.setData({
            id: parseInt(t.category_id)
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), this.getCategoryInfo();
    },
    onPullDownRefresh: function() {
        this.getCategoryInfo(), wx.stopPullDownRefresh();
    },
    getCategoryInfo: function() {
        var e = this;
        t.ticket.groupList(function(t, a) {
            if ("success" == t) {
                console.log(a);
                var i = a.data.data;
                e.setData({
                    categoryList: i
                });
                for (var o = 0, s = i.length, r = 0; r < s; r++) if (o += 1, i[r].id == e.data.id) {
                    e.setData({
                        currentCategory: i[r]
                    });
                    break;
                }
                o > s / 2 && s > 5 && e.setData({
                    scrollLeft: 60 * o
                }), wx.setNavigationBarTitle({
                    title: e.data.currentCategory.name
                }), e.loadTeamList(e.data.id);
            }
        });
    },
    loadTeamList: function(t) {
        var e = wx.getStorageSync("current-city"), a = this;
        wx.request({
            url: "https://www.huayupiaowu.com/qianggou/api.php?do=teams&cityid=" + e.id + "&group_id=" + t,
            success: function(t) {
                a.setData({
                    teamList: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log(1);
    },
    onHide: function() {},
    onUnload: function() {},
    switchCate: function(t) {
        if (this.data.id == t.currentTarget.dataset.id) return !1;
        var e = this, a = t.detail.x, i = t.currentTarget;
        a < 60 ? e.setData({
            scrollLeft: i.offsetLeft - 60
        }) : a > 330 && e.setData({
            scrollLeft: i.offsetLeft
        }), this.setData({
            id: t.currentTarget.dataset.id
        }), this.getCategoryInfo();
    }
});