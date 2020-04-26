// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const todos = db.collection('todos');
  try {
    let res = await todos.where({
      _id: event.id
    }).update({
      data: {
        title: event.title,
        content: event.content,
        date: event.date
      }
    });
    return res;
  } catch (e) {
    return e;
  }
}