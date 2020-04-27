// miniprogram/pages/editTodo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {

  },

  onReady: function () {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('editTodoInitData', (data) => {
      this.setData(data);
    })
  },

  refresh: function (cb) {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    beforePage.query();
    cb();
  },
  submitForm: function (e) {
    wx.cloud.callFunction({
      name: 'editTodo',
      data: {
        ...e.detail,
        id: this.data.id
      },
      success: res => {
        if (!res.result || !res.result.errCode) {
          wx.showToast({
            title: '编辑成功！',
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
        wx.showModal({
          title: '提示',
          content: err.errMsg
        });
      }
    });
  }
})