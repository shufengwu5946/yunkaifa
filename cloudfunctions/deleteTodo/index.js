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
  let res = await todos.where({
    _id: event.id
  }).remove();
  return {
    data: res.data,
    errMsg: res.errMsg,
  }
  // const countResult = await todos.count();
  // const total = countResult.total;
  // const batchTimes = Math.ceil(total / MAX_LIMIT);
  // const tasks = [];
  // let params = {};
  // if (event.title) {
  //   params = {
  //     ...params,
  //     title: db.RegExp({
  //       regexp: event.title,
  //     })
  //   };
  // }
  // if (event.date) {
  //   params = {
  //     ...params,
  //     date: event.date
  //   };
  // }
  // for (let i = 0; i < batchTimes; i++) {
  //   const promise = todos.where(params).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
  //   tasks.push(promise);
  // }
  // return (await Promise.all(tasks)).reduce((acc, cur) => {
  //   return {
  //     data: acc.data.concat(cur.data),
  //     errMsg: acc.errMsg,
  //   }
  // });
  // return event;
}