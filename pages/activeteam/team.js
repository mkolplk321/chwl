var t = require("../../wxParse/wxParse.js"), a = getApp(), e = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        userId: a.globalData.userId,
        scene: null,
        teamid: 0,
        agentid: null,
        team_detail: {},
        notice: "",
        day_show: 0,
        hour_show: 0,
        minute_show: 0,
        second_show: 0,
        hidden: !1
    },
    loadTeamDetail: function(a) {
        var i = this;
        e.ticket.activeteamdetail(a, this.data.userId, this.data.agentid, function(a, e) {
            if ("success" === a) {
                console.log(e);
                var s = e.data;
                wx.setNavigationBarTitle({
                    title: s.title
                });
                var n, o = e.data.detail;
                if (o && "" != o ? (o = o.replace(new RegExp('"/static/kindeditor', "gm"), '"http://www.huayupiaowu.com/static/kindeditor'), 
                o = t.wxParse("detail", "html", o, i, 5), i.setData({})) : o = "", "" != s.notice && (n = t.wxParse("notice", "html", e.data.notice, i, 5)), 
                i.setData({
                    team_detail: s,
                    notice: n,
                    timediff: e.data.timediff,
                    is_show: s.is_show,
                    hidden: !0
                }), "end" == s.state || "awllout" == s.state) return;
                var d = i.data.timediff, u = setInterval(function() {
                    var t = 0, a = 0, e = 0, s = 0;
                    d > 0 ? (t = Math.floor(d / 86400), a = Math.floor(d / 3600) - 24 * t, e = Math.floor(d / 60) - 24 * t * 60 - 60 * a, 
                    s = Math.floor(d) - 24 * t * 60 * 60 - 60 * a * 60 - 60 * e) : clearInterval(u), 
                    e <= 9 && (e = "0" + e), s <= 9 && (s = "0" + s), i.setData({
                        day_show: t,
                        hour_show: a,
                        minute_show: e,
                        second_show: s
                    }), d--;
                }, 1e3);
            }
        });
    },
    gotoBuy: function(t) {
        var a = t.currentTarget.dataset.teamId, e = t.currentTarget.dataset.teamName, i = t.currentTarget.dataset.startTime, s = t.currentTarget.dataset.endTime, n = t.currentTarget.dataset.referPrice;
        wx.navigateTo({
            url: "/pages/activebuy/buy?team_id=" + a + "&team_name=" + e + "&agentid=" + this.data.agentid + "&start_time=" + i + "&end_time=" + s + "&referprice=" + n
        });
    },
    guanzhu: function(t) {
        var a = this;
        t.currentTarget.dataset.teamFocus;
        e.ticket.guanzhu(this.data.teamid, this.data.userId, this.data.agentid, function(t, e) {
            "success" === t && (wx.showToast({
                title: "设置成功"
            }), a.loadTeamDetail(a.data.teamid));
        });
    },
    onLoad: function(t) {
        console.log("###options###"), console.log(t);
        var i = t.scene;
        i && (i = decodeURIComponent(i), console.log("scene=" + i));
        var s = t.id, n = t.agentid;
        if (i && 0 == i.indexOf("a#") && 3 == i.split("#").length) {
            var o = i.split("#");
            s = o[1], n = o[2];
        }
        a.globalData.userId || wx.login({
            success: function(t) {
                if (t.code) {
                    var i = t.code;
                    wx.getUserInfo({
                        success: function(t) {
                            a.globalData.userInfo = t.userInfo;
                            encodeURIComponent(t.encryptedData), t.iv;
                        }
                    });
                    e.user.getUserId(i, null, null, function(t, e) {
                        "success" === t && (a.globalData.userId = userid);
                    });
                }
            }
        }), this.setData({
            scene: i,
            userId: a.globalData.userId,
            teamid: s,
            agentid: n
        });
    },
    onReady: function() {
        this.loadTeamDetail(this.data.teamid);
    },
    onLaunch: function(t, a, e, i) {},
    yulan: function() {
        wx.previewImage({
            current: "https://www.huayupiaowu.com/static/img/kefu2.jpg",
            urls: [ "https://www.huayupiaowu.com/static/img/kefu2.jpg" ]
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    shareCircle: function() {
        var t = this;
        if (a.globalData.debug) wx.navigateTo({
            url: "../../pages/share/circle?teamId=" + this.data.teamid + "&imgUrl=https://www.huayupiaowu.com/qianggou/xcxhaibao/75716146632.png"
        }); else {
            var i = {
                page: "pages/activeteam/team",
                scene: "a#" + this.data.teamid + "#" + this.data.userId
            };
            e.share.generateImg(i, function(a, e) {
                "success" === a ? wx.navigateTo({
                    url: "../../pages/share/circle?teamId=" + t.data.teamid + "&imgUrl=" + e.data
                }) : "fail" == a && wx.showToast({
                    title: "错误"
                });
            });
        }
    },
    onShareAppMessage: function(t) {
        var a = t.target.dataset, i = this;
        return t.from, "zfq" == a.type ? (wx.showShareMenu({
            withShareTicket: !0
        }), {
            title: i.data.team_detail.title,
            path: "/pages/team/team?id=" + i.data.teamid,
            success: function(t) {
                wx.getShareInfo({
                    shareTicket: t.shareTickets[0],
                    success: function(t) {
                        e.ticket.share(i.data.teamid, i.data.userId, function(t, a) {
                            if ("success" === t) {
                                var e = a.data;
                                if (1 == e.status) wx.showLoading({
                                    title: "成功立减" + e.id + "元"
                                }), wx.navigateTo({
                                    url: "../team/team?id=" + i.data.teamid
                                }); else {
                                    if (3 != e.status) return;
                                    wx.showLoading({
                                        title: "已立减" + e.id + "元"
                                    });
                                }
                                setTimeout(function() {
                                    wx.hideLoading();
                                }, 2e3);
                            } else "fail" === t && (wx.showLoading({
                                title: "分享失败"
                            }), setTimeout(function() {
                                wx.hideLoading();
                            }, 2e3));
                        });
                    },
                    fail: function(t) {
                        wx.showLoading({
                            title: "分享的不是群"
                        }), setTimeout(function() {
                            wx.hideLoading();
                        }, 2e3);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {}
        }) : {
            title: this.data.team_detail.title,
            path: "/pages/team/team?id=" + this.data.teamid,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    formSubmit: function(t) {
        var a = this, i = (t.detail.value.focus, t.detail.formId);
        e.ticket.guanzhu(this.data.teamid, this.data.userId, this.data.agentid, i, function(t, e) {
            "success" === t && (wx.showToast({
                title: "设置成功"
            }), a.loadTeamDetail(a.data.teamid));
        });
    }
});