var t = getApp(), e = require("../../utils/api.js"), o = (require("../../utils/util.js"), 
require("../../utils/qrcode.js"));

require("../../WxNotificationCenter/WxNotificationCenter.js");

Page({
    data: {
        orderId: 0,
        order: {},
        color: "red",
        userId: t.globalData.userId,
        team_id: null,
        modalFlag: !0,
        windowHeight: t.systemInfo.windowHeight,
        hidden: !0
    },
    settixing: function() {
        wx.pageScrollTo({
            scrollTop: this.data.windowHeight
        }), this.setData({
            modalFlag: !1
        });
    },
    modalOk: function() {
        this.setData({
            modalFlag: !0
        });
    },
    onLoad: function(t) {
        var e = this;
        t.orderId || wx.showModal({
            title: "错误",
            content: "参数有误"
        });
        var o = 1;
        setInterval(function() {
            1 == o ? (o = 0, e.setData({
                color: "yellow"
            })) : (o = 1, e.setData({
                color: "red"
            }));
        }, 1e3);
        wx.onUserCaptureScreen(function(t) {
            wx.showModal({
                title: "截屏成功！",
                content: "截屏成功，可在相册中查看订单信息"
            });
        }), this.setData({
            orderId: t.orderId
        }), this.loadOrderDetail();
    },
    saoma: function() {
        wx.scanCode({
            success: function(t) {
                console.log(t);
            }
        });
    },
    saveImgcheck: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.writePhotosAlbum"] ? t.saveImgs() : wx.showModal({
                    title: "提示",
                    content: "允许授权相册才能保存",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {
                                e.authSetting["scope.writePhotosAlbum"] ? t.saveImgs() : wx.showModal({
                                    title: "提示",
                                    content: "授权失败"
                                });
                            },
                            fail: function(t) {
                                wx.showModal({
                                    title: "提示",
                                    content: "授权失败"
                                });
                            }
                        }) : e.cancel && wx.showModal({
                            title: "提示",
                            content: "授权失败"
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "提示",
                            content: "授权失败"
                        });
                    }
                });
            }
        });
    },
    saveImgs: function() {
        wx.saveImageToPhotosAlbum({
            filePath: "/images/ambm.jpg",
            success: function(t) {
                wx.showModal({
                    title: "保存成功",
                    content: "您可以从相册中选取二维码扫描",
                    showCancel: !1
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "已取消",
                    content: JSON.stringify(t)
                });
            }
        });
    },
    gethongbao: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            confirmText: "下载",
            content: "下载海报要强好友购买 好友成功购买后即可获得5元现金红包 \n（ 实例：好友成功购买5张，您将获得25元现金红包）",
            success: function(o) {
                if (o.confirm) {
                    var a = {
                        page: "pages/team/team",
                        scene: "a#" + t.data.team_id + "#" + t.data.userId
                    };
                    e.share.generateImg(a, function(e, o) {
                        "success" === e ? wx.navigateTo({
                            url: "../../pages/share/circle?teamId=" + t.data.team_id + "&imgUrl=" + o.data
                        }) : "fail" == e && wx.showToast({
                            title: "错误"
                        });
                    });
                } else o.cancel;
            }
        });
    },
    loadOrderDetail: function() {
        var t = this, o = this;
        e.order.orderDetail(this.data.orderId, function(e, a) {
            "success" === e && (console.log(a.data), o.setData({
                order: a.data,
                team_id: a.data.team_id
            }), t.createQrCode(a.data.code, "mycanvas", 170, 170));
        });
    },
    createQrCode: function(t, e, a, n) {
        o.qrApi.draw(t, e, a, n);
    },
    canvasToTempImage: function() {
        var t = this;
        wx.canvasToTempFilePath({
            canvasId: "mycanvas",
            success: function(e) {
                var o = e.tempFilePath;
                console.log(1), console.log(o), console.log(2), t.setData({
                    imagePath: o
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    saveImg: function() {
        wx.canvasToTempFilePath({
            canvasId: "mycanvas",
            success: function(t) {
                console.log(t.tempFilePath), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showModal({
                            title: "保存成功",
                            content: "您可以从相册中查看二维码",
                            showCancel: !1,
                            complete: function(t) {
                                wx.navigateBack();
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showModal({
                            title: "已取消",
                            content: JSON.stringify(t)
                        }), wx.showToast({
                            title: "已取消",
                            duration: 4e3,
                            complete: function(t) {
                                wx.navigateBack();
                            }
                        });
                    }
                });
            },
            fail: function() {},
            complete: function() {}
        });
    }
});