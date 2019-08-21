var t = getApp();

require("../../utils/api.js"), require("../../utils/util.js");

Page({
    data: {
        imgUrl: null,
        teamId: null,
        windowWidth: t.systemInfo.screenWidth,
        windowHeight: t.systemInfo.screenHeight,
        imgHeight: t.systemInfo.screenHeight - 70
    },
    onLoad: function(t) {
        wx.saveImageToPhotosAlbum({}), wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "点击保存到相册，然后分享到朋友圈，好友通过您的海报成功购买后，您可获得五元红包"
        }), this.setData({
            imgUrl: t.imgUrl,
            teamId: t.teamId
        });
    },
    saveImg: function() {
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
    yulan: function() {
        wx.previewImage({
            current: this.data.imgUrl,
            urls: [ this.data.imgUrl ]
        });
    },
    saveImgs: function() {
        wx.downloadFile({
            url: this.data.imgUrl,
            success: function(t) {
                console.log(t), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showModal({
                            title: "保存成功",
                            content: "您可以从相册中选取海报分享到朋友圈，好友购买成功后您可获5元红包",
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
                        });
                    }
                });
            }
        });
    }
});