const response_col = require('../models/response')
const comment_col = require('../models/comment')
const article_col = require('../models/article')
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

const responsesList = async (ctx) => {
  let responselist = await response_col.find({}).sort({
    _id: -1
  })
  console.log(responselist)

  let list = []
  if (responselist.length !== 0) {
    for (let i = 0; i < responselist.length; i++) {
      list.push({
        articleId: responselist[i].articleId,
        name: responselist[i].name,
        content: responselist[i].content,
        time: responselist[i].time,
        responseId: responselist[i].responseId
      })
      let articleInfo = await article_col.findOne({
        articleId: responselist[i].articleId
      })
      list[i].theme = articleInfo.theme
      list[i].viewCount = articleInfo.viewCount
      let commentInfo = await comment_col.findOne({
        commentId: responselist[i].commentId
      })
      list[i].commentName = commentInfo.name
    }
  }
  console.log(list)

  if (list) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: list
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败',
      data: list
    }
  }
}

const searchResponse = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await response_col.find({
    name: {
      $regex: '.*' + req.name,
      $options: 'i'
    }
  })
  console.log(result)
  let list = []
  if (result.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      let articleInfo = await article_col.find({
        theme: {
          $regex: '.*' + req.theme,
          $options: 'i'
        }
      })
      if (articleInfo.length != 0) {
        for (let j = 0; j < articleInfo.length; j++) {
          let commentInfo = await comment_col.findOne({
            commentId: result[i].commentId
          })
          list.push({
            articleId: result[i].articleId,
            name: result[i].name,
            content: result[i].content,
            time: result[i].time,
            commentId: result[i].commentId,
            theme: articleInfo[j].theme,
            viewCount: articleInfo[j].viewCount,
            commentName: commentInfo.name
          })
        }
      }
    }
  }
  console.log(list)

  if (list) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: list
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败',
      data: list
    }
  }
}

module.exports = {
  getResponse,
  delResponse,
  responsesList,
  searchResponse
}