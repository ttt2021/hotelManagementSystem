const response_col = require('../models/response')
const formatTime = require('../utils/formatTime')
const { v1: uuidv1 } = require('uuid');

const getResponse = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let currentTime = formatTime.getNowTime()
  console.log(currentTime)
  let responseId = uuidv1()

  let result = await response_col.create({
    responseId: responseId,
    name: req.name,
    content: req.content,
    time: currentTime,
    articleId: req.articleId,
    commentId: req.commentId
  })
  console.log(result)

  if (result) {
    ctx.body = {
      code: 1,
      msg: '回复成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '回复失败'
    }
  }
}

const delResponse = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await response_col.remove({
    responseId: req.responseId
  })

  if (result.deletedCount == 1) {
    ctx.body = {
      code: 1,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '删除失败'
    }
  }
}

module.exports = {
  getResponse,
  delResponse
}