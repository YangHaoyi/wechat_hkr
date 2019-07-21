// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '支付',
    })
  },

  balancePay:function(){
    var that = this;
    wx.request({
      url: "testUrl" + getApp().globalData.orderId+"/type=8/orderType=1?hkcoin=0",
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        console.log(res.data);
        wx.navigateTo({
          url: 'success/paySuccess'
        })
      }
    })
  }

})