// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authToken:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '首页',
    }),
    this.setData({
      authToken: getApp().globalData.authToken
    });
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
  
  },

  login: function () {
    wx.navigateTo({
      url: '../login/phone/phone'
    })
  },
  branch: function () {
    wx.navigateTo({
      url: '../branch/branch'
    })
  },
  order: function () {
    wx.navigateTo({
      url: '../order/order'
    })
  },
  pay: function () {
    wx.navigateTo({
      url: '../pay/success/paySuccess'
    })
  },
  getToken:function(){
    this.setData({
      authToken: getApp().globalData.authToken
    });
  },


})