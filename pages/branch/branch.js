// pages/branch/branch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '车辆列表',
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
    this.loadCarList();
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

  loadCarList:function(){
    var that = this;
    wx.request({
      url:"testUrl",
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          carList: res.data.payload.list
        });
      }
    })
  },

  bookCar:function(event){
    if (getApp().globalData.login){
      wx.showLoading({
        title: '',
      });
      this.requestBook(event.currentTarget.dataset.hi);
    }else{
      wx.navigateTo({
        url: '../login/phone/phone'
      })
    }
  },
  requestBook: function (vehicleId) {
    var that = this;
    wx.request({
      url: "testUrl",
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      data:{
        phoneNo: getApp().globalData.phoneNo,
        source:"2",
        vehicleId: vehicleId
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        wx.navigateTo({
          url: '../order/order'
        })
      }
    })
  }

})