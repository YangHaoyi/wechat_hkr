// pages/login/code/code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNo:"",
    inputValue:"",
    inputCode:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '输入验证码',
    });
    this.setData({
      phoneNo: options.inputValue
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
  loginSuccess:function(){
    wx.navigateBack({
      delta: 2
    })
  },
  bindCodeInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    if (e.detail.value.length > 3) {
      this.setData({
        inputCode: true
      })
    } else {
      this.setData({
        inputCode: false
      })
    }
  },
  loading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 200
    })
  },


  login: function () {
    var that = this;
    if (!this.data.inputCode) {
      return;
    }
    this.loading();
    var input = this.data.inputValue;
    wx.request({
      url: "testUrl",
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        phoneNo: this.data.phoneNo,
        deviceToken:"Aj3QS7A_8AtitAf5fPhDu5sWDoXv1U8XTTmZ74UTuH99",
        identifyingCode: input,
        openId:"",
        source:"2",
        cityID: "1758"
      },
      success: function (res) {
        console.log(res.data);
        getApp().globalData.phoneNo = that.data.phoneNo;
        getApp().globalData.login = true;
        getApp().globalData.authToken = res.data.payload.authToken;
        getApp().globalData.token = res.data.payload.token;
        wx.navigateBack({
          delta: 2
        });
      }
    })
  },


})