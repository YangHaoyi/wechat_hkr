// pages/pay/success/paySuccess.js
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
  
  paySuccess:function(){
    wx.navigateBack({
      delta: 3
    });
  }
})