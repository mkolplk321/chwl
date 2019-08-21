var a = getApp(), t = require("../../utils/api.js");

require("../../utils/util.js"), wx.getLogManager();

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
        hidden: !1,
        wenan: {},
        haibao: {
            visible: !1,
            image: ""
        },
        shareActionVisible: !1,
        shareActions: [ {
            name: "分享给微信群立减",
            openType: "share"
        }, {
            name: "推广海报到微信赚钱"
          }
        
         ]
    },
    loadTeamDetail: function(a) {
        var e = this;
        t.ticket.teamdetail(a, this.data.userId, this.data.agentid, function(a, t) {
            if ("success" === a) {
                var i = t.data;
                wx.setNavigationBarTitle({
                    title: i.title
                });
                var n = t.data.detail;
                if (n = n && "" != n ? (n = n.replace(new RegExp('"/static/kindeditor', "gm"), '"http://www.huayupiaowu.com/static/kindeditor')).replace(/\<img/gi, '<img class="rich-img"') : "", 
                i.detail = n, e.setData({
                    team_detail: i,
                    timediff: t.data.timediff,
                    is_show: i.is_show,
                    hidden: !0
                }), "end" == i.state || "awllout" == i.state) return;
                var s = e.data.timediff, o = setInterval(function() {
                    var a = 0, t = 0, i = 0, n = 0;
                    s > 0 ? (a = Math.floor(s / 86400), t = Math.floor(s / 3600) - 24 * a, i = Math.floor(s / 60) - 24 * a * 60 - 60 * t, 
                    n = Math.floor(s) - 24 * a * 60 * 60 - 60 * t * 60 - 60 * i) : clearInterval(o), 
                    i <= 9 && (i = "0" + i), n <= 9 && (n = "0" + n), e.setData({
                        day_show: a,
                        hour_show: t,
                        minute_show: i,
                        second_show: n
                    }), s--;
                }, 1e3);
            }
        });
    },
    gotoBuy: function(a) {
        var t = a.currentTarget.dataset.teamId, e = a.currentTarget.dataset.teamName, i = a.currentTarget.dataset.startTime, n = a.currentTarget.dataset.endTime, s = a.currentTarget.dataset.referPrice, o = a.currentTarget.dataset.permaxNumber;
        wx.navigateTo({
            url: "/pages/buy/buy?team_id=" + t + "&team_name=" + e + "&agentid=" + this.data.agentid + "&start_time=" + i + "&end_time=" + n + "&referprice=" + s + "&permax_number=" + o
        });
    },
    guanzhu: function(a) {
        var e = this;
        a.currentTarget.dataset.teamFocus;
        t.ticket.guanzhu(this.data.teamid, this.data.userId, this.data.agentid, function(a, t) {
            "success" === a && (wx.showToast({
                title: "设置成功"
            }), e.loadTeamDetail(e.data.teamid));
        });
    },
    onLoad: function(a) {
        console.log("###options###"), console.log(a);
        var t = a.scene;
        t && (t = decodeURIComponent(t), console.log("scene=" + t));
        var e = a.id, i = a.agentid;
        if (t && 0 == t.indexOf("a#") && 3 == t.split("#").length) {
            var n = t.split("#");
            e = n[1], i = n[2];
        }
        t && this.setData({
            scene: t
        }), i && this.setData({
            agentid: i
        }), this.setData({
            teamid: e
        });
    },
    onReady: function() {
        var t = this;
        a.globalData.userId ? (t.setData({
            userId: a.globalData.userId
        }), t.loadTeamDetail(t.data.teamid), t.loadShareWenan()) : a.doLogin().then(function(e) {
            t.setData({
                userId: a.globalData.userId
                // useId : "yudm"
            }), t.loadTeamDetail(t.data.teamid), t.loadShareWenan();
        });
    },
    onLaunch: function(a, t, e, i) {
        wx.showShareMenu({
            withShareTicket: !0
        });
    },
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
    onShareAppMessage: function(e) {
        var i = e.target.dataset, n = this;
        if (console.log(this.data.wenan.zhuan_image), e.from, "zfq" == i.type) {
            s = "“" + a.globalData.userInfo.nickName + "”邀请您一起" + this.data.team_detail.originmoney + "元抢购" + this.data.team_detail.title;
            return n.data.wenan.zhuan_tishi && (s = n.data.wenan.zhuan_tishi), setTimeout(function() {
                t.ticket.share(n.data.teamid, n.data.userId, function(a, t) {
                    if ("success" === a) {
                        var e = t.data;
                        if (1 == e.status) wx.showModal({
                            title: "成功立减",
                            content: "恭喜您成功立减" + e.money + "元",
                            showCancel: !1,
                            success: function(a) {
                                a.confirm && n.loadTeamDetail(n.data.teamid);
                            }
                        }); else {
                            if (3 != e.status) return;
                            wx.showModal({
                                title: "成功立减",
                                content: "您已享受立减" + e.money + "元",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm && n.loadTeamDetail(n.data.teamid);
                                }
                            });
                        }
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 2e3);
                    } else "fail" === a && (wx.showLoading({
                        title: "分享失败"
                    }), setTimeout(function() {
                        wx.hideLoading();
                    }, 2e3));
                });
            }, 3e3), {
                title: s,
                imageUrl: n.data.wenan.zhuan_image,
                path: "/pages/team/team?id=" + n.data.teamid + "&agentid=" + n.data.userId
            };
        }
        var s = "“" + a.globalData.userInfo.nickName + "”邀请您一起" + this.data.team_detail.originmoney + "元抢购" + this.data.team_detail.title;
        return n.data.wenan.zhuan_tishi && (s = n.data.wenan.zhuan_tishi), {
            title: s,
            imageUrl: n.data.wenan.zhuan_image,
            path: "/pages/team/team?id=" + this.data.teamid + "&agentid=" + this.data.userId
        };
    },
    formSubmit: function(a) {
        var e = this, i = (a.detail.value.focus, a.detail.formId);
        t.ticket.guanzhu(this.data.teamid, this.data.userId, this.data.agentid, i, function(a, t) {
            "success" === a && (wx.showToast({
                title: "设置成功"
            }), e.loadTeamDetail(e.data.teamid));
        });
    },
    loadShareWenan: function() {
        var a = this;
        t.ticket.marketWenan(this.data.teamid, this.data.userId, function(t, e) {
            "success" == t && a.setData({
                wenan: e.data
            });
        });
    },
    showShareSheet: function() {
        this.setData({
            shareActionVisible: !0
        });
    },
    cancelShareAction: function() {
        this.setData({
            shareActionVisible: !1
        });
    },
    hideHaibaoModal: function() {
        this.setData({
            haibao: {
                visible: !1
            }
        });
    },
    handleShareAction: function(a) {
        var e = this;
        console.log(a.detail.index), this.setData({
            shareActionVisible: !0
        }), 1 == a.detail.index && (wx.showLoading({
            title: "下载海报中"
        }), t.ticket.haibao(this.data.teamid, this.data.userId, function(a, t) {
            wx.hideLoading(), "success" == a && (console.log(t.data), wx.showLoading({
                title: "下载海报中"
            }), wx.downloadFile({
                url: t.data.address,
                success: function(a) {
                    200 === a.statusCode && wx.saveImageToPhotosAlbum({
                        filePath: a.tempFilePath,
                        success: function(t) {
                            e.setData({
                                haibao: {
                                    visible: !0,
                                    image: a.tempFilePath
                                }
                            });
                        }
                    });
                },
                fail: function(a) {},
                complete: function(a) {
                    wx.hideLoading();
                }
            }));
        }));
    }
});