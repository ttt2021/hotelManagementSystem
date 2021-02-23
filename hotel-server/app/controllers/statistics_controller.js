const roomDetail_col = require('../models/roomDetail')
const order_col = require('../models/order')
const room_col = require('../models/room')
const historyOrder_col = require('../models/historyOrder')
const formatTime = require('../utils/formatTime')

const getDayStatistics = async (ctx) => {
  const req = ctx.request.body
  console.log(req)
  let result = await order_col.find({
    orderTime: {
      $regex: '.*' + req.currentDate,
      $options: 'i'
    },
  }).lean()
  console.log(result)

  let hisResult = await historyOrder_col.find({
    orderTime: {
      $regex: '.*' + req.currentDate,
      $options: 'i'
    }
  })
  console.log(hisResult)

  if (hisResult.length !== 0) {
    result = result.concat(hisResult)
  }
  console.log('result', result)

  let roomList = await room_col.find()
  console.log(roomList)
  let rooms = []
  for (let i = 0; i < roomList.length; i++) {
    rooms[i] = {
      name: roomList[i].kind,
      value: 0
    }
  }
  console.log(rooms)

  let time = `${req.currentDate} 00: 00: 00`
  let list = (new Array(8)).fill(0)
  // console.log(list)
  if (result.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      // console.log(result[i].orderTime)
      let diffHours = Math.ceil(formatTime.getDiffTime(time, result[i].orderTime) / 3)
      // console.log(diffHours)
      list[diffHours - 1] = list[diffHours - 1] + result[i].totalCost - 100 // 实际收入 = 总收入 - 押金
      let roomKind = await roomDetail_col.findOne({
        roomId: result[i].roomId
      })
      // console.log(roomKind.kind)
      for (let j = 0; j < rooms.length; j++) {
        if (roomKind.kind === rooms[j].name) {
          rooms[j].value++
          break
        }
      }
    }
    console.log(list, rooms)
  }
  ctx.body = {
    data: {
      list,
      rooms
    }
  }
}

const getRangeStatistics = async (ctx) => {
  console.log(ctx.request.body)
  let req = ctx.request.body

  let result = await order_col.find({
    orderTime: {
      $gte: req.startDate,
      $lte: req.afterDate
    }
  }).lean()
  console.log(result)

  let hisResult = await historyOrder_col.find({
    orderTime: {
      $gte: req.startDate,
      $lte: req.afterDate
    }
  })
  console.log(hisResult)

  if (hisResult.length !== 0) {
    result = result.concat(hisResult)
  }
  console.log(result, result.length)

  let roomList = await room_col.find()
  console.log(roomList)
  let rooms = []
  for (let i = 0; i < roomList.length; i++) {
    rooms[i] = {
      name: roomList[i].kind,
      value: 0
    }
  }
  console.log(rooms)

  let days = formatTime.getDays(req.startDate, req.afterDate)
  console.log(days)
  let list = (new Array(days - 1)).fill(0)
  console.log(list)
  if (result.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      let diffDays = formatTime.getDays(req.startDate, result[i].orderTime)
      console.log(result[i].orderTime, diffDays)
      list[diffDays - 2] = list[diffDays - 2] + result[i].totalCost - 100 // 实际收入 = 总收入 - 押金
      let roomKind = await roomDetail_col.findOne({
        roomId: result[i].roomId
      })
      // console.log(roomKind.kind)
      for (let j = 0; j < rooms.length; j++) {
        if (roomKind.kind === rooms[j].name) {
          rooms[j].value++
          break
        }
      }
    }
    console.log(list, rooms)
  }
  ctx.body = {
    data: {
      list,
      rooms
    }
  }
}

const getYearStatistics = async (ctx) => {
  const req = ctx.request.body
  console.log(req)
  let result = await order_col.find({
    orderTime: {
      $regex: '.*' + req.year,
      $options: 'i'
    },
  }).lean()
  console.log(result, result.length)

  let hisResult = await historyOrder_col.find({
    orderTime: {
      $regex: '.*' + req.year,
      $options: 'i'
    }
  })
  console.log(hisResult)

  if (hisResult.length !== 0) {
    result = result.concat(hisResult)
  }
  console.log(result, result.length)

  let roomList = await room_col.find()
  console.log(roomList)
  let rooms = []
  for (let i = 0; i < roomList.length; i++) {
    rooms[i] = {
      name: roomList[i].kind,
      value: 0
    }
  }
  console.log(rooms)

  let list = (new Array(12)).fill(0)
  console.log(list)
  if (result.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      let month = Number(result[i].orderTime.split('-')[1])
      list[month - 1] = list[month - 1] + result[i].totalCost - 100 // 实际收入 = 总收入 - 押金

      let roomKind = await roomDetail_col.findOne({
        roomId: result[i].roomId
      })
      // console.log(roomKind.kind)
      for (let j = 0; j < rooms.length; j++) {
        if (roomKind.kind === rooms[j].name) {
          rooms[j].value++
          break
        }
      }
    }
    console.log(list, rooms)
  }
  ctx.body = {
    data: {
      list,
      rooms
    }
  }
}

module.exports = {
  getDayStatistics,
  getRangeStatistics,
  getYearStatistics
}