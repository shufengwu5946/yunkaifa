//index.js
const moment = require('moment');
const app = getApp()

Page({
  data: {
    title: '',
    date: moment().format('YYYY-MM-DD'),
    content: ''
  },

  onLoad: function () {},

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  bindTitle: function (e) {
    this.setData({
      title: e.detail.value
    });
  },
  bindContent: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },
  refresh: function (cb) {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    beforePage.query();
    cb();
  },
  submitForm: function () {
    const {
      title,
      content,
      date
    } = this.data;
    wx.cloud.callFunction({
      name: 'addTodo',
      data: {
        title,
        content,
        date
      },
      success: res => {
        this.refresh(() => {
          wx.navigateBack({
            delta: 1
          });
        });
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})