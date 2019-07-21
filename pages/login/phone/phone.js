// pages/login/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    inputPhone:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录',
    })
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

  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })
    if (e.detail.value.length>10){
      this.setData({
        inputPhone: true
      })
    }else{
      this.setData({
        inputPhone: false
      })
    }
  },

  nextStep: function () {
    if (!this.data.inputPhone){
        return;
    }
    this.loading();
    this.sendCode();
  },

  sendCode:function(){
    var input = this.data.inputValue;
    wx.navigateTo({
      url: '../code/code?inputValue=' + input
    });
    // wx.request({
    //   url: "",
    //   method: 'POST',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   data:{
    //     phoneNo: this.data.inputValue
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     wx.showToast({
    //       title: res.data.code + "",
    //       icon: 'loading',
    //       duration: 200
    //     })
    //     wx.navigateTo({
    //       url: '../code/code?inputValue=' + input
    //     });
    //   }
    // }) 
  },



  toCodePage:function(){
    console.log(this.data.inputValue);

  },

  loading:function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 200
    })
  }
})