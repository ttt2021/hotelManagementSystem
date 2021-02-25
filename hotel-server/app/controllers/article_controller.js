const { v1: uuidv1 } = require('uuid');
const formatTime = require('../utils/formatTime')
const article_col = require('../models/article')

const uploadArticle = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let status = req.status
  if (req.status == '发表') {
    status = '审核中'
  } else if (req.status == '保存') {
    status = '未发表'
  }

  let articleId = uuidv1()
  console.log(articleId)

  let currentTime = formatTime.getNowTime()
  console.log(currentTime)

  let result = await article_col.create({
    articleId: articleId,
    theme: req.theme,
    content: req.content,
    status: status,
    addUser: req.addUser,
    addTime: currentTime,
    updatedUser: req.addUser,
    updatedTime: currentTime,
    checkUser: '',
    checkTime: '',
    viewCount: 0
  })
  console.log(result)
  if (result) {
    ctx.body = {
      code: 1,
      msg: `${req.status}成功`
    }
  } else {
    ctx.body = {
      code: 0,
      msg: `${req.status}失败`
    }
  }
}

const getArticleList = async (ctx) => {
  let articleList = await article_col.find().sort({
    _id: -1
  })
  console.log(articleList)

  if (articleList) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: articleList
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败'
    }
  }
}

const delArticle = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await article_col.remove({
    articleId: req.articleId
  })
  console.log(result)
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

const getArticleInfo = async (ctx) => {
  let req = ctx.request.body 
  console.log(ctx.request.body)

  let result = await article_col.findOne({
    articleId: req.articleId
  })
  console.log(result)

  if (result) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败'
    }
  }
}

const updatedArticle = async (ctx) => {
  let req = ctx.request.body
  console.log(req)

  let status = req.status
  if (req.status == '发表') {
    status = '审核中'
  } else if (req.status == '保存') {
    status = '未发表'
  }

  let currentTime = formatTime.getNowTime()
  console.log(currentTime)

  let result = await article_col.updateOne({
    articleId: req.articleId
  }, {
    status: status,
    updatedUser: req.updatedUser,
    updatedTime: currentTime,
    theme: req.theme,
    content: req.content
  })
  console.log(result)

  if (result.ok) {
    ctx.body = {
      code: 1,
      msg: '修改成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '修改失败'
    }
  }
}

const searchArticle = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await article_col.find({
    theme: {
      $regex: '.*' + req.theme,
      $options: 'i'
    },
    status: {
      $regex: '.*' + req.status,
      $options: 'i'
    },
  }).sort({
    _id: -1
  })
  console.log(result)

  if (result) {
    ctx.body = {
      code: 1,
      msg: '搜索成功',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '搜索失败'
    }
  }
}

const updateView = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await article_col.updateOne({
    articleId: req.articleId
  }, {
    viewCount: req.viewCount
  })
  console.log(result)

  if (result.ok == 1) {
    ctx.body = {
      code: 1,
      msg: '修改成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '请检查网络'
    }
  }
}

const getCheckList = async (ctx) => {
  let result = await article_col.find({
    status: '审核中'
  })
  console.log(result)
  if (result) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: result
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败，请检查网络'
    }
  }
}

const updatedStatus = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let currentTime = formatTime.getNowTime()
  console.log(currentTime)

  let result = await article_col.updateOne({
    articleId: req.articleId
  }, {
    status: req.status,
    checkUser: req.checkUser,
    checkTime: currentTime
  })
  console.log(result)

  if (result.nModified == 1) {
    ctx.body = {
      code: 1,
      msg: '审核成功'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '审核失败'
    }
  }
}

module.exports = {
  uploadArticle,
  getArticleList,
  delArticle,
  getArticleInfo,
  updatedArticle,
  searchArticle,
  updateView,
  getCheckList,
  updatedStatus
}