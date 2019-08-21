var t = require("../../wxParse/wxParse.js"), e = getApp(), a = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        windowWidth: e.systemInfo.windowWidth,
        windowHeight: e.systemInfo.windowHeight,
        userId: e.globalData.userId,
        scene: null,
        teamid: 0,
        agentid: null,
        team_detail: {},
        tuan_detail: {},
        notice: "",
        day_show: 0,
        hour_show: 0,
        minute_show: 0,
        second_show: 0,
        modalflag: !0,
        hidden: !1
    },
    loadTeamDetail: function(e) {
        var i = this;
        a.pintuan.teamdetail(e, this.data.userId, this.data.agentid, function(e, a) {
            if ("success" === e) {
                var n = a.data.team, s = a.data.tuan_list;
                wx.setNavigationBarTitle({
                    title: n.title
                });
                var o = a.data.team.detail, u = a.data.team.notice;
                o && "" != o ? (o = o.replace(new RegExp('"/static/kindeditor', "gm"), '"http://www.huayupiaowu.com/static/kindeditor'), 
                o = t.wxParse("detail", "html", o, i, 5), i.setData({})) : o = "", u = u && "" != u ? t.wxParse("notice", "html", u, i, 5) : "", 
                i.setData({
                    team_detail: n,
                    is_show: n.is_show,
                    hidden: !0
                }), i.setData({
                    tuan_detail: s
                });
            }
        });
    },
    gotowode: function() {
        wx.switchTab({
            url: "../user/user"
        });
    },
    shareCircle: function() {
        var t = this, e = {
            page: "pages/pintuanteam/team",
            scene: "a#" + this.data.teamid + "#" + this.data.userId
        };
        a.share.generateImg(e, function(e, a) {
            console.log(a), "success" === e ? wx.navigateTo({
                url: "../../pages/share/circle?teamId=" + t.data.teamid + "&imgUrl=" + a.data
            }) : "fail" == e && wx.showToast({
                title: "错误"
            });
        });
    },
    moretuanlist: function() {
        this.setData({
            modalflag: !1
        });
    },
    modalOk: function() {
        this.setData({
            modalflag: !0
        });
    },
    buytuan: function(t) {
        var e = t.currentTarget.dataset.type, a = t.currentTarget.dataset.teamId, i = t.currentTarget.dataset.teamName, n = t.currentTarget.dataset.startTime, s = t.currentTarget.dataset.endTime, o = t.currentTarget.dataset.referPrice, u = t.currentTarget.dataset.sellPrice;
        wx.navigateTo({
            url: "/pages/pintuanbuy/buy?team_id=" + a + "&team_name=" + i + "&start_time=" + n + "&end_time=" + s + "&referprice=" + o + "&types=" + e + "&sellprice=" + u + "&tuan_id=0&agentid=" + this.data.agentid
        });
    },
    yulan: function() {
        wx.previewImage({
            current: "https://www.huayupiaowu.com/static/img/kefu2.jpg",
            urls: [ "https://www.huayupiaowu.com/static/img/kefu2.jpg" ]
        });
    },
    onLoad: function(t) {
        var i = this;
        console.log("###options###"), console.log(t);
        var n = t.scene;
        n && (n = decodeURIComponent(n), console.log("scene=" + n));
        var s = t.id, o = t.agentid;
        if (n && 0 == n.indexOf("a#") && 3 == n.split("#").length) var u = n.split("#"), s = u[1], o = u[2]; else var s = t.id, o = "";
        e.globalData.userId || wx.login({
            success: function(t) {
                if (t.code) {
                    var i = t.code;
                    wx.getUserInfo({
                        success: function(t) {
                            e.globalData.userInfo = t.userInfo;
                            encodeURIComponent(t.encryptedData), t.iv;
                        }
                    });
                    a.user.getUserId(i, null, null, function(t, a) {
                        "success" === t && (e.globalData.userId = userid);
                    });
                }
            }
        }), i.setData({
            userId: e.globalData.userId,
            teamid: s,
            scene: n,
            agentid: o
        }), wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth
                });
            }
        });
    },
    onReady: function() {
        this.loadTeamDetail(this.data.teamid);
    },
    onLaunch: function(t, e, a, i) {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    gotobuy: function(t) {
        var e = t.currentTarget.dataset;
        wx.navigateTo({
            url: "/pages/pintuan/tuandetail?tuan_id=" + e.id
        });
    },
    onShareAppMessage: function(t) {
        var e = this;
        return t.from, wx.showShareMenu({
            withShareTicket: !0
        }), {
            title: e.data.team.team_detail.title,
            path: "/pages/pintuanteam/team?id=" + e.data.team.teamid,
            success: function(t) {
                wx.getShareInfo({
                    shareTicket: t.shareTickets[0],
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {}
        };
    }
});