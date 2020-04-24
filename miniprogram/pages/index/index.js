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
        this.setData({
          list: res.result.data
        });
        console.log(res.result.data);
      },
      fail: err => {
        console.log(err);
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
        console.log("res", res);
        this.query();
      },
      fail: err => {
        console.log("err", err);
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
    // this.setData({
    //   showActionsheet: true
    // });
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

        }
      },
    })
  }
})