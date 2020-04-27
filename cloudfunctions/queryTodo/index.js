// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const MAX_LIMIT = 100;
  const todos = db.collection('todos');
  try {
    const countResult = await todos.count();
    const total = countResult.total;
    const batchTimes = Math.ceil(total / MAX_LIMIT);
    const tasks = [];
    let params = {};
    if (event.title) {
      params = {
        ...params,
        title: db.RegExp({
          regexp: event.title,
        })
      };
    }
    if (event.date) {
      params = {
        ...params,
        date: event.date
      };
    }
    for (let i = 0; i < batchTimes; i++) {
      const promise = todos.where(params).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      tasks.push(promise);
    }
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    });
  } catch (e) {
    return e;
  }

}