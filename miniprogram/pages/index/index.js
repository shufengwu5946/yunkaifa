//index.js
const app = getApp()

Page({
  data: {
    list: []
  },

  onLoad: function () {
  },

  onReady: function () {
    this.query();
  },

  add: function () {
    wx.navigateTo({
      url: "../addTodo/addTodo",
    })
  },
  
  query: function () {
    wx.cloud.callFunction({
      name: 'queryTodo',
      data: {},
      success: res => {
        this.setData({
          list: res.result.data
        });
        console.log(res.result.data);
      },
      fail: err => {
        console.log(err);
      }
    });
  }
})