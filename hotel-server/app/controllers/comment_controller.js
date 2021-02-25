const response_col = require('../models/response')
const comment_col = require('../models/comment')
const formatTime = require('../utils/formatTime')
const { v1: uuidv1 } = require('uuid');

const getComment = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let currentTime = formatTime.getNowTime()
  console.log(currentTime)
  let commentId = uuidv1()

  let result = await comment_col.create({
    commentId: commentId,
    name: req.name,
    content: req.content,
    time: currentTime,
    articleId: req.articleId
  })
  console.log(result)

  if (result) {
    ctx.body = {
      code: 1,
      msg: '发表成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '发表失败'
    }
  }
}

const getCommentList = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  // 获取所有评论
  let result = await comment_col.find({
    articleId: req.articleId
  }).sort({
    _id: -1
  })
  console.log(result)

  let list = []
  if (result.length !== 0) {

    for (let i = 0; i < result.length; i++) {
      let responseList = await response_col.find({
        articleId: result[i].articleId,
        commentId: result[i].commentId
      }).sort({
        _id: -1
      })
      list[i] = responseList
    }
  }
  console.log(list)

  if (list) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: {
        result,
        list
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败',
      data: result
    }
  }
}

const delComment = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  // 先删除回复的信息
  // 再删除评论
  let result = await response_col.remove({
    commentId: req.commentId
  })
  console.log(result)

  if (result.ok == 1) {
    let delComment = await comment_col.remove({
      commentId: req.commentId
    })
    if (delComment.deletedCount == 1) {
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
  } else {
    ctx.body = {
      code: 0,
      msg: '删除失败'
    }
  }
}

module.exports = {
  getComment,
  getCommentList,
  delComment
}