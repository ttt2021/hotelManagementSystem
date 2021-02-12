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

module.exports = {
  addLog
}