Component({
    properties: {
        url: {
            type: String,
            value: ""
        },
        bottom: {
            type: Number,
            value: 0
        }
    },
    data: {
        showPop: !1
    },
    methods: {
        closeShare: function() {
            this.setData({
                showPop: !1
            });
        },
        togglePopup: function() {
            this.setData({
                showPop: !this.data.showPop
            });
        },
        _saveShare: function() {
            wx.showLoading({
                title: "加载中"
            }), setTimeout(function() {
                wx.hideLoading();
            }, 2e3);
            var o = this;
            wx.downloadFile({
                url: o.data.url,
                success: function(o) {
                    console.log(o), wx.saveImageToPhotosAlbum({
                        filePath: o.tempFilePath,
                        success: function(o) {
                            wx.showModal({
                                title: "存图成功",
                                content: "图片成功保存到相册了，可以分享到朋友圈了",
                                showCancel: !1,
                                confirmText: "好的",
                                confirmColor: "#a78845",
                                success: function(o) {
                                    o.confirm && console.log("用户点击确定");
                                }
                            }), wx.hideLoading();
                        },
                        fail: function(o) {
                            console.log("fail");
                        }
                    });
                },
                fail: function() {
                    console.log("fail");
                }
            });
        }
    }
});