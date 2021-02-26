const user_col = require('../models/user')
const position_col = require('../models/position')
const formatTime = require('../utils/formatTime')
const config = require('../../config')
const { v1: uuidv1 } = require('uuid')

// 添加职位
const addPosition = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  // 判断该职位是否存在
  const exitPosition = await position_col.findOne({
    position: req.position
  })
  console.log(exitPosition)
  if (exitPosition) { // 职位存在
    ctx.body = {
      code: 0,
      msg: '该职位已存在，不允许进行添加哟~~~'
    }
    return
  }
  // 职位不存在
  // 获取当前时间
  let currentTime = formatTime.getTime()
  console.log(currentTime)
  // 获取职位id
  const positionId = uuidv1()
  console.log(positionId)

  // 添加职位到数据库中
  const addResult = await position_col.create({
    positionId: positionId,
    position: req.position,
    positionDesc: req.posDesc,
    auth: req.auth,
    addUserId: req.userId,
    addTime: currentTime,
    status: 1
  })
  console.log(addResult)
  if (addResult) {
    ctx.body = {
      code: 1,
      msg: '添加成功',
      data: addResult
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '添加失败'
    }
  }
}

// 获取职位列表
const showPositionInfo = async (ctx) => {
  let positionList = await position_col.find().sort({ "addTime": -1 })
  for (let i = 0; i < positionList.length; i++) {
    const userinfo = await user_col.findOne({
      userId: positionList[i].addUserId
    })
    console.log(userinfo.username)
    let obj = { addUsername: userinfo.username }
    positionList[i] = { ...positionList[i]._doc, ...obj }
  }
  console.log(positionList)
  if (positionList) {
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: positionList
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '获取失败'
    }
  }
}

// 更新状态
const updateStatus = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  // 查找该职位是否存在员工
  const hasUser = await user_col.find({
    position: req.position,
    auth: req.auth
  })
  // 存在员工
  if (hasUser) {
    ctx.body = {
      code: 0,
      msg: '该职位有员工，不能进行停用！！'
    }
  }

  // 不存在员工
  const updated = await position_col.updateOne({
    positionId: req.positionId
  }, {
    status: req.status
  })
  console.log(updated)
  if (updated.ok == 1) {
    ctx.body = {
      code: 1,
      msg: '更新成功'
    }
    return
  } else {
    ctx.body = {
      code: 0,
      msg: '更新失败'
    }
  }
}

// 更新职位信息
const updatePositionInfo = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  const updated = await position_col.updateOne({
    positionId: req.positionId
  }, {
    position: req.position,
    positionDesc: req.positionDesc,
    auth: req.auth
  })
  console.log(updated)

  if (updated.ok == 1) {
    let updatedUser = await user_col.updateMany({
      job: req.position
    }, {
      auth: req.auth
    })
    if (updatedUser.ok == 1) {
      ctx.body = {
        code: 1,
        msg: '更新成功'
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '更新成功'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '更新失败'
    }
  }
}

const deletePosition = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  // 查询该岗位是否有职员
  const hasUser = await user_col.find({
    position: req.position,
    auth: req.auth
  })

  if (hasUser) {
    ctx.body = {
      code: 0,
      msg: '无法删除，该岗位还存在员工~~'
    }
  }

  const del = await position_col.remove({
    positionId: req.positionId
  })
  console.log(del)

  if (del.deletedCount == 1) {
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
  addPosition,
  showPositionInfo,
  updateStatus,
  updatePositionInfo,
  deletePosition
}