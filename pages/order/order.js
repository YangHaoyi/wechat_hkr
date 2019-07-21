Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCurrent:{},
    carInfo:{},
    startBranch:{},
    endBranch: {},
    appStyle:[],
    realTimeInfo:{},
    bookTime:"",
    billingStartTime:"",
    billingEndTime:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '当前订单',
    });
    this.requestOrderCurrent();
  },

  //请求订单基础信息
  requestOrderCurrent:function(){
    var that = this;
    wx.request({
      url: "testUrl",
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        wx.hideLoading(); 
        console.log(res.data);
        that.setData({
          orderCurrent: res.data.payload
        });
        getApp().globalData.orderId = res.data.payload.orderId;
        that.requestCarInfo(res.data.payload.vehicleId);
        that.requestAppStyle(res.data.payload.billingRuleId);
        that.requestStartBranch(res.data.payload.startRentalShopId);
        if (res.data.payload.endRentalShopId!=0){
          that.requestEndBranch(res.data.payload.endRentalShopId);
        }
        that.requestRealTime();
        that.setData({
          bookTime: that.formateTime(res.data.payload.bookTime)
        });
        if (res.data.payload.billingStartTime!=0){
          that.setData({
            billingStartTime: that.formateTime(res.data.payload.billingStartTime)
          });
        }
        if (res.data.payload.billingEndTime != 0) {
          that.setData({
            billingEndTime: that.formateTime(res.data.payload.billingEndTime)
          });
        }
      }
    })
  },

  //请求车辆信息
  requestCarInfo: function (vehicleId){
    var that = this;
    wx.request({
      url: "testUrl" + vehicleId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          carInfo: res.data.payload
        });
      }
    })
  },

// 请求计价规则
  requestAppStyle: function (billingRuleId){
    var that = this;
    wx.request({
      url: "testUrl"                          +billingRuleId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          appStyle: res.data.payload
        });
      }
    })
  },

  //请求取车网点信息
  requestStartBranch: function (startRentalShopId){
    var that = this;
    wx.request({
      url: "testUrl" + startRentalShopId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          startBranch: res.data.payload
        });
      }
    })
  },
  //请求还车网点信息
  requestEndBranch: function (endRentalShopId) {
    var that = this;
    wx.request({
      url: "testUrl" + endRentalShopId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          endBranch: res.data.payload
        });
      }
    })
  },

//请求订单实时信息
  requestRealTime:function(){
    var that = this;
    wx.request({
      url: "testUrl",
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          realTimeInfo: res.data.payload
        });
      }
    })
  },

//格式化时间
  formateTime:function(time){
    var newDate = new Date();
    newDate.setTime(time);
    Date.prototype.format = function (format) {
      var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1
            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    }
    return newDate.format('yyyy-MM-dd h:m:s');
  },

//控车指令
  controlCar:function(){
    var that = this;
    if (that.data.orderCurrent.orderStatus==1){
      wx.showModal({
        title: '',
        content: '取车后将开始计费，用车时请先解锁车门',
        success: function (res) {
          if (res.confirm) {
            that.takeCar()
          } else {
            console.log('用户点击取消')
          }
        }
      })
    } else if (that.data.orderCurrent.orderStatus == 2){
      wx.showModal({
        title: '',
        content: '确认还车',
        success: function (res) {
          if (res.confirm) {
            that.returnCar()
          } else {
            console.log('用户点击取消')
          }
        }
      })
    } else if (that.data.orderCurrent.orderStatus == 4){
      wx.navigateTo({
        url: '../pay/pay'
      })
    }

  },

  //请求取车
  takeCar:function(){
    wx.showLoading({
      title: '',
    });
    var that = this;
    wx.request({
      url: "testUrl" + that.data.orderCurrent.orderId+"/start",
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
        'token': getApp().globalData.token,
        'x-auth-token': getApp().globalData.authToken,
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '取车成功',
        });
        that.requestOrderCurrent();
      }
    })
  },
//请求还车
returnCar:function(){
  wx.showLoading({
    title: '',
  });
  var that = this;
  wx.request({
    url: "testUrl" + that.data.orderCurrent.orderId + "/return",
    method: 'PUT',
    header: {
      'Content-Type': 'application/json',
      'token': getApp().globalData.token,
      'x-auth-token': getApp().globalData.authToken,
    },
    success: function (res) {
      console.log(res.data);
      wx.showToast({
        title: '还车成功',
      });
      that.requestOrderCurrent();
    }
  })
},

})

//倒计时
function countdown(that) {
  var EndTime = that.data.bookTime || []+1200000;
  var NowTime = new Date().getTime();
  var total_micro_second = EndTime - NowTime || [];
  console.log('剩余时间：' + total_micro_second);
  // 渲染倒计时时钟
  that.setData({
    cutDownTime: dateformat(total_micro_second)
  });
  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
    });
    //return;
  }
  setTimeout(function () {
    total_micro_second -= 1000;
    countdown(that);
  }
    , 1000)
}

// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(micro_second) {
  // 总秒数
  var second = Math.floor(micro_second / 1000);
  // 天数
  var day = Math.floor(second / 3600 / 24);
  // 小时
  var hr = Math.floor(second / 3600 % 24);
  // 分钟
  var min = Math.floor(second / 60 % 60);
  // 秒
  var sec = Math.floor(second % 60);
  return day + "天" + hr + "小时" + min + "分钟" + sec + "秒";
}