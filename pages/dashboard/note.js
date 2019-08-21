Page({
    data: {},
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    formSubmit: function(o) {
        console.log(o.detail.formId);
        wx.request({
            url: "https://www.huayupiaowu.com/qianggou/api.php?do=submitneeds&user_id=&content=&formId=" + formid
        });
    }
});