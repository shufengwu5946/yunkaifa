// components/todoform/todoform.js
const moment = require('moment');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageTitle: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    date: {
      type: String,
      value: moment().format('YYYY-MM-DD')
    },
    content: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  onLoad: function (option) {
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    submit: function () {
      if (!this.data.title && this.data.title !== 0) {
        wx.showToast({
          title: '主题不能为空！',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (!this.data.content && this.data.content !== 0) {
        wx.showToast({
          title: '内容不能为空！',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      this.triggerEvent('submit', {
        pageTitle: this.data.pageTitle,
        title: this.data.title,
        date: this.data.date,
        content: this.data.content
      });
    }
  }
})