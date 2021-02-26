const response_col = require('../models/response')
const comment_col = require('../models/comment')
const article_col = require('../models/article')
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

const commentsList = async (ctx) => {
  let commentlist = await comment_col.find({}).sort({
    _id: -1
  })
  console.log(commentlist)

  let list = []
  if (commentlist.length !== 0) {
    for (let i = 0; i < commentlist.length; i++) {
      list.push({
        articleId: commentlist[i].articleId,
        name: commentlist[i].name,
        content: commentlist[i].content,
        time: commentlist[i].time,
        commentId: commentlist[i].commentId
      })
      let articleInfo = await article_col.findOne({
        articleId: commentlist[i].articleId
      })
      list[i].theme = articleInfo.theme
      list[i].viewCount = articleInfo.viewCount
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

const searchComment = async (ctx) => {
  const req = ctx.request.body
  console.log(req)

  let result = await comment_col.find({
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
          list.push({
            articleId: result[i].articleId,
            name: result[i].name,
            content: result[i].content,
            time: result[i].time,
            commentId: result[i].commentId,
            theme: articleInfo[j].theme,
            viewCount: articleInfo[j].viewCount
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

const getMyComments = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let commentList = await comment_col.find({
    name: req.name
  }).sort({
    _id: -1
  })
  console.log(commentList)
  let list = []
  for (let i = 0; i < commentList.length; i++) {
    let articleInfo = await article_col.findOne({
      articleId: commentList[i].articleId
    })
    list.push({
      articleId: commentList[i].articleId,
      theme: articleInfo.theme,
      time: commentList[i].time,
      content: commentList[i].content,
      viewCount: articleInfo.viewCount
    })
  }
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

const getMyCommentsList = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let commentList = await comment_col.find({
    name: req.name
  }).sort({
    _id: -1
  }).lean()
  console.log(commentList)

  let responseList = await response_col.find({
    name: req.name
  }).sort({
    _id: -1
  })
  commentList = commentList.concat(responseList)
  console.log(commentList)

  let list = []
  for (let i = 0; i < commentList.length; i++) {
    let articleInfo = await article_col.findOne({
      articleId: commentList[i].articleId
    })
    list.push({
      articleId: commentList[i].articleId,
      theme: articleInfo.theme,
      time: commentList[i].time,
      content: commentList[i].content,
      viewCount: articleInfo.viewCount
    })
  }
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
  getComment,
  getCommentList,
  delComment,
  commentsList,
  searchComment,
  getMyComments,
  getMyCommentsList
}