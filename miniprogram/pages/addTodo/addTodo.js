const moment = require('moment');
const app = getApp();

Page({
  data: {},

  onLoad: function () {},

  refresh: function (cb) {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    beforePage.query();
    cb();
  },
  submitForm: function (e) {
    wx.cloud.callFunction({
      name: 'addTodo',
      data: {
        title: e.detail.title,
        content: e.detail.content,
        date: e.detail.date
      },
      success: res => {
        if (!res.result || !res.result.errCode) {
          wx.showToast({
            title: '新增成功！',
          })
          this.refresh(() => {
            wx.navigateBack({
              delta: 1
            });
          });
        } else {
          if (res.result.errCode) {
            wx.showModal({
              title: '提示',
              content: res.result.errMsg
            });
          }
        }
      },
      fail: err => {
        console.log(err);
        wx.showModal({
          title: '提示',
          content: err.errMsg
        });
      }
    })
  }
})