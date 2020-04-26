//index.js
const app = getApp()
const moment = require('moment');

Page({
  data: {
    list: [],
    title: '',
    date: moment().format('YYYY-MM-DD'),
    showActionsheet: false,
    actionSheetGroups: [
      '删除',
      '编辑'
    ]
  },

  onLoad: function () {},

  onReady: async function () {
    this.query();
  },

  add: function () {
    wx.navigateTo({
      url: "../addTodo/addTodo",
    })
  },
  query: function () {
    let param = {};
    if (this.data.title) {
      param = {
        ...param,
        title: this.data.title
      }
    }
    if (this.data.date) {
      param = {
        ...param,
        date: this.data.date
      }
    }
    wx.cloud.callFunction({
      name: 'queryTodo',
      data: param,
      success: res => {
        console.log(res);

        if (!res.result || !res.result.errCode) {
          this.setData({
            list: res.result.data
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
  },
  delete: function (id) {
    wx.cloud.callFunction({
      name: 'deleteTodo',
      data: {
        id: id
      },
      success: res => {
        if (!res.result || !res.result.errCode) {
          wx.showToast({
            title: '删除成功！',
          })
          this.query();
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
        console.log("err", err);
        wx.showModal({
          title: '提示',
          content: err.errMsg
        });
      }
    });
  },
  bindTitle: function (e) {
    this.setData({
      title: e.detail.value
    }, () => {
      this.query();
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    }, () => {
      this.query();
    });
  },
  bindLongPress: function (e) {
    this.delete(e.currentTarget.dataset.id);
  },
  bindItemTap: function (e) {
    console.log(e);

    wx.showActionSheet({
      itemList: this.data.actionSheetGroups,
      complete: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log(res);
      },
      itemColor: '#09BB07',
      success: (result) => {
        if (result.tapIndex === 0) {
          this.delete(e.currentTarget.dataset.id);
        } else if (result.tapIndex === 1) {
          console.log(this.data.list);

          const itemData = this.data.list.find(v => v._id === e.currentTarget.dataset.id);
          if (itemData) {
            wx.navigateTo({
              url: "../editTodo/editTodo",
              success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                const {
                  _id,
                  title,
                  content,
                  date
                } = itemData;
                res.eventChannel.emit('editTodoInitData', {
                  id: _id,
                  title,
                  content,
                  date
                })
              }
            });
          }
        }
      },
    })
  }
})