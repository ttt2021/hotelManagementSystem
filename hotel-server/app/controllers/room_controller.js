const room_col = require('../models/room')
const roomImg_col = require('../models/roomImg')
const formatTime = require('../utils/formatTime')
const { v1: uuidv1 } = require('uuid');

const addRoomKind = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  const result = await room_col.findOne({
    kind: req.kind
  })

  if (result) {
    ctx.body = {
      code: 0,
      msg: '该类型已存在'
    }
    return
  }

  // 获取 roomKindId
  let roomKindId = uuidv1()
  console.log(roomKindId)

  // 获取添加时间
  let addTime = formatTime.getNowTime()
  console.log(addTime)

  const roomInfos = await room_col.create({
    roomKindId: roomKindId,
    kind: req.kind,
    price: req.price,
    count: req.count,
    rank: req.rank,
    remark: req.remark,
    userId: req.userId,
    username: req.username,
    addTime: addTime,
    area: req.area,
    bedWidth: req.bedWidth,
    bedStyle: req.bedStyle,
    liveCount: req.liveCount,
    window: req.window,
    floor: req.floor,
    smoking: req.smoking
  })

  if (roomInfos) {
    console.log(roomInfos)
    const addImg = await roomImg_col.create({
      roomKindId: roomKindId,
      img: req.roomImg
    })
    if (addImg) {
      ctx.body = {
        code: 1,
        msg: '添加成功'
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '添加失败'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '添加失败'
    }
  }
}

const getRoomKind = async (ctx) => {
  let result = await room_col.find()
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

const getKindImg = async (ctx) => {
  console.log(ctx.request.body)
  let req =  ctx.request.body

  let result = await roomImg_col.findOne({
    roomKindId: req.roomImgId
  })

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

module.exports = {
  addRoomKind,
  getRoomKind,
  getKindImg
}