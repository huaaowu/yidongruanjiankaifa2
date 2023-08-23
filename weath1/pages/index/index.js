// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    region:['北京市','北京市','东城区'],
    now:{
      temp:0,
      text:'未知',
      icon:999,
      humidity:0,
      pressure:0,
      vis:0,
      windDir:0,
      windSpeed:0,
      windScale:0
    }
  },
  //改变地区函数
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    });
    this.getWeather();
  },
  getWeather:function(){
    var that=this;//定义一个变量,this不能在wxAPI函数内部使用
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      data:{
        location:that.data.region[2],
        key:"22eb3cdebbd6401799b1c8c22e37c85a"
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          Place_ID:res.data.location[0].id
        })
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now?',
          data:{
            location:that.data.Place_ID,
            key:"22eb3cdebbd6401799b1c8c22e37c85a"
          },
          success:function(res){
            console.log(res.data.now)
            that.setData({
              now : res.data.now
            })
          }
        })
      }
    })
  },
  onLoad:function(options){
    this.getWeather();
  },
  // 事件处理函数
  bindViewTap() {
    
  },
  
})
