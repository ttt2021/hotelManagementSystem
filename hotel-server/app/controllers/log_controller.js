const log_col = require('../models/log')
const formatTime = require('../utils/formatTime')
const { v1: uuidv1 } = require('uuid');

const addLog = async (ctx) => {
  console.log(ctx)
  let currentTime = formatTime.getNowTime()
  console.log(currentTime)
  let userId = uuidv1()
  let addlog = await log_col.create({
    userId: userId,
    username: ctx.username,
    text: ctx.text,
    logTime: currentTime
  })
  console.log(addlog)

  return addlog
}

const getHomeLogList = async (ctx) => {
  let logList = await log_col.find().sort({
    _id: -1
  }).limit(18)
  console.log(logList)

  ctx.body = {
    data: logList
  }
}

const getLogList = async (ctx) => {
  let logList = await log_col.find().sort({
    _id: -1
  })
  console.log(logList)

  ctx.body = {
    data: logList
  }
}

const searchLogList = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  if (req.logTime !== '') {
    req.logTime = formatTime.getSearchTime(req.logTime)
  }
  console.log(req)

  // 模糊查询
  let searchList = await log_col.find({
    username: {
      $regex: '.*' + req.username,
      $options: 'i'
    },
    logTime: {
      $regex: '.*' + req.logTime,
      $options: 'i'
    }
  })
  console.log(searchList)
  if (searchList.length !== 0) {
    ctx.body = {
      code: 1,
      msg: '查询成功',
      data: searchList
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '查无此房间',
      data: searchList
    }
  }
}

module.exports = {
  addLog,
  getHomeLogList,
  getLogList,
  searchLogList
}