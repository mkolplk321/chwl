// pages/dashboard/authorize.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthorize: wx.getStorageSync("isAuthorize"),
    teamid : null,
    agentid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("auth_options",options);
    this.setData({
      teamid:options.teamid,
      agentid : options.agentid
    })
    if(wx.getStorageSync("isAuthorize") == true){
        // wx.switchTab({
        //   url: 'index'
        // })
      if (!this.data.teamid) {
        console.log("bbbbbbbbbbbbbbbbbb", this.data);
        wx.switchTab({
          url: 'index',
        })
      } else {
        console.log("cccccccccccccccc", this.data);
        wx.redirectTo({
          url: '../team/team?id=' + this.data.teamid + "&agentid=" + this.data.agentid,
        })
      }
    }
  },
  setUserInfo(e) {
    // wx.showLoading({ title: '正在登录中' });
    app.globalData.isAuthorize = true
    app.doLogin();
    if(!this.data.teamid){
      console.log("bbbbbbbbbbbbbbbbbb",this.data);
      wx.switchTab({
        url: 'index',
      })
    } else {
      console.log("cccccccccccccccc", this.data);
      wx.redirectTo({
        url: '../team/team?id=' + this.data.teamid + "&agentid=" + this.data.agentid,
      })
    }
   
    console.log("~~~~~~~~~~~~")
  },
  reject(e) {
    // wx.showLoading({ title: '正在登录中' });
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    wx.switchTab({
      url: 'index',
    })
    console.log("~~~~~~~~~~~~")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})